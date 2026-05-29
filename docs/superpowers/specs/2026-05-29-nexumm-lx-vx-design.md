# Nexumm (LX · VX) 솔루션 페이지 설계

- **작성일**: 2026-05-29
- **대상 프로젝트**: `www.rhistle.com` (회사 홈페이지, Next.js 16 / next-intl / Tailwind v4 / shadcn)
- **목표**: 비어 있는 `solutions/nexumm`를 채운다. Nexumm은 두 제품을 묶는 브랜드이며, **Nexumm LX**(WMS)와 **Nexumm VX**(모니터링/디지털 트윈) 두 페이지를 신규로 작성한다.

## 1. 배경 / 현황

- Solutions 영역은 `CoreCode | Nexumm` 2개 탭으로 구성(`SolutionsTab`).
- `CoreCode` 페이지(`solutions/corecode/page.tsx`)는 완성되어 있고, `Overview → Key Features → Business Benefits → Functionalities → Applications + CallToAction` 구조의 레퍼런스다.
- `Nexumm` 페이지는 배너 + "업데이트 중" 플레이스홀더만 존재한다.
- 홈 카피상 Nexumm은 **차세대 창고 관리 시스템(WMS)**, 제품명 **Nexumm LX**로 이미 소개되어 있다(`messages/ko.json`, `en.json`).

## 2. 결정 사항

- **정보 구조(승인됨)**: Solutions 레벨은 `CoreCode | Nexumm` 유지. Nexumm 하위에 **LX · VX** 2개 제품을 서브탭 + 서브페이지로 둔다.
- **콘텐츠**: 자료 없음. 본 스펙의 콘텐츠 방향(§6)을 바탕으로 작성자가 디테일하게 작성한다.
  - LX 핵심: **재고 관리 / 추적**
  - VX 핵심: **CoreCode가 수집·표준화한 데이터를 활용한 통합 모니터링 / 디지털 트윈** (CoreCode와의 시너지를 명시)
- **디자인(승인됨)**: CoreCode 패턴을 그대로 따르지 않는다. **세련되고 트렌디한** 새 비주얼로 작성하되, 브랜드 일관성(브랜드 컬러 `rhistle #1428a0`, `Audiowide`/`Pretendard` 폰트, Tailwind v4, shadcn)은 유지한다.

## 3. 정보 구조 · 라우팅

```
/solutions             → (기존) /solutions/corecode 리다이렉트
/solutions/corecode    → (기존) 변경 없음
/solutions/nexumm      → /solutions/nexumm/lx 리다이렉트 (신규, proxy.ts)
/solutions/nexumm/lx   → ★신규: Nexumm LX (WMS)
/solutions/nexumm/vx   → ★신규: Nexumm VX (모니터링/디지털 트윈)
```

- 기존 `solutions/nexumm/page.tsx`(플레이스홀더)는 삭제하고 리다이렉트로 대체.
- `proxy.ts`: 경로가 `/solutions/nexumm`로 끝나면 `/solutions/nexumm/lx`로 redirect하는 규칙 추가(기존 `/solutions` 처리와 동일한 패턴).

## 4. 컴포넌트 구성

### 4.1 내비게이션

- **`SolutionsTab`**(기존 수정): `CoreCode | Nexumm` 유지. 활성 판정을 `pathName === href`에서 **`pathName.startsWith(href)`** 기반으로 변경해, `/solutions/nexumm/*` 어디서든 `Nexumm` 탭이 활성으로 표시되게 한다. `Nexumm` 링크 href는 `/solutions/nexumm/lx`.
- **`NexummSubTab`**(신규): `Nexumm LX | Nexumm VX` 2차 서브탭. `SolutionsTab` 바로 아래에 sticky로 쌓이도록 top 오프셋을 헤더+`SolutionsTab` 높이에 맞춰 지정. LX/VX 페이지에서만 렌더.

### 4.2 공용 프레젠테이션 컴포넌트 (신규, LX·VX 공유)

트렌디한 비주얼을 두 페이지가 공유하도록 작은 단위로 추출한다. 기존 CoreCode 파일은 **수정하지 않는다**(동작 중인 코드, 범위 밖).

- `SolutionHero` — 제품 풀블리드 히어로(브랜드 컬러 그라데이션/노이즈 배경, 큰 디스플레이 타이포, 한 줄 태그라인, 스크롤 다운 힌트). 기존 `Banner`(이미지 배너) 대신 이미지 의존 없이 "있어 보이는" 히어로.
- `SectionHeading` — 섹션 라벨(eyebrow) + 제목 공통.
- `FeatureCard` — Key Features 3카드(아이콘 + 배지 + 제목 + 불릿). hover/리빌 모션 포함.
- `BenefitCard` — Business Benefits 카드(아이콘 + 강조 문구 + 불릿).
- `AccordionFeature` — Functionality 아코디언(번호 + 제목 + 펼침 상세). CoreCode의 grid-rows 트랜지션 기법을 재사용하되 스타일은 새로 정리.
- `Reveal` — `motion`의 `whileInView`(once) 기반 스크롤 등장/스태거 래퍼. 공통 모션 프리셋을 한곳에서 관리.

