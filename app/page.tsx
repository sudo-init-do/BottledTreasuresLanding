import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCollections from "@/components/FeaturedCollections";
import FragranceFamilies from "@/components/FragranceFamilies";
import SignatureCollections from "@/components/SignatureCollections";
import HomeFragrance from "@/components/HomeFragrance";
import TrendingHouses from "@/components/TrendingHouses";
import BrandStory from "@/components/BrandStory";
import HowToOrder from "@/components/HowToOrder";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import DealsPopup from "@/components/DealsPopup";
import { homeCollections, homeFragrances } from "@/lib/shop";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [collections, homeItems] = await Promise.all([homeCollections(), homeFragrances()]);
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Hero />
        <FeaturedCollections collections={collections} />
        <FragranceFamilies />
        <SignatureCollections />
        <HomeFragrance items={homeItems} />
        <TrendingHouses />
        <BrandStory />
        <HowToOrder />
        <Blog />
        <FAQ />
        <Newsletter />
      </main>
      <Footer />
      <DealsPopup />
    </>
  );
}
