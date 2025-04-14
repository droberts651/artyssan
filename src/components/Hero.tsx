import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
  };
  return <div className="relative bg-craft-cream py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-10 -top-10 w-40 h-40 rounded-full bg-blue-700"></div>
        <div className="absolute right-10 top-40 w-32 h-32 rounded-full bg-craft-sage"></div>
        <div className="absolute left-1/3 bottom-10 w-24 h-24 rounded-full bg-craft-navy"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-craft-navy mb-6">Discover Unique Local Crafts</h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Supporting local artists and artisans in your community.
            Find handcrafted treasures made with passion and skill.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center max-w-2xl mx-auto mb-10 gap-3">
            <div className="relative w-full">
              <Input type="text" placeholder="Search for handmade jewelry, pottery, art..." className="pl-10 py-6 rounded-lg border-craft-sage border-2 w-full" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              <Search className="absolute left-3 top-3 text-craft-sage" size={20} />
            </div>
            <Button type="submit" className="bg-craft-navy hover:bg-craft-navy/90 text-white py-6 px-8 rounded-lg w-full sm:w-auto">
              Search
            </Button>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white bg-opacity-70 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-craft-terracotta">50000+</p>
              <p className="text-gray-700">Local Artisans</p>
            </div>
            <div className="bg-white bg-opacity-70 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-craft-terracotta">5,000+</p>
              <p className="text-gray-700">Unique Items</p>
            </div>
            <div className="bg-white bg-opacity-70 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-craft-terracotta">50+</p>
              <p className="text-gray-700">Categories</p>
            </div>
            <div className="bg-white bg-opacity-70 backdrop-blur-sm p-4 rounded-lg">
              <p className="text-2xl md:text-3xl font-bold text-craft-terracotta">20k+</p>
              <p className="text-gray-700">Happy Customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Hero;