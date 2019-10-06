import { Param, ParamAttachment } from '../param';
import { DeclareNode, NodeBuilder } from '.';

export class Gain implements DeclareNode {
  public node: GainNode;
  private gainAtt: ParamAttachment;
  private children: DeclareNode[] = [];

  // tslint:disable-next-line: no-shadowed-variable
  constructor(ctx: AudioContext, gain: Param, children: Array<NodeBuilder<DeclareNode>>) {
    this.node = ctx.createGain();
    this.gainAtt = gain.attach(this.node.gain);

    for (const c of children) {
      const child = c(ctx);
      this.children.push(child);
      child.node.connect(this.node);
    }
  }

  public destroy() {
    this.gainAtt.detach();

    for (const child of this.children) {
      child.node.disconnect(this.node);
      child.destroy();
    }
  }
}

// tslint:disable-next-line: no-shadowed-variable
export function gain(gain: Param, ...children: Array<NodeBuilder<DeclareNode>>): NodeBuilder<Gain> {
  return ctx => new Gain(ctx, gain, children);
}
