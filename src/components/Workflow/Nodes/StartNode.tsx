import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useNodeStatus } from '../../../hooks/useNodeStatus';
import { nodeIconMap } from '../constants/workflow.constants';
import type { CustomNode } from '../types';
import { createHandleId } from '../utils/workflowIdUtils';
import { NodeLabel } from './NodeLabel';

/**
 * 시작 노드 (순서도 시작점 시각화)
 */
export const StartNode = ({ data, id }: NodeProps<CustomNode>) => {
  const { nodeClass } = useNodeStatus(id, data.status);

  return (
    <div className={`${nodeClass} start-node`} style={{ borderWidth: 2 }}>
      <NodeLabel label={data.label ?? '시작'} iconName={nodeIconMap.start} />
      <Handle type="source" position={Position.Bottom} id={createHandleId(id, 'out')} />
    </div>
  );
};
