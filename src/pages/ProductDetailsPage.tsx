import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Share2, ArrowLeft, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";
import { useCartStore } from "@/store/cartStore";
import FeedbackForm from "@/components/FeedbackForm";
import ProductFeedback, { FeedbackItem } from "@/components/ProductFeedback";

const productsData = {
  "101": {
    id: 101,
    name: "Abstract Landscape",
    artist: "Emma Thompson",
    price: 185.00,
    description: "A vibrant abstract landscape inspired by the Pacific Northwest. This original painting features layers of bold colors and organic shapes that create a sense of depth and movement.",
    images: [
      "https://images.unsplash.com/photo-1432386171343-3d183a83e2df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      "https://images.unsplash.com/photo-1615639164215-6001ea204fad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    ],
    category: "Painting",
    dimensions: "24\" x 36\"",
    materials: "Acrylic on canvas",
    inStock: true,
  },
  "201": {
    id: 201,
    name: "Silver Leaf Earrings",
    artist: "David Chen",
    price: 32.00,
    description: "Handcrafted silver earrings inspired by natural leaf forms. Each piece is delicately shaped and textured to capture the organic beauty of leaves.",
    images: [
      "https://images.unsplash.com/photo-1630019852942-7a3592370ba9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80",
    ],
    category: "Jewelry",
    dimensions: "1.5\" length",
    materials: "Sterling silver",
    inStock: true,
  },
  "301": {
    id: 301,
    name: "Hand-Woven Wall Hanging",
    artist: "Aisha Johnson",
    price: 75.00,
    description: "A beautiful hand-woven wall hanging created using traditional techniques. The natural fibers and earthy tones make this piece a perfect addition to any bohemian or minimalist space.",
    images: [
      "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      "https://images.unsplash.com/photo-1528484458563-9a2b06af0e6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    ],
    category: "Textiles",
    dimensions: "24\" x 36\"",
    materials: "Cotton, wool, and jute",
    inStock: true,
  },
  "401": {
    id: 401,
    name: "Handcrafted Ceramic Mug",
    artist: "Emma Thompson",
    price: 28.00,
    description: "A beautifully crafted ceramic mug, perfect for your morning coffee or tea. Each mug is wheel-thrown and glazed by hand, making each piece unique.",
    images: [
      "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      "https://images.unsplash.com/photo-1577037834513-812aad9d0fba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2760&q=80",
    ],
    category: "Ceramics",
    dimensions: "4\" height, 3.5\" diameter",
    materials: "Stoneware clay with food-safe glaze",
    inStock: true,
  },
};

const mockFeedbackData: Record<string, FeedbackItem[]> = {
  "101": [
    {
      id: 1,
      productId: 101,
      userId: "user1",
      userName: "Sarah Wilson",
      rating: 5,
      comment: "This painting is absolutely stunning in person! The colors are even more vibrant than shown in the photos, and it's the perfect statement piece for my living room.",
      createdAt: "2025-03-15T14:30:00Z",
    },
    {
      id: 2,
      productId: 101,
      userId: "user2",
      userName: "Michael Johnson",
      rating: 4,
      comment: "Beautiful artwork that arrived well-packaged. Slightly smaller than I expected, but still very happy with the purchase.",
      createdAt: "2025-02-20T09:15:00Z",
    },
  ],
  "201": [
    {
      id: 3,
      productId: 201,
      userId: "user3",
      userName: "Lisa Chen",
      rating: 5,
      comment: "These earrings are so delicate and beautiful. I receive compliments every time I wear them!",
      createdAt: "2025-04-05T16:45:00Z",
    },
  ],
};

const ProductDetailsPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [feedbackFormOpen, setFeedbackFormOpen] = useState(false);
  const { addItem } = useCartStore();
  
  const product = productId && productsData[productId] 
    ? productsData[productId] 
    : null;
  
  const productFeedback = productId ? mockFeedbackData[productId] || [] : [];
  
  if (!product) {
    return (
      <>
        <Navbar />
        <div className="container-custom py-20 text-center">
          <h1 className="text-2xl font-bold text-craft-navy mb-4">Product Not Found</h1>
          <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate(-1)} className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Go Back
          </Button>
        </div>
        <Footer />
      </>
    );
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0]
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} added to your cart`,
    });
  };
  
  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0]
    });
    
    navigate("/checkout");
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0) {
      setQuantity(newQuantity);
    }
  };

  const handleFeedbackSubmitted = () => {
    toast({
      title: "Thank you for your feedback!",
      description: "Your review helps other shoppers make informed decisions.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container-custom py-12">
          <Button 
            variant="outline" 
            className="mb-8 flex items-center gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src={product.images[selectedImageIndex]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`w-24 h-24 rounded-md overflow-hidden ${
                      selectedImageIndex === index ? "ring-2 ring-craft-terracotta" : "opacity-70"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h1 className="text-3xl font-bold text-craft-navy mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-2">by {product.artist}</p>
              <p className="text-2xl font-semibold text-craft-navy mb-6">${product.price.toFixed(2)}</p>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h2 className="font-semibold mb-2">Details</h2>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li><span className="font-medium">Category:</span> {product.category}</li>
                  <li><span className="font-medium">Dimensions:</span> {product.dimensions}</li>
                  <li><span className="font-medium">Materials:</span> {product.materials}</li>
                  <li>
                    <span className="font-medium">Availability:</span>
                    {product.inStock ? (
                      <span className="text-green-600 ml-2">In Stock</span>
                    ) : (
                      <span className="text-red-600 ml-2">Out of Stock</span>
                    )}
                  </li>
                </ul>
              </div>
              
              <p className="text-gray-700 mb-8">{product.description}</p>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <button 
                    className="px-3 py-1 text-xl"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >-</button>
                  <span className="px-4 py-1 border-x">{quantity}</span>
                  <button 
                    className="px-3 py-1 text-xl"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >+</button>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex-1 bg-craft-terracotta hover:bg-craft-terracotta/90 text-white"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Buy Now
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 flex items-center justify-center gap-2 border-craft-terracotta text-craft-terracotta hover:bg-craft-terracotta/10"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </Button>
              </div>
              
              <div className="flex items-center gap-4 mt-6 text-gray-500">
                <button className="flex items-center gap-1 hover:text-craft-navy transition-colors">
                  <Heart size={18} />
                  <span className="text-sm">Save</span>
                </button>
                <button className="flex items-center gap-1 hover:text-craft-navy transition-colors">
                  <Share2 size={18} />
                  <span className="text-sm">Share</span>
                </button>
                <button 
                  className="flex items-center gap-1 hover:text-craft-navy transition-colors ml-auto"
                  onClick={() => setFeedbackFormOpen(true)}
                >
                  <MessageSquare size={18} />
                  <span className="text-sm">Leave Feedback</span>
                </button>
              </div>
            </div>
          </div>
          
          {productFeedback.length > 0 && (
            <div className="mt-16">
              <ProductFeedback feedback={productFeedback} />
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      {product && (
        <FeedbackForm
          productId={product.id}
          productName={product.name}
          artistName={product.artist}
          open={feedbackFormOpen}
          onOpenChange={setFeedbackFormOpen}
          onFeedbackSubmitted={handleFeedbackSubmitted}
        />
      )}
    </div>
  );
};

export default ProductDetailsPage;
