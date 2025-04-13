
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCartStore();
  
  useEffect(() => {
    // Clear the cart when order is confirmed
    clearCart();
  }, [clearCart]);
  
  // Generate a random order number
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  const handleContinueShopping = () => {
    // Get the last visited category from localStorage, if available
    const lastCategory = localStorage.getItem("lastVisitedCategory");
    
    if (lastCategory) {
      navigate(lastCategory);
    } else {
      // Default to categories page if no last category
      navigate("/categories");
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container-custom max-w-3xl">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="flex justify-center mb-6">
              <CheckCircle size={64} className="text-green-500" />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-craft-navy mb-4">
              Thank You for Your Order!
            </h1>
            
            <p className="text-gray-600 mb-6">
              Your order has been received and is being processed. An email confirmation has been sent to your email address.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold text-craft-navy mb-4">Order Details</h2>
              
              <div className="flex flex-col md:flex-row justify-between items-center mb-4 text-gray-700">
                <div className="mb-2 md:mb-0">
                  <span className="font-medium">Order Number:</span> 
                  <span className="ml-2">{orderNumber}</span>
                </div>
                <div>
                  <span className="font-medium">Order Date:</span> 
                  <span className="ml-2">{new Date().toLocaleDateString()}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                Please save your order number for future reference. You'll need it if you have any questions about your order.
              </p>
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                We'll notify you once your order has shipped. For any questions or concerns, please contact our customer support.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
                <Button
                  onClick={handleContinueShopping}
                  className="bg-craft-terracotta hover:bg-craft-terracotta/90"
                >
                  Continue Shopping <ArrowRight className="ml-2" size={16} />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate("/track-order", { state: { orderNumber } })}
                >
                  Track Your Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
