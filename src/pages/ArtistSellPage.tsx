
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ArtistSellPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-craft-background py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-3xl font-bold text-craft-navy mb-6">Sell on Lokal</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-craft-navy mb-4">Why Sell on Lokal?</h2>
                <p className="text-gray-600 mb-4">
                  Join our community of talented artisans and reach customers who value authentic, handcrafted goods.
                  Lokal provides a platform that celebrates craftsmanship and connects you directly with buyers who appreciate your work.
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Access to a growing community of craft enthusiasts</li>
                  <li>Simple tools to manage your handcrafted inventory</li>
                  <li>Transparent fee structure with no hidden costs</li>
                  <li>Marketing support to highlight your unique creations</li>
                  <li>Seller protection and dedicated support</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-craft-navy mb-4">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="bg-craft-background p-6 rounded-lg">
                    <div className="w-12 h-12 bg-craft-terracotta rounded-full flex items-center justify-center mb-4 text-white font-bold">1</div>
                    <h3 className="font-semibold mb-2">Create Your Shop</h3>
                    <p className="text-gray-600">Sign up and set up your artist profile with your story and crafting journey.</p>
                  </div>
                  <div className="bg-craft-background p-6 rounded-lg">
                    <div className="w-12 h-12 bg-craft-terracotta rounded-full flex items-center justify-center mb-4 text-white font-bold">2</div>
                    <h3 className="font-semibold mb-2">List Your Items</h3>
                    <p className="text-gray-600">Upload photos and details about your handcrafted products.</p>
                  </div>
                  <div className="bg-craft-background p-6 rounded-lg">
                    <div className="w-12 h-12 bg-craft-terracotta rounded-full flex items-center justify-center mb-4 text-white font-bold">3</div>
                    <h3 className="font-semibold mb-2">Start Selling</h3>
                    <p className="text-gray-600">Receive orders, ship your creations, and grow your artisan business.</p>
                  </div>
                </div>
              </section>

              <section className="text-center">
                <h2 className="text-2xl font-semibold text-craft-navy mb-4">Ready to share your craft with the world?</h2>
                <a 
                  href="/artist/login" 
                  className="inline-block bg-craft-terracotta hover:bg-craft-terracotta/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Get Started Today
                </a>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtistSellPage;
