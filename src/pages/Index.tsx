
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitBranch, Coins, Users, Code, Zap, ArrowRight, CheckCircle } from "lucide-react";

const Index = () => {
  const featuredRepos = [
    {
      name: "react-dashboard",
      owner: "alexdev",
      description: "Modern React dashboard with TypeScript and Tailwind CSS",
      language: "TypeScript",
      stars: 1234,
      bounty: "0.5 SOL",
      tags: ["frontend", "react", "dashboard"]
    },
    {
      name: "blockchain-wallet",
      owner: "cryptobuilder",
      description: "Secure multi-chain wallet with DeFi integration",
      language: "Rust",
      stars: 892,
      bounty: "2.0 SOL", 
      tags: ["blockchain", "wallet", "defi"]
    },
    {
      name: "ai-chat-bot",
      owner: "mlpioneer",
      description: "Intelligent chatbot with natural language processing",
      language: "Python",
      stars: 567,
      bounty: "1.2 SOL",
      tags: ["ai", "nlp", "chatbot"]
    }
  ];

  const features = [
    {
      icon: <Github className="h-8 w-8" />,
      title: "GitHub Integration",
      description: "Seamlessly connect your existing GitHub repositories"
    },
    {
      icon: <Coins className="h-8 w-8" />,
      title: "Solana Bounties",
      description: "Earn SOL tokens for successful contributions and merges"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description: "Connect with developers worldwide and build together"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast Rewards",
      description: "Get paid instantly when your code gets merged"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Browse Repositories",
      description: "Explore projects that match your skills and interests"
    },
    {
      number: "02", 
      title: "Submit Contributions",
      description: "Fork, code, and submit pull requests to earn bounties"
    },
    {
      number: "03",
      title: "Get Rewarded",
      description: "Receive SOL tokens when your code gets merged"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Github className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">OpenGit</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#repositories" className="text-gray-300 hover:text-white transition-colors">Repositories</a>
              <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How it Works</a>
              <a href="#bounties" className="text-gray-300 hover:text-white transition-colors">Bounties</a>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                Sign In
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent animate-fade-in">
              Build the Future of
              <br />
              Open Source
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in">
              Connect contributors with repositories. Earn Solana bounties for successful merges.
              <br />
              Where code meets rewards.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                Browse Repositories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-4">
                List Your Repo
                <Code className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Featured Repositories */}
      <section id="repositories" className="py-20 px-6 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Repositories</h2>
            <p className="text-xl text-gray-400">Discover projects with active bounties</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRepos.map((repo, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Github className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-400">{repo.owner}</span>
                    </div>
                    <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                      {repo.bounty}
                    </Badge>
                  </div>
                  <CardTitle className="text-white">{repo.name}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {repo.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-400">{repo.language}</span>
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-gray-400">{repo.stars}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {repo.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="border-gray-600 text-gray-300">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    View Repository
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How OpenGit Works</h2>
            <p className="text-xl text-gray-400">Simple steps to start earning with open source</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                <p className="text-gray-400 text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-900/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose OpenGit?</h2>
            <p className="text-xl text-gray-400">Built for developers, powered by blockchain</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-800/50 border-gray-700 text-center hover:bg-gray-800/70 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-center text-blue-400 mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bounty System */}
      <section id="bounties" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Solana-Powered Bounties</h2>
              <p className="text-xl text-gray-300 mb-8">
                Earn real value for your contributions. Repository owners set bounties in SOL tokens, 
                and contributors get paid instantly when their code gets merged.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-gray-300">Instant payments on merge</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-gray-300">Low transaction fees</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <span className="text-gray-300">Transparent reward system</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 p-8 rounded-2xl border border-gray-700">
              <div className="text-center">
                <Coins className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Average Bounty</h3>
                <div className="text-4xl font-bold text-green-400 mb-2">1.5 SOL</div>
                <p className="text-gray-400">per successful contribution</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Contributing?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers earning SOL through open source contributions
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
              Browse Repositories
              <GitBranch className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-4">
              List Your Repository
              <Code className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Github className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">OpenGit</span>
              </div>
              <p className="text-gray-400">
                Connecting developers worldwide through incentivized open source collaboration.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Repos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">List Repository</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Bounties</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OpenGit. All rights reserved. Powered by Solana.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
