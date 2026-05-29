# 솔루션 헤더 드롭다운 & 라우팅 평탄화 설계

날짜: 2026-05-29
브랜치: feat/nexumm-lx-vx

## 배경

현재 솔루션 정보 구조(IA)는 **CoreCode + Nexumm(LX/VX)** 2제품 모델이다.

- 라우트: `/solutions/corecode`, `/solutions/nexumm/lx`, `/solutions/nexumm/vx`
- `/solutions` 인덱스 페이지는 없음 (헤더 "Solutions" 링크가 `proxy.ts`에서 `/solutions/corecode`로 리다이렉트됨)

요구사항은 솔루션을 **CoreCode, LX, VX 세 형제**로 다루고, 헤더의 "Solutions"에 마우스를 올리면 하위 메뉴가 보이도록 하는 것이다.

## 결정 사항

브레인스토밍에서 확정된 내용:

1. **라우팅: 완전 평탄화.** URL을 `/solutions/corecode`, `/solutions/lx`, `/solutions/vx` 세 형제로 변경. `nexumm` 경로 세그먼트 제거.
2. **메뉴 그룹핑은 유지.** URL은 평탄하지만, 메뉴(헤더/드로어)에서는 LX·VX를 **Nexumm** 라벨 아래 그룹으로 표시. "Nexumm LX / VX" 브랜딩과 일관성 유지.
3. **상위 "Solutions" 항목: 호버 전용.** 클릭해도 페이지 이동 없음. `/solutions` 랜딩 페이지는 만들지 않음.
4. **모바일 드로어: 아코디언.** 호버가 없으므로 "Solutions"를 탭하면 하위 항목이 아코디언으로 펼쳐짐.
5. **드롭다운 구현: 방식 A (CSS 전용).** `group` + `group-hover` + `focus-within` 으로 구현. JS 상태 없음. 호버와 키보드 포커스 모두에서 열림.

## 메뉴 구조 (데스크톱 & 모바일 공통)

```
Solutions (호버 전용 트리거, 자체 이동 없음)
  ├ CoreCode      → /solutions/corecode
  └ Nexumm        (그룹 라벨, 링크 아님)
      ├ LX        → /solutions/lx
      └ VX        → /solutions/vx
```

## 영향받는 파일

### 1. 라우트 이동 (페이지 평탄화)
- `src/app/[locale]/solutions/nexumm/lx/page.tsx` → `src/app/[locale]/solutions/lx/page.tsx`
- `src/app/[locale]/solutions/nexumm/vx/page.tsx` → `src/app/[locale]/solutions/vx/page.tsx`
- 빈 디렉터리 `src/app/[locale]/solutions/nexumm/` 삭제
- 페이지 내부 콘텐츠/메타데이터/i18n 네임스페이스는 변경하지 않음 (경로만 이동)

### 2. `src/components/Header.tsx` (데스크톱 드롭다운)
- 기존 `<Link href="/solutions">` 단일 링크를 호버 드롭다운으로 교체.
- 트리거는 링크가 아닌 요소(이동 없음). 마우스 호버 또는 키보드 포커스 시 하위 패널 노출.
- 방식 A: 트리거+패널을 `group`(또는 `relative` 컨테이너)로 감싸고 패널에 `opacity/visibility` 또는 `hidden`을 `group-hover:`/`focus-within:`로 토글.
- 패널 내용: CoreCode 링크, "Nexumm" 그룹 라벨(비링크) + 그 아래 LX·VX 링크.
- 접근성: 패널은 `focus-within`으로 키보드 접근 가능해야 하며, 장식 요소에는 `aria-hidden`. 트리거에 적절한 의미(예: `aria-haspopup`은 CSS-only에선 생략 가능, 단 패널을 실제 포커스 가능한 링크로 구성).
- 스크롤 상태(`isScrolled`)에 따른 기존 색상 토큰과 일관되게 패널 배경/텍스트 색 지정.

