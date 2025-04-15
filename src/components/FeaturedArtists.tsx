
import { Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ArtistFeedbackSummary from "./ArtistFeedbackSummary";
import { FeedbackItem } from "./ProductFeedback";

// Mock feedback data by artist
const mockArtistFeedback: Record<string, FeedbackItem[]> = {
  "Emma Thompson": [
    {
      id: 1,
      productId: 101,
      userId: "user1",
      userName: "Sarah Wilson",
      rating: 5,
      comment: "This painting is absolutely stunning in person!",
      createdAt: "2025-03-15T14:30:00Z",
    },
    {
      id: 2,
      productId: 101,
      userId: "user2",
      userName: "Michael Johnson",
      rating: 4,
      comment: "Beautiful artwork that arrived well-packaged.",
      createdAt: "2025-02-20T09:15:00Z",
    },
    {
      id: 4,
      productId: 401,
      userId: "user4",
      userName: "James Taylor",
      rating: 5,
      comment: "The mug is both beautiful and practical. Great craftsmanship!",
      createdAt: "2025-03-30T10:20:00Z",
    },
  ],
  "David Chen": [
    {
      id: 3,
      productId: 201,
      userId: "user3",
      userName: "Lisa Chen",
      rating: 5,
      comment: "These earrings are so delicate and beautiful.",
      createdAt: "2025-04-05T16:45:00Z",
    },
  ],
  "Aisha Johnson": [
    {
      id: 5,
      productId: 301,
      userId: "user5",
      userName: "Robert Williams",
      rating: 4,
      comment: "Beautiful textural elements and craftsmanship.",
      createdAt: "2025-03-10T13:15:00Z",
    },
  ],
};

const artists = [
  {
    id: 1,
    name: "Emma Thompson",
    specialty: "Ceramics",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    location: "Portland, OR",
  },
  {
    id: 2,
    name: "Marcus Rivera",
    specialty: "Woodworking",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Austin, TX",
  },
  {
    id: 3,
    name: "Aisha Johnson",
    specialty: "Textile Art",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
    location: "Brooklyn, NY",
  },
  {
    id: 4,
    name: "David Chen",
    specialty: "Jewelery",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    location: "Seattle, WA",
  },
];

const FeaturedArtists = () => {
  return (
    <section className="py-16 bg-craft-sage bg-opacity-10">
      <div className="container-custom">
        <h2 className="section-title text-center">Meet Our Featured Artisans</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Get to know the talented people behind our handcrafted treasures and support local creativity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {artists.map((artist) => (
            <div key={artist.id} className="bg-white rounded-lg overflow-hidden shadow-md card-hover">
              <div className="h-64 overflow-hidden">
                <img 
                  src={artist.image} 
                  alt={artist.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-craft-navy">{artist.name}</h3>
                <p className="text-craft-terracotta font-medium">{artist.specialty}</p>
                <p className="text-gray-600 text-sm mb-2">{artist.location}</p>
                
                {/* Artist Feedback Summary */}
                <ArtistFeedbackSummary 
                  artistName={artist.name} 
                  feedback={mockArtistFeedback[artist.name] || []}
                />
                
                <div className="flex justify-between items-center mt-4">
                  <Button variant="outline" size="sm" className="text-craft-navy border-craft-navy">
                    <Instagram size={16} className="mr-2" /> Follow
                  </Button>
                  <Button variant="ghost" size="sm" className="text-craft-navy">
                    <ExternalLink size={16} className="mr-2" /> View Shop
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="btn-primary" asChild>
            <Link to="/artists">View All Artists</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtists;
