import { Param } from '../param';
import { BaseDeclareNode, DeclareNode, NodeBuilder } from '.';

export class Gain extends BaseDeclareNode<GainNode> {
  constructor(ctx: AudioContext, gainValue: Param, children: Array<NodeBuilder<DeclareNode>>) {
    const node = ctx.createGain();
    const gainSub = gainValue.subscribe(node.gain);

    super(ctx, node, children, [gainSub]);
  }
}

export function gain(gainValue: Param, ...children: Array<NodeBuilder<DeclareNode>>): NodeBuilder<Gain> {
  return ctx => new Gain(ctx, gainValue, children);
}
