import { Safari } from "@/components/custom/Safari";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Star, Zap, Users, GitBranch } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Hero() {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const floatingIcons = [
    { icon: Star, delay: 0, position: "top-20 left-20" },
    { icon: Zap, delay: 1, position: "top-40 right-20" },
    { icon: Users, delay: 2, position: "bottom-40 left-10" },
    { icon: GitBranch, delay: 3, position: "bottom-20 right-10" },
  ];

  return (
    <section className="relative min-h-screen pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-float"
          style={{
            transform: `translate(${
              (mousePosition.x - window.innerWidth / 2) * 0.02
            }px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`,
          }}
        ></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-float"
          style={{
            animationDelay: "2s",
            transform: `translate(${
              (mousePosition.x - window.innerWidth / 2) * -0.01
            }px, ${(mousePosition.y - window.innerHeight / 2) * -0.01}px)`,
          }}
        ></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.position} text-cyan-400/30`}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: item.delay, duration: 1 }}
          >
            <item.icon
              className="h-8 w-8 animate-float"
              style={{ animationDelay: `${item.delay}s` }}
            />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="container mx-auto text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-8"
        >
          <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
          <span className="text-cyan-400 text-sm font-medium">
            Open Source Collaboration Platform
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight"
        >
          <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
            Contribute to the
          </span>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
            Future of Open Source
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
        >
          Connect with projects you love. Contribute for fun, learning, and
          impact.
          <br />
          <span className="text-cyan-400 font-medium">
            Where passion meets open source collaboration.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-6 justify-center mb-16"
        >
          <Button
            onClick={() => navigate("/explore")}
            size="lg"
            className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
          >
            <span className="relative z-10 flex items-center">
              Explore Projects
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="group border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 text-lg px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center">
              List Your Repo
              <Code className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
            </span>
          </Button>
        </motion.div>

        {/* Terminal Command */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center px-6 py-3 bg-black/50 border border-cyan-500/30 rounded-xl backdrop-blur-sm"
        >
          <span className="text-green-400 mr-2">$</span>
          <span className="text-gray-300 font-mono">git init</span>
          <div className="ml-2 w-2 h-4 bg-cyan-400 animate-pulse"></div>
        </motion.div>
      </motion.div>

      {/* Demo Section */}
      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto mt-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-cyan-500/20 shadow-2xl hover:shadow-[0_0_50px_rgba(34,211,238,0.3)] transition-all duration-500">
          {/* Browser Header */}
          <div className="flex items-center space-x-2 px-4 py-3 bg-gray-800 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex-1 text-center">
              <span className="text-gray-400 text-sm">opengit.dev</span>
            </div>
          </div>

          {/* Safari Component */}
          <div className="p-4 relative">
            <div className="w-full h-[600px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg border border-cyan-500/20 flex items-center justify-center overflow-hidden relative">
              <img
                src="/opengit.png"
                alt="OpenGit Platform"
                className="w-full h-full object-contain rounded-lg"
                onError={() => {
                  console.log("Image failed to load");
                  setImageError(true);
                }}
              />
              {/* Fallback content if image doesn't load */}
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
                  <div className="text-center">
                    <div className="text-cyan-400 text-3xl font-bold mb-4">
                      OpenGit
                    </div>
                    <div className="text-gray-300 text-lg mb-2">
                      Open Source Collaboration Platform
                    </div>
                    <div className="text-gray-400 text-sm">
                      Discover • Contribute • Grow
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        {[
          { number: "10K+", label: "Projects", icon: GitBranch },
          { number: "50K+", label: "Contributors", icon: Users },
          { number: "100K+", label: "Commits", icon: Code },
          { number: "1M+", label: "Stars", icon: Star },
        ].map((stat, index) => (
          <motion.div
            key={index}
            className="text-center group"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl mb-4 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
              <stat.icon className="h-8 w-8 text-cyan-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">
              {stat.number}
            </div>
            <div className="text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Hero;
