import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useNodeStatus } from '../../../hooks/useNodeStatus';
import { nodeIconMap } from '../constants/workflow.constants';
import type { MergeNodeType } from '../types';
import { createHandleId } from '../utils/workflowIdUtils';
import { NodeLabel } from './NodeLabel';

/**
 * MergeNode 모두 true면 통과(and)
 */
export const MergeNode = ({ data, id }: NodeProps<MergeNodeType>) => {
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

      <NodeLabel label={data.label ?? '병합'} iconName={nodeIconMap.merge} />
      <Handle type="source" position={Position.Bottom} id={createHandleId(id, 'out')} />
    </div>
  );
};
