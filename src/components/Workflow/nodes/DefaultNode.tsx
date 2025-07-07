import { Handle, Position, type NodeProps } from '@xyflow/react';
import { activeNodeIdAtom } from '../../../state/nodes';
import { useAtom } from 'jotai';

export const DefaultNode = ({ data, id }: NodeProps) => {
  const [activeNodeId] = useAtom(activeNodeIdAtom);

  return (
    <div
      style={{
        padding: 10,
        border: '2px solid',
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
