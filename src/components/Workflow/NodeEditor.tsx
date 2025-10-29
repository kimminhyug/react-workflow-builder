import { useAtomValue, useSetAtom } from 'jotai';
import { delay } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { nodesAtom } from '../../state/nodes';
import { selectedNodeAtom } from '../../state/selectedNode';
import { tCommon } from '../../utils/i18nUtils';
import { Icon } from '../common/UI';
import { Tabs } from './Editor/Tabs';
import type { CustomNode } from './types';

export const NodeEditor = () => {
  const selectedNode = useAtomValue(selectedNodeAtom);
  const setNodes = useSetAtom(nodesAtom);
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(true);
  const [showContents, setShowContents] = useState(isOpen);
  const togglePanel = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!selectedNode) return;
    setNodes((nds: CustomNode[]) =>
      nds.map((node) =>
        node.id === selectedNode.id ? { ...node, data: { ...selectedNode.data } } : node
      )
    );
  }, [selectedNode]);
  useEffect(() => {
    if (isOpen) {
      delay(() => {
        setShowContents(true);
      }, 250);
    } else {
      setShowContents(false);
    }
  }, [isOpen]);

  const labels = useMemo(
    () => ({
      title: tCommon('editor.title'),
      close: tCommon('panel.close'),
      open: tCommon('panel.open'),
    }),
    [i18n.language]
  );

  return (
    <div className={`neon-panel ${isOpen ? 'open' : 'closed'}`}>
      <div className="neon-panel-toggle" onClick={togglePanel}>
        <Icon
          iconName={isOpen ? 'OpenPaneMirrored' : 'OpenPane'}
          title={isOpen ? labels.close : labels.open}
        />
      </div>

      <div className="neon-panel-content">
        <h3 className="neon-title">{labels.title}</h3>
        {isOpen ? (
          <>{showContents && <Tabs />}</>
        ) : (
          <div>
            {/* <div>icon </div>
            <div>icon</div> */}
          </div>
        )}
      </div>
    </div>
  );
};
