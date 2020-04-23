export interface AudioEvent { time: number; }
export type ValueAudioEvent = AudioEvent & { value: number };
export type BoolAudioEvent = AudioEvent & { on: boolean };
