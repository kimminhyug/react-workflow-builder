import { Handle, Position, type NodeProps } from '@xyflow/react';
import { activeNodeIdAtom } from '../../../state/nodes';
import { useAtom } from 'jotai';
import type { CustomNode, NodeStatus } from '../types';

const statusColorMap: Record<NodeStatus, string> = {
  waiting: '#ccc',
  running: '#4caf50',
  done: '#2196f3',
  startWaiting: '#e7e7e7',
};

export const DefaultNode = ({ data, id }: NodeProps<CustomNode>) => {
  const [activeNodeId] = useAtom(activeNodeIdAtom);

  return (
    <div
      style={{
        padding: 10,
        border: `2px solid ${statusColorMap[data.status ?? 'waiting']}`,
        borderColor: activeNodeId === id ? 'green' : '#ccc',
        background: activeNodeId === id ? '#e6ffe6' : 'white',
        borderRadius: 4,
      }}
    >
      <Handle type="target" position={Position.Top} id="top" />

      <>{data.label}</>
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
};
