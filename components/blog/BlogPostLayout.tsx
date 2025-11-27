import { ReactNode } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BlogPostLayoutProps {
  children: ReactNode;
}

export function BlogPostLayout({ children }: BlogPostLayoutProps) {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button asChild variant="ghost" className="mb-8 -ml-4">
        <Link href="/blog" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </Button>
      <article>
        {children}
      </article>
    </div>
  );
}

