import { useAtomValue } from 'jotai';
import { selectedNodeAtom } from '../../../state/selectedNode';

import { Icon, Label } from '@fluentui/react';
import { useMemo, useState } from 'react';
import { useWorkflow } from '../../../hooks/useWorkflow';
import { SidePanelTabs, type ISidePanelTabItem } from '../../common/UI';
import { WidgetGrid, type IWidget } from '../../common/WidgetGrid/WidgetGrid';
import { ConditionEditor } from './Condition/ConditionEditor';
import { NodeContentWrapper } from './NodeContentWrapper';

export const Tabs = () => {
  const node = useAtomValue(selectedNodeAtom);
  const { addTaskNode } = useWorkflow();
  const [widgets] = useState<IWidget[]>([
    // 기존 작업 노드
    {
      id: 1,
      label: '작업 노드 추가',
      icon: <Icon iconName="ProcessMetaTask" />,
      onClick: addTaskNode,
    },

    {
      id: 2,
      label: 'Start 노드 추가',
      icon: <Icon iconName="Play" />,
    },

    {
      id: 3,
      label: 'End 노드 추가',
      icon: <Icon iconName="Stop" />,
    },

    {
      id: 4,
      label: '조건 노드 추가',
      icon: <Icon iconName="BranchFork" />,
    },

    {
      id: 5,
      label: 'Delay 노드 추가',
      icon: <Icon iconName="Clock" />,
    },

    {
      id: 6,
      label: 'API 노드 추가',
    },
  ]);

  const items: ISidePanelTabItem[] = useMemo(
    () => [
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
    ],
    []
  );
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
