import { fromEvent, merge } from 'rxjs';
import { map } from 'rxjs/operators';

import { getContext, play } from '../src/declare/core';
import { adsrEnvelope } from '../src/declare/envelope';
import { biquadFilter, gain, osc } from '../src/declare/node';
import { constant as c } from '../src/declare/param';

const ctx = getContext();

const playBtn = document.getElementById('play');
if (!playBtn) {
  throw new Error('Could not find expected buttons');
}

const oscs = [2, 4, 5, 6, 8].map(n => gain(c(0.2), osc(c(110 * n), 'square')));
const trigger = merge(
  fromEvent(playBtn, 'mousedown')
    .pipe(map(() => ({ time: ctx.currentTime, on: true }))),
  fromEvent(playBtn, 'mouseup')
    .pipe(map(() => ({ time: ctx.currentTime, on: false }))),
);
const demo = gain(
  adsrEnvelope(0.05, 0.5, 0.7, 0.2, trigger),
  biquadFilter(c(500), c(1), 'lowpass', ...oscs)
);

play(demo);
