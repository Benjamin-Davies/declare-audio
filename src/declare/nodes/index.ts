import { DeclareContext } from '../core';

export { filter } from './filter';
export { gain } from './gain';
export { osc } from './oscillator';

export interface DeclareNode {
  generate(ctx: DeclareContext): AudioNode;
}

export interface EffectNode extends DeclareNode {
  children: DeclareNode[];
}
