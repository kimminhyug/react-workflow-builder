import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useNodeStatus } from '../../../hooks/useNodeStatus';
import { nodeIconMap } from '../constants/workflow.constants';
import type { SwitchNodeType } from '../types';
import { createHandleId } from '../utils/workflowIdUtils';
import { NodeLabel } from './NodeLabel';

/**
 * SwitchNode
 * 여러 분기 (switch-case)
 */
export const SwitchNode = ({ data, id }: NodeProps<SwitchNodeType>) => {
  const cases = data.cases ?? ['case1', 'case2', 'case33', 'default'];
  const { nodeClass } = useNodeStatus(id, data.status);
  return (
    <div
      className={`${nodeClass} switch-node`}
      style={{ padding: 10, borderWidth: 2, background: '#3a2a2a' }}
    >
      <Handle type="target" position={Position.Top} id={createHandleId(id, 'in')} />
      <NodeLabel label={data.label ?? '케이스'} iconName={nodeIconMap.switch} />
      {cases.map((c, i) => (
        <Handle
          key={c}
          type="source"
          position={Position.Bottom}
          id={createHandleId(id, c)}
          style={{ left: `${((i + 1) / (cases.length + 1)) * 100}%` }}
        />
      ))}
    </div>
  );
};
