import Footer from "@/sections/footer";
import Cta from "@/sections/cta";
import Stats from "@/sections/stats";
import { FeaturesSection } from "@/sections/features";
import Featured from "@/sections/featured";
import Navbar from "@/sections/navbar";
import Hero from "@/sections/hero";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { motion } from "framer-motion";

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
    <motion.div
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400/30 rounded-full animate-float"></div>
        <div
          className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400/40 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400/30 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-1 h-1 bg-cyan-400/20 rounded-full animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Featured Repositories */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Featured />
      </motion.div>

      {/* Features */}
      <FeaturesSection />

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Stats />
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Cta />
      </motion.div>

      {/* Footer */}
      <Footer />
    </motion.div>
  );
}
