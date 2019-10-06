import { Param } from '.';

export const constant = (value: number) => ({
  attach(param) {
    param.value = value;
    return {
      // tslint:disable-next-line:no-empty
      detach() { }
    };
  }
} as Param);
