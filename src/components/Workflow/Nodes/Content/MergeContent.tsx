import { useMemo } from 'react';
import { useUpdateNode } from '../../../../hooks/useNodeUpdater';
import type { NodeDataType } from '../../types';

interface IMergeContentProps {
  // label: string;
  // iconName: string;
  data: NodeDataType;
}
export const MergeContent: React.FC<IMergeContentProps> = ({ data }) => {
  const { description } = data;
  const { matchNodesById } = useUpdateNode();
  const inputs = useMemo(() => {
    return matchNodesById(data.inputs as string[], 'label');
  }, [data.inputs]);

  if (!inputs || inputs?.length === 0) return <>{description}</>;
  return (
    <>
      {inputs?.map((v, idx) => (
        <div key={idx}>{v.toString()}</div>
      ))}
    </>
  );
};
