
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-white">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#19747E] mb-8">About Crafty Local</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Crafty Local was founded in 2023 with a simple mission: to connect talented local artisans with people who appreciate handcrafted quality and unique items. What started as a small community marketplace has grown into a platform that celebrates craftsmanship and supports the creative economy.
              </p>
              <p className="text-gray-600 mb-4">
                Our founder, Emma Rogers, noticed that many talented artisans in her community had limited options to showcase and sell their work. Believing in the value of handmade items and the stories behind them, she created Crafty Local as a bridge between makers and buyers who share an appreciation for craftsmanship.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden h-64 md:h-auto">
              <img 
                src="https://images.unsplash.com/photo-1605902346554-7169ecfe7b79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80" 
                alt="Artisan Workshop" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We believe in the power of craftsmanship to connect people, preserve traditions, and create sustainable livelihoods. Our mission is to:
            </p>
            <ul className="space-y-3 text-gray-600 list-disc pl-6">
              <li>Support local artisans and craftspeople by providing a platform to showcase and sell their work</li>
              <li>Preserve traditional crafting techniques while encouraging innovation</li>
              <li>Promote sustainability through responsibly sourced materials and production methods</li>
              <li>Create a community that values quality, creativity, and human connection</li>
              <li>Offer alternatives to mass-produced items by connecting buyers directly with makers</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-[#D1E8E2] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#19747E] mb-3">Artisan-Focused</h3>
              <p className="text-gray-600">
                We prioritize fair compensation and recognition for our artisans, ensuring they receive the majority of each sale.
              </p>
            </div>
            <div className="bg-[#F1F8E9] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#19747E] mb-3">Quality-Driven</h3>
              <p className="text-gray-600">
                Each item on our platform meets high standards of craftsmanship, ensuring lasting value for our customers.
              </p>
            </div>
            <div className="bg-[#E0F7FA] p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-[#19747E] mb-3">Community-Oriented</h3>
              <p className="text-gray-600">
                We foster connections between makers and buyers, creating a vibrant community that celebrates creativity.
              </p>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Join Our Community</h2>
            <p className="text-gray-600 mb-4">
              Whether you're a skilled artisan looking to share your creations or a discerning buyer seeking unique handcrafted items, we welcome you to the Crafty Local community. Together, we can support local craftsmanship and bring more beauty and meaning into our everyday lives.
            </p>
            <div className="flex gap-4 mt-6">
              <Link to="/artists" className="btn-primary">Meet Our Artisans</Link>
              <Link to="/contact" className="btn-secondary">Contact Us</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUsPage;

import { Link } from "react-router-dom";
