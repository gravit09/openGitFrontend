import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/custom/Navbar";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Github, Star, GitFork, Trash2, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Footer from "@/sections/footer";

interface Repository {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
  dateAdded: string;
}

const Repositories = () => {
  const { toast } = useToast();
  const { getToken } = useAuth();
  const { user } = useUser();
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const token = await getToken();
        // Build query string from searchTerm
        const params = new URLSearchParams();
        if (searchTerm) params.append("search", searchTerm);
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
          const repos = Array.isArray(data.repos) ? data.repos : [];
          const transformedData = repos.map((repo) => ({
            id: repo._id || repo.id,
            name: repo.name,
            description: repo.description || "",
            stars: repo.stars || 0,
            forks: repo.forks || 0,
            url: repo.githubUrl || repo.url,
            dateAdded: (() => {
              const dateValue = repo.createdAt || repo.dateAdded;
              if (!dateValue) return "";
              try {
                const date = new Date(dateValue);
                return isNaN(date.getTime())
                  ? ""
                  : date.toISOString().split("T")[0];
              } catch (error) {
                console.warn("Invalid date value:", dateValue);
                return "";
              }
            })(),
          }));
          setRepositories(transformedData);
        }
      } catch (error) {
        console.error("Error fetching repositories:", error);
        toast({
          title: "Error",
          description: "Failed to load repositories",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [getToken, toast, searchTerm]);

  const [newRepo, setNewRepo] = useState({
    name: "",
    description: "",
    url: "",
    tags: [],
  });

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Remove all frontend filtering logic (filteredRepositories, etc.)
  // Use repositories directly for rendering

  const handleRemoveRepository = async (id: string) => {
    try {
      const token = await getToken();
      const response = await fetch(
        `http://localhost:4000/api/repo/listrepo/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete repository");
      }

      setRepositories(repositories.filter((repo) => repo.id !== id));
      toast({
        title: "Repository Removed",
        description:
          "The repository has been successfully removed from the platform.",
      });
    } catch (error) {
      console.error("Error removing repository:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to remove repository",
        variant: "destructive",
      });
    }
  };

  const handleAddRepository = async () => {
    if (!newRepo.name || !newRepo.url) {
      toast({
        title: "Error",
        description: "Please fill in at least the repository name and URL.",
        variant: "destructive",
      });
      return;
    }
    setAddLoading(true);
    try {
      // Remove frontend GitHub username vs owner check
      // Always allow the request to go to the backend
      const token = await getToken();
      const response = await fetch("http://localhost:4000/api/repo/listrepo", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(newRepo),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add repository");
      }
      const addedRepo = await response.json();
      setRepositories((prev) => [
        ...prev,
        {
          id: addedRepo._id || addedRepo.id,
          name: addedRepo.name,
          description: addedRepo.description || "",
          stars: 0,
          forks: 0,
          url: addedRepo.url,
          dateAdded: new Date().toISOString().split("T")[0],
        },
      ]);
      toast({
        title: "Repository Added",
        description:
          "The repository has been successfully added to the platform.",
      });
      setNewRepo({
        name: "",
        description: "",
        url: "",
        tags: [],
      });
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error("Error adding repository:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to add repository",
        variant: "destructive",
      });
    } finally {
      setAddLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-16 -left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 -right-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
      <Navbar />
      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs mb-3">
              Dashboard
            </div>
            <h1 className="text-4xl font-bold mb-2">Repository Dashboard</h1>
            <p className="text-gray-400">
              Manage open source repositories on the platform
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Repository
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900/90 backdrop-blur border border-gray-700/60">
              <DialogHeader>
                <DialogTitle className="text-white">
                  Add New Repository
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Repository Name *
                  </Label>
                  <Input
                    id="name"
                    value={newRepo.name}
                    onChange={(e) =>
                      setNewRepo({ ...newRepo, name: e.target.value })
                    }
                    className="bg-gray-900/50 border border-gray-700/60 text-white backdrop-blur-sm"
                    placeholder="e.g., react"
                  />
                </div>
                <div>
                  <Label htmlFor="url" className="text-white">
                    GitHub URL *
                  </Label>
                  <Input
                    id="url"
                    value={newRepo.url}
                    onChange={(e) =>
                      setNewRepo({ ...newRepo, url: e.target.value })
                    }
                    className="bg-gray-900/50 border border-gray-700/60 text-white backdrop-blur-sm"
                    placeholder="https://github.com/user/repo"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={newRepo.description}
                    onChange={(e) =>
                      setNewRepo({ ...newRepo, description: e.target.value })
                    }
                    className="bg-gray-900/50 border border-gray-700/60 text-white backdrop-blur-sm"
                    placeholder="Brief description of the repository"
                  />
                </div>
                <Button
                  onClick={handleAddRepository}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                  disabled={addLoading}
                >
                  {addLoading ? <span>Adding...</span> : "Add Repository"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/60 backdrop-blur mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Repositories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              placeholder="Search by name, description, or language..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-900/50 border border-gray-700/60 text-white backdrop-blur-sm"
            />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-gray-700/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white">
              Listed Repositories ({repositories.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-400">
                Loading repositories...
              </div>
            ) : (
              <>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-300">
                        Repository
                      </TableHead>
                      <TableHead className="text-gray-300">Stats</TableHead>
                      <TableHead className="text-gray-300">
                        Date Added
                      </TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {repositories.map((repo) => (
                      <TableRow
                        key={repo.id}
                        className="border-gray-800 hover:bg-cyan-500/5"
                      >
                        <TableCell>
                          <div className="flex items-start gap-3">
                            <Github className="h-5 w-5 text-gray-400 mt-1" />
                            <div>
                              <h3 className="font-semibold text-white">
                                {repo.name}
                              </h3>
                              <p className="text-sm text-gray-400 max-w-md">
                                {repo.description}
                              </p>
                              <a
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-cyan-300 hover:text-cyan-200"
                              >
                                {repo.url}
                              </a>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4" />
                              {repo.stars.toLocaleString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <GitFork className="h-4 w-4" />
                              {repo.forks.toLocaleString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-400">
                          {new Date(repo.dateAdded).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleRemoveRepository(repo.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {repositories.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    No repositories found matching your search criteria.
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Repositories;
