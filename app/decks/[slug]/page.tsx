import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGuideBySlug, getAllGuides } from "@/lib/guides";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/components/mdx-components";
import { BlogHeader } from "@/components/blog/BlogHeader";
import { TableOfContents } from "@/components/blog/TableOfContents";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { CardInfo, Slot } from "@/components/blog/CardInfo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {};
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://nithinmuthukumar.com";
  const thumbnailUrl = guide.thumbnail
    ? guide.thumbnail.startsWith("http")
      ? guide.thumbnail
      : `${baseUrl}${guide.thumbnail}`
    : undefined;

  return {
    title: `${guide.title} | Nithin Muthukumar`,
    description:
      guide.excerpt || "Magic: The Gathering deck guide and analysis",
    openGraph: {
      title: guide.title,
      description: guide.excerpt || "",
      type: "article",
      publishedTime: guide.date,
      ...(thumbnailUrl && {
        images: [thumbnailUrl],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.excerpt || "",
      ...(thumbnailUrl && {
        images: [thumbnailUrl],
      }),
    },
  };
}

export default async function DeckGuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const components = getMDXComponents({
    CardInfo,
    Slot,
  });
  // Filter out h1 headings (title) and only show h2, h3, h4
  const tocHeadings = guide.headings?.filter((h) => h.level >= 2) || [];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Button asChild variant="ghost" className="mb-8 -ml-4">
        <Link href="/decks" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Decks
        </Link>
      </Button>
      <article>
        <BlogHeader
          title={guide.title}
          date={guide.date}
          excerpt={guide.excerpt}
        />
        <div className="space-y-6">
          <MDXRemote source={guide.content} components={components as any} />
        </div>
        <TableOfContents headings={tocHeadings} />
      </article>
    </div>
  );
}
