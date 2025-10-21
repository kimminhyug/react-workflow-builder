# React Flow Builder

## 진행 상황
- 🔗 [Live Demo](https://kimminhyug.github.io/react-workflow-builder/)
- 🔍 [GitHub Repo](https://github.com/kimminhyug/react-workflow-builder)

## 1. 프로젝트 개요

React Flow 라이브러리를 이용한 시각적 워크플로우 빌더 개발 프로젝트입니다.  
사용자가 드래그 앤 드롭으로 노드를 추가, 연결하고 각 노드의 속성을 편집하여 워크플로우를 설계할 수 있도록 돕습니다.

---

## 2. 주요 기능

- 노드 추가, 삭제 및 위치 변경 (드래그 앤 드롭)
  - ![Image](https://github.com/user-attachments/assets/798a20e5-1021-40c6-ab4d-12f0c5707681)
- 노드 간 연결 및 연결 해제
- 다양한 노드 유형 지원 (작업, 조건 분기, 시작/종료)
- 노드 속성 편집 (이름, 조건, 파라미터 등)
  - <img width="1903" height="886" alt="Image" src="https://github.com/user-attachments/assets/ca83b6cf-f813-40a8-9f89-772068371174" />
  - <img width="1889" height="879" alt="Image" src="https://github.com/user-attachments/assets/7e259fa9-1478-452e-be8e-41cdcc37582d" />
  - <img width="1903" height="896" alt="Image" src="https://github.com/user-attachments/assets/e494f49f-583a-4e8d-bf7a-5e30c1badfd8" />
  - <img width="1904" height="878" alt="Image" src="https://github.com/user-attachments/assets/d243c65b-850c-47d4-884d-e717384cbebe" />
- 워크플로우 실행 시뮬레이션 및 상태 표시
  - ![Image](https://github.com/user-attachments/assets/e63f0b62-3f46-4b06-850d-fc2df8854390)
- 작업 실행 이력 관리 (필터, 페이징 포함)
- 테마(라이트/다크 모드) 지원
- 다국어 적용
  - ![Image](https://github.com/user-attachments/assets/3dfa8b90-3d29-4f15-9306-e04313dda0c4)

---

## 3. 화면 구성

- **헤더--> FAB UI 형태**: 프로젝트명, 테마 전환, 사용자 메뉴
-   - <img width="101" height="335" alt="Image" src="https://github.com/user-attachments/assets/33e33985-d4ed-4051-894f-35598483fc04" />
- **패널**: 항목 추가, 속성 / 설정,  스타일, 동작 로그
  ### 1. 항목 추가 영역(진행중)
    - <img width="398" height="907" alt="Image" src="https://github.com/user-attachments/assets/5af1b4f1-6ca7-4e15-a4f3-1cd7e5476c3f" />
- **메인 작업 영역**: React Flow 기반 워크플로우 편집기

---

## 4. 기술 스택

- React + TypeScript
- React Flow (워크플로우 시각화 및 편집)
- TanStack Table (작업 이력 및 로그 테이블)
- jotai (상태 관리)
- Fluent UI (UI 컴포넌트 및 스타일링)
- React Hook Form (노드 속성 편집 폼)
- yup (유효성 검사)
- react-toastify (메세지 처리)
---

## 5. 확장 가능 기능

- JSON 형식의 워크플로우 저장 및 불러오기
- Undo / Redo 기능 추가
- 다중 워크플로우 관리 기능
  - 진행중
```typescript
export interface IWorkflow {
  id: string;
  name?: string;
  description?: string;
  regData: number;
  modDate: number;
  nodes: CustomNode[];
  edges: CustomEdge[];
}
```

- 결재 시스템? 권한? 필요한가
