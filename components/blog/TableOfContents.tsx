"use client";

import { useEffect, useState } from "react";
import { type Heading } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { List } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -35% 0%",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
      setIsOpen(false); // Close sheet after clicking
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          size="icon"
          className="fixed top-20 right-6 z-50 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all"
          aria-label="Open table of contents"
        >
          <List className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80 sm:max-w-sm overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Table of Contents</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-1">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            const indentClass =
              heading.level === 2
                ? "ml-0"
                : heading.level === 3
                ? "ml-4"
                : heading.level === 4
                ? "ml-8"
                : "ml-0";

            return (
              <button
                key={heading.id}
                onClick={() => handleClick(heading.id)}
                className={cn(
                  "block w-full text-left text-sm py-2 px-3 rounded-md transition-colors",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground",
                  indentClass
                )}
              >
                {heading.text}
              </button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}

