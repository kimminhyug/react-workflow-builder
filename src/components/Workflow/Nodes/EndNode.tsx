import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useNodeStatus } from '../../../hooks/useNodeStatus';
import { nodeIconMap } from '../constants/workflow.constants';
import type { EndNodeType } from '../types';
import { createHandleId } from '../utils/workflowIdUtils';
import { NodeLabel } from './NodeLabel';

/**
 * 끝 노드 (순서도 도착점 시각화)
 */
export const EndNode = ({ data, id }: NodeProps<EndNodeType>) => {
  const { nodeClass } = useNodeStatus(id, data.status);
  return (
    <div className={`${nodeClass} end-node`} style={{ borderWidth: 2 }}>
      <Handle type="target" position={Position.Top} id={createHandleId(id, 'in')} />
      <NodeLabel label={data.label ?? '끝'} iconName={nodeIconMap.end} />
    </div>
  );
};
