# Rhistle 사이트 풀 리디자인 · 애니메이션 · 반응형 · SEO — 설계 문서

작성일: 2026-06-01
브랜치: `feat/redesign-animations-seo`

## 1. 목표

www.rhistle.com 6개 페이지(Home, Company, Contact, Solutions: CoreCode·Nexumm LX·Nexumm VX)를
**테크·인더스트리얼** 무드로 풀 리디자인한다. 절제된 프리미엄 애니메이션을 입히고,
모바일/태블릿/PC 반응형을 정비하며, 기술적·성능·콘텐츠 SEO를 적용한다.
동시에 코드를 정리한다(임의값·반복 유틸 제거, 시맨틱 레이어 도입, 컴포넌트 네이밍 정리).

### 유지하는 브랜드 앵커 (변경 금지)
- 브랜드 컬러 `#1428a0`
- 로고/코드 폰트 `Audiowide`
- 본문 폰트 `Pretendard`

### 스택
Next.js 16 (App Router) · next-intl(ko/en) · Tailwind v4 · motion · Biome 2 · pnpm

## 2. 확정된 결정 사항

| 항목 | 결정 |
|---|---|
| 애니메이션 강도 | 절제된 프리미엄형(부드러운 fade/slide·stagger·미세 hover) |
| 접근성 | `prefers-reduced-motion` 존중 |
| 비주얼 범위 | 브랜드 앵커 유지 + 그 외 풀 리디자인 |
| 디자인 무드 | 테크·인더스트리얼(강한 타이포·그리드 라인·헤어라인·절제된 색) |
| 스타일링 방침 | `@layer components` 시맨틱 클래스 + 디자인 토큰, 레이아웃은 Tailwind 유틸 |
| 컴포넌트 네이밍 | 의미 기반·PascalCase로 일괄 정리 |
| 다크 모드 | 제거(토글 미사용). shadcn 중립 토큰·`.dark` 정리 |
| SEO 범위 | 기술적 + 성능/CWV + 콘텐츠/시맨틱 (JSON-LD는 **제외**) |
| OG 이미지 | 동적 생성(next/og) |
| 실행 전략 | A안: 파운데이션 우선, 페이즈별 커밋 |
| 대상 페이지 | 6개 전부 |

## 3. 디자인 시스템

### 3.1 컬러 토큰 (`@theme`, oklch)
- `--brand` = `#1428a0` 고정. 파생 스케일 `--brand-50 … --brand-900`(엷은 배경 ~ 짙은 네이비 `#070d3d`).
- 인더스트리얼 중립: `--ink`(거의 검정), `--graphite`, `--steel`, `--mist`,
  `--line`(헤어라인 옅은 회색), `--surface`(흰색), `--surface-2`(오프화이트, 섹션 교대 배경).
- 흩어진 `text-gray-500/600`·`bg-blue-50`·`#070d3d` 임의값을 토큰으로 일원화.
- 미사용 shadcn 중립 토큰(`--card`, `--popover`, `--chart-*`, `--sidebar-*` 등)과 `.dark` 블록 제거.
  단, `ui/drawer`·`ui/dropdown-menu`가 참조하는 토큰은 실제 사용 여부 확인 후 정리(미사용이면 컴포넌트째 정리).

### 3.2 타이포 스케일
- 로고/코드: `Audiowide` — `SolutionHero` 코드 등 한정 사용.
- 헤드라인: Pretendard 800, 타이트 트래킹 + `break-keep`.
  `clamp()` 기반 반응형 스케일 토큰 `--text-display`, `--text-h1 … --text-h4` 정의.
- 본문/eyebrow: `--text-body`, `--text-eyebrow`(uppercase·와이드 트래킹 — 인더스트리얼 시그니처).
- 임의 텍스트 사이즈 난립(`text-3xl md:text-4xl xl:text-5xl` 반복)을 토큰·시맨틱 클래스로 수렴.

### 3.3 형태·여백
- 라운드 축소: 카드 `rounded-3xl` → `--radius` 기반 작은 값(각진 인더스트리얼). 토큰화.
- 그림자 최소화: `shadow-sm` 남용 제거 → 헤어라인 보더 + 옵셔널 hover 미세 elevation.
- 섹션 리듬: `--section-y` 토큰으로 상하 여백 통일(`py-16/20/24/32` 혼재 정리).
- 그리드 라인 모티프: 1px 디바이더, 옅은 그리드 패턴 배경 → `ui/GridLines`로 제공.

