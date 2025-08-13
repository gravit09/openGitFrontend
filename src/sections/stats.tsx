import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  TrendingUp,
  Users,
  GitBranch,
  Star,
  Code,
  Zap,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Stats() {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [counts, setCounts] = useState({
    projects: 0,
    contributions: 0,
    contributors: 0,
    stars: 0,
  });

  const stats = [
    {
      icon: GitBranch,
      number: 250,
      label: "Active Projects",
      suffix: "+",
      gradient: "from-cyan-500 to-blue-600",
      delay: 0.1,
    },
    {
      icon: Code,
      number: 15000,
      label: "Contributions Made",
      suffix: "+",
      gradient: "from-purple-500 to-pink-600",
      delay: 0.2,
    },
    {
      icon: Users,
      number: 5200,
      label: "Active Contributors",
      suffix: "+",
      gradient: "from-green-500 to-emerald-600",
      delay: 0.3,
    },
    {
      icon: Star,
      number: 850,
      label: "Projects Listed",
      suffix: "+",
      gradient: "from-yellow-500 to-orange-600",
      delay: 0.4,
    },
  ];

  useEffect(() => {
    if (inView) {
      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounts({
          projects: Math.floor(250 * progress),
          contributions: Math.floor(15000 * progress),
          contributors: Math.floor(5200 * progress),
          stars: Math.floor(850 * progress),
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [inView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="text-cyan-400 text-sm font-medium">
              Our Impact
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Trusted by thousands of
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              developers worldwide
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Join the growing community of developers who are making a difference
            in the open source ecosystem.
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Tile: Contributors */}
          <motion.div
            className="col-span-12 md:col-span-3 lg:col-span-3 group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg">
                <Users className="h-6 w-6" />
              </div>
              <span className="text-xs text-gray-400">Live</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {counts.contributors}+{" "}
            </div>
            <div className="text-gray-400 text-sm">Active Contributors</div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border border-gray-800" />
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 border border-gray-800" />
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 border border-gray-800" />
                <div className="w-7 h-7 rounded-full bg-gray-700/60 border border-gray-800 flex items-center justify-center text-[10px] text-gray-300">
                  +12
                </div>
              </div>
              <span className="px-2 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs">
                +48 today
              </span>
            </div>
            <div className="mt-3 flex gap-1 items-end h-8">
              <div
                className="w-1.5 bg-cyan-500/40 rounded"
                style={{ height: "30%" }}
              />
              <div
                className="w-1.5 bg-cyan-500/60 rounded"
                style={{ height: "65%" }}
              />
              <div
                className="w-1.5 bg-blue-500/60 rounded"
                style={{ height: "45%" }}
              />
              <div
                className="w-1.5 bg-cyan-500/80 rounded"
                style={{ height: "85%" }}
              />
              <div
                className="w-1.5 bg-blue-500/80 rounded"
                style={{ height: "55%" }}
              />
              <div
                className="w-1.5 bg-cyan-500/60 rounded"
                style={{ height: "70%" }}
              />
              <div
                className="w-1.5 bg-blue-500/60 rounded"
                style={{ height: "50%" }}
              />
              <div
                className="w-1.5 bg-cyan-500/80 rounded"
                style={{ height: "90%" }}
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300" />
          </motion.div>

          {/* Tile: Stars */}
          <motion.div
            className="col-span-12 md:col-span-3 lg:col-span-3 group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 text-white shadow-lg">
                <Star className="h-6 w-6" />
              </div>
              <span className="text-xs text-gray-400">Signals</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {counts.stars}+{" "}
            </div>
            <div className="text-gray-400 text-sm">Projects Listed</div>
            <div className="mt-4 flex items-center justify-between">
              <span className="px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs">
                This week +32%
              </span>
              <div className="flex gap-2">
                <span className="px-2 py-0.5 rounded-full border border-cyan-500/20 text-cyan-200 text-[10px] bg-cyan-500/5">
                  web
                </span>
                <span className="px-2 py-0.5 rounded-full border border-cyan-500/20 text-cyan-200 text-[10px] bg-cyan-500/5">
                  ai
                </span>
                <span className="px-2 py-0.5 rounded-full border border-cyan-500/20 text-cyan-200 text-[10px] bg-cyan-500/5">
                  tools
                </span>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300" />
          </motion.div>

          {/* Tile: Hero Copy */}
          <motion.div
            className="col-span-12 md:col-span-6 lg:col-span-6 relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-gray-900/60 to-gray-800/40 p-8 group"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute -bottom-16 -left-10 w-72 h-72 rounded-full bg-blue-600/10 blur-3xl" />
            <div className="relative z-10">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs mb-4">
                Real-time open source insights
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Open source that grows with you
              </h3>
              <p className="text-gray-300 mb-6 max-w-xl">
                Track activity, discover contributors, and surface issues that
                match your skills.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Zap className="h-4 w-4 text-cyan-300" /> Instant trends
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Users className="h-4 w-4 text-cyan-300" /> Active community
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <GitBranch className="h-4 w-4 text-cyan-300" /> Curated issues
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate("/explore")}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                >
                  Explore Projects
                </Button>
                <Button
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Tile: Projects */}
          <motion.div
            className="col-span-12 md:col-span-3 lg:col-span-3 group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                <GitBranch className="h-6 w-6" />
              </div>
              <span className="text-xs text-gray-400">Active</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {counts.projects}+{" "}
            </div>
            <div className="text-gray-400 text-sm">Active Projects</div>
            <div className="mt-4 flex gap-1 items-end h-10">
              <div
                className="w-2 bg-cyan-500/40 rounded"
                style={{ height: "40%" }}
              />
              <div
                className="w-2 bg-cyan-500/60 rounded"
                style={{ height: "70%" }}
              />
              <div
                className="w-2 bg-blue-500/60 rounded"
                style={{ height: "55%" }}
              />
              <div
                className="w-2 bg-cyan-500/80 rounded"
                style={{ height: "85%" }}
              />
              <div
                className="w-2 bg-blue-500/80 rounded"
                style={{ height: "65%" }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["web", "ai", "devtools", "design"].map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded-full border border-cyan-500/20 text-cyan-200 text-[10px] bg-cyan-500/5"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300" />
          </motion.div>

          {/* Tile: Contributions */}
          <motion.div
            className="col-span-12 md:col-span-3 lg:col-span-3 group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg">
                <Code className="h-6 w-6" />
              </div>
              <span className="text-xs text-gray-400">30d</span>
            </div>
            <div className="text-3xl font-bold text-white">
              {counts.contributions}+{" "}
            </div>
            <div className="text-gray-400 text-sm">Contributions Made</div>
            <div className="mt-4 grid grid-cols-12 gap-1">
              {Array.from({ length: 72 }).map((_, i) => (
                <div
                  key={i}
                  className="h-2 w-2 rounded-sm"
                  style={{
                    backgroundColor: `rgba(34,211,238,${
                      0.15 + (i % 6) * 0.15
                    })`,
                  }}
                />
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300" />
          </motion.div>

          {/* Tile: Languages */}
          <motion.div
            className="col-span-12 md:col-span-6 lg:col-span-6 group relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm p-6"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs">
                Popular Languages
              </div>
              <TrendingUp className="h-4 w-4 text-cyan-300" />
            </div>
            <div className="flex flex-wrap gap-2">
              {["TypeScript", "JavaScript", "Go", "Rust", "Python", "Java"].map(
                (lang) => (
                  <span
                    key={lang}
                    className="px-3 py-1 rounded-full border border-cyan-500/20 text-cyan-200 text-xs bg-cyan-500/5"
                  >
                    {lang}
                  </span>
                )
              )}
            </div>
            <div className="mt-5 space-y-3">
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>TypeScript</span>
                  <span>38%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded">
                  <div
                    className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded"
                    style={{ width: "38%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Python</span>
                  <span>21%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded">
                  <div
                    className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded"
                    style={{ width: "21%" }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Go</span>
                  <span>16%</span>
                </div>
                <div className="h-1.5 bg-gray-800 rounded">
                  <div
                    className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 rounded"
                    style={{ width: "16%" }}
                  />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:to-blue-500/5 transition-all duration-300" />
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/explore")}
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-lg px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
            >
              <span className="relative z-10 flex items-center">
                Explore Projects
                <Award className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 text-lg px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center">
                List Your Project
                <Heart className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
              </span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Stats;
