"use client";

import { cn } from "@/lib/utils";
import { CardImage } from "./CardImage";

interface SideboardCard {
  name: string;
  count: number;
  note?: string;
}

interface ConditionalSideboard {
  condition: string;
  cardsIn: SideboardCard[];
  cardsOut: SideboardCard[];
}

interface SideboardGuideProps {
  cardsIn: SideboardCard[];
  cardsOut: SideboardCard[];
  onTheDrawIn?: SideboardCard[];
  onTheDrawOut?: SideboardCard[];
  mainIdeas?: string[];
  conditional?: ConditionalSideboard[];
}

function CardRow({ card, type }: { card: SideboardCard; type: "in" | "out" }) {
  return (
    <div className="flex items-center gap-3 py-2 group">
      <CardImage name={card.name} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "text-xs font-medium px-1.5 py-0.5 rounded",
              type === "in"
                ? "bg-green-500/20 text-green-700 dark:text-green-400"
                : "bg-red-500/20 text-red-700 dark:text-red-400",
            )}
          >
            {type === "in" ? "+" : "-"}
            {card.count}
          </span>
          <span className="font-medium text-sm">{card.name}</span>
        </div>
        {card.note && (
          <p className="text-xs text-muted-foreground mt-1">{card.note}</p>
        )}
      </div>
    </div>
  );
}

function SideboardTable({
  cardsIn,
  cardsOut,
  inHeader,
  outHeader,
  inHeaderClass,
  outHeaderClass,
}: {
  cardsIn: SideboardCard[];
  cardsOut: SideboardCard[];
  inHeader: string;
  outHeader: string;
  inHeaderClass: string;
  outHeaderClass: string;
}) {
  const totalIn = cardsIn.reduce((sum, card) => sum + card.count, 0);
  const totalOut = cardsOut.reduce((sum, card) => sum + card.count, 0);

  return (
    <div className="grid grid-cols-2 divide-x">
      <div>
        <div className={cn("px-4 py-2 border-b", inHeaderClass)}>
          <h4 className="font-semibold text-sm">
            {inHeader} ({totalIn})
          </h4>
        </div>
        <div className="px-4 py-2 divide-y">
          {cardsIn.map((card, i) => (
            <CardRow key={i} card={card} type="in" />
          ))}
        </div>
      </div>
      <div>
        <div className={cn("px-4 py-2 border-b", outHeaderClass)}>
          <h4 className="font-semibold text-sm">
            {outHeader} ({totalOut})
          </h4>
        </div>
        <div className="px-4 py-2 divide-y">
          {cardsOut.map((card, i) => (
            <CardRow key={i} card={card} type="out" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function SideboardGuide({
  cardsIn,
  cardsOut,
  onTheDrawIn,
  onTheDrawOut,
  mainIdeas,
  conditional,
}: SideboardGuideProps) {
  const hasOnTheDraw =
    (onTheDrawIn && onTheDrawIn.length > 0) ||
    (onTheDrawOut && onTheDrawOut.length > 0);

  return (
    <div className="my-4 space-y-3">
      {mainIdeas && mainIdeas.length > 0 && (
        <div className="rounded-lg border bg-muted/30 p-4">
          <h4 className="font-semibold text-sm mb-2">Main Ideas</h4>
          <ul className="space-y-1.5 text-sm text-foreground/90">
            {mainIdeas.map((idea, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span>{idea}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="rounded-lg border bg-card overflow-hidden">
        <SideboardTable
          cardsIn={cardsIn}
          cardsOut={cardsOut}
          inHeader="Sideboard In"
          outHeader="Sideboard Out"
          inHeaderClass="bg-green-500/10 text-green-700 dark:text-green-400"
          outHeaderClass="bg-red-500/10 text-red-700 dark:text-red-400"
        />
      </div>

      {hasOnTheDraw && (
        <div className="rounded-lg border bg-card overflow-hidden">
          <SideboardTable
            cardsIn={onTheDrawIn || []}
            cardsOut={onTheDrawOut || []}
            inHeader="On The Draw - In"
            outHeader="On The Draw - Out"
            inHeaderClass="bg-blue-500/10 text-blue-700 dark:text-blue-400"
            outHeaderClass="bg-blue-500/10 text-blue-700 dark:text-blue-400"
          />
        </div>
      )}

      {conditional && conditional.length > 0 && (
        <div className="space-y-3">
          {conditional.map((cond, i) => (
            <div key={i} className="rounded-lg border bg-card overflow-hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-b">
                <h4 className="font-semibold text-sm text-foreground">
                  {cond.condition}
                </h4>
              </div>
              <SideboardTable
                cardsIn={cond.cardsIn}
                cardsOut={cond.cardsOut}
                inHeader="In"
                outHeader="Out"
                inHeaderClass="bg-green-500/10 text-green-700 dark:text-green-400"
                outHeaderClass="bg-red-500/10 text-red-700 dark:text-red-400"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
