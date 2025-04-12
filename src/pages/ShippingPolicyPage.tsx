
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const ShippingPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-white">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#19747E] mb-8">Shipping Policy</h1>
          
          <div className="prose max-w-none text-gray-600">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Processing Times</h2>
              <p className="mb-4">
                At Lokal, each item is carefully handcrafted by our artisans. Due to the handmade nature of our products, please allow 3-5 business days for processing before shipment. Custom orders may require additional processing time, which will be communicated to you at the time of purchase.
              </p>
              <p>
                Once your order ships, you will receive a confirmation email with tracking information, allowing you to monitor your package's journey to you.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Shipping Methods & Timeframes</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-200 mb-4">
                  <thead>
                    <tr className="bg-[#D1E8E2]">
                      <th className="border border-gray-200 px-4 py-2 text-left">Shipping Method</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Estimated Delivery</th>
                      <th className="border border-gray-200 px-4 py-2 text-left">Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">Standard Shipping</td>
                      <td className="border border-gray-200 px-4 py-2">5-7 business days</td>
                      <td className="border border-gray-200 px-4 py-2">$5.99 (Free over $50)</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-200 px-4 py-2">Expedited Shipping</td>
                      <td className="border border-gray-200 px-4 py-2">2-3 business days</td>
                      <td className="border border-gray-200 px-4 py-2">$12.99</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-200 px-4 py-2">International Shipping</td>
                      <td className="border border-gray-200 px-4 py-2">10-14 business days</td>
                      <td className="border border-gray-200 px-4 py-2">Starting at $15.99</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                Please note that these are estimated delivery times and may vary depending on your location and external factors such as weather conditions or carrier delays.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">International Shipping</h2>
              <p className="mb-4">
                We're delighted to ship our artisan-made products worldwide. Please be aware that international orders may be subject to import duties, taxes, and customs clearance fees imposed by the destination country. These charges are the responsibility of the recipient and are not included in your order total.
              </p>
              <p>
                International shipping times may vary significantly depending on the destination country and customs processing. Please allow additional time for international deliveries.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Shipping Restrictions</h2>
              <p>
                Some products may have shipping restrictions to certain countries due to size, material, or local regulations. If your selected items cannot be shipped to your location, you will be notified during the checkout process.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Order Tracking</h2>
              <p>
                Once your order ships, you will receive a shipping confirmation email with a tracking number. You can use this number to monitor your package's status through our website or directly through the carrier's tracking system.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about your shipment or our shipping policies, please don't hesitate to contact our customer service team at <a href="mailto:shipping@lokal.com" className="text-[#19747E] underline">shipping@lokal.com</a> or call us at (555) 123-4567.
              </p>
              <p>
                This shipping policy was last updated on April 12, 2025.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicyPage;
