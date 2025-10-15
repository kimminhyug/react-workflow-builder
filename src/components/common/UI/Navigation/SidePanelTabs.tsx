import { Pivot, PivotItem } from '@fluentui/react';
import type { IPivotProps, ISidePanelTabItem } from '../types';

export const SidePanelTabs = ({
  items,
  ...pivotProps
}: {
  items: ISidePanelTabItem[];
} & IPivotProps) => (
  <Pivot className="side-panel-tabs" linkFormat="tabs" {...pivotProps}>
    {items.map(({ key, headerText, content }) => (
      //PivotItemProps는 필요시 추가
      <PivotItem key={key} itemKey={key} headerText={headerText}>
        {content}
      </PivotItem>
    ))}
  </Pivot>
);
