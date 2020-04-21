import { SubscriptionLike } from 'rxjs';

import { Param } from '../param';
import { DeclareNode, NodeBuilder } from '.';

export class Filter implements DeclareNode {
  public node: BiquadFilterNode;
  private freqSub: SubscriptionLike;
  private gainSub: SubscriptionLike;
  private children: DeclareNode[] = [];

  constructor(
    ctx: AudioContext,
    frequency: Param,
    gain: Param,
    type: BiquadFilterType,
    children: Array<NodeBuilder<DeclareNode>>
  ) {
    this.node = ctx.createBiquadFilter();
    this.freqSub = frequency.subscribe(this.node.frequency);
    this.gainSub = gain.subscribe(this.node.gain);
    this.node.type = type;

    for(const c of children) {
      const child = c(ctx);
      this.children.push(child);
      child.node.connect(this.node);
    }
  }

  public destroy() {
    this.freqSub.unsubscribe();
    this.gainSub.unsubscribe();

    for (const child of this.children) {
      child.node.disconnect(this.node);
      child.destroy();
    }
  }
}

export function filter(
  frequency: Param,
  gain: Param,
  type: BiquadFilterType,
  ...children: Array<NodeBuilder<DeclareNode>>
): NodeBuilder<Filter> {
  return ctx => new Filter(ctx, frequency, gain, type, children);
}
