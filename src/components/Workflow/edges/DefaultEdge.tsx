import { getBezierPath, type EdgeProps, EdgeLabelRenderer } from '@xyflow/react';
import { useState } from 'react';
import { edgesAtom, type CustomEdge } from '../../../state/edges';
import { useAtom } from 'jotai';

const DefaultEdge = ({
  id,
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
        <div
          className="edge-label-container"
          style={{
            position: 'absolute',
            transform: `translate(${labelX}px, ${labelY}px) translate(-50%, -50%)`,
          }}
        >
          {editingEdgeId === id ? (
            <input
              autoFocus
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              onBlur={handleBlur}
              style={{
                fontSize: 12,
                padding: '2px 4px',
                borderRadius: 4,
                border: '1px solid #666',
              }}
            />
          ) : (
            <>
              {/* {data?.label && ( */}
              <div
                onClick={() => {
                  console.debug('label 클릭');
                }}
                onDoubleClick={activeEdge}
                className="edge-label"
              >
                {data?.label || ''}
              </div>
              {/* )} */}
            </>
          )}
        </div>
      </EdgeLabelRenderer>
      <path
        id={id}
        style={{ ...style }}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
};

export default DefaultEdge;
