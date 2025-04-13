
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import { toast } from "@/hooks/use-toast";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, calculateTotal } = useCartStore();

  const handleRemoveItem = (id: number) => {
    removeItem(id);
    toast({
      title: "Item removed",
      description: "Item was removed from your cart",
    });
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleClearCart = () => {
    clearCart();
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-craft-navy">Your Cart</h1>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Button>
          </div>

          {items.length === 0 ? (
            <div className="bg-white rounded-lg p-12 text-center">
              <div className="mb-6 flex justify-center">
                <ShoppingCart size={64} className="text-gray-300" />
              </div>
              <h2 className="text-xl font-medium text-craft-navy mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Button
                className="bg-craft-terracotta hover:bg-craft-terracotta/90"
                onClick={() => navigate("/new-arrivals")}
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 bg-craft-navy text-white flex justify-between items-center">
                    <h2 className="font-medium">Shopping Cart ({items.length} items)</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:text-white hover:bg-white/10"
                      onClick={handleClearCart}
                    >
                      <Trash2 size={14} className="mr-2" />
                      Clear All
                    </Button>
                  </div>

                  <div className="divide-y">
                    {items.map((item) => (
                      <div key={item.id} className="p-4 flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <div className="text-craft-terracotta font-medium mt-1">
                            ${item.price.toFixed(2)}
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mt-3">
                            <div className="flex items-center border rounded">
                              <button
                                className="px-3 py-1 hover:bg-gray-100"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={14} />
                              </button>
                              <span className="px-4 py-1 border-x">{item.quantity}</span>
                              <button
                                className="px-3 py-1 hover:bg-gray-100"
                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-red-500"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 size={16} className="mr-2" />
                              Remove
                            </Button>
                          </div>
                        </div>

                        <div className="font-medium text-right">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                  <h2 className="text-lg font-semibold mb-4 text-craft-navy">Order Summary</h2>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span>$5.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span>${(calculateTotal() * 0.07).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span className="text-craft-navy">
                          ${(calculateTotal() + 5 + calculateTotal() * 0.07).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-craft-terracotta hover:bg-craft-terracotta/90 mb-3"
                    onClick={() => navigate("/checkout")}
                  >
                    Proceed to Checkout
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(-1)}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
