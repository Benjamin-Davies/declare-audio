export interface DeclareContext {
  audioContext: AudioContext;
  masterGain: GainNode;

  play(node: DeclareNode);
  muteAll();
  unmuteAll();
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
    unmuteAll
  };
}

function play(this: DeclareContext, node: DeclareNode) {
  node.generate(this).connect(this.masterGain);

  this.unmuteAll();
}

const muteDelay = 0.01;

function muteAll(this: DeclareContext) {
  this.masterGain.gain.linearRampToValueAtTime(
    0,
    this.audioContext.currentTime + muteDelay
  );
}

function unmuteAll(this: DeclareContext) {
  this.masterGain.gain.linearRampToValueAtTime(
    1,
    this.audioContext.currentTime + muteDelay
  );
}
