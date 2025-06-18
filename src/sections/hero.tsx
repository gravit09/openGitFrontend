import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Code } from "lucide-react";
import { useNavigate } from "react-router-dom";

function hero() {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 px-6">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-fade-in">
            Contribute to the Future of
            <br />
            Open Source
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 animate-fade-in">
            Connect with projects you love. Contribute for fun, learning, and
            impact.
            <br />
            Where passion meets open source collaboration.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in">
            <Button
              onClick={() => navigate("/explore")}
              size="lg"
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-4"
            >
              Explore Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white text-lg px-8 py-4"
            >
              List Your Repo
              <Code className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-400/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}

export default hero;
