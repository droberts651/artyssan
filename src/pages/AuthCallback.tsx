
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useAuthStore } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";

const AuthCallback = () => {
  const navigate = useNavigate();
  const { fetchProfile } = useAuthStore();

  useEffect(() => {
    // Handle the OAuth callback
    const handleAuthCallback = async () => {
      try {
        // Get the session - Supabase will automatically exchange the code for a session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error with auth callback:", error);
          toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive"
          });
          navigate("/auth");
          return;
        }
        
        if (session) {
          // Fetch the user profile
          await fetchProfile();
          
          // Redirect based on profile role
          if (session.user) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', session.user.id)
              .single();
              
            if (profile) {
              toast({
                title: "Login Successful",
                description: `Welcome back!`,
              });
              
              // Redirect based on user role
              switch(profile.role) {
                case 'admin':
                  navigate("/admin/dashboard");
                  break;
                case 'artist':
                  navigate("/artist/listings");
                  break;
                case 'customer':
                  navigate("/");
                  break;
                default:
                  navigate("/");
              }
            } else {
              toast({
                title: "Login Successful",
                description: "Welcome to Artlokal!",
              });
              navigate("/");
            }
          } else {
            navigate("/");
          }
        } else {
          toast({
            title: "Authentication Error",
            description: "No session found",
            variant: "destructive"
          });
          navigate("/auth");
        }
      } catch (error) {
        console.error("Error in auth callback:", error);
        toast({
          title: "Authentication Error",
          description: "An unexpected error occurred",
          variant: "destructive"
        });
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
