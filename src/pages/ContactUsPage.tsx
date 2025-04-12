
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactUsPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-craft-background py-12">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-sm p-8 md:p-12">
            <h1 className="text-3xl font-bold text-craft-navy mb-6">Contact Us</h1>
            <p className="text-gray-600 mb-12 max-w-3xl">
              Have a question or need assistance? We're here to help. Fill out the form below or reach out to us directly using the contact information provided.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="md:col-span-2">
                <form className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" placeholder="Enter your name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is your message about?" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Please provide details about your inquiry..." className="min-h-32" />
                  </div>
                  
                  <Button className="bg-craft-terracotta hover:bg-craft-terracotta/90">
                    Send Message
                  </Button>
                </form>
              </div>
              
              {/* Contact Information */}
              <div className="bg-craft-background p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-craft-navy mb-6">Get in Touch</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full mr-4">
                      <Mail className="text-craft-navy" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-craft-navy mb-1">Email Us</h3>
                      <p className="text-gray-600">support@lokalfinds.com</p>
                      <p className="text-gray-600">artists@lokalfinds.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full mr-4">
                      <Phone className="text-craft-navy" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-craft-navy mb-1">Call Us</h3>
                      <p className="text-gray-600">Customer Support: (555) 123-4567</p>
                      <p className="text-gray-600">Artist Support: (555) 765-4321</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-white p-3 rounded-full mr-4">
                      <MapPin className="text-craft-navy" size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-craft-navy mb-1">Visit Us</h3>
                      <p className="text-gray-600">
                        123 Artisan Street<br />
                        Craftsville, CR 98765<br />
                        United States
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="font-medium text-craft-navy mb-3">Hours of Operation</h3>
                  <div className="text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUsPage;
