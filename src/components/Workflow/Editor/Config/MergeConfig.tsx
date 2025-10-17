import { useAtom, useAtomValue } from 'jotai';
import { useTranslation } from 'react-i18next';
import { useUpdateNode } from '../../../../hooks/useNodeUpdater';
import { edgesAtom, type CustomEdge } from '../../../../state/edges';
import { selectedNodeAtom } from '../../../../state/selectedNode';
import { DropdownController } from '../../../Form/DropdownController';
import { TextFieldController } from '../../../Form/TextFieldController';
import type { CustomNode } from '../../types';

const getMergeOptions = (nodes: CustomNode[], edges: CustomEdge[], mergeNodeId?: string) => {
  if (!mergeNodeId) return [];
  //병합노드로 향하는 엣지만 필터링
  const connectedEdges = edges.filter((e) => e.target === mergeNodeId);
  //연결된 source 노드 ID 추출
  const connectedSourceIds = connectedEdges.map((e) => e.source);
  //현재 선택된 노드에 연결된 노드 필터링
  const connectedNodes = nodes.filter((n) => connectedSourceIds.includes(n.id));
  //드랍다운 옵션 변환
  return connectedNodes.map((n) => ({
    key: n.id,
    text: n.data?.label || n.id,
  }));
};

export const MergeConfig = () => {
  const { t } = useTranslation('common');
  const selectedNode = useAtomValue(selectedNodeAtom);
  const [edges] = useAtom(edgesAtom);
  const { nodes } = useUpdateNode();

  return (
    <div className="">
      <TextFieldController name="label" label={t('config.common.label')} />
      <TextFieldController
        name="mergeName"
        label={t('config.merge.mergeName')}
        placeholder={t('config.merge.mergeNamePlaceholder')}
      />
      <DropdownController
        name="inputs"
        label={t('config.merge.inputs')}
        placeholder={t('config.merge.inputsPlaceholder')}
        multiSelect
        options={getMergeOptions(nodes, edges, selectedNode?.id)}
      />
    </div>
  );
};
