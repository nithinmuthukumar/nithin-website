"use client";

import React, { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardName } from "@/components/blog/CardName";

interface MatchupRow {
  name: string;
  link?: string;
  colors: string[];
  in: Partial<Record<string, number>>;
  out: Partial<Record<string, number>>;
  notes?: string;
}

interface CardEntry {
  name: string;
  count: number;
}

export interface SideboardMatrixProps {
  sideboardCards: CardEntry[];
  maindeckCards: CardEntry[];
  matchups: MatchupRow[];
}

function ManaPip({ color }: { color: string }) {
  return (
    <img
      src={`https://svgs.scryfall.io/card-symbols/${color}.svg`}
      alt={color}
      title={color}
      width={16}
      height={16}
      style={{ display: "inline-block", flexShrink: 0 }}
    />
  );
}

function buildPrintHTML(
  sideboardCards: CardEntry[],
  maindeckCards: CardEntry[],
  matchups: MatchupRow[],
): string {
  const pipHtml = (colors: string[]) =>
    colors
      .map(
        (c) =>
          `<img src="https://svgs.scryfall.io/card-symbols/${c}.svg" width="14" height="14" style="display:inline-block;" />`,
      )
      .join(" ");

  const thStyle = `style="border:1px solid #ccc;padding:4px 6px;font-size:11px;font-weight:600;background:#f5f5f5;"`;
  const tdStyle = `style="border:1px solid #ccc;padding:4px 6px;font-size:11px;"`;
  const tdCenterStyle = `style="border:1px solid #ccc;padding:4px 6px;font-size:11px;text-align:center;"`;

  const verticalTh = (m: MatchupRow) =>
    `<th ${thStyle}><div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;height:120px;padding-bottom:4px;gap:4px;"><div style="writing-mode:vertical-rl;transform:rotate(180deg);white-space:nowrap;overflow:hidden;max-height:100px;font-size:11px;">${m.name}</div><div style="display:flex;gap:2px;">${pipHtml(m.colors)}</div></div></th>`;

  const cell = (count: number | undefined, color: string) =>
    `<td ${tdCenterStyle}>${count ? `<span style="font-weight:700;color:${color};">${count}</span>` : `<span style="color:#ccc;">—</span>`}</td>`;

  const groupHeader = (
    label: string,
    cols: number,
    bg: string,
    color: string,
  ) =>
    `<tr><td colspan="${cols}" style="border:1px solid #ccc;padding:3px 6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;background:${bg};color:${color};">${label}</td></tr>`;

  const totalCols = matchups.length + 1;

  const rows = [
    `<tr><th ${thStyle}>Card</th>${matchups.map((m) => verticalTh(m)).join("")}</tr>`,
    groupHeader("In", totalCols, "#f0fdf4", "#166534"),
    ...sideboardCards.map(
      (card) =>
        `<tr><td ${tdStyle}><span style="font-size:10px;color:#888;margin-right:6px;">${card.count}</span>${card.name}</td>${matchups.map((m) => cell(m.in?.[card.name], "#166534")).join("")}</tr>`,
    ),
    groupHeader("Out", totalCols, "#fef2f2", "#991b1b"),
    ...maindeckCards.map(
      (card) =>
        `<tr><td ${tdStyle}><span style="font-size:10px;color:#888;margin-right:6px;">${card.count}</span>${card.name}</td>${matchups.map((m) => cell(m.out?.[card.name], "#991b1b")).join("")}</tr>`,
    ),
  ].join("");

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>Sideboard Guide</title>
<style>
  body { font-family: sans-serif; margin: 16px; }
  h2 { font-size: 14px; margin: 0 0 10px; }
  table { border-collapse: collapse; }
  @page { size: landscape; margin: 10mm; }
  @media print { body { margin: 0; } }
</style>
</head><body>
<h2>Golgari Airship — Sideboard Guide</h2>
<table>${rows}</table>
<script>window.onload = () => window.print();<\/script>
</body></html>`;
}

interface TooltipState {
  matchup: MatchupRow;
  x: number;
  y: number;
}

function MatchupTooltip({ state }: { state: TooltipState }) {
  const inEntries = Object.entries(state.matchup.in ?? {}).filter(
    ([, v]) => v > 0,
  );
  const outEntries = Object.entries(state.matchup.out ?? {}).filter(
    ([, v]) => v > 0,
  );
  if (inEntries.length === 0 && outEntries.length === 0) return null;

  return (
    <div
      className="fixed z-50 w-52 pointer-events-none"
      style={{
        left: state.x,
        top: state.y,
        transform: "translate(-50%, -100%)",
      }}
    >
      <div className="rounded-lg border border-border bg-popover shadow-lg text-xs p-3 space-y-2 mb-1.5">
        {inEntries.length > 0 && (
          <div>
            <div className="font-semibold text-green-600 dark:text-green-400 uppercase tracking-wide mb-1">
              In
            </div>
            {inEntries.map(([name, count]) => (
              <div key={name} className="flex justify-between gap-2">
                <span className="text-foreground/80 truncate">{name}</span>
                <span className="font-mono font-bold text-green-600 dark:text-green-400 shrink-0">
                  +{count}
                </span>
              </div>
            ))}
          </div>
        )}
        {outEntries.length > 0 && (
          <div>
            <div className="font-semibold text-red-600 dark:text-red-400 uppercase tracking-wide mb-1">
              Out
            </div>
            {outEntries.map(([name, count]) => (
              <div key={name} className="flex justify-between gap-2">
                <span className="text-foreground/80 truncate">{name}</span>
                <span className="font-mono font-bold text-red-600 dark:text-red-400 shrink-0">
                  −{count}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="w-2 h-2 bg-popover border-r border-b border-border rotate-45 mx-auto -mt-3" />
    </div>
  );
}

function Cell({
  count,
  variant,
  overflow,
}: {
  count: number | undefined;
  variant: "in" | "out";
  overflow?: boolean;
}) {
  if (!count) {
    return (
      <td className="py-2.5 px-2 text-center border-r border-border/30 last:border-r-0">
        <span className="text-muted-foreground/20 select-none text-xs">—</span>
      </td>
    );
  }
  return (
    <td className="py-2.5 px-2 text-center border-r border-border/30 last:border-r-0">
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-bold ${
          overflow
            ? "bg-orange-200 dark:bg-orange-800/60 text-orange-800 dark:text-orange-200 ring-1 ring-orange-400"
            : variant === "in"
              ? "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300"
              : "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300"
        }`}
        title={overflow ? `Exceeds available copies` : undefined}
      >
        {count}
      </span>
    </td>
  );
}

