## 로컬 개발 가이드 (Local Development)

### 0. VSCODE EXTENTIONS(선택사항)
1. 프로젝트를 VS Code로 엽니다.
2. 우측 하단에 뜨는 **"Install Recommended Extensions"** 알림을 클릭하여 설치하거나,
3. 익스텐션 탭(`Ctrl+Shift+X`)에서 `@recommended`를 검색하여 모두 설치해 주세요.

### 1. 프로젝트 복제 (Clone)
```
git clone https://github.com/rhistle-official/rhistle.com.git
cd rhistle.com
```

### 2. 패키지 설치 (Install Dependencies)
```
pnpm install
```
### 3. 개발 서버 실행 (Run Development)
```
pnpm dev
``