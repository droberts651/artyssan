
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
    const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY") || "", {
      apiVersion: "2023-10-16",
    });
    
    // Create Supabase clients
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
    
    // Parse request body for artist information
    const { storeName, email, url } = await req.json();
    
    if (!storeName) {
      throw new Error("Store name is required");
    }
    
    // Check if artist account already exists
    const { data: existingAccount } = await supabaseAdmin
      .from("artist_accounts")
      .select("*")
      .eq("user_id", user.id)
      .single();
    
    let stripeAccountId = existingAccount?.stripe_connect_id;
    
    // If no Stripe account exists, create one
    if (!stripeAccountId) {
      // Create a Stripe Connect account
      const account = await stripe.accounts.create({
        type: "express",
        country: "US",
        email: email || user.email,
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_type: "individual",
      });
      
      stripeAccountId = account.id;
      
      // Store the artist account info
      await supabaseAdmin.from("artist_accounts").insert({
        user_id: user.id,
        stripe_connect_id: stripeAccountId,
        store_name: storeName,
        payout_enabled: false,
      });
    }
    
    // Create an account link for the user to onboard with Stripe
    const origin = req.headers.get("origin") || "http://localhost:3000";
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${origin}/artist/onboarding?refresh=true`,
      return_url: `${origin}/artist/dashboard`,
      type: "account_onboarding",
    });
    
    // Return the onboarding URL
    return new Response(
      JSON.stringify({ url: accountLink.url }),
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