function GroupHeader({
  label,
  colSpan,
  variant,
}: {
  label: string;
  colSpan: number;
  variant: "in" | "out";
}) {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className={`py-1.5 px-4 text-xs font-semibold uppercase tracking-widest border-y ${
          variant === "in"
            ? "bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900"
            : "bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900"
        }`}
      >
        {label}
      </td>
    </tr>
  );
}

function cardStats(
  cardName: string,
  field: "in" | "out",
  matchups: MatchupRow[],
) {
  let appearances = 0;
  let total = 0;
  for (const m of matchups) {
    const n = m[field]?.[cardName];
    if (n) {
      appearances++;
      total += n;
    }
  }
  return { appearances, total };
}

function UsageBar({
  appearances,
  total: matchupCount,
}: {
  appearances: number;
  total: number;
}) {
  const pct =
    matchupCount === 0 ? 0 : Math.round((appearances / matchupCount) * 100);
  return (
    <div className="flex items-center gap-1.5 mt-0.5">
      <div className="w-10 h-1 rounded-full bg-border/40 overflow-hidden">
        <div
          className="h-full rounded-full bg-foreground/30"
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="text-muted-foreground/50 text-xs">{pct}%</span>
    </div>
  );
}

interface InsightItem {
  type: "warning" | "info" | "positive";
  message: string;
}

