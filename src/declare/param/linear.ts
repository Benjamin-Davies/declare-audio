import { Param } from '.';
import { EventSource } from '../events';

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
