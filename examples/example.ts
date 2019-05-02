import $ from 'jquery';

import { getContext, play } from '../src/declare/core';
import { adsrEnvelope } from '../src/declare/envelope';
import { EventSource } from '../src/declare/events';
import { DeclareNode, filter, gain, osc } from '../src/declare/nodes';

const ctx = getContext();
let node: DeclareNode | undefined = undefined;

const oscs = [2, 4, 5, 6, 8].map(n => osc(110 * n, 'square'));
const trigger = new EventSource<boolean>();
const demo = gain(
  adsrEnvelope(0.1, 0.2, 0.3, 0.4, trigger),
  filter(500, 1, 'lowpass', ...oscs)
);

$('#play')
  .mousedown(() => {
    if (!node) {
      node = play(demo);
    }
    trigger.cancel(0).trigger(ctx.currentTime, true);
  })
  .mouseup(() => {
    trigger.cancel(0).trigger(ctx.currentTime, false);
  });
