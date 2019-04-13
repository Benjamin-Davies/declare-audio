import { DeclareNode, DeclareContext, EffectNode } from '../core';

export interface Gain extends EffectNode {
  gain: number;
  generate(ctx: DeclareContext): GainNode;
}

export function gain(gain: number, ...children: DeclareNode[]): Gain {
  return { gain, children, generate };
}

function generate(this: Gain, ctx: DeclareContext): GainNode {
  const node = ctx.audioContext.createGain();
  node.gain.value = this.gain;
  for (const child of this.children) child.generate(ctx).connect(node);
  return node;
}
