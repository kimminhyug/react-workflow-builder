import { Icon, Label } from '@fluentui/react';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useWorkflow } from '../../../hooks/useWorkflow';
import { selectedNodeAtom } from '../../../state/selectedNode';
import { tCommon } from '../../../utils/i18nUtils';
import { SidePanelTabs, type IPivotProps, type ISidePanelTabItem } from '../../common/UI';
import { WidgetGrid, type IWidget } from '../../common/WidgetGrid/WidgetGrid';
import { nodeIconMap } from '../constants/workflow.constants';
import { ConditionEditor } from './Config/ConfigEditor';
import { NodeContentWrapper } from './NodeContentWrapper';

export const Tabs = () => {
  const { addTaskNode, addSwitchNode, addMergeNode, addDecisionNode, addEndNode, addStartNode } =
    useWorkflow();
  const selectedNode = useAtomValue(selectedNodeAtom);
  const { i18n } = useTranslation();
  const widgets = useMemo<IWidget[]>(
    () => [
      {
        id: 1,
        label: tCommon('widgets.task'),
        icon: <Icon iconName={nodeIconMap.decision} />,
        onClick: addTaskNode,
      },
      {
        id: 2,
        label: tCommon('widgets.start'),
        icon: <Icon iconName={nodeIconMap.start} />,
        onClick: addStartNode,
      },
      {
        id: 3,
        label: tCommon('widgets.end'),
        icon: <Icon iconName={nodeIconMap.end} />,
        onClick: addEndNode,
      },
      {
        id: 4,
        label: tCommon('widgets.decision'),
        icon: <Icon iconName={nodeIconMap.decision} />,
        onClick: addDecisionNode,
      },
      {
        id: 5,
        label: tCommon('widgets.merge'),
        icon: <Icon iconName={nodeIconMap.merge} />,
        onClick: addMergeNode,
      },
      {
        id: 6,
        label: tCommon('widgets.switch'),
        icon: <Icon iconName={nodeIconMap.switch} />,
        onClick: addSwitchNode,
      },
      {
        id: 7,
        label: tCommon('widgets.delay'),
        icon: <Icon iconName={nodeIconMap.delay} />,
        onClick: () => alert('준비중'),
      },
      {
        id: 8,
        label: tCommon('widgets.api'),
        onClick: () => alert('준비중'),
      },
    ],
    [i18n.language]
  );

  const items: ISidePanelTabItem[] = useMemo(
    () => [
      {
        key: 'widgetGrid',
        headerText: tCommon('tabs.addItem'),
        content: (
          <NodeContentWrapper requireNode={false}>
            <WidgetGrid widgets={widgets}></WidgetGrid>
          </NodeContentWrapper>
        ),
      },
      {
        key: 'properties',
        headerText: tCommon('tabs.property'),
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

        headerText: tCommon('tabs.style'),
        content: (
          <NodeContentWrapper>
            <Label> #3</Label>
          </NodeContentWrapper>
        ),
      },
      {
        key: 'logs',
        headerText: tCommon('tabs.log'),
        content: (
          <NodeContentWrapper>
            <Label> #4</Label>
          </NodeContentWrapper>
        ),
      },
    ],
    [i18n.language]
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
