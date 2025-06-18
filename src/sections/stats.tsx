import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Award, DollarSign, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

function stats() {
  return (
    <section className="py-20 px-6 bg-gray-950">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gray-900/30 border-gray-700 text-center backdrop-blur-sm">
            <CardContent className="p-6">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">250+</div>
              <div className="text-gray-400 text-sm">Active Bounties</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/30 border-gray-700 text-center backdrop-blur-sm">
            <CardContent className="p-6">
              <DollarSign className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">
                1,500 SOL
              </div>
              <div className="text-gray-400 text-sm">Total Rewards Paid</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/30 border-gray-700 text-center backdrop-blur-sm">
            <CardContent className="p-6">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">5,200+</div>
              <div className="text-gray-400 text-sm">Contributors Rewarded</div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/30 border-gray-700 text-center backdrop-blur-sm">
            <CardContent className="p-6">
              <Github className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <div className="text-2xl font-bold text-white mb-1">850+</div>
              <div className="text-gray-400 text-sm">Projects Listed</div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action for Bounties */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-purple-600 text-white hover:bg-purple-700 text-lg px-8 py-4 mr-4"
          >
            Browse All Bounties
            <Award className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-purple-600 text-purple-400 hover:bg-purple-900/20 text-lg px-8 py-4"
          >
            List Your Bounty
            <DollarSign className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default stats;
