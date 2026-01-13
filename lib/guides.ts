import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { extractHeadings, type Heading } from "./toc";

const guidesDirectory = path.join(process.cwd(), "content", "guides");

export interface Guide {
  slug: string;
  title: string;
  date: string;
  lastUpdated?: string;
  excerpt?: string;
  thumbnail?: string;
  content: string;
  headings?: Heading[];
  deck?: string; // deck name this guide is for
}

export function getGuideSlugs(): string[] {
  if (!fs.existsSync(guidesDirectory)) {
    return [];
  }
  return fs
    .readdirSync(guidesDirectory)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getGuideBySlug(slug: string): Guide | null {
  const fullPath = path.join(guidesDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const headings = extractHeadings(content);

  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    lastUpdated: data.lastUpdated || "",
    excerpt: data.excerpt || "",
    thumbnail: data.thumbnail || "",
    content,
    headings,
    deck: data.deck || "",
  };
}

export function getAllGuides(): Guide[] {
  const slugs = getGuideSlugs();
  const guides = slugs
    .map((slug) => getGuideBySlug(slug))
    .filter((guide): guide is Guide => guide !== null)
    .sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else {
        return -1;
      }
    });

  return guides;
}
