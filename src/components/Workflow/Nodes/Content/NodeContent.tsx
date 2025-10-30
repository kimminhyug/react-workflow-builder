import type { NodeDataType, NodeType } from '../../types';
import { ConditionContent } from './ConditionContent';
import { MergeContent } from './MergeContent';
import { TaskContent } from './TaskContent';

interface INodeContentProps {
  // label: string;
  // iconName: string;
  id: string;
  type: NodeType;
  data: NodeDataType;
}
export const NodeContent: React.FC<INodeContentProps> = ({ id, type, data }) => {
  const currentContext = data.context?.nodeResults[id];
  const error = currentContext?.error;
  return (
    <div className="content" title={error || ''}>
      {type === 'task' && <TaskContent data={data} />}
      {type === 'decision' && <ConditionContent data={data} />}
      {type === 'merge' && <MergeContent data={data} />}
    </div>
  );
};
