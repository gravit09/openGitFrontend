import { Button } from "@/components/ui/button";
import { GitBranch, Code } from "lucide-react";
import React from "react";

function cta() {
  return (
    <section className="py-20 px-6 bg-gradient-to-r from-gray-900 to-gray-800">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-white">
          Ready to Start Contributing?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join thousands of developers making their mark on open source
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4"
          >
            Explore Projects
            <GitBranch className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-lg px-8 py-4"
          >
            List Your Repository
            <Code className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default cta;