### 3. `src/components/DrawerMenu.tsx` (모바일 아코디언)
- "Solutions" 항목을 단일 링크에서 아코디언 토글로 변경.
- 탭 시 하위에 CoreCode / Nexumm(LX, VX)가 펼쳐짐.
- 구현: `<details>/<summary>` 또는 로컬 `useState` 토글 중 택일. 본 컴포넌트는 단순하므로 `<details>/<summary>` 사용을 권장(추가 상태 불필요, 기본 접근성 확보).
- 펼침 화살표 등 장식 아이콘은 `aria-hidden`.

### 4. `src/components/SolutionsTab.tsx` (인페이지 상위 탭)
- 구조는 **CoreCode | Nexumm** 2탭 유지.
- Nexumm 탭 `href`: `/solutions/nexumm/lx` → `/solutions/lx`.
- 활성 판정 `match`: `/solutions/nexumm` → 새 라우트 기준으로 변경. LX/VX 둘 다에서 Nexumm 탭이 활성화되어야 하므로, 경로가 `/solutions/lx` 또는 `/solutions/vx`일 때 활성으로 판정하는 로직으로 수정(예: 해당 경로 집합 포함 여부 검사).

### 5. `src/components/NexummSubTab.tsx` (인페이지 하위 탭)
- `href`: `/solutions/nexumm/lx` → `/solutions/lx`, `/solutions/nexumm/vx` → `/solutions/vx`.
- 활성 판정은 기존 `startsWith(href)` 유지(두 경로가 서로의 접두어가 아니므로 안전).

### 6. `src/app/[locale]/page.tsx` (홈 솔루션 카드)
- `solutions` 배열의 Nexumm 카드 `href`: `/solutions/nexumm` → `/solutions/lx`.

### 7. `src/app/sitemap.ts`
- `/solutions/nexumm/lx` → `/solutions/lx`
- `/solutions/nexumm/vx` → `/solutions/vx`

### 8. `src/proxy.ts` (리다이렉트)
- `/solutions` → `/solutions/corecode` 유지.
- `/solutions/nexumm` 리다이렉트: 현재 `${pathname}/lx`로 보냄 → 새 평탄 경로 `/solutions/lx`로 변경.
- 라이브 사이트이므로 구 URL의 301 영구 리다이렉트 추가(외부 링크·검색엔진 인덱스 보존):
  - `/solutions/nexumm/lx` → `/solutions/lx`
  - `/solutions/nexumm/vx` → `/solutions/vx`
- 로케일 프리픽스(`/en/...`)를 고려해 `endsWith` 기반 매칭이 모든 로케일에서 동작하도록 처리.

## 비목표 (Out of scope)
- `/solutions` 랜딩/개요 페이지 신설하지 않음.
- 솔루션 페이지 본문 콘텐츠·디자인·i18n 텍스트 변경 없음(경로 이동과 링크 갱신만).
- 인페이지 탭을 3개 평탄 탭으로 재구성하지 않음(그룹 모델 유지).
- 관련 없는 리팩터링 없음.

## 검증 기준
- 데스크톱: "Solutions" 호버 시 드롭다운 노출, 클릭 시 이동 없음, 각 하위 링크가 올바른 새 경로로 이동.
- 키보드: Tab으로 하위 링크에 포커스 가능(focus-within).
- 모바일: "Solutions" 탭 시 아코디언 펼침, 하위 링크 동작.
- 새 경로 `/solutions/lx`, `/solutions/vx`, `/solutions/corecode` 정상 렌더.
- 구 경로 `/solutions/nexumm/lx`, `/solutions/nexumm/vx`가 301로 새 경로 리다이렉트(로케일 포함).
- 인페이지 `SolutionsTab`/`NexummSubTab` 활성 표시가 LX/VX 페이지에서 올바르게 동작.
- `sitemap.xml`에 새 경로 반영, 구 경로 없음.
- 빌드/린트(biome) 통과.
