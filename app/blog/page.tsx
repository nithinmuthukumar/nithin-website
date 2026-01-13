import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pin } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Nithin Muthukumar",
  description:
    "Magic: The Gathering deck guides, meta analysis, and brewing insights for Standard format.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Pinned Deck Guide */}
      <div className="mb-8">
        <Card className="border-primary/50 bg-primary/5 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Pin className="w-4 h-4 text-primary" />
            </div>
            <CardTitle className="text-2xl">
              <Link
                href="/decks/golgari-airship"
                className="hover:text-primary transition-colors"
              >
                Golgari Airship Deck Guide
              </Link>
            </CardTitle>
            <CardDescription>
              Published December 20, 2025 • Last updated January 13, 2026
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Complete, Up-to-Date Deck Guide for Golgari Airship
            </p>
            <Button asChild variant="outline">
              <Link href="/decks/golgari-airship">Read Guide</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Card
              key={post.slug}
              className="hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                <div className="flex-1">
                  <CardHeader>
                    <CardTitle className="text-2xl">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {post.title}
                      </Link>
                    </CardTitle>
                    <CardDescription>
                      {new Date(post.date + "T00:00:00").toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          timeZone: "UTC",
                        },
                      )}
                    </CardDescription>
                  </CardHeader>
                  {post.excerpt && (
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {post.excerpt}
                      </p>
                      <Button asChild variant="outline">
                        <Link href={`/blog/${post.slug}`}>Read more</Link>
                      </Button>
                    </CardContent>
                  )}
                </div>
                {post.thumbnail && post.thumbnail.trim() !== "" && (
                  <div className="relative w-full md:w-64 h-48 md:h-full shrink-0 bg-muted overflow-hidden">
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
