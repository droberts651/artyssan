
import { Link } from "react-router-dom";
import { useAuthStore } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Home, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UnauthorizedPage = () => {
  const { profile } = useAuthStore();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-craft-background py-20">
        <div className="container-custom max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">
                <ShieldAlert className="h-10 w-10 text-red-500" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-8">
              Sorry, you don't have permission to access this page. This area is restricted to 
              {profile?.role === "customer" ? " artists and administrators" : " administrators"} only.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-[#19747E] hover:bg-[#19747E]/90">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Home
                </Link>
              </Button>
              {profile?.role === "customer" && (
                <Button variant="outline" asChild>
                  <Link to="/artist/sell">
                    <User className="mr-2 h-4 w-4" />
                    Become an Artist
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UnauthorizedPage;
