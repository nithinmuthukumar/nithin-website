import React from "react";

export function Aside({ children }: { children?: React.ReactNode }) {
  return (
    <aside className="my-6 rounded-lg border border-border bg-muted/40 px-6 py-4 text-sm text-foreground/80">
      {children}
    </aside>
  );
}
