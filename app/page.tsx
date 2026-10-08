import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import FragranceFamilies from "@/components/FragranceFamilies";
import BrandStory from "@/components/BrandStory";
import HowToOrder from "@/components/HowToOrder";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <FeaturedCollections />
        <FragranceFamilies />
        <BrandStory />
        <HowToOrder />
        <Blog />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
