import TickerBar from "./components/TickerBar";
import Nav from "./components/Nav";
import SplitHero from "./components/SplitHero";
import PromoStrip from "./components/PromoStrip";
import CollectionsGrid from "./components/CollectionsGrid";
import NewArrivals from "./components/NewArrivals";
import AppBanner from "./components/AppBanner";
import Reviews from "./components/Reviews";
import SocialStrip from "./components/SocialStrip";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <TickerBar />
      <Nav />
      <main>
        <SplitHero />
        <PromoStrip />
        <CollectionsGrid />
        <NewArrivals />
        <AppBanner />
        <Reviews />
        <SocialStrip />
      </main>
      <Footer />
    </>
  );
}
