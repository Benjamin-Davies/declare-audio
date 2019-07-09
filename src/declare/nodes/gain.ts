import { DeclareNode, DeclareParam, NodeBuilder, useParam } from '.';

export class Gain implements DeclareNode {
  public node: GainNode;

  private children: DeclareNode[] = [];

  // tslint:disable-next-line: no-shadowed-variable
  constructor(ctx: AudioContext, gain: DeclareParam, children: Array<NodeBuilder<DeclareNode>>) {
    this.node = ctx.createGain();
    this.node.gain.value = gain;

    for (const c of children) {
      const child = c(ctx);
      this.children.push(child);
      child.node.connect(this.node);
    }
  }

  
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
