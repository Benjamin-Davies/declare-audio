import $ from 'jquery';

import { context, DeclareContext } from '../src/declare/core';
import { adsrEnvelope } from '../src/declare/envelope';
import { EventSource } from '../src/declare/events';
import { filter, gain, osc } from '../src/declare/nodes';

let ctx: DeclareContext | null = null;

const oscs = [2, 4, 5, 6, 8].map(n => osc(110 * n, 'square'));
const trigger = new EventSource<boolean>();
const demo = gain(
  adsrEnvelope(0.1, 0.2, 0.3, 0.4, trigger),
  filter(500, 1, 'lowpass', ...oscs)
);

$('#play')
  .mousedown(() => {
    if (!ctx) {
      ctx = context();
      ctx.play(demo);
    }
    trigger.cancel(0).trigger(ctx.now, true);
  })
  .mouseup(() => {
    if (!ctx) {
      ctx = context().play(demo);
    }
    trigger.cancel(0).trigger(ctx.now, false);
  });
