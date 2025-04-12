
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ReturnsExchangesPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-craft-background py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-3xl font-bold text-craft-navy mb-6">Returns & Exchanges</h1>
            <p className="text-gray-600 mb-8">
              At Lokal, we want you to be completely satisfied with your purchase. We understand that sometimes a product may not meet your expectations, which is why we've created a straightforward returns and exchanges policy.
            </p>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold text-craft-navy mb-4">Our Policy</h2>
                <p className="text-gray-600 mb-4">
                  Since all items on Lokal are handcrafted by independent artisans, return policies may vary by seller. However, we maintain these basic guidelines that all sellers must follow:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Returns must be initiated within 14 days of delivery</li>
                  <li>Items must be unused and in original condition</li>
                  <li>Custom-made or personalized items are generally non-returnable unless defective</li>
                  <li>The buyer is responsible for return shipping costs unless the item is defective</li>
                  <li>Refunds are processed within 5-7 business days after the seller receives the returned item</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-craft-navy mb-4">How to Return an Item</h2>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="bg-craft-background p-6 rounded-lg">
                    <div className="w-10 h-10 bg-craft-terracotta rounded-full flex items-center justify-center mb-4 text-white font-bold">1</div>
                    <h3 className="font-semibold mb-2">Contact the Seller</h3>
                    <p className="text-gray-600">Reach out to the seller through your Lokal account to discuss your return.</p>
                  </div>
                  <div className="bg-craft-background p-6 rounded-lg">
                    <div className="w-10 h-10 bg-craft-terracotta rounded-full flex items-center justify-center mb-4 text-white font-bold">2</div>
                    <h3 className="font-semibold mb-2">Get Return Approval</h3>
                    <p className="text-gray-600">The seller will provide return instructions and a return authorization.</p>
                  </div>
                  <div className="bg-craft-background p-6 rounded-lg">
                    <div className="w-10 h-10 bg-craft-terracotta rounded-full flex items-center justify-center mb-4 text-white font-bold">3</div>
                    <h3 className="font-semibold mb-2">Ship the Item Back</h3>
                    <p className="text-gray-600">Package the item carefully and ship it back using a trackable method.</p>
                  </div>
                  <div className="bg-craft-background p-6 rounded-lg">
                    <div className="w-10 h-10 bg-craft-terracotta rounded-full flex items-center justify-center mb-4 text-white font-bold">4</div>
                    <h3 className="font-semibold mb-2">Receive Your Refund</h3>
                    <p className="text-gray-600">Once the seller receives and inspects the item, your refund will be processed.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-craft-navy mb-6">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left font-medium">What if my item arrives damaged?</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      If your item arrives damaged, please take photos of the damage and contact the seller immediately through your Lokal account. In most cases, the seller will offer a replacement or full refund, including shipping costs.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left font-medium">Can I exchange an item for a different size or color?</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Exchanges are handled on a case-by-case basis by each seller. Many artisans are happy to accommodate exchanges when possible, especially for items available in different sizes or colors. Contact the seller directly to discuss exchange options.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left font-medium">What if the seller doesn't respond to my return request?</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Sellers are expected to respond to return requests within 48 hours. If you haven't received a response after this time, please contact Lokal customer support, and we'll help facilitate communication with the seller.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left font-medium">Are gift items returnable?</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      Yes, gift recipients can return items. The refund will be issued to the original purchaser, or we can provide a store credit to the gift recipient. The gift recipient will need the order number or the email address of the purchaser.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left font-medium">What if the item doesn't match the description?</AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      If an item significantly differs from its description or photos, please contact the seller with specific details about the discrepancy. If the issue cannot be resolved with the seller, Lokal's customer support team will review the case and may process a refund if the item was misrepresented.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </section>

              <section className="bg-craft-background p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-craft-navy mb-3">Need Additional Help?</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about returns or need assistance with a specific return, our customer support team is here to help.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="/contact-us" 
                    className="inline-block bg-craft-terracotta hover:bg-craft-terracotta/90 text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    Contact Support
                  </a>
                  <a 
                    href="/faq" 
                    className="inline-block bg-white border border-craft-navy text-craft-navy hover:bg-craft-navy hover:text-white px-6 py-3 rounded-md font-medium transition-colors"
                  >
                    View FAQs
                  </a>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReturnsExchangesPage;
