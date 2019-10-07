import { Observable, of } from 'rxjs';
import { merge, switchMap } from 'rxjs/operators';

import { BoolAudioEvent, ValueAudioEvent } from './events';
import { linear, Param } from './param';

export function adsrEnvelope(
  attack: number,
  decay: number,
  sustain: number,
  release: number,
  trigger: Observable<BoolAudioEvent>
): Param {
  return linear(trigger.pipe(
    switchMap(({ time, on }) => {
      const events: ValueAudioEvent[] = [];
      if (on) {
        events.push({ time, value: 0 });
        time += attack;
        events.push({ time, value: 1 });
        time += decay;
        events.push({ time, value: sustain });
      } else {
        events.push({ time, value: sustain });
        time += release;
        events.push({ time, value: 0 });
      }
      return events;
    }),
    merge(of({ time: 0, value: 0 }))
    ));
}