### 3.4 반응형 정책 (모바일 퍼스트)
- 모바일(기본) → `sm`(태블릿 세로) → `md`(태블릿 가로) → `lg/xl`(PC).
- 검증 폭: 360 / 768 / 1024 / 1440. 레이아웃 깨짐·오버플로·터치 타깃(≥44px)·가독성 점검.

### 3.5 시맨틱 레이어 (`@layer components`)
반복 블록을 시맨틱 클래스로 추출(예): `.section`, `.section-inner`, `.card`, `.card-hairline`,
`.eyebrow`, `.btn`, `.btn-primary`, `.btn-ghost`, `.grid-lines`, `.divider`.
one-off 레이아웃(flex/grid/gap/responsive)은 Tailwind 유틸 유지. `cn()` 일관 사용, `useSortedClasses` 유지.

## 4. 컴포넌트 구조 & 네이밍

### 4.1 폴더 구조
```
components/
  layout/    SiteHeader, SiteFooter, MobileNav, LocaleSwitcher, ScrollToTopButton
  motion/    Reveal, Stagger(+Item), MotionProvider(reduced-motion 래퍼), CountUp
  sections/  PageHero, SolutionHero, StatsBand, BusinessCases, SolutionShowcase,
             PartnerGrid, CompanyHistory, CtaBand
  cards/     FeatureCard, BenefitCard, IndustryCard, ValueCard
  ui/        Button, Eyebrow, GridLines, FeatureAccordion, drawer, dropdown-menu
  forms/     ContactForm
```

### 4.2 리네임
| 현재 | 변경 |
|---|---|
| `const page` (전 페이지) | `HomePage` / `CompanyPage` / `ContactPage` / `CoreCodePage` / `NexummLxPage` / `NexummVxPage` |
| `Header` / `Footer` | `SiteHeader` / `SiteFooter` |
| `DrawerMenu` | `MobileNav` |
| `Banner` | `PageHero` |
| `History` | `CompanyHistory` |
| `AccordionFeatures` | `FeatureAccordion` |
| `ScrollToTop` | `ScrollToTopButton` |
| `CallToAction` | `CtaBand` |
| `Stats` | `StatsBand` |

### 4.3 신규 공용 컴포넌트
- `ui/Button` — 흩어진 링크/버튼 인라인 스타일 통합(variant: primary/ghost/link).
- `ui/Eyebrow` — 반복 eyebrow 라벨.
- `ui/GridLines` — 인더스트리얼 그리드 라인 배경/디바이더.
- `motion/MotionProvider` — `prefers-reduced-motion` 전역 처리 + `LazyMotion`(번들 절감).
- 홈 인라인 섹션(BusinessCases/SolutionShowcase/PartnerGrid)을 `sections/`로 추출해 `HomePage`를 얇게.

### 4.4 import alias
폴더 이동에 맞춰 `@/components/...` 경로 일괄 업데이트.

## 5. 페이지별 리디자인

공통: 헤어라인/그리드라인 카드, 토큰 타이포·여백, `Reveal`+stagger 진입, hover 미세 elevation,
모바일 퍼스트 반응형, 단일 `h1`·landmark.

### 5.1 Home
- 히어로: 풀스크린 비디오 유지 + 그리드라인 오버레이, 타이틀 스태거 등장(절제), `ScrollDown` 유지.
- `StatsBand`: 뷰포트 진입 시 `CountUp` 트리거, 그리드라인 구분.
- `BusinessCases`: 헤어라인 카드, Case 번호를 인더스트리얼 인덱스 타이포로, Challenge/Solutions/Results 정돈된 그리드.
- `SolutionShowcase`: 좌우 교차 레이아웃 유지 + 여백·타이포 토큰화, 이미지 hover 줌(절제).
- `PartnerGrid`: 로고 그레이스케일→hover 컬러, 균일 그리드, 모바일 2열.

### 5.2 Company
- `SolutionHero`(이미지형) 유지.
- intro: 큰 타이포 스테이트먼트 — 잘못된 `<h1>` 중첩(내부 `<p>`/`<span>` block) 시맨틱 교정.
- industries(5): 그리드라인 디바이더로 좌(타이틀/포커스)·우(서비스 스코프) 2열, 모바일 1열 스택.
- values: `bg-blue-50` 박스 → 헤어라인 + 좌측 브랜드 바, 아이콘 워터마크 절제.
- `CompanyHistory`: 스티키 타임라인(모바일 비스티키 유지), 라인 모티프로 연혁 강조.

