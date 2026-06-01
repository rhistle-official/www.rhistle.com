"use client";

import { m } from "motion/react";
import Image, { type StaticImageData } from "next/image";
import GridLines from "@/components/ui/GridLines";

const SolutionHero = ({
  code,
  name,
  tagline,
  description,
  gradient = "from-rhistle via-brand-700 to-brand-900",
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
        <div className="absolute inset-0 bg-linear-to-br from-brand-900/85 via-brand-700/65 to-brand-900/85" />
      </>
    ) : (
      <div className={`absolute inset-0 bg-linear-to-br ${gradient}`} />
    )}
    <GridLines tone="onDark" />
    <m.div
      aria-hidden
      initial={{ opacity: 0.15, scale: 0.8 }}
      animate={{ opacity: 0.35, scale: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="absolute -top-24 -right-24 size-96 rounded-full bg-white/20 blur-3xl"
    />
    <div className="relative mx-auto max-w-7xl px-8 pt-40 pb-24 md:pt-48 md:pb-32">
      <m.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-semibold text-white/70 uppercase tracking-[0.18em]"
      >
        {name}
      </m.p>
      <m.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-4 font-audiowide text-5xl leading-none sm:text-7xl md:text-8xl xl:text-9xl"
      >
        {code}
      </m.h1>
      <m.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="mt-8 font-bold text-xl md:text-2xl"
      >
        {tagline}
      </m.p>
      {description && (
        <m.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-4 text-white/70 md:text-lg"
        >
          {description}
        </m.p>
      )}
    </div>
  </section>
);
export default SolutionHero;
