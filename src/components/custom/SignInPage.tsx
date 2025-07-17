import { SignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { useNavigate } from "react-router-dom";
import { Github } from "lucide-react";
import { Link } from "react-router-dom";

const SignInPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4 fixed inset-0">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-lg shadow-xl p-6">
          <div className="flex items-center text-center ml-28 space-x-3 mb-6">
            <Github className="h-8 w-8 text-gray-300" />
            <Link to="/" className="text-xl font-bold text-white">
              OpenGit
            </Link>
          </div>
          <SignIn
            appearance={{
              baseTheme: dark,
              elements: {
                rootBox: "mx-auto",
                card: "shadow-xl",
              },
            }}
            routing="hash"
            signUpUrl="/signup"
            redirectUrl="/explore"
          />
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
