import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ExternalLink } from "lucide-react";
import { DecklistCard } from "@/components/blog/DecklistCard";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { CardName } from "@/components/blog/CardName";
import { CardImage } from "@/components/blog/CardImage";
import { DeckChanges } from "@/components/blog/DeckChanges";
import { MatchupTable } from "@/components/blog/MatchupTable";
import { SideboardGuide } from "@/components/blog/SideboardGuide";
import { MatchupRating } from "@/components/blog/MatchupRating";
import { Aside } from "@/components/blog/Aside";
import { slugify } from "@/lib/toc";

export function getMDXComponents(
  components: Record<string, React.ComponentType<any>> = {},
): Record<string, React.ComponentType<any>> {
  return {
    // Reusable components
    DecklistCard: ({
      url,
      children,
    }: {
      url?: string;
      children?: React.ReactNode;
    }) => <DecklistCard url={url}>{children}</DecklistCard>,
    CardName: ({ children }: { children?: React.ReactNode }) => (
      <CardName>{children}</CardName>
    ),
    CardImage: ({
      name,
      size,
      className,
      children,
    }: {
      name?: string;
      size?: "sm" | "md" | "lg";
      className?: string;
      children?: React.ReactNode;
    }) => (
      <CardImage name={name} size={size} className={className}>
        {children}
      </CardImage>
    ),
    DeckChanges: ({ sections }: { sections?: any[] }) => (
      <DeckChanges sections={sections || []} />
    ),
    MatchupTable: ({ matchups }: { matchups?: any[] }) => (
      <MatchupTable matchups={matchups || []} />
    ),
    SideboardGuide: ({
      cardsIn,
      cardsOut,
      onTheDrawIn,
      onTheDrawOut,
      mainIdeas,
      conditional,
    }: {
      cardsIn: { name: string; count: number; note?: string }[];
      cardsOut: { name: string; count: number; note?: string }[];
      onTheDrawIn?: { name: string; count: number; note?: string }[];
      onTheDrawOut?: { name: string; count: number; note?: string }[];
      mainIdeas?: string[];
      conditional?: {
        condition: string;
        cardsIn: { name: string; count: number; note?: string }[];
        cardsOut: { name: string; count: number; note?: string }[];
      }[];
    }) => (
      <SideboardGuide
        cardsIn={cardsIn || []}
        cardsOut={cardsOut || []}
        onTheDrawIn={onTheDrawIn}
        onTheDrawOut={onTheDrawOut}
        mainIdeas={mainIdeas}
        conditional={conditional}
      />
    ),
    Aside: ({ children }: { children?: React.ReactNode }) => (
      <Aside>{children}</Aside>
    ),
    MatchupRating: ({
      rating,
    }: {
      rating:
        | "Very Favorable"
        | "Favorable"
        | "Even"
        | "Unfavorable"
        | "Very Unfavorable";
    }) => <MatchupRating rating={rating} />,
    Card: ({ children, ...props }: any) => (
      <Card className="my-8" {...props}>
        {children}
      </Card>
    ),
    CardHeader: ({ children, ...props }: any) => (
      <CardHeader {...props}>{children}</CardHeader>
    ),
    CardTitle: ({ children, ...props }: any) => (
      <CardTitle {...props}>{children}</CardTitle>
    ),
    CardContent: ({ children, ...props }: any) => (
      <CardContent {...props}>{children}</CardContent>
    ),
    ExternalLink: (props: any) => (
      <ExternalLink className="w-4 h-4" {...props} />
    ),

    // Typography - Enhanced headings with better spacing and hierarchy
    h1: ({ children }: { children?: React.ReactNode }) => {
      const text =
        typeof children === "string"
          ? children
          : React.Children.toArray(children).join("");
      const id = slugify(text);
      return (
        <h1
          id={id}
          className="text-5xl font-bold mt-12 mb-6 leading-tight tracking-tight text-foreground scroll-mt-20"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children }: { children?: React.ReactNode }) => {
      const text =
        typeof children === "string"
          ? children
          : React.Children.toArray(children).join("");
      const id = slugify(text);
      return (
        <>
          <Separator className="my-8" />
          <h2
            id={id}
            className="text-4xl font-semibold mt-10 mb-4 leading-tight text-foreground scroll-mt-20"
          >
            {children}
          </h2>
        </>
      );
    },
    h3: ({ children }: { children?: React.ReactNode }) => {
      const text =
        typeof children === "string"
          ? children
          : React.Children.toArray(children).join("");
      const id = slugify(text);
      return (
        <h3
          id={id}
          className="text-3xl font-semibold mt-8 mb-3 leading-snug text-foreground scroll-mt-20"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children }: { children?: React.ReactNode }) => {
      const text =
        typeof children === "string"
          ? children
          : React.Children.toArray(children).join("");
      const id = slugify(text);
      return (
        <h4
          id={id}
          className="text-2xl font-semibold mt-6 mb-2 leading-snug text-foreground scroll-mt-20"
        >
          {children}
        </h4>
      );
    },

    // Enhanced paragraphs with better line height and spacing
    p: ({ children }: { children?: React.ReactNode }) => {
      return (
        <p className="mb-6 leading-7 text-foreground/90 text-base">
          {children}
        </p>
      );
    },

    // Improved lists with better indentation and spacing
    ul: ({ children }) => (
      <ul className="list-disc list-outside mb-6 space-y-3 ml-6 text-foreground/90">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-outside mb-6 space-y-3 ml-6 text-foreground/90">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="leading-7 pl-2">{children}</li>,

    // Enhanced code blocks
    code: ({
      children,
      className,
    }: {
      children?: React.ReactNode;
      className?: string;
    }) => {
      const isInline = !className || !className.includes("language-");
      if (isInline) {
        return (
          <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono text-foreground">
            {children}
          </code>
        );
      }
      return <CodeBlock className={className}>{children}</CodeBlock>;
    },
    pre: ({ children }: { children?: React.ReactNode }) => {
      // Pre is handled by code component, just pass through
      return <>{children}</>;
    },

    // Enhanced blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary bg-muted/30 pl-6 pr-4 py-4 my-6 italic text-foreground/80 rounded-r-lg">
        {children}
      </blockquote>
    ),

    // Enhanced links
    a: ({ href, children }) => (
      <a
        href={href}
        className="text-primary hover:text-primary/80 underline underline-offset-4 transition-colors font-medium"
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),

    // Enhanced images with better styling
    // Use span wrapper (valid inside paragraphs) with display: block
    img: ({
      src,
      alt,
      ...props
    }: {
      src?: string;
      alt?: string;
      [key: string]: any;
    }) => {
      if (!src) return null;
      return (
        <span className="block my-8 rounded-lg overflow-hidden shadow-lg border border-border hover:shadow-xl transition-shadow duration-300">
          <img src={src} alt={alt || ""} className="w-full h-auto" {...props} />
          {alt && (
            <span className="block text-sm text-muted-foreground text-center py-2 px-4 bg-muted/30">
              {alt}
            </span>
          )}
        </span>
      );
    },

    // Horizontal rule as separator
    hr: () => <Separator className="my-8" />,

    ...components,
  };
}
