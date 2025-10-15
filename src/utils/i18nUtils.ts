import i18n from '../i18n/index';

export const LANGUAGE = {
  EN: 'en',
  KO: 'ko',
};

export const toEn = () => i18n.changeLanguage(LANGUAGE.EN);
export const toKo = () => i18n.changeLanguage(LANGUAGE.KO);

// 버튼명, 일반 단어 등
export const tCommon = (key: string, opts?: Record<string, any>) =>
  i18n.t(`${key}`, { ns: 'common', ...opts });
// 에러 메세지용
export const tError = (key: string, opts?: Record<string, any>) =>
  i18n.t(`${key}`, { ns: 'error', ...opts });
// 경고 메세지용
export const tWarning = (key: string, opts?: Record<string, any>) =>
  i18n.t(`${key}`, { ns: 'warning', ...opts });
// 일반 메세지용
export const tMessage = (key: string, opts?: Record<string, any>) =>
  i18n.t(`${key}`, { ns: 'message', ...opts });
