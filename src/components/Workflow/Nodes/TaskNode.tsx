import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useNodeStatus } from '../../../hooks/useNodeStatus';
import type { CustomNode } from '../types';
import { createHandleId } from '../utils/workflowIdUtils';

// const statusColorMap: Record<NodeStatus, string> = {
//   waiting: '#ccc',
//   running: '#4caf50',
//   done: '#2196f3',
//   startWaiting: '#e7e7e7',
// };

export const TaskNode = ({ data, id }: NodeProps<CustomNode>) => {
  const { nodeClass } = useNodeStatus(id, data.status);

  return (
    <div
      className={`${nodeClass} task-node`}
      style={{ padding: 10, borderWidth: 2, background: '#222' }}
    >
      <Handle type="target" position={Position.Top} id={createHandleId(id, 'in')} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span>⚙</span>
        <span>{data.label ?? 'Task'}</span>
      </div>
      <Handle type="source" position={Position.Bottom} id={createHandleId(id, 'out')} />
    </div>
  );
};
