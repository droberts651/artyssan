
import React from "react";
import { ShoppingCart, X, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Sample cart items - in a real app, these would come from a global state or context
const initialCartItems = [
  {
    id: 1,
    name: "Handmade Ceramic Mug",
    price: 24.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Wooden Cutting Board",
    price: 49.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
];

const CartDropdown = () => {
  const [cartItems, setCartItems] = React.useState(initialCartItems);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item was removed from your cart",
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
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
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="p-8 text-center">
          <ShoppingCart size={40} className="mx-auto mb-3 text-gray-300" />
          <h3 className="font-medium mb-1">Your cart is empty</h3>
          <p className="text-sm text-gray-500 mb-4">Start shopping to add items to your cart</p>
          <Button 
            className="bg-craft-terracotta hover:bg-craft-terracotta/90"
            onClick={() => toast({
              title: "Feature coming soon",
              description: "The shop page is currently being developed"
            })}
          >
            Browse Products
          </Button>
        </div>
      ) : (
        <>
          <div className="max-h-80 overflow-y-auto p-3 space-y-3">
            {cartItems.map((item) => (
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
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="mx-2 text-sm min-w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-full"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 ml-auto text-gray-400 hover:text-red-500"
                      onClick={() => removeItem(item.id)}
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
            
            <Button className="w-full bg-craft-terracotta hover:bg-craft-terracotta/90 mb-2">
              Checkout
            </Button>
            
            <Button variant="outline" className="w-full" onClick={() => toast({
              title: "Feature coming soon",
              description: "View cart page is currently being developed"
            })}>
              View Cart
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
