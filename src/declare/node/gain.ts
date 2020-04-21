import { SubscriptionLike } from 'rxjs';

import { Param } from '../param';
import { DeclareNode, NodeBuilder } from '.';

export class Gain implements DeclareNode {
  public node: GainNode;
  private gainSub: SubscriptionLike;
  private children: DeclareNode[] = [];

  constructor(ctx: AudioContext, gainValue: Param, children: Array<NodeBuilder<DeclareNode>>) {
    this.node = ctx.createGain();
    this.gainSub = gainValue.subscribe(this.node.gain);

    for (const c of children) {
      const child = c(ctx);
      this.children.push(child);
      child.node.connect(this.node);
    }
  }

  public destroy() {
    this.gainSub.unsubscribe();

    for (const child of this.children) {
      child.node.disconnect(this.node);
      child.destroy();
    }
  }
}

export function gain(gainValue: Param, ...children: Array<NodeBuilder<DeclareNode>>): NodeBuilder<Gain> {
  return ctx => new Gain(ctx, gainValue, children);
}
