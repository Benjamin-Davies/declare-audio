import { Param, ParamAttachment } from '../param';
import { DeclareNode, NodeBuilder } from '.';

export class Osc implements DeclareNode {
  public node: OscillatorNode;
  private freqAtt: ParamAttachment;

  constructor(ctx: AudioContext, frequency: Param, type: OscillatorType) {
    this.node = ctx.createOscillator();
    this.freqAtt = frequency.attach(this.node.frequency);
    this.node.type = type;
    this.node.start();
  }

  public destroy() {
    this.freqAtt.detach();
  }
}

export function osc(frequency: Param, type: OscillatorType): NodeBuilder<Osc> {
  return ctx => new Osc(ctx, frequency, type);
}
