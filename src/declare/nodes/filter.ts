import { Param } from '../parameter';
import { DeclareNode, NodeBuilder } from '.';

export class Filter implements DeclareNode {
  public node: BiquadFilterNode;
  private unbindF: () => void;
  private unbindG: () => void;
  private children: DeclareNode[] = [];

  constructor(
    ctx: AudioContext,
    frequency: Param,
    gain: Param,
    type: BiquadFilterType,
    children: Array<NodeBuilder<DeclareNode>>
  ) {
    this.node = ctx.createBiquadFilter();
    this.unbindF = frequency.bind(this.node.frequency);
    this.unbindG = gain.bind(this.node.gain);
    this.node.type = type;

    for(const c of children) {
      const child = c(ctx);
      this.children.push(child);
      child.node.connect(this.node);
    }
  }

  public destroy() {
    this.unbindF();
    this.unbindG();

    for (const child of this.children) {
      child.node.disconnect(this.node);
      child.destroy();
    }
  }
}

export function filter(
  frequency: Param,
  gain: Param,
  type: BiquadFilterType,
  ...children: Array<NodeBuilder<DeclareNode>>
): NodeBuilder<Filter> {
  return ctx => new Filter(ctx, frequency, gain, type, children);
}
