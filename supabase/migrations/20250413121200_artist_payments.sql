
-- Create a table for artist payment accounts
CREATE TABLE public.artist_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_connect_id TEXT UNIQUE,
  store_name TEXT NOT NULL,
  payout_enabled BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create a table for order transactions
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL,
  customer_id UUID REFERENCES auth.users(id),
  amount_total INTEGER NOT NULL,
  platform_fee INTEGER NOT NULL,
  artist_payout INTEGER NOT NULL,
  status TEXT NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Create a table for order items to track which artist gets paid for which items
CREATE TABLE public.order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL,
  product_id INTEGER NOT NULL,
  artist_id UUID REFERENCES public.artist_accounts(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL,
  item_price INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.artist_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Artists can only view and update their own accounts
CREATE POLICY "Artists can view their own accounts" 
  ON public.artist_accounts FOR SELECT 
  USING (user_id = auth.uid());

CREATE POLICY "Artists can update their own accounts" 
  ON public.artist_accounts FOR UPDATE 
  USING (user_id = auth.uid());

-- Everyone can view their own transactions
CREATE POLICY "Users can view their own transactions" 
  ON public.transactions FOR SELECT 
  USING (customer_id = auth.uid());
