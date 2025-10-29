import React from 'react';
import type { ICondition, NodeDataType } from '../../types';

interface IConditionContentProps {
  data: NodeDataType;
}
export const ConditionContent: React.FC<IConditionContentProps> = ({ data }) => {
  const { description } = data;
  const condition = data.condition as ICondition[];

  if (!condition) return <>{description}</>;
  return (
    <>
      <ConditionTag condition={condition} />
      {/* {condition.map((v, idx) => (
        <div key={idx}>{v.conditionType}</div>
      ))} */}
    </>
  );
};

const ConditionTag = ({ condition }: { condition: ICondition[] }) => {
  const render = () => {
    return condition.map((currentCondition, idx) => {
      if (!currentCondition) return <React.Fragment key={idx} />;

      switch (currentCondition.conditionType) {
        case 'expression':
          return <span key={idx}>Expression({currentCondition.expression})</span>;
        case 'regex':
          return <span key={idx}>Regex({currentCondition.pattern})</span>;
        case 'static':
          return <span key={idx}>Static({currentCondition.staticValue})</span>;
        default:
          return <React.Fragment key={idx} />;
      }
    });
  };
  return <>{render()}</>;
};
