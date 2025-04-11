
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Plus, Package, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import CreateItemForm from "@/components/CreateItemForm";

const ArtistListings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Mock data for artist's listings
  const listings = [
    {
      id: 1,
      title: "Handcrafted Ceramic Mug",
      price: 28.00,
      image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      category: "Ceramics",
      quantity: 5,
      status: "active"
    },
    {
      id: 2,
      title: "Hand-Woven Wall Hanging",
      price: 75.00,
      image: "https://images.unsplash.com/photo-1615529328331-f8917597711f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
      category: "Textile Art",
      quantity: 2,
      status: "active"
    },
    {
      id: 3,
      title: "Wooden Serving Board",
      price: 45.00,
      image: "https://images.unsplash.com/photo-1605433247501-698405495b9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2680&q=80",
      category: "Woodworking",
      quantity: 3,
      status: "active"
    }
  ];

  const filteredListings = listings.filter(listing =>
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-craft-background py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#19747E]">My Listings</h1>
              <p className="text-gray-600 mt-1">Manage your handcrafted items</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <Search size={18} />
                </div>
                <Input
                  type="search"
                  placeholder="Search listings..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-[#19747E] hover:bg-[#19747E]/90">
                    <Plus size={18} className="mr-2" />
                    Add New Item
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md md:max-w-xl overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Create New Listing</SheetTitle>
                    <SheetDescription>
                      Add details about your handcrafted item
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <CreateItemForm />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {filteredListings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No listings found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm ? "No items match your search" : "You haven't created any listings yet"}
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button className="bg-[#19747E] hover:bg-[#19747E]/90">
                    <Plus size={18} className="mr-2" />
                    Create Your First Listing
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md md:max-w-xl overflow-y-auto">
                  <SheetHeader>
                    <SheetTitle>Create New Listing</SheetTitle>
                    <SheetDescription>
                      Add details about your handcrafted item
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <CreateItemForm />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-[#A9D6E5] text-[#19747E] text-xs font-medium px-2 py-1 rounded">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-[#19747E] mb-1">{item.title}</h3>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-medium">${item.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500">{item.quantity} in stock</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-gray-100">
                      <Button variant="outline" size="sm" className="text-sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-sm text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtistListings;
