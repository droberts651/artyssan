
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cartStore";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; // This would need to be created

// Import Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Payment form component
const PaymentForm = ({ clientSecret, orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const { clearCart } = useCartStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/order-confirmation?order_id=" + orderId,
      },
      redirect: "if_required",
    });

    if (error) {
      toast({
        title: "Payment failed",
        description: error.message || "An unexpected error occurred",
        variant: "destructive",
      });
      setIsProcessing(false);
    } else {
      // Payment succeeded (if no redirect)
      clearCart();
      toast({
        title: "Order placed successfully!",
        description: "Thank you for shopping with Lokal",
      });
      navigate("/order-confirmation?order_id=" + orderId);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button
        type="submit"
        className="w-full bg-craft-terracotta hover:bg-craft-terracotta/90 mt-4"
        disabled={isProcessing || !stripe || !elements}
      >
        {isProcessing ? (
          <>Processing...</>
        ) : (
          <>
            <CreditCard className="mr-2" size={16} />
            Complete Order
          </>
        )}
      </Button>
    </form>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart, calculateTotal } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Create payment intent when the form is complete
  const createPaymentIntent = async () => {
    if (items.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before proceeding to checkout",
        variant: "destructive"
      });
      return;
    }

    if (
      !formData.fullName || 
      !formData.email || 
      !formData.address || 
      !formData.city || 
      !formData.state || 
      !formData.zipCode
    ) {
      toast({
        title: "Missing information",
        description: "Please fill out all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);

    try {
      const { data, error } = await supabase.functions.invoke('process-payment', {
        body: {
          items,
          shippingInfo: {
            name: formData.fullName,
            email: formData.email,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // Set the client secret and order ID
      setClientSecret(data.clientSecret);
      setOrderId(data.orderId);
    } catch (error) {
      toast({
        title: "Error creating payment",
        description: error.message || "Please try again later",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container-custom">
          <Button 
            variant="ghost" 
            className="mb-6 flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft size={16} />
            Back to Cart
          </Button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h1 className="text-2xl font-bold text-craft-navy mb-6">Checkout</h1>
                
                {!clientSecret ? (
                  <div>
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-4 text-craft-navy">Contact Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input 
                            id="fullName" 
                            name="fullName" 
                            value={formData.fullName} 
                            onChange={handleInputChange} 
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h2 className="text-lg font-semibold mb-4 text-craft-navy">Shipping Address</h2>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input 
                            id="address" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleInputChange} 
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input 
                              id="city" 
                              name="city" 
                              value={formData.city} 
                              onChange={handleInputChange} 
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input 
                              id="state" 
                              name="state" 
                              value={formData.state} 
                              onChange={handleInputChange} 
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input 
                              id="zipCode" 
                              name="zipCode" 
                              value={formData.zipCode} 
                              onChange={handleInputChange} 
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={createPaymentIntent}
                      className="w-full bg-craft-terracotta hover:bg-craft-terracotta/90 mt-4"
                      disabled={isProcessing || items.length === 0}
                    >
                      {isProcessing ? "Processing..." : "Proceed to Payment"}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-lg font-semibold mb-4 text-craft-navy">Payment Information</h2>
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <PaymentForm clientSecret={clientSecret} orderId={orderId} />
                    </Elements>
                  </div>
                )}
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-sm sticky top-6">
                <h2 className="text-lg font-semibold mb-4 text-craft-navy">Order Summary</h2>
                
                {items.length === 0 ? (
                  <p className="text-gray-500 py-4">Your cart is empty</p>
                ) : (
                  <>
                    <div className="divide-y">
                      {items.map((item) => (
                        <div key={item.id} className="py-3 flex items-center gap-3">
                          <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <div className="text-gray-500 text-sm mt-1">
                              Qty: {item.quantity} × ${item.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-200 mt-4 pt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Shipping:</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tax:</span>
                        <span>${(calculateTotal() * 0.07).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-semibold text-craft-navy pt-2 text-lg">
                        <span>Total:</span>
                        <span>${(calculateTotal() + 5 + calculateTotal() * 0.07).toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
