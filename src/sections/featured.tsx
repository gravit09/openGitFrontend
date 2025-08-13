import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Github,
  Star,
  ExternalLink,
  GitBranch,
  Users,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function Featured() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const featuredRepos = [
    {
      name: "react-dashboard",
      owner: "alexdev",
      description:
        "Modern React dashboard with TypeScript and Tailwind CSS. Perfect for building beautiful admin interfaces and data visualization.",
      language: "TypeScript",
      stars: 1234,
      forks: 89,
      contributors: 15,
      lastUpdated: "2 days ago",
      tags: ["frontend", "react", "dashboard", "typescript"],
      gradient: "from-blue-500 to-cyan-600",
      delay: 0.1,
    },
    {
      name: "blockchain-wallet",
      owner: "cryptobuilder",
      description:
        "Secure multi-chain wallet with DeFi integration. Support for Ethereum, Polygon, and other major blockchains.",
      language: "Rust",
      stars: 892,
      forks: 67,
      contributors: 23,
      lastUpdated: "1 week ago",
      tags: ["blockchain", "wallet", "defi", "rust"],
      gradient: "from-purple-500 to-pink-600",
      delay: 0.2,
    },
    {
      name: "ai-chat-bot",
      owner: "mlpioneer",
      description:
        "Intelligent chatbot with natural language processing. Built with modern AI models and easy integration.",
      language: "Python",
      stars: 567,
      forks: 45,
      contributors: 12,
      lastUpdated: "3 days ago",
      tags: ["ai", "nlp", "chatbot", "python"],
      gradient: "from-green-500 to-emerald-600",
      delay: 0.3,
    },
  ];

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
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-black to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl animate-float"
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
              Featured Projects
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Discover Amazing
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Open Source Projects
            </span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Explore hand-picked repositories waiting for contributors like you.
            From beginner-friendly to advanced projects, there's something for
            everyone.
          </motion.p>
        </motion.div>

        {/* Featured Repositories Grid */}
        <motion.div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {featuredRepos.map((repo, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="group relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(34,211,238,0.3)]">
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${repo.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                ></div>

                <CardHeader className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Github className="h-5 w-5 text-gray-400 group-hover:text-cyan-400 transition-colors duration-300" />
                      <span className="text-sm text-gray-400 group-hover:text-cyan-300 transition-colors duration-300">
                        {repo.owner}
                      </span>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30"
                    >
                      Open Source
                    </Badge>
                  </div>
                  <CardTitle className="text-white group-hover:text-cyan-300 transition-colors duration-300 text-xl">
                    {repo.name}
                  </CardTitle>
                  <CardDescription className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                    {repo.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
                        {repo.language}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-gray-300">
                          {repo.stars}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitBranch className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-300">
                          {repo.forks}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{repo.contributors} contributors</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{repo.lastUpdated}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {repo.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:border-cyan-500 hover:text-cyan-300 transition-colors duration-300 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button className="w-full group/btn relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
                    <span className="relative z-10 flex items-center">
                      View Repository
                      <ExternalLink className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300"></div>
                  </Button>
                </CardContent>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <Button
            size="lg"
            variant="outline"
            className="group border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 text-lg px-8 py-4 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
          >
            <span className="flex items-center">
              View All Projects
              <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default Featured;
