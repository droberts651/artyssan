
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Quote } from "lucide-react";

const ArtistSuccessStoriesPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-craft-background py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-3xl font-bold text-craft-navy mb-6">Artist Success Stories</h1>
            <p className="text-gray-600 mb-12 max-w-3xl">
              Discover how artisans like you have built thriving businesses on Lokal. From hobbyists to full-time creators, these success stories showcase the diverse journeys of our seller community.
            </p>
            
            <div className="space-y-16">
              {/* Success Story 1 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-2xl font-semibold text-craft-navy mb-3">Emma Rodriguez - Ceramic Artist</h2>
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium bg-craft-terracotta/10 text-craft-terracotta px-3 py-1 rounded-full">Ceramics</span>
                    <span className="mx-3 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">Seller since 2022</span>
                  </div>
                  <p className="text-gray-600 mb-4 italic flex gap-2">
                    <Quote size={20} className="text-craft-terracotta flex-shrink-0" />
                    <span>Before Lokal, I was selling at local markets occasionally. Now I've been able to reach customers nationwide and quit my day job to focus on my pottery full-time. The platform's tools make it easy to manage my growing business.</span>
                  </p>
                  <p className="text-gray-600 mb-6">
                    Emma started with just a few mug designs and has expanded to a full line of tableware that's now stocked in three boutique stores that discovered her through Lokal. She credits the platform's artist community with helping her refine her glazing techniques.
                  </p>
                  <div>
                    <span className="text-craft-navy font-semibold">Top achievement:</span>
                    <p className="text-gray-600">Featured in Design Home magazine after being discovered on Lokal</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <img 
                    src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" 
                    alt="Emma Rodriguez in her ceramic studio" 
                    className="rounded-lg object-cover w-full h-80"
                  />
                </div>
              </div>
              
              {/* Success Story 2 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <img 
                    src="https://images.unsplash.com/photo-1556760544-74068565f05c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80" 
                    alt="Marcus Chen in his woodworking shop" 
                    className="rounded-lg object-cover w-full h-80"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-craft-navy mb-3">Marcus Chen - Woodworker</h2>
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium bg-craft-terracotta/10 text-craft-terracotta px-3 py-1 rounded-full">Woodworking</span>
                    <span className="mx-3 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">Seller since 2021</span>
                  </div>
                  <p className="text-gray-600 mb-4 italic flex gap-2">
                    <Quote size={20} className="text-craft-terracotta flex-shrink-0" />
                    <span>Lokal has connected me with customers who truly appreciate the time and craftsmanship that goes into each piece. The platform's focus on telling the maker's story has helped me build a loyal following.</span>
                  </p>
                  <p className="text-gray-600 mb-6">
                    After being laid off during the pandemic, Marcus turned his woodworking hobby into a business on Lokal. What started with simple cutting boards has evolved into custom furniture commissions and a waitlist for his signature live-edge tables.
                  </p>
                  <div>
                    <span className="text-craft-navy font-semibold">Top achievement:</span>
                    <p className="text-gray-600">Grew from 3 orders/month to over 30, requiring him to hire an assistant</p>
                  </div>
                </div>
              </div>
              
              {/* Success Story 3 */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1">
                  <h2 className="text-2xl font-semibold text-craft-navy mb-3">Aisha Thomas - Jewelry Designer</h2>
                  <div className="flex items-center mb-4">
                    <span className="text-sm font-medium bg-craft-terracotta/10 text-craft-terracotta px-3 py-1 rounded-full">Jewelry</span>
                    <span className="mx-3 text-gray-300">•</span>
                    <span className="text-sm text-gray-500">Seller since 2023</span>
                  </div>
                  <p className="text-gray-600 mb-4 italic flex gap-2">
                    <Quote size={20} className="text-craft-terracotta flex-shrink-0" />
                    <span>As a young artist just starting out, I was intimidated by the business side of selling my jewelry. Lokal's seller resources and support team guided me through each step, from pricing to shipping.</span>
                  </p>
                  <p className="text-gray-600 mb-6">
                    Aisha began creating wire-wrapped jewelry as a creative outlet while in college. After friends encouraged her to sell her pieces, she joined Lokal and quickly found an audience for her unique minimalist designs inspired by architectural forms.
                  </p>
                  <div>
                    <span className="text-craft-navy font-semibold">Top achievement:</span>
                    <p className="text-gray-600">Collaborated with a fashion brand that discovered her collection on Lokal</p>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <img 
                    src="https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80" 
                    alt="Aisha Thomas creating jewelry" 
                    className="rounded-lg object-cover w-full h-80"
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-16 text-center">
              <h2 className="text-2xl font-semibold text-craft-navy mb-4">Ready to Write Your Success Story?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Join our community of talented artisans and start building your handcrafted business on Lokal.
              </p>
              <a 
                href="/artist/login" 
                className="inline-block bg-craft-terracotta hover:bg-craft-terracotta/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
              >
                Start Your Journey
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtistSuccessStoriesPage;
