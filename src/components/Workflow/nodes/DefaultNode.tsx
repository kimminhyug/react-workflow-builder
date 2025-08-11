import { Handle, Position, type NodeProps } from '@xyflow/react';
import { activeNodeIdAtom } from '../../../state/nodes';
import { useAtom } from 'jotai';
import type { CustomNode } from '../types';
import { selectedNodeAtom } from '../../../state/selectedNode';

// const statusColorMap: Record<NodeStatus, string> = {
//   waiting: '#ccc',
//   running: '#4caf50',
//   done: '#2196f3',
//   startWaiting: '#e7e7e7',
// };

export const DefaultNode = ({ data, id }: NodeProps<CustomNode>) => {
  // animation
  const [activeNodeId] = useAtom(activeNodeIdAtom);
  const [selectedNode] = useAtom(selectedNodeAtom);

  const isSelected = selectedNode?.id === id;
  const isActive = activeNodeId === id;

  const statusClass = data.status ?? 'waiting';

  const nodeClass = ['neon-node', statusClass, isActive && 'active', isSelected && 'selected']
    .filter(Boolean)
    .join(' ');
  return (
    <div
      className={nodeClass}
      style={{
        padding: 10,
        borderWidth: 2,
        // borderStyle: 'solid',
        // border: `${statusColorMap[data.status ?? 'waiting']}`,
        // borderColor: isActive ? 'green' : statusColorMap[data.status ?? 'waiting'],
        // background: isActive ? '#e6ffe6' : '#0f0f0f',
      }}
    >
      <Handle type="target" position={Position.Top} id="top" />

      <>{data.label}</>
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
};
