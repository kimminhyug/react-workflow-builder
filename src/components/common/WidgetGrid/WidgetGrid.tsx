import React from 'react';

export interface IWidget {
  id: number | string;
  label: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

interface IWidgetGridProps {
  widgets: IWidget[];
}

export const WidgetGrid: React.FC<IWidgetGridProps> = ({ widgets }) => {
  // 모든 위젯이 아이콘이 없는 경우 더미 영역을 생성 하지 않음
  const isIconAllEmpty = widgets.every((w) => !w.icon);

  const theme = 'neon';
  return (
    <div className={`widget-grid ${isIconAllEmpty ? 'all-empty' : ''} ${theme}`}>
      {widgets.map((widget) => (
        <div key={widget.id} className={`widget-item ${theme}`} onClick={() => widget.onClick?.()}>
          {widget.icon ? (
            <div className={`widget-icon ${theme}`}>{widget.icon}</div>
          ) : (
            <div className={`widget-placeholder ${theme}`}></div>
          )}
          <span className={`widget-label ${theme}`}>{widget.label}</span>
        </div>
      ))}
      {/* 
      {onAdd && (
        <button className={`widget-item add-btn ${theme}`} onClick={onAdd}>
          <Icon iconName="Add" className="add-icon" />
          <span className={`widget-label ${theme}`}>추가</span>
        </button>
      )} */}
    </div>
  );
};
