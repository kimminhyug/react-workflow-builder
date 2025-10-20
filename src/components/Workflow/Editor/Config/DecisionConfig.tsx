import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNodeSaver } from '../../../../hooks/useNodeSaver';
import { tCommon } from '../../../../utils/i18nUtils';
import { Button, SaveButton } from '../../../common/UI';
import { TextFieldController } from '../../../Form/TextFieldController';
import { ConditionModal } from '../Condition/ConditionModal';
import { ConditionTagPicker } from '../Condition/ConditionTagPicker';

export const DecisionConfig = () => {
  const { t } = useTranslation('common');
  const { watch } = useFormContext();
  const watchedConditions = watch('condition');
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const saveNodeData = useNodeSaver();

  return (
    <div>
      <ConditionModal isOpen={isOpen} onDismiss={closeModal} />
      <TextFieldController name="label" label={t('config.common.label')} />
      <ConditionTagPicker conditions={watchedConditions || []} />
      <Button
        text={tCommon('condition.add')}
        onClick={() => {
          openModal();
        }}
        styles={{ root: { marginTop: 8 } }}
      />
      <div style={{ marginTop: 12 }}>
        <SaveButton onClick={saveNodeData} />
      </div>
    </div>
  );
};
