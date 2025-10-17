import { useTranslation } from 'react-i18next';
import { DropdownController } from '../../../Form/DropdownController';
import { TextFieldController } from '../../../Form/TextFieldController';

export const SwitchConfig = () => {
  const { t } = useTranslation('common'); // common.json 사용

  return (
    <div>
      <TextFieldController name="label" label={t('config.common.label')} />
      <TextFieldController name="switchName" label={t('config.switch.switchName')} />
      <DropdownController
        name="conditionType"
        label={t('config.switch.conditionType')}
        options={[
          { key: 'equals', text: t('config.switch.conditionTypeOptions.equals') },
          { key: 'contains', text: t('config.switch.conditionTypeOptions.contains') },
          { key: 'regex', text: t('config.switch.conditionTypeOptions.regex') },
        ]}
      />
      <TextFieldController
        name="expression"
        label={t('config.switch.expression')}
        placeholder={t('config.switch.expressionPlaceholder')}
      />
    </div>
  );
};
