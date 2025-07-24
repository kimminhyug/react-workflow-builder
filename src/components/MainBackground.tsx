// import { type Edge, type Node } from '@xyflow/react';
import React from 'react';
import { MainPageNode } from './Workflow/nodes/MainPageNode';
// import { MainPageNode } from './Workflow/nodes/MainPageNode';

export const MainBackground: React.FC = () => {
  // const neonNodeStyle = {
  //   // 색변경필요
  //   background: 'rgba(0, 150, 255, 0.2)',
  //   color: '#00aaff',
  //   border: '1.5px solid #00ccff',
  //   boxShadow: '0 0 8px #003cffff, 0 0 15px #003cffff, 0 0 20px #003cffff',
  //   borderRadius: 8,
  //   // fontFamily: "'Courier New', Courier, monospace",
  //   fontWeight: 'bold',
  //   // padding: 10,
  //   minWidth: 140,
  //   textAlign: 'center' as const,
  // };

  // const nodes: Node[] = [
  //   {
  //     id: 'root',
  //     data: { label: '시작' },
  //     type: 'main',
  //     position: { x: 175, y: 245 },
  //     style: {
  //       ...neonNodeStyle,
  //       background: 'rgba(0, 200, 255, 0.4)',
  //       border: '2px solid #00ffff',
  //       boxShadow: '0 0 12px #2074d4ff, 0 0 14px #519cffff',
  //       height: 125,
  //       width: 400,
  //     },
  //   },
  // {
  //   id: 'top-left',
  //   data: { label: '작업 노드' },
  //   position: { x: 105, y: 135 },
  //   style: neonNodeStyle,
  // },
  // {
  //   id: 'top-center',
  //   data: { label: '분기 노드' },
  //   position: { x: 300, y: 75 },
  //   style: neonNodeStyle,
  // },
  // {
  //   id: 'top-right',
  //   data: { label: '설정 노드' },
  //   position: { x: 500, y: 135 },
  //   style: neonNodeStyle,
  // },
  // {
  //   id: 'bottom-left',
  //   data: { label: '테스트 노드' },
  //   position: { x: 105, y: 415 },
  //   style: neonNodeStyle,
  // },
  // {
  //   id: 'bottom-center',
  //   data: { label: '생성 노드' },
  //   position: { x: 300, y: 435 },
  //   style: neonNodeStyle,
  // },
  // {
  //   id: 'bottom-right',
  //   data: { label: '수집 노드' },
  //   position: { x: 500, y: 415 },
  //   style: neonNodeStyle,
  // },
  // ];

  // const edges: Edge[] = [
  //   {
  //     id: 'e1-root',
  //     target: 'root',
  //     source: 'top-left',
  //     animated: true,
  //     type: 'step',
  //     style: {
  //       stroke: '#00ccff',
  //       filter: 'drop-shadow(0 0 4px #00ccff)',
  //     },
  //   },
  //   {
  //     id: 'e2-root',
  //     target: 'root',
  //     source: 'top-center',
  //     animated: true,
  //     type: 'step',
  //     style: {
  //       stroke: '#00ccff',
  //       filter: 'drop-shadow(0 0 4px #00ccff)',
  //     },
  //   },
  //   {
  //     id: 'e3-root',
  //     target: 'root',
  //     source: 'top-right',
  //     animated: true,
  //     type: 'step',
  //     style: {
  //       stroke: '#00ccff',
  //       filter: 'drop-shadow(0 0 4px #00ccff)',
  //     },
  //   },
  //   {
  //     id: 'e4-root',
  //     source: 'root',
  //     target: 'bottom-left',
  //     animated: true,
  //     type: 'step',
  //     style: {
  //       stroke: '#00ccff',
  //       filter: 'drop-shadow(0 0 4px #00ccff)',
  //     },
  //   },
  //   {
  //     id: 'e5-root',
  //     source: 'root',
  //     target: 'bottom-center',
  //     animated: true,
  //     type: 'step',
  //     style: {
  //       stroke: '#00ccff',
  //       filter: 'drop-shadow(0 0 4px #00ccff)',
  //     },
  //   },
  //   {
  //     id: 'e6-root',
  //     source: 'root',
  //     target: 'bottom-right',
  //     animated: true,
  //     type: 'step',
  //     style: {
  //       stroke: '#00ccff',
  //       filter: 'drop-shadow(0 0 4px #00ccff)',
  //     },
  //   },
  // ];

  return (
    <div
      className="main-page"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        justifyContent: 'center',
      }}
    >
      <MainPageNode />
      {/* <ReactFlow
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        fitView
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={false}
        zoomOnScroll={false}
        panOnScroll={false}
        nodeTypes={{ main: MainPageNode }}
      /> */}
    </div>
  );
};
