
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArtistLogin from "./pages/ArtistLogin";
import ArtistListings from "./pages/ArtistListings";
import CategoryPage from "./pages/CategoryPage";
import ArtistsPage from "./pages/ArtistsPage";
import NewArrivalsPage from "./pages/NewArrivalsPage";
import AboutUsPage from "./pages/AboutUsPage";
import FAQPage from "./pages/FAQPage";
import ShippingPolicyPage from "./pages/ShippingPolicyPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import ArtistSellPage from "./pages/ArtistSellPage";
import ArtistResourcesPage from "./pages/ArtistResourcesPage";
import ArtistSuccessStoriesPage from "./pages/ArtistSuccessStoriesPage";
import ContactUsPage from "./pages/ContactUsPage";
import ReturnsExchangesPage from "./pages/ReturnsExchangesPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/artist/login" element={<ArtistLogin />} />
          <Route path="/artist/listings" element={<ArtistListings />} />
          <Route path="/artist/sell" element={<ArtistSellPage />} />
          <Route path="/artist/resources" element={<ArtistResourcesPage />} />
          <Route path="/artist/success-stories" element={<ArtistSuccessStoriesPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/categories/:categoryName" element={<CategoryPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/returns-policy" element={<ReturnsExchangesPage />} />
          <Route path="/product/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
