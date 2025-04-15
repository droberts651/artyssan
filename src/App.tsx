
import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ArtistLogin from "./pages/ArtistLogin";
import ArtistListings from "./pages/ArtistListings";
import ArtistAnalytics from "./pages/ArtistAnalytics";
import ArtistForum from "./pages/ArtistForum";
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
import SearchResultsPage from "./pages/SearchResultsPage";
import AuthPage from "./pages/AuthPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";

// Components
import ProtectedRoute from "./components/ProtectedRoute";

// Auth
import { initAuth } from "./lib/auth";

const queryClient = new QueryClient();

const App = () => {
  // Initialize authentication
  useEffect(() => {
    const cleanup = initAuth();
    return () => cleanup();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/artist/login" element={<ArtistLogin />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/categories/:categoryName" element={<CategoryPage />} />
            <Route path="/artists" element={<ArtistsPage />} />
            <Route path="/new-arrivals" element={<NewArrivalsPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/artist/sell" element={<ArtistSellPage />} />
            <Route path="/artist/resources" element={<ArtistResourcesPage />} />
            <Route path="/artist/success-stories" element={<ArtistSuccessStoriesPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/returns-policy" element={<ReturnsExchangesPage />} />
            <Route path="/product/:productId" element={<ProductDetailsPage />} />
            
            {/* Protected customer routes */}
            <Route path="/cart" element={
              <ProtectedRoute allowedRoles={["customer", "artist", "admin"]}>
                <CartPage />
              </ProtectedRoute>
            } />
            <Route path="/checkout" element={
              <ProtectedRoute allowedRoles={["customer", "artist", "admin"]}>
                <CheckoutPage />
              </ProtectedRoute>
            } />
            <Route path="/order-confirmation" element={
              <ProtectedRoute allowedRoles={["customer", "artist", "admin"]}>
                <OrderConfirmationPage />
              </ProtectedRoute>
            } />
            
            {/* Protected artist routes */}
            <Route path="/artist/listings" element={
              <ProtectedRoute allowedRoles={["artist", "admin"]}>
                <ArtistListings />
              </ProtectedRoute>
            } />
            <Route path="/artist/analytics" element={
              <ProtectedRoute allowedRoles={["artist", "admin"]}>
                <ArtistAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/artist/forum" element={
              <ProtectedRoute allowedRoles={["artist", "admin"]}>
                <ArtistForum />
              </ProtectedRoute>
            } />
            
            {/* Search results */}
            <Route path="/search" element={<SearchResultsPage />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
