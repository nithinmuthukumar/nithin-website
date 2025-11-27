import React from "react";

interface CardNameProps {
  children: React.ReactNode;
}

export function CardName({ children }: CardNameProps) {
  // Extract card name text from children
  const cardName = typeof children === "string" 
    ? children 
    : React.Children.toArray(children).join("");

  // Generate Scryfall search URL
  const scryfallUrl = `https://scryfall.com/search?q=${encodeURIComponent(cardName)}`;

  return (
    <a
      href={scryfallUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors font-medium"
    >
      {children}
    </a>
  );
}

