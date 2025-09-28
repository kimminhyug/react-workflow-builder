import { FontIcon } from '@fluentui/react';
import { useState } from 'react';
import { useWorkflow } from '../../../hooks/useWorkflow';

export const WorkflowFAB = () => {
  const {
    simulateExecution,
    pauseExecution,
    executionState,
    resumeExecution,
    stopExecution,
    exportWorkflowJSON,
  } = useWorkflow();

  const [open, setOpen] = useState(false);

  // const _reassignWorkflowIds = () => {
  //   const { newNodes, oldToNew } = reassignNodeIds(nodes);
  //   console.log(oldToNew, newNodes);
  //   const newEdges = reassignEdgeIds(edges, oldToNew);
  //   console.log(newEdges);
  //   setNodes(newNodes);
  //   setEdges(newEdges);
  // };

  const isRunning = executionState === 'running';
  const isPause = executionState === 'paused';

  return (
    <div className="fab-container">
      {/* 메인 버튼 */}
      <div className="fab-main" onClick={() => setOpen(!open)}>
        <FontIcon iconName={`${open ? 'SkypeCircleMinus' : 'CircleAdditionSolid'}`}></FontIcon>
      </div>
      {/* 서브 버튼들 */}
      <div className={`fab-menu ${open ? 'open' : ''}`}>
        <div
          className="fab-sub"
          // 함수화 필요
          onClick={() =>
            isRunning ? stopExecution() : isPause ? stopExecution : simulateExecution()
          }
        >
          {/* <AppendSubText label="시작" subText={selectedNode?.data?.label ?? '시작 노드 선택'} /> */}
          <FontIcon
            iconName={`${isRunning ? 'CircleStopSolid' : isPause ? 'CircleStopSolid' : 'Play'}`}
          ></FontIcon>
        </div>
        <div className="fab-sub" onClick={() => (isRunning ? pauseExecution() : resumeExecution())}>
          <FontIcon iconName={`${isRunning ? 'CirclePauseSolid' : 'PlayResume'}`}></FontIcon>
        </div>

        <div className="fab-sub" onClick={exportWorkflowJSON}>
          <FontIcon iconName="DownloadDocument"></FontIcon>
        </div>
      </div>
    </div>
  );
};
