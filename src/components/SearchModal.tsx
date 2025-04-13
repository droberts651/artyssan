
import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const navigate = useNavigate();

  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem("recentSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  // Trap focus inside modal when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Save search to recent searches
    const newRecentSearches = [
      searchTerm,
      ...recentSearches.filter((s) => s !== searchTerm),
    ].slice(0, 5);
    
    setRecentSearches(newRecentSearches);
    localStorage.setItem("recentSearches", JSON.stringify(newRecentSearches));
    
    // Navigate to search results page
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    onClose();
  };

  const handleRecentSearchClick = (term: string) => {
    navigate(`/search?q=${encodeURIComponent(term)}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center">
      <div className="bg-white w-full max-w-2xl mt-20 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Search products</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </Button>
        </div>
        
        <div className="p-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <Input
                autoFocus
                type="text"
                placeholder="Search for handmade items..."
                className="pl-10 py-6"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button type="submit" className="bg-craft-navy hover:bg-craft-navy/90">
              Search
            </Button>
          </form>
          
          {recentSearches.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Recent searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((term, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-sm"
                    onClick={() => handleRecentSearchClick(term)}
                  >
                    {term}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-2">Popular categories</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-sm"
              onClick={() => {
                navigate("/categories/jewelry");
                onClose();
              }}
            >
              Jewelry
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-sm"
              onClick={() => {
                navigate("/categories/pottery");
                onClose();
              }}
            >
              Pottery
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-sm"
              onClick={() => {
                navigate("/categories/textiles");
                onClose();
              }}
            >
              Textiles
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-sm"
              onClick={() => {
                navigate("/categories/woodworking");
                onClose();
              }}
            >
              Woodworking
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
