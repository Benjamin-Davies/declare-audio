import { DeclareNode, NodeBuilder } from '.';

export class Filter implements DeclareNode {
  public node: BiquadFilterNode;
  private children: DeclareNode[] = [];

  constructor(ctx: AudioContext, frequency: number, gain: number, type: BiquadFilterType, children: Array<NodeBuilder<DeclareNode>>) {
    this.node = ctx.createBiquadFilter();
    this.node.frequency.value = frequency;
    this.node.gain.value = gain;
    this.node.type = type;

    for(const c of children) {
      const child = c(ctx);
      this.children.push(child);
      child.node.connect(this.node);
    }
  }

  public destroy() {
    for (const child of this.children) {
      child.node.disconnect(this.node);
      child.destroy();
    }
  }
}

export function filter(
  frequency: number,
  gain: number,
  type: BiquadFilterType,
  ...children: Array<NodeBuilder<DeclareNode>>
): NodeBuilder<Filter> {
  return ctx => new Filter(ctx, frequency, gain, type, children);
}
