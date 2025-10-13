import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useNodeStatus } from '../../../hooks/useNodeStatus';
import { nodeIconMap } from '../constants/workflow.constants';
import type { DecisionNodeType } from '../types';
import { createHandleId } from '../utils/workflowIdUtils';
import { NodeLabel } from './NodeLabel';

/**
 * DecisionNode
 * 조건 분기 (if / else)
 */
export const DecisionNode = ({ data, id }: NodeProps<DecisionNodeType>) => {
  const { nodeClass } = useNodeStatus(id, data.status);

  return (
    <div
      className={`${nodeClass} end-node`}
      style={{ padding: 10, borderWidth: 2, background: '#2a2a40' }}
    >
      <Handle type="target" position={Position.Top} id={createHandleId(id, 'in')} />
      <NodeLabel label={data.label ?? '조건'} iconName={nodeIconMap.decision} />

      <Handle
        type="source"
        position={Position.Bottom}
        id={createHandleId(id, 'true')}
        style={{ left: '30%' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id={createHandleId(id, 'false')}
        style={{ left: '70%' }}
      />
    </div>
  );
};
