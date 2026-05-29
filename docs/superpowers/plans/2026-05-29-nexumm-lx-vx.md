# Nexumm LX / VX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Solutions 영역의 빈 `solutions/nexumm`를 채운다 — Nexumm 하위에 두 제품 페이지(**Nexumm LX** WMS, **Nexumm VX** 모니터링/디지털 트윈)를 트렌디한 디자인으로 신규 작성한다.

**Architecture:** Next.js 16 App Router. 각 제품은 서버 컴포넌트 `page.tsx`(메타데이터 + 콘텐츠 데이터 배열)가 `"use client"` 프레젠테이션 컴포넌트(`SolutionHero`/`FeatureCard`/`BenefitCard`/`AccordionFeatures`/`NexummSubTab`/`Reveal`)를 조합해 렌더한다. 모션은 `motion`(framer-motion) 라이브러리로 통일. `proxy.ts`가 `/solutions/nexumm` → `/solutions/nexumm/lx` 리다이렉트. 본문 콘텐츠는 기존 CoreCode와 동일하게 한국어 하드코딩, 메타데이터만 i18n.

**Tech Stack:** Next.js 16, React 19, next-intl, Tailwind v4, shadcn, lucide-react, **motion(신규)**, biome.

**검증 방식(중요):** 이 코드베이스에는 테스트 러너가 없다(biome lint/format + Next 빌드의 타입체크만 존재). 따라서 각 태스크 검증은 **`pnpm exec tsc --noEmit`(타입)** + **`pnpm check`(biome lint/format, 자동수정)** 로 하고, 통합 검증은 **`pnpm build`** 와 **dev 서버 라우트 확인**으로 한다. 마케팅 페이지 특성상 단위 테스트 러너를 신규 도입하지 않는다(사용자 "minimal code" 선호 준수).

> **Icon→client 경계 주의:** 컴포넌트 함수를 server→client props로 전달하면 직렬화 에러가 난다. 따라서 카드의 아이콘은 **렌더된 ReactNode**(`icon={<Boxes className="size-6" />}`)로 전달한다(컴포넌트 타입 전달 금지).

---

## File Structure

신규:
- `src/components/Reveal.tsx` — 스크롤 등장 래퍼(motion `whileInView`, once)
- `src/components/SectionHeading.tsx` — eyebrow + 제목 + 설명 (서버 컴포넌트)
- `src/components/SolutionHero.tsx` — 제품 풀블리드 히어로(딥블루 그라데이션 + 그리드, motion)
- `src/components/FeatureCard.tsx` — Key Features 카드(아이콘 ReactNode + 배지 + 불릿, hover/리빌)
- `src/components/BenefitCard.tsx` — Business Benefits 카드
- `src/components/AccordionFeatures.tsx` — Functionality 아코디언(클릭 토글, motion height)
- `src/components/NexummSubTab.tsx` — `Nexumm LX | Nexumm VX` 서브탭(sticky)
- `src/app/[locale]/solutions/nexumm/lx/page.tsx` — Nexumm LX 페이지
- `src/app/[locale]/solutions/nexumm/vx/page.tsx` — Nexumm VX 페이지

수정:
- `src/proxy.ts` — `/solutions/nexumm` 리다이렉트
- `src/components/SolutionsTab.tsx` — 활성 판정 `startsWith` + Nexumm href
- `src/components/CallToAction.tsx` — 브로셔 버튼 선택적
- `messages/ko.json`, `messages/en.json` — nexumm lx/vx 메타데이터 + cta 키

삭제:
- `src/app/[locale]/solutions/nexumm/page.tsx` — 플레이스홀더

---

## Task 1: motion 라이브러리 설치

**Files:**
- Modify: `package.json` (pnpm이 자동 갱신)

- [ ] **Step 1: 의존성 추가**

```bash
cd /home/sj/workspace/www.rhistle.com
pnpm add motion
```

- [ ] **Step 2: 설치 확인**

Run: `pnpm ls motion`
Expected: `motion x.y.z` 출력(에러 없음)

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "chore: motion 라이브러리 추가"
```

---

## Task 2: Reveal 컴포넌트

스크롤 진입 시 1회 페이드업. 공통 모션 프리셋.

**Files:**
- Create: `src/components/Reveal.tsx`

- [ ] **Step 1: 작성**

```tsx
"use client";

