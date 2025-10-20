import { useAtom, useAtomValue } from 'jotai';
import { useUpdateNode } from '../../hooks/useNodeUpdater';
import { edgesAtom } from '../../state/edges';
import { selectedNodeAtom } from '../../state/selectedNode';
import type { IDropdownOption } from '../common/UI';
import { getConnectedTargetOptions } from '../Workflow/constants/workflow.constants';
import { DropdownController } from './DropdownController';
import type { IDropdownControllerProps } from './types';

interface ITargetNodeDropdownControllerProps extends Omit<IDropdownControllerProps, 'options'> {
  name: string;
  options?: IDropdownOption[];
}

export const TargetNodeDropdownController = ({
  name,
  options = [],
  ...others
}: ITargetNodeDropdownControllerProps) => {
  const selectedNode = useAtomValue(selectedNodeAtom);
  const [edges] = useAtom(edgesAtom);
  const { nodes } = useUpdateNode();

  return (
    <DropdownController
      name={name}
      options={getConnectedTargetOptions(nodes, edges, selectedNode?.id)}
      {...(others || {})}
    />
  );
};
