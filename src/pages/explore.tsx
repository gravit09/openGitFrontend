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
  Eye,
  DollarSign,
  Users,
  AlertCircle,
  Filter,
  SortAsc,
  ExternalLink,
  Coins,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

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

// Mock data for repositories
import { repositories, difficulties, languages, skills } from "./sample.json";

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [sortBy, setSortBy] = useState("stars");
  const [activeTab, setActiveTab] = useState("all");

  const filteredRepos = repositories.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      repo.topics.some((topic) =>
        topic.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesSkills =
      selectedSkills.length === 0 ||
      selectedSkills.some(
        (skill) =>
          repo.topics.some((topic) =>
            topic.toLowerCase().includes(skill.toLowerCase())
          ) || repo.language.toLowerCase().includes(skill.toLowerCase())
      );

    const matchesDifficulty =
      !selectedDifficulty || repo.difficulty === selectedDifficulty;
    const matchesLanguage =
      !selectedLanguage || repo.language === selectedLanguage;

    return (
      matchesSearch && matchesSkills && matchesDifficulty && matchesLanguage
    );
  });

  const sortedRepos = [...filteredRepos].sort((a, b) => {
    switch (sortBy) {
      case "stars":
        return b.stars - a.stars;
      case "bounties":
        return b.totalBountyAmount - a.totalBountyAmount;
      case "issues":
        return b.openIssues - a.openIssues;
      case "updated":
        return (
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
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
        <ThemeToggle />
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
        </div>

        {/* Skills Filter */}
        <div>
          <h3 className="text-sm font-medium mb-2">Filter by Skills:</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
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
          selectedLanguage) && (
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedSkills([]);
                setSelectedDifficulty("");
                setSelectedLanguage("");
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
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {repo.watchers}
                </div>
              </div>

              {/* Language and Topics */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                  <span className="text-sm">{repo.language}</span>
                  <span className="text-xs text-muted-foreground">
                    • {repo.lastUpdated}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {repo.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                  {repo.topics.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{repo.topics.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

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
                    {repo.goodFirstIssues} good first issues
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
                <Button className="flex-1" size="sm">
                  View Repository
                  <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
                <Button variant="outline" size="sm">
                  View Issues
                </Button>
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
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
}
