"use client";

import { cn } from "@/lib/utils";

interface CardImageProps {
  name: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-24",
  md: "w-32",
  lg: "w-48",
};

export function CardImage({ name, className, size = "md" }: CardImageProps) {
  const scryfallUrl = `https://scryfall.com/search?q=${encodeURIComponent(name)}`;
  const cardImageUrl = `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}&format=image&version=normal`;

  return (
    <a href={scryfallUrl} target="_blank" rel="noopener noreferrer">
      <img
        src={cardImageUrl}
        alt={name}
        className={cn(
          "rounded-lg shadow-md hover:shadow-lg transition-shadow",
          sizeClasses[size],
          className
        )}
      />
    </a>
  );
}
