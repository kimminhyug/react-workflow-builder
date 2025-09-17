import React from 'react';
import { Icon } from '@fluentui/react';

export interface IWidget {
  id: number | string;
  label: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

interface IWidgetGridProps {
  widgets: IWidget[];
  onAdd?: () => void;
  onClickWidget?: (widget: IWidget) => void;
}

export const WidgetGrid: React.FC<IWidgetGridProps> = ({ widgets, onAdd, onClickWidget }) => {
  // 모든 위젯이 아이콘이 없는 경우 더미 영역을 생성 하지 않음
  const isIconAllEmpty = widgets.every((w) => !w.icon);

  return (
    <div className={`widget-grid ${isIconAllEmpty ? 'all-empty' : ''}`}>
      {widgets.map((widget) => (
        <div key={widget.id} className="widget-item" onClick={() => onClickWidget?.(widget)}>
          {widget.icon ? (
            <div className="widget-icon">{widget.icon}</div>
          ) : (
            <div className="widget-placeholder"></div>
          )}
          <span className="widget-label">{widget.label}</span>
        </div>
      ))}

      {onAdd && (
        <button className="widget-item add-btn" onClick={onAdd}>
          <Icon iconName="Add" className="add-icon" />
          <span className="widget-label">추가</span>
        </button>
      )}
    </div>
  );
};
