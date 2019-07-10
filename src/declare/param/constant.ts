import { Param } from '.';

export class ConstantParam implements Param {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  public bind(param: AudioParam) {
    param.value = this.value;
    // This function can be empty because we don't need to unbind anything
    // tslint:disable-next-line:no-empty
    return () => {};
  }
}

export function constant(value: number) {
  return new ConstantParam(value);
}
