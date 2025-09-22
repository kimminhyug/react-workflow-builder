import { useAtom, useAtomValue } from 'jotai';
import { useWorkflow } from '../../../hooks/useWorkflow';
import { nodesAtom } from '../../../state/nodes';
import { selectedNodeAtom } from '../../../state/selectedNode';
import { AppendSubText } from '../../common/AppendSubText';
import { ControlButton } from './ControlButton';

export const Control = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const {
    addNode,
    addTaskNode,
    simulateExecution,
    pauseExecution,
    executionState,
    resumeExecution,
    stopExecution,
    exportWorkflowJSON,
  } = useWorkflow();

  const selectedNode = useAtomValue(selectedNodeAtom);

  return (
    <div className="control-container">
      <div className="control-button-container">
        <div className="control-button-title">현재 flow name?</div>
        <nav className="control-button-menu">
          {/* <ControlButton onClick={addNode}>새 노드 추가</ControlButton>
          <ControlButton onClick={addTaskNode}>작업 노드 추가</ControlButton> */}
          {/* <ControlButton
            onClick={() => {
              const startNode = nodes.find((node) => node.type === 'start');
              if (startNode) {
                simulateExecution(startNode.id);
              } else {
                alert('시작 노드가 없습니다.');
              }
            }}
          >
            시뮬레이션 시작
          </ControlButton> */}
          <ControlButton
            onClick={() => simulateExecution()}
            disabled={executionState === 'running'}
          >
            <>
              <AppendSubText label={'시작'} subText={selectedNode?.data?.label ?? ''} />
            </>
          </ControlButton>
          <ControlButton onClick={pauseExecution} disabled={executionState !== 'running'}>
            일시정지
          </ControlButton>
          <ControlButton onClick={resumeExecution} disabled={executionState !== 'paused'}>
            재개
          </ControlButton>
          <ControlButton onClick={stopExecution} disabled={executionState !== 'running'}>
            정지
          </ControlButton>
          <ControlButton onClick={exportWorkflowJSON}>워크플로우 저장</ControlButton>
        </nav>
      </div>

      {/* <input
            type="file"
            accept=".json"
            onChange={importWorkflowJSON}
            style={{ marginLeft: 10 }}
          /> */}
    </div>
  );
};
