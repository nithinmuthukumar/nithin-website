import { Calendar } from "lucide-react";

interface BlogHeaderProps {
  title: string;
  date: string;
  excerpt?: string;
}

export function BlogHeader({ title, date, excerpt }: BlogHeaderProps) {
  return (
    <header className="mb-12 pb-8 border-b border-border">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight tracking-tight">
        {title}
      </h1>
      <div className="flex items-center gap-3 text-muted-foreground mb-6">
        <Calendar className="w-4 h-4 text-primary" />
        <time dateTime={date} className="font-medium">
          {new Date(date + "T00:00:00").toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            timeZone: "UTC",
          })}
        </time>
      </div>
      {excerpt && (
        <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl italic">
          {excerpt}
        </p>
      )}
    </header>
  );
}
