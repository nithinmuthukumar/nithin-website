"use client";

import React, { useState, useMemo } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

interface Matchup {
  name: string;
  wins: number;
  losses: number;
  assessment: "good" | "even" | "bad";
}

interface MatchupTableProps {
  matchups: Matchup[];
}

type SortField = "name" | "matches" | "winRate" | "assessment";
type SortDirection = "asc" | "desc" | null;

export function MatchupTable({ matchups }: MatchupTableProps) {
  const [sortField, setSortField] = useState<SortField | null>("matches");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const getRowClasses = (assessment: string) => {
    switch (assessment) {
      case "good":
        return "bg-green-950/20 hover:bg-green-950/30";
      case "bad":
        return "bg-red-950/20 hover:bg-red-950/30";
      default:
        return "bg-muted/20 hover:bg-muted/30";
    }
  };

  const getDotClasses = (assessment: string) => {
    switch (assessment) {
      case "good":
        return "bg-green-500";
      case "bad":
        return "bg-red-500";
      default:
        return "bg-slate-500";
    }
  };

  const getAssessmentLabel = (assessment: string) => {
    return assessment.charAt(0).toUpperCase() + assessment.slice(1);
  };

  const getAssessmentValue = (assessment: string) => {
    switch (assessment) {
      case "good":
        return 3;
      case "even":
        return 2;
      case "bad":
        return 1;
      default:
        return 0;
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortDirection(null);
        setSortField(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getTotalMatches = (matchup: Matchup) => {
    return matchup.wins + matchup.losses;
  };

  const getWinRate = (matchup: Matchup) => {
    const total = getTotalMatches(matchup);
    if (total === 0) return 0;
    return Math.round((matchup.wins / total) * 100);
  };

  const getRecord = (matchup: Matchup) => {
    return `${matchup.wins}-${matchup.losses}`;
  };

  const sortedMatchups = useMemo(() => {
    if (!sortField || !sortDirection) return matchups;

    return [...matchups].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortField === "name") {
        aValue = a.name;
        bValue = b.name;
      } else if (sortField === "matches") {
        aValue = getTotalMatches(a);
        bValue = getTotalMatches(b);
      } else if (sortField === "winRate") {
        aValue = getWinRate(a);
        bValue = getWinRate(b);
      } else {
        aValue = getAssessmentValue(a.assessment);
        bValue = getAssessmentValue(b.assessment);
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [matchups, sortField, sortDirection]);

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="w-3 h-3 text-foreground/40" />;
    }
    if (sortDirection === "asc") {
      return <ChevronUp className="w-3 h-3 text-foreground" />;
    }
    return <ChevronDown className="w-3 h-3 text-foreground" />;
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      <table className="w-full">
        <thead className="bg-muted/40 border-b border-border">
          <tr>
            <th
              className="text-left py-3 px-4 font-semibold text-sm uppercase tracking-wide text-foreground cursor-pointer hover:bg-muted/60 transition-colors select-none"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center gap-2">
                Matchup
                <SortIcon field="name" />
              </div>
            </th>
            <th
              className="text-left py-3 px-4 font-semibold text-sm uppercase tracking-wide text-foreground cursor-pointer hover:bg-muted/60 transition-colors select-none"
              onClick={() => handleSort("matches")}
            >
              <div className="flex items-center gap-2">
                Matches
                <SortIcon field="matches" />
              </div>
            </th>
            <th
              className="text-left py-3 px-4 font-semibold text-sm uppercase tracking-wide text-foreground cursor-pointer hover:bg-muted/60 transition-colors select-none"
              onClick={() => handleSort("winRate")}
            >
              <div className="flex items-center gap-2">
                Win Rate
                <SortIcon field="winRate" />
              </div>
            </th>
            <th
              className="text-left py-3 px-4 font-semibold text-sm uppercase tracking-wide text-foreground cursor-pointer hover:bg-muted/60 transition-colors select-none"
              onClick={() => handleSort("assessment")}
            >
              <div className="flex items-center gap-2">
                Assessment
                <SortIcon field="assessment" />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedMatchups.map((matchup, index) => (
            <tr
              key={index}
              className={`border-b border-border/50 last:border-b-0 transition-colors ${getRowClasses(
                matchup.assessment,
              )}`}
            >
              <td className="py-3 px-4 font-medium text-foreground">
                {matchup.name}
              </td>
              <td className="py-3 px-4 font-mono text-sm text-foreground/90">
                {getRecord(matchup)}
              </td>
              <td className="py-3 px-4 font-mono text-sm text-foreground/90">
                {getWinRate(matchup)}%
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${getDotClasses(
                      matchup.assessment,
                    )}`}
                  />
                  <span className="text-sm text-foreground/90">
                    {getAssessmentLabel(matchup.assessment)}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
