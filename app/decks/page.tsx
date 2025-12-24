import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen } from "lucide-react";
import { getAllGuides } from "@/lib/guides";
import Link from "next/link";

interface Deck {
  name: string;
  format: string;
  description: string;
  moxfieldUrl?: string;
  guideUrl?: string;
  colorIdentity: string[];
}

// Sample deck data - can be replaced with API calls or a database later
const decks: Deck[] = [
  {
    name: "Golgari Airship",
    format: "Standard",
    description:
      "A grindy midrange deck built around Phoenix Fleet Airship as an extremely resilient, inevitable top-end.",
    moxfieldUrl: "https://moxfield.com/decks/yF298oBNK0-MGUNeDa_vlQ",
    colorIdentity: ["G", "B"],
  },
  {
    name: "Izzet Hellraiser",
    format: "Standard - (Rotated)",
    description:
      "A control-combo deck built around Capricious Hellraiser copying Season of Weaving",
    moxfieldUrl: "https://moxfield.com/decks/B4DgzUfDFkicJe0IhnbTrg",
    guideUrl:
      "https://docs.google.com/document/d/1m2mwR3i1w8b_aD7Jt9NH1upkFopgXrV6_0apXcuXCOE/edit?tab=t.0#heading=h.4k5w91ywcgeq",
    colorIdentity: ["U", "R"],
  },
  {
    name: "Izzet Overload",
    format: "Standard - (Rotated)",
    description:
      "A control-combo deck built around making a giant weird token with Experimental Overload and flinging it at the opponent",
    moxfieldUrl: "https://moxfield.com/decks/4kGOuvfaGUKRnj5g5EoFJA",
    colorIdentity: ["U", "R"],
  },
];

const colorMap: Record<string, string> = {
  W: "bg-yellow-400",
  U: "bg-blue-500",
  B: "bg-black",
  R: "bg-red-600",
  G: "bg-green-600",
};

export default function DecksPage() {
  const guides = getAllGuides();

  // Create a map of deck name to guide slug
  const guideMap = new Map(guides.map((guide) => [guide.deck, guide.slug]));

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Deck Gallery</h1>
        <p className="text-muted-foreground text-lg mb-6">
          All my brews can be found on Moxfield.
        </p>
        <Button asChild>
          <a
            href="https://moxfield.com/users/Nithin"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2"
          >
            Moxfield
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {decks.map((deck, index) => (
          <Card key={index} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-xl">{deck.name}</CardTitle>
                <div className="flex gap-1">
                  {deck.colorIdentity.map((color) => (
                    <div
                      key={color}
                      className={`w-4 h-4 rounded-full ${colorMap[color] || "bg-gray-400"} border border-border`}
                      title={color}
                    />
                  ))}
                </div>
              </div>
              <CardDescription>{deck.format}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <p className="text-muted-foreground mb-4 flex-1">
                {deck.description}
              </p>
              <div className="flex gap-2">
                {(guideMap.has(deck.name) || deck.guideUrl) && (
                  <Button asChild variant="default" size="sm">
                    {deck.guideUrl ? (
                      <a
                        href={deck.guideUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        View Guide
                        <BookOpen className="w-3 h-3" />
                      </a>
                    ) : (
                      <Link
                        href={`/decks/${guideMap.get(deck.name)}`}
                        className="inline-flex items-center gap-2"
                      >
                        View Guide
                        <BookOpen className="w-3 h-3" />
                      </Link>
                    )}
                  </Button>
                )}
                {deck.moxfieldUrl ? (
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={deck.moxfieldUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      Moxfield
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                ) : (
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
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
