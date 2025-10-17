import { useTranslation } from 'react-i18next';
import { TextFieldController } from '../../../Form/TextFieldController';

export const InputConfig = () => {
  const { t } = useTranslation('common');

  return (
    <div>
      <TextFieldController name="label" label={t('config.common.label')} />
      <TextFieldController
        name="inputKey"
        label={t('config.input.inputKey')}
        placeholder={t('config.input.inputKeyPlaceholder')}
      />
      <TextFieldController
        name="defaultValue"
        label={t('config.input.defaultValue')}
        placeholder={t('config.input.defaultValuePlaceholder')}
      />
    </div>
  );
};
