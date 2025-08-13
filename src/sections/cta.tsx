import { Button } from "@/components/ui/button";
import { GitBranch, Code, ArrowRight, Star, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

function Cta() {
  const navigate = useNavigate();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const floatingIcons = [
    { icon: Star, delay: 0, position: "top-10 left-10" },
    { icon: Users, delay: 1, position: "top-20 right-20" },
    { icon: Zap, delay: 2, position: "bottom-20 left-20" },
    { icon: GitBranch, delay: 3, position: "bottom-10 right-10" },
  ];

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        ></div>

        {/* Floating Icons */}
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.position} text-cyan-400/20`}
            initial={{ opacity: 0, scale: 0 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
            }
            transition={{ delay: item.delay, duration: 1 }}
          >
            <item.icon
              className="h-6 w-6 animate-float"
              style={{ animationDelay: `${item.delay}s` }}
            />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-cyan-400 text-sm font-medium">
              Join the Community
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Ready to Start
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient-shift">
              Contributing?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Join thousands of developers making their mark on open source.
            <br />
            <span className="text-cyan-400 font-medium">
              Your next contribution could change the world.
            </span>
          </motion.p>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {[
              { number: "10K+", label: "Projects", icon: GitBranch },
              { number: "50K+", label: "Contributors", icon: Users },
              { number: "100K+", label: "Commits", icon: Code },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center group"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl mb-3 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                  <stat.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.6, duration: 0.8 }}
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
                List Your Repository
                <Code className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              </span>
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-12 text-gray-400"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <p className="text-sm">
              No credit card required • Free forever • Join 50,000+ developers
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Cta;
