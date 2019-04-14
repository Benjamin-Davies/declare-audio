import { DeclareContext, DeclareNode, EffectNode } from '../core';

export interface Filter extends EffectNode {
  frequency: number;
  gain: number;
  type: BiquadFilterType;
  generate(ctx: DeclareContext): GainNode;
}

export function filter(
  frequency: number,
  gain: number,
  type: BiquadFilterType,
  ...children: DeclareNode[]
): Filter {
  return { frequency, gain, type, children, generate };
}

function generate(this: Filter, ctx: DeclareContext): GainNode {
  const node = ctx.audioContext.createBiquadFilter();
  node.frequency.value = this.frequency;
  node.gain.value = this.gain;
  node.type = this.type;
  for (const child of this.children) { child.generate(ctx).connect(node); }
  return node;
}
