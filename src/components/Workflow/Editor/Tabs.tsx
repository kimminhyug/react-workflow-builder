import { Icon, Label } from '@fluentui/react';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useWorkflow } from '../../../hooks/useWorkflow';
import { selectedNodeAtom } from '../../../state/selectedNode';
import { SidePanelTabs, type IPivotProps, type ISidePanelTabItem } from '../../common/UI';
import { WidgetGrid, type IWidget } from '../../common/WidgetGrid/WidgetGrid';
import { nodeIconMap } from '../constants/workflow.constants';
import { ConditionEditor } from './Condition/ConditionEditor';
import { NodeContentWrapper } from './NodeContentWrapper';

export const Tabs = () => {
  const { addTaskNode, addSwitchNode, addMergeNode, addDecisionNode, addEndNode, addStartNode } =
    useWorkflow();
  const selectedNode = useAtomValue(selectedNodeAtom);
  const [widgets] = useState<IWidget[]>([
    // 기존 작업 노드
    {
      id: 1,
      label: '작업 노드 추가',
      icon: <Icon iconName={nodeIconMap.decision} />,
      onClick: addTaskNode,
    },

    {
      id: 2,
      label: '시작 노드 추가',
      icon: <Icon iconName={nodeIconMap.start} />,
      onClick: addStartNode,
    },

    {
      id: 3,
      label: '종료 노드 추가',
      icon: <Icon iconName={nodeIconMap.end} />,
      onClick: addEndNode,
    },

    {
      id: 4,
      label: '조건 노드 추가',
      icon: <Icon iconName={nodeIconMap.decision} />,
      onClick: addDecisionNode,
    },
    {
      id: 5,
      label: '병합 노드 추가',
      icon: <Icon iconName={nodeIconMap.merge} />,
      onClick: addMergeNode,
    },
    {
      id: 6,
      label: '케이스 노드 추가',
      icon: <Icon iconName={nodeIconMap.switch} />,
      onClick: addSwitchNode,
    },

    {
      id: 7,
      label: '딜레이 노드 추가',
      icon: <Icon iconName={nodeIconMap.delay} />,
      onClick: () => alert('준비중'),
    },

    {
      id: 8,
      label: 'API 노드 추가',
      onClick: () => alert('준비중'),
    },
  ]);

  const items: ISidePanelTabItem[] = useMemo(
    () => [
      {
        key: 'widgetGrid',
        headerText: '항목 추가',
        content: (
          <NodeContentWrapper requireNode={false}>
            <WidgetGrid widgets={widgets}></WidgetGrid>
          </NodeContentWrapper>
        ),
      },
      {
        key: 'properties',
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
        key: 'style',

        headerText: '스타일',
        content: (
          <NodeContentWrapper>
            <Label> #3</Label>
          </NodeContentWrapper>
        ),
      },
      {
        key: 'logs',
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
  const [selectedTab, setSelectedTab] = useState('widgetGrid');

  const handleSelectTab: IPivotProps['onLinkClick'] = (item) => {
    setSelectedTab(item?.props.itemKey || 'properties');
  };

  // 노드 선택시 속성 / 설정 탭으로 변경
  useEffect(() => {
    if (selectedNode?.id) setSelectedTab('properties');
  }, [selectedNode?.id]);

  return (
    <SidePanelTabs
      items={items}
      selectedKey={selectedTab}
      onLinkClick={handleSelectTab}
      overflowBehavior="menu"
    />
  );
};
