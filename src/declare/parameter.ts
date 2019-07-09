import { EventSource } from "./events";

export interface Param {
  bind(param: AudioParam);
}

export class ConstantParam implements Param {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  public bind(param: AudioParam) {
    param.value = this.value;
    return () => {};
  }
}

export function constant(value: number) {
  return new ConstantParam(value);
}

export class LinearParam implements Param {
  private source: EventSource<number>;

  constructor(source: EventSource<number>) {
    this.source = source;
  }

  public bind(param: AudioParam) {
    const unbind = this.source.listen((time, value) =>
      param.linearRampToValueAtTime(value, time)
    );
    const unbindCancel = this.source.onCancel(time =>
      param.cancelScheduledValues(time)
    );

    return () => {
      unbind();
      unbindCancel();
    };
  }
}
