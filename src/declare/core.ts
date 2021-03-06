import { DeclareNode, NodeBuilder } from './node';

let contextCache: AudioContext | undefined;

export function getContext(): AudioContext {
  if (typeof contextCache === 'undefined') {
    contextCache = new AudioContext();
  }
  return contextCache;
}

export function resumeContext() {
  contextCache?.resume();
}

export function play(builder: NodeBuilder<DeclareNode>): DeclareNode {
  const ctx = getContext();
  const node = builder(ctx);
  node.node.connect(ctx.destination);
  return node;
}

export function stop(node: DeclareNode) {
  const ctx = getContext();
  node.node.disconnect(ctx.destination);
  node.destroy();
}
