import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useNodeStatus } from '../../../hooks/useNodeStatus';
import { nodeIconMap } from '../constants/workflow.constants';
import type { DecisionNodeType } from '../types';
import { createHandleId } from '../utils/workflowIdUtils';
import { NodeContent } from './Content/NodeContent';
import { NodeLabel } from './NodeLabel';

/**
 * DecisionNode
 * 조건 분기 (if / else)
 */
export const DecisionNode = ({ type, data, id }: NodeProps<DecisionNodeType>) => {
  const { nodeClass } = useNodeStatus(id, data.status);
  const condition = data.condition ?? [];
  return (
    <div className={`${nodeClass} decision-node`} style={{ borderWidth: 2 }}>
      <Handle type="target" position={Position.Top} id={createHandleId(id, 'in')} />
      <NodeLabel label={data.label ?? '조건'} iconName={nodeIconMap.decision} />
      <NodeContent id={id} data={data} type={type} />
      {condition?.map((c, i) => (
        <Handle
          key={c.id}
          type="source"
          position={Position.Bottom}
          id={createHandleId(id, c.id)}
          style={{ left: `${((i + 1) / (condition?.length + 1)) * 100}%` }}
        />
      ))}
    </div>
  );
};
