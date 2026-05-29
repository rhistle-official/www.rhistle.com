# 솔루션 헤더 드롭다운 & 라우팅 평탄화 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 솔루션 라우트를 `/solutions/{corecode,lx,vx}`로 평탄화하고, 헤더 "Solutions"에 호버 드롭다운(데스크톱)·아코디언(모바일)을 추가한다.

**Architecture:** Next.js App Router(next-intl 다국어) 마케팅 사이트. URL은 평탄하게(`nexumm` 세그먼트 제거), 메뉴 표시에서는 LX·VX를 "Nexumm" 그룹 라벨 아래에 묶는다. 드롭다운은 JS 상태 없이 CSS `group-hover` + `focus-within`(방식 A)으로 구현한다. 구 URL은 `proxy.ts`에서 301 리다이렉트한다.

**Tech Stack:** Next.js 16, React 19, next-intl 4, Tailwind CSS, Biome(lint/format). **테스트 프레임워크 없음** — 검증은 `npm run build`, `npx biome check ./src`, `npm run dev` 라우트 확인으로 수행한다.

**참고 — 경로 표기:** 모든 앱 경로의 `[locale]`은 셸에서 글롭으로 해석되므로 **반드시 따옴표로 감싼다**: `"src/app/[locale]/..."`.

**참고 — `usePathname` 동작:** next-intl의 `usePathname()`은 로케일 접두어를 **제거한** 경로를 반환한다(예: `/en/solutions/lx` → `/solutions/lx`). 반면 `proxy.ts`의 `request.nextUrl.pathname`은 로케일 접두어를 **포함**한다(예: `/en/solutions/lx`). 그래서 인페이지 탭은 `/solutions/...`로 비교하고, proxy는 `endsWith`로 매칭한다.

---

### Task 1: 라우트 디렉터리 평탄화 (페이지 이동)

`nexumm/lx`, `nexumm/vx` 페이지를 `solutions` 바로 아래로 옮긴다. 파일 내용은 변경하지 않는다(경로만 이동).

**Files:**
- Move: `"src/app/[locale]/solutions/nexumm/lx/"` → `"src/app/[locale]/solutions/lx/"`
- Move: `"src/app/[locale]/solutions/nexumm/vx/"` → `"src/app/[locale]/solutions/vx/"`
- Delete: 빈 디렉터리 `"src/app/[locale]/solutions/nexumm/"`

- [ ] **Step 1: 디렉터리 이동 (git mv)**

```bash
git mv "src/app/[locale]/solutions/nexumm/lx" "src/app/[locale]/solutions/lx"
git mv "src/app/[locale]/solutions/nexumm/vx" "src/app/[locale]/solutions/vx"
```

- [ ] **Step 2: 남은 빈 nexumm 디렉터리 제거**

```bash
rmdir "src/app/[locale]/solutions/nexumm" 2>/dev/null; true
```

- [ ] **Step 3: 이동 결과 확인**

Run: `find "src/app/[locale]/solutions" -name page.tsx`
Expected (3줄):
```
src/app/[locale]/solutions/corecode/page.tsx
src/app/[locale]/solutions/lx/page.tsx
src/app/[locale]/solutions/vx/page.tsx
```

- [ ] **Step 4: Commit (관련 경로만 스테이징)**

> 주의: 작업 트리에 무관한 미커밋 변경이 다수 있다. `git add -A`를 쓰지 말고 솔루션 경로만 스테이징한다. `git mv`로 이동/삭제는 이미 스테이징되어 있다.

```bash
git add "src/app/[locale]/solutions"
git commit -m "refactor: 솔루션 LX/VX 라우트를 /solutions 직하로 평탄화"
```

---

### Task 2: sitemap 경로 갱신

**Files:**
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: hrefs 배열의 nexumm 경로를 평탄 경로로 교체**

`src/app/sitemap.ts`의 `hrefs` 배열에서 다음 두 줄을 교체한다.

변경 전:
```ts
  "/solutions/corecode",
  "/solutions/nexumm/lx",
  "/solutions/nexumm/vx",
```
변경 후:
```ts
  "/solutions/corecode",
  "/solutions/lx",
  "/solutions/vx",
```

- [ ] **Step 2: 확인**

