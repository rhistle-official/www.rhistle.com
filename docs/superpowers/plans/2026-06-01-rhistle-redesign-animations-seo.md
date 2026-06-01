# Rhistle 풀 리디자인 · 애니메이션 · 반응형 · SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** www.rhistle.com 6개 페이지를 테크·인더스트리얼 무드로 풀 리디자인하고, 절제된 애니메이션(reduced-motion 존중)·반응형·SEO를 적용하며, 디자인 토큰 + 시맨틱 레이어로 코드를 정리한다.

**Architecture:** 파운데이션 우선(A안). ① 디자인 토큰 + `@layer components` 시맨틱 레이어 + Biome CSS 설정 → ② 모션/UI 프리미티브 → ③ 폴더 재배치·리네임 → ④ SEO 기반 → ⑤ 페이지 리디자인(Home→Company→Contact→솔루션 3종) → ⑥ 최종 검증. 브랜드 앵커(`#1428a0`/Audiowide/Pretendard)는 불변.

**Tech Stack:** Next.js 16 (App Router) · next-intl(ko/en) · Tailwind v4 · motion(LazyMotion) · Biome 2 · pnpm · `cn()`(clsx+tailwind-merge)

**검증 방식(주의):** 이 저장소엔 테스트 러너가 없고, 마케팅 사이트 비주얼 리디자인에 테스트 프레임워크 도입은 범위 밖(YAGNI)이다. 따라서 각 태스크의 "검증"은 다음 게이트로 한다:
- `pnpm exec tsc --noEmit` (타입)
- `pnpm biome check ./src` (린트/포맷/정렬)
- `pnpm build` (빌드, 필요한 태스크에서)
- 360 / 768 / 1024 / 1440 폭 육안 + 접근성(단일 h1, alt, aria, 터치 ≥44px) 확인
순수 로직(SEO 헬퍼)에만 경량 단위 검증 스크립트를 둔다.

**브랜치:** `feat/redesign-animations-seo` (이미 생성됨, 설계문서 커밋 `c31614f` 위에서 작업)

**커밋 규칙:** 각 태스크 끝에서 커밋. 메시지는 한국어 + 아래 트레일러.
```
Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```

---

## 파일 구조 (최종)

```
src/
  app/
    globals.css                         # 토큰 + @layer components (재작성)
    [locale]/
      layout.tsx                        # MotionProvider 래핑, JSON-LD 제거, seo 헬퍼 사용
      opengraph-image.tsx               # (신규) 동적 OG
      page.tsx                          # HomePage
      company/page.tsx                  # CompanyPage
      contact/page.tsx                  # ContactPage
      solutions/{corecode,lx,vx}/page.tsx
    sitemap.ts / robots.ts
  components/
    layout/   SiteHeader SiteFooter MobileNav LocaleSwitcher ScrollToTopButton
    motion/   MotionProvider Reveal Stagger CountUp
    sections/ PageHero SolutionHero StatsBand BusinessCases SolutionShowcase
              PartnerGrid CompanyHistory CtaBand
    cards/    FeatureCard BenefitCard IndustryCard ValueCard
    ui/       Button Eyebrow GridLines FeatureAccordion SectionHeading drawer dropdown-menu
    forms/    ContactForm
  lib/
    utils.ts                            # cn (기존)
    seo.ts                              # (신규) metadata 빌더
biome.json                              # CSS Tailwind 파싱 설정
```

규칙: 폴더 이동은 `git mv`로 히스토리 보존. 이동 즉시 import 경로 갱신 후 `tsc`로 회귀 확인.

---

# 페이즈 1 — 디자인 토큰 + 시맨틱 레이어 + Biome CSS

### Task 1: Biome가 globals.css(Tailwind v4)를 깨끗하게 처리하도록 설정

**Files:**
- Modify: `biome.json`

기존 `pnpm biome check ./src`는 globals.css의 `@theme`/`@custom-variant`/`@layer` 등에서 "Tailwind-specific syntax is disabled" 에러 8건을 낸다. Biome의 CSS 파서가 Tailwind at-rule을 모르므로, CSS 린팅에서 globals.css를 제외(formatter는 유지)한다.

- [ ] **Step 1: 현재 에러 수 기록**

Run: `pnpm biome check ./src 2>&1 | grep -c "Tailwind-specific syntax"`
Expected: `6` (그 외 parsing/포맷 합쳐 총 8 errors)

- [ ] **Step 2: biome.json에 CSS overrides 추가**

`biome.json`의 최상위에 `overrides`를 추가한다(기존 키 유지, 마지막 항목 뒤에 삽입):

```json
  "overrides": [
    {
      "includes": ["src/app/globals.css"],
      "linter": { "enabled": false },
      "css": { "formatter": { "enabled": true } }
    }
  ]
```

- [ ] **Step 3: 검증**

Run: `pnpm biome check ./src 2>&1 | tail -3`
Expected: globals.css 관련 "Tailwind-specific syntax" 에러 0. (남는 에러는 layout.tsx의 `noDangerouslySetInnerHTML` 1건뿐 — Task 16에서 JSON-LD 제거로 해소)

- [ ] **Step 4: Commit**

```bash
git add biome.json
git commit -m "build: Biome가 Tailwind v4 globals.css를 린트 예외 처리

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 2: 디자인 토큰 재정의 (industrial 팔레트·타이포·여백·라운드)

**Files:**
- Modify: `src/app/globals.css`

브랜드 토큰 `--color-rhistle`(#1428a0)는 그대로 유지(전 코드가 `text-rhistle` 등으로 광범위 사용). 여기에 산업용 스케일·중립·타이포·여백 토큰을 추가하고, 미사용 shadcn 중립 토큰과 `.dark` 블록을 제거한다.

- [ ] **Step 1: `@theme` 블록 교체**

`globals.css` 상단의 import 3줄(`tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`)은 유지한다. 기존 `@custom-variant dark (...)`, 첫 `@theme { ... }`(fade-in-up), `@theme inline { ... }`(shadcn 토큰 매핑), `:root { ... }`, `.dark { ... }` 전체를 아래로 교체한다:

```css
@theme {
  /* ── Brand (불변 앵커) ── */
  --color-rhistle: #1428a0;
  --color-brand-50: #eef1fb;
  --color-brand-100: #d6ddf5;
  --color-brand-300: #8a9be0;
  --color-brand-500: #1428a0;
  --color-brand-700: #0f1f7a;
  --color-brand-900: #070d3d;

  /* ── Industrial neutrals ── */
  --color-ink: #0b0d12;
  --color-graphite: #3a3f4a;
  --color-steel: #6b7280;
  --color-mist: #9aa1ad;
  --color-line: #e6e8ec;
  --color-surface: #ffffff;
  --color-surface-2: #f7f8fa;

  /* ── Fonts (유지) ── */
  --font-audiowide: var(--font-audiowide), sans-serif;
  --font-sans: var(--font-pretendard), sans-serif;
  --font-heading: var(--font-pretendard), sans-serif;

  /* ── Type scale (반응형 clamp) ── */
  --text-display: clamp(2.5rem, 6vw, 5.5rem);
  --text-display--line-height: 1.02;
  --text-h1: clamp(2rem, 4.5vw, 3.5rem);
  --text-h1--line-height: 1.08;
  --text-h2: clamp(1.625rem, 3vw, 2.5rem);
  --text-h2--line-height: 1.12;
  --text-h3: clamp(1.25rem, 2vw, 1.625rem);
  --text-h3--line-height: 1.2;
  --text-eyebrow: 0.8125rem;
  --text-eyebrow--line-height: 1.4;
  --text-eyebrow--letter-spacing: 0.18em;

  /* ── Radius (각진 인더스트리얼) ── */
  --radius: 0.5rem;
  --radius-sm: calc(var(--radius) * 0.5);
  --radius-md: var(--radius);
  --radius-lg: calc(var(--radius) * 1.5);

  /* ── Section rhythm ── */
  --spacing-section: clamp(4rem, 9vw, 8rem);

  /* ── Elevation (절제) ── */
  --shadow-hairline: 0 1px 2px rgb(11 13 18 / 0.04);
  --shadow-raise: 0 12px 32px -12px rgb(11 13 18 / 0.18);
}
```

- [ ] **Step 2: base 레이어 정리**

기존 `@layer base { ... }`는 유지하되, `outline-ring/50`·`border-border`가 삭제된 토큰을 참조하므로 아래로 교체:

```css
@layer base {
  * {
    border-color: var(--color-line);
  }
  html {
    @apply font-sans;
    scroll-behavior: smooth;
  }
  body {
    background: var(--color-surface);
    color: var(--color-ink);
  }
  button:not(:disabled),
  [role="button"]:not(:disabled) {
    cursor: pointer;
  }
  @media (prefers-reduced-motion: reduce) {
    html { scroll-behavior: auto; }
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
    }
  }
}
```

- [ ] **Step 3: 타입/빌드 검증**

Run: `pnpm exec tsc --noEmit && pnpm biome check ./src 2>&1 | tail -2`
Expected: 타입 에러 0. biome는 layout.tsx `noDangerouslySetInnerHTML` 1건만 남음.

Run: `pnpm build 2>&1 | tail -15`
Expected: 빌드 성공. (이 시점엔 `text-rhistle` 등 기존 클래스가 `--color-rhistle` 토큰으로 그대로 동작. 삭제한 shadcn 토큰을 쓰는 곳은 `ui/drawer`·`ui/dropdown-menu` — 다음 스텝에서 확인)

- [ ] **Step 4: 삭제된 토큰 참조 점검**

Run: `grep -rnE "bg-(card|popover|sidebar|muted|accent|secondary|destructive)|text-(card|popover|muted|accent|secondary)-foreground|border-border|ring-ring" src`
Expected: `ui/drawer.tsx`, `ui/dropdown-menu.tsx`에서만 매치될 수 있음. 매치가 있으면 해당 파일이 실제 렌더 경로에서 쓰이는지 확인:

Run: `grep -rn "from \"@/components/ui/dropdown-menu\"\|from \"./dropdown-menu\"\|DropdownMenu" src --include=*.tsx | grep -v "ui/dropdown-menu.tsx"`
- 매치 없음 → `dropdown-menu.tsx`는 미사용. **삭제**: `git rm src/components/ui/dropdown-menu.tsx`.
- `drawer`는 `MobileNav`에서 사용 중이므로 유지하되, 삭제된 토큰을 쓰면 Task 9에서 industrial 토큰으로 교체.

- [ ] **Step 5: 검증 + Commit**

Run: `pnpm exec tsc --noEmit && pnpm build 2>&1 | tail -5`
Expected: 성공.

```bash
git add src/app/globals.css src/components/ui/
git commit -m "feat(design): 인더스트리얼 디자인 토큰 도입 및 미사용 shadcn 토큰·다크모드 제거

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 3: `@layer components` 시맨틱 클래스 정의

