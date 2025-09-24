import { useAtom, useAtomValue } from 'jotai';
import { useWorkflow } from '../../../hooks/useWorkflow';
import { edgesAtom } from '../../../state/edges';
import { nodesAtom } from '../../../state/nodes';
import { selectedNodeAtom } from '../../../state/selectedNode';
import { AppendSubText } from '../../common/AppendSubText';
import { ControlButton } from './ControlButton';

export const Control = () => {
  const [nodes, setNodes] = useAtom(nodesAtom);
  const [edges, setEdges] = useAtom(edgesAtom);
  const {
    addNode,
    addTaskNode,
    simulateExecution,
    pauseExecution,
    executionState,
    resumeExecution,
    stopExecution,
    exportWorkflowJSON,
    reassignNodeIds,
    reassignEdgeIds,
  } = useWorkflow();

  const selectedNode = useAtomValue(selectedNodeAtom);

  const reassignWorkflowIds = () => {
    const { newNodes, oldToNew } = reassignNodeIds(nodes);
    console.log(oldToNew, newNodes);
    const newEdges = reassignEdgeIds(edges, oldToNew);
    console.log(newEdges);
    setNodes(newNodes);
    setEdges(newEdges);
  };

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
          <ControlButton onClick={() => reassignWorkflowIds()}>workflow id 재할당</ControlButton>

          <ControlButton
            onClick={() => simulateExecution()}
            disabled={executionState === 'running'}
          >
            <>
              <AppendSubText
                label={'시작'}
                subText={selectedNode?.data?.label ?? '시작 노드 선택'}
              />
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
