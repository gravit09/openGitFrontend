
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star, GitBranch, Users, Code, Zap, ArrowRight, CheckCircle, Globe } from "lucide-react";

const Index = () => {
  const featuredRepos = [
    {
      name: "react-dashboard",
      owner: "alexdev",
      description: "Modern React dashboard with TypeScript and Tailwind CSS",
      language: "TypeScript",
      stars: 1234,
      tags: ["frontend", "react", "dashboard"]
    },
    {
      name: "blockchain-wallet",
      owner: "cryptobuilder",
      description: "Secure multi-chain wallet with DeFi integration",
      language: "Rust",
      stars: 892,
      tags: ["blockchain", "wallet", "defi"]
    },
    {
      name: "ai-chat-bot",
      owner: "mlpioneer",
      description: "Intelligent chatbot with natural language processing",
      language: "Python",
      stars: 567,
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
      icon: <Globe className="h-8 w-8" />,
      title: "Global Community",
      description: "Connect with developers worldwide and contribute together"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Driven",
      description: "Build amazing projects with passionate contributors"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Learn & Grow",
      description: "Enhance your skills through real-world contributions"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Discover Projects",
      description: "Explore repositories that match your skills and interests"
    },
    {
      number: "02", 
      title: "Start Contributing",
      description: "Fork, code, and submit pull requests to make an impact"
    },
    {
      number: "03",
      title: "Build Your Portfolio",
      description: "Showcase your contributions and grow your developer profile"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Github className="h-8 w-8 text-gray-300" />
              <span className="text-xl font-bold text-white">OpenGit</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#repositories" className="text-gray-400 hover:text-gray-200 transition-colors">Repositories</a>
              <a href="#how-it-works" className="text-gray-400 hover:text-gray-200 transition-colors">How it Works</a>
              <a href="#community" className="text-gray-400 hover:text-gray-200 transition-colors">Community</a>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white">
                Sign In
              </Button>
              <Button className="bg-white text-black hover:bg-gray-200">
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-fade-in">
              Contribute to the Future of
              <br />
              Open Source
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 animate-fade-in">
              Connect with projects you love. Contribute for fun, learning, and impact.
              <br />
              Where passion meets open source collaboration.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4">
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-lg px-8 py-4">
                List Your Repo
                <Code className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-400/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Featured Repositories */}
      <section id="repositories" className="py-20 px-6 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Featured Repositories</h2>
            <p className="text-xl text-gray-400">Discover amazing open source projects waiting for contributors</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRepos.map((repo, index) => (
              <Card key={index} className="bg-gray-900 border-gray-700 hover:bg-gray-800 transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Github className="h-5 w-5 text-gray-400" />
                      <span className="text-sm text-gray-400">{repo.owner}</span>
                    </div>
                    <Badge variant="secondary" className="bg-gray-600 text-gray-200 border-gray-500">
                      Open Source
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
                        <Star className="h-4 w-4 text-gray-400" />
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
                  <Button className="w-full bg-white text-black hover:bg-gray-200">
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
            <h2 className="text-4xl font-bold mb-4 text-white">How OpenGit Works</h2>
            <p className="text-xl text-gray-400">Simple steps to start contributing to open source</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto text-black">
                  {step.number}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{step.title}</h3>
                <p className="text-gray-400 text-lg">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-gray-950">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Why Choose OpenGit?</h2>
            <p className="text-xl text-gray-400">Built for developers, powered by community</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900 border-gray-700 text-center hover:bg-gray-800 transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-center text-gray-300 mb-4">
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

      {/* Global Community Globe */}
      <section id="community" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6 text-white">Global Open Source Community</h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of developers worldwide contributing to open source projects. 
                Learn, grow, and make an impact while building your portfolio.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-gray-400" />
                  <span className="text-gray-300">Learn from experienced developers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-gray-400" />
                  <span className="text-gray-300">Build your developer portfolio</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-gray-400" />
                  <span className="text-gray-300">Connect with like-minded developers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-gray-400" />
                  <span className="text-gray-300">Contribute to meaningful projects</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 relative overflow-hidden">
              <div className="text-center relative z-10">
                <div className="relative mx-auto mb-6 w-32 h-32">
                  <Globe className="h-32 w-32 text-gray-400 mx-auto animate-spin" style={{ animationDuration: '20s' }} />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Contributors Worldwide</h3>
                <div className="text-4xl font-bold text-gray-300 mb-2">10,000+</div>
                <p className="text-gray-400">active open source contributors</p>
              </div>
              {/* Background decoration */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                <div className="absolute top-8 right-8 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-white rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-8 right-4 w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-white">Ready to Start Contributing?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of developers making their mark on open source
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4">
              Explore Projects
              <GitBranch className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-lg px-8 py-4">
              List Your Repository
              <Code className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-black border-t border-gray-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Github className="h-6 w-6 text-gray-300" />
                <span className="text-lg font-bold text-white">OpenGit</span>
              </div>
              <p className="text-gray-400">
                Connecting developers worldwide through open source collaboration and learning.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-gray-200 transition-colors">Browse Projects</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">List Repository</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Community</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-gray-200 transition-colors">Discord</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">GitHub</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-gray-200 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">API Docs</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 OpenGit. All rights reserved. Powered by the open source community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
