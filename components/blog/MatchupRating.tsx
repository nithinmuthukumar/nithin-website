import { cn } from "@/lib/utils";

type Rating = "Very Favorable" | "Favorable" | "Even" | "Unfavorable" | "Very Unfavorable";

const ratingStyles: Record<Rating, { bg: string; text: string; border: string }> = {
  "Very Favorable": {
    bg: "bg-green-500/20",
    text: "text-green-700 dark:text-green-400",
    border: "border-green-500/50",
  },
  "Favorable": {
    bg: "bg-lime-500/20",
    text: "text-lime-700 dark:text-lime-400",
    border: "border-lime-500/50",
  },
  "Even": {
    bg: "bg-yellow-500/20",
    text: "text-yellow-700 dark:text-yellow-400",
    border: "border-yellow-500/50",
  },
  "Unfavorable": {
    bg: "bg-orange-500/20",
    text: "text-orange-700 dark:text-orange-400",
    border: "border-orange-500/50",
  },
  "Very Unfavorable": {
    bg: "bg-red-500/20",
    text: "text-red-700 dark:text-red-400",
    border: "border-red-500/50",
  },
};

interface MatchupRatingProps {
  rating: Rating;
}

export function MatchupRating({ rating }: MatchupRatingProps) {
  const styles = ratingStyles[rating];

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-4 py-2 rounded-lg border-2 font-semibold text-sm",
      styles.bg,
      styles.text,
      styles.border
    )}>
      <span className="text-xs uppercase tracking-wide opacity-70">Rating:</span>
      <span>{rating}</span>
    </div>
  );
}
