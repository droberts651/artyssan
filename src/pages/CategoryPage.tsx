import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";

// Using the categories from FeaturedCategories component
const categories = [
  { id: 1, name: "Painting" },
  { id: 2, name: "Jewelry" },
  { id: 3, name: "Textiles" },
  { id: 4, name: "Ceramics" },
  { id: 5, name: "Apparel" },
  { id: 6, name: "Woodwork" },
  { id: 7, name: "Illustration" },
  { id: 8, name: "Bookbinding" },
];

// Mock item data
const mockItems = {
  "Painting": [
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
    }
  ],
  "Jewelry": [
    {
      id: 201,
      name: "Silver Leaf Earrings",
      artist: "David Chen",
      price: 32.00,
      image: "https://images.unsplash.com/photo-1630019852942-7a3592370ba9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
      category: "Jewelry"
    },
    {
      id: 202,
      name: "Copper Bangles",
      artist: "Aisha Johnson",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1601821765780-754fa98637c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      category: "Jewelry"
    }
  ],
  "Textiles": [
    {
      id: 301,
      name: "Hand-Woven Wall Hanging",
      artist: "Aisha Johnson",
      price: 75.00,
      image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      category: "Textiles"
    },
    {
      id: 302,
      name: "Hand-Printed Linen Scarf",
      artist: "Sofia Martinez",
      price: 38.00,
      image: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3024&q=80",
      category: "Textiles"
    }
  ],
  "Ceramics": [
    {
      id: 401,
      name: "Handcrafted Ceramic Mug",
      artist: "Emma Thompson",
      price: 28.00,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      category: "Ceramics"
    },
    {
      id: 402,
      name: "Stoneware Vase",
      artist: "Emma Thompson",
      price: 68.00,
      image: "https://images.unsplash.com/photo-1612196319128-2e51846e0e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2748&q=80",
      category: "Ceramics"
    }
  ],
  "Apparel": [
    {
      id: 501,
      name: "Hand-Dyed Cotton Shirt",
      artist: "Sofia Martinez",
      price: 55.00,
      image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      category: "Apparel"
    },
    {
      id: 502,
      name: "Embroidered Denim Jacket",
      artist: "Marcus Rivera",
      price: 120.00,
      image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      category: "Apparel"
    }
  ],
  "Woodwork": [
    {
      id: 601,
      name: "Wooden Serving Board",
      artist: "Marcus Rivera",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1605433247501-698405495b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80",
      category: "Woodwork"
    },
    {
      id: 602,
      name: "Handcrafted Oak Desk",
      artist: "David Chen",
      price: 450.00,
      image: "https://images.unsplash.com/photo-1611269154421-162e7bd18d1a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2693&q=80",
      category: "Woodwork"
    }
  ],
  "Illustration": [
    {
      id: 701,
      name: "Botanical Art Print",
      artist: "Sofia Martinez",
      price: 24.00,
      image: "https://images.unsplash.com/photo-1561347981-969c80cf4463?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      category: "Illustration"
    },
    {
      id: 702,
      name: "Digital Wildlife Sketch",
      artist: "David Chen",
      price: 18.00,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2564&q=80",
      category: "Illustration"
    }
  ],
  "Bookbinding": [
    {
      id: 801,
      name: "Leather-Bound Journal",
      artist: "Emma Thompson",
      price: 42.00,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
      category: "Bookbinding"
    },
    {
      id: 802,
      name: "Hand-Stitched Sketchbook",
      artist: "Aisha Johnson",
      price: 35.00,
      image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      category: "Bookbinding"
    }
  ]
};

interface Item {
  id: number;
  name: string;
  artist: string;
  price: number;
  image: string;
  category: string;
}

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [randomItems, setRandomItems] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryName || null);

  // Function to get a random item from a category
  const getRandomItem = (categoryName: string): Item | null => {
    const items = mockItems[categoryName as keyof typeof mockItems];
    if (!items || items.length === 0) return null;
    
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
  };

  useEffect(() => {
    // If a specific category is selected, only show items from that category
    if (selectedCategory) {
      const item = getRandomItem(selectedCategory);
      setRandomItems(item ? [item] : []);
    } else {
      // Otherwise show one random item from each category
      const items = categories.map(category => {
        return getRandomItem(category.name);
      }).filter(item => item !== null) as Item[];
      
      setRandomItems(items);
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-white">
        <div className="container-custom py-12">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#19747E]">
              {selectedCategory ? `${selectedCategory} Collection` : "Browse All Categories"}
            </h1>
            {selectedCategory && (
              <Button 
                variant="outline" 
                onClick={() => setSelectedCategory(null)}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back to All Categories
              </Button>
            )}
          </div>

          {!selectedCategory && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
              {categories.map((category) => (
                <Card 
                  key={category.id} 
                  className="bg-[#D1E8E2] hover:bg-[#A9D6E5] transition-colors duration-300 cursor-pointer"
                  onClick={() => setSelectedCategory(category.name)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-[#19747E]">{category.name}</CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {randomItems.map((item) => (
              <Card key={item.id} className="overflow-hidden card-hover">
                <div className="relative h-64 overflow-hidden group">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="flex gap-3">
                      <Button size="icon" variant="secondary" className="rounded-full bg-white text-[#19747E] hover:bg-white/90">
                        <Heart size={18} />
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full bg-[#19747E] text-white hover:bg-[#19747E]/90">
                        <ShoppingCart size={18} />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-[#19747E] text-white text-xs px-2 py-1 rounded">
                    {item.category}
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-[#19747E] hover:text-[#A9D6E5] transition-colors duration-300">
                    <Link to="#">{item.name}</Link>
                  </h3>
                  <p className="text-gray-600 text-sm">by {item.artist}</p>
                </CardContent>
                <CardFooter className="px-5 pb-5 pt-0 flex justify-between items-center">
                  <span className="text-[#19747E] font-semibold">${item.price.toFixed(2)}</span>
                  <Button variant="ghost" size="sm" className="text-[#19747E] hover:text-[#A9D6E5]">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoryPage;
