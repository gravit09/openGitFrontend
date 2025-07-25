import { Safari } from "@/components/custom/Safari";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Code } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function hero() {
  const navigate = useNavigate();
  return (
    <section className="relative pt-40 pb-40 px-6 overflow-hidden">
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full z-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 24%, rgba(180,180,200,0.18) 25%, rgba(180,180,200,0.18) 26%, transparent 27%, transparent 74%, rgba(180,180,200,0.18) 75%, rgba(180,180,200,0.18) 76%, transparent 77%, transparent)," +
            "linear-gradient(90deg, transparent 24%, rgba(180,180,200,0.18) 25%, rgba(180,180,200,0.18) 26%, transparent 27%, transparent 74%, rgba(180,180,200,0.18) 75%, rgba(180,180,200,0.18) 76%, transparent 77%, transparent)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="container mx-auto text-center relative z-10 flex flex-col items-center">
        <div className="max-w-4xl mx-auto mb-8 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent animate-fade-in drop-shadow-2xl">
            Contribute to the Future of
            <br />
            Open Source
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8 animate-fade-in drop-shadow-lg">
            Connect with projects you love. Contribute for fun, learning, and
            impact.
            <br />
            Where passion meets open source collaboration.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center animate-fade-in">
            <Button
              onClick={() => navigate("/explore")}
              size="lg"
              className="bg-white text-cyan-900 hover:bg-cyan-100 text-lg px-8 py-4 shadow-lg transition-all duration-300 hover:shadow-[0_0_24px_4px_rgba(34,211,238,0.4)]"
            >
              <span className="relative z-10 flex items-center">
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-cyan-400 text-cyan-200 hover:bg-cyan-900 hover:text-white text-lg px-8 py-4"
            >
              List Your Repo
              <Code className="ml-2 h-5 w-5" />
            </Button>
          </div>
          <p className="text-gray-200 text-thin mt-10 font-mono">
            {" "}
            {">_"} ~git init
          </p>
        </div>
      </div>
      <div className="relative z-10 w-full max-w-5xl mx-auto rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 shadow-lg transition-all duration-300 hover:shadow-[0_0_24px_4px_rgba(34,211,238,0.4)]">
        <Safari
          mode="simple"
          url="opengit.dev"
          imageSrc="/public/opengit.png"
          width={1210}
          height={654}
        />
      </div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gray-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-400/10 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}

export default hero;
