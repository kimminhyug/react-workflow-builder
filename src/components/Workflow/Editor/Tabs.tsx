import { useAtomValue } from 'jotai';
import { selectedNodeAtom } from '../../../state/selectedNode';

import { Pivot, PivotItem, SidePanelTabs, type ISidePanelTabItem } from '../../common/UI';
import { Icon, Label } from '@fluentui/react';
import { ConditionEditor } from './Condition/ConditionEditor';
import { NodeContentWrapper } from './NodeContentWrapper';
import { useState } from 'react';
import { WidgetGrid, type IWidget } from '../../common/WidgetGrid/WidgetGrid';

export const Tabs = () => {
  const node = useAtomValue(selectedNodeAtom);

  const [widgets, setWidgets] = useState<IWidget[]>([
    { id: 1, label: '이미지' },
    { id: 2, label: '아이콘', icon: <Icon iconName="Emoji2" /> },
    { id: 3, label: '커스텀', icon: <div style={{ width: 24, height: 24, background: 'red' }} /> },
  ]);

  const items: ISidePanelTabItem[] = [
    {
      key: 'tab1',
      headerText: '항목 추가',
      content: (
        <NodeContentWrapper requireNode={false}>
          <WidgetGrid widgets={widgets}></WidgetGrid>
        </NodeContentWrapper>
      ),
    },
    {
      key: 'tab2',
      headerText: '속성 / 설정',
      content: (
        <NodeContentWrapper>
          <ConditionEditor />
          {/* <Stack tokens={{ childrenGap: 8 }}>
          <h4>{node?.data.label} 조건 관리</h4>
          <Button text="조건 추가" onClick={() => setIsOpen(true)} />
          <ConditionList />
          <ConditionModal isOpen={isOpen} onDismiss={() => setIsOpen(false)} />
        </Stack> */}
        </NodeContentWrapper>
      ),
    },
    {
      key: 'tab3',
      headerText: '스타일',
      content: (
        <NodeContentWrapper>
          <Label> #3</Label>
        </NodeContentWrapper>
      ),
    },
    {
      key: 'tab3',
      headerText: '임시(노드 동작 로그?)',
      content: (
        <NodeContentWrapper>
          <Label> #4</Label>
        </NodeContentWrapper>
      ),
    },
  ];
  return (
    <SidePanelTabs items={items} defaultSelectedKey="props" />
    // <Pivot aria-label="" linkFormat="tabs">
    //   <PivotItem headerText="항목 추가">
    //     <NodeContentWrapper requireNode={false}>항목 추가 필요</NodeContentWrapper>
    //   </PivotItem>
    //   <PivotItem headerText="속성 / 설정">
    //     <NodeContentWrapper>
    //       <ConditionEditor />
    //       {/* <Stack tokens={{ childrenGap: 8 }}>
    //       <h4>{node?.data.label} 조건 관리</h4>
    //       <Button text="조건 추가" onClick={() => setIsOpen(true)} />
    //       <ConditionList />
    //       <ConditionModal isOpen={isOpen} onDismiss={() => setIsOpen(false)} />
    //     </Stack> */}
    //     </NodeContentWrapper>
    //   </PivotItem>
    //   <PivotItem headerText="스타일">
    //     <NodeContentWrapper>
    //       <Label> #3</Label>
    //     </NodeContentWrapper>
    //   </PivotItem>
    //   <PivotItem headerText="임시(노드 동작 로그?)">
    //     <NodeContentWrapper>
    //       <Label> #4</Label>
    //     </NodeContentWrapper>
    //   </PivotItem>
    // </Pivot>
  );
};
