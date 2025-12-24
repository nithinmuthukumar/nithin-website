"use client";

import React, { useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

interface CardNameProps {
  children: React.ReactNode;
}

export function CardName({ children }: CardNameProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Extract card name text from children
  const cardName =
    typeof children === "string"
      ? children
      : React.Children.toArray(children).join("");

  // Generate Scryfall URLs
  const scryfallUrl = `https://scryfall.com/search?q=${encodeURIComponent(cardName)}`;
  const cardImageUrl = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}&format=image&version=normal`;

  return (
    <HoverCard openDelay={300} closeDelay={100}>
      <HoverCardTrigger asChild>
        <a
          href={scryfallUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors font-medium"
        >
          {children}
        </a>
      </HoverCardTrigger>

      <HoverCardContent
        side="top"
        align="center"
        sideOffset={8}
        className="w-auto p-0 border-0 bg-transparent shadow-2xl"
      >
        {!imageError ? (
          <div className="relative">
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="w-[244px] h-[340px] bg-muted animate-pulse rounded-lg" />
            )}

            {/* Card image */}
            <img
              src={cardImageUrl}
              alt={cardName}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={cn(
                "rounded-lg shadow-xl transition-opacity duration-200",
                imageLoaded ? "opacity-100" : "opacity-0 absolute inset-0",
              )}
              style={{ width: "244px", height: "auto" }}
            />
          </div>
        ) : (
          // Error fallback
          <div className="w-[200px] px-4 py-3 bg-muted/90 backdrop-blur rounded-lg border border-border">
            <p className="text-sm font-medium text-foreground">{cardName}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Preview unavailable
            </p>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
