import { getBezierPath, type EdgeProps, EdgeLabelRenderer } from '@xyflow/react';
import { useState } from 'react';
import { edgesAtom, type CustomEdge } from '../../../state/edges';
import { useAtom, useAtomValue } from 'jotai';

import { nodesAtom } from '../../../state/nodes';
import { getEdgeColor } from '../constants/workflow.constants';
import { Stack, TextField } from '@fluentui/react';
import { edgeStyles, neonTextFieldStyles } from '../../common/styles';

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
  };

  return (
    <>
      <EdgeLabelRenderer>
        <Stack
          className="edge-label-container"
          style={{
            position: 'absolute',
            transform: `translate(${labelX}px, ${labelY}px) translate(-50%, -50%)`,
          }}
        >
          {editingEdgeId === id ? (
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
