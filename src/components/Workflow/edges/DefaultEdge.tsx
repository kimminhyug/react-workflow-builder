import { getBezierPath, type EdgeProps, EdgeLabelRenderer } from '@xyflow/react';

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  label,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}: EdgeProps) => {
  // 직선?
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <EdgeLabelRenderer>
        <div
          onClick={() => {
            console.debug('label 클릭');
          }}
          className="edge-label"
          style={{
            position: 'absolute',
            transform: `translate(${labelX}px, ${labelY}px) translate(-50%, -50%)`,
          }}
        >
          {label}
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

export default CustomEdge;
