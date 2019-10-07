import { Observable } from 'rxjs';

import { Param } from '.';
import { ValueAudioEvent } from '../events';

export const linear = (source: Observable<ValueAudioEvent>) => ({
  attach(param: AudioParam) {
    let t = 0;
    const subscription = source.subscribe({
      next({ time, value }) {
        // If the source backtracks, then overwrite
        if (time < t)
          param.cancelAndHoldAtTime(time);

        param.linearRampToValueAtTime(value, time);
        t = time;
      }
    });
    return {
      detach() {
        subscription.unsubscribe();
      }
    };
  }
} as Param);
