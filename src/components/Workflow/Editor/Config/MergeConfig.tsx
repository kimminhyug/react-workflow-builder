import { useTranslation } from 'react-i18next';
import { useNodeSaver } from '../../../../hooks/useNodeSaver';
import { SaveButton } from '../../../common/UI';
import { SourceNodeDropdownController } from '../../../Form/SourceNodeDropdownController';
import { TextFieldController } from '../../../Form/TextFieldController';

export const MergeConfig = () => {
  const { t } = useTranslation('common');

  const saveNodeData = useNodeSaver();

  return (
    <div className="">
      <TextFieldController name="label" label={t('config.common.label')} />
      <TextFieldController
        name="mergeName"
        label={t('config.merge.mergeName')}
        placeholder={t('config.merge.mergeNamePlaceholder')}
      />
      <SourceNodeDropdownController
        name="inputs"
        label={t('config.merge.inputs')}
        placeholder={t('config.merge.inputsPlaceholder')}
        multiSelect
      />
      <SaveButton onClick={saveNodeData} />
    </div>
  );
};
