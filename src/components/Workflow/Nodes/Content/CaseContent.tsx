import { useMemo } from 'react';
import { useUpdateNode } from '../../../../hooks/useNodeUpdater';
import type { NodeDataType } from '../../types';

interface ICaseContentProps {
  // label: string;
  // iconName: string;
  data: NodeDataType;
}
export const CaseContent: React.FC<ICaseContentProps> = ({ data }) => {
  const { description } = data;
  const { matchNodesById } = useUpdateNode();
  const cases = useMemo(() => {
    return matchNodesById(data.cases as string[], 'label');
  }, [data.cases]);

  if (!cases || cases?.length === 0) return <>{description}</>;
  return (
    <>
      {cases?.map((v, idx) => (
        <div key={idx}>{v.toString()}</div>
      ))}
    </>
  );
};
