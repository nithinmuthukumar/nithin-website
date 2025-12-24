"use client";

import { useEffect, useState, useRef } from "react";
import { type Heading } from "@/lib/toc";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { List, X } from "lucide-react";

interface TableOfContentsProps {
  headings: Heading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

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
      },
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

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
    }
  };

  if (headings.length === 0) {
    return null;
  }

  const renderHeadingButtons = () =>
    headings.map((heading) => {
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
            indentClass,
          )}
        >
          {heading.text}
        </button>
      );
    });

  return (
    <>
      <Button
        size="icon"
        className="fixed top-24 right-6 lg:right-10 z-40 h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all bg-background/90 backdrop-blur border"
        aria-label="Toggle table of contents"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <List className="h-5 w-5" />}
      </Button>

      {isOpen && (
        <div
          ref={panelRef}
          className="fixed top-36 right-4 lg:right-10 z-50 w-[min(90vw,20rem)] max-h-[70vh] overflow-y-auto rounded-2xl border border-border bg-background/95 backdrop-blur shadow-2xl p-4 space-y-3"
        >
          <p className="font-semibold mb-2">Table of Contents</p>
          <div className="space-y-1">{renderHeadingButtons()}</div>
        </div>
      )}
    </>
  );
}