**Files:**
- Modify: `src/app/globals.css`

반복 유틸 체인과 임의값을 흡수할 시맨틱 클래스를 추가한다. 이후 모든 페이지/컴포넌트가 이 어휘를 쓴다.

- [ ] **Step 1: `@layer components` 추가** (`@layer base` 아래에 삽입)

```css
@layer components {
  /* 섹션 컨테이너 */
  .section {
    padding-block: var(--spacing-section);
  }
  .container-page {
    margin-inline: auto;
    max-width: 80rem; /* max-w-7xl */
    padding-inline: 2rem;
  }

  /* eyebrow 라벨 (인더스트리얼 시그니처) */
  .eyebrow {
    font-size: var(--text-eyebrow);
    letter-spacing: var(--text-eyebrow--letter-spacing);
    text-transform: uppercase;
    font-weight: 600;
    color: var(--color-rhistle);
  }

  /* 헤어라인 카드 */
  .card {
    border: 1px solid var(--color-line);
    border-radius: var(--radius-md);
    background: var(--color-surface);
  }
  .card-hover {
    transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
  }
  .card-hover:hover {
    border-color: var(--color-brand-300);
    box-shadow: var(--shadow-raise);
  }

  /* 디바이더 / 그리드 라인 배경 */
  .divider {
    border-top: 1px solid var(--color-line);
  }
  .grid-lines {
    background-image:
      linear-gradient(to right, var(--color-line) 1px, transparent 1px),
      linear-gradient(to bottom, var(--color-line) 1px, transparent 1px);
    background-size: 48px 48px;
  }

  /* 버튼 */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: var(--radius-md);
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  }
  .btn-primary {
    background: var(--color-rhistle);
    color: #fff;
  }
  .btn-primary:hover { background: var(--color-brand-700); }
  .btn-ghost {
    border: 1px solid var(--color-line);
    color: var(--color-ink);
  }
  .btn-ghost:hover { border-color: var(--color-rhistle); color: var(--color-rhistle); }
}
```

- [ ] **Step 2: 검증**

Run: `pnpm exec tsc --noEmit && pnpm biome check ./src 2>&1 | tail -2 && pnpm build 2>&1 | tail -5`
Expected: 성공.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat(design): @layer components 시맨틱 클래스(section/card/eyebrow/btn/grid-lines) 추가

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

# 페이즈 2 — 모션 & UI 프리미티브

### Task 4: MotionProvider (LazyMotion + reduced-motion 전역)

**Files:**
- Create: `src/components/motion/MotionProvider.tsx`
- Modify: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: MotionProvider 작성**

```tsx
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
```

참고: `strict` 모드에서는 `motion.div` 대신 `m.div`(from `motion/react`)를 써야 한다. 이후 모션 컴포넌트는 모두 `m.*`를 사용한다.

- [ ] **Step 2: layout에서 래핑**

`layout.tsx`의 `<NextIntlClientProvider>` 자식 트리를 감싼다. import 추가:
```tsx
import MotionProvider from "@/components/motion/MotionProvider";
```
body 내부를 아래 형태로:
```tsx
<NextIntlClientProvider>
  <MotionProvider>
    <Header />
    {children}
    <Footer />
  </MotionProvider>
</NextIntlClientProvider>
```
(Header/Footer는 Task 9에서 SiteHeader/SiteFooter로 리네임 — 지금은 기존 이름 유지)

- [ ] **Step 3: 검증**

Run: `pnpm exec tsc --noEmit && pnpm build 2>&1 | tail -5`
Expected: 성공.

- [ ] **Step 4: Commit**

```bash
git add src/components/motion/MotionProvider.tsx src/app/[locale]/layout.tsx
git commit -m "feat(motion): LazyMotion+reduced-motion 전역 MotionProvider 도입

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 5: Reveal 리팩터(m.*) + Stagger 프리미티브

**Files:**
- Create: `src/components/motion/Reveal.tsx` (기존 `src/components/Reveal.tsx` 이동·교체)
- Create: `src/components/motion/Stagger.tsx`
- Modify: 기존 `Reveal` import처(추후 Task 11에서 일괄) — 여기선 파일만 신설

> 폴더 이동은 Task 10에서 일괄 처리하지만, `strict` LazyMotion 호환을 위해 Reveal을 `m.*`로 먼저 고친다. 임시로 `src/components/Reveal.tsx`를 그대로 두고 내용만 교체한다(이동은 Task 10).

- [ ] **Step 1: `src/components/Reveal.tsx` 내용 교체 (`m.div` 사용)**

```tsx
"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

const Reveal = ({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) => (
  <m.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </m.div>
);
export default Reveal;
```

- [ ] **Step 2: Stagger 작성 — `src/components/Stagger.tsx`** (Task 10에서 motion/로 이동)

```tsx
"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export const Stagger = ({ children, className }: { children: ReactNode; className?: string }) => (
  <m.div
    className={className}
    variants={container}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
  >
    {children}
  </m.div>
);

