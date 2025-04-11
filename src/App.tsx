
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
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/categories/:categoryName" element={<CategoryPage />} />
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/new-arrivals" element={<NewArrivalsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
