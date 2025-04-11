
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Lock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

const ArtistLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle authentication
    // For demo purposes, we'll just navigate to the listings page
    toast({
      title: "Login successful",
      description: "Welcome back to your artist dashboard",
    });
    navigate("/artist/listings");
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-craft-background py-12">
        <div className="container-custom max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Login image side */}
              <div className="hidden md:block bg-[#19747E] p-12 relative">
                <div className="absolute inset-0 opacity-20 bg-pattern"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-3">Artist Portal</h2>
                    <p className="text-[#D1E8E2] opacity-90">
                      Log in to manage your handcrafted items and track your sales
                    </p>
                  </div>
                  <div>
                    <p className="text-[#D1E8E2] text-sm italic">
                      "Crafting is not just about creating something beautiful, it's about sharing your unique perspective with the world."
                    </p>
                  </div>
                </div>
              </div>

              {/* Login form side */}
              <div className="p-8 md:p-12">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-[#19747E] mb-2">Welcome Back</h3>
                  <p className="text-gray-600">Sign in to your artist account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <User size={18} />
                      </div>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="text-sm text-[#19747E] hover:underline">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                        <Lock size={18} />
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={rememberMe}
                      onCheckedChange={(checked) => {
                        setRememberMe(checked as boolean);
                      }}
                    />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-[#19747E] hover:bg-[#19747E]/90"
                  >
                    Sign In
                    <ArrowRight className="ml-2" size={16} />
                  </Button>

                  <div className="text-center mt-6">
                    <p className="text-sm text-gray-600">
                      Don't have an account?{" "}
                      <a href="#" className="text-[#19747E] hover:underline font-medium">
                        Register Now
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtistLogin;
