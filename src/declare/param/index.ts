export { linear } from './linear';
export { constant } from './constant';

export interface Param {
  attach(param: AudioParam): ParamAttachment;
}

export interface ParamAttachment {
  detach(): void;
}
