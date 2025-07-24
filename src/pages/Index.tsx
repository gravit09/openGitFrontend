import Footer from "@/sections/footer";
import Sol from "@/sections/sol";
import Cta from "@/sections/cta";
import Stats from "@/sections/stats";
import { FeaturesSection } from "@/sections/features";
import Featured from "@/sections/featured";
import Navbar from "@/sections/navbar";
import Hero from "@/sections/hero";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function Index() {
  const { isSignedIn, getToken } = useAuth();
  useEffect(() => {
    const saveGithubData = async () => {
      if (isSignedIn) {
        const token = await getToken();
        await fetch("http://localhost:4000/api/repo/save-user-github-data", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    };
    saveGithubData();
  }, [isSignedIn, getToken]);

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
}
