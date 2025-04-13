
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

// Define CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Set the platform fee percentage (e.g., 15%)
const PLATFORM_FEE_PERCENT = 15;

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    
    // Create Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );
    
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || ""
    );
    
    // Get authorization header and user
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Missing authorization header");
    }
    
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      throw new Error("Unauthorized");
    }
    
    // Parse request body
    const { items, shippingInfo } = await req.json();
    
    if (!items || items.length === 0) {
      throw new Error("No items in cart");
    }
    
    // Calculate total amount and prepare line items
    const lineItems = [];
    let totalAmount = 0;
    
    // Get all relevant artist accounts for the items
    const productIds = items.map(item => item.id);
    
    // In a real implementation, you'd query products to get their artist IDs
    // This is simplified - we'd need a more complex query to join products with artists
    const { data: artistProducts } = await supabaseAdmin
      .from("products")
      .select("id, artist_id")
      .in("id", productIds);
    
    // Group items by artist
    const itemsByArtist = {};
    
    for (const item of items) {
      const product = artistProducts.find(p => p.id === item.id);
      if (!product) continue;
      
      if (!itemsByArtist[product.artist_id]) {
        itemsByArtist[product.artist_id] = [];
      }
      
      itemsByArtist[product.artist_id].push({
        ...item,
        artistId: product.artist_id
      });
      
      totalAmount += item.price * item.quantity;
    }
    
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount + 500, // Add $5 for shipping
      currency: "usd",
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: user.id,
        orderItems: JSON.stringify(items.map(item => ({ id: item.id, quantity: item.quantity }))),
      },
    });
    
    // Create order record
    const { data: order, error: orderError } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: user.id,
        total_amount: totalAmount + 500, // Including shipping
        shipping_address: JSON.stringify(shippingInfo),
        status: "pending",
        stripe_payment_intent_id: paymentIntent.id,
      })
      .select()
      .single();
    
    if (orderError) {
      throw new Error(`Failed to create order: ${orderError.message}`);
    }
    
    // Create transaction record for platform fee and artist payouts
    const platformFee = Math.round((totalAmount * PLATFORM_FEE_PERCENT) / 100);
    const artistPayout = totalAmount - platformFee;
    
    await supabaseAdmin.from("transactions").insert({
      order_id: order.id,
      customer_id: user.id,
      amount_total: totalAmount + 500,
      platform_fee: platformFee,
      artist_payout: artistPayout,
      status: "pending",
      stripe_payment_intent_id: paymentIntent.id,
    });
    
    // Create order items for each artist
    const orderItems = [];
    
    for (const artistId in itemsByArtist) {
      const artistItems = itemsByArtist[artistId];
      
      for (const item of artistItems) {
        orderItems.push({
          order_id: order.id,
          product_id: item.id,
          artist_id: artistId,
          quantity: item.quantity,
          item_price: item.price,
        });
      }
    }
    
    if (orderItems.length > 0) {
      await supabaseAdmin.from("order_items").insert(orderItems);
    }
    
    // Return the client secret so the client can complete the payment
    return new Response(
      JSON.stringify({ 
        clientSecret: paymentIntent.client_secret,
        orderId: order.id
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
