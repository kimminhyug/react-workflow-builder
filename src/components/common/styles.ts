import type { IButtonStyles, IComboBoxStyles } from '@fluentui/react';

/** 공통 색상 */
const neon_colors = {
  border: '#61a0f3',
  background: '#0f2a48',
  text: '#ffffff',
  hoverBg: '#14365c',
  activeBg: '#102f4f',
  shadow: '#2381fc',
  labelText: '#61a0f3',
  placeholder: '#b0cfff',
};

/** 공통 필드 */
const neonFieldGroupBase = {
  border: `1px solid ${neon_colors.border}`,
  backgroundColor: neon_colors.background,
  color: neon_colors.text,
  boxShadow: `0 0 5px ${neon_colors.shadow}`,
};

/** 공통 텍스트 색상  */
const neonLabelBase = {
  color: neon_colors.labelText,
  textShadow: `0 0 3px ${neon_colors.labelText}`,
};

/** 공통 호버 스타일 */
const hoverFocusActiveMixin = {
  ':hover': {
    backgroundColor: neon_colors.hoverBg,
    boxShadow: `0 0 8px ${neon_colors.labelText}`,
  },
  ':focus': {
    border: `1px solid #91c6ff`,
    boxShadow: `0 0 10px #91c6ff`,
  },
  ':active': {
    backgroundColor: neon_colors.activeBg,
    boxShadow: `0 0 6px #3d9df2 inset`,
  },
};

/** 텍스트 필드 */
export const neonTextFieldStyles = {
  fieldGroup: neonFieldGroupBase,
  field: { color: neon_colors.text },
  label: neonLabelBase,
};

/** 버튼 */
export const neonButtonStyles = {
  root: {
    marginTop: 20,
    backgroundColor: '#ff3434',
    color: '#ffffff',
    boxShadow: '0 0 10px #ff3434',
    borderRadius: '6px',
    fontWeight: 'bold',
  },
  rootHovered: {
    backgroundColor: '#e62828',
    boxShadow: '0 0 12px #ff3434',
  },
};

/** 드롭다운 */
export const neonDropdownStyles = {
  root: { marginTop: 10 },
  label: neonLabelBase,
  title: {
    ...neonFieldGroupBase,
    selectors: hoverFocusActiveMixin,
  },
  dropdown: neonFieldGroupBase,
  dropdownItem: {
    backgroundColor: neon_colors.background,
    color: neon_colors.text,
    // selector는 공통화될지 검토 필요
    selectors: {
      '&.checkbox': { borderColor: neon_colors.text },
      '&.checkbox:hover': { borderColor: neon_colors.text },
      '&.is-multi-select:hover': {
        backgroundColor: '#2a4d80',
        color: '#cbe6ff',
        boxShadow: `0 0 6px ${neon_colors.border}`,
      },
      ':hover': {
        backgroundColor: '#1a3e6c',
        color: neon_colors.labelText,
        '& .checkbox': { borderColor: neon_colors.text },
      },
      ':hover .ms-Checkbox-checkbox': {
        borderColor: neon_colors.labelText,
        boxShadow: `0 0 4px ${neon_colors.labelText}`,
        backgroundColor: neon_colors.background,
      },
      ':active': {
        backgroundColor: neon_colors.activeBg,
        color: '#252525',
      },
      ':active:hover': {
        backgroundColor: neon_colors.activeBg,
        color: '#cbe6ff',
      },
    },
  },
  dropdownItemSelected: {
    backgroundColor: '#1a3e6c',
    color: '#91c6ff',
    fontWeight: 'bold',
    selectors: {
      '&.is-multi-select:hover': {
        backgroundColor: '#2a4d80',
        color: '#cbe6ff',
        boxShadow: `0 0 6px ${neon_colors.border}`,
      },
      ':active': {
        backgroundColor: neon_colors.activeBg,
        color: '#252525',
      },
      ':active:hover': {
        backgroundColor: neon_colors.activeBg,
        color: '#cbe6ff',
      },
    },
  },
  caretDown: {
    color: neon_colors.labelText,
  },
};

/** 콤보박스 */
export const neonComboBoxStyles: Partial<IComboBoxStyles> = {
  root: { marginTop: 10 },
  rootDisabled: {
    backgroundColor: neon_colors.background,
    border: 'none',
    selectors: { '::after': { border: 'none' } },
  },
  inputDisabled: {
    backgroundColor: neon_colors.background,
    border: 'none',
  },
  label: neonLabelBase,
  input: {
    backgroundColor: neon_colors.background,
    color: neon_colors.text,
    border: 'none',
    selectors: {
      '::placeholder': {
        color: neon_colors.placeholder,
      },
    },
  },
  optionsContainer: {
    backgroundColor: neon_colors.background,
    border: `1px solid ${neon_colors.border}`,
    boxShadow: `0 0 8px ${neon_colors.shadow}`,
  },
};

/** 캐럿 버튼 */
export const neonCaretDownButtonStyles: Partial<IButtonStyles> = {
  root: {
    backgroundColor: neon_colors.background,
    color: neon_colors.border,
    border: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    selectors: {
      '&.is-checked': {
        backgroundColor: neon_colors.hoverBg,
        boxShadow: `0 0 6px ${neon_colors.border}`,
        color: '#91c6ff',
      },
      ':hover': {
        backgroundColor: neon_colors.hoverBg,
        color: '#91c6ff',
        boxShadow: `0 0 8px ${neon_colors.border}`,
      },
      ':active': {
        backgroundColor: neon_colors.activeBg,
        color: '#cbe6ff',
        boxShadow: 'inset 0 0 4px #3d9df2',
      },
      ':focus': {
        outline: '2px solid #91c6ff',
        boxShadow: `0 0 8px #91c6ff`,
      },
    },
  },
  icon: {
    color: neon_colors.border,
    fontSize: 14,
  },
  rootDisabled: {
    backgroundColor: neon_colors.hoverBg,
    border: 'none',
    borderRadius: 0,
  },
};
