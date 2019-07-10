export { LinearParam } from './linear';
export { ConstantParam, constant } from './constant';

export interface Param {
  bind(param: AudioParam);
}
