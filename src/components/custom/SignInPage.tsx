import { SignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  return (
    <div className="fixed inset-0 min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-gray-900 to-black p-6">
      {/* Background blobs */}
      <div className="absolute -top-16 -left-16 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 -right-10 w-96 h-96 bg-blue-600/10 blur-3xl rounded-full" />

      <div className="relative w-full max-w-md">
        <div className="bg-gray-900/60 backdrop-blur border border-cyan-500/20 rounded-2xl shadow-2xl p-6">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="relative">
              <Github className="h-8 w-8 text-cyan-400" />
              <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-lg" />
            </div>
            <Link
              to="/"
              className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent"
            >
              OpenGit
            </Link>
          </div>
          <SignIn
            appearance={{
              baseTheme: dark,
              variables: { colorPrimary: "#06b6d4" },
              elements: {
                rootBox: "mx-auto w-full",
                card: "bg-transparent shadow-none border-0",
                header: "hidden",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtons: "gap-2",
                socialButtonsBlockButton:
                  "bg-gray-900/50 border border-gray-700/60 text-white hover:bg-gray-900",
                formFieldLabel: "text-gray-300",
                formFieldInput:
                  "bg-gray-900/60 border border-gray-700/60 text-white placeholder-gray-500 focus:ring-cyan-500/40",
                footerActionText: "text-gray-300",
                footerActionLink: "text-cyan-300 hover:text-cyan-200",
                formButtonPrimary:
                  "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white",
              },
            }}
            routing="hash"
            signUpUrl="/signup"
            redirectUrl="/explore"
          />
        </div>
        <p className="mt-6 text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-cyan-300 hover:text-cyan-200">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
