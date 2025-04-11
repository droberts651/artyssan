
import { useState } from "react";
import { Heart, ShoppingCart, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Extended list of items based on RecentItems component
const newArrivals = [
  {
    id: 1,
    name: "Handcrafted Ceramic Mug",
    artist: "Emma Thompson",
    price: 28.00,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    category: "Ceramics",
    dateAdded: "2023-04-08",
  },
  {
    id: 2,
    name: "Hand-Woven Wall Hanging",
    artist: "Aisha Johnson",
    price: 75.00,
    image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
    category: "Textile Art",
    dateAdded: "2023-04-07",
  },
  {
    id: 3,
    name: "Wooden Serving Board",
    artist: "Marcus Rivera",
    price: 45.00,
    image: "https://images.unsplash.com/photo-1605433247501-698405495b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80",
    category: "Woodworking",
    dateAdded: "2023-04-06",
  },
  {
    id: 4,
    name: "Silver Leaf Earrings",
    artist: "David Chen",
    price: 32.00,
    image: "https://images.unsplash.com/photo-1630019852942-7a3592370ba9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3087&q=80",
    category: "Jewelry",
    dateAdded: "2023-04-05",
  },
  {
    id: 5,
    name: "Hand-Printed Linen Scarf",
    artist: "Aisha Johnson",
    price: 38.00,
    image: "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3024&q=80",
    category: "Textile Art",
    dateAdded: "2023-04-04",
  },
  {
    id: 6,
    name: "Stoneware Vase",
    artist: "Emma Thompson",
    price: 68.00,
    image: "https://images.unsplash.com/photo-1612196319128-2e51846e0e8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2748&q=80",
    category: "Ceramics",
    dateAdded: "2023-04-03",
  },
  {
    id: 7,
    name: "Handmade Leather Journal",
    artist: "James Wilson",
    price: 42.00,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    category: "Bookbinding",
    dateAdded: "2023-04-02",
  },
  {
    id: 8,
    name: "Blown Glass Pendant Light",
    artist: "Omar Hassan",
    price: 160.00,
    image: "https://images.unsplash.com/photo-1540932239986-30128078f3c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Glass Art",
    dateAdded: "2023-04-01",
  },
  {
    id: 9,
    name: "Block Printed Cushion Cover",
    artist: "Elena Rodriguez",
    price: 35.00,
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    category: "Textile Art",
    dateAdded: "2023-03-31",
  },
  {
    id: 10,
    name: "Handwoven Basket",
    artist: "Sarah Miller",
    price: 52.00,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=827&q=80",
    category: "Woodwork",
    dateAdded: "2023-03-30",
  },
  {
    id: 11,
    name: "Copper Plant Hanger",
    artist: "Marcus Rivera",
    price: 48.00,
    image: "https://images.unsplash.com/photo-1463320898484-cdee8141c787?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    category: "Metalwork",
    dateAdded: "2023-03-29",
  },
  {
    id: 12,
    name: "Hand-Carved Wooden Spoons",
    artist: "David Chen",
    price: 30.00,
    image: "https://images.unsplash.com/photo-1584753987666-a7cd34afc3fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    category: "Woodworking",
    dateAdded: "2023-03-28",
  },
];

const NewArrivalsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");

  // Filter and sort the items
  const filteredItems = newArrivals
    .filter((item) => {
      // Category filter
      if (categoryFilter !== "All" && item.category !== categoryFilter) {
        return false;
      }
      
      // Search term filter
      if (searchTerm) {
        const lowercaseSearch = searchTerm.toLowerCase();
        return (
          item.name.toLowerCase().includes(lowercaseSearch) ||
          item.artist.toLowerCase().includes(lowercaseSearch) ||
          item.category.toLowerCase().includes(lowercaseSearch)
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort by date or price
      if (sortOrder === "newest") {
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
      } else if (sortOrder === "oldest") {
        return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
      } else if (sortOrder === "price-low") {
        return a.price - b.price;
      } else if (sortOrder === "price-high") {
        return b.price - a.price;
      }
      return 0;
    });

  // Get unique categories for the filter
  const categories = ["All", ...new Set(newArrivals.map(item => item.category))];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-[#A9D6E5] bg-opacity-20 py-10">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-[#19747E] mb-4 text-center font-playfair">
              New Arrivals
            </h1>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
              Discover our latest handcrafted items, fresh from the studios of our talented artisans.
              Each piece is uniquely made with skill and passion.
            </p>

            <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-[#D1E8E2] focus:border-[#19747E]"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={sortOrder} onValueChange={setSortOrder}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container-custom">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No items found matching your criteria.</p>
                <Button 
                  className="mt-4 bg-[#19747E] hover:bg-opacity-90"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("All");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
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
                      <div className="absolute top-2 right-2 bg-[#D1E8E2] text-[#19747E] text-xs px-2 py-1 rounded">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-[#19747E] hover:text-[#A9D6E5] transition-colors duration-300">
                        <a href="#">{item.name}</a>
                      </h3>
                      <p className="text-gray-600 text-sm">by {item.artist}</p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-[#19747E] font-semibold">${item.price.toFixed(2)}</span>
                        <Button variant="ghost" size="sm" className="text-[#19747E] hover:text-[#A9D6E5]">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NewArrivalsPage;
