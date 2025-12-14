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

export const metadata: Metadata = {
  title: "Blog | Nithin Muthukumar",
  description:
    "Magic: The Gathering deck guides, meta analysis, and brewing insights for Standard format.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
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