> 페이지 자체(`lx/page.tsx`, `vx/page.tsx`)는 CoreCode처럼 **콘텐츠 데이터 배열 + 위 컴포넌트 조합**으로 구성한다.

## 5. 디자인 방향 (트렌디 · 세련)

- **톤**: 딥 블루(`rhistle`) 기반의 미니멀 + 하이테크. 넉넉한 여백, 큰 타이포 대비, 절제된 강조색.
- **히어로**: 이미지 대신 CSS 그라데이션/그리드·도트 패턴 + 대형 `Audiowide` 워드마크("LX" / "VX")로 임팩트. 모션은 진입 페이드/슬라이드.
- **카드**: 라운드 큰 반경(`rounded-3xl/4xl`), 미세한 보더 + soft shadow, hover 시 살짝 떠오르는 모션. 글래스/그라데이션 보더 등 트렌디 요소 선택적 적용.
- **모션**: **`motion`(framer-motion) 라이브러리를 적극 활용**한다 — 스크롤 리빌(`whileInView`), 스태거(stagger) 등장, 카드 hover/tap 스프링, 히어로 패럴랙스/그라데이션 모션, 숫자 카운트업 등. 단 과하지 않게 절제하고, 접근성/성능을 고려(`prefers-reduced-motion` 존중, `whileInView` 1회 트리거).
  - 기존 CSS `animate-fade-in-up` + `react-intersection-observer`도 병행 가능하나, 신규 LX/VX 페이지의 주 모션 엔진은 `motion`으로 통일한다.
- **반응형**: 모바일 1열 → 데스크탑 다열. 기존 `max-w-7xl px-8` 컨테이너 규칙 유지.
- **다크모드**: 토큰은 존재하나 사이트가 라이트 기준으로 운영되므로 **라이트 모드 우선**으로 마감(다크 강제 대응은 범위 밖).

## 6. 콘텐츠 (작성자 작성)

### 6.1 Nexumm LX — 차세대 WMS · 핵심: 재고 관리/추적

- **태그라인(예)**: "재고의 모든 순간을 추적하다 — 실시간 가시성 기반 WMS"
- **Overview**: 입고부터 출고까지 물류 전 과정을 실시간으로 추적·가시화하는 차세대 창고 관리 시스템. 멀티테넌트·다중 창고 환경에서 재고의 위치·수량·상태를 단일 화면에서 관리하고, ERP와 양방향으로 연계한다.
- **Highlights**: 실시간 재고 가시성 / Lot·Serial 기반 End-to-End 추적성 / ERP 자동 연계(파일 어댑터 + API 폴링 어댑터) / 멀티테넌트·다중 창고 클라우드.
- **Functionality(아코디언)**:
  1. 입고 관리 — ERP 입고 지시 수신, 입고 예정, 가입고(수량 선반영·로케이션 미배정), 검수
  2. 출고 관리 — ERP 출고 지시 수신, 피킹·패킹, 출고 검증
  3. **재고 관리/추적 (핵심)** — 로케이션 관리, 실시간 재고, Lot/Serial 추적, 재고 실사(Cycle Count), 재고 조정
  4. 기준정보·동기화 — 품목·BOM WMS 동기화(pull), 표준 기준정보
  5. 모바일 작업 — PDA 바코드 스캔 기반 현장 작업(입고/피킹/실사)
- **Key Features(3카드)**: **Accurate**(재고 정확도) / **Traceable**(추적성) / **Scalable**(확장성).
- **Business Benefits**: 재고 가시성 확보 → 재고 정확도 향상 / 작업 효율 제고 → 운영비 절감(작업 동선 최적화·오피킹 방지) / 공급망 대응력 강화 → 규제 준수·이력 추적.
- **Applications**: 원자재·완제품·VMI 창고, 3PL/물류센터, 글로벌 다거점, 제조-물류 통합.

### 6.2 Nexumm VX — 통합 모니터링/디지털 트윈 · 핵심: CoreCode 시너지

