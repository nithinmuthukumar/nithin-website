import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Layers, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Home | Nithin Muthukumar - Magic: The Gathering Blog",
  description: "Standard player. Brewer. Deck tuner. Explore deck guides, meta analysis, and brewing insights for competitive Standard play.",
};

export default function HomePage() {

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Nithin Muthukumar
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
        
        </p>
      </section>

      {/* Blog CTA Section */}
      <section className="mb-16">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-3xl mb-4">Explore the Blog</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-7">
            Posts about deck guides, meta analysis, brewing insights, and the process of refining decks for competitive Standard play.
            </p>
            <div className="flex gap-4 justify-center mt-4">
              <Button asChild size="lg">
                <Link href="/blog">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read the Blog
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/decks">
                  <Layers className="w-4 h-4 mr-2" />
                  View Decks
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* About Section */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-7 mb-4">
              I&apos;m a Magic player focused on Standard, with a particular love for brewing around build-around cards and refining those decks into competitive lists.
            </p>
            <p className="text-muted-foreground leading-7">
              On my blog, I share my decklists, guides, and insights on the Standard meta and brewing. Hoping to add a lot more in the near future.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
