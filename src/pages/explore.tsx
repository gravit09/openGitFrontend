import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/custom/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Star,
  GitFork,
  DollarSign,
  Users,
  AlertCircle,
  Filter,
  SortAsc,
  ExternalLink,
  Coins,
  Moon,
  Sun,
  LogOut,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

function UserMenu() {
  const { user } = useUser();
  const { isSignedIn, signOut } = useAuth();

  if (!isSignedIn || !user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
            <AvatarFallback>
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.fullName || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

import { Link } from "react-router-dom";

export default function ExplorePage() {
  const { getToken } = useAuth();
  const [repositories, setRepositories] = useState<any[]>([]);
  const [skills, setSkills] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState("all");

  // Pagination state
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("pageSize", String(pageSize));
        if (searchQuery) params.append("search", searchQuery);
        if (selectedSkills.length > 0)
          params.append("skills", selectedSkills.join(","));
        if (selectedLanguage && selectedLanguage !== "all")
          params.append("language", selectedLanguage);
        if (selectedActivity && selectedActivity !== "all")
          params.append("activity", selectedActivity);
        if (sortBy) params.append("sort", sortBy);
        const response = await fetch(
          `http://localhost:4000/api/repo/listrepo?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          const repos = data.repos || [];
          setRepositories(repos);
          setTotalPages(data.totalPages || 1);
          const allSkills = new Set<string>();
          const allLanguages = new Set<string>();
          repos.forEach((repo: any) => {
            (repo.topics || []).forEach((topic: string) =>
              allSkills.add(topic)
            );
            (repo.language || []).forEach
              ? repo.language.forEach((lang: string) => allLanguages.add(lang))
              : allLanguages.add(repo.language);
          });
          setSkills(Array.from(allSkills));
          setLanguages(Array.from(allLanguages));
        }
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [
    getToken,
    searchQuery,
    selectedSkills,
    selectedLanguage,
    selectedActivity,
    sortBy,
    page,
  ]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black text-foreground">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-16 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -right-10 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
      <Navbar />
      <div className="container mx-auto px-6 py-14 max-w-7xl">
        <div className="mb-8 mt-8 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs mb-3">
              Explore
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-2">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                Discover great projects
              </span>
            </h1>
            <p className="text-gray-400">
              Discover repositories, contribute to open source, and make an
              impact
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <UserMenu />
          </div>
        </div>

        <div className="mb-8 space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-cyan-300/70" />
              <Input
                placeholder="Search repositories, topics, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900/50 border border-gray-700/50 backdrop-blur-sm focus-visible:ring-cyan-500/40"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48 bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <SortAsc className="h-4 w-4 mr-2 text-cyan-300/80" />
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="stars">Most Stars</SelectItem>
                <SelectItem value="issues">Most Issues</SelectItem>
                <SelectItem value="updated">Recently Updated</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger className="w-40 bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                {languages.map((language) => (
                  <SelectItem key={language} value={language}>
                    {language}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedActivity}
              onValueChange={setSelectedActivity}
            >
              <SelectTrigger className="w-40 bg-gray-900/50 border-gray-700/50 backdrop-blur-sm">
                <SelectValue placeholder="Activity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Activity</SelectItem>
                <SelectItem value="high">High Activity</SelectItem>
                <SelectItem value="medium">Medium Activity</SelectItem>
                <SelectItem value="low">Low Activity</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Skills Filter */}
          <div>
            <h3 className="text-sm font-medium mb-2">Filter by Skills:</h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <Badge
                  key={`skill-filter-${skill}-${idx}`}
                  variant={
                    selectedSkills.includes(skill) ? "default" : "outline"
                  }
                  className="cursor-pointer hover:border-cyan-700"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(selectedSkills.length > 0 ||
            selectedLanguage ||
            selectedActivity !== "all") && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Active filters:
              </span>
              {selectedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleSkill(skill)}
                >
                  {skill} ×
                </Badge>
              ))}
              {selectedLanguage && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedLanguage("")}
                >
                  {selectedLanguage} ×
                </Badge>
              )}
              {selectedActivity !== "all" && (
                <Badge
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => setSelectedActivity("all")}
                >
                  {selectedActivity} ×
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedSkills([]);
                  setSelectedLanguage("");
                  setSelectedActivity("all");
                }}
              >
                Clear all
              </Button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {repositories.length} of {repositories.length} repositories
          </p>
        </div>

        {/* Repository Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {repositories.map((repo) => (
            <Card
              key={repo.id}
              className="group relative overflow-hidden bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-1">
                      <span className="text-muted-foreground">
                        {repo.owner}/
                      </span>
                      {repo.name}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {repo.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {repo.stars.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    {repo.forks}
                  </div>
                </div>

                {/* Language and Topics */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 6).map((topic) => (
                      <Badge key={topic} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {repo.topics.length > 6 && (
                      <Badge variant="outline" className="text-xs">
                        +{repo.topics.length - 6}
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                {/* Issues */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                      <span className="text-sm">
                        {repo.openIssues} open issues
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {repo.issues} open issues
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    <span className="text-sm">
                      {repo.contributorCount} contributors
                    </span>
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                {/* Actions */}
                <div className="flex gap-2">
                  <a
                    href={repo.githubUrl || repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:ring-offset-0"
                    style={{ textAlign: "center", textDecoration: "none" }}
                  >
                    View Repository
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                  <a
                    href={`${repo.githubUrl || repo.url}/issues`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-cyan-400/50 text-cyan-300 bg-transparent hover:bg-cyan-400/10 hover:border-cyan-400 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:ring-offset-0"
                    style={{ textAlign: "center", textDecoration: "none" }}
                  >
                    View Issues
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-10">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-1 rounded border border-gray-700/50 bg-gray-900/50 text-gray-200 disabled:opacity-50 hover:border-cyan-500/30"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded border ${
                  page === i + 1
                    ? "border-cyan-500/60 bg-cyan-500/10 text-cyan-200"
                    : "border-gray-700/50 bg-gray-900/50 text-gray-200 hover:border-cyan-500/30"
                } transition-colors`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-1 rounded border border-gray-700/50 bg-gray-900/50 text-gray-200 disabled:opacity-50 hover:border-cyan-500/30"
            >
              Next
            </button>
          </div>
        )}

        {/* Empty State */}
        {repositories.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="h-12 w-12 text-cyan-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2 text-white">
              No repositories found
            </h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search criteria or filters
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("");
                setSelectedSkills([]);
                setSelectedLanguage("");
                setSelectedActivity("all");
              }}
              className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
