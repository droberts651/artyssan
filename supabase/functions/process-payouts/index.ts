
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // This would be a protected admin endpoint in production
    // Create Supabase admin client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "",
      { auth: { persistSession: false } }
    );
    
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    
    // Get completed transactions that haven't been paid out to artists
    const { data: pendingTransactions } = await supabaseAdmin
      .from("transactions")
      .select(`
        id,
        order_id,
        artist_payout,
        stripe_payment_intent_id,
        order_items(product_id, artist_id, quantity, item_price)
      `)
      .eq("status", "completed")
      .not("artist_payout", "eq", 0);
    
    if (!pendingTransactions || pendingTransactions.length === 0) {
      return new Response(
        JSON.stringify({ message: "No pending payouts" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }
    
    // Group payouts by artist
    const payoutsByArtist = {};
    
    for (const transaction of pendingTransactions) {
      // Calculate the total payout for each artist from this transaction
      const orderItems = transaction.order_items;
      
      for (const item of orderItems) {
        if (!item.artist_id) continue;
        
        if (!payoutsByArtist[item.artist_id]) {
          payoutsByArtist[item.artist_id] = 0;
        }
        
        // Calculate the artist's share for this item
        // In a real implementation, you'd account for platform fees per item
        const itemTotal = item.quantity * item.item_price;
        const platformFee = Math.round((itemTotal * 15) / 100); // 15% platform fee
        const artistShare = itemTotal - platformFee;
        
        payoutsByArtist[item.artist_id] += artistShare;
      }
    }
    
    // Get artist accounts with their Stripe Connect IDs
    const artistIds = Object.keys(payoutsByArtist);
    const { data: artistAccounts } = await supabaseAdmin
      .from("artist_accounts")
      .select("id, stripe_connect_id")
      .in("id", artistIds);
    
    // Create transfers to each artist
    const transfers = [];
    
    for (const artistAccount of artistAccounts) {
      const amount = payoutsByArtist[artistAccount.id];
      if (!amount || amount <= 0) continue;
      
      // Create a transfer to the artist's connected account
      const transfer = await stripe.transfers.create({
        amount: amount,
        currency: "usd",
        destination: artistAccount.stripe_connect_id,
        description: "Lokal marketplace sales payout",
      });
      
      transfers.push({
        artist_id: artistAccount.id,
        amount,
        stripe_transfer_id: transfer.id,
      });
    }
    
    // Update transactions to mark them as paid out
    await supabaseAdmin
      .from("transactions")
      .update({ status: "paid_out" })
      .in("id", pendingTransactions.map(t => t.id));
    
    return new Response(
      JSON.stringify({ 
        message: "Payouts processed successfully", 
        payouts: transfers.length 
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
