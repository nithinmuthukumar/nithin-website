"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, Check } from "lucide-react";
import { FaDiscord } from "react-icons/fa";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/decks", label: "Decks" },
  { href: "/tools", label: "Tools" },
];

export function Navigation() {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("Nithin#72660");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 py-4 max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-xl font-bold hover:text-primary transition-colors"
            >
              Nithin Muthukumar
            </Link>
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    pathname === item.href
                      ? "text-foreground"
                      : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="inline-flex items-center gap-2"
              title="Add me on Arena!"
            >
              {copied ? (
                <>
                  Copied!
                  <Check className="w-3 h-3" />
                </>
              ) : (
                "Nithin#72660"
              )}
            </Button>
            <Button asChild variant="outline" size="sm">
              <a
                href="https://moxfield.com/users/Nithin"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Moxfield
                <ExternalLink className="w-3 h-3" />
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a
                href="https://discord.gg/ZT7xTtDTMe"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                title="Discord"
              >
                <FaDiscord className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
        {/* Mobile menu */}
        <div className="md:hidden mt-4 flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