function buildInsights(
  sideboardCards: CardEntry[],
  maindeckCards: CardEntry[],
  matchups: MatchupRow[],
): InsightItem[] {
  const items: InsightItem[] = [];
  const n = matchups.length;
  if (n === 0) return items;

  // Sideboard cards never brought in
  const unused = sideboardCards.filter((c) => {
    const { appearances } = cardStats(c.name, "in", matchups);
    return appearances === 0;
  });
  if (unused.length > 0) {
    items.push({
      type: "warning",
      message: `Sideboard cards with no matchups filled in yet: ${unused.map((c) => c.name).join(", ")}`,
    });
  }

  // Sideboard staples (brought in ≥ 50% of matchups)
  const staples = sideboardCards.filter((c) => {
    const { appearances } = cardStats(c.name, "in", matchups);
    return appearances >= n * 0.5 && appearances > 0;
  });
  if (staples.length > 0) {
    items.push({
      type: "positive",
      message: `Sideboard staples (≥50% of matchups): ${staples.map((c) => c.name).join(", ")} — consider moving to maindeck`,
    });
  }

  // Highly situational sideboard (brought in only once)
  const situational = sideboardCards.filter((c) => {
    const { appearances } = cardStats(c.name, "in", matchups);
    return appearances === 1;
  });
  if (situational.length > 0) {
    items.push({
      type: "info",
      message: `Highly situational (1 matchup only): ${situational.map((c) => c.name).join(", ")} — verify these earn their slot`,
    });
  }

  // Maindeck cards cut in ≥ 50% of matchups
  const frequentCuts = maindeckCards.filter((c) => {
    const { appearances } = cardStats(c.name, "out", matchups);
    return appearances >= n * 0.5 && appearances > 0;
  });
  if (frequentCuts.length > 0) {
    items.push({
      type: "warning",
      message: `Cut in ≥50% of matchups: ${frequentCuts.map((c) => c.name).join(", ")} — consider reducing copies or moving to sideboard`,
    });
  }

  // Maindeck cards never cut (potential safe keeps)
  const neverCut = maindeckCards.filter((c) => {
    const { appearances } = cardStats(c.name, "out", matchups);
    return appearances === 0;
  });
  // Only show if we have at least some filled matchups
  const filledMatchups = matchups.filter(
    (m) => Object.keys(m.out ?? {}).length > 0,
  ).length;
  if (filledMatchups >= 3 && neverCut.length > 0) {
    items.push({
      type: "positive",
      message: `Never cut (safe keeps): ${neverCut.map((c) => c.name).join(", ")}`,
    });
  }

  // Check for imbalanced matchups
  const imbalanced = matchups.filter((m) => {
    const inTotal = Object.values(m.in ?? {}).reduce((a, b) => a + b, 0);
    const outTotal = Object.values(m.out ?? {}).reduce((a, b) => a + b, 0);
    return (inTotal > 0 || outTotal > 0) && inTotal !== outTotal;
  });
  if (imbalanced.length > 0) {
    items.push({
      type: "warning",
      message: `Unbalanced sideboarding in: ${imbalanced.map((m) => `${m.name} (in ${Object.values(m.in ?? {}).reduce((a, b) => a + b, 0)}, out ${Object.values(m.out ?? {}).reduce((a, b) => a + b, 0)})`).join("; ")}`,
    });
  }

  // Check for quantities exceeding available copies
  const overQuantityErrors: string[] = [];
  for (const m of matchups) {
    for (const card of sideboardCards) {
      const n = m.in?.[card.name];
      if (n && n > card.count) {
        overQuantityErrors.push(
          `${m.name}: bring in ${n}× ${card.name} but only ${card.count} in sideboard`,
        );
      }
    }
    for (const card of maindeckCards) {
      const n = m.out?.[card.name];
      if (n && n > card.count) {
        overQuantityErrors.push(
          `${m.name}: cut ${n}× ${card.name} but only ${card.count} in maindeck`,
        );
      }
    }
  }
  if (overQuantityErrors.length > 0) {
    for (const err of overQuantityErrors) {
      items.push({ type: "warning", message: `Quantity error — ${err}` });
    }
  }

  return items;
}

