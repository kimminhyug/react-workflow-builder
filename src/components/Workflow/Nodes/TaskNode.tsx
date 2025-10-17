import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useNodeStatus } from '../../../hooks/useNodeStatus';
import { nodeIconMap } from '../constants/workflow.constants';
import type { TaskNodeType } from '../types';
import { createHandleId } from '../utils/workflowIdUtils';
import { NodeLabel } from './NodeLabel';

export const TaskNode = ({ data, id }: NodeProps<TaskNodeType>) => {
  const { nodeClass } = useNodeStatus(id, data.status);

  return (
    <div
      className={`${nodeClass} task-node`}
      style={{ padding: 10, borderWidth: 2, background: '#222' }}
    >
      <NodeLabel label={data.label ?? '작업'} iconName={nodeIconMap.task} />
      <Handle type="target" position={Position.Top} id={createHandleId(id, 'in')} />
      <Handle type="source" position={Position.Bottom} id={createHandleId(id, 'out')} />
    </div>
  );
};
