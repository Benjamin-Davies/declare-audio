import { EventSource } from '../events';

export { filter } from './filter';
export { gain } from './gain';
export { osc } from './oscillator';

export type NodeBuilder<T extends DeclareNode> = (ctx: AudioContext) => T;

export interface DeclareNode {
  node: AudioNode;
  destroy(): void;
}

export type DeclareParam = number | EventSource<number>;

export function useParam(param: DeclareParam, audioParam: AudioParam) {
  switch (typeof param) {
    case 'number':
      audioParam.value = param;
      break;
    case 'object':
      param.listen((time, value) =>
        audioParam.linearRampToValueAtTime(value, time)
      );
      param.onCancel(time => audioParam.cancelAndHoldAtTime(time));
      break;
  }
}
