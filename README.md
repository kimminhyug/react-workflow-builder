# React Flow Builder

## 진행 상황
- 🔗 [Live Demo](https://codesandbox.io/s/github/kimminhyug/react-workflow-builder)
- 🔍 [GitHub Repo](https://github.com/kimminhyug/react-workflow-builder)

## 1. 프로젝트 개요

React Flow 라이브러리를 이용한 시각적 워크플로우 빌더 개발 프로젝트입니다.  
사용자가 드래그 앤 드롭으로 노드를 추가, 연결하고 각 노드의 속성을 편집하여 워크플로우를 설계할 수 있도록 돕습니다.

---

## 2. 주요 기능

- 노드 추가, 삭제 및 위치 변경 (드래그 앤 드롭)
- 노드 간 연결 및 연결 해제
- 다양한 노드 유형 지원 (작업, 조건 분기, 시작/종료)
- 노드 속성 편집 (이름, 조건, 파라미터 등)
- 워크플로우 실행 시뮬레이션 및 상태 표시
- 작업 실행 이력 관리 (필터, 페이징 포함)
- 테마(라이트/다크 모드) 지원

---

## 3. 화면 구성

- **헤더**: 프로젝트명, 테마 전환, 사용자 메뉴
- **패널?**: 노드 라이브러리 (사용 가능한 노드 목록)
- **메인 작업 영역**: React Flow 기반 워크플로우 편집기
- **하단 패널 또는 우측 패널을 통해 탭으로 관리**: 작업 실행 내역 및 로그 테이블

---

## 4. 기술 스택

- React + TypeScript
- React Flow (워크플로우 시각화 및 편집)
- TanStack Table (작업 이력 및 로그 테이블)
- Fluent UI (UI 컴포넌트 및 스타일링)
- React Hook Form (노드 속성 편집 폼)

---

## 5. 확장 가능 기능

- JSON 형식의 워크플로우 저장 및 불러오기
- Undo / Redo 기능 추가
- 다중 워크플로우 관리 기능
- 결재 시스템? 권한? 필요한가
