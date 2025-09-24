import { EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';
import { useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import { edgesAtom, type CustomEdge } from '../../../state/edges';

import { nodesAtom } from '../../../state/nodes';
import { getEdgeColor } from '../constants/workflow.constants';

import { edgeStyles, neonTextFieldStyles } from '../../common/styles';
import { TextField } from '../../common/UI/Forms/TextField';
import { Stack } from '../../common/UI/Layout/Stack';

const DefaultEdge = ({
  id,
  source,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps<CustomEdge>) => {
  const [editingEdgeId, setEditingEdgeId] = useState<string | null>(null);
  const [labelInput, setLabelInput] = useState('');
  const [, setEdges] = useAtom(edgesAtom);
  const nodes = useAtomValue(nodesAtom);

  const sourceNode = nodes.find((n) => n.id === source);
  const strokeColor = getEdgeColor(data, sourceNode);
  // 직선?
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  /**
   * active 제거용
   */
  const handleBlur = () => {
    setEdges((eds) =>
      eds.map((e) => (e.id === id ? { ...e, data: { ...e.data, label: labelInput } } : e))
    );
    setEditingEdgeId(null);
  };
  /**
   * edge label changer
   */
  const activeEdge = () => {
    setEditingEdgeId(id);
    setLabelInput(data?.label ?? '');
    console.log(isEditing, editingEdgeId, id);
  };
  const isEditing = editingEdgeId === id;

  return (
    <>
      <EdgeLabelRenderer>
        <Stack
          className="edge-label-container"
          style={{
            zIndex: isEditing ? 1000000 : 10,
            position: 'absolute',
            height: '1rem',
            transform: `translate(${labelX}px, ${labelY}px) translate(-50%, -50%)`,
          }}
        >
          {isEditing ? (
            <TextField
              autoFocus
              value={labelInput}
              styles={neonTextFieldStyles}
              onChange={(e) => setLabelInput(e.currentTarget.value)}
              onBlur={handleBlur}
              style={{
                fontSize: 12,
                padding: '2px 4px',
                borderRadius: 4,
                border: '1px solid #666',
              }}
            />
          ) : (
            <div onDoubleClick={activeEdge} className={edgeStyles}>
              {data?.label || ''}
            </div>
          )}
        </Stack>
      </EdgeLabelRenderer>
      <path
        id={id}
        style={{ ...style, stroke: strokeColor }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
};

export default DefaultEdge;
