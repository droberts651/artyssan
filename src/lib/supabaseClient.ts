
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with proper error handling
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are set
if (!supabaseUrl) {
  console.error('Missing environment variable: VITE_SUPABASE_URL');
}

if (!supabaseAnonKey) {
  console.error('Missing environment variable: VITE_SUPABASE_ANON_KEY');
}

// Create a dummy client for development if variables are missing
// This prevents the app from crashing during development
export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      // Provide a mock implementation that logs instead of crashing
      functions: {
        invoke: async (name: string, options?: any) => {
          console.error(`Cannot invoke function "${name}": Supabase not initialized. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.`);
          return { data: null, error: new Error('Supabase not initialized') };
        }
      },
      auth: {
        signIn: async () => {
          console.error('Supabase auth not initialized. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
          return { data: null, error: new Error('Supabase not initialized') };
        },
        signOut: async () => {
          console.error('Supabase auth not initialized. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables.');
          return { error: new Error('Supabase not initialized') };
        }
      }
    } as any; // Type assertion to any to avoid TypeScript errors

// Add a message to the Vite-env.d.ts file to document the needed environment variables