Run: `grep -n "solutions" src/app/sitemap.ts`
Expected: `/solutions/corecode`, `/solutions/lx`, `/solutions/vx` 만 보이고 `nexumm` 없음.

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "chore: sitemap에 평탄화된 솔루션 경로 반영"
```

---

### Task 3: 구 URL 301 리다이렉트 (proxy)

라이브 사이트의 구 URL(`/solutions/nexumm/lx|vx`, `/solutions/nexumm`)을 새 경로로 영구 리다이렉트한다. `pathname`은 로케일 접두어를 포함하므로 `endsWith`로 매칭하고 `replace`로 새 경로를 만든다. 더 긴 경로(`/nexumm/lx`, `/nexumm/vx`)를 `/nexumm`보다 먼저 검사한다.

**Files:**
- Modify: `src/proxy.ts`

- [ ] **Step 1: 리다이렉트 블록 교체**

`src/proxy.ts`에서 기존 두 if 블록(11~15행)을 아래로 교체한다.

변경 전:
```ts
  if (pathname.endsWith("/solutions"))
    return NextResponse.redirect(new URL("/solutions/corecode", request.url));

  if (pathname.endsWith("/solutions/nexumm"))
    return NextResponse.redirect(new URL(`${pathname}/lx`, request.url));
```
변경 후:
```ts
  if (pathname.endsWith("/solutions"))
    return NextResponse.redirect(new URL("/solutions/corecode", request.url));

  if (pathname.endsWith("/solutions/nexumm/lx"))
    return NextResponse.redirect(
      new URL(pathname.replace("/solutions/nexumm/lx", "/solutions/lx"), request.url),
      301,
    );

  if (pathname.endsWith("/solutions/nexumm/vx"))
    return NextResponse.redirect(
      new URL(pathname.replace("/solutions/nexumm/vx", "/solutions/vx"), request.url),
      301,
    );

  if (pathname.endsWith("/solutions/nexumm"))
    return NextResponse.redirect(
      new URL(pathname.replace("/solutions/nexumm", "/solutions/lx"), request.url),
      301,
    );
```

- [ ] **Step 2: 빌드로 타입/구문 확인은 Task 8에서 일괄. 여기서는 린트만**

Run: `npx biome check "src/proxy.ts"`
Expected: 오류 없음(필요 시 `--write`로 포맷).

- [ ] **Step 3: Commit**

```bash
git add src/proxy.ts
git commit -m "feat: 구 nexumm 솔루션 URL을 평탄 경로로 301 리다이렉트"
```

---

### Task 4: 인페이지 탭 경로 갱신 (SolutionsTab / NexummSubTab)

**Files:**
- Modify: `src/components/SolutionsTab.tsx`
- Modify: `src/components/NexummSubTab.tsx`

- [ ] **Step 1: NexummSubTab의 href를 평탄 경로로 변경**

`src/components/NexummSubTab.tsx`의 `tabs` 배열:

변경 전:
```ts
const tabs = [
  { name: "Nexumm LX", href: "/solutions/nexumm/lx" },
  { name: "Nexumm VX", href: "/solutions/nexumm/vx" },
];
```
변경 후:
```ts
const tabs = [
  { name: "Nexumm LX", href: "/solutions/lx" },
  { name: "Nexumm VX", href: "/solutions/vx" },
];
```

(활성 판정 `pathName.startsWith(tab.href)`는 그대로 둔다. `/solutions/lx`와 `/solutions/vx`는 서로의 접두어가 아니므로 안전하다.)

- [ ] **Step 2: SolutionsTab의 Nexumm 탭 href/match 변경**

`src/components/SolutionsTab.tsx`의 `tabs` 배열에서 Nexumm 항목을 변경한다.

변경 전:
```ts
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
변경 후:
```ts
const tabs = [
  {
    name: "CoreCode",
    href: "/solutions/corecode",
    match: ["/solutions/corecode"],
  },
  {
    name: "Nexumm",
    href: "/solutions/lx",
    match: ["/solutions/lx", "/solutions/vx"],
  },
];
```

- [ ] **Step 3: SolutionsTab의 활성 판정 로직을 배열 기반으로 수정**

같은 파일에서 활성 판정 줄을 변경한다.

변경 전:
```tsx
          const isActive = pathName.startsWith(tab.match);
```
변경 후:
```tsx
          const isActive = tab.match.some((m) => pathName.startsWith(m));
```

- [ ] **Step 4: 린트 확인**

Run: `npx biome check "src/components/SolutionsTab.tsx" "src/components/NexummSubTab.tsx"`
Expected: 오류 없음.

- [ ] **Step 5: Commit**

```bash
git add src/components/SolutionsTab.tsx src/components/NexummSubTab.tsx
git commit -m "refactor: 인페이지 솔루션 탭을 평탄 경로로 갱신"
```

---

### Task 5: 홈 솔루션 카드 링크 갱신

**Files:**
- Modify: `src/app/[locale]/page.tsx` (solutions 배열, 약 88~101행)

- [ ] **Step 1: Nexumm 카드 href 변경**

