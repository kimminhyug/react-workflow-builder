import { EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';
import { useCallback, useState } from 'react';
import { type CustomEdge } from '../../../state/edges';

import { getEdgeColor } from '../constants/workflow.constants';

import { useUpdateNode } from '../../../hooks/useNodeUpdater';
import { edgeStyles, neonTextFieldStyles } from '../../common/styles';
import { TextField } from '../../common/UI/Forms/TextField';
import { Stack } from '../../common/UI/Layout/Stack';
import type { ICondition } from '../types';

const DefaultEdge = ({
  id,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  source,
}: EdgeProps<CustomEdge>) => {
  const [, setEditingEdgeId] = useState<string | null>(null);
  const [labelInput, setLabelInput] = useState('');
  // const [, setEdges] = useAtom(edgesAtom);

  const { nodes } = useUpdateNode();
  const node = nodes.find((n) => n.id === source);
  const strokeColor = getEdgeColor(data);
  const nodeType = node?.type;

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
  // const handleBlur = () => {
  //   setEdges((eds) =>
  //     eds.map((e) => (e.id === id ? { ...e, data: { ...e.data, label: labelInput } } : e))
  //   );
  //   setEditingEdgeId(null);
  // };
  /**
   * edge label changer
   */
  const activeEdge = () => {
    setEditingEdgeId(id);
    setLabelInput(data?.label ?? '');
  };
  const isEditing = false;
  //  editingEdgeId === id;

  const renderCondition = useCallback(() => {
    const condition = (node?.data.condition as ICondition[])?.find(
      (c) => c.targetNodeId === target
    );
    if (!condition) return <></>;

    switch (condition.conditionType) {
      case 'expression':
        return (
          <>
            <span>{`Expression(${condition.expression})`}</span>
          </>
        );
      case 'regex':
        return (
          <>
            <span>{`Regex(${condition.pattern})`}</span>
          </>
        );
      case 'static':
        return (
          <>
            <span>{`Static(${condition.staticValue})`}</span>
          </>
        );
      default:
        return <></>;
    }
  }, [node?.data?.condition, target]);

  return (
    <>
      <EdgeLabelRenderer>
        <Stack
          className="edge-label-container"
          style={{
            zIndex: isEditing ? 1000000 : 10,
            position: 'absolute',
            // height: '1rem',
            transform: `translate(${labelX}px, ${labelY}px) translate(-50%, -50%)`,
          }}
        >
          {isEditing ? (
            <TextField
              autoFocus
              value={labelInput}
              styles={neonTextFieldStyles}
              // onChange={(e) => setLabelInput(e.currentTarget.value)}
              // onBlur={handleBlur}
              style={{
                fontSize: 12,
                padding: '2px 4px',
                borderRadius: 4,
                border: '1px solid #666',
              }}
            />
          ) : (
            <div onDoubleClick={activeEdge} className={edgeStyles}>
              {/* {data?.label || ''} */}

              {nodeType === 'task' && <span>{node?.data.inputSource}</span>}
              {nodeType === 'decision' && renderCondition()}
              {nodeType === 'merge' && (
                <span>
                  {node?.data.inputs
                    ?.map((id) => nodes.find((n) => n.id === id)?.data.label)
                    .join(' + ')}
                </span>
              )}
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