import { motion } from "motion/react";
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
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);
export default Reveal;
```

- [ ] **Step 2: 타입 검증**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: Commit**

```bash
pnpm check
git add src/components/Reveal.tsx
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: Reveal 스크롤 등장 컴포넌트 추가"
```

---

## Task 3: SectionHeading 컴포넌트

**Files:**
- Create: `src/components/SectionHeading.tsx`

- [ ] **Step 1: 작성**

```tsx
const SectionHeading = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) => (
  <div className="space-y-4">
    <p className="font-semibold text-rhistle text-sm uppercase tracking-widest">
      {eyebrow}
    </p>
    <h2 className="font-bold text-3xl md:text-4xl xl:text-5xl">{title}</h2>
    {description && (
      <p className="max-w-3xl text-gray-600 md:text-lg">{description}</p>
    )}
  </div>
);
export default SectionHeading;
```

- [ ] **Step 2: 타입 검증**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: Commit**

```bash
pnpm check
git add src/components/SectionHeading.tsx
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: SectionHeading 컴포넌트 추가"
```

---

## Task 4: SolutionHero 컴포넌트

딥블루 그라데이션 + 그리드 배경 + 대형 `Audiowide` 워드마크. 진입 모션.

**Files:**
- Create: `src/components/SolutionHero.tsx`

- [ ] **Step 1: 작성**

```tsx
"use client";

import { motion } from "motion/react";

const SolutionHero = ({
  code,
  name,
  tagline,
  description,
}: {
  code: string;
  name: string;
  tagline: string;
  description: string;
}) => (
  <section className="relative overflow-hidden bg-rhistle text-white">
    <div className="absolute inset-0 bg-gradient-to-br from-[#1428a0] via-[#0f1f7a] to-[#070d3d]" />
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
```

- [ ] **Step 2: 타입 검증**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: Commit**

```bash
pnpm check
git add src/components/SolutionHero.tsx
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: SolutionHero 히어로 컴포넌트 추가"
```

---

## Task 5: FeatureCard 컴포넌트

아이콘은 렌더된 ReactNode로 받는다(server→client 직렬화 안전).

**Files:**
- Create: `src/components/FeatureCard.tsx`

- [ ] **Step 1: 작성**

```tsx
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
```

- [ ] **Step 2: 타입 검증**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: Commit**

```bash
pnpm check
git add src/components/FeatureCard.tsx
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: FeatureCard 컴포넌트 추가"
```

---

## Task 6: BenefitCard 컴포넌트

**Files:**
- Create: `src/components/BenefitCard.tsx`

- [ ] **Step 1: 작성**

```tsx
"use client";

import { motion } from "motion/react";
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
  <motion.div
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
  </motion.div>
);
export default BenefitCard;
```

- [ ] **Step 2: 타입 검증**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: Commit**

```bash
pnpm check
git add src/components/BenefitCard.tsx
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: BenefitCard 컴포넌트 추가"
```

---

## Task 7: AccordionFeatures 컴포넌트

클릭 토글, motion height 애니메이션. 기본 첫 항목 열림.

**Files:**
- Create: `src/components/AccordionFeatures.tsx`

- [ ] **Step 1: 작성**

```tsx
"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type Item = { id: string; title: string; desc: string[] };

