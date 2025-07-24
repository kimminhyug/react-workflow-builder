/**텍스트 필드 */
export const neonTextFieldStyles = {
  fieldGroup: {
    border: '1px solid #61a0f3',
    backgroundColor: '#0f2a48',
    color: '#ffffff',
    boxShadow: '0 0 5px #2381fc',
  },
  field: {
    color: '#ffffff',
  },
  label: {
    color: '#61a0f3',
    textShadow: '0 0 3px #61a0f3',
  },
};
/**버튼 */
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
/**드랍다운 중복 내용 공통화 필요*/
export const neonDropdownStyles = {
  root: {
    marginTop: 10,
  },
  label: {
    color: '#61a0f3',
    textShadow: '0 0 3px #61a0f3',
  },
  title: {
    backgroundColor: '#0f2a48',
    border: '1px solid #61a0f3',
    color: '#ffffff',
    boxShadow: '0 0 5px #2381fc',
    selectors: {
      ':hover': {
        backgroundColor: '#14365c',
        boxShadow: '0 0 8px #61a0f3',
      },
      ':focus': {
        border: '1px solid #91c6ff',
        boxShadow: '0 0 10px #91c6ff',
      },
      ':active': {
        backgroundColor: '#102f4f',
        boxShadow: '0 0 6px #3d9df2 inset',
      },
    },
  },
  dropdown: {
    backgroundColor: '#0f2a48',
    color: '#ffffff',
    border: '1px solid #61a0f3',
    boxShadow: '0 0 5px #2381fc',
  },
  dropdownItem: {
    backgroundColor: '#0f2a48',
    color: '#ffffff',

    selectors: {
      '&.checkbox': { borderColor: '#ffffff' },
      '&.checkbox:hover': { borderColor: '#ffffff' },
      '&.is-multi-select:hover': {
        backgroundColor: '#2a4d80',
        color: '#cbe6ff',
        boxShadow: '0 0 6px #61a0f3',
      },
      ':hover': {
        backgroundColor: '#1a3e6c',
        color: '#61a0f3',
        '& .checkbox': { borderColor: '#ffffff' },
      },
      ':hover .ms-Checkbox-checkbox': {
        borderColor: '#61a0f3',
        boxShadow: '0 0 4px #61a0f3',
        backgroundColor: '#0f2a48',
      },

      ':active': {
        backgroundColor: '#102f4f',
        color: '#252525',
        '&.checkbox': { borderColor: '#ffffff' },
      },
      ':active:hover': {
        backgroundColor: '#102f4f',
        color: '#cbe6ff',
        '&.checkbox': { borderColor: '#ffffff' },
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
        boxShadow: '0 0 6px #61a0f3',
      },
      ':active': {
        backgroundColor: '#102f4f',
        color: '#252525',
      },
      ':active:hover': {
        backgroundColor: '#102f4f',
        color: '#cbe6ff',
      },
    },
  },

  caretDown: {
    color: '#61a0f3',
  },
};

/**콤보박스 */
export const neonComboBoxStyles = {
  root: {
    marginTop: 10,
    backgroundColor: '#0f2a48',
  },
  label: {
    color: '#61a0f3',
    textShadow: '0 0 3px #61a0f3',
  },
  input: {
    backgroundColor: '#0f2a48',
    color: '#ffffff',
    border: 'none',
    selectors: {
      '::placeholder': {
        color: '#b0cfff',
      },
    },
  },
  container: {
    // backgroundColor: '#0f2a48',
    // border: '1px solid #61a0f3',
    // boxShadow: '0 0 5px #2381fc',
    selectors: {
      //   ':hover': {
      //     backgroundColor: '#14365c',
      //     boxShadow: '0 0 8px #61a0f3',
      //   },
      //   ':focus-within': {
      //     border: '1px solid #91c6ff',
      //     boxShadow: '0 0 10px #91c6ff',
      //   },
      //   ':active': {
      //     backgroundColor: '#102f4f',
      //     boxShadow: '0 0 6px #3d9df2 inset',
      //   },
    },
  },
  optionsContainer: {
    backgroundColor: '#0f2a48',
    border: '1px solid #61a0f3',
    boxShadow: '0 0 8px #2381fc',
  },
  optionText: {
    color: '#ffffff',
  },
  option: {
    backgroundColor: '#0f2a48',
    color: '#ffffff',
    selectors: {
      ':hover': {
        backgroundColor: '#1a3e6c',
        color: '#61a0f3',
      },
      ':active': {
        backgroundColor: '#102f4f',
        color: '#ffffff',
      },
    },
  },
};

export const neonCaretDownButtonStyles = {
  root: {
    backgroundColor: '#0f2a48',
    color: '#61a0f3',
    border: 'none',
    borderRadius: 0,
    cursor: 'pointer',
    selectors: {
      '&.is-checked': {
        backgroundColor: '#14365c',
        boxShadow: '0 0 6px #61a0f3',
        color: '#91c6ff',
      },
      ':hover': {
        backgroundColor: '#14365c',
        color: '#91c6ff',
        boxShadow: '0 0 8px #61a0f3',
      },
      ':active': {
        backgroundColor: '#102f4f',
        color: '#cbe6ff',
        boxShadow: 'inset 0 0 4px #3d9df2',
      },
      ':focus': {
        outline: '2px solid #91c6ff',
        boxShadow: '0 0 8px #91c6ff',
      },
    },
  },
  icon: {
    color: '#61a0f3',
    fontSize: 14,
  },
};
