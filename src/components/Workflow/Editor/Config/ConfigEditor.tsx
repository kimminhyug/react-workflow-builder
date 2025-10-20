import { useMemo, useState } from 'react';
import { Stack } from '../../../common/UI';
import { ConditionModal } from '../Condition/ConditionModal';
import { DecisionConfig } from './DecisionConfig';
import { InputConfig } from './InputConfig';
import { MergeConfig } from './MergeConfig';
import { SwitchConfig } from './SwitchConfig';

import { useAtomValue } from 'jotai';
import { selectedNodeAtom } from '../../../../state/selectedNode';
import { TaskConfig } from './TaskConfig';

export const ConditionEditor = () => {
  const selectedNode = useAtomValue(selectedNodeAtom);
  const [isOpen, setIsOpen] = useState(false);

  // nodeType별 폼 매핑
  const nodeTypeToFormMap: Record<string, React.FC | undefined> = useMemo(
    () => ({
      switch: SwitchConfig,
      merge: MergeConfig,
      decision: DecisionConfig,
      input: InputConfig,
      task: TaskConfig,
    }),
    []
  );

  if (!selectedNode) {
    return <></>;
  }
  const ConfigComponent = nodeTypeToFormMap?.[selectedNode.type];

  return (
    <>
      <Stack tokens={{ childrenGap: 8 }}>
        {/* <ConditionList /> */}
        {ConfigComponent ? (
          <ConfigComponent key={selectedNode.id} />
        ) : (
          <>설정을 찾을 수 없습니다.</>
        )}
        <ConditionModal isOpen={isOpen} onDismiss={() => setIsOpen(false)} />
      </Stack>
    </>
  );
};
