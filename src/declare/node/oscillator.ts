import { SubscriptionLike } from 'rxjs';

import { Param } from '../param';
import { DeclareNode, NodeBuilder } from '.';

export class Osc implements DeclareNode {
  public node: OscillatorNode;
  private freqSub: SubscriptionLike;

  constructor(ctx: AudioContext, frequency: Param, type: OscillatorType) {
    this.node = ctx.createOscillator();
    this.freqSub = frequency.subscribe(this.node.frequency);
    this.node.type = type;
    this.node.start();
  }

  public destroy() {
    this.freqSub.unsubscribe();
  }
}

export function osc(frequency: Param, type: OscillatorType): NodeBuilder<Osc> {
  return ctx => new Osc(ctx, frequency, type);
}
