import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

function featured() {
  const featuredRepos = [
    {
      name: "react-dashboard",
      owner: "alexdev",
      description: "Modern React dashboard with TypeScript and Tailwind CSS",
      language: "TypeScript",
      stars: 1234,
      tags: ["frontend", "react", "dashboard"],
    },
    {
      name: "blockchain-wallet",
      owner: "cryptobuilder",
      description: "Secure multi-chain wallet with DeFi integration",
      language: "Rust",
      stars: 892,
      tags: ["blockchain", "wallet", "defi"],
    },
    {
      name: "ai-chat-bot",
      owner: "mlpioneer",
      description: "Intelligent chatbot with natural language processing",
      language: "Python",
      stars: 567,
      tags: ["ai", "nlp", "chatbot"],
    },
  ];

  return (
    <section id="repositories" className="py-10 px-6 bg-gray-950 landing-bg">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Featured Repositories
          </h2>
          <p className="text-xl text-gray-400">
            Discover amazing open source projects waiting for contributors
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredRepos.map((repo, index) => (
            <Card
              key={index}
              className="bg-cyan-900 border-cyan-100 hover:bg-cyan-600 transition-all duration-300 hover:scale-105"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Github className="h-5 w-5 text-gray-400" />
                    <span className="text-sm text-gray-400">{repo.owner}</span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-gray-600 text-gray-200 border-gray-500"
                  >
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
                    <span className="text-sm text-gray-400">
                      {repo.language}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-400">
                        {repo.stars}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {repo.tags.map((tag, tagIndex) => (
                    <Badge
                      key={tagIndex}
                      variant="outline"
                      className="border-gray-600 text-gray-300"
                    >
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
  );
}

export default featured;