export const StaggerItem = ({ children, className }: { children: ReactNode; className?: string }) => (
  <m.div className={className} variants={item}>
    {children}
  </m.div>
);
```

- [ ] **Step 3: 기존 motion.* 직접 사용처를 m.*로 교체**

`strict` 모드에서 `motion.*`는 런타임 에러. 아래 파일들의 `motion` import와 사용을 `m`으로 바꾼다(컴포넌트 로직 동일):
- `src/components/SolutionHero.tsx` (`motion.p/h1` → `m.p/h1`)
- `src/components/FeatureCard.tsx` (`motion.div` → `m.div`)
- `src/components/BenefitCard.tsx` (`motion.div` → `m.div`)
- `src/components/AccordionFeatures.tsx` (`motion.span`, `motion.div`, `AnimatePresence`는 그대로) — `import { AnimatePresence, m } from "motion/react"`

각 파일 import를 `import { m } from "motion/react";` (필요시 `AnimatePresence` 병기)로, JSX의 `motion.` → `m.`.

- [ ] **Step 4: 검증**

Run: `pnpm exec tsc --noEmit && pnpm build 2>&1 | tail -8`
Expected: 성공. (LazyMotion strict + m.* 정합)

- [ ] **Step 5: Commit**

```bash
git add src/components/Reveal.tsx src/components/Stagger.tsx src/components/SolutionHero.tsx src/components/FeatureCard.tsx src/components/BenefitCard.tsx src/components/AccordionFeatures.tsx
git commit -m "refactor(motion): LazyMotion strict 호환 위해 m.* 전환 및 Stagger 추가

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 6: ui/Button

**Files:**
- Create: `src/components/ui/Button.tsx`

페이지마다 흩어진 링크/버튼 인라인 스타일(`rounded-3xl bg-rhistle px-6 py-2 ...`)을 통합. next-intl `Link`와 일반 `a`/`button` 모두 커버하기 위해 `asChild` 대신 단순 variant prop + 자체 엘리먼트 선택.

- [ ] **Step 1: 작성**

```tsx
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "link";

const variantClass: Record<Variant, string> = {
  primary: "btn btn-primary",
  ghost: "btn btn-ghost",
  link: "inline-flex items-center gap-1 font-semibold text-rhistle hover:text-brand-700",
};

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; children: ReactNode };

const Button = ({ variant = "primary", className, children, ...props }: ButtonProps) => (
  <button className={cn(variantClass[variant], className)} {...props}>
    {children}
  </button>
);

export const buttonClass = (variant: Variant = "primary", className?: string) =>
  cn(variantClass[variant], className);

export default Button;
```

> `Link`/`a`에는 `buttonClass(...)`를 `className`으로 적용한다(앵커에 button 스타일 재사용).

- [ ] **Step 2: 검증 + Commit**

Run: `pnpm exec tsc --noEmit && pnpm biome check ./src 2>&1 | tail -2`
Expected: 성공.

```bash
git add src/components/ui/Button.tsx
git commit -m "feat(ui): Button/buttonClass 공용 컴포넌트 추가

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 7: ui/Eyebrow

**Files:**
- Create: `src/components/ui/Eyebrow.tsx`

- [ ] **Step 1: 작성**

```tsx
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <p className={cn("eyebrow", className)}>{children}</p>
);
export default Eyebrow;
```

- [ ] **Step 2: 검증 + Commit**

Run: `pnpm exec tsc --noEmit`
```bash
git add src/components/ui/Eyebrow.tsx
git commit -m "feat(ui): Eyebrow 라벨 컴포넌트 추가

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 8: ui/GridLines

**Files:**
- Create: `src/components/ui/GridLines.tsx`

`SolutionHero`의 인라인 그리드 배경(style 객체)을 재사용 가능한 컴포넌트로. 라이트/다크 표면 모두 대응하도록 `tone` prop.

- [ ] **Step 1: 작성**

```tsx
import { cn } from "@/lib/utils";

/** 인더스트리얼 그리드 라인 오버레이. 부모는 relative여야 함. */
const GridLines = ({
  tone = "light",
  className,
}: {
  tone?: "light" | "onDark";
  className?: string;
}) => (
  <div
    aria-hidden
    className={cn(
      "pointer-events-none absolute inset-0",
      tone === "onDark" ? "opacity-[0.15]" : "opacity-100",
      className,
    )}
    style={{
      backgroundImage:
        tone === "onDark"
          ? "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)"
          : "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
      backgroundSize: "48px 48px",
    }}
  />
);
export default GridLines;
```

- [ ] **Step 2: 검증 + Commit**

Run: `pnpm exec tsc --noEmit && pnpm biome check ./src 2>&1 | tail -2`
```bash
git add src/components/ui/GridLines.tsx
git commit -m "feat(ui): GridLines 인더스트리얼 그리드 오버레이 추가

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 9: CountUp reduced-motion 대응

**Files:**
- Modify: `src/components/CountUp.tsx`

reduced-motion 사용자에겐 카운트 애니메이션을 건너뛰고 최종값을 즉시 표시. 또한 하드코딩된 타이포(`text-7xl md:text-8xl xl:text-9xl`)를 `text-display`로 토큰화.

- [ ] **Step 1: 교체**

```tsx
"use client";

