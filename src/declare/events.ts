export type AudioEvent<T extends object> = T & { time: number };
export type ValueAudioEvent = AudioEvent<{ value: number }>;