interface PackageResult {
  inCards: string[];
  outCards: string[];
  matchupNames: string[];
}

function combinations(arr: string[], k: number): string[][] {
  if (k === 0) return [[]];
  if (arr.length < k) return [];
  const [first, ...rest] = arr;
  return [
    ...combinations(rest, k - 1).map((c) => [first, ...c]),
    ...combinations(rest, k),
  ];
}

function findPackages(
  sideboardCards: CardEntry[],
  maindeckCards: CardEntry[],
  matchups: MatchupRow[],
): PackageResult[] {
  const MIN = 2; // must appear together in at least this many matchups
  const RATE = 0.5; // must co-occur in ≥60% of matchups where either card appears
  const results: PackageResult[] = [];
  if (matchups.length < MIN) return results;

  const inSets = matchups.map(
    (m) =>
      new Set(
        Object.entries(m.in ?? {})
          .filter(([, v]) => v > 0)
          .map(([k]) => k),
      ),
  );
  const outSets = matchups.map(
    (m) =>
      new Set(
        Object.entries(m.out ?? {})
          .filter(([, v]) => v > 0)
          .map(([k]) => k),
      ),
  );

  const activeSb = sideboardCards
    .map((c) => c.name)
    .filter((name) => inSets.filter((s) => s.has(name)).length >= MIN);
  const activeMd = maindeckCards
    .map((c) => c.name)
    .filter((name) => outSets.filter((s) => s.has(name)).length >= MIN);

  // Find all frequent subsets at ≥RATE co-occurrence, then keep only maximal ones
  function frequentMaximal(
    cards: string[],
    sets: Set<string>[],
  ): { cards: string[]; indices: number[] }[] {
    const freq = new Map<string, { cards: string[]; indices: number[] }>();
    const maxSize = Math.min(cards.length, 6);
    for (let size = 2; size <= maxSize; size++) {
      for (const combo of combinations(cards, size)) {
        const indices = sets
          .map((s, i) => (combo.every((c) => s.has(c)) ? i : -1))
          .filter((i) => i >= 0);
        // Use max individual card count as denominator so adding a less-frequent card
        // to a group doesn't inflate the denominator and kill the group's rate
        const maxIndividual = Math.max(
          ...combo.map((c) => sets.filter((s) => s.has(c)).length),
        );
        if (
          indices.length >= MIN &&
          maxIndividual > 0 &&
          indices.length / maxIndividual >= RATE
        ) {
          freq.set(combo.join("|"), { cards: combo, indices });
        }
      }
    }
    // Keep only maximal: discard any set that is a strict subset of a larger one with same coverage
    const entries = [...freq.values()].sort(
      (a, b) => b.cards.length - a.cards.length,
    );
    const kept: { cards: string[]; indices: number[] }[] = [];
    for (const entry of entries) {
      const dominated = kept.some((larger) => {
        const ls = new Set(larger.cards);
        return entry.cards.every((c) => ls.has(c));
      });
      if (!dominated) kept.push(entry);
    }
    return kept;
  }

  const inPkgs = frequentMaximal(activeSb, inSets);
  const outPkgs = frequentMaximal(activeMd, outSets);

  // Combine in+out packages that co-occur at ≥RATE into swap packages
  const coveredInKeys = new Set<string>();
  const coveredOutKeys = new Set<string>();

  for (const ip of inPkgs) {
    for (const op of outPkgs) {
      const shared = ip.indices.filter((i) => op.indices.includes(i));
      const union = new Set([...ip.indices, ...op.indices]).size;
      if (shared.length >= MIN && shared.length / union >= RATE) {
        results.push({
          inCards: ip.cards,
          outCards: op.cards,
          matchupNames: shared.map((i) => matchups[i].name),
        });
        coveredInKeys.add(ip.cards.join("|"));
        coveredOutKeys.add(op.cards.join("|"));
      }
    }
  }

  // Add in/out-only packages not fully covered by a swap package
  for (const ip of inPkgs) {
    if (!coveredInKeys.has(ip.cards.join("|"))) {
      results.push({
        inCards: ip.cards,
        outCards: [],
        matchupNames: ip.indices.map((i) => matchups[i].name),
      });
    }
  }
  for (const op of outPkgs) {
    if (!coveredOutKeys.has(op.cards.join("|"))) {
      results.push({
        inCards: [],
        outCards: op.cards,
        matchupNames: op.indices.map((i) => matchups[i].name),
      });
    }
  }

  return results;
}

