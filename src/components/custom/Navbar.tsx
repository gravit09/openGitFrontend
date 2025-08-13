import { Button } from "@/components/ui/button";
import { Github, Home, MessageSquare, Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Floatingnavbar() {
  return (
    <div className="fixed top-2 left-0 right-0 z-50 flex justify-center ">
      <nav className="flex items-center justify-center space-x-8 rounded-full border border-cyan-500/20 bg-background/80 p-2 mt-2 mb-2 shadow-lg transition-all duration-300 hover:shadow-[0_0_24px_4px_rgba(34,211,238,0.25)]">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-cyan-500/20 hover:text-cyan-300"
        >
          <Link to="/explore">
            <Home className="h-5 w-5" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-cyan-500/20 hover:text-cyan-300"
        >
          <Link to="/top-contributors">
            <Users className="h-5 w-5" />
          </Link>
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition-colors"
        >
          <Link to="/dash">
            <Plus className="h-5 w-5" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-cyan-500/20 hover:text-cyan-300"
        >
          <Link to="/community">
            <MessageSquare className="h-5 w-5" />
            <span className="sr-only">Messages</span>
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-cyan-500/20 hover:text-cyan-300"
        >
          <Github
            className="h-5 w-5"
            onClick={() => window.open("https://github.com/gravit09", "_blank")}
          />
        </Button>
      </nav>
    </div>
  );
}
