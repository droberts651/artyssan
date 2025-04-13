
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore, CartItem } from "@/store/cartStore";
import { toast } from "@/hooks/use-toast";

// Mock products database - in a real app would come from an API
const allProducts = [
  {
    id: 101,
    name: "Abstract Landscape",
    artist: "Emma Thompson",
    price: 185.00,
    image: "https://images.unsplash.com/photo-1432386171343-3d183a83e2df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    category: "Painting"
  },
  {
    id: 102,
    name: "Urban Cityscape",
    artist: "Marcus Rivera",
    price: 220.00,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    category: "Painting"
  },
  {
    id: 201,
    name: "Silver Leaf Earrings",
    artist: "David Chen",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1630019852942-7a3592370ba9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
    category: "Jewelry"
  },
  {
    id: 301,
    name: "Hand-Woven Wall Hanging",
    artist: "Aisha Johnson",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    category: "Textiles"
  },
  {
    id: 401,
    name: "Handcrafted Ceramic Mug",
    artist: "Emma Thompson",
    price: 28.00,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    category: "Ceramics"
  },
  {
    id: 501,
    name: "Hand-Dyed Cotton Shirt",
    artist: "Sofia Martinez",
    price: 55.00,
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    category: "Apparel"
  },
  {
    id: 601,
    name: "Wooden Serving Board",
    artist: "Marcus Rivera",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1605433247501-698405495b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80",
    category: "Woodwork"
  },
  {
    id: 701,
    name: "Botanical Art Print",
    artist: "Sofia Martinez",
    price: 24.00,
    image: "https://images.unsplash.com/photo-1561347981-969c80cf4463?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    category: "Illustration"
  },
  {
    id: 801,
    name: "Leather-Bound Journal",
    artist: "Emma Thompson",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
    category: "Bookbinding"
  }
];

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<typeof allProducts>([]);
  const { addItem } = useCartStore();

  // Run search on mount and when query changes
  useEffect(() => {
    if (query.trim()) {
      console.log("Searching for:", query);
      const lowercaseQuery = query.toLowerCase().trim();
      
      const searchResults = allProducts.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.artist.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery)
      );
      
      console.log("Found results:", searchResults.length);
      setResults(searchResults);
    } else {
      setResults([]);
    }
  }, [query]);

  const handleAddToCart = (product: typeof allProducts[0]) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    };

    addItem(cartItem);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container-custom">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-craft-navy mb-4">
              Search Results for "{query}"
            </h1>
            <p className="text-gray-600">
              {results.length} {results.length === 1 ? 'result' : 'results'} found
            </p>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {results.map(product => (
                <Card key={product.id} className="overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden group">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        <Button size="icon" variant="secondary" className="rounded-full bg-white text-craft-navy hover:bg-white/90">
                          <Heart size={18} />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="secondary" 
                          className="rounded-full bg-craft-navy text-white hover:bg-craft-navy/90"
                          onClick={(e) => {
                            e.preventDefault();
                            handleAddToCart(product);
                          }}
                        >
                          <ShoppingCart size={18} />
                        </Button>
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-craft-navy text-white text-xs px-2 py-1 rounded">
                      {product.category}
                    </div>
                  </div>
                  <CardContent className="p-4 flex-grow">
                    <h3 className="text-lg font-semibold text-craft-navy hover:text-craft-terracotta transition-colors duration-300">
                      <Link to={`/product/${product.id}`}>{product.name}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm">by {product.artist}</p>
                  </CardContent>
                  <CardFooter className="border-t p-4 flex justify-between items-center">
                    <span className="text-craft-navy font-semibold">${product.price.toFixed(2)}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-craft-navy hover:text-craft-terracotta"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-xl font-medium text-gray-700">No results found</h2>
              <p className="text-gray-500 mt-2">
                Try searching with different keywords or browse our categories.
              </p>
              <Button
                className="mt-6 bg-craft-terracotta hover:bg-craft-terracotta/90"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