- **태그라인(예)**: "데이터를 보이게, 현장을 살아있게 — 실시간 통합 관제 & 디지털 트윈"
- **Overview**: 설비·환경·안전 데이터를 실시간으로 모니터링하고 3D 디지털 트윈으로 시각화하는 통합 관제 솔루션. **CoreCode가 수집·표준화한 데이터를 그대로 받아** 한 화면에서 현장을 가시화하고 이상을 조기에 감지한다.
- **Highlights**: **CoreCode 네이티브 연계**(100여 종 어댑터로 수집된 데이터 즉시 활용) / 디지털 트윈 3D 시각화 / 실시간 통합 대시보드 / 지능형 이상 감지·조기 경보.
- **Functionality(아코디언)**:
  1. 데이터 수집·연계 — CoreCode 연동, 표준 프로토콜(OPC/Modbus 등) 수집
  2. 실시간 대시보드 — 설비 가동/환경/안전 KPI 실시간 시각화
  3. 디지털 트윈 — 3D 현장 모델, 실데이터 매핑, 구역/설비 드릴다운
  4. 이벤트·알람 관리 — 임계치/패턴 기반 알람, 이상 감지, 알림·대응 이력
  5. 통계·분석 — 추세 분석, 가동률/환경 통계, 리포트
- **Key Features(3카드)**: **Visible**(가시성) / **Connected**(연계성) / **Proactive**(선제 대응).
- **Business Benefits**: 통합 가시성 → 운영/관리 역량 제고 / 선제적 위기 대응 → 안전·안정성 강화 / 데이터 기반 지속 개선 → 예지보전·ESG 성과.
- **Applications**: 스마트팩토리 설비 관제, 통합 방재(화재/가스/온도 + CCTV), 에너지·환경 관제, 안전 관제.
- **시너지 강조**: `CoreCode(수집·표준화) → VX(관제·디지털 트윈)` 데이터 플로우를 한 줄 비주얼로 표현해 두 제품의 연결을 명시.

## 7. i18n · 메타데이터

- 기존처럼 **본문 콘텐츠는 한국어 하드코딩**(CoreCode 본문도 i18n 미적용), **메타데이터(title/description)만** `messages/ko.json`·`en.json`에 추가.
- 추가 키: `nexumm.lx.{title,description}`, `nexumm.vx.{title,description}` (또는 동급 네임스페이스). 각 페이지 `generateMetadata`에서 사용.
- `header`/탭 라벨은 표기만 추가(필요 시).

## 8. CallToAction · 브로셔

- Nexumm LX/VX 브로셔 PDF는 **아직 없음**. → `CallToAction`을 **브로셔 버튼이 선택적**이도록 확장(`href` 미제공 시 다운로드 버튼 숨김, "문의하기"만 노출).
- i18n cta 키 `name.nexummLx`/`name.nexummVx`, `download.nexummLx`/`download.nexummVx`를 미리 정의해, 추후 PDF가 들어오면 바로 연결.
- 기존 CoreCode의 `CallToAction` 호출(브로셔 있음)은 그대로 동작해야 한다(하위 호환).

## 9. 제약 / 알려진 한계

- LX/VX 실제 제품 스크린샷·다이어그램이 없어, 두 페이지는 **이미지 비의존**(카드/아코디언/아이콘/CSS 비주얼) 으로 설계한다. 추후 스크린샷·3D 트윈 이미지가 생기면 들어갈 슬롯 위치를 코드에 주석으로 표시한다.
- 콘텐츠는 작성자 초안이므로, 실제 제품 사실관계는 배포 전 사내 검수 권장.
- 다국어 본문(영문 콘텐츠)은 기존 CoreCode와 동일하게 이번 범위에서 제외(메타데이터만 다국어).

## 10. 신규 의존성

- **`motion`** (framer-motion 후속 패키지, `motion/react`): 페이지 모션 엔진. `pnpm add motion`.
  - `"use client"` 컴포넌트에서 사용(LX/VX 페이지는 모션 포함 클라이언트 컴포넌트로 구성하거나, 서버 페이지 + 모션 클라이언트 하위 컴포넌트 조합).

## 11. 영향받는 파일 (요약)

신규:
- `src/app/[locale]/solutions/nexumm/lx/page.tsx`
- `src/app/[locale]/solutions/nexumm/vx/page.tsx`
- `src/components/NexummSubTab.tsx`
- 공용 컴포넌트: `SolutionHero`, `SectionHeading`, `FeatureCard`, `BenefitCard`, `AccordionFeature`, `Reveal` (구성은 구현 계획에서 확정)

수정:
- `src/proxy.ts` (nexumm 리다이렉트)
- `src/components/SolutionsTab.tsx` (활성 판정 startsWith, Nexumm href)
- `src/components/CallToAction.tsx` (브로셔 선택적)
- `messages/ko.json`, `messages/en.json` (nexumm lx/vx 메타데이터, cta 키)

삭제:
- `src/app/[locale]/solutions/nexumm/page.tsx` (플레이스홀더)
