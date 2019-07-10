import { Event, EventSource } from './events';
import { LinearParam } from './param';

export function adsrEnvelope(
  attack: number,
  decay: number,
  sustain: number,
  release: number,
  trigger: EventSource<boolean>
): LinearParam {
  return new LinearParam(trigger
    .mapMerge((time, down) => {
      const events: Array<Event<number>> = [];
      let t = time;
      if (down) {
        events.push([t, 0]);
        t += attack;
        events.push([t, 1]);
        t += decay;
        events.push([t, sustain]);
      } else {
        events.push([t, sustain]);
        t += release;
        events.push([t, 0]);
      }
      return events;
    })
    .trigger(0, 0));
}
