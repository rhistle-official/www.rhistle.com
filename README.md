# www.rhistle.com

리슬(Rhistle) 공식 웹사이트입니다. Next.js App Router 기반이며 한국어/영어 다국어를 지원합니다.

### 기술 스택

- **Next.js 16** (App Router, React Compiler) / **React 19**
- **TypeScript 6**
- **Tailwind CSS 4**
- **next-intl** — 다국어 라우팅 (`ko` 기본, `en`)
- **Motion**, **Radix UI**, **Lucide** — 애니메이션 및 UI
- **Zod** + **Server Actions** — 문의 폼 검증 및 처리
- **Nodemailer** — 문의 메일 발송
- **Biome** — 린트 & 포맷
- **pnpm** — 패키지 매니저
- **Infisical** — 환경변수 관리

---

## 로컬 개발 가이드 (Local Development)

### 0. 사전 준비 (Prerequisites)

- **Node.js 24**
- **pnpm** — `package.json`의 `devEngines`에 버전이 명시되어 있어 Corepack 사용 시 자동으로 맞춰집니다.
- **[Infisical CLI](https://infisical.com/docs/cli/overview)** — 개발 서버 실행에 필요합니다.
  ```
  # Windos
  winget install infisical

  # 그 외 설치 방법은 위 공식 문서 참고
  ```

### 1. VS Code 익스텐션 (선택사항)

1. 프로젝트를 VS Code로 엽니다.
2. 우측 하단에 뜨는 **"Install Recommended Extensions"** 알림을 클릭하여 설치하거나,
3. 익스텐션 탭(`Ctrl+Shift+X`)에서 `@recommended`를 검색하여 모두 설치해 주세요.

### 2. 프로젝트 복제 (Clone)

```
git clone https://github.com/rhistle-official/www.rhistle.com.git
cd www.rhistle.com
```

### 3. 패키지 설치 (Install Dependencies)

```
pnpm install
```

### 4. Infisical 로그인 (Login)

환경변수는 Infisical에서 주입되므로 최초 1회 로그인이 필요합니다.

```
infisical login
```

### 5. 개발 서버 실행 (Run Development)

```
pnpm dev
```

`infisical run --env=dev`로 감싸져 있어 `dev` 환경의 환경변수가 자동으로 주입됩니다.

---

## 스크립트 (Scripts)

| 명령어 | 설명 |
| --- | --- |
| `pnpm dev` | 개발 서버 실행 (Infisical `dev` 환경변수 주입) |
| `pnpm build` | 프로덕션 빌드 |
| `pnpm start` | 빌드 결과물 실행 |
| `pnpm check` | Biome 린트 + 포맷 검사 및 자동 수정 (`./src`) |

---

## 환경변수 (Environment Variables)

Infisical에서 관리되며, 로컬에 `.env` 파일을 만들 필요는 없습니다.

| 변수 | 용도 |
| --- | --- |
| `MAIL_USER` | 문의 메일 발송 계정 및 수신 주소 |
| `MAIL_PASS` | 문의 메일 발송 계정 비밀번호 |
| `SLACK_WEBHOOK_URL` | 문의 접수 시 Slack 알림 |

---

## 디렉터리 구조 (Structure)

```
messages/            # 다국어 메시지 (ko.json, en.json)
public/              # 정적 에셋
src/
├── actions/         # Server Actions (문의 폼 처리)
├── app/
│   └── [locale]/    # 로케일별 라우트
│       ├── company/
│       ├── contact/
│       └── solutions/  # corecode, lx, vx
├── components/      # cards, forms, layout, motion, sections, ui
├── i18n/            # next-intl 라우팅 및 요청 설정
├── lib/             # SEO 메타데이터, 유틸
├── types/           # 공용 타입
└── proxy.ts         # 다국어 미들웨어 + 레거시 경로 리다이렉트
```

### 라우팅 참고

- 기본 로케일은 `ko`이며 `localePrefix: "as-needed"` 설정으로 한국어 경로에는 접두사가 붙지 않습니다. (`/company`, `/en/company`)
- `/solutions`는 `/solutions/corecode`로 리다이렉트됩니다.
- 구 경로 `/solutions/nexumm/*`는 `/solutions/lx`, `/solutions/vx`로 301 리다이렉트됩니다.
