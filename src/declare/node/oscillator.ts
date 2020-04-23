import { Param } from '../param';
import { BaseDeclareNode, NodeBuilder } from '.';

export class Osc extends BaseDeclareNode<OscillatorNode> {
  constructor(ctx: AudioContext, frequency: Param, type: OscillatorType) {
    const node = ctx.createOscillator();
    const freqSub = frequency.subscribe(node.frequency);
    node.type = type;
    node.start();

    super(ctx, node, [], [freqSub]);
  }
}

export function osc(frequency: Param, type: OscillatorType): NodeBuilder<Osc> {
  return ctx => new Osc(ctx, frequency, type);
}
