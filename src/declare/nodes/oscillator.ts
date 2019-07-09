import { DeclareNode, NodeBuilder } from '.';

export class Osc implements DeclareNode {
  public node: OscillatorNode;

  constructor(ctx: AudioContext, frequency: number, type: OscillatorType) {
    this.node = ctx.createOscillator();
    this.node.frequency.value = frequency;
    this.node.type = type;
    this.node.start();
  }

  public destroy() { }
}

export function osc(frequency: number, type: OscillatorType): NodeBuilder<Osc> {
  return ctx => new Osc(ctx, frequency, type);
}
