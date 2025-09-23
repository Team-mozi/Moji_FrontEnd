// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

import unicorn from 'eslint-plugin-unicorn'
import perfectionist from 'eslint-plugin-perfectionist'
import react from 'eslint-plugin-react'
import importPlugin from 'eslint-plugin-import'

export default defineConfig([
  globalIgnores(['dist', 'node_modules/']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      react.configs.flat.recommended,
    ],
    plugins: {
      unicorn,
      perfectionist,
      react,
      import: importPlugin,
    },
    rules: {
      // 파일명: 기본 kebab-case
      'unicorn/filename-case': ['error', { case: 'kebabCase' }],

      // 컴포넌트/클래스 파스칼케이스 (JSX)
      'react/jsx-pascal-case': 'error',

      // React 17+ JSX Transform에서는 필요 없음
      'react/react-in-jsx-scope': 'off',

      // 네이밍/가독성
      'func-names': ['error', 'as-needed'],
      'id-match': [
        'error',
        '^([a-z][a-zA-Z0-9]*|[A-Z][a-zA-Z0-9]*)$',
        {
          properties: false,
          onlyDeclarations: false,
          ignoreDestructuring: false,
        },
      ],

      // 필수 default-case
      'default-case': 'error',

      // 변수 가리기 금지
      'no-shadow': 'error',

      // 한 줄 하나 선언
      'one-var': ['error', 'never'],

      // 예외 최소화
      'no-throw-literal': 'error',

      // import/객체 키 정렬(가독성)
      'perfectionist/sort-imports': ['warn', { type: 'natural', order: 'asc' }],
      'perfectionist/sort-objects': ['warn', { type: 'natural', order: 'asc' }],

      // default export 지양 (특정 경로에서만 허용)
      'import/no-default-export': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
  // 컴포넌트/페이지/레이아웃/라우트 폴더는 PascalCase 파일명 허용
  {
    files: ['src/**/{components,pages,layouts,routes}/**/*.{ts,tsx}'],
    rules: {
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
    },
  },
  // 최상위 App 파일 허용
  {
    files: ['src/App.tsx'],
    rules: {
      'unicorn/filename-case': ['error', { case: 'pascalCase' }],
    },
  },
  // App, pages, routes에서는 default export 허용
  {
    files: [
      'src/App.tsx',
      'src/pages/**/*.{ts,tsx}',
      'src/routes/**/*.{ts,tsx}',
    ],
    rules: {
      'import/no-default-export': 'off',
    },
  },
  // 자동 생성된 OpenAPI 엔드포인트 파일 완화
  {
    files: ['src/services/endpoints/**/*.{ts,tsx}'],
    rules: {
      'perfectionist/sort-objects': 'off',
      'perfectionist/sort-imports': 'off',
      'import/no-default-export': 'off',
    },
  },
])
