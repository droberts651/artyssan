
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email) {
      toast({
        title: "Thanks for subscribing!",
        description: "You'll receive updates about new artisans and items.",
        variant: "default",
      });
      setEmail("");
    } else {
      toast({
        title: "Please enter your email",
        description: "We need your email to send you updates.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-16 bg-craft-navy text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-playfair">Stay Updated with New Treasures</h2>
          <p className="text-lg text-craft-cream/90 mb-8">
            Subscribe to our newsletter to receive updates about new artisans, items, and exclusive offers.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60 py-6"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" className="bg-craft-terracotta hover:bg-craft-terracotta/90 text-white py-6">
              Subscribe
            </Button>
          </form>
          
          <p className="text-sm text-craft-cream/70 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
