import { useTranslation } from 'react-i18next';
import { DropdownController } from '../../../Form/DropdownController';
import { TextFieldController } from '../../../Form/TextFieldController';

export const TaskConfig = () => {
  const { t } = useTranslation('common'); // common.json 사용

  return (
    <div>
      <TextFieldController name="label" label={t('config.common.label')} />
      <TextFieldController name="taskName" label={t('config.task.taskName')} />
      <DropdownController
        name="taskType"
        label={t('config.task.taskType')}
        options={[
          { key: 'http', text: t('config.task.taskTypeOptions.http') },
          { key: 'db', text: t('config.task.taskTypeOptions.db') },
          { key: 'script', text: t('config.task.taskTypeOptions.script') },
        ]}
      />
      <TextFieldController
        name="inputSource"
        label={t('config.task.inputSource')}
        placeholder={t('config.task.inputSourcePlaceholder')}
      />
    </div>
  );
};
