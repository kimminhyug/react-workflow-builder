import React, { type ReactElement } from 'react';
interface ControlButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children?: string | ReactElement;
}

export const ControlButton: React.FC<ControlButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button className="control-button" onClick={onClick} disabled={disabled}>
      <>{children}</>
    </button>
  );
};
