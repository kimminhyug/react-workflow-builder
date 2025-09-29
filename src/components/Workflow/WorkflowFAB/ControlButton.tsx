import React, { type ReactElement } from 'react';
interface ControlButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children?: string | ReactElement;
}
/**추후 사용할 수도 있으므로 남김 */
export const ControlButton: React.FC<ControlButtonProps> = ({ children, onClick, disabled }) => {
  return (
    <button className="control-button" onClick={onClick} disabled={disabled}>
      <>{children}</>
    </button>
  );
};
