import Footer from "@/sections/footer";
import Sol from "@/sections/sol";
import Cta from "@/sections/cta";
import Stats from "@/sections/stats";
import { FeaturesSection } from "@/sections/features";
import Featured from "@/sections/featured";
import Navbar from "@/sections/navbar";
import Hero from "@/sections/hero";

const Index = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* Featured Repositories */}
      <Featured />
      {/* Solana Bounties Complete Diff Field */}
      <Sol />
      {/* Global Impact Stats */}
      <Stats />
      {/* Features */}
      <FeaturesSection />
      {/* CTA Section */}
      <Cta />
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
