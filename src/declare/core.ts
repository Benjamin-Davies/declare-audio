export interface DeclareContext {
  audioContext: AudioContext;

  play(node: DeclareNode);
  muteAll();
  unmuteAll();
}

export interface DeclareNode {
  generate(ctx: DeclareContext): AudioNode;
}

export interface EffectNode extends DeclareNode {
  children: DeclareNode[];
}

export function context(): DeclareContext {
  let ctx: AudioContext | undefined;
  return {
    play,
    muteAll,
    unmuteAll,
    get audioContext() {
      return ctx || (ctx = new AudioContext());
    }
  };
}

function play(this: DeclareContext, node: DeclareNode) {
  node.generate(this).connect(this.audioContext.destination);
}

function muteAll(this: DeclareContext) {
  this.audioContext.suspend();
}

function unmuteAll(this: DeclareContext) {
  this.audioContext.resume();
}
