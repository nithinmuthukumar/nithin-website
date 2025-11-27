import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface DecklistCardProps {
  url?: string;
  children: React.ReactNode;
}

export function DecklistCard({ url, children }: DecklistCardProps) {
  return (
    <Card className="my-8 border-2 shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="bg-muted/30">
        <CardTitle className="text-2xl flex items-center gap-2">
          Decklist
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-2 font-medium transition-all hover:gap-3"
          >
            View on Moxfield
            <ExternalLink className="w-4 h-4" />
          </a>
        )}
        <div className="overflow-hidden rounded-lg">
          {children}
        </div>
      </CardContent>
    </Card>
  );
}

