import { Pivot, PivotItem } from '@fluentui/react';
import type { ISidePanelTabItem, IPivotProps } from '../types';

export const SidePanelTabs = ({
  items,
  ...pivotProps
}: {
  items: ISidePanelTabItem[];
} & IPivotProps) => (
  <Pivot linkFormat="tabs" {...pivotProps}>
    {items.map(({ key, headerText, content }) => (
      //PivotItemProps는 필요시 추가
      <PivotItem key={key} headerText={headerText}>
        {content}
      </PivotItem>
    ))}
  </Pivot>
);