export function SideboardMatrix({
  sideboardCards,
  maindeckCards,
  matchups,
}: SideboardMatrixProps) {
  const totalCols = matchups.length + 2; // +1 card col, +1 stats col
  const insights = buildInsights(sideboardCards, maindeckCards, matchups);
  const packages = findPackages(sideboardCards, maindeckCards, matchups);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  // Per-matchup balance: sum(in) vs sum(out)
  const balance = matchups.map((m) => {
    const inTotal = Object.values(m.in ?? {}).reduce((a, b) => a + b, 0);
    const outTotal = Object.values(m.out ?? {}).reduce((a, b) => a + b, 0);
    return { inTotal, outTotal, ok: inTotal === outTotal };
  });

  const handleDownload = () => {
    const html = buildPrintHTML(sideboardCards, maindeckCards, matchups);
    const win = window.open("", "_blank");
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  return (
    <div className="my-6 space-y-3">
      {tooltip && <MatchupTooltip state={tooltip} />}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </Button>
      </div>
      <div className="overflow-hidden rounded-lg border border-border">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="py-3 px-4 text-left text-sm font-semibold text-foreground uppercase tracking-wide whitespace-nowrap min-w-[160px]">
                  Card
                </th>
                {matchups.map((matchup, i) => (
                  <th
                    key={i}
                    className="px-2 text-center text-sm font-semibold text-foreground cursor-default"
                    style={{ minWidth: "40px" }}
                    onMouseEnter={(e) => {
                      const rect = (
                        e.currentTarget as HTMLElement
                      ).getBoundingClientRect();
                      setTooltip({
                        matchup,
                        x: rect.left + rect.width / 2,
                        y: rect.top - 4,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                  >
                    <div
                      className="flex flex-col items-center justify-end gap-1.5"
                      style={{ height: "160px", paddingBottom: "8px" }}
                    >
                      <div
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          whiteSpace: "nowrap",
                          fontSize: "11px",
                          maxHeight: "120px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {matchup.link ? (
                          <a
                            href={matchup.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {matchup.name}
                          </a>
                        ) : (
                          matchup.name
                        )}
                      </div>
                      <div className="flex gap-0.5 flex-wrap justify-center">
                        {matchup.colors.map((c) => (
                          <ManaPip key={c} color={c} />
                        ))}
                      </div>
                      <div>
                        {balance[i].inTotal === 0 &&
                        balance[i].outTotal === 0 ? (
                          <span className="text-muted-foreground/30 text-xs">
                            ·
                          </span>
                        ) : (
                          <span
                            className={`text-xs font-bold ${balance[i].ok ? "text-green-500" : "text-red-500"}`}
                          >
                            {balance[i].inTotal}/{balance[i].outTotal}
                          </span>
                        )}
                      </div>
                    </div>
                  </th>
                ))}
                <th className="py-3 px-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide whitespace-nowrap border-l border-border/40">
                  Used
                </th>
              </tr>
            </thead>

            <tbody>
              <GroupHeader label="In" colSpan={totalCols} variant="in" />
              {sideboardCards.map((card, i) => {
                const { appearances, total } = cardStats(
                  card.name,
                  "in",
                  matchups,
                );
                return (
                  <tr
                    key={card.name}
                    className={`border-b border-border/50 last:border-b-0 transition-colors hover:bg-muted/20 ${
                      i % 2 === 0 ? "" : "bg-muted/10"
                    }`}
                  >
                    <td className="py-2.5 px-4 text-sm font-medium text-foreground border-r border-border/30">
                      <span className="inline-flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground w-4 text-right shrink-0">
                          {card.count}
                        </span>
                        <CardName>{card.name}</CardName>
                      </span>
                    </td>
                    {matchups.map((matchup, j) => (
                      <Cell
                        key={j}
                        count={matchup.in?.[card.name]}
                        variant="in"
                        overflow={(matchup.in?.[card.name] ?? 0) > card.count}
                      />
                    ))}
                    <td className="py-2.5 px-3 text-xs text-muted-foreground border-l border-border/40 whitespace-nowrap">
                      {appearances > 0 ? (
                        <div>
                          <span>
                            {appearances}×{" "}
                            <span className="text-foreground/50">
                              ({total})
                            </span>
                          </span>
                          <UsageBar
                            appearances={appearances}
                            total={matchups.length}
                          />
                        </div>
                      ) : (
                        <span className="text-muted-foreground/25">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}

              <GroupHeader label="Out" colSpan={totalCols} variant="out" />
              {maindeckCards.map((card, i) => {
                const { appearances, total } = cardStats(
                  card.name,
                  "out",
                  matchups,
                );
                return (
                  <tr
                    key={card.name}
                    className={`border-b border-border/50 last:border-b-0 transition-colors hover:bg-muted/20 ${
                      i % 2 === 0 ? "" : "bg-muted/10"
                    }`}
                  >
                    <td className="py-2.5 px-4 text-sm font-medium text-foreground border-r border-border/30">
                      <span className="inline-flex items-center gap-2">
                        <span className="text-xs font-mono text-muted-foreground w-4 text-right shrink-0">
                          {card.count}
                        </span>
                        <CardName>{card.name}</CardName>
                      </span>
                    </td>
                    {matchups.map((matchup, j) => (
                      <Cell
                        key={j}
                        count={matchup.out?.[card.name]}
                        variant="out"
                        overflow={(matchup.out?.[card.name] ?? 0) > card.count}
                      />
                    ))}
                    <td className="py-2.5 px-3 text-xs text-muted-foreground border-l border-border/40 whitespace-nowrap">
                      {appearances > 0 ? (
                        <div>
                          <span>
                            {appearances}×{" "}
                            <span className="text-foreground/50">
                              ({total})
                            </span>
                          </span>
                          <UsageBar
                            appearances={appearances}
                            total={matchups.length}
                          />
                        </div>
                      ) : (
                        <span className="text-muted-foreground/25">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {false && packages.length > 0 && (
        <div className="rounded-lg border border-border bg-muted/20 divide-y divide-border/40">
          <div className="px-4 py-2.5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Packages
          </div>
          {packages.map((pkg, i) => (
            <div key={i} className="px-4 py-3 space-y-1.5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {pkg.inCards.length > 0 && (
                  <span className="flex flex-wrap gap-1">
                    {pkg.inCards.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-300"
                      >
                        <span className="font-bold">+</span>
                        {c}
                      </span>
                    ))}
                  </span>
                )}
                {pkg.inCards.length > 0 && pkg.outCards.length > 0 && (
                  <span className="text-muted-foreground text-sm">→</span>
                )}
                {pkg.outCards.length > 0 && (
                  <span className="flex flex-wrap gap-1">
                    {pkg.outCards.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300"
                      >
                        <span className="font-bold">−</span>
                        {c}
                      </span>
                    ))}
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {pkg.matchupNames.join(", ")}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
