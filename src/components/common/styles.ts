import {
  mergeStyles,
  // mergeStyleSets,
  type IButtonStyles,
  type IComboBoxOptionStyles,
  type IComboBoxStyles,
  type IDropdownStyles,
  type ITextFieldStyles,
} from '@fluentui/react';

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
export const neonFieldGroupBase = {
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
    color: '#cbe6ff !important',
  },
  ':focus': {
    border: `1px solid #91c6ff`,
    boxShadow: `0 0 10px #91c6ff`,
    color: '#cbe6ff',
  },
  ':active': {
    backgroundColor: neon_colors.activeBg,
    boxShadow: `0 0 6px #3d9df2 inset`,
    color: '#cbe6ff',
  },
};

/** 텍스트 필드 */
export const neonTextFieldStyles: Partial<ITextFieldStyles> = {
  fieldGroup: neonFieldGroupBase,

  field: { color: neon_colors.text },
  root: { color: neon_colors.text },
  wrapper: { color: neon_colors.text },
  subComponentStyles: { label: { root: neonLabelBase } },
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
export const neonDropdownStyles: Partial<IDropdownStyles> = {
  root: { marginTop: 10 },

  label: neonLabelBase,
  title: {
    ...neonFieldGroupBase,
    selectors: hoverFocusActiveMixin,
  },

  dropdown: {
    ...neonFieldGroupBase,
    selectors: {
      ...hoverFocusActiveMixin,
      ':focus > .ms-Dropdown-title': {
        ...hoverFocusActiveMixin[':hover'],
      },
      ':hover > .ms-Dropdown-title': {
        ...hoverFocusActiveMixin[':hover'],
      },
      ':active > .ms-Dropdown-title': {
        ...hoverFocusActiveMixin[':active'],
      },
    },
  },
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
  root: {
    marginTop: 10,

    ...neonFieldGroupBase,
    selectors: {
      '.ms-ComboBox-Input': { color: hoverFocusActiveMixin[':hover'].color },
    },
  },

  rootDisabled: {
    backgroundColor: neon_colors.background,
    border: 'none',
    selectors: { '::after': { border: 'none' } },
  },
  rootHovered: {
    ...hoverFocusActiveMixin[':hover'],
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
      ':hover': { color: hoverFocusActiveMixin[':hover'].color },
    },
  },

  optionsContainer: {
    ...neonFieldGroupBase,
    color: neon_colors.text,
  },
};
/** 콤보 박스 옵션  */
export const neonComboBoxOptionStyles: Partial<IComboBoxOptionStyles> = {
  root: { ...neonFieldGroupBase, color: neon_colors.text, selectors: hoverFocusActiveMixin },
  splitButtonContainerChecked: { color: neon_colors.text },
  rootDisabled: { color: neon_colors.text },
  rootChecked: { color: neon_colors.text },
  iconChecked: { color: neon_colors.text },
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

export const edgeStyles = mergeStyles({
  fontSize: 12,
  backgroundColor: neon_colors.hoverBg,
  cursor: 'pointer',
  padding: '2px 4px',
  borderRadius: 4,
  border: 'none',
  selectors: {
    ':hover': {
      backgroundColor: neon_colors.hoverBg,
      color: neon_colors.labelText,
      boxShadow: `0 0 4px ${neon_colors.shadow}`,
    },
  },
});

/** 모달  */
export const neonModalStyles = {
  main: {
    maxWidth: 600,
    padding: 20,
    backgroundColor: neon_colors.background,
    border: `1px solid ${neon_colors.border}`,
    boxShadow: `0 0 15px ${neon_colors.shadow}`,
    color: neon_colors.text,
  },
};

/** 모달 제목*/
export const neonModalTitle = {
  color: neon_colors.labelText,
  textShadow: `0 0 3px ${neon_colors.labelText}`,
  margin: 0,
};

/**모달닫기 버튼  */
export const neonModalCloseButtonStyles = {
  root: {
    color: neon_colors.labelText,
    background: 'transparent',
    selectors: {
      ':hover': {
        color: '#cbe6ff',
        background: neon_colors.hoverBg,
      },
    },
  },
};
