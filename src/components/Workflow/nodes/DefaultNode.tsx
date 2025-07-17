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
        borderWidth: 2,
        borderStyle: 'solid',
        // border: `${statusColorMap[data.status ?? 'waiting']}`,
        borderColor: activeNodeId === id ? 'green' : statusColorMap[data.status ?? 'waiting'],
        background: activeNodeId === id ? '#e6ffe6' : '#0f0f0f',
        boxShadow: '0 0 5px #39ff14, 0 0 10px #39ff14, 0 0 15px #39ff14, 0 0 20px #39ff14',
        color: '#39ff14',
        borderRadius: 4,
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Handle type="target" position={Position.Top} id="top" />

      <>{data.label}</>
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
};