### 5.3 Contact
- `PageHero`(이미지+타이틀).
- 연락처: 이모지(📍📧📞) → `lucide-react` 아이콘 + 그리드라인 리스트.
- `ContactForm`: 필드 토큰 스타일 통일, 브랜드 포커스 링, 에러/성공/로딩 상태·접근성 라벨 점검.

### 5.4 Solutions (CoreCode / Nexumm LX / Nexumm VX, 공통 골격)
- `SolutionHero`(코드 타이포) 유지·정제.
- 흐름 유지: Overview → Key Features(`FeatureCard`) → Functionalities(`FeatureAccordion`)
  → Benefits(`BenefitCard`) → Applications. 카드 헤어라인화·그리드라인 디바이더·stagger 통일.
- 성능·효과 지표에 인더스트리얼 데이터 시각화(숫자 카운트·지표 라인) 가미.
- 세 페이지가 동일 컴포넌트 공유 → 한 번 다듬으면 일관 적용.

## 6. SEO

### 6.1 기술적
- 페이지별 `metadata`(title/description/canonical), Open Graph·Twitter 카드.
- `alternates.languages`로 hreflang(ko/en).
- `sitemap.ts`/`robots.ts` 정비.
- `lib/seo.ts` 헬퍼로 metadata 생성 중복 제거.
- OG 이미지: `opengraph-image`(next/og) 브랜드 템플릿 동적 생성.

### 6.2 성능 / CWV
- 히어로 비디오 LCP 영향 점검(poster·preload 조정).
- `next/image` `sizes` 정합.
- 폰트 `display:swap` 유지.
- 애니메이션은 `transform/opacity`만 사용해 CLS 방지.
- `LazyMotion`으로 motion 번들 절감.

### 6.3 콘텐츠 / 시맨틱
- 페이지당 단일 `h1`, 올바른 heading 위계, landmark(`main`/`nav`/`footer`).
- 모든 이미지 `alt`, 아이콘 `aria-hidden`, 아이콘 버튼 `aria-label`.

### 6.4 제외
- JSON-LD(구조화 데이터) 미적용. 기존 `layout.tsx`의 JSON-LD `dangerouslySetInnerHTML` 삭제.

## 7. 코드 정리

- 임의값(`top-21.25`, `text-[#070d3d]`, `from-[#070d3d]/85`) → 토큰/시맨틱 클래스 제거.
- 반복 유틸 체인 → `@layer components` 추출.
- 미사용 shadcn 중립 토큰·`.dark`·미사용 import/변수 제거.
- `cn()` 일관 사용, Biome `useSortedClasses` 유지.
- Biome의 `globals.css` Tailwind 파싱 에러 해결(CSS Tailwind 지원 옵션 또는 해당 파일 처리).

## 8. 검증 게이트 (각 페이즈 후)

- `pnpm biome check ./src` 무에러(기존 8에러 → 0 목표).
- `pnpm exec tsc --noEmit` 무에러.
- `pnpm build` 성공.
- 360/768/1024/1440 반응형·접근성 육안 확인.

## 9. 작업 순서 (페이즈별 커밋)

1. 디자인 토큰 + `@layer components` 시맨틱 레이어 + Biome CSS 설정.
2. 모션 프리미티브(`MotionProvider`/`Reveal`/`Stagger`) + 공용 `ui`(Button/Eyebrow/GridLines).
3. 컴포넌트 폴더 재배치 + 리네임 + import 정리.
4. SEO 기반(`lib/seo.ts` / hreflang / OG 동적 / sitemap / JSON-LD 제거).
5. 페이지 리디자인: Home → Company → Contact → 솔루션 3종.
6. 최종 검증(biome / tsc / build / 반응형).

## 10. 범위 밖 (YAGNI)

- 다크 모드 정식 구현.
- 구조화 데이터(JSON-LD).
- 신규 페이지/라우트 추가.
- 콘텐츠 카피 전면 재작성(시맨틱·alt 교정 범위 내 최소 수정만).
- CMS·백엔드 변경(`actions/contact`·nodemailer 동작 로직은 유지, 폼 UI/접근성만 정비).
