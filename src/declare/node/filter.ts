import { Param } from '../param';
import { BaseDeclareNode, DeclareNode, NodeBuilder } from '.';

export class BiquadFilter extends BaseDeclareNode<BiquadFilterNode> {
  constructor(
    ctx: AudioContext,
    frequency: Param,
    gain: Param,
    type: BiquadFilterType,
    children: Array<NodeBuilder<DeclareNode>>
  ) {
    const node = ctx.createBiquadFilter();
    const freqSub = frequency.subscribe(node.frequency);
    const gainSub = gain.subscribe(node.gain);
    node.type = type;

    super(ctx, node, children, [freqSub, gainSub])
  }
}

export function biquadFilter(
  frequency: Param,
  gain: Param,
  type: BiquadFilterType,
  ...children: Array<NodeBuilder<DeclareNode>>
): NodeBuilder<BiquadFilter> {
  return ctx => new BiquadFilter(ctx, frequency, gain, type, children);
}
