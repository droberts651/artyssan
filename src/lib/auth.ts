import { supabase } from "./supabaseClient";
import { User, Session, Provider } from "@supabase/supabase-js";
import { create } from "zustand";
import { toast } from "@/components/ui/use-toast";

type UserRole = "admin" | "artist" | "customer";

export type UserProfile = {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
};

export type AuthState = {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
};

export type AuthActions = {
  login: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, role: UserRole, full_name: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  isAdmin: () => boolean;
  isArtist: () => boolean;
  isCustomer: () => boolean;
};

// Create store for auth state
export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      set({ user: data.user, session: data.session });
      
      // Fetch profile after successful login
      await get().fetchProfile();
      
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
    } catch (error: any) {
      set({ error: error.message });
      toast({
        title: "Login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  signInWithGoogle: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
      
      // Note: We don't set user/session here as the redirect will happen
      // and onAuthStateChange will handle setting the user on return
      
      toast({
        title: "Redirecting to Google",
        description: "Please complete the authentication process.",
      });
    } catch (error: any) {
      set({ error: error.message });
      toast({
        title: "Google login failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  signup: async (email: string, password: string, role: UserRole, full_name: string) => {
    try {
      set({ isLoading: true, error: null });
      
      // Sign up the user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name,
          },
        },
      });

      if (error) throw error;
      
      // Set the role in the profiles table
      if (data.user) {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ role, full_name })
          .eq('id', data.user.id);
          
        if (updateError) throw updateError;
      }
      
      set({ user: data.user, session: data.session });
      await get().fetchProfile();
      
      toast({
        title: "Registration successful",
        description: "Your account has been created successfully.",
      });
    } catch (error: any) {
      set({ error: error.message });
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null, profile: null, session: null });
      toast({
        title: "Logout successful",
        description: "You have been logged out.",
      });
    } catch (error: any) {
      set({ error: error.message });
      toast({
        title: "Logout failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProfile: async () => {
    const { user } = get();
    if (!user) return;

    try {
      set({ isLoading: true });
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      if (data) {
        set({ 
          profile: {
            id: data.id,
            username: data.username,
            full_name: data.full_name,
            avatar_url: data.avatar_url,
            role: data.role
          } 
        });
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  isAdmin: () => {
    const { profile } = get();
    return profile?.role === 'admin';
  },

  isArtist: () => {
    const { profile } = get();
    return profile?.role === 'artist';
  },

  isCustomer: () => {
    const { profile } = get();
    return profile?.role === 'customer';
  }
}));

// Initialize auth state by subscribing to auth changes
// Fix: Make sure initAuth returns the cleanup function directly, not a Promise
export const initAuth = () => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (event, session) => {
      useAuthStore.setState({ user: session?.user || null, session });
      
      // If the user is logged in, fetch their profile
      if (session?.user) {
        setTimeout(() => {
          useAuthStore.getState().fetchProfile();
        }, 0);
      }
    }
  );

  // Check for existing session (async operation)
  supabase.auth.getSession().then(({ data: { session } }) => {
    useAuthStore.setState({ 
      user: session?.user || null, 
      session,
      isLoading: false 
    });
    
    // Fetch profile if user exists
    if (session?.user) {
      useAuthStore.getState().fetchProfile();
    }
  });

  // Return the cleanup function directly
  return () => {
    subscription.unsubscribe();
  };
};
