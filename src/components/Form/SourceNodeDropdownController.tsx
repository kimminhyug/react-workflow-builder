import { useAtom, useAtomValue } from 'jotai';
import { useUpdateNode } from '../../hooks/useNodeUpdater';
import { edgesAtom } from '../../state/edges';
import { selectedNodeAtom } from '../../state/selectedNode';
import type { IDropdownOption } from '../common/UI';
import { getConnectedSourceOptions } from '../Workflow/constants/workflow.constants';
import { DropdownController } from './DropdownController';
import type { IDropdownControllerProps } from './types';

interface ISourceNodeDropdownControllerProps extends Omit<IDropdownControllerProps, 'options'> {
  name: string;
  options?: IDropdownOption[];
}

export const SourceNodeDropdownController = ({
  name,
  options = [],
  ...others
}: ISourceNodeDropdownControllerProps) => {
  const selectedNode = useAtomValue(selectedNodeAtom);
  const [edges] = useAtom(edgesAtom);
  const { nodes } = useUpdateNode();

  return (
    <DropdownController
      name={name}
      options={getConnectedSourceOptions(nodes, edges, selectedNode?.id)}
      {...(others || {})}
    />
  );
};
