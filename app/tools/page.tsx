import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface Tool {
  name: string;
  description: string;
  url: string;
}

const tools: Tool[] = [
  {
    name: "DeckPic",
    description:
      "Generate deck images for your Magic: The Gathering decklists, with customizable layouts.",
    url: "https://deckpic.nithinmuthukumar.com",
  },
  {
    name: "RaiseHell",
    description:
      "A custom Discord bot for the Izzet Hellraiser community. Calculate Hellraiser probabilities, simulate triggers, and compute hit chances.",
    url: "https://github.com/nithinmuthukumar/raisehell",
  },
];

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Tools</h1>
        <p className="text-muted-foreground text-lg">
          A collection of useful tools I&apos;ve built.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool, index) => (
          <a
            key={index}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Card className="h-full transition-all hover:shadow-lg hover:border-primary cursor-pointer">
              <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between">
                  {tool.name}
                  <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
}
