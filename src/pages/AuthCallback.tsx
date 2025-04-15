
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/lib/auth";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { fetchProfile } = useAuthStore();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      // Get the session - Supabase will automatically exchange the code for a session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error with auth callback:", error);
        navigate("/auth");
        return;
      }
      
      if (session) {
        // Fetch the user profile
        await fetchProfile();
        
        // Redirect based on profile
        if (session.user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          if (profile) {
            if (profile.role === 'admin') {
              navigate("/admin/dashboard");
            } else if (profile.role === 'artist') {
              navigate("/artist/listings");
            } else {
              navigate("/");
            }
          } else {
            navigate("/");
          }
        } else {
          navigate("/");
        }
      } else {
        navigate("/auth");
      }
    };

    handleAuthCallback();
  }, [navigate, fetchProfile]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#19747E]"></div>
    </div>
  );
};

export default AuthCallback;
