import { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Navbar from "@/components/custom/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function TopContributorsPage() {
  const [contributors, setContributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();
  const apiBase = useMemo(
    () => (import.meta as any).env?.VITE_API_URL || "http://localhost:4000",
    []
  );

  useEffect(() => {
    const fetchContributors = async () => {
      setLoading(true);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000); // 10s timeout
      try {
        const token = await getToken().catch(() => null);
        const headers: Record<string, string> = {};
        if (token) headers["Authorization"] = `Bearer ${token}`;

        const res = await fetch(`${apiBase}/api/repo/top-contributors`, {
          headers,
          signal: controller.signal,
        });

        if (!res.ok) {
          // Graceful fallback
          setContributors([]);
          return;
        }
        const data = await res.json().catch(() => ({}));
        setContributors(
          Array.isArray(data.contributors) ? data.contributors : []
        );
      } catch (err) {
        // Network/timeout fallback
        setContributors([]);
      } finally {
        clearTimeout(timeout);
        setLoading(false);
      }
    };
    fetchContributors();
  }, [getToken, apiBase]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl bg-background text-foreground min-h-screen">
      <Navbar />
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-2 text-foreground">
          Top Contributors
        </h1>
        <Link to="/explore">
          <Button variant="outline">Back to Explore</Button>
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Top Contributors to All Repositories</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : contributors.length === 0 ? (
            <div className="text-center py-8">No contributors found.</div>
          ) : (
            <Table>
              <TableCaption>
                Most active contributors across all repositories.
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Avatar</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Total Contributions</TableHead>
                  <TableHead>Repositories</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contributors.map((contributor, idx) => (
                  <TableRow key={contributor.login + idx}>
                    <TableCell>
                      <a
                        href={contributor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <img
                          src={contributor.avatar_url || "/placeholder.svg"}
                          alt={contributor.login}
                          className="w-10 h-10 rounded-full"
                        />
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        href={contributor.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {contributor.login}
                      </a>
                    </TableCell>
                    <TableCell>{contributor.total}</TableCell>
                    <TableCell>
                      <ul className="list-disc ml-4">
                        {contributor.repos.map((r: any, i: number) => (
                          <li key={r.repo + i}>
                            <span className="font-medium">{r.repo}</span>:{" "}
                            {r.contributions}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
