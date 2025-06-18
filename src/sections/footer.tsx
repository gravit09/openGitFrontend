import React from "react";
import { Github } from "lucide-react";

function footer() {
  return (
    <footer className="py-12 px-6 bg-black border-t border-gray-800">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Github className="h-6 w-6 text-gray-300" />
              <span className="text-lg font-bold text-white">OpenGit</span>
            </div>
            <p className="text-gray-400">
              Connecting developers worldwide through open source collaboration
              and learning.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Platform</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  Browse Projects
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  List Repository
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  Community
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Community</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  Discord
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  GitHub
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-white">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  API Docs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 OpenGit. All rights reserved. Powered by the open source
            community.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default footer;
