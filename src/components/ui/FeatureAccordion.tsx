"use client";

import { AnimatePresence, m } from "motion/react";
import { useState } from "react";

type Item = { id: string; title: string; desc: string[] };

const FeatureAccordion = ({ items }: { items: Item[] }) => {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const isOpen = open === item.id;

        return (
          <div
            key={item.id}
            className={`card overflow-hidden transition-colors ${
              isOpen ? "border-rhistle bg-brand-50" : ""
            }`}
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-6 p-6 text-left sm:p-8"
            >
              <span className="flex items-center gap-6">
                <span
                  className={`font-black text-2xl tabular-nums transition-colors ${
                    isOpen ? "text-rhistle" : "text-mist"
                  }`}
                >
                  {item.id}
                </span>
                <span className="font-bold text-lg md:text-xl">{item.title}</span>
              </span>
              <m.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative size-6 shrink-0"
              >
                <span className="absolute inset-0 m-auto h-0.5 w-4 bg-rhistle" />
                <span className="absolute inset-0 m-auto h-4 w-0.5 bg-rhistle" />
              </m.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="grid gap-3 px-6 pb-6 sm:px-8 sm:pb-8 md:grid-cols-2">
                    {item.desc.map((line) => (
                      <li key={line} className="flex items-center gap-3 text-graphite">
                        <span className="size-1.5 shrink-0 rounded-full bg-rhistle" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
export default FeatureAccordion;
