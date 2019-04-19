import { DeclareNode, DeclareParam, EffectNode, useParam } from '.';
import { DeclareContext } from '../core';

export interface Gain extends EffectNode {
  gain: DeclareParam;
  generate(ctx: DeclareContext): GainNode;
}

// tslint:disable-next-line: no-shadowed-variable
export function gain(gain: DeclareParam, ...children: DeclareNode[]): Gain {
  return { gain, children, generate };
}

function generate(this: Gain, ctx: DeclareContext): GainNode {
  const node = ctx.audioContext.createGain();
  useParam(this.gain, node.gain);
  for (const child of this.children) {
    child.generate(ctx).connect(node);
  }
  return node;
}
