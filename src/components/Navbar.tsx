
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import SearchModal from "./SearchModal";
import CartDropdown from "./CartDropdown";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate("/artist/login");
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container-custom flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-craft-terracotta rounded-full flex items-center justify-center mr-2">
              <span className="text-white font-bold text-xl">L</span>
            </div>
            <h1 className="text-craft-navy text-xl md:text-2xl font-bold hidden sm:block">Lokal</h1>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/categories" className="text-foreground hover:text-craft-terracotta font-medium">Categories</Link>
          <Link to="/artists" className="text-foreground hover:text-craft-terracotta font-medium">Artists</Link>
          <Link to="/new-arrivals" className="text-foreground hover:text-craft-terracotta font-medium">New Arrivals</Link>
          <Link to="/about-us" className="text-foreground hover:text-craft-terracotta font-medium">About Us</Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-craft-navy"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-craft-navy"
            onClick={handleUserClick}
          >
            <User size={20} />
          </Button>
          
          <Popover open={isCartOpen} onOpenChange={setIsCartOpen}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-craft-navy relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-craft-terracotta text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0">
              <CartDropdown />
            </PopoverContent>
          </Popover>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-craft-navy mr-2"
            onClick={() => setIsSearchOpen(true)}
          >
            <Search size={20} />
          </Button>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="text-craft-navy mr-2">
                <ShoppingCart size={20} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 p-0">
              <CartDropdown />
            </PopoverContent>
          </Popover>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="text-craft-navy"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden pt-4 pb-6 px-4 bg-white border-t">
          <div className="flex flex-col space-y-4">
            <Link to="/categories" className="text-foreground hover:text-craft-terracotta font-medium py-2">Categories</Link>
            <Link to="/artists" className="text-foreground hover:text-craft-terracotta font-medium py-2">Artists</Link>
            <Link to="/new-arrivals" className="text-foreground hover:text-craft-terracotta font-medium py-2">New Arrivals</Link>
            <Link to="/about-us" className="text-foreground hover:text-craft-terracotta font-medium py-2">About Us</Link>
            <Link to="/artist/login" className="text-foreground hover:text-craft-terracotta font-medium py-2">Account</Link>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
