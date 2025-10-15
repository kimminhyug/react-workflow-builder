import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { AppBaseName } from '../App.constants';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: 'ko',
    fallbackLng: 'ko',
    backend: {
      loadPath: `/${AppBaseName}/locales/{{lng}}/{{ns}}.json`,
    },
    ns: ['common', 'error', 'message', 'warning'],
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  });

export default i18n;
