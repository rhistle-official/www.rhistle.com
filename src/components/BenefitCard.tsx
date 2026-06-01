"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

const BenefitCard = ({
  title,
  highlight,
  descriptions,
  icon,
  index = 0,
}: {
  title: string;
  highlight: string;
  descriptions: string[];
  icon: ReactNode;
  index?: number;
}) => (
  <m.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col items-center gap-6 rounded-3xl border border-gray-100 bg-gradient-to-b from-white to-rhistle/5 p-8 text-center"
  >
    <span className="flex size-14 items-center justify-center rounded-2xl bg-rhistle text-white">
      {icon}
    </span>
    <p className="font-semibold text-lg">
      {title}
      <br />
      <span className="text-rhistle">{highlight}</span>
    </p>
    <ul className="space-y-2 text-left text-gray-600">
      {descriptions.map((d) => (
        <li key={d} className="flex gap-2">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-rhistle" />
          <span>{d}</span>
        </li>
      ))}
    </ul>
  </m.div>
);
export default BenefitCard;
