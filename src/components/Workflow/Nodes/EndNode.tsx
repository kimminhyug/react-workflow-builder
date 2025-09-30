import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useNodeStatus } from '../../../hooks/useNodeStatus';
import type { EndNodeType } from '../types';
import { createHandleId } from '../utils/workflowIdUtils';

/**
 * 끝 노드 (순서도 도착점 시각화)
 */
export const EndNode = ({ data, id }: NodeProps<EndNodeType>) => {
  const { nodeClass } = useNodeStatus(id, data.status);
  return (
    <div
      className={`${nodeClass} end-node`}
      style={{ padding: 10, borderWidth: 2, background: '#a00', color: '#fff' }}
    >
      <Handle type="target" position={Position.Top} id={createHandleId(id, 'in')} />
      <div>🏁 {data.label ?? 'End'}</div>
    </div>
  );
};
