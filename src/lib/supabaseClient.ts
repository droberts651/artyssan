
import { createClient } from '@supabase/supabase-js';

// Use the values directly from our Supabase config
const supabaseUrl = "https://phdixypytjgwcelamfdp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBoZGl4eXB5dGpnd2NlbGFtZmRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMDUyNjgsImV4cCI6MjA1OTc4MTI2OH0.fx5eWF41Vg6j3zXE99rX7HQdBuPbaV67uKXbuynoJws";

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
