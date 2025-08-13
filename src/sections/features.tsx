import { cn } from "@/lib/utils";
import {
  IconSearch,
  IconGitBranch,
  IconTerminal2,
  IconActivity,
  IconUsers,
  IconShieldCheck,
  IconStar,
  IconWorld,
} from "@tabler/icons-react";

export function FeaturesSection() {
  const features = [
    {
      title: "List your repository",
      description:
        "Publish your repo on OpenGit and get matched with active contributors.",
      icon: <IconGitBranch className="h-6 w-6 text-cyan-400" />,
    },
    {
      title: "Discover great repositories",
      description:
        "Find trending, high‑quality projects across ecosystems with powerful filters.",
      icon: <IconSearch className="h-6 w-6 text-cyan-400" />,
    },
    {
      title: "Contribute effortlessly",
      description:
        "Surface good first issues and curated tasks to start contributing in minutes.",
      icon: <IconGitBranch className="h-6 w-6 text-cyan-400" />,
    },
    {
      title: "Built for developers",
      description:
        "Fast, minimal, and familiar—crafted for engineers who ship.",
      icon: <IconTerminal2 className="h-6 w-6 text-cyan-400" />,
    },
    {
      title: "Real‑time insights",
      description:
        "Stars, contributors, and activity trends updated as they happen.",
      icon: <IconActivity className="h-6 w-6 text-cyan-400" />,
    },
    {
      title: "Community first",
      description:
        "Follow maintainers and teams, discover collaborators, grow together.",
      icon: <IconUsers className="h-6 w-6 text-cyan-400" />,
    },
    {
      title: "Secure & transparent",
      description:
        "Open data, clear licensing, and privacy‑respecting analytics.",
      icon: <IconShieldCheck className="h-6 w-6 text-cyan-400" />,
    },
    {
      title: "Star and track favorites",
      description: "Save repos, get signals, and never miss important updates.",
      icon: <IconStar className="h-6 w-6 text-cyan-400" />,
    },
  ];
  return (
    <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-b from-black to-gray-900">
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 mb-6">
            <span className="text-cyan-400 text-sm font-medium">
              Why Choose OpenGit?
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
              Everything you need to
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              succeed in open source
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Powerful features designed to make your open source journey
            seamless, productive, and enjoyable.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 mx-auto">
          {features.map((feature, index) => (
            <Feature key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r py-10 relative group/feature border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l",
        index < 4 && "lg:border-b"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-cyan-500/10 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-400">{icon}</div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-cyan-500/20 group-hover/feature:bg-cyan-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-white">
          {title}
        </span>
      </div>
      <p className="text-sm text-gray-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
