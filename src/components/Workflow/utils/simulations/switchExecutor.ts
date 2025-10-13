import type { CustomEdge } from '../../../../state/edges';
import type { IFlowContext, SwitchNodeType } from '../../types';

export async function executeSwitchNode(
  node: SwitchNodeType,
  context: IFlowContext,
  edges: CustomEdge[],
  walk: (id: string) => Promise<void>
) {
  const data = node.data;
  const expr = data.expression;

  if (!expr) {
    console.warn(`SwitchNode expression 없음: ${node.id}`);
    return;
  }

  let value: any;
  try {
    value = new Function('context', `return ${expr}`)(context);
  } catch (err) {
    console.error(`SwitchNode expression error (${node.id}):`, err);
    return;
  }

  // Edge label과 일치하는 case 찾기
  const matchedEdge = edges.find(
    (e) => e.source === node.id && e.data?.label?.toLowerCase() === String(value).toLowerCase()
  );

  if (matchedEdge) {
    await walk(matchedEdge.target);
  } else if (data.fallbackTarget) {
    await walk(data.fallbackTarget);
  } else {
    console.warn(`SwitchNode 조건 불일치 + fallback 없음: ${node.id}`);
  }
}
