import React from 'react';
interface ControlButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children?: string;
}

export const ControlButton: React.FC<ControlButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button className="control-button" onClick={onClick} disabled={disabled}>
      <>{children}</>
    </button>
  );
};
