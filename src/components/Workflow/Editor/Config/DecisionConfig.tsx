import { useTranslation } from 'react-i18next';
import { DropdownController } from '../../../Form/DropdownController';
import { TextFieldController } from '../../../Form/TextFieldController';

export const DecisionConfig = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <TextFieldController name="label" label={t('config.common.label')} />
      <TextFieldController name="decisionName" label={t('config.decision.decisionName')} />
      <DropdownController
        name="operator"
        label={t('config.decision.operator')}
        options={[
          { key: '>', text: t('config.decision.operatorOptions.>') },
          { key: '<', text: t('config.decision.operatorOptions.<') },
          { key: '==', text: t('config.decision.operatorOptions.==') },
          { key: '!=', text: t('config.decision.operatorOptions.!=') },
        ]}
      />
      <TextFieldController
        name="threshold"
        label={t('config.decision.threshold')}
        placeholder={t('config.decision.thresholdPlaceholder')}
      />
    </div>
  );
};
