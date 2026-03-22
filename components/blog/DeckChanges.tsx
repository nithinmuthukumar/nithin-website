"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CardEntry {
  name: string;
  count?: number;
}

interface ChangeSection {
  title: string;
  added: CardEntry[];
  removed: CardEntry[];
}

interface DeckChangesProps {
  sections: ChangeSection[];
}

function CardChangeItem({
  name,
  count,
  variant,
}: {
  name: string;
  count?: number;
  variant: "added" | "removed";
}) {
  const [error, setError] = useState(false);
  const scryfallUrl = `https://scryfall.com/search?q=${encodeURIComponent(name)}`;
  const imageUrl = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}&format=image&version=small`;

  return (
    <a
      href={scryfallUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex-shrink-0 group"
      title={`${count && count > 1 ? `${count}x ` : ""}${name}`}
    >
      <div
        className={cn(
          "relative rounded-lg overflow-hidden ring-2",
          variant === "added"
            ? "ring-green-400 dark:ring-green-500"
            : "ring-red-400 dark:ring-red-500",
        )}
      >
        {!error ? (
          <img
            src={imageUrl}
            alt={name}
            onError={() => setError(true)}
            className="w-20 h-auto block"
          />
        ) : (
          <div className="w-20 h-[112px] bg-muted rounded-lg flex items-center justify-center p-1">
            <span className="text-xs text-center text-muted-foreground leading-tight">
              {name}
            </span>
          </div>
        )}
        {count && count > 1 && (
          <div
            className={cn(
              "absolute top-1 right-1 w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center text-white shadow",
              variant === "added" ? "bg-green-500" : "bg-red-500",
            )}
          >
            {count}
          </div>
        )}
      </div>
    </a>
  );
}

export function DeckChanges({ sections }: DeckChangesProps) {
  return (
    <div className="space-y-6 my-6">
      {sections.map((section, index) => (
        <div key={index}>
          <h4 className="font-bold text-lg mb-3">{section.title}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/30 p-4 rounded">
              <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3 text-sm uppercase tracking-wide">
                + Added
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.added.map((card, i) => (
                  <CardChangeItem
                    key={i}
                    name={card.name}
                    count={card.count}
                    variant="added"
                  />
                ))}
              </div>
            </div>

            <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 p-4 rounded">
              <h3 className="font-semibold text-red-700 dark:text-red-400 mb-3 text-sm uppercase tracking-wide">
                − Removed
              </h3>
              <div className="flex flex-wrap gap-2">
                {section.removed.map((card, i) => (
                  <CardChangeItem
                    key={i}
                    name={card.name}
                    count={card.count}
                    variant="removed"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
