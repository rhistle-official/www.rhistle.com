"use client";

import { motion } from "motion/react";
import Image, { type StaticImageData } from "next/image";

const SolutionHero = ({
  code,
  name,
  tagline,
  description,
  gradient = "from-[#1428a0] via-[#0f1f7a] to-[#070d3d]",
  image,
}: {
  code: string;
  name: string;
  tagline: string;
  description?: string;
  gradient?: string;
  image?: StaticImageData;
}) => (
  <section className="relative overflow-hidden bg-rhistle text-white">
    {image ? (
      <>
        <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-linear-to-br from-[#070d3d]/85 via-[#0f1f7a]/65 to-[#070d3d]/85" />
      </>
    ) : (
      <div className={`absolute inset-0 bg-linear-to-br ${gradient}`} />
    )}
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
      className="absolute -top-24 -right-24 size-96 rounded-full bg-white/20 blur-3xl"
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
        className="mt-4 font-audiowide text-5xl leading-none sm:text-7xl md:text-8xl xl:text-9xl"
      >
        {code}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-8 font-bold text-xl md:text-2xl"
      >
        {tagline}
      </motion.p>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 text-white/70 md:text-lg"
        >
          {description}
        </motion.p>
      )}
    </div>
  </section>
);
export default SolutionHero;
