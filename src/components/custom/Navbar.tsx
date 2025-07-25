import { Button } from "@/components/ui/button";
import { Home, Menu, MessageSquare, Plus, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function Floatingnavbar() {
  return (
    <div className="fixed top-2 left-0 right-0 z-50 flex justify-center ">
      <nav className="flex items-center justify-center space-x-8 rounded-full border bg-background/80 p-2 mt-2 mb-2 shadow-lg transition-all duration-300 hover:shadow-[0_0_24px_4px_rgba(34,211,238,0.25)]">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Home className="h-5 w-5" />
          <span className="sr-only">Home</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Link to="/top-contributors">
            <Users className="h-5 w-5" />
          </Link>
        </Button>
        <Button
          size="icon"
          className="rounded-full bg-primary text-primary-foreground"
        >
          <Link to="/dash">
            <Plus className="h-5 w-5" />
          </Link>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Messages</span>
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </nav>
    </div>
  );
}
