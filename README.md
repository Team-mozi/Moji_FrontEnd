# Moji 프로젝트 가이드 ✨

## 🧱 기술 스택

<!-- Core -->

![React](https://img.shields.io/badge/React-20232a?logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)

<!-- State -->

![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-593D88?logo=redux&logoColor=fff)
![RTK Query](https://img.shields.io/badge/RTK%20Query-CA4245?logo=redux&logoColor=fff)

<!-- Routing -->

![React Router](https://img.shields.io/badge/React%20Router-CA4245?logo=reactrouter&logoColor=fff)

<!-- Style -->

![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff)

<!-- DX -->

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=fff)
![Prettier](https://img.shields.io/badge/Prettier-1A2C34?logo=prettier&logoColor=F7BA3E)

## 🚀 실행 스크립트

```bash
npm run dev       # 개발 서버
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 미리보기
npm run lint      # 린트 체크
npm run lint:fix  # 린트 자동 수정
```

## 🧭 경로 별칭

- `@` → `src/` (tsconfig.app.json, vite.config.ts)
- 예: `import { RootLayout } from '@/layouts/RootLayout'`

## 🗂️ 프로젝트 트리(요약)

```text
src/
  layouts/
    RootLayout.tsx           # 공통 레이아웃(상단 Nav + <Outlet />)
  pages/
    Home.tsx                 # 홈 페이지 (default export)
    Login.tsx                # 로그인 페이지
    Register.tsx             # 회원가입 페이지
    PasswordReset.tsx        # 비밀번호 재설정 페이지
  routes/
    index.tsx                # 라우터 설정 (createBrowserRouter)
  services/
    api.ts                   # RTK Query API 서비스 (예: user)
    store.ts                 # Redux 스토어 (api.reducer + middleware)
  index.css                  # Tailwind 지시문(@tailwind ...)
  main.tsx                   # Redux Provider + RouterProvider 엔트리

tailwind.config.cjs          # Tailwind v3 설정(커스텀 컬러 포함)
postcss.config.cjs           # PostCSS 설정
vite.config.ts               # Vite 설정(+ @ 별칭)
```

## 🛣️ 현재 라우팅

- `/` → Home
- `/login` → Login
- `/register` → Register
- `/password-reset` → PasswordReset

## 🧰 상태관리 (RTK/RTK Query) - 추후 작업 후 수정 예정

- 스토어: `src/services/store.ts`
  - reducer: `{ [api.reducerPath]: api.reducer }`
  - middleware: `api.middleware`
- API: `src/services/api.ts`
  - 예: `user` 쿼리 → 훅 `useUserQuery`

## 📏 코딩 컨벤션

- 컴포넌트/클래스: PascalCase, 파일명도 PascalCase 권장
- 로컬 변수/파라미터: camelCase
- default export 지양(필요 시 예외)
- switch는 항상 `default:` 처리
- 한 줄 하나의 변수 선언
- ESLint–Prettier 충돌 시 Prettier 우선 (필요 시 규칙 조정)