`solutions` 배열의 Nexumm 항목 `href`를 변경한다.

변경 전:
```ts
  {
    name: "Nexumm",
    href: "/solutions/nexumm",
    image: nexummImg,
    translationKey: "solutions.nexumm",
  },
```
변경 후:
```ts
  {
    name: "Nexumm",
    href: "/solutions/lx",
    image: nexummImg,
    translationKey: "solutions.nexumm",
  },
```

- [ ] **Step 2: 확인**

Run: `grep -n "/solutions/nexumm" "src/app/[locale]/page.tsx"`
Expected: 결과 없음(빈 출력).

- [ ] **Step 3: Commit**

```bash
git add "src/app/[locale]/page.tsx"
git commit -m "refactor: 홈 Nexumm 솔루션 카드 링크를 /solutions/lx로 변경"
```

---

### Task 6: 헤더 데스크톱 호버 드롭다운 (방식 A)

`Header.tsx`의 단일 `/solutions` 링크를 호버/포커스 드롭다운으로 교체한다. 트리거 자체는 이동하지 않는다(`<span>`). CSS `group-hover` + `group-focus-within`으로 패널을 노출한다.

**Files:**
- Modify: `src/components/Header.tsx`

- [ ] **Step 1: Solutions 링크를 드롭다운 마크업으로 교체**

`src/components/Header.tsx`의 데스크톱 nav 내부에서 아래 한 줄을 교체한다.

변경 전:
```tsx
          <Link href="/solutions">{t("solutions")}</Link>
```
변경 후:
```tsx
          <div className="group relative">
            <span
              className="flex cursor-default items-center gap-1"
              aria-haspopup="true"
            >
              {t("solutions")}
              <ChevronDown className="size-4" aria-hidden="true" />
            </span>
            <div className="invisible absolute top-full left-0 z-40 min-w-44 translate-y-1 rounded-xl border border-gray-200 bg-white py-2 text-base text-gray-800 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <Link href="/solutions/corecode" className="block px-4 py-2 hover:bg-gray-100">
                CoreCode
              </Link>
              <p className="px-4 pt-3 pb-1 font-semibold text-gray-400 text-sm">Nexumm</p>
              <Link href="/solutions/lx" className="block px-4 py-2 pl-6 hover:bg-gray-100">
                LX
              </Link>
              <Link href="/solutions/vx" className="block px-4 py-2 pl-6 hover:bg-gray-100">
                VX
              </Link>
            </div>
          </div>
```

- [ ] **Step 2: ChevronDown 아이콘 import 추가**

파일 상단의 lucide-react import를 변경한다.

변경 전:
```tsx
import { ArrowUpRight } from "lucide-react";
```
변경 후:
```tsx
import { ArrowUpRight, ChevronDown } from "lucide-react";
```

- [ ] **Step 3: 린트 확인**

Run: `npx biome check "src/components/Header.tsx"`
Expected: 오류 없음.

- [ ] **Step 4: dev 서버로 호버 동작 확인**

Run: `npm run dev` (이미 실행 중이면 생략)
확인 항목:
- 데스크톱 폭에서 "Solutions"에 마우스 호버 → CoreCode / Nexumm(LX, VX) 패널 노출.
- 패널 항목 클릭 → 각각 `/solutions/corecode`, `/solutions/lx`, `/solutions/vx`로 이동.
- "Solutions" 텍스트 클릭 → 이동 없음.
- 키보드 Tab으로 패널 내부 링크 포커스 시 패널이 열림(focus-within).

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.tsx
git commit -m "feat: 헤더 Solutions 호버 드롭다운 추가(CSS group-hover)"
```

---

### Task 7: 모바일 드로어 아코디언

`DrawerMenu.tsx`의 Solutions 링크를 `<details>/<summary>` 아코디언으로 교체한다. 추가 상태 없이 기본 접근성을 확보한다.

**Files:**
- Modify: `src/components/DrawerMenu.tsx`

- [ ] **Step 1: Solutions `<li>`를 아코디언으로 교체**

`src/components/DrawerMenu.tsx`에서 Solutions 항목 `<li>` 블록을 교체한다.

변경 전:
```tsx
            <li>
              <Link
                href="/solutions"
                className="flex w-full items-center justify-center py-4 hover:bg-gray-900"
              >
                {t("solutions")}
              </Link>
            </li>
```
변경 후:
```tsx
            <li>
              <details className="group">
                <summary className="flex w-full cursor-pointer list-none items-center justify-center gap-1 py-4 hover:bg-gray-900">
                  {t("solutions")}
                  <ChevronDown
                    className="size-4 transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <ul className="flex flex-col text-base">
                  <li>
                    <DrawerClose asChild>
                      <Link
                        href="/solutions/corecode"
                        className="flex w-full items-center justify-center py-3 hover:bg-gray-900"
                      >
                        CoreCode
                      </Link>
                    </DrawerClose>
                  </li>
                  <li className="py-2 text-center font-semibold text-gray-400 text-sm">Nexumm</li>
                  <li>
                    <DrawerClose asChild>
                      <Link
                        href="/solutions/lx"
                        className="flex w-full items-center justify-center py-3 hover:bg-gray-900"
                      >
                        LX
                      </Link>
                    </DrawerClose>
                  </li>
                  <li>
                    <DrawerClose asChild>
                      <Link
                        href="/solutions/vx"
                        className="flex w-full items-center justify-center py-3 hover:bg-gray-900"
                      >
                        VX
                      </Link>
                    </DrawerClose>
                  </li>
                </ul>
              </details>
            </li>
```

- [ ] **Step 2: import에 ChevronDown 추가, DrawerClose 사용 확인**

파일 상단 lucide-react import를 변경한다.

변경 전:
```tsx
import { ArrowUpRight, Menu, X } from "lucide-react";
```
변경 후:
```tsx
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
```

(`DrawerClose`는 이미 `@/components/ui/drawer`에서 import되어 있다. 하위 링크 클릭 시 드로어가 닫히도록 `asChild`로 감쌌다.)

- [ ] **Step 3: 린트 확인**

Run: `npx biome check "src/components/DrawerMenu.tsx"`
Expected: 오류 없음.

- [ ] **Step 4: dev 서버로 모바일 동작 확인**

브라우저를 모바일 폭으로 줄이고 햄버거 → Solutions 탭:
- "Solutions" 탭 시 CoreCode / Nexumm(LX, VX) 아코디언 펼침, 화살표 회전.
- 하위 링크 클릭 → 해당 페이지로 이동하며 드로어 닫힘.

- [ ] **Step 5: Commit**

```bash
git add src/components/DrawerMenu.tsx
git commit -m "feat: 모바일 드로어에 Solutions 아코디언 하위 메뉴 추가"
```

---

### Task 8: 전체 검증

**Files:** (없음 — 검증 및 정리)

- [ ] **Step 1: 남은 구 경로 참조가 없는지 전체 검색**

Run: `grep -rn "solutions/nexumm" src/ --include="*.ts" --include="*.tsx"`
Expected: 결과 없음(빈 출력). (proxy.ts의 리다이렉트 매칭 문자열은 의도된 것이므로, 만약 잡히면 Task 3의 `endsWith("/solutions/nexumm...")`만 남아야 함을 확인.)

참고: 위 검색이 `src/proxy.ts`의 리다이렉트 문자열을 잡을 수 있다. 그 줄들은 **의도적**(구 URL 매칭)이며 그대로 둔다. 그 외 `href`/라우트로서의 `solutions/nexumm` 참조는 0건이어야 한다.

- [ ] **Step 2: 프로덕션 빌드**

Run: `npm run build`
Expected: 빌드 성공. 라우트 목록에 `/[locale]/solutions/lx`, `/[locale]/solutions/vx`, `/[locale]/solutions/corecode`가 보이고 `nexumm`는 없음.

- [ ] **Step 3: Biome 전체 체크**

Run: `npx biome check ./src`
Expected: 오류 없음.

- [ ] **Step 4: dev 라우트 수기 확인**

`npm run dev` 후:
- `/solutions/lx`, `/solutions/vx`, `/solutions/corecode` 정상 렌더.
- `/solutions/nexumm/lx` 접속 → `/solutions/lx`로 301 리다이렉트.
- `/solutions/nexumm/vx` → `/solutions/vx`.
- `/solutions/nexumm` → `/solutions/lx`.
- `/en/solutions/nexumm/lx` → `/en/solutions/lx` (로케일 접두어 보존).
- LX/VX 페이지에서 인페이지 탭의 Nexumm 탭이 활성 표시.

- [ ] **Step 5: 최종 커밋(있을 경우)**

빌드/린트로 인한 포맷 변경이 이 작업에서 만진 파일에 있으면, 해당 파일만 스테이징한다(무관한 미커밋 변경은 건드리지 않는다):
```bash
git add src/app/sitemap.ts src/proxy.ts src/components/SolutionsTab.tsx \
        src/components/NexummSubTab.tsx src/components/Header.tsx \
        src/components/DrawerMenu.tsx "src/app/[locale]/page.tsx" "src/app/[locale]/solutions"
git commit -m "chore: 솔루션 드롭다운·라우팅 평탄화 검증 후 정리"
```
