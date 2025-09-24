import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useNodeStatus } from '../../../hooks/useNodeStatus';
import type { CustomNode } from '../types';
import { createHandleId } from '../utils/workflowIdUtils';

/**
 * MergeNode 모두 true면 통과(and)
 */
export const MergeNode = ({ data, id }: NodeProps<CustomNode>) => {
  const inputs = data.inputs ?? ['in1', 'in2'];
  const { nodeClass } = useNodeStatus(id, data.status);
  return (
    <div
      className={`${nodeClass} merge-node`}
      style={{ padding: 10, borderWidth: 2, background: '#203a2a' }}
    >
      {inputs.map((_input, i) => (
        <Handle
          key={_input}
          type="target"
          position={Position.Top}
          id={createHandleId(id, _input)}
          style={{ left: `${((i + 1) / (inputs.length + 1)) * 100}%` }}
        />
      ))}
      <div>🔗 {data.label ?? 'Merge'}</div>
      <Handle type="source" position={Position.Bottom} id={createHandleId(id, 'out')} />
    </div>
  );
};
