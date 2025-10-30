import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useNodeStatus } from '../../../hooks/useNodeStatus';
import { nodeIconMap } from '../constants/workflow.constants';
import type { TaskNodeType } from '../types';
import { createHandleId } from '../utils/workflowIdUtils';
import { NodeContent } from './Content/NodeContent';
import { NodeLabel } from './NodeLabel';

export const TaskNode = ({ type, data, id }: NodeProps<TaskNodeType>) => {
  const { nodeClass } = useNodeStatus(id, data.status);

  return (
    <div className={`${nodeClass} task-node`} style={{ padding: 0, borderWidth: 2 }}>
      <NodeLabel label={data.label ?? '작업'} iconName={nodeIconMap.task} />
      <NodeContent id={id} data={data} type={type} />
      <Handle type="target" position={Position.Top} id={createHandleId(id, 'in')} />
      <Handle type="source" position={Position.Bottom} id={createHandleId(id, 'out')} />
    </div>
  );
};
