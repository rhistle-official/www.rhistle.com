"use client";

import { domAnimation, LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * LazyMotion: motion 기능을 지연 로드해 번들 절감.
 * MotionConfig reducedMotion="user": prefers-reduced-motion 사용자에게 transform 애니메이션 자동 비활성.
 */
const MotionProvider = ({ children }: { children: ReactNode }) => (
  <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  </LazyMotion>
);

export default MotionProvider;
