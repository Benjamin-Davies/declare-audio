import { Observable, SubscriptionLike } from 'rxjs';

import { resumeContext } from '../core';
import { AudioEvent } from '../events';

export { linear } from './linear';
export { constant } from './constant';

export interface Param {
  subscribe(param: AudioParam): SubscriptionLike;
}

export class BaseParam<E extends AudioEvent> implements Param {
  source: Observable<E>;

  constructor(source: Observable<E>) {
    this.source = source;
  }

  subscribe(param: AudioParam): SubscriptionLike {
    let lastTime = 0;
    const subscription = this.source.subscribe({
      next: event => {
        // If the source backtracks, then overwrite
        if (event.time < lastTime)
          param.cancelAndHoldAtTime(event.time);

        resumeContext();
        this.next(param, event);
        lastTime = event.time;
      }
    });
    return subscription;
  }

  next(_param: AudioParam, _event: E) { }
}
