
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Github, Star, GitFork, Trash2, Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/sections/navbar";
import Footer from "@/sections/footer";

interface Repository {
  id: string;
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
  dateAdded: string;
}

const Repositories = () => {
  const { toast } = useToast();
  const [repositories, setRepositories] = useState<Repository[]>([
    {
      id: "1",
      name: "react-native",
      description: "A framework for building native applications using React",
      stars: 118000,
      forks: 24000,
      language: "JavaScript",
      url: "https://github.com/facebook/react-native",
      dateAdded: "2024-01-15"
    },
    {
      id: "2",
      name: "tensorflow",
      description: "An Open Source Machine Learning Framework for Everyone",
      stars: 185000,
      forks: 74000,
      language: "Python",
      url: "https://github.com/tensorflow/tensorflow",
      dateAdded: "2024-01-20"
    },
    {
      id: "3",
      name: "kubernetes",
      description: "Production-Grade Container Scheduling and Management",
      stars: 109000,
      forks: 39000,
      language: "Go",
      url: "https://github.com/kubernetes/kubernetes",
      dateAdded: "2024-01-25"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newRepo, setNewRepo] = useState({
    name: "",
    description: "",
    url: "",
    language: ""
  });
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredRepositories = repositories.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    repo.language.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveRepository = (id: string) => {
    setRepositories(repositories.filter(repo => repo.id !== id));
    toast({
      title: "Repository Removed",
      description: "The repository has been successfully removed from the platform.",
    });
  };

  const handleAddRepository = () => {
    if (!newRepo.name || !newRepo.url) {
      toast({
        title: "Error",
        description: "Please fill in at least the repository name and URL.",
        variant: "destructive"
      });
      return;
    }

    const repository: Repository = {
      id: Date.now().toString(),
      name: newRepo.name,
      description: newRepo.description || "No description provided",
      stars: Math.floor(Math.random() * 1000) + 100,
      forks: Math.floor(Math.random() * 500) + 50,
      language: newRepo.language || "Unknown",
      url: newRepo.url,
      dateAdded: new Date().toISOString().split('T')[0]
    };

    setRepositories([...repositories, repository]);
    setNewRepo({ name: "", description: "", url: "", language: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Repository Added",
      description: "The repository has been successfully added to the platform.",
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">Repository Dashboard</h1>
            <p className="text-gray-400">Manage open source repositories on the platform</p>
          </div>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Repository
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-900 border-gray-700">
              <DialogHeader>
                <DialogTitle className="text-white">Add New Repository</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">Repository Name *</Label>
                  <Input
                    id="name"
                    value={newRepo.name}
                    onChange={(e) => setNewRepo({ ...newRepo, name: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="e.g., react"
                  />
                </div>
                <div>
                  <Label htmlFor="url" className="text-white">GitHub URL *</Label>
                  <Input
                    id="url"
                    value={newRepo.url}
                    onChange={(e) => setNewRepo({ ...newRepo, url: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="https://github.com/user/repo"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Input
                    id="description"
                    value={newRepo.description}
                    onChange={(e) => setNewRepo({ ...newRepo, description: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="Brief description of the repository"
                  />
                </div>
                <div>
                  <Label htmlFor="language" className="text-white">Primary Language</Label>
                  <Input
                    id="language"
                    value={newRepo.language}
                    onChange={(e) => setNewRepo({ ...newRepo, language: e.target.value })}
                    className="bg-gray-800 border-gray-600 text-white"
                    placeholder="e.g., JavaScript, Python, Go"
                  />
                </div>
                <Button onClick={handleAddRepository} className="w-full bg-purple-600 hover:bg-purple-700">
                  Add Repository
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="bg-gray-900/30 border-gray-700 mb-8">
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
              className="bg-gray-800 border-gray-600 text-white"
            />
          </CardContent>
        </Card>

        <Card className="bg-gray-900/30 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">
              Listed Repositories ({filteredRepositories.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Repository</TableHead>
                  <TableHead className="text-gray-300">Language</TableHead>
                  <TableHead className="text-gray-300">Stats</TableHead>
                  <TableHead className="text-gray-300">Date Added</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRepositories.map((repo) => (
                  <TableRow key={repo.id} className="border-gray-700">
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <Github className="h-5 w-5 text-gray-400 mt-1" />
                        <div>
                          <h3 className="font-semibold text-white">{repo.name}</h3>
                          <p className="text-sm text-gray-400 max-w-md">{repo.description}</p>
                          <a 
                            href={repo.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-purple-400 hover:text-purple-300"
                          >
                            {repo.url}
                          </a>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-gray-700 rounded text-sm text-white">
                        {repo.language}
                      </span>
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
            
            {filteredRepositories.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No repositories found matching your search criteria.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Repositories;
