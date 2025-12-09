# project-management

## 목차

- [진행 상황]
- [프로젝트 개요]
- [요구 사항]
- [실행 방법]
- [추가로 선택하신 기술 스택 및 선택 이유]
- [디렉토리 구조 설명]
- [Webpack 구성 요약]
- [상태 관리 / 설계 의도]
- [테스트에 대한 전반적인 설명]

## 진행 사항

- [ x ] [요구사항 분석]
- [ ] [개발환경 세팅]
- [ ] [라이브러리 선정]
- [ ] [화면 디자인 검토]
- [ ] [화면 개발 진행]
- [ ] [테스트 케이스 검토]
- [ ] [Mock Api 검토]

## 프로젝트 개요

- 사용자가 여러 프로젝트들과 관련된 다양한 이슈들을 확인하고 관리할 수 있는 프로젝트 입니다.
- 프로젝트 목록 확인, 프로젝트 선택 시 관련 이슈 정보 확인, 이슈 상태 변경 기능을 제공 할 예정입니다.

## 프로젝트 요구 사항

- AI 사용 금지

- React 18+(프레임워크 사용 x), Typescript
- Webpack(직접 설정하여 사용)
    - SPA 구조로 개발하며 devServer SPA 라우팅 지원 필요
- 상태 관리: 다음 중 자유 선택
    - Redux, Zustand, React Query
- 스타일링 : Tailwind CSS
    - **(선택)** 모바일·태블릿·데스크탑 레이아웃을 고려한 반응형 구현
        - mobile < 768px
        - 768px ≤ tablet < 1250px
        - desktop ≥ 1250px
- 그 외 라이브러리 자유롭게 사용

---

### 페이지 1

- 프로젝트 목록
    - 전체 프로젝트 리스트 표시
    - 프로젝트 선택 시 해당 프로젝트의 이슈 목록을 같은 페이지 내에서 표시
    - 표시 정보 예시
        - name
        - description(optional)
        - createdAt
        - updatedAt
- 이슈 목록 페이지
    - 선택된 프로젝트의 이슈 리스트 표시
        - 표시 정보
        - title
        - status
        - priority
        - updatedAt
        - tags(optional)
    - 정렬 방식
        - updatedAt 최신순
    - **(선택)** 필터 기능
        - status: `ALL / OPEN / IN_PROGRESS / RESOLVED`
        - tags 기반 필터링

### 페이지 2

- 이슈 상세 페이지
    - 이슈 상세 정보
        - title
        - description
        - status
        - priority
        - tags
        - createdAt
        - updatedAt
    - 상태 변경 기능
        - status 변경 가능
    - 비동기 처리
        - 요청 중 로딩 표시
        - 오류 발생 시 에러 표시

### 데이터 구조

#### Project

```ts
{
id: string;
name: string;
description?: string;
createdAt: string;
updatedAt: string;
}
```

#### Issue

```ts
{
id: string;
projectId: string;
title: string;
description: string;
status: "OPEN" | "IN_PROGRESS" | "RESOLVED";
priority: "LOW" | "MEDIUM" | "HIGH";
tags?: string[];
createdAt: string;
updatedAt: string;
}
```

## 요구 사항 분석

- 페이지 1: `전체 프로젝트를 리스트 형태로 출력`하며, 프로젝트 선택 시 해당 프로젝트의 이슈 리스트를 `같은 페이지 내에서 표시`
- 페이지 2: 선택된 프로젝트의 이슈 리스트를 표시
- 로딩 또는 에러에 대한 UI 구현

### 페이지/컴포넌트 구조

#### 페이지 1: 프로젝트 목록, 이슈 목록

- `정렬` 기능 제공
    - `updatedAt` 기준 최신순(`DESC`)
- `필터` 기능 제공
    - `status` / `tags`

- 시나리오(조회)
    - 프로젝트 리스트 요청(로딩 또는 실패 UI 구현)
    - -> 프로젝트 선택
    - -> 이슈 리스트 표시(로딩 또는 실패 UI 구현)
- 페이지 경로: `/projects`
- 예상 API: `/projects`, `/projects/${id}/issues`

#### 페이지 2: 이슈 상세 페이지

- 시나리오 1(조회)
    - 이슈 상세 페이지 이동
    - -> 이슈 상세 내용 요청(로딩 또는 실패 UI 구현)
    - -> 이슈 상세 화면 출력
    - -> 이슈 상태 업데이트(로딩 또는 실패 UI 구현)
    - -> 이슈 상태 페이지 재 출력

- 시나리오 2(설정 수정)
    - (조회 시나리오 후)
    - -> 이슈 상태 업데이트(로딩 또는 실패 UI 구현)
    - -> 이슈 상태 페이지 재 출력

- 상태 변경 시 `PATCH(부분 수정)` 요청
- 페이지 경로: `/projects/${projectId}/issues/${issueId}`
- 예상 API: Patch `/projects/${projectId}/issues/${issueId}`

## 개발 환경 세팅

현재 프로젝트는 React + TypeScript 기반으로 개발되었으며, Webpack과 ESLint, Prettier 설정을 포함합니다.

### Eslint

### Plugins

- `react`: React 규칙 등록
- `@typescript-eslint`: TypeScript 규칙 등록
- `react-hooks`: React Hooks 규칙 등록
- `unused-imports`: unused-imports 등록
- `prettier`: prettier 연동을 위한 사전 작업

#### Extends

`eslint:recommended`: 기본 ESLint 규칙 활성화
`plugin:react/recommended`: 기본 React 규칙 활성화
`plugin:@typescript-eslint/recommended`: 기본 TypeScript 규칙 활성화
`plugin:react-hooks/recommended`: Hooks 관련 규칙활성화
`plugin:prettier/recommended`: Prettier와의 충돌방지

#### Rules

`prettier/prettier`: Prettier 규칙 위반 되는경우 에러 처리
`unused-imports/no-unused-imports`: 사용하지 않는 import 에러 처리
`react/react-in-jsx-scope`: React 17 이상에서는 JSX 사용 시 react import 불필요므로 비활성화

### Prettier

- 들여쓰기는 4칸으로 지정합니다.
- LF, CRLF 이슈로 인해 `endOfLine lf` 로 통일

```json
{
    "semi": true,
    "singleQuote": true,
    "tabWidth": 4,
    "endOfLine": "lf"
}
```

### Webpack

### 상태 관리 설계

#### React Query

- `useGetProjectList`: 프로젝트 리스트를 조회
- `useGetProjectIssueList`: 특정 프로젝트의 이슈 리스트를 조회

#### State(전역 상태의 경우 라이브러리 선정 필요)

- 필터 상태(상태를 공유 할 필요가 없을것으로 생각되며 useState로 처리)

### SPA 설정 / 라우팅 경로 설정

- `BrowserRouter` 사용
- `/` → ProjectListPage
- `/projects/${projectId}/issues/${issueId}` → IssueDetailPage
- devServer: `historyApiFallback: true` 처리

### 비동기 처리

- 이슈 목록/상세 API → `axios`
- 로딩 표시: skeleton / spinner(api 요청)
- 오류 처리: alert(`toastify?`), 에러 컴포넌트

### 필터/정렬 설계

- status 필터: 선택값에 따라 필터링(`Chip` 형태)
- tags 필터: 선택값에 따라 필터링(검토 필요)
- 정렬: updatedAt 최신순(`DESC`)

```

```
