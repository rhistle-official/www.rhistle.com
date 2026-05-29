"use client";

import { motion } from "motion/react";

const SolutionHero = ({
  code,
  name,
  tagline,
  description,
  gradient = "from-[#1428a0] via-[#0f1f7a] to-[#070d3d]",
}: {
  code: string;
  name: string;
  tagline: string;
  description: string;
  gradient?: string;
}) => (
  <section className="relative overflow-hidden bg-rhistle text-white">
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
    <div
      className="absolute inset-0 opacity-[0.15]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
    <motion.div
      aria-hidden
      initial={{ opacity: 0.15, scale: 0.8 }}
      animate={{ opacity: 0.35, scale: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="-right-24 -top-24 absolute size-96 rounded-full bg-white/20 blur-3xl"
    />
    <div className="relative mx-auto max-w-7xl px-8 pt-40 pb-24 md:pt-48 md:pb-32">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-semibold text-white/70 tracking-widest"
      >
        {name}
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-4 font-audiowide text-7xl leading-none md:text-8xl xl:text-9xl"
      >
        {code}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-8 max-w-2xl font-bold text-xl md:text-2xl"
      >
        {tagline}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-4 max-w-2xl text-white/70 md:text-lg"
      >
        {description}
      </motion.p>
    </div>
  </section>
);
export default SolutionHero;
