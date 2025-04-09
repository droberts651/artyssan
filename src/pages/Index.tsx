
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import FeaturedArtists from "@/components/FeaturedArtists";
import RecentItems from "@/components/RecentItems";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeaturedCategories />
        <RecentItems />
        <FeaturedArtists />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