const AccordionFeatures = ({ items }: { items: Item[] }) => {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item) => {
        const isOpen = open === item.id;

        return (
          <div
            key={item.id}
            className={`overflow-hidden rounded-3xl border transition-colors ${
              isOpen
                ? "border-rhistle/30 bg-rhistle/5"
                : "border-gray-100 bg-white"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : item.id)}
              className="flex w-full items-center justify-between gap-6 p-6 text-left sm:p-8"
            >
              <span className="flex items-center gap-6">
                <span
                  className={`font-black text-2xl tabular-nums transition-colors ${
                    isOpen ? "text-rhistle" : "text-rhistle/30"
                  }`}
                >
                  {item.id}
                </span>
                <span className="font-bold text-lg md:text-xl">
                  {item.title}
                </span>
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="relative size-6 shrink-0"
              >
                <span className="absolute inset-0 m-auto h-0.5 w-4 bg-rhistle" />
                <span className="absolute inset-0 m-auto h-4 w-0.5 bg-rhistle" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <ul className="grid gap-3 px-6 pb-6 sm:px-8 sm:pb-8 md:grid-cols-2">
                    {item.desc.map((line) => (
                      <li
                        key={line}
                        className="flex items-center gap-3 text-gray-600"
                      >
                        <span className="size-1.5 shrink-0 rounded-full bg-rhistle" />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
export default AccordionFeatures;
```

- [ ] **Step 2: 타입 검증**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: Commit**

```bash
pnpm check
git add src/components/AccordionFeatures.tsx
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: AccordionFeatures 컴포넌트 추가"
```

---

## Task 8: NexummSubTab 컴포넌트

`SolutionsTab` 아래에 stack되는 sticky 서브탭. **top 값은 헤더+SolutionsTab 높이 근사치이므로 dev에서 시각 확인 후 미세조정 가능.**

**Files:**
- Create: `src/components/NexummSubTab.tsx`

- [ ] **Step 1: 작성**

```tsx
"use client";

import { Link, usePathname } from "@/i18n/navigation";

const tabs = [
  { name: "Nexumm LX", href: "/solutions/nexumm/lx" },
  { name: "Nexumm VX", href: "/solutions/nexumm/vx" },
];

const NexummSubTab = () => {
  const pathName = usePathname();

  return (
    <section className="sticky top-21.25 z-[9] border-gray-200 border-b bg-white/85 backdrop-blur md:top-30.75 xl:top-34.25">
      <div className="mx-auto flex max-w-7xl gap-6 px-8">
        {tabs.map((tab) => {
          const isActive = pathName.startsWith(tab.href);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`${
                isActive
                  ? "border-rhistle text-rhistle"
                  : "border-transparent text-gray-400"
              } border-b-2 py-3 font-medium transition-colors sm:text-lg`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default NexummSubTab;
```

- [ ] **Step 2: 타입 검증**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: Commit**

```bash
pnpm check
git add src/components/NexummSubTab.tsx
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: NexummSubTab 서브탭 추가"
```

---

## Task 9: CallToAction — 브로셔 버튼 선택적

`href`/`name` 미제공 시 다운로드 버튼 숨김(LX/VX는 브로셔 PDF 미보유). CoreCode 기존 호출은 하위 호환 유지.

**Files:**
- Modify: `src/components/CallToAction.tsx`

- [ ] **Step 1: props를 optional로 변경하고 다운로드 버튼을 조건부 렌더**

`CallToAction.tsx` 전체를 아래로 교체:

```tsx
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const CallToAction = ({ href, name }: { href?: string; name?: string }) => {
  const t = useTranslations("home.cta");

  return (
    <section className="border-gray-200 border-t">
      <div className="mx-auto max-w-7xl items-center justify-between space-y-2 px-8 py-10 text-sm sm:flex md:py-15 md:text-base xl:py-20 xl:text-xl">
        <p>{t("message")}</p>
        <div className="space-x-2 space-y-2">
          {href && name && (
            <a
              href={href}
              download={t(`download.${name}`)}
              className="inline-block rounded-3xl bg-rhistle px-6 py-2 text-white hover:bg-rhistle/90"
            >
              {t(`name.${name}`)}
            </a>
          )}
          <Link
            href={"/contact"}
            className="inline-block rounded-3xl bg-rhistle px-6 py-2 text-white hover:bg-rhistle/90"
          >
            {t("contact")}
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CallToAction;
```

- [ ] **Step 2: 타입 검증**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음 (corecode의 `<CallToAction href=... name="corecode" />` 호출도 유효)

- [ ] **Step 3: Commit**

```bash
pnpm check
git add src/components/CallToAction.tsx
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: CallToAction 브로셔 버튼 선택적 처리"
```

---

## Task 10: SolutionsTab — startsWith 활성 + Nexumm href

`Nexumm` 탭 링크를 `/solutions/nexumm/lx`로, 활성 판정을 prefix `match`로 변경(LX·VX 모두에서 Nexumm 활성).

**Files:**
- Modify: `src/components/SolutionsTab.tsx`

- [ ] **Step 1: tabs 정의와 활성 판정 변경**

`tabs` 배열과 `isActive` 라인을 아래로 교체:

```tsx
const tabs = [
  {
    name: "CoreCode",
    href: "/solutions/corecode",
    match: "/solutions/corecode",
  },
  {
    name: "Nexumm",
    href: "/solutions/nexumm/lx",
    match: "/solutions/nexumm",
  },
];
```

그리고 map 내부:

```tsx
const isActive = pathName.startsWith(tab.match);
```

- [ ] **Step 2: 타입 검증**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: Commit**

```bash
pnpm check
git add src/components/SolutionsTab.tsx
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: SolutionsTab Nexumm 하위 경로 활성 처리"
```

---

## Task 11: proxy 리다이렉트 + 플레이스홀더 페이지 삭제

**Files:**
- Modify: `src/proxy.ts`
- Delete: `src/app/[locale]/solutions/nexumm/page.tsx`

- [ ] **Step 1: proxy에 nexumm 리다이렉트 추가**

`proxy.ts`의 기존 `/solutions` 리다이렉트 바로 아래에 추가:

```ts
  if (pathname.endsWith("/solutions/nexumm"))
    return NextResponse.redirect(new URL(`${pathname}/lx`, request.url));
```

(locale prefix를 유지하기 위해 `${pathname}/lx`로 구성)

- [ ] **Step 2: 플레이스홀더 페이지 삭제**

```bash
git rm src/app/[locale]/solutions/nexumm/page.tsx
```

- [ ] **Step 3: 타입 검증**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 4: Commit**

```bash
pnpm check
git add src/proxy.ts
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: /solutions/nexumm를 LX로 리다이렉트, 플레이스홀더 제거"
```

---

## Task 12: i18n 메타데이터 + cta 키

**Files:**
- Modify: `messages/ko.json`
- Modify: `messages/en.json`

- [ ] **Step 1: ko.json — `nexumm` 블록 교체**

기존 `"nexumm": { "title": "넥섬" }` 를 아래로 교체:

```json
  "nexumm": {
    "title": "넥섬",
    "lx": {
      "title": "Nexumm LX",
      "description": "입고부터 출고까지 물류 전 과정을 실시간으로 추적·가시화하는 차세대 창고 관리 시스템(WMS), 리슬(RHISTLE)의 Nexumm LX를 소개합니다."
    },
    "vx": {
      "title": "Nexumm VX",
      "description": "설비·환경·안전 데이터를 실시간으로 모니터링하고 디지털 트윈으로 시각화하는 통합 관제 솔루션, 리슬(RHISTLE)의 Nexumm VX를 소개합니다."
    }
  },
```

- [ ] **Step 2: ko.json — `home.cta.name` / `home.cta.download`에 LX·VX 키 추가**

`home.cta.name` 블록에 추가(기존 키 유지):

```json
        "nexummLx": "Nexumm LX 소개서",
        "nexummVx": "Nexumm VX 소개서"
```

`home.cta.download` 블록에 추가(기존 키 유지):

```json
        "nexummLx": "Nexumm LX 소개서_(주)리슬.pdf",
        "nexummVx": "Nexumm VX 소개서_(주)리슬.pdf"
```

- [ ] **Step 3: en.json — `nexumm` 블록 교체**

```json
  "nexumm": {
    "title": "Nexumm",
    "lx": {
      "title": "Nexumm LX",
      "description": "Introducing Nexumm LX by RHISTLE: a next-generation warehouse management system (WMS) that tracks and visualizes the entire logistics flow from inbound to outbound in real time."
    },
    "vx": {
      "title": "Nexumm VX",
      "description": "Introducing Nexumm VX by RHISTLE: an integrated monitoring solution that visualizes equipment, environment, and safety data in real time with a digital twin."
    }
  },
```

- [ ] **Step 4: en.json — cta 키 추가**

`home.cta.name`에:

```json
        "nexummLx": "Nexumm LX Brochure",
        "nexummVx": "Nexumm VX Brochure"
```

`home.cta.download`에:

```json
        "nexummLx": "Nexumm_LX_Brochure_RHISTLE_Co.,Ltd.pdf",
        "nexummVx": "Nexumm_VX_Brochure_RHISTLE_Co.,Ltd.pdf"
```

- [ ] **Step 5: JSON 유효성 + 타입 검증**

Run: `pnpm exec tsc --noEmit && node -e "JSON.parse(require('fs').readFileSync('messages/ko.json','utf8'));JSON.parse(require('fs').readFileSync('messages/en.json','utf8'));console.log('json ok')"`
Expected: `json ok`, 타입 에러 없음

- [ ] **Step 6: Commit**

```bash
pnpm check
git add messages/ko.json messages/en.json
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: Nexumm LX/VX 메타데이터·CTA i18n 키 추가"
```

---

## Task 13: Nexumm LX 페이지

핵심: **재고 관리/추적**. 서버 컴포넌트가 콘텐츠 배열 + 클라이언트 컴포넌트를 조합.

**Files:**
- Create: `src/app/[locale]/solutions/nexumm/lx/page.tsx`

- [ ] **Step 1: 작성**

```tsx
import {
  Boxes,
  Crosshair,
  Layers,
  PackageSearch,
  Route,
  TrendingUp,
  Warehouse,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AccordionFeatures from "@/components/AccordionFeatures";
import BenefitCard from "@/components/BenefitCard";
import CallToAction from "@/components/CallToAction";
import FeatureCard from "@/components/FeatureCard";
import NexummSubTab from "@/components/NexummSubTab";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SolutionHero from "@/components/SolutionHero";
import SolutionsTab from "@/components/SolutionsTab";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nexumm" });

  return {
    title: t("lx.title"),
    description: t("lx.description"),
  };
}

const highlights = [
  {
    title: "실시간 재고 가시성",
    detail: "로케이션 단위로 수량·상태를 실시간 동기화",
  },
  {
    title: "End-to-End 추적성",
    detail: "Lot·Serial 기반으로 입고부터 출고까지 전 이력 추적",
  },
  {
    title: "ERP 자동 연계",
    detail: "파일 어댑터와 API 폴링 어댑터로 입·출고 지시 자동 수신",
  },
  {
    title: "멀티테넌트 클라우드",
    detail: "회사·창고별 격리 운영, 글로벌 다거점 확산형",
  },
];

const features = [
  {
    badge: "Accurate",
    title: "재고 정확도",
    icon: <Crosshair className="size-6" />,
    descriptions: [
      "바코드 스캔 기반 무오류 현장 작업",
      "실시간 동기화로 장부-실물 재고 일치",
      "가입고로 입고 지연 없이 수량 선반영",
    ],
  },
  {
    badge: "Traceable",
    title: "추적성",
    icon: <Route className="size-6" />,
    descriptions: [
      "Lot·Serial 단위 전 이력 관리",
      "입고→보관→출고 전 과정 추적",
      "규제 대응을 위한 이력 추적성 확보",
    ],
  },
  {
    badge: "Scalable",
    title: "확장성",
    icon: <Layers className="size-6" />,
    descriptions: [
      "멀티테넌트 SaaS 아키텍처",
      "다중 창고·글로벌 다거점 운영",
      "클라우드 기반 빠른 확산",
    ],
  },
];

const functionalities = [
  {
    id: "01",
    title: "입고 관리",
    desc: [
      "ERP 입고 지시 수신",
      "입고 예정 관리",
      "가입고(수량 선반영·로케이션 미배정)",
      "입고 검수",
    ],
  },
  {
    id: "02",
    title: "출고 관리",
    desc: ["ERP 출고 지시 수신", "피킹·패킹", "출고 검증"],
  },
  {
    id: "03",
    title: "재고 관리·추적",
    desc: [
      "로케이션 관리",
      "실시간 재고 현황",
      "Lot·Serial 추적",
      "재고 실사(Cycle Count) 및 조정",
    ],
  },
  {
    id: "04",
    title: "기준정보·동기화",
    desc: ["품목·BOM WMS 동기화(Pull)", "표준 기준정보 관리"],
  },
  {
    id: "05",
    title: "모바일 작업",
    desc: ["PDA 바코드 스캔 기반 현장 작업", "입고·피킹·실사 모바일 지원"],
  },
];

const benefits = [
  {
    title: "재고 가시성 확보로",
    highlight: "재고 정확도 향상",
    icon: <PackageSearch className="size-7" />,
    descriptions: [
      "실시간 재고로 결품·과재고 방지",
      "장부 재고 신뢰도 제고",
      "재고 회전율 개선",
    ],
  },
  {
    title: "작업 효율 제고로",
    highlight: "운영비 절감",
    icon: <TrendingUp className="size-7" />,
    descriptions: [
      "작업 동선 최적화",
      "오피킹(오출고) 방지",
      "바코드 작업으로 처리량 향상",
    ],
  },
  {
    title: "공급망 대응으로",
    highlight: "규제 준수·대응력 강화",
    icon: <Boxes className="size-7" />,
    descriptions: [
      "ERP 연계로 적기 입·출고",
      "이력 추적성 기반 규제 준수",
      "글로벌 다거점 표준 운영",
    ],
  },
];

const applications = [
  "원자재·완제품·VMI 창고",
  "3PL·물류센터",
  "글로벌 다거점 운영",
  "제조-물류 통합 환경",
];

const page = () => {
  return (
    <main>
      <SolutionHero
        code="LX"
        name="Nexumm LX"
        tagline="재고의 모든 순간을 추적하다"
        description="입고부터 출고까지 물류 전 과정을 실시간으로 추적·가시화하는 차세대 창고 관리 시스템(WMS)입니다."
      />

      <SolutionsTab />
      <NexummSubTab />

      <div className="mx-auto max-w-7xl space-y-28 px-8 py-24">
        {/* Overview + Highlights */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Overview"
              title="실시간 재고 가시성 기반 WMS"
              description="멀티테넌트·다중 창고 환경에서 재고의 위치·수량·상태를 단일 화면에서 관리하고, ERP와 양방향으로 연계합니다."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="font-bold text-lg text-rhistle">{item.title}</p>
                  <p className="mt-3 text-gray-600">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Key Features"
              title="정확하고, 추적 가능하며, 확장된다"
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((item, i) => (
              <FeatureCard
                key={item.title}
                badge={item.badge}
                title={item.title}
                descriptions={item.descriptions}
                icon={item.icon}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Functionalities */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Functionalities"
              title="입고부터 출고까지, 재고 추적의 전 과정"
              description="재고 관리·추적을 중심으로 입고·출고·동기화·모바일 작업까지 창고 운영 전 단계를 지원합니다."
            />
          </Reveal>
          <Reveal>
            <AccordionFeatures items={functionalities} />
          </Reveal>
        </section>

        {/* Business Benefits */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Business Benefits"
              title="재고를 보이게 하면, 비용이 줄어든다"
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((item, i) => (
              <BenefitCard
                key={item.highlight}
                title={item.title}
                highlight={item.highlight}
                descriptions={item.descriptions}
                icon={item.icon}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Applications"
              title="다양한 창고 운영 환경에 적용"
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((app, i) => (
              <Reveal key={app} delay={i * 0.08}>
                <div className="flex h-full items-center gap-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <Warehouse className="size-6 shrink-0 text-rhistle" />
                  <span className="font-medium">{app}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      <CallToAction />
    </main>
  );
};
export default page;
```

- [ ] **Step 2: 타입 검증**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: Commit**

```bash
pnpm check
git add src/app/[locale]/solutions/nexumm/lx/page.tsx
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: Nexumm LX 페이지 작성"
```

---

## Task 14: Nexumm VX 페이지

핵심: **CoreCode 시너지** + 모니터링/디지털 트윈. 시너지 강조 밴드 포함.

**Files:**
- Create: `src/app/[locale]/solutions/nexumm/vx/page.tsx`

- [ ] **Step 1: 작성**

```tsx
import {
  ArrowRight,
  Boxes,
  Cable,
  Eye,
  LayoutDashboard,
  ShieldAlert,
  Siren,
  TrendingUp,
} from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AccordionFeatures from "@/components/AccordionFeatures";
import BenefitCard from "@/components/BenefitCard";
import CallToAction from "@/components/CallToAction";
import FeatureCard from "@/components/FeatureCard";
import NexummSubTab from "@/components/NexummSubTab";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import SolutionHero from "@/components/SolutionHero";
import SolutionsTab from "@/components/SolutionsTab";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "nexumm" });

  return {
    title: t("vx.title"),
    description: t("vx.description"),
  };
}

const highlights = [
  {
    title: "CoreCode 네이티브 연계",
    detail: "100여 종 어댑터로 수집·표준화된 데이터를 즉시 활용",
  },
  {
    title: "디지털 트윈 시각화",
    detail: "현장을 3D로 재현해 설비·구역 상태를 직관적으로 표현",
  },
  {
    title: "실시간 통합 대시보드",
    detail: "설비·환경·안전·에너지 데이터를 단일 화면에서",
  },
  {
    title: "지능형 이상 감지",
    detail: "임계치·패턴 기반 알람으로 조기 경보",
  },
];

const features = [
  {
    badge: "Visible",
    title: "가시성",
    icon: <Eye className="size-6" />,
    descriptions: [
      "디지털 트윈 3D 시각화",
      "단일 통합 대시보드",
      "구역·설비 단위 드릴다운",
    ],
  },
  {
    badge: "Connected",
    title: "연계성",
    icon: <Cable className="size-6" />,
    descriptions: [
      "CoreCode 기반 즉시 연계",
      "OPC·Modbus 등 멀티 프로토콜",
      "이기종 데이터 통합",
    ],
  },
  {
    badge: "Proactive",
    title: "선제 대응",
    icon: <Siren className="size-6" />,
    descriptions: ["실시간 이상 감지", "조기 경보 및 알림", "예지보전 기반 마련"],
  },
];

const functionalities = [
  {
    id: "01",
    title: "데이터 수집·연계",
    desc: [
      "CoreCode 연동",
      "표준 프로토콜(OPC·Modbus 등) 수집",
      "이기종 데이터 통합",
    ],
  },
  {
    id: "02",
    title: "실시간 대시보드",
    desc: ["설비 가동 현황 시각화", "환경·안전 KPI 모니터링", "사용자 정의 대시보드"],
  },
  {
    id: "03",
    title: "디지털 트윈",
    desc: ["3D 현장 모델", "실데이터 매핑", "구역·설비 드릴다운"],
  },
  {
    id: "04",
    title: "이벤트·알람 관리",
    desc: ["임계치·패턴 기반 알람", "이상 감지", "알림 및 대응 이력 관리"],
  },
  {
    id: "05",
    title: "통계·분석",
    desc: ["추세 분석", "가동률·환경 통계", "리포트 생성"],
  },
];

const benefits = [
  {
    title: "통합 가시성으로",
    highlight: "운영·관리 역량 제고",
    icon: <LayoutDashboard className="size-7" />,
    descriptions: [
      "분산 데이터의 단일 관제",
      "실시간 기반 의사결정",
      "디지털 트윈으로 직관적 파악",
    ],
  },
  {
    title: "선제적 위기 대응으로",
    highlight: "안전·안정성 강화",
    icon: <ShieldAlert className="size-7" />,
    descriptions: [
      "화재·가스·환경 이상 조기 감지",
      "위기 대응 속도 향상",
      "사고 사전 예방",
    ],
  },
  {
    title: "데이터 기반 개선으로",
    highlight: "지속적 성과 제고",
    icon: <TrendingUp className="size-7" />,
    descriptions: [
      "통계·분석으로 문제 식별",
      "예지보전 기반 마련",
      "에너지·ESG 성과 개선",
    ],
  },
];

const applications = [
  "스마트팩토리 설비 관제",
  "통합 방재(화재·가스·온도·CCTV)",
  "에너지·환경 모니터링",
  "안전 관제",
];

const page = () => {
  return (
    <main>
      <SolutionHero
        code="VX"
        name="Nexumm VX"
        tagline="데이터를 보이게, 현장을 살아있게"
        description="설비·환경·안전 데이터를 실시간으로 모니터링하고 디지털 트윈으로 시각화하는 통합 관제 솔루션입니다."
      />

      <SolutionsTab />
      <NexummSubTab />

      <div className="mx-auto max-w-7xl space-y-28 px-8 py-24">
        {/* Overview + Highlights */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Overview"
              title="실시간 통합 관제 & 디지털 트윈"
              description="CoreCode가 수집·표준화한 데이터를 그대로 받아 한 화면에서 현장을 가시화하고 이상을 조기에 감지합니다."
            />
          </Reveal>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.08}>
                <div className="h-full rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <p className="font-bold text-lg text-rhistle">{item.title}</p>
                  <p className="mt-3 text-gray-600">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CoreCode synergy band */}
        <Reveal>
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#1428a0] to-[#070d3d] p-8 text-white md:p-12">
            <p className="font-semibold text-white/70 text-sm uppercase tracking-widest">
              Synergy with CoreCode
            </p>
            <div className="mt-6 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
              <div className="flex-1 rounded-2xl bg-white/10 p-6 text-center">
                <p className="font-audiowide text-2xl">CoreCode</p>
                <p className="mt-2 text-white/70">데이터 수집·표준화</p>
              </div>
              <ArrowRight className="mx-auto size-8 rotate-90 sm:rotate-0" />
              <div className="flex-1 rounded-2xl bg-white/20 p-6 text-center">
                <p className="font-audiowide text-2xl">Nexumm VX</p>
                <p className="mt-2 text-white/70">관제·디지털 트윈</p>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-white/80">
              CoreCode가 모은 설비·센서 데이터를 별도 연계 개발 없이 즉시
              받아, VX가 실시간 관제와 디지털 트윈으로 시각화합니다.
            </p>
          </div>
        </Reveal>

        {/* Key Features */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Key Features"
              title="보이고, 연결되고, 앞서 대응한다"
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {features.map((item, i) => (
              <FeatureCard
                key={item.title}
                badge={item.badge}
                title={item.title}
                descriptions={item.descriptions}
                icon={item.icon}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Functionalities */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Functionalities"
              title="수집부터 분석까지, 통합 관제의 전 과정"
            />
          </Reveal>
          <Reveal>
            <AccordionFeatures items={functionalities} />
          </Reveal>
        </section>

        {/* Business Benefits */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Business Benefits"
              title="보이면 빨라지고, 빨라지면 안전해진다"
            />
          </Reveal>
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((item, i) => (
              <BenefitCard
                key={item.highlight}
                title={item.title}
                highlight={item.highlight}
                descriptions={item.descriptions}
                icon={item.icon}
                index={i}
              />
            ))}
          </div>
        </section>

        {/* Applications */}
        <section className="space-y-10">
          <Reveal>
            <SectionHeading
              eyebrow="Applications"
              title="다양한 관제 환경에 적용"
            />
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {applications.map((app, i) => (
              <Reveal key={app} delay={i * 0.08}>
                <div className="flex h-full items-center gap-3 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
                  <Boxes className="size-6 shrink-0 text-rhistle" />
                  <span className="font-medium">{app}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </div>

      <CallToAction />
    </main>
  );
};
export default page;
```

- [ ] **Step 2: 타입 검증**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음

- [ ] **Step 3: Commit**

```bash
pnpm check
git add src/app/[locale]/solutions/nexumm/vx/page.tsx
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "feat: Nexumm VX 페이지 작성"
```

---

## Task 15: 통합 검증 (빌드 + 라우트 확인)

**Files:** (없음 — 검증만)

- [ ] **Step 1: 프로덕션 빌드**

Run: `pnpm build`
Expected: 빌드 성공. 라우트 목록에 `/[locale]/solutions/nexumm/lx`, `/[locale]/solutions/nexumm/vx`가 포함되고 타입 에러 없음.

- [ ] **Step 2: dev 서버로 라우트·리다이렉트 확인**

Run (백그라운드 dev 서버):
```bash
pnpm dev
```
별도 셸에서:
```bash
curl -sI http://localhost:3000/solutions/nexumm | grep -i location
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/solutions/nexumm/lx
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/solutions/nexumm/vx
```
Expected:
- 첫 명령: `location: /solutions/nexumm/lx` (307/308 리다이렉트)
- LX/VX: `200`

- [ ] **Step 3: 브라우저 시각 확인 (수동)**

`http://localhost:3000/solutions/nexumm/lx`, `.../vx` 접속해 확인:
- 상단 `CoreCode | Nexumm` 탭에서 **Nexumm 활성**, 그 아래 `Nexumm LX | Nexumm VX` 서브탭 동작 및 활성 표시
- 스크롤 시 두 sticky 탭이 헤더 아래 **겹치지 않고 stack** (겹치면 `NexummSubTab`의 `top-*` 값 미세조정)
- 히어로/카드/아코디언 모션 정상, 아코디언 클릭 토글 정상
- 모바일 폭에서 레이아웃 정상

- [ ] **Step 4: dev 서버 종료**

dev 서버 프로세스 종료(Ctrl+C 또는 해당 백그라운드 종료).

- [ ] **Step 5: 최종 커밋(필요 시)**

시각 확인 중 `top-*` 등 미세조정이 있었다면:
```bash
pnpm check
git add -A
git -c user.name=seokjunh -c user.email=seokjunh97@gmail.com commit -m "fix: Nexumm 서브탭 sticky 오프셋 미세조정"
```

---

## Notes / 알려진 한계

- LX/VX 실제 스크린샷·3D 트윈 이미지가 없어 이미지 비의존(카드/아코디언/아이콘) 레이아웃으로 작성. 추후 자산 확보 시 각 `page.tsx`의 해당 섹션에 `<Image>` 추가 가능.
- 본문 콘텐츠는 한국어 하드코딩(기존 CoreCode와 동일). 영문 본문은 범위 밖.
- 브로셔 PDF 미보유 → `CallToAction`은 LX/VX에서 다운로드 버튼 없이 "문의하기"만 노출. cta i18n 키(`nexummLx`/`nexummVx`)는 PDF 확보 시 `<CallToAction href="/pdf/..." name="nexummLx" />` 형태로 연결.
- 콘텐츠는 작성자 초안 — 배포 전 제품 사실관계 사내 검수 권장.
