import { DeclareNode, DeclareContext } from '../core';

export interface Osc extends DeclareNode {
  frequency: number;
  type: OscillatorType;
  generate(ctx: DeclareContext): OscillatorNode;
}

export function osc(frequency: number, type: OscillatorType): Osc {
  return { frequency, type, generate };
}

function generate(this: Osc, ctx: DeclareContext): OscillatorNode {
  const node = ctx.audioContext.createOscillator();
  node.frequency.value = this.frequency;
  node.type = this.type;
  node.start();
  return node;
}
