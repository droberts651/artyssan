
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Browse our categories or search for specific items. When you find something you like, click on it to view details, then click 'Add to Cart'. When you're ready to checkout, proceed to your cart and follow the checkout process."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay for secure and convenient transactions."
  },
  {
    question: "How long will shipping take?",
    answer: "Shipping times vary depending on your location and the artisan's production process. Most orders are shipped within 3-5 business days, with delivery typically taking an additional 3-7 business days."
  },
  {
    question: "Can I return or exchange an item?",
    answer: "Yes, we offer returns and exchanges within 14 days of receiving your order. Please note that custom-made items may have different return policies. Check our Returns & Exchanges policy for details."
  },
  {
    question: "Are all items handcrafted?",
    answer: "Yes, every item on Crafty Local is handcrafted by our verified artisans. We personally vet each maker to ensure they meet our standards for quality and craftsmanship."
  },
  {
    question: "How do I contact an artisan with questions?",
    answer: "Each artisan has a profile page where you can send them a direct message. Alternatively, you can contact our customer service team, and we'll help facilitate communication."
  },
  {
    question: "Can I request custom orders?",
    answer: "Many of our artisans accept custom orders. Look for the 'Custom Orders' badge on their profile or products, or message them directly to inquire about customization options."
  },
  {
    question: "How do I become a seller on Crafty Local?",
    answer: "We welcome talented artisans to join our community! Visit our 'Sell on Crafty Local' page to learn about our application process and requirements."
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we offer international shipping to most countries. Shipping costs and delivery times will vary based on the destination. These details will be provided during checkout."
  },
  {
    question: "How are artisans compensated?",
    answer: "Artisans set their own prices and receive the majority of each sale. Crafty Local takes a small commission to cover platform maintenance, marketing, and customer service."
  }
];

const FAQPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-white">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#19747E] mb-8">Frequently Asked Questions</h1>
          
          <p className="text-gray-600 mb-8 max-w-3xl">
            Find answers to common questions about Crafty Local, our products, ordering, shipping, and more. If you can't find what you're looking for, please don't hesitate to contact our customer service team.
          </p>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-[#F6F6F7] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-[#19747E] mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 bg-[#E3F2FD] rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              Our customer service team is happy to help with any questions you may have about our products or services.
            </p>
            <a href="mailto:support@craftylocal.com" className="btn-primary">Contact Support</a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
