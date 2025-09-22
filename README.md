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

> 전체적인 구조는 다음 구조를 따르며, 개발 중에 존재하지 않는 파일은 해당 구조를 참조하여 생성 후 작업하시면 됩니다.

```text
📦src
 ┣ 📂assets                    # 이미지, 폰트 등 정적 자산
 ┃ ┗ 📜react.svg
 ┣ 📂components                # 재사용 가능한 범용 UI 컴포넌트
 ┃ ┣ 📜Button.tsx
 ┃ ┣ 📜Input.tsx
 ┃ ┗ 📜Modal.tsx
 ┣ 📂features                  # 특정 기능에 초점을 둔 컴포넌트 및 로직
 ┃ ┣ 📂auth                    # 회원 인증(로그인, 가입, 비밀번호 재설정) 관련 기능
 ┃ ┃ ┗ 📜AuthForm.tsx          # 로그인/가입 폼을 포괄하는 컴포넌트
 ┃ ┗ 📂user                    # 사용자 정보 관련 기능
 ┃   ┗ 📜UserProfile.tsx       # 사용자 프로필을 보여주는 컴포넌트
 ┣ 📂hooks                     # 커스텀 훅
 ┣ 📂layouts                   # 모든 페이지에서 공통적으로 표시되는 UI 요소를 정의
 ┃ ┗ 📜RootLayout.tsx
 ┣ 📂pages                     # 라우팅 되는 페이지 컴포넌트 (주로 features 컴포넌트 조합)
 ┃ ┣ 📜Home.tsx
 ┃ ┣ 📜Login.tsx
 ┃ ┣ 📜PasswordReset.tsx
 ┃ ┗ 📜Register.tsx
 ┣ 📂routes                    # 라우터 설정
 ┃ ┗ 📜index.tsx
 ┣ 📂services                  # API 엔드포인트 및 외부 서비스 로직
 ┃ ┣ 📜api.ts                  # RTK Query 'createApi' 기본 설정
 ┃ ┗ 📜endpoints
 ┃   ┣ 📜auth.ts               # 인증 관련 RTK Query endpoints (로그인, 가입 등)
 ┃   ┣ 📜emoji.ts              # 이모지 관련 RTK Query endpoints
 ┃   ┗ 📜user.ts               # 사용자 관련 RTK Query endpoints (프로필 조회 등)
 ┣ 📂store                     # Redux 상태 관리
 ┃ ┣ 📜index.ts                # Redux 스토어 생성 및 설정
 ┃ ┗ 📜slices                  # Redux slices
 ┃   ┣ 📜authSlice.ts          # 인증 상태(로그인 여부 등) 관리
 ┃   ┗ 📜userSlice.ts          # 사용자 정보 상태 관리
 ┣ 📂styles                    # CSS 파일
 ┃ ┗ 📜index.css
 ┣ 📂types                     # 타입 정의 파일
 ┣ 📂utils                     # 유틸리티 함수
 ┣ 📜App.tsx                   # 메인 애플리케이션 컴포넌트 (라우터 포함)
 ┣ 📜main.tsx                  # 애플리케이션 진입점 (Provider, Router)
 ┗ 📜vite-env.d.ts             # Vite 환경 변수 타입
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

## 🔄 API 자동화 시스템

### 📋 개요

Swagger API 문서를 기반으로 RTK Query 훅과 TypeScript 타입을 자동 생성하는 시스템입니다.

### 🛠️ 기술 스택

- **@rtk-query/codegen-openapi**: OpenAPI 스펙을 RTK Query 코드로 변환
- **자동 타입 생성**: TypeScript 타입 정의 자동 생성
- **훅 자동 생성**: React Query 훅 자동 생성

### 🚀 사용 방법

#### 1. API 스키마 자동 생성

```bash
npm run refreshApi
```

#### 2. 생성되는 파일들

- `src/services/endpoints/user.ts` - 사용자 관련 API (로그인, 회원가입 등)
- `src/services/endpoints/user-emoji.ts` - 사용자 이모지 관련 API
- `src/services/endpoints/emoji.ts` - 이모지 관련 API

#### 3. 사용 예시

```typescript
// 자동 생성된 훅 사용
import { useLoginMutation, useGetEmojisQuery } from '@/services/endpoints'

// 로그인
const [login, { isLoading }] = useLoginMutation()
await login({ loginRequest: { email, password } })

// 이모지 목록 조회
const { data: emojis } = useGetEmojisQuery()
```

### ⚙️ 설정 파일

- `openapi-config/mozi_api.js`: API 생성 설정
- `openapi-config/generate.sh`: 생성 스크립트

### 🔧 설정 커스터마이징

`openapi-config/mozi_api.js`에서 다음을 수정할 수 있습니다:

- API 엔드포인트 필터링
- 출력 파일 경로
- 훅 생성 옵션
