import { tCommon } from '../../../../utils/i18nUtils';
import type { TaskNodeType } from '../../types';

interface ITaskContentProps {
  // label: string;
  // iconName: string;
  data: TaskNodeType['data'];
}
export const TaskContent: React.FC<ITaskContentProps> = ({ data }) => {
  const { description } = data;

  const { taskName, taskType } = data;
  if (!taskName && !taskType) return <>{description}</>;

  return (
    <>
      <div>
        {tCommon('config.task.taskName')}: {taskName}
      </div>
      <div>
        {tCommon('config.task.taskType')}: {taskType}
      </div>
    </>
  );
};
