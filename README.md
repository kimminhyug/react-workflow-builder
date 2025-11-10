# React Flow Builder

## 진행 상황
- 🔗 [Live Demo](https://kimminhyug.github.io/react-workflow-builder/)
- 🔍 [GitHub Repo](https://github.com/kimminhyug/react-workflow-builder)

## 1. 프로젝트 개요

이 프로젝트는 **React Flow를 이용한 시각적 워크플로우 빌더**입니다.  
사용자가 드래그 앤 드롭으로 노드를 추가·연결하고 각 노드의 속성을 편집하여  
업무 자동화 또는 데이터 파이프라인 구조를 시각적으로 설계할 수 있습니다.

---

## 2. 주요 기능

### 1. 노드 관리
- **설명**: 추가 / 삭제 / 이동 / 연결 / 해제
- **예시**:
<img src="https://github.com/user-attachments/assets/798a20e5-1021-40c6-ab4d-12f0c5707681" width="600"/>

### 2. 커스텀 노드 유형
- **설명**: 시작, 조건 분기, 작업, 종료 등 다양한 타입 지원
- **예시**:
<img src="https://github.com/user-attachments/assets/e63f0b62-3f46-4b06-850d-fc2df8854390" width="600"/>

### 3. 속성 편집 패널
- **설명**: React Hook Form + yup 기반 유효성 검사
- **예시**:
<img src="https://github.com/user-attachments/assets/ca83b6cf-f813-40a8-9f89-772068371174" width="600"/>

### 4. 상태 동기화
- **설명**: jotai를 활용해 노드 상태 전역 제어
- **예시**:
<img src="https://github.com/user-attachments/assets/a20a6ce7-0680-40d5-89e4-55e8cba62eea" width="600"/>

### 5. 실행 시뮬레이터 🔥
- **설명**: Running / Error / Done 상태에 따라 UI 표시
- **예시**:

| 상태     | 예시 |
| -------- | ---- |
| Default  | <img src="https://github.com/user-attachments/assets/a20a6ce7-0680-40d5-89e4-55e8cba62eea" width="400"/> |
| Running  | <img src="https://github.com/user-attachments/assets/3cfa19a7-6a65-4169-90ab-e1f8cc33f850" width="400"/> |
| Error    | <img src="https://github.com/user-attachments/assets/d40be53a-16d4-4ce8-b622-4b10b7b0fe31" width="400"/> |
| Done     | <img src="https://github.com/user-attachments/assets/a99e72d6-9354-4644-a243-c434dafed5ed" width="400"/> |
| Selected | <img src="https://github.com/user-attachments/assets/fa3e7707-5cb6-456e-8f16-f78ec292fa21" width="400"/> |

### 6. 이력 관리 시스템
- **설명**: TanStack Table 기반 로그 및 페이징 처리 (개발 예정)
- **예시**: (추후 이미지 추가)

### 7. 다국어(i18n)
- **설명**: i18next 기반 언어 전환
- **예시**:
<img src="https://github.com/user-attachments/assets/3dfa8b90-3d29-4f15-9306-e04313dda0c4" width="600"/>

---

## 4. 화면 구성

## 4. 화면 구성

### 1. 헤더 (FAB UI 형태)
- **설명**: 프로젝트명, 테마 전환, 사용자 메뉴
- **예시**:
<img src="https://github.com/user-attachments/assets/33e33985-d4ed-4051-894f-35598483fc04" width="200" />

### 2. 패널
- **설명**: 항목 추가, 속성/설정, 스타일, 동작 로그
- **예시**:
<img src="https://github.com/user-attachments/assets/5af1b4f1-6ca7-4e15-a4f3-1cd7e5476c3f" width="400" />

### 3. 메인 작업 영역
- **설명**: React Flow 기반 워크플로우 편집기
- **예시**: 

---

## 5. 기술 스택

- **Framework**: React + TypeScript  
- **Visualization**: React Flow  
- **State Management**: jotai  
- **UI Library**: Fluent UI  
- **Form & Validation**: React Hook Form + yup  
- **Data Table**: TanStack Table  
- **Toast & Feedback**: react-toastify  
- **i18n**: react-i18next  

---

## 5. 설계

워크플로우 빌더의 핵심 설계 구조입니다.

---

### 1. 워크플로우 구조

- 워크플로우는 노드(nodes)와 엣지(edges)로 구성됩니다.  
- 각 워크플로우는 고유 ID, 이름, 설명, 생성/수정 시각을 가집니다.  
- `nodes`는 커스텀 노드 배열, `edges`는 노드 간 연결 정보를 나타냅니다.  

```ts
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

---

### 2. 노드/엣지 상태

- 노드 상태: 시작준비, 대기중, 실행중, 완료, 실패  
- 엣지 상태: 시작준비, 대기중, 실행중, 완료, 실패  
- 상태 기반으로 UI 표시 및 실행 흐름 제어가 가능합니다.  

```ts
export type NodeStatus = 'startWaiting' | 'waiting' | 'running' | 'done' | 'failed';
export type EdgeStatus = 'startWaiting' | 'waiting' | 'running' | 'done' | 'failed';
```

---

### 3. 조건 타입

- 분기 노드(DecisionNode)에서 조건 평가 방식을 정의합니다.  
- 조건 타입에는 정적 값(static), 정규식(regex), 표현식(expression)이 있습니다.  

```ts
export type ConditionType = 'static' | 'regex' | 'expression';
```

---

### 4. 시뮬레이션 컨텍스트

- 실행 중 노드 간 데이터를 공유하고 상태를 관리하기 위한 컨텍스트입니다.  
- 각 노드별 실행 결과(nodeResults), 전역 데이터(globals), 현재 실행 중 데이터(current)와 엣지 상태(edgeStatusMap)를 포함합니다.  

```ts
export interface IFlowContext {
  nodeResults: Record<string, any>;        // 노드별 실행 결과
  globals: Record<string, unknown>;        // 전역 데이터
  current?: Record<string, unknown>;       // 현재 실행 노드 전달 데이터
  edgeStatusMap: Record<string, EdgeStatus>; // 엣지 상태
}
```

---

### 5. 조건 정의

- 분기 노드에서 사용할 조건 정보를 정의합니다.  
- 각 조건은 ID, 라벨, 조건 타입, 우선순위, 데이터 접근 키, 패턴, 표현식, 정적 값, 목표 노드 ID를 가질 수 있습니다.  
- 조건 평가 후 참인 경우 해당 목표 노드로 흐름을 전달합니다.  

```ts
export interface ICondition {
  id: string;
  label: string;
  conditionType: ConditionType;
  priority?: number;
  dataAccessKey?: string;
  pattern?: string;
  expression?: string;
  staticValue?: string;
  targetNodeId?: string;
}
```

---

### 6. 기본 노드 데이터

- 모든 노드가 공통으로 가지는 속성입니다.  
- 라벨, 설명, 상태, 엣지 상태, 실행 함수, 시뮬레이션 컨텍스트를 포함합니다.  
- `execute` 함수로 커스텀 로직을 실행할 수 있습니다.  

```ts
type unknownRecord = { [key: string]: unknown };

export type NodeExecute = (context: IFlowContext, node: CustomNode) => Promise<void> | void;

export interface IBaseNodeData extends unknownRecord {
  label?: string;
  description?: string;
  status?: NodeStatus;
  edgeStatus?: EdgeStatus;
  execute?: NodeExecute;
  context?: IFlowContext;
}
```

---

### 7. 노드 유형별 설계

#### TaskNode

- 실제 작업을 수행하는 노드입니다.  
- HTTP 요청, DB 쿼리, 스크립트 실행 등 결과를 시뮬레이션 컨텍스트에 저장합니다.  
- 후속 노드가 결과를 참조할 수 있습니다.  

```ts
export interface ITaskNodeData extends IBaseNodeData {
  taskName?: string;
  taskType?: 'http' | 'db' | 'script';
  inputSource?: string;
}
```


#### MergeNode

- 여러 흐름을 하나로 합치는 노드입니다.  
- 모든 입력 엣지가 완료될 때까지 대기하며, 실패 시 전체 실패 처리도 가능합니다.

```ts
export interface IMergeNodeData extends IBaseNodeData {
  inputs?: string[]; // 합칠 노드 ID 배열
}
```

#### DecisionNode

- 조건 기반 분기 로직을 수행합니다.  
- 각 조건을 평가하고, 참인 조건의 목표 노드로 흐름을 전달합니다.  
- 모든 조건이 실패하면 fallbackTarget으로 이동합니다.

```ts
export interface IDecisionNodeData extends IBaseNodeData {
  condition?: ICondition[];
  fallbackTarget?: string; // 모든 조건 실패 시 이동할 노드 ID
}
```

#### Start / End 

- 워크플로우 시작, 종료, 입력, 일반 오브젝트 역할을 수행합니다.  
- 기본 노드 속성을 그대로 상속합니다.  

---

## 8. 실행 흐름 관리

워크플로우 시뮬레이션의 핵심 설계 영역으로, 노드와 엣지 상태를 기반으로 실행 순서를 제어하고, 조건과 병합, 실행 결과를 종합하여 다음 노드로 흐름을 전달합니다.

### 8.1 노드/엣지 상태
- **NodeStatus**: `'startWaiting' | 'waiting' | 'running' | 'done' | 'failed'`  
- **EdgeStatus**: `'startWaiting' | 'waiting' | 'running' | 'done' | 'failed'`  
각 상태는 UI 표시와 시뮬레이션 흐름 제어에 사용됩니다.

### 8.2 조건 처리 (DecisionNode)
- **ConditionType**: `'static' | 'regex' | 'expression'`  
- 조건 평가 결과에 따라 참인 조건의 Edge로 흐름 전달  
- 조건이 모두 실패할 경우 `fallbackTarget`으로 이동

### 8.3 병합 처리 (MergeNode)
- 여러 입력 흐름을 하나로 합침  
- 모든 입력 노드가 완료될 때까지 대기  
- 입력 중 하나라도 실패하면 전체 실패 처리 가능

### 8.4 Task 실행 (TaskNode)
- HTTP 요청, DB 쿼리, 스크립트 실행 등 실제 작업 수행  
- 결과를 `context.nodeResults`에 저장하여 후속 노드에서 참조 가능  
- 입력은 `context.globals` 또는 이전 노드 결과에서 가져올 수 있음

### 8.5 시뮬레이션 컨텍스트 (IFlowContext)
- `nodeResults`: 노드별 실행 결과 저장  
- `globals`: 전역 데이터 저장  
- `current`: 현재 실행 중인 노드에 전달할 데이터  
- `edgeStatusMap`: 엣지 상태 저장

### 8.6 실행 흐름
1. **attachExecuteHandlers**: 각 노드에 실행 함수(`execute`) 연결  
2. **simulateExecution**: 시작 노드부터 순차/재귀적으로 워크플로우 실행  
3. **walk 함수**: 현재 노드를 실행하고 다음 노드로 이동  
4. **실행 중단**: stop 요청 시 즉시 흐름 중단  
5. **상태 업데이트**: 노드 및 엣지 상태 변경에 따라 UI와 흐름 제어

---

**참고:**  
- 시뮬레이션은 비동기(async) 방식으로 실행되며, 각 노드 실행 중 상태 업데이트를 통해 시각적 애니메이션 및 진행 표시 가능  
- `TaskNode`, `DecisionNode`, `MergeNode`, Default Node를 처리하는 개별 Executor를 통해 유연하게 확장 가능



### 9. 디렉토리 구조

```plaintext
react-workflow-builder/
├── README.md
├── dist/ # 빌드 결과물
├── public/ # 정적 파일
├── src/
│ ├── assets/ # 이미지, SVG 등 자원
│ ├── components/
│ │ ├── common/
│ │ │ └── UI/ # Fluent UI Wrapper 영역
│ │ │ ├── Buttons/
│ │ │ ├── Dialogs/
│ │ │ ├── Forms/
│ │ │ ├── Icon/
│ │ │ ├── Layout/
│ │ │ ├── Navigation/
│ │ │ └── types/
│ │ ├── Form/ # 각종 입력 컨트롤과 드롭다운
│ │ ├── History/ # 히스토리 테이블
│ │ ├── Workflow/ # 워크플로우 관련 노드, 에디터, 유틸
│ │ │ ├── Editor/ # 노드 에디터, Config, Condition
│ │ │ ├── Nodes/ # Node 컴포넌트 (Start, Task, Decision 등)
│ │ │ ├── Edges/ # 엣지 컴포넌트
│ │ │ ├── WorkflowFAB/ # FAB 버튼
│ │ │ ├── constants/ # workflow 상수 정의
│ │ │ └── utils/ # workflow 관련 유틸 (시뮬레이션, ID 등)
│ ├── hooks/ # custom hooks
│ ├── i18n/ # 다국어 처리
│ ├── pages/ # 화면 페이지
│ ├── state/ # jotai 상태 관리
│ ├── styles/ # 전역 및 모듈 CSS
│ ├── utils/ # 유틸리티 함수
│ └── validation/ # Yup, react-hook-form validation
├── package.json
├── tsconfig.json
└── vite.config.ts
```

#### 9-1. 관리 규칙

- `components/common/UI`  
  - 오로지 UI 전용, 도메인 로직 없음  
  - 다국어 처리 허용  
  - 공통 export 관리:
    ```ts
    export * from './Buttons';
    export * from './Dialogs';
    export * from './Forms';
    export * from './Icon';
    export * from './Layout';
    export * from './Navigation';
    export * from './types';
    ```

- `components/Workflow`  
  - 워크플로우 노드/엣지/에디터 전용  
  - 시뮬레이션 및 실행 흐름 로직 포함

- `hooks/`  
  - 상태/데이터 관리, 워크플로우 실행 관련 커스텀 훅

- `state/`  
  - 전역 상태 정의 및 관리 (jotai)

- `pages/`  
  - 화면 구성 및 라우팅

- `utils/`  
  - 공용 유틸, i18n, ID 생성 등

- `styles/`  
  - 전역 CSS, 모듈 CSS

- `validation/`  
  - 입력 폼 검증 로직




