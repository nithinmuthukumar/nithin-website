import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getGuideBySlug, getAllGuides } from "@/lib/guides";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getMDXComponents } from "@/components/mdx-components";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} | Nithin Muthukumar`,
    description: guide.excerpt,
  };
}

export default async function MatrixPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) notFound();

  const components = getMDXComponents();

  return (
    <div className="container mx-auto px-6 py-12 max-w-screen-2xl">
      <h1 className="text-2xl font-bold mb-8">{guide.title}</h1>
      <MDXRemote source={guide.content} components={components as any} options={{ blockJS: false }} />
    </div>
  );
}