import { useEffect, useState } from "react";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const CountUp = ({ end, duration }: { end: number; duration: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (prefersReduced()) {
      setCount(end);
      return;
    }
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <p className="font-bold text-display">{count}</p>;
};
export default CountUp;
```

- [ ] **Step 2: 검증 + Commit**

Run: `pnpm exec tsc --noEmit`
```bash
git add src/components/CountUp.tsx
git commit -m "feat(motion): CountUp reduced-motion 대응 및 타이포 토큰화

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

# 페이즈 3 — 폴더 재배치 & 리네임

> 원칙: `git mv`로 이동 → export 이름 변경 → 전 import 경로 갱신 → `tsc`로 회귀 확인. 한 그룹 이동마다 커밋. import 경로 일괄 치환은 `grep -rl`로 대상 찾고 편집한다.

### Task 10: motion/ 그룹 이동

**Files:**
- `git mv src/components/Reveal.tsx src/components/motion/Reveal.tsx`
- `git mv src/components/Stagger.tsx src/components/motion/Stagger.tsx`
- `git mv src/components/CountUp.tsx src/components/motion/CountUp.tsx`
- (MotionProvider는 Task 4에서 이미 motion/에 생성)
- Modify: import 경로 사용처

- [ ] **Step 1: 이동**

```bash
mkdir -p src/components/motion
git mv src/components/Reveal.tsx src/components/motion/Reveal.tsx
git mv src/components/Stagger.tsx src/components/motion/Stagger.tsx
git mv src/components/CountUp.tsx src/components/motion/CountUp.tsx
```

- [ ] **Step 2: import 경로 갱신**

- `Stats.tsx`: `import CountUp from "./CountUp";` → `import CountUp from "./motion/CountUp";`
- `@/components/Reveal` 사용처 전부 → `@/components/motion/Reveal`:

Run: `grep -rl "components/Reveal\"" src`
각 파일에서 `@/components/Reveal` → `@/components/motion/Reveal` 치환.

- [ ] **Step 3: 검증 + Commit**

Run: `pnpm exec tsc --noEmit && pnpm build 2>&1 | tail -5`
```bash
git add -A
git commit -m "refactor(structure): motion 컴포넌트를 components/motion으로 이동

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 11: layout/ 그룹 이동 + 리네임 (Header→SiteHeader 등)

**Files:**
- `Header.tsx → layout/SiteHeader.tsx`, `Footer.tsx → layout/SiteFooter.tsx`, `DrawerMenu.tsx → layout/MobileNav.tsx`, `LocaleSwitcher.tsx → layout/LocaleSwitcher.tsx`, `ScrollToTop.tsx → layout/ScrollToTopButton.tsx`
- Modify: `layout.tsx`, 상호 import

- [ ] **Step 1: 이동 + 내부 export/컴포넌트명 변경**

```bash
mkdir -p src/components/layout
git mv src/components/Header.tsx src/components/layout/SiteHeader.tsx
git mv src/components/Footer.tsx src/components/layout/SiteFooter.tsx
git mv src/components/DrawerMenu.tsx src/components/layout/MobileNav.tsx
git mv src/components/LocaleSwitcher.tsx src/components/layout/LocaleSwitcher.tsx
git mv src/components/ScrollToTop.tsx src/components/layout/ScrollToTopButton.tsx
```
각 파일에서 `const Header`→`const SiteHeader`, `export default Header`→`export default SiteHeader` 등 컴포넌트 식별자 변경(파일별 새 이름에 맞춤).

- [ ] **Step 2: 상호 import 갱신**
- `SiteHeader.tsx`: `import DrawerMenu from "./DrawerMenu"` → `import MobileNav from "./MobileNav"`(+ JSX `<DrawerMenu/>`→`<MobileNav/>`), `import LocaleSwitcher from "./LocaleSwitcher"`(경로 동일).
- `layout.tsx`: `import Header from "@/components/Header"` → `import SiteHeader from "@/components/layout/SiteHeader"`, Footer/ScrollToTop 동일하게. JSX `<Header/>`→`<SiteHeader/>`, `<Footer/>`→`<SiteFooter/>`, `<ScrollToTop/>`→`<ScrollToTopButton/>`.

- [ ] **Step 3: 검증 + Commit**

Run: `pnpm exec tsc --noEmit && pnpm build 2>&1 | tail -5`
```bash
git add -A
git commit -m "refactor(structure): 레이아웃 컴포넌트 이동·리네임(SiteHeader/SiteFooter/MobileNav/ScrollToTopButton)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 12: ui/ 그룹 이동 + 리네임 (SectionHeading, FeatureAccordion)

**Files:**
- `SectionHeading.tsx → ui/SectionHeading.tsx`
- `AccordionFeatures.tsx → ui/FeatureAccordion.tsx` (컴포넌트명 `AccordionFeatures`→`FeatureAccordion`)
- Modify: 사용처(solutions 3종)

- [ ] **Step 1: 이동/리네임**

```bash
git mv src/components/SectionHeading.tsx src/components/ui/SectionHeading.tsx
git mv src/components/AccordionFeatures.tsx src/components/ui/FeatureAccordion.tsx
```
`FeatureAccordion.tsx` 내부 `const AccordionFeatures`→`const FeatureAccordion`, export 동일 변경.

- [ ] **Step 2: import 갱신**

Run: `grep -rl "AccordionFeatures\|components/SectionHeading" src`
대상(corecode/lx/vx page): `import AccordionFeatures from "@/components/AccordionFeatures"` → `import FeatureAccordion from "@/components/ui/FeatureAccordion"`, JSX `<AccordionFeatures`→`<FeatureAccordion`. `SectionHeading` 경로 `@/components/SectionHeading`→`@/components/ui/SectionHeading`.

- [ ] **Step 3: 검증 + Commit**

Run: `pnpm exec tsc --noEmit && pnpm build 2>&1 | tail -5`
```bash
git add -A
git commit -m "refactor(structure): SectionHeading·FeatureAccordion을 ui로 이동·리네임

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 13: cards/ 그룹 이동 + forms/ 이동

**Files:**
- `FeatureCard.tsx → cards/FeatureCard.tsx`, `BenefitCard.tsx → cards/BenefitCard.tsx`
- `ContactForm.tsx → forms/ContactForm.tsx`
- (IndustryCard/ValueCard는 Task 19 company 리디자인에서 신설)
- Modify: 사용처

- [ ] **Step 1: 이동**

```bash
mkdir -p src/components/cards src/components/forms
git mv src/components/FeatureCard.tsx src/components/cards/FeatureCard.tsx
git mv src/components/BenefitCard.tsx src/components/cards/BenefitCard.tsx
git mv src/components/ContactForm.tsx src/components/forms/ContactForm.tsx
```

- [ ] **Step 2: import 갱신**

Run: `grep -rl "components/FeatureCard\|components/BenefitCard\|components/ContactForm" src`
- solutions pages: `@/components/FeatureCard`→`@/components/cards/FeatureCard`, `@/components/BenefitCard`→`@/components/cards/BenefitCard`.
- contact page: `@/components/ContactForm`→`@/components/forms/ContactForm`.

- [ ] **Step 3: 검증 + Commit**

Run: `pnpm exec tsc --noEmit && pnpm build 2>&1 | tail -5`
```bash
git add -A
git commit -m "refactor(structure): 카드/폼 컴포넌트를 cards·forms 폴더로 이동

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 14: sections/ 그룹 이동 + 리네임 (Stats→StatsBand 등)

**Files:**
- `Stats.tsx → sections/StatsBand.tsx`, `History.tsx → sections/CompanyHistory.tsx`, `CallToAction.tsx → sections/CtaBand.tsx`, `SolutionHero.tsx → sections/SolutionHero.tsx`, `Banner.tsx → sections/PageHero.tsx`, `ScrollDown.tsx → sections/ScrollDown.tsx`
- Modify: 사용처

- [ ] **Step 1: 이동 + 내부 리네임**

```bash
mkdir -p src/components/sections
git mv src/components/Stats.tsx src/components/sections/StatsBand.tsx
git mv src/components/History.tsx src/components/sections/CompanyHistory.tsx
git mv src/components/CallToAction.tsx src/components/sections/CtaBand.tsx
git mv src/components/SolutionHero.tsx src/components/sections/SolutionHero.tsx
git mv src/components/Banner.tsx src/components/sections/PageHero.tsx
git mv src/components/ScrollDown.tsx src/components/sections/ScrollDown.tsx
```
내부 식별자 변경: `Stats`→`StatsBand`, `History`→`CompanyHistory`, `CallToAction`→`CtaBand`, `Banner`→`PageHero`(컴포넌트·export). `SolutionHero`/`ScrollDown`은 이름 유지.

- [ ] **Step 2: import 갱신** (사용처)
- `page.tsx`(home): `Stats`→`sections/StatsBand`(+`<Stats/>`→`<StatsBand/>`), `CallToAction`→`sections/CtaBand`(`<CallToAction`→`<CtaBand`), `ScrollDown`→`sections/ScrollDown`.
- `company/page.tsx`: `SolutionHero`→`sections/SolutionHero`, `History`→`sections/CompanyHistory`(`<History/>`→`<CompanyHistory/>`), `CallToAction`→`sections/CtaBand`.
- `contact/page.tsx`: `Banner`→`sections/PageHero`(`<Banner`→`<PageHero`).
- `solutions/*`: `SolutionHero`→`sections/SolutionHero`, `CallToAction`→`sections/CtaBand`.

Run: `grep -rln "components/Stats\"\|components/History\|components/CallToAction\|components/SolutionHero\|components/Banner\|components/ScrollDown" src`로 누락 확인.

- [ ] **Step 3: 검증 + Commit**

Run: `pnpm exec tsc --noEmit && pnpm build 2>&1 | tail -5`
Expected: 성공. `grep -rn "from \"@/components/[A-Z]" src` 결과가 0(모든 컴포넌트가 하위 폴더로 이동됨; ui/cards/etc 제외) — 잔존 평면 import 없는지 확인.

```bash
git add -A
git commit -m "refactor(structure): 섹션 컴포넌트 이동·리네임(StatsBand/CompanyHistory/CtaBand/PageHero)

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 15: 페이지 컴포넌트 PascalCase 리네임

**Files:**
- Modify: `src/app/[locale]/page.tsx`, `company/page.tsx`, `contact/page.tsx`, `solutions/{corecode,lx,vx}/page.tsx`

각 파일의 `const page = () => {...}; export default page;`를 의미 있는 PascalCase로.

- [ ] **Step 1: 리네임**
- home `page.tsx`: `const HomePage` / `export default HomePage`
- company: `CompanyPage`
- contact: `ContactPage`
- corecode: `CoreCodePage`
- lx: `NexummLxPage`
- vx: `NexummVxPage`

(default export면 Next.js 라우팅에 영향 없음. 이름만 변경)

- [ ] **Step 2: 검증 + Commit**

Run: `pnpm exec tsc --noEmit && pnpm build 2>&1 | tail -5`
```bash
git add -A
git commit -m "refactor(structure): 페이지 컴포넌트 PascalCase 리네임

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

# 페이즈 4 — SEO 기반

### Task 16: lib/seo.ts 메타데이터 빌더 + JSON-LD 제거

**Files:**
- Create: `src/lib/seo.ts`
- Create: `src/lib/seo.test.mjs` (경량 검증 스크립트)
- Modify: `src/app/[locale]/layout.tsx`, 각 페이지의 `generateMetadata`

- [ ] **Step 1: seo.ts 작성**

```ts
import type { Metadata } from "next";

export const SITE_URL = "https://rhistle.com";
export const SITE_NAME = "rhistle.com";

/** 로케일별 절대 경로(canonical) 생성. ko는 prefix 없음(as-needed). */
export function localizedPath(locale: string, path = ""): string {
  const base = locale === "ko" ? SITE_URL : `${SITE_URL}/${locale}`;
  return path ? `${base}${path}` : base;
}

/** hreflang alternates. */
export function languageAlternates(path = "") {
  return {
    canonical: localizedPath("ko", path) === SITE_URL && path === "" ? SITE_URL : localizedPath("ko", path),
    languages: {
      ko: `${SITE_URL}${path}`,
      en: `${SITE_URL}/en${path}`,
      "x-default": `${SITE_URL}${path}`,
    },
  };
}

/** 페이지 metadata 공통 빌더. */
export function buildMetadata(params: {
  locale: string;
  path?: string;
  title: string;
  description: string;
}): Metadata {
  const { locale, path = "", title, description } = params;
  const url = localizedPath(locale, path);
  return {
    title,
    description,
    alternates: languageAlternates(path),
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
```

- [ ] **Step 2: 검증 스크립트 작성 — `src/lib/seo.test.mjs`**

```js
// 순수 로직 경량 검증 (node 직접 실행)
import assert from "node:assert";
import { languageAlternates, localizedPath } from "./seo.ts";

assert.equal(localizedPath("ko", "/company"), "https://rhistle.com/company");
assert.equal(localizedPath("en", "/company"), "https://rhistle.com/en/company");
assert.equal(localizedPath("ko"), "https://rhistle.com");

const alt = languageAlternates("/contact");
assert.equal(alt.languages.en, "https://rhistle.com/en/contact");
assert.equal(alt.languages["x-default"], "https://rhistle.com/contact");

console.log("seo.ts ok");
```

- [ ] **Step 3: 실행**

Run: `pnpm exec tsx src/lib/seo.test.mjs 2>/dev/null || node --experimental-strip-types src/lib/seo.test.mjs`
Expected: `seo.ts ok`
(tsx 미설치 시 `node --experimental-strip-types` 사용. 둘 다 실패하면 `.ts` 임포트를 `localizedPath`/`languageAlternates` 로직을 인라인 복제해 확인 후 스크립트 삭제 — 로직 검증이 목적)

- [ ] **Step 4: layout.tsx 적용 + JSON-LD 제거**

- `generateMetadata`를 `buildMetadata` 기반으로 교체하되 root는 title template 유지:
```tsx
import { buildMetadata, languageAlternates, SITE_NAME, SITE_URL } from "@/lib/seo";
// ...
const t = await getTranslations({ locale, namespace: "home" });
const base = buildMetadata({ locale, title: t("title"), description: t("description") });
return {
  ...base,
  title: { default: t("title"), template: `%s | ${t("title")}` },
};
```
- `<head>`의 `<script type="application/ld+json" ...>` 및 `jsonLd` 변수, 관련 `getTranslations({namespace:"footer"})`(JSON-LD 전용이면) 제거.
- `noDangerouslySetInnerHTML` 경고 해소 확인.

- [ ] **Step 5: 각 페이지 generateMetadata를 buildMetadata로 교체**

예시(`company/page.tsx`):
```tsx
import { buildMetadata } from "@/lib/seo";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "company" });
  return buildMetadata({ locale, path: "/company", title: t("title"), description: t("description") });
}
```
동일 패턴 적용 — contact(`path:"/contact"`), corecode(`path:"/solutions/corecode"`, namespace `corecode`), lx(`path:"/solutions/lx"`, `t("lx.title")`/`t("lx.description")`, namespace `nexumm`), vx(`path:"/solutions/vx"`, `t("vx.*")`).

- [ ] **Step 6: 검증 + Commit**

Run: `pnpm exec tsc --noEmit && pnpm biome check ./src 2>&1 | tail -2 && pnpm build 2>&1 | tail -5`
Expected: biome 에러 0(noDangerouslySetInnerHTML 사라짐), 빌드 성공.

```bash
git add src/lib/seo.ts src/app/[locale]/layout.tsx src/app/[locale]/**/page.tsx
git commit -m "feat(seo): metadata 빌더(hreflang/OG/twitter) 도입 및 JSON-LD 제거

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

(seo.test.mjs는 커밋하지 않거나 `git rm` — 일회성 검증)

---

### Task 17: 동적 OG 이미지 (next/og)

**Files:**
- Create: `src/app/[locale]/opengraph-image.tsx`
- Modify: 기존 정적 OG 참조 제거(이미 Task 16에서 openGraph.images 미설정 → 동적 이미지가 자동 사용)

- [ ] **Step 1: opengraph-image.tsx 작성**

```tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RHISTLE";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        background: "linear-gradient(135deg, #1428a0 0%, #070d3d 100%)",
        color: "#fff",
      }}
    >
      <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: "-0.03em" }}>RHISTLE</div>
      <div style={{ fontSize: 40, marginTop: 24, opacity: 0.8 }}>
        Manufacturing Intelligence Solutions
      </div>
      {/* 그리드 라인 모티프 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>,
    { ...size },
  );
}
```

> Audiowide 폰트를 OG에 넣고 싶으면 `fetch`로 woff 로드 후 `fonts` 옵션에 전달. 1차는 시스템 폰트로 충분(YAGNI). 카피 문구는 `home.description` 기조에 맞춰 조정.

- [ ] **Step 2: 검증**

Run: `pnpm build 2>&1 | tail -8`
Expected: 빌드 성공. `.next` 라우트에 `opengraph-image` 생성.

Run(선택, 수동): `pnpm start` 후 `http://localhost:3000/opengraph-image` 200 + PNG 확인.

- [ ] **Step 3: 정적 OG 파일 정리(선택)**

`public/image/og-rhistle.png`·`og-image.png`가 다른 곳에서 참조되지 않으면 삭제:
Run: `grep -rn "og-rhistle\|og-image" src`
- 매치 없음 → `git rm public/image/og-rhistle.png public/image/og-image.png`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(seo): next/og 동적 OG 이미지 추가 및 정적 OG 정리

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 18: sitemap/robots 점검

**Files:**
- Modify: `src/app/sitemap.ts` (필요 시)

- [ ] **Step 1: sitemap에 hreflang alternates 추가**

각 URL에 `alternates.languages` 부여로 ko/en 상호 연결:
```ts
import type { MetadataRoute } from "next";

const host = "https://rhistle.com";
const hrefs = ["", "/company", "/contact", "/solutions/corecode", "/solutions/lx", "/solutions/vx"];

export default function sitemap(): MetadataRoute.Sitemap {
  return hrefs.map((href) => ({
    url: `${host}${href}`,
    lastModified: new Date().toISOString(),
    alternates: {
      languages: {
        ko: `${host}${href}`,
        en: `${host}/en${href}`,
      },
    },
  }));
}
```

- [ ] **Step 2: 검증 + Commit**

Run: `pnpm exec tsc --noEmit && pnpm build 2>&1 | tail -5`
```bash
git add src/app/sitemap.ts
git commit -m "feat(seo): sitemap에 ko/en hreflang alternates 추가

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

# 페이즈 5 — 페이지 리디자인

> 공통 원칙(모든 페이지 태스크에 적용):
> - 카드: `rounded-3xl ... shadow-sm` → `.card`(+필요 시 `.card-hover`). 임의 그림자/라운드 제거.
> - 섹션 래퍼: `mx-auto max-w-7xl px-8 py-XX` 반복 → `.container-page` + `.section`(또는 `py-[var(--spacing-section)]`).
> - eyebrow 라벨: 인라인 `font-semibold text-rhistle text-sm uppercase tracking-widest` → `<Eyebrow>`.
> - 헤딩 타이포: `text-3xl md:text-4xl xl:text-5xl` 반복 → `text-h2`(섹션 제목)/`text-h1`/`text-display`.
> - 임의 색: `text-gray-500/600` → `text-steel`/`text-graphite`, `bg-blue-50`/`border-blue-100` → `bg-brand-50`/`border-brand-100`, `#070d3d` → `brand-900`.
> - 진입 애니메이션: 카드 그리드는 `<Stagger>`+`<StaggerItem>`로 순차 등장. 큰 블록은 `<Reveal>`.
> - 버튼/링크: 인라인 → `<Button>` 또는 `buttonClass(...)`.
> - 반응형: 모바일 1열 기본 → `sm`/`md`/`lg` 단계 확장. 터치 타깃 ≥44px.
> - 시맨틱: 페이지당 단일 `<h1>`, 섹션 제목은 `<h2>`, landmark 유지.

### Task 19: Company 페이지 리디자인 + IndustryCard/ValueCard 추출

**Files:**
- Create: `src/components/cards/IndustryCard.tsx`, `src/components/cards/ValueCard.tsx`
- Modify: `src/app/[locale]/company/page.tsx`, `src/components/sections/CompanyHistory.tsx`

- [ ] **Step 1: intro 시맨틱 교정**

현재 `<h1>` 안에 `<p>`/`<span>` block 중첩(잘못된 마크업). `<h1>`은 한 줄 핵심 문구만, 나머지는 `<p>`로 분리:
```tsx
<section className="section break-keep text-center">
  <h1 className="text-display font-extrabold">
    <span className="text-rhistle">RHISTLE</span> {t("intro.line1")}
  </h1>
  <p className="mt-6 text-h2 font-bold text-graphite">
    {t("intro.line2")} {t("intro.line3")} <span className="text-rhistle">{t("intro.line4")}</span>{t("intro.line5")}
  </p>
  <p className="mt-4 text-lg text-steel">{t("intro.sub")} {t("intro.sub2")}</p>
</section>
```
(줄바꿈은 반응형에서 자연스러운 wrap에 맡기고 `<br/>` 남용 제거. break-keep 유지)

- [ ] **Step 2: IndustryCard 추출**

`company/page.tsx`의 industries 반복 블록(좌: 타이틀/포커스, 우: 서비스 스코프)을 컴포넌트로:
```tsx
import type { ComponentType } from "react";
import type { LucideProps } from "lucide-react";

const IndustryCard = ({
  Icon, title, engTitle, keyFocusLabel, focus, serviceScopeLabel, projects,
}: {
  Icon: ComponentType<LucideProps>;
  title: string; engTitle: string; keyFocusLabel: string; focus: string;
  serviceScopeLabel: string; projects: string[];
}) => (
  <div className="card card-hover grid grid-cols-1 gap-6 p-8 md:grid-cols-2 md:gap-10">
    <div className="space-y-4">
      <span className="inline-flex rounded-md bg-brand-50 p-4">
        <Icon className="size-10 text-rhistle" aria-hidden />
      </span>
      <div>
        <h3 className="text-h3 font-bold">{title}</h3>
        <p className="eyebrow">{engTitle}</p>
      </div>
      <div>
        <p className="font-bold text-mist">{keyFocusLabel}</p>
        <p className="break-keep text-graphite leading-snug">{focus}</p>
      </div>
    </div>
    <div className="space-y-3 md:border-line md:border-l md:pl-10">
      <p className="font-bold text-mist tracking-widest">{serviceScopeLabel}</p>
      <ul className="space-y-3">
        {projects.map((p) => (
          <li key={p} className="flex items-center gap-3 break-keep text-graphite">
            <span className="size-1.5 shrink-0 rounded-full bg-rhistle" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
export default IndustryCard;
```
페이지에선 `industries.map`을 `<Stagger>` 안에서 `<StaggerItem><IndustryCard .../></StaggerItem>`로 렌더. 아이콘은 기존 `item.icon`(Cpu 등) 전달.

- [ ] **Step 3: ValueCard 추출**

values(vision/mission/coreValues) 블록을 `bg-blue-50` 박스 → 헤어라인 + 좌측 브랜드 바 카드로:
```tsx
import type { ComponentType, ReactNode } from "react";
import type { LucideProps } from "lucide-react";

const ValueCard = ({ Icon, label, children }: {
  Icon: ComponentType<LucideProps>; label: string; children: ReactNode;
}) => (
  <div className="card relative overflow-hidden p-8 md:p-10">
    <Icon className="absolute right-0 bottom-0 size-32 text-brand-50" aria-hidden />
    <h3 className="flex items-center gap-3 font-bold text-rhistle">
      <span className="h-7 w-1.5 rounded-full bg-rhistle" />
      {label}
    </h3>
    <div className="relative mt-4 space-y-4 text-graphite text-lg leading-relaxed">{children}</div>
  </div>
);
export default ValueCard;
```
페이지에서 vision/mission은 `<ValueCard label="Vision">{t(...)}</ValueCard>`, coreValues는 children에 기존 `coreValueItems.map(...)` 렌더.

- [ ] **Step 4: CompanyHistory 다듬기**

`text-gray-500/600` → `text-steel/graphite`, `text-xl` 헤딩 → `text-h2`, 좌측 타임라인 라벨에 `<Eyebrow>`. 연혁 항목에 좌측 1px 라인 모티프(`border-line border-l pl-6` + 마커) 추가. 모바일 비스티키 유지(기존 `md:sticky`).

- [ ] **Step 5: 검증**

Run: `pnpm exec tsc --noEmit && pnpm biome check ./src 2>&1 | tail -2 && pnpm build 2>&1 | tail -5`
Expected: 성공. 단일 h1 확인: `grep -c "<h1" src/app/[locale]/company/page.tsx` → 1.

- [ ] **Step 6: 반응형 육안 확인 + Commit**

`pnpm dev` 후 /company를 360/768/1024/1440에서 확인(카드 1→2열 전환, 오버플로 없음).
```bash
git add -A
git commit -m "feat(company): IndustryCard/ValueCard 추출 및 인더스트리얼 리디자인·시맨틱 교정

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 20: Home 페이지 리디자인 + 섹션 추출(BusinessCases/SolutionShowcase/PartnerGrid)

**Files:**
- Create: `src/components/sections/BusinessCases.tsx`, `SolutionShowcase.tsx`, `PartnerGrid.tsx`
- Modify: `src/app/[locale]/page.tsx`, `src/components/sections/StatsBand.tsx`

- [ ] **Step 1: BusinessCases 추출** (home의 cases 섹션)

데이터(`cases`)와 마크업을 `sections/BusinessCases.tsx`로 이동. 카드를 `.card`로, Case 번호를 인덱스 타이포(`font-audiowide text-rhistle`)로, Challenge/Solutions/Results를 정돈된 그리드로. `<Stagger>`로 카드 순차 등장. `useTranslations("home")`는 컴포넌트 내부에서 호출.

```tsx
"use client";
import { useTranslations } from "next-intl";
import Eyebrow from "@/components/ui/Eyebrow";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const cases = [{ id: "Case 01" }, { id: "Case 02" }, { id: "Case 03" }, { id: "Case 04" }];

const BusinessCases = () => {
  const t = useTranslations("home");
  return (
    <section className="container-page section">
      <div className="space-y-4">
        <Eyebrow>Business Cases</Eyebrow>
        <h2 className="text-h1 font-bold break-keep">{t("business.title")}</h2>
      </div>
      <Stagger className="mt-16 grid gap-8 lg:grid-cols-2">
        {cases.map((item) => (
          <StaggerItem key={item.id} className="card card-hover h-full space-y-8 p-8">
            {/* 기존 article 내용: Case 번호 audiowide, challenge/solutions/results/benefits */}
            {/* text-gray-500 → text-steel, 색/타이포 토큰화 */}
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );
};
export default BusinessCases;
```
(기존 `page.tsx`의 cases article 내부 JSX를 그대로 옮기되 클래스만 토큰화. `home.business.${id}.*` 키 유지)

- [ ] **Step 2: SolutionShowcase 추출** (home의 solutions 좌우 교차 섹션)

`solutions` 배열 + 이미지 import를 `SolutionShowcase.tsx`로. 좌우 교차 레이아웃 유지, 이미지 `.card overflow-hidden` + hover 줌(`transition-transform hover:scale-105`를 이미지에). `Button variant="link"`로 goto 링크. 큰 블록은 `<Reveal>`.

- [ ] **Step 3: PartnerGrid 추출** (home의 partners 섹션)

`partners` 배열 + 이미지 import 이동. 로고 `grayscale hover:grayscale-0 transition` + 균일 그리드(모바일 2열 → `md:grid-cols-4`). `<Stagger>` 적용.

- [ ] **Step 4: HomePage 슬림화 + 히어로 다듬기**

`page.tsx`는 히어로(비디오) + `<StatsBand/>` + `<BusinessCases/>` + `<SolutionShowcase/>` + `<PartnerGrid/>` + `<CtaBand/>`만 남겨 얇게. 히어로:
- 타이틀 `<h1>` 단일화(현재 `<h1>`+`<h2>` → `<h1>` + `<p>`).
- `GridLines tone="onDark"` 오버레이 추가.
- 타이틀 스태거 등장(`<Stagger>`/`<StaggerItem>`, 절제).
- 이미지/비디오 import는 각 섹션 컴포넌트로 이동했으므로 page에서 제거.

- [ ] **Step 5: StatsBand 다듬기**

`text-gray-...`/`text-blue-400` → 토큰(`text-brand-300` 등), 헤딩 `text-h1`, eyebrow(`Since 2005`) `<Eyebrow>`. `bg-linear-to-b from-black to-rhistle` 유지(브랜드 그라디언트). CountUp는 이미 reduced-motion 대응.

- [ ] **Step 6: 검증**

Run: `pnpm exec tsc --noEmit && pnpm biome check ./src 2>&1 | tail -2 && pnpm build 2>&1 | tail -5`
Expected: 성공. `grep -c "<h1" src/app/[locale]/page.tsx` → 1.

- [ ] **Step 7: 반응형 육안 + Commit**

/ 를 360/768/1024/1440 확인(히어로 텍스트 스케일, 파트너 2→4열, 케이스 1→2열).
```bash
git add -A
git commit -m "feat(home): 섹션 컴포넌트 추출(BusinessCases/SolutionShowcase/PartnerGrid) 및 인더스트리얼 리디자인

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 21: Contact 페이지 리디자인 (아이콘화 + 폼 정비)

