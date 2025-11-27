import { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
  className?: string;
}

export function CodeBlock({ children, className = "" }: CodeBlockProps) {
  return (
    <div className="my-6">
      <pre className="bg-muted/50 border border-border rounded-lg p-4 overflow-x-auto font-mono text-sm leading-relaxed">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

