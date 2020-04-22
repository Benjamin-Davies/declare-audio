import { Observable } from 'rxjs';

import { Param } from '.';
import { resumeContext } from '../core';
import { ValueAudioEvent } from '../events';

export const linear = (source: Observable<ValueAudioEvent>) => ({
  subscribe(param: AudioParam) {
    let t = 0;
    const subscription = source.subscribe({
      next({ time, value }) {
        // If the source backtracks, then overwrite
        if (time < t)
          param.cancelAndHoldAtTime(time);

        resumeContext();
        param.linearRampToValueAtTime(value, time);
        t = time;
      }
    });
    return subscription;
  }
} as Param);