**Files:**
- Modify: `src/app/[locale]/contact/page.tsx`, `src/components/forms/ContactForm.tsx`

- [ ] **Step 1: 연락처 블록 이모지→lucide 아이콘**

`📍📧📞` → `MapPin`/`Mail`/`Phone`(lucide-react). 각 항목을 `.divider`로 구분된 리스트로, 아이콘 래퍼 `bg-brand-50 text-rhistle rounded-md`:
```tsx
import { Mail, MapPin, Phone } from "lucide-react";
// ...
<ul className="divide-y divide-line">
  <li className="flex items-center gap-4 py-4">
    <span className="flex size-10 items-center justify-center rounded-md bg-brand-50 text-rhistle">
      <MapPin className="size-5" aria-hidden />
    </span>
    <span className="text-graphite">{t("intro.address")}</span>
  </li>
  {/* Mail: contact@rhistle.com, Phone: 02-3018-5114 */}
</ul>
```
헤딩 `text-5xl` → `text-h1`, `text-slate-*` → 토큰. 단일 `<h1>`(Contact RHISTLE)만, 페이지 다른 제목은 `<h2>`.

- [ ] **Step 2: ContactForm 토큰화 + 접근성**

- 입력 필드: `bg-gray-100 rounded-xl` → `bg-surface-2 rounded-md border border-line`, focus `focus:ring-2 focus:ring-rhistle` 유지(브랜드).
- 각 input에 `aria-label`(placeholder만 있으므로) 추가 또는 시각적 라벨. 최소 `aria-label={t("name")}` 등.
- submit 버튼 `rounded-xl` → `.btn .btn-primary w-full`(disabled 시 스타일 분기 유지), `buttonClass` 재사용 가능.
- 카드 래퍼 `rounded-3xl ... shadow-sm` → `.card p-8`.
- 상태 메시지 `text-green-600/red-500` 유지(시맨틱 색), `role="status"`/`aria-live="polite"` 부여.

