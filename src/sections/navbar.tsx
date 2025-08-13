import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Github, Menu, X } from "lucide-react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.header
      className={`fixed inset-x-0 z-50 mx-auto w-full max-w-7xl transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl"
          : "bg-transparent"
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex shrink-0"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <Github className="h-8 w-8 text-cyan-400 group-hover:text-cyan-300 transition-colors duration-300" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg group-hover:bg-cyan-300/30 transition-all duration-300"></div>
              </div>
              <h3 className="text-2xl font-bold text-gradient-cyber bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                OpenGit
              </h3>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            className="hidden md:flex items-center space-x-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              to="/explore"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
            >
              Explore
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/dash"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
            >
              Dashboard
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link
              to="/top-contributors"
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 relative group"
            >
              Top Contributors
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </motion.nav>

          {/* Auth Buttons */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            <Link
              className="px-6 py-2 text-sm font-semibold text-cyan-400 border border-cyan-400/30 rounded-xl hover:bg-cyan-400/10 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              to="/signin"
            >
              Sign in
            </Link>
            <Link
              className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:scale-105"
              to="/signup"
            >
              Sign up
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 space-y-4 border-t border-cyan-500/20 mt-4">
            <Link
              to="/explore"
              className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Explore
            </Link>
            <Link
              to="/dash"
              className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/top-contributors"
              className="block text-gray-300 hover:text-cyan-400 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Top Contributors
            </Link>
            <div className="pt-4 space-y-3 border-t border-cyan-500/20">
              <Link
                className="block w-full px-4 py-2 text-sm font-semibold text-cyan-400 border border-cyan-400/30 rounded-xl hover:bg-cyan-400/10 text-center"
                to="/signin"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign in
              </Link>
              <Link
                className="block w-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-center"
                to="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </motion.header>
  );
}

export default Navbar;
