import { useState } from 'react';
import { useWorkflow } from '../../../hooks/useWorkflow';

import {
  FaFileDownload,
  FaMinus,
  FaPauseCircle,
  FaPlayCircle,
  FaPlus,
  FaRegStopCircle,
} from 'react-icons/fa';
import { RxResume } from 'react-icons/rx';
import { useAtomValue } from 'jotai';
import { selectedNodeAtom } from '../../../state/selectedNode';
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
  const selectedNode = useAtomValue(selectedNodeAtom);
  const isRunning = executionState === 'running';
  const isPaused = executionState === 'paused';

  // 실행 중이면 정지, 일시정지 중이면 정지, 아니면 시뮬레이션 시작
  const handleMainExecution = () => {
    if (isRunning || isPaused) {
      stopExecution();
    } else {
      // toast.warning

      if (selectedNode) {
        simulateExecution(selectedNode.id);
      } else {
        console.warn('시작할 노드를 선택 해야합니다.');
      }
    }
  };

  // 실행 중이면 일시정지, 일시정지 중이면 재개
  const handlePauseResume = () => {
    if (isRunning) pauseExecution();
    else if (isPaused) resumeExecution();
  };
  // 실행 중이면 일시 중지면 정지, 그 외 시작
  const renderExecutionIcon = () => {
    if (isRunning || isPaused) return <FaRegStopCircle />;
    return <FaPlayCircle />;
  };
  // 실행 중이면 일시정지 , 일시정지 면 재게, 그 외 일시 정지
  const renderPauseResumeIcon = () => {
    if (isRunning) return <FaPauseCircle />;
    if (isPaused) return <RxResume />;
    return <FaPauseCircle />;
  };

  return (
    <div className="fab-container">
      <div className="fab-main fab-sub" onClick={() => setOpen(!open)}>
        {open ? <FaMinus /> : <FaPlus />}
      </div>

      {/* 서브 버튼들 */}
      <div className={`fab-menu ${open ? 'open' : ''}`}>
        <div className="fab-sub" onClick={handleMainExecution}>
          {renderExecutionIcon()}
        </div>
        <div className="fab-sub" onClick={handlePauseResume}>
          {renderPauseResumeIcon()}
        </div>
        <div className="fab-sub" onClick={exportWorkflowJSON}>
          <FaFileDownload />
        </div>
      </div>
    </div>
  );
};
