
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Instagram, ExternalLink, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";

// Reusing the artists data from FeaturedArtists
const allArtists = [
  {
    id: 1,
    name: "Emma Thompson",
    specialty: "Ceramics",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    location: "Portland, OR",
    bio: "Emma creates functional pottery inspired by the Pacific Northwest landscape. Her pieces combine earthy textures with modern forms.",
  },
  {
    id: 2,
    name: "Marcus Rivera",
    specialty: "Woodworking",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Austin, TX",
    bio: "Marcus handcrafts heirloom-quality furniture using traditional joinery techniques. Each piece tells a story of craftsmanship and dedication.",
  },
  {
    id: 3,
    name: "Aisha Johnson",
    specialty: "Textile Art",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
    location: "Brooklyn, NY",
    bio: "Aisha weaves stories into her textiles, combining traditional techniques with contemporary designs that reflect her multicultural heritage.",
  },
  {
    id: 4,
    name: "David Chen",
    specialty: "Jewelry",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Seattle, WA",
    bio: "David's minimalist jewelry combines precious metals with unexpected materials, creating wearable art that's both elegant and edgy.",
  },
  {
    id: 5,
    name: "Sarah Miller",
    specialty: "Printmaking",
    image: "https://images.unsplash.com/photo-1574701148212-8518049c7b2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    location: "Chicago, IL",
    bio: "Sarah's limited edition prints explore urban landscapes with bold colors and intricate linework, capturing the energy of city life.",
  },
  {
    id: 6,
    name: "Omar Hassan",
    specialty: "Glass Art",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Minneapolis, MN",
    bio: "Omar creates vibrant, sculptural glassworks that play with light and transparency, pushing the boundaries of this ancient craft.",
  },
  {
    id: 7,
    name: "Elena Rodriguez",
    specialty: "Ceramics",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80",
    location: "Albuquerque, NM",
    bio: "Elena's southwestern-inspired pottery combines traditional techniques with modern glazes, creating pieces that honor her cultural heritage.",
  },
  {
    id: 8,
    name: "James Wilson",
    specialty: "Metalwork",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    location: "Detroit, MI",
    bio: "James transforms reclaimed metal into functional art, giving new life to industrial materials with his innovative approach to metalwork.",
  },
];

type FilterOption = "All" | "Ceramics" | "Woodworking" | "Textile Art" | "Jewelry" | "Printmaking" | "Glass Art" | "Metalwork";

const ArtistsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState<FilterOption>("All");
  const [filteredArtists, setFilteredArtists] = useState(allArtists);

  useEffect(() => {
    let results = allArtists;
    
    // Apply specialty filter
    if (filterOption !== "All") {
      results = results.filter(artist => artist.specialty === filterOption);
    }
    
    // Apply search term
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      results = results.filter(
        artist =>
          artist.name.toLowerCase().includes(lowercaseSearch) ||
          artist.location.toLowerCase().includes(lowercaseSearch) ||
          artist.specialty.toLowerCase().includes(lowercaseSearch) ||
          artist.bio.toLowerCase().includes(lowercaseSearch)
      );
    }
    
    setFilteredArtists(results);
  }, [searchTerm, filterOption]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-[#A9D6E5] bg-opacity-20 py-10">
          <div className="container-custom">
            <h1 className="text-4xl md:text-5xl font-bold text-[#19747E] mb-4 text-center font-playfair">
              Meet Our Artists
            </h1>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-8">
              Discover the talented artisans behind our handcrafted treasures. Each artist brings their own unique skills, 
              perspective, and passion to create beautiful, one-of-a-kind pieces.
            </p>

            {/* Search and filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-4xl mx-auto">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Search artists by name, location, or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white border-[#D1E8E2] focus:border-[#19747E]"
                />
              </div>
              <select
                value={filterOption}
                onChange={(e) => setFilterOption(e.target.value as FilterOption)}
                className="px-4 py-2 rounded-md border border-[#D1E8E2] focus:outline-none focus:ring-2 focus:ring-[#19747E] bg-white"
              >
                <option value="All">All Specialties</option>
                <option value="Ceramics">Ceramics</option>
                <option value="Woodworking">Woodworking</option>
                <option value="Textile Art">Textile Art</option>
                <option value="Jewelry">Jewelry</option>
                <option value="Printmaking">Printmaking</option>
                <option value="Glass Art">Glass Art</option>
                <option value="Metalwork">Metalwork</option>
              </select>
            </div>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="container-custom">
            {filteredArtists.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-600">No artists found matching your criteria.</p>
                <Button 
                  className="mt-4 bg-[#19747E] hover:bg-opacity-90"
                  onClick={() => {
                    setSearchTerm("");
                    setFilterOption("All");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredArtists.map((artist) => (
                  <div key={artist.id} className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
                    <div className="h-64 overflow-hidden">
                      <img 
                        src={artist.image} 
                        alt={artist.name} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold text-[#19747E]">{artist.name}</h3>
                      <p className="text-[#19747E] font-medium">{artist.specialty}</p>
                      <p className="text-gray-600 text-sm mb-3">{artist.location}</p>
                      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{artist.bio}</p>
                      <div className="flex justify-between items-center">
                        <Button variant="outline" size="sm" className="text-[#19747E] border-[#19747E] hover:bg-[#D1E8E2] hover:text-[#19747E]">
                          <Instagram size={16} className="mr-2" /> Follow
                        </Button>
                        <Button variant="ghost" size="sm" className="text-[#19747E] hover:bg-[#D1E8E2] hover:text-[#19747E]">
                          <ExternalLink size={16} className="mr-2" /> View Shop
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

export default ArtistsPage;
