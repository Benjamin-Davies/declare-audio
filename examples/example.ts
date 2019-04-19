import $ from 'jquery';

import { context } from '../src/declare/core';
import { adsrEnvelope } from '../src/declare/envelope';
import { EventSource } from '../src/declare/events';
import { filter, gain, osc } from '../src/declare/nodes';

const ctx = context();
const playing = false;

const oscs = [2, 4, 5, 6, 8].map(n => osc(110 * n, 'square'));
const trigger = new EventSource<boolean>();
const demo = gain(
  adsrEnvelope(0.1, 0.2, 0.3, 0.4, trigger),
  filter(500, 1, 'lowpass', ...oscs)
);
ctx.play(demo);

$('#play')
  .mousedown(() => {
    trigger.trigger(ctx.now, true);
  })
  .mouseup(() => {
    trigger.trigger(ctx.now, false);
  });
