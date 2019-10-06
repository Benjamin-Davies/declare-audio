import { Observable } from 'rxjs';

import { Param } from '.';
import { ValueAudioEvent } from '../events';

export const linear = (source: Observable<ValueAudioEvent>) => ({
  attach(param: AudioParam) {
    const subscription = source.subscribe({
      next({ time, value }) {
        param.linearRampToValueAtTime(value, time);
      }
    });
    return {
      detach() {
        subscription.unsubscribe();
      }
    };
  }
} as Param);
