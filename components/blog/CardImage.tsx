"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface CardImageProps {
  name?: string;
  children?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-24",
  md: "w-32",
  lg: "w-48",
};

export function CardImage({
  name,
  children,
  className,
  size = "md",
}: CardImageProps) {
  // Support both name prop and children syntax
  const cardName = name || (typeof children === "string" ? children : "");

  if (!cardName) {
    return null;
  }

  const scryfallUrl = `https://scryfall.com/search?q=${encodeURIComponent(cardName)}`;
  const cardImageUrl = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}&format=image&version=normal`;

  return (
    <a href={scryfallUrl} target="_blank" rel="noopener noreferrer">
      <img
        src={cardImageUrl}
        alt={cardName}
        className={cn(
          "rounded-lg shadow-md hover:shadow-lg transition-shadow",
          sizeClasses[size],
          className,
        )}
      />
    </a>
  );
}
