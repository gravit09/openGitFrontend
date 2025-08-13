import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Heart,
  ArrowUp,
  ExternalLink,
  Users,
  Code,
  Globe,
} from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  const platformLinks = [
    { name: "Browse Projects", href: "/explore", icon: Code },
    { name: "List Repository", href: "/dash", icon: Github },
    { name: "Community", href: "#", icon: Users },
    { name: "Documentation", href: "#", icon: ExternalLink },
  ];

  const communityLinks = [
    { name: "Discord", href: "#", icon: ExternalLink },
    { name: "Twitter", href: "#", icon: Twitter },
    { name: "GitHub", href: "#", icon: Github },
    { name: "Blog", href: "#", icon: ExternalLink },
  ];

  const supportLinks = [
    { name: "Help Center", href: "#", icon: ExternalLink },
    { name: "API Docs", href: "#", icon: Code },
    { name: "Contact", href: "#", icon: Mail },
    { name: "Status", href: "#", icon: Globe },
  ];

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <footer className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Brand Section */}
          <motion.div className="lg:col-span-2" variants={itemVariants}>
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <Github className="h-8 w-8 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                OpenGit
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting developers worldwide through open source collaboration
              and learning. Join thousands of developers who trust OpenGit to
              discover, contribute, and grow.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className="group p-3 rounded-xl bg-gray-800/50 hover:bg-cyan-500/20 border border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    inView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <social.icon className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Platform Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-6 text-white text-lg">Platform</h4>
            <ul className="space-y-3">
              {platformLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Link
                    to={link.href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
                  >
                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>{link.name}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Community Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-6 text-white text-lg">Community</h4>
            <ul className="space-y-3">
              {communityLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
                  >
                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants}>
            <h4 className="font-bold mb-6 text-white text-lg">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <a
                    href={link.href}
                    className="flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
                  >
                    <link.icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                    <span>{link.name}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0">
            <span>&copy; 2025 OpenGit. All rights reserved.</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">
              Powered by the open source community
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm">Made with</span>
            <Heart className="h-4 w-4 text-red-500 animate-pulse" />
            <span className="text-gray-400 text-sm">by developers</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
        whileHover={{ y: -2 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>
    </footer>
  );
}

export default Footer;
