"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const FeatureCard = ({
  badge,
  title,
  descriptions,
  icon,
  index = 0,
}: {
  badge: string;
  title: string;
  descriptions: string[];
  icon: ReactNode;
  index?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -6 }}
    className="group flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-shadow hover:shadow-xl"
  >
    <div className="flex items-center justify-between">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-rhistle/10 text-rhistle">
        {icon}
      </span>
      <span className="rounded-full bg-rhistle px-3 py-1 font-semibold text-sm text-white">
        {badge}
      </span>
    </div>
    <h3 className="font-bold text-xl">{title}</h3>
    <ul className="space-y-2 text-gray-600">
      {descriptions.map((d) => (
        <li key={d} className="flex gap-2">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-rhistle" />
          <span>{d}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);
export default FeatureCard;
