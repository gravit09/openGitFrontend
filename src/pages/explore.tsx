import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  const [difficulties, setDifficulties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedActivity, setSelectedActivity] = useState("all");

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      try {
        const token = await getToken();
        const response = await fetch(
          "http://localhost:4000/api/repo/listrepo",
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
          const allSkills = new Set<string>();
          const allLanguages = new Set<string>();
          const allDifficulties = new Set<string>();
          repos.forEach((repo: any) => {
            (repo.topics || []).forEach((topic: string) =>
              allSkills.add(topic)
            );
            (repo.language || []).forEach
              ? repo.language.forEach((lang: string) => allLanguages.add(lang))
              : allLanguages.add(repo.language);
            if (repo.difficulty) allDifficulties.add(repo.difficulty);
          });
          setSkills(Array.from(allSkills));
          setLanguages(Array.from(allLanguages));
          setDifficulties(Array.from(allDifficulties));
        }
      } catch (error) {
        console.error("Error fetching repositories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [getToken]);

  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch =
      repo.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (repo.topics || []).some((topic: string) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some(
        (skill) =>
          (repo.topics || []).some((topic: string) =>
            topic.toLowerCase().includes(skill.toLowerCase())
          ) ||
          (Array.isArray(repo.language)
            ? repo.language
                .map((l: string) => l.toLowerCase())
                .includes(skill.toLowerCase())
            : (repo.language || "").toLowerCase().includes(skill.toLowerCase()))
      );

    const matchesDifficulty =
      !selectedDifficulty ||
      selectedDifficulty === "all" ||
      repo.difficulty === selectedDifficulty;
    const matchesLanguage =
      !selectedLanguage ||
      selectedLanguage === "all" ||
      (Array.isArray(repo.language)
        ? repo.language.includes(selectedLanguage)
        : repo.language === selectedLanguage);

    const matchesActivity =
      !selectedActivity ||
      selectedActivity === "all" ||
      (selectedActivity === "high" && repo.recentCommits >= 20) ||
      (selectedActivity === "medium" &&
        repo.recentCommits >= 5 &&
        repo.recentCommits < 20) ||
      (selectedActivity === "low" && repo.recentCommits < 5);

    return (
      matchesSearch &&
      matchesSkills &&
      matchesDifficulty &&
      matchesLanguage &&
      matchesActivity
    );
  });

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    switch (sortBy) {
      case "stars":
        return (b.stars || 0) - (a.stars || 0);
      case "bounties":
        return (b.totalBountyAmount || 0) - (a.totalBountyAmount || 0);
      case "issues":
        return (b.openIssues || 0) - (a.openIssues || 0);
      case "updated":
        return (
          new Date(b.lastUpdated || b.updatedAt || b.createdAt || 0).getTime() -
          new Date(a.lastUpdated || a.updatedAt || a.createdAt || 0).getTime()
        );
      default:
        return 0;
    }
  });

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl bg-background text-foreground min-h-screen">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-foreground">
            Explore Open Source Projects
          </h1>
          <p className="text-muted-foreground">
            Discover repositories, contribute to open source, and earn bounties
            in SOL
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="mr-0 border border-white px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-lg">
            <Link to="/dash" className="text-white font-semibold text-sm">
              Dashboard
            </Link>
          </div>
          <ThemeToggle />
          <UserMenu />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search repositories, topics, or technologies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48">
              <SortAsc className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="stars">Most Stars</SelectItem>
              <SelectItem value="bounties">Highest Bounties</SelectItem>
              <SelectItem value="issues">Most Issues</SelectItem>
              <SelectItem value="updated">Recently Updated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select
            value={selectedDifficulty}
            onValueChange={setSelectedDifficulty}
          >
            <SelectTrigger className="w-40">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {difficulties.map((difficulty) => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-40">
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

          <Select value={selectedActivity} onValueChange={setSelectedActivity}>
            <SelectTrigger className="w-40">
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
                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/80"
                onClick={() => toggleSkill(skill)}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Active Filters */}
        {(selectedSkills.length > 0 ||
          selectedDifficulty ||
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
            {selectedDifficulty && (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={() => setSelectedDifficulty("")}
              >
                {selectedDifficulty} ×
              </Badge>
            )}
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
                setSelectedSkills([]);
                setSelectedDifficulty("");
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
          Showing {sortedRepos.length} of {repositories.length} repositories
        </p>
      </div>

      {/* Repository Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sortedRepos.map((repo) => (
          <Card
            key={repo.id}
            className="hover:shadow-lg transition-shadow bg-card border-border/110 backdrop-blur supports-[backdrop-filter]:bg-card/95"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg mb-1">
                    <span className="text-muted-foreground">{repo.owner}/</span>
                    {repo.name}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {repo.description}
                  </CardDescription>
                </div>
                <Badge className="dark:text-white bg-green-700">
                  {repo.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Score-based tag */}
              <div className="flex gap-2 mb-2">
                {typeof repo.score === "number" && (
                  <Badge variant="secondary" className="text-xs">
                    Difficulty Rating: {repo.score}
                  </Badge>
                )}
                {repo.difficulty && (
                  <Badge variant="outline" className="text-xs">
                    {repo.difficulty}
                  </Badge>
                )}
              </div>

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

              {repo.recentCommits !== undefined && (
                <Badge variant="outline" className="text-xs">
                  {repo.recentCommits} recent commits
                </Badge>
              )}

              <Separator />

              {/* Issues and Bounties */}
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

                {repo.activeBounties > 0 && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                      <span className="text-sm">
                        {repo.activeBounties} active bounties
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
                      <DollarSign className="h-3 w-3" />
                      {repo.totalBountyAmount} SOL
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <span className="text-sm">
                    {repo.contributorCount} contributors
                  </span>
                </div>
              </div>

              <Separator />

              {/* Actions */}
              <div className="flex gap-2">
                <a
                  href={repo.githubUrl || repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md bg-primary text-white hover:bg-gray-400 bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{ textAlign: "center", textDecoration: "none" }}
                >
                  View Repository
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
                <a
                  href={`${repo.githubUrl || repo.url}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md border border-gray-400 text-gray-200 bg-transparent hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  style={{ textAlign: "center", textDecoration: "none" }}
                >
                  View Issues
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {sortedRepos.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2 text-foreground">
            No repositories found
          </h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setSelectedSkills([]);
              setSelectedDifficulty("");
              setSelectedLanguage("");
              setSelectedActivity("all");
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
