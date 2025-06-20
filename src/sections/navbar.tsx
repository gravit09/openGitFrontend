import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-black py-4 px-6 fixed w-full top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          OpenGit
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/explore" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            Explore
          </Link>
          <Link 
            to="/repositories" 
            className="text-gray-300 hover:text-white transition-colors"
          >
            Repositories
          </Link>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            How it Works
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors">
            About
          </a>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent className="bg-black text-white">
            <SheetHeader>
              <SheetTitle>OpenGit</SheetTitle>
              <SheetDescription>
                Manage your account preferences, set email preferences, and more.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Link to="/" className="text-gray-300 hover:text-white transition-colors block py-2">
                Home
              </Link>
              <Link to="/explore" className="text-gray-300 hover:text-white transition-colors block py-2">
                Explore
              </Link>
              <Link to="/repositories" className="text-gray-300 hover:text-white transition-colors block py-2">
                Repositories
              </Link>
              <a href="#" className="text-gray-300 hover:text-white transition-colors block py-2">
                How it Works
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors block py-2">
                About
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default Navbar;
