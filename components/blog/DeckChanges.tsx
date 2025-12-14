import React from "react";

interface ChangeSection {
  title: string;
  added: React.ReactNode[];
  removed: React.ReactNode[];
}

interface DeckChangesProps {
  sections: ChangeSection[];
}

export function DeckChanges({ sections }: DeckChangesProps) {
  return (
    <div className="space-y-6 my-6">
      {sections.map((section, index) => (
        <div key={index}>
          <h4 className="font-bold text-lg mb-3">{section.title}</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="border border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/30 p-4 rounded">
              <h3 className="font-semibold text-green-700 dark:text-green-400 mb-3 text-sm uppercase tracking-wide">
                + Added
              </h3>
              <div className="space-y-2 text-sm">
                {section.added.map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
              </div>
            </div>

            <div className="border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/30 p-4 rounded">
              <h3 className="font-semibold text-red-700 dark:text-red-400 mb-3 text-sm uppercase tracking-wide">
                − Removed
              </h3>
              <div className="space-y-2 text-sm">
                {section.removed.map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
