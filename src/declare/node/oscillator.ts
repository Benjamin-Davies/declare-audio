import { Param } from '../parameter';
import { DeclareNode, NodeBuilder } from '.';

export class Osc implements DeclareNode {
  public node: OscillatorNode;
  private unbindF: () => void;

  constructor(ctx: AudioContext, frequency: Param, type: OscillatorType) {
    this.node = ctx.createOscillator();
    this.unbindF = frequency.bind(this.node.frequency);
    this.node.type = type;
    this.node.start();
  }

  public destroy() {
    this.unbindF();
  }
}

export function osc(frequency: Param, type: OscillatorType): NodeBuilder<Osc> {
  return ctx => new Osc(ctx, frequency, type);
}
