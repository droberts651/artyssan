
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-white">
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#19747E] mb-8">Privacy Policy</h1>
          
          <p className="text-gray-600 mb-8">
            Last Updated: April 12, 2025
          </p>
          
          <div className="prose max-w-none text-gray-600">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Introduction</h2>
              <p>
                Lokal ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected to Lokal (collectively, the "Site").
              </p>
              <p className="mt-4">
                Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access the Site. We reserve the right to make changes to this Privacy Policy at any time and for any reason. Any changes or modifications will be effective immediately upon posting the updated Privacy Policy on the Site, and you waive the right to receive specific notice of each such change or modification.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-[#19747E] mb-3">Personal Information</h3>
              <p className="mb-4">
                We may collect personal information that you voluntarily provide to us when you register on the Site, express an interest in obtaining information about us or our products and services, participate in activities on the Site, or otherwise contact us. The personal information we collect may include:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Name and contact information (email address, mailing address, phone number)</li>
                <li>Billing and payment information</li>
                <li>Account credentials (username and password)</li>
                <li>Profile information (preferences, interests, etc.)</li>
                <li>Purchase history</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-[#19747E] mb-3 mt-6">Automatically Collected Information</h3>
              <p className="mb-4">
                When you access our Site, we may automatically collect certain information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Device information (device type, operating system, browser type)</li>
                <li>Usage information (pages visited, time spent on pages, referring website address)</li>
                <li>Location information (if permitted by your device settings)</li>
                <li>IP address and other technical identifiers</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">How We Use Your Information</h2>
              <p className="mb-4">
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Processing and fulfilling your orders</li>
                <li>Creating and managing your account</li>
                <li>Providing customer service and responding to inquiries</li>
                <li>Sending administrative information and updates</li>
                <li>Personalizing your experience on our Site</li>
                <li>Improving our Site, products, and services</li>
                <li>Sending marketing and promotional communications (with your consent)</li>
                <li>Protecting against fraudulent or unauthorized transactions</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Information Sharing and Disclosure</h2>
              <p className="mb-4">
                We may share your information in the following situations:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>With Artisans:</strong> To facilitate the processing and fulfillment of your orders.</li>
                <li><strong>With Service Providers:</strong> We may share your information with third-party vendors who provide services on our behalf (payment processing, data analysis, email delivery, hosting services, customer service).</li>
                <li><strong>For Business Transfers:</strong> We may share or transfer your information in connection with a merger, acquisition, reorganization, or sale of all or a portion of our assets.</li>
                <li><strong>With Your Consent:</strong> We may disclose your information for any other purpose with your consent.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information to comply with applicable laws, regulations, legal processes, or governmental requests.</li>
              </ul>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Cookie Policy</h2>
              <p className="mb-4">
                We use cookies and similar tracking technologies to track activity on our Site and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Site.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Your Privacy Rights</h2>
              <p className="mb-4">
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>The right to access your personal information</li>
                <li>The right to correct inaccurate or incomplete information</li>
                <li>The right to delete your personal information</li>
                <li>The right to restrict or object to processing</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>
            
            <Separator className="my-8" />
            
            <section>
              <h2 className="text-2xl font-semibold text-[#19747E] mb-4">Contact Us</h2>
              <p>
                If you have questions or concerns about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4">
                <p>Lokal</p>
                <p>123 Artisan Way</p>
                <p>Craftsville, CR 12345</p>
                <p>Email: <a href="mailto:privacy@lokal.com" className="text-[#19747E] underline">privacy@lokal.com</a></p>
                <p>Phone: (555) 987-6543</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
