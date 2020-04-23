import { SubscriptionLike } from 'rxjs';

export { biquadFilter } from './filter';
export { gain } from './gain';
export { osc } from './oscillator';

export type NodeBuilder<T extends DeclareNode> = (ctx: AudioContext) => T;

export interface DeclareNode {
  node: AudioNode;
  destroy(): void;
}

export class BaseDeclareNode<N extends AudioNode> implements DeclareNode {
  node: N;
  childNodes: DeclareNode[];
  subscriptions: SubscriptionLike[];

  constructor(ctx: AudioContext, node: N, children: NodeBuilder<DeclareNode>[], subscriptions: SubscriptionLike[]) {
    this.node = node;
    this.childNodes = children.map(c => c(ctx));
    this.subscriptions = subscriptions;
  }

  destroy() {
    this.node.disconnect();
    for (const c of this.childNodes) {
      c.destroy();
    }

    for (const s of this.subscriptions) {
      s.unsubscribe();
    }
  }
}
