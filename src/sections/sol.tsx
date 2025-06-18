import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Award, Users, GitBranch, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function sol() {
  const solanaBounties = [
    {
      project: "DeFi Protocol Enhancement",
      difficulty: "Advanced",
      reward: "5.0 SOL",
      contributors: 12,
      status: "Active",
      description:
        "Implement advanced yield farming strategies with cross-chain compatibility",
      tech: ["Rust", "Solana", "TypeScript"],
      issuesCount: 8,
      mergedPRs: 15,
    },
    {
      project: "NFT Marketplace Bug Fixes",
      difficulty: "Intermediate",
      reward: "2.5 SOL",
      contributors: 8,
      status: "Active",
      description:
        "Fix critical bugs in the NFT minting and trading functionality",
      tech: ["JavaScript", "React", "Solana"],
      issuesCount: 5,
      mergedPRs: 7,
    },
    {
      project: "Wallet Integration Feature",
      difficulty: "Beginner",
      reward: "1.0 SOL",
      contributors: 24,
      status: "Completed",
      description: "Add support for additional Solana wallet providers",
      tech: ["TypeScript", "Web3.js"],
      issuesCount: 3,
      mergedPRs: 12,
    },
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <DollarSign className="h-8 w-8 text-purple-400" />
            <h2 className="text-4xl font-bold text-white">Solana Bounties</h2>
          </div>
          <p className="text-xl text-gray-300">
            Global Open Source Contribution Rewards
          </p>
          <p className="text-gray-400 mt-2">
            Earn Solana tokens while contributing to meaningful open source
            projects worldwide
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {solanaBounties.map((bounty, index) => (
            <Card
              key={index}
              className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/50 transition-all duration-300 backdrop-blur-sm"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge
                    variant="outline"
                    className={`
                  ${
                    bounty.difficulty === "Advanced"
                      ? "border-red-500 text-red-400"
                      : ""
                  }
                  ${
                    bounty.difficulty === "Intermediate"
                      ? "border-yellow-500 text-yellow-400"
                      : ""
                  }
                  ${
                    bounty.difficulty === "Beginner"
                      ? "border-green-500 text-green-400"
                      : ""
                  }
                `}
                  >
                    {bounty.difficulty}
                  </Badge>
                  <Badge
                    variant={
                      bounty.status === "Active" ? "default" : "secondary"
                    }
                    className={
                      bounty.status === "Active"
                        ? "bg-purple-600 text-white"
                        : "bg-gray-600 text-gray-200"
                    }
                  >
                    {bounty.status}
                  </Badge>
                </div>
                <CardTitle className="text-white text-lg">
                  {bounty.project}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {bounty.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-purple-400" />
                      <span className="text-white font-semibold">
                        {bounty.reward}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400 text-sm">
                        {bounty.contributors} contributors
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {bounty.tech.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="border-gray-600 text-gray-300 text-xs"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <GitBranch className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">
                        Issues: {bounty.issuesCount}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-gray-400">
                        Merged: {bounty.mergedPRs}
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-purple-600 text-white hover:bg-purple-700">
                    {bounty.status === "Active"
                      ? "Start Contributing"
                      : "View Results"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default sol;
