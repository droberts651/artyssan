
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCog, Users, ShoppingBag, MessageSquare, Settings } from "lucide-react";

const AdminDashboard = () => {
  const { profile, isAdmin } = useAuthStore();
  const navigate = useNavigate();

  // Redirect if not admin
  useEffect(() => {
    if (profile && !isAdmin()) {
      navigate("/unauthorized");
    }
  }, [profile, isAdmin, navigate]);

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#19747E]"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-craft-background py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Users className="mr-2 h-5 w-5 text-[#19747E]" />
                  User Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">Manage user accounts, roles, and permissions</p>
                <button 
                  className="text-[#19747E] font-medium hover:underline"
                  onClick={() => navigate("/admin/users")}
                >
                  Manage Users →
                </button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <ShoppingBag className="mr-2 h-5 w-5 text-[#19747E]" />
                  Product Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">Review and manage artisan products</p>
                <button 
                  className="text-[#19747E] font-medium hover:underline"
                  onClick={() => navigate("/admin/products")}
                >
                  Manage Products →
                </button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-[#19747E]" />
                  Forum Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">Moderate the artist forum posts and discussions</p>
                <button 
                  className="text-[#19747E] font-medium hover:underline"
                  onClick={() => navigate("/admin/forum")}
                >
                  Moderate Forum →
                </button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <UserCog className="mr-2 h-5 w-5 text-[#19747E]" />
                  Admin Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">Manage admin accounts and permissions</p>
                <button 
                  className="text-[#19747E] font-medium hover:underline"
                  onClick={() => navigate("/admin/admins")}
                >
                  Manage Admins →
                </button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5 text-[#19747E]" />
                  Site Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">Configure platform settings and preferences</p>
                <button 
                  className="text-[#19747E] font-medium hover:underline"
                  onClick={() => navigate("/admin/settings")}
                >
                  Site Settings →
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
