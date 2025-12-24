"use client";

import { ReactNode, useState, Children, isValidElement } from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardImage } from "./CardImage";

type AccentColor =
  | "green"
  | "black"
  | "blue"
  | "red"
  | "white"
  | "gold"
  | "colorless";

const accentStyles: Record<
  AccentColor,
  { bar: string; badge: string; border: string }
> = {
  green: {
    bar: "bg-green-500",
    badge: "bg-green-500/20 text-green-700 dark:text-green-400",
    border: "border-green-500/30",
  },
  black: {
    bar: "bg-violet-500",
    badge: "bg-violet-500/20 text-violet-700 dark:text-violet-400",
    border: "border-violet-500/30",
  },
  blue: {
    bar: "bg-blue-500",
    badge: "bg-blue-500/20 text-blue-700 dark:text-blue-400",
    border: "border-blue-500/30",
  },
  red: {
    bar: "bg-red-500",
    badge: "bg-red-500/20 text-red-700 dark:text-red-400",
    border: "border-red-500/30",
  },
  white: {
    bar: "bg-amber-200",
    badge: "bg-amber-200/20 text-amber-700 dark:text-amber-400",
    border: "border-amber-200/30",
  },
  gold: {
    bar: "bg-amber-500",
    badge: "bg-amber-500/20 text-amber-700 dark:text-amber-400",
    border: "border-amber-500/30",
  },
  colorless: {
    bar: "bg-gray-400",
    badge: "bg-gray-400/20 text-gray-700 dark:text-gray-400",
    border: "border-gray-400/30",
  },
};

// Slot components for named sections
interface SlotProps {
  slot: "info" | "sideout" | "tips";
  children: ReactNode;
}

export function Slot({ children }: SlotProps) {
  return <>{children}</>;
}

interface CardInfoProps {
  name: string;
  count?: number;
  accent?: AccentColor;
  children?: ReactNode;
}

export function CardInfo({
  name,
  count,
  accent = "green",
  children,
}: CardInfoProps) {
  const styles = accentStyles[accent];

  // Generate Scryfall URL
  const scryfallUrl = `https://scryfall.com/search?q=${encodeURIComponent(name)}`;

  // Extract named slots from children
  let infoContent: ReactNode = null;
  let sideOutContent: ReactNode = null;
  let tipsContent: ReactNode = null;
  let otherContent: ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && child.props.slot) {
      const slot = child.props.slot;
      if (slot === "info") {
        infoContent = child.props.children;
      } else if (slot === "sideout") {
        sideOutContent = child.props.children;
      } else if (slot === "tips") {
        tipsContent = child.props.children;
      } else {
        otherContent.push(child);
      }
    } else if (child) {
      otherContent.push(child);
    }
  });

  const hasContent =
    infoContent || sideOutContent || tipsContent || otherContent.length > 0;

  // Determine available tabs and default
  const availableTabs: string[] = [];
  if (infoContent) availableTabs.push("info");
  if (sideOutContent) availableTabs.push("sideOut");
  if (tipsContent) availableTabs.push("tips");

  const defaultTab = availableTabs[0] || "info";
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div
      className={cn(
        "relative my-2 rounded-lg border bg-card px-3 py-2 transition-colors",
        styles.border,
      )}
    >
      <div className="flex items-center gap-2">
        <a
          href={scryfallUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
        >
          {name}
        </a>

        {count && (
          <span
            className={cn(
              "rounded-md px-1.5 py-0.5 text-xs font-medium",
              styles.badge,
            )}
          >
            x{count}
          </span>
        )}
      </div>

      <div className="mt-3 flex gap-4">
        {/* Card Image */}
        <div className="flex-shrink-0">
          <CardImage name={name} size="md" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {availableTabs.length > 0 && (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="h-8">
                {infoContent && (
                  <TabsTrigger value="info" className="text-xs px-2.5 py-1">
                    Info
                  </TabsTrigger>
                )}
                {sideOutContent && (
                  <TabsTrigger value="sideOut" className="text-xs px-2.5 py-1">
                    Sideboarding
                  </TabsTrigger>
                )}
                {tipsContent && (
                  <TabsTrigger value="tips" className="text-xs px-2.5 py-1">
                    Tips & Tricks
                  </TabsTrigger>
                )}
              </TabsList>

              <div className="relative mt-2">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {activeTab === "info" && infoContent}
                  {activeTab === "sideOut" && sideOutContent}
                  {activeTab === "tips" && tipsContent}
                </div>
              </div>
            </Tabs>
          )}

          {otherContent.length > 0 && (
            <div className="prose prose-sm dark:prose-invert max-w-none mt-2">
              {otherContent}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
