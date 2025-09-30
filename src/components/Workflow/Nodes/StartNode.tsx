import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useNodeStatus } from '../../../hooks/useNodeStatus';
import type { CustomNode } from '../types';
import { createHandleId } from '../utils/workflowIdUtils';

/**
 * 시작 노드 (순서도 시작점 시각화)
 */
export const StartNode = ({ data, id }: NodeProps<CustomNode>) => {
  const { nodeClass } = useNodeStatus(id, data.status);
  console.log(data);

  return (
    <div className={`${nodeClass} start-node`} style={{ padding: 10, borderWidth: 2 }}>
      <div>🔵 {data.label ?? 'Start'}</div>
      <Handle type="source" position={Position.Bottom} id={createHandleId(id, 'out')} />
    </div>
  );
};
