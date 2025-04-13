import React from "react";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cartStore";

const CartDropdown = () => {
  const { items, removeItem, updateQuantity, calculateTotal } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();

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

  const handleContinueShopping = () => {
    if (location.pathname.includes('/categories/')) {
      navigate(location.pathname);
    } else {
      navigate("/new-arrivals");
    }
  };

  return (
    <div className="divide-y">
      <div className="p-4 bg-craft-navy text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart size={18} />
            <h3 className="font-medium">Your Cart</h3>
          </div>
          <span className="text-sm bg-white text-craft-navy px-2 py-0.5 rounded-full">
            {items.length} {items.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="p-8 text-center">
          <ShoppingCart size={40} className="mx-auto mb-3 text-gray-300" />
          <h3 className="font-medium mb-1">Your cart is empty</h3>
          <p className="text-sm text-gray-500 mb-4">Start shopping to add items to your cart</p>
          <Button 
            className="bg-craft-terracotta hover:bg-craft-terracotta/90"
            onClick={handleContinueShopping}
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <>
          <div className="max-h-80 overflow-y-auto p-3 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 py-2">
                <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                  <div className="text-craft-terracotta font-medium mt-1">${item.price.toFixed(2)}</div>
                  
                  <div className="flex items-center mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="mx-2 text-sm min-w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 ml-auto text-gray-400 hover:text-red-500"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 bg-gray-50">
            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span className="font-medium">${calculateTotal().toFixed(2)}</span>
            </div>
            
            <Button 
              className="w-full bg-craft-terracotta hover:bg-craft-terracotta/90 mb-2"
              onClick={() => navigate("/checkout")}
            >
              Checkout
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate("/cart")}
            >
              View Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
