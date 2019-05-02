import { DeclareNode, NodeBuilder } from './nodes';

export interface DeclareContext {
  audioContext: AudioContext;
  masterGain: GainNode;
  now: number;

  play(node: NodeBuilder<DeclareNode>): DeclareContext;
  muteAll(): DeclareContext;
  unmuteAll(): DeclareContext;
}

export function context(): DeclareContext {
  const audioContext = new AudioContext();
  const masterGain = audioContext.createGain();
  masterGain.gain.value = 0;
  masterGain.connect(audioContext.destination);

  return {
    audioContext,
    masterGain,
    muteAll,
    play,
    unmuteAll,
    get now() {
      return audioContext.currentTime;
    }
  };
}

function play(this: DeclareContext, node: NodeBuilder<DeclareNode>) {
  node(this.audioContext).node.connect(this.masterGain);
  this.unmuteAll();
  return this;
}

const muteDelay = 0.01;

function muteAll(this: DeclareContext) {
  this.masterGain.gain.linearRampToValueAtTime(
    0,
    this.audioContext.currentTime + muteDelay
  );
  return this;
}

function unmuteAll(this: DeclareContext) {
  this.masterGain.gain.linearRampToValueAtTime(
    1,
    this.audioContext.currentTime + muteDelay
  );
  return this;
}
