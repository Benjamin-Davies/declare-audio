export { filter } from './filter';
export { gain } from './gain';
export { osc } from './oscillator';

export type NodeBuilder<T extends DeclareNode> = (ctx: AudioContext) => T;

export interface DeclareNode {
  node: AudioNode;
  destroy(): void;
}