- [ ] **Step 3: 검증**

Run: `pnpm exec tsc --noEmit && pnpm biome check ./src 2>&1 | tail -2 && pnpm build 2>&1 | tail -5`
Expected: 성공. 단일 h1 확인.

- [ ] **Step 4: 반응형 육안 + Commit**

/contact 360/768/1024 확인(2열→1열, 폼 입력 터치 타깃).
```bash
git add -A
git commit -m "feat(contact): 연락처 아이콘화·폼 토큰화 및 접근성(aria) 보강

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 22: Solutions 3종 리디자인 (공유 컴포넌트 다듬기)

**Files:**
- Modify: `src/components/sections/SolutionHero.tsx`, `src/components/cards/FeatureCard.tsx`, `src/components/cards/BenefitCard.tsx`, `src/components/ui/FeatureAccordion.tsx`, `src/components/ui/SectionHeading.tsx`
- Modify: `src/app/[locale]/solutions/{corecode,lx,vx}/page.tsx`

세 페이지가 동일 컴포넌트를 공유하므로 컴포넌트를 한 번 다듬으면 일관 적용된다.

- [ ] **Step 1: SolutionHero 토큰화**

- 인라인 그리드 배경 style → `<GridLines tone="onDark" />`.
- `from-[#070d3d]/85 ...`·gradient prop 기본값의 `#1428a0/#0f1f7a/#070d3d` → `from-brand-900/85 via-brand-700/65 ...`, gradient 기본값 `from-rhistle via-brand-700 to-brand-900`.
- 코드 타이포 `text-5xl ... xl:text-9xl` 유지(Audiowide 시그니처)하되 `name` eyebrow를 `eyebrow` 클래스로.

- [ ] **Step 2: FeatureCard/BenefitCard 토큰화**

- `rounded-3xl border border-gray-100 ... shadow-sm hover:shadow-xl` → `.card .card-hover`.
- 아이콘 래퍼 `rounded-2xl bg-rhistle/10` → `rounded-md bg-brand-50`, badge `rounded-full bg-rhistle` 유지.
- BenefitCard `from-white to-rhistle/5` 그라디언트 → `.card` + 상단 1px 브랜드 악센트(`border-t-2 border-rhistle` 옵션) 또는 평평한 헤어라인.
- `text-gray-600` → `text-graphite`. hover `whileHover={{ y: -6 }}`는 reduced-motion에서 MotionConfig가 자동 무력화.

- [ ] **Step 3: FeatureAccordion/SectionHeading 토큰화**

- Accordion: `rounded-3xl border ...` → `.card`, 활성 `border-rhistle/30 bg-rhistle/5` → `border-rhistle bg-brand-50`. 번호 `text-rhistle/30` → `text-mist`.
- SectionHeading: 인라인 eyebrow → `<Eyebrow>`, 제목 `text-3xl md:text-4xl xl:text-5xl` → `text-h2`, 설명 `text-gray-600` → `text-graphite`.

- [ ] **Step 4: 솔루션 페이지 래퍼 토큰화**

각 페이지 `mx-auto max-w-7xl space-y-28 px-8 py-24` → `container-page` + 섹션 간격 토큰. highlights/applications 인라인 카드(`rounded-3xl border border-gray-100 ... shadow-sm`) → `.card`. `<Reveal>` 유지, 카드 그리드는 가능하면 `<Stagger>`.

- [ ] **Step 5: 검증**

Run: `pnpm exec tsc --noEmit && pnpm biome check ./src 2>&1 | tail -2 && pnpm build 2>&1 | tail -8`
Expected: 성공. 각 솔루션 페이지 단일 h1(SolutionHero의 code가 h1) 확인: `grep -rc "<h1\|motion.h1\|m.h1" src/components/sections/SolutionHero.tsx`.

- [ ] **Step 6: 반응형 육안 + Commit**

/solutions/corecode·lx·vx 360/768/1024/1440 확인(카드 1→2→3열, 아코디언, 히어로 코드 타이포).
```bash
git add -A
git commit -m "feat(solutions): 공유 컴포넌트·3종 페이지 인더스트리얼 토큰화 및 stagger 적용

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 23: SiteHeader / MobileNav / CtaBand / PageHero / ScrollDown 토큰화

**Files:**
- Modify: `src/components/layout/SiteHeader.tsx`, `layout/MobileNav.tsx`, `layout/ScrollToTopButton.tsx`, `sections/CtaBand.tsx`, `sections/PageHero.tsx`, `sections/ScrollDown.tsx`, `layout/LocaleSwitcher.tsx`, `ui/drawer.tsx`(필요 시)

레이아웃/공용 요소의 임의 색·라운드·반복 유틸 정리.

- [ ] **Step 1: SiteHeader**

- 솔루션 드롭다운 `rounded-xl shadow-lg` → `.card shadow-raise`, 링크 hover 색 `text-rhistle`. `text-gray-...` → 토큰.
- contact 버튼 `rounded-4xl bg-gray-200/500` → `buttonClass("ghost")` 또는 토큰 기반. 데스크톱/모바일 분기 유지.
- 헤더 스크롤 보더 `border-gray-200` → `border-line`.

- [ ] **Step 2: MobileNav**

- `bg-black text-gray-800` 등 → 토큰(`bg-ink`). hover `bg-gray-900` → `bg-graphite/20`. 링크 터치 타깃 유지(py-4).
- `ui/drawer.tsx`가 삭제된 shadcn 토큰을 참조하면(`bg-background` 등) `bg-surface`/`text-ink`로 교체.

- [ ] **Step 3: CtaBand / PageHero / ScrollDown / ScrollToTopButton / LocaleSwitcher**

- CtaBand: 버튼 `rounded-3xl bg-rhistle` → `buttonClass("primary")`, `border-gray-200` → `border-line`.
- PageHero(구 Banner): `alt="company-banner"`(고정) → 의미 있는 alt 또는 `alt=""`(장식)+ 제목이 텍스트로 존재하므로 `alt=""` 적절. `brightness-70` 유지.
- ScrollDown/ScrollToTopButton: 임의 색 토큰화, 기능 유지.
- LocaleSwitcher: 드롭다운 `rounded border` → `.card`, 버튼 터치 타깃 확보.

- [ ] **Step 4: 검증**

Run: `pnpm exec tsc --noEmit && pnpm biome check ./src 2>&1 | tail -2 && pnpm build 2>&1 | tail -5`
Expected: 성공.

- [ ] **Step 5: 반응형 육안 + Commit**

헤더/모바일 드로어/CTA를 360/768/1024 확인.
```bash
git add -A
git commit -m "feat(layout): 헤더·모바일내비·CTA·히어로 등 공용 요소 토큰화

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

# 페이즈 6 — 최종 검증 & 정리

### Task 24: 임의값/잔존 정리 스윕

**Files:** 전역(grep 기반)

- [ ] **Step 1: 잔존 임의값 탐지**

Run: `grep -rnE "\[#[0-9a-fA-F]{3,8}\]|top-21\.25|text-gray-[0-9]|bg-blue-[0-9]|border-blue-[0-9]|rounded-3xl|shadow-sm" src`
Expected: 매치 0에 수렴. 남은 항목은 토큰/시맨틱 클래스로 교체(브랜드 그라디언트 등 의도적 잔존은 주석으로 사유 명시).

- [ ] **Step 2: 미사용 import/변수 탐지**

Run: `pnpm biome check ./src 2>&1 | grep -i "unused\|noUnused" | head`
Expected: 0. 있으면 제거.

- [ ] **Step 3: 평면 컴포넌트 import 잔존 확인**

Run: `grep -rnE "from \"@/components/[A-Z][A-Za-z]+\"" src`
Expected: 0(모두 layout/motion/sections/cards/ui/forms 하위로 이동됨).

- [ ] **Step 4: 검증 + Commit**

Run: `pnpm exec tsc --noEmit && pnpm biome check --write ./src && pnpm biome check ./src 2>&1 | tail -2`
```bash
git add -A
git commit -m "chore: 잔존 임의값·미사용 코드 정리 및 포맷 일괄 적용

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>"
```

---

### Task 25: 최종 풀 검증

- [ ] **Step 1: 타입/린트/빌드 게이트**

Run:
```bash
pnpm exec tsc --noEmit
pnpm biome check ./src
pnpm build
```
Expected: 셋 다 에러 0 / 빌드 성공.

- [ ] **Step 2: 접근성/시맨틱 스폿체크**

Run: `for f in src/app/[locale]/page.tsx src/app/[locale]/company/page.tsx src/app/[locale]/contact/page.tsx; do echo "$f:"; grep -c "<h1" "$f"; done`
Expected: 각 1(솔루션 페이지는 SolutionHero가 h1 1개 제공).

Run: `grep -rn "alt=\"\"\|alt={" src | wc -l` — 모든 `<Image>`에 alt 존재(장식은 `alt=""`) 확인.

- [ ] **Step 3: 반응형 최종 라운드**

`pnpm dev`로 6개 페이지 전부 360/768/1024/1440 확인: 레이아웃 깨짐·가로 스크롤·텍스트 오버플로·터치 타깃(≥44px)·reduced-motion(브라우저 설정 ON 시 애니메이션 정지) 점검. 발견 이슈는 해당 페이지 태스크로 돌아가 수정 후 재검증.

- [ ] **Step 4: 최종 커밋(필요 시) + 완료**

이슈 없으면 추가 커밋 불필요. `superpowers:finishing-a-development-branch`로 PR/머지 진행.

---

## Self-Review (작성자 체크 결과)

- **Spec 커버리지:** 애니메이션(절제·reduced-motion: Task 4,5,9 + 페이지별 Stagger/Reveal) · 반응형(공통 원칙 + 각 페이지 육안 게이트) · SEO(기술 Task 16,18 / 성능: LazyMotion·sizes·transform-only·CountUp / 콘텐츠: 단일 h1·alt·aria Task 19~23,25 / OG Task 17 / JSON-LD 제거 Task 16) · Biome(Task 1 + 전 태스크 게이트) · 코드정리(시맨틱 레이어 Task 3, 임의값 스윕 Task 24, 리네임 Task 10~15) · 다크모드 제거(Task 2). 모두 태스크 매핑됨.
- **플레이스홀더:** 페이지 리디자인(19~23)은 "기존 JSX를 옮기되 클래스 토큰화"가 핵심이라 전체 최종 JSX를 1:1 복제하지 않고 변환 규칙 + 핵심 스니펫으로 기술. 이는 비주얼 디자인 특성상 의도된 수준(공통 원칙 블록이 규칙을 구체화). 신규 컴포넌트(IndustryCard/ValueCard/Button/Eyebrow/GridLines/MotionProvider/Stagger/seo)는 완전한 코드 제공.
- **타입 일관성:** `buildMetadata`/`localizedPath`/`languageAlternates`(Task 16) 시그니처가 페이지 사용처와 일치. `Stagger`/`StaggerItem` named export, 나머지 default export 일관. `m.*`(strict) 전환이 MotionProvider와 정합.
- **검증 방식:** 테스트 러너 부재로 TDD를 verification gate로 적응(헤더에 명시). 순수 로직(seo)만 경량 스크립트.
