import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

function navbar() {
  return (
    <header className="border-b border-gray-800 bg-black/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Github className="h-8 w-8 text-gray-300" />
            <span className="text-xl font-bold text-white">OpenGit</span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#repositories"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              Repositories
            </a>
            <a
              href="#how-it-works"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              How it Works
            </a>
            <a
              href="#community"
              className="text-gray-400 hover:text-gray-200 transition-colors"
            >
              Community
            </a>
            <Button
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
            >
              Sign In
            </Button>
            <Button className="bg-white text-black hover:bg-gray-200">
              Get Started
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default navbar;
