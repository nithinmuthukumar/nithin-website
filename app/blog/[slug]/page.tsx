import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPostBySlug, getAllPosts } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/components/mdx-components";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import { TableOfContents } from "@/components/blog/TableOfContents";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  
  if (!post) {
    return {};
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://nithinmuthukumar.com";
  const thumbnailUrl = post.thumbnail 
    ? (post.thumbnail.startsWith("http") ? post.thumbnail : `${baseUrl}${post.thumbnail}`)
    : undefined;

  return {
    title: `${post.title} | Nithin Muthukumar`,
    description: post.excerpt || "Magic: The Gathering deck guide and analysis",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      publishedTime: post.date,
      ...(thumbnailUrl && {
        images: [thumbnailUrl],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      ...(thumbnailUrl && {
        images: [thumbnailUrl],
      }),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const components = getMDXComponents();
  const tocHeadings = post.headings?.filter((h) => h.level >= 2) || [];
  const plainText = post.content.replace(/<[^>]+>/g, " ").replace(/[{}[\]]/g, " ");
  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;

  return (
    <BlogPostLayout>
      <BlogHeader title={post.title} date={post.date} excerpt={post.excerpt} wordCount={wordCount} />
      <div className="space-y-6">
        <MDXRemote source={post.content} components={components as any} options={{ blockJS: false }} />
      </div>
      <TableOfContents headings={tocHeadings} />
    </BlogPostLayout>
  );
}

