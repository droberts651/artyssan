
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Book, Video, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const ArtistResourcesPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-craft-background py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-3xl font-bold text-craft-navy mb-6">Artist Resources</h1>
            <p className="text-gray-600 mb-8">
              We've gathered helpful resources to support your journey as an artisan on Lokal. From getting started guides to photography tips, find what you need to succeed.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Resource Cards */}
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-craft-background p-3 rounded-full mr-4">
                    <FileText className="text-craft-navy" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg">Getting Started Guide</h3>
                </div>
                <p className="text-gray-600 mb-4">Everything you need to know to set up your shop and make your first sale on Lokal.</p>
                <Button variant="outline" className="w-full border-craft-navy text-craft-navy hover:bg-craft-navy hover:text-white">
                  Read Guide
                </Button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-craft-background p-3 rounded-full mr-4">
                    <Book className="text-craft-navy" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg">Seller Handbook</h3>
                </div>
                <p className="text-gray-600 mb-4">In-depth information about policies, best practices, and strategies for growing your business.</p>
                <Button variant="outline" className="w-full border-craft-navy text-craft-navy hover:bg-craft-navy hover:text-white">
                  Download PDF
                </Button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-craft-background p-3 rounded-full mr-4">
                    <Video className="text-craft-navy" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg">Product Photography</h3>
                </div>
                <p className="text-gray-600 mb-4">Learn how to take stunning photos of your handcrafted items using just your smartphone.</p>
                <Button variant="outline" className="w-full border-craft-navy text-craft-navy hover:bg-craft-navy hover:text-white">
                  Watch Tutorial
                </Button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="bg-craft-background p-3 rounded-full mr-4">
                    <Download className="text-craft-navy" size={24} />
                  </div>
                  <h3 className="font-semibold text-lg">Templates & Tools</h3>
                </div>
                <p className="text-gray-600 mb-4">Downloadable templates for product descriptions, pricing calculators, and shipping labels.</p>
                <Button variant="outline" className="w-full border-craft-navy text-craft-navy hover:bg-craft-navy hover:text-white">
                  Access Resources
                </Button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow md:col-span-2 lg:col-span-2">
                <h3 className="font-semibold text-lg mb-4">Upcoming Artist Workshops</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="font-medium">Product Description Writing</h4>
                      <p className="text-gray-600 text-sm">Learn how to write compelling product descriptions</p>
                    </div>
                    <div className="text-right">
                      <p className="text-craft-terracotta font-medium">April 20, 2025</p>
                      <p className="text-gray-600 text-sm">2:00 PM EST</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div>
                      <h4 className="font-medium">Pricing Your Handmade Items</h4>
                      <p className="text-gray-600 text-sm">Strategies for profitable pricing</p>
                    </div>
                    <div className="text-right">
                      <p className="text-craft-terracotta font-medium">May 5, 2025</p>
                      <p className="text-gray-600 text-sm">1:00 PM EST</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Social Media for Artisans</h4>
                      <p className="text-gray-600 text-sm">Building your brand on Instagram and Pinterest</p>
                    </div>
                    <div className="text-right">
                      <p className="text-craft-terracotta font-medium">May 15, 2025</p>
                      <p className="text-gray-600 text-sm">3:00 PM EST</p>
                    </div>
                  </div>
                </div>
                <Button className="mt-6 w-full bg-craft-terracotta hover:bg-craft-terracotta/90">
                  Register for Workshops
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtistResourcesPage;
