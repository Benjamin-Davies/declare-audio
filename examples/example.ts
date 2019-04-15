import $ from 'jquery';

import { context } from '../src/declare/core';
import { filter, gain, osc } from '../src/declare/nodes';

const ctx = context();
let playing = false;

const oscs = [2, 4, 5, 6, 8].map(n => osc(110 * n, 'square'));
const demo = gain(0.1, filter(500, 1, 'lowpass', ...oscs));

$('#play').click(() => {
  if (playing) {
    ctx.unmuteAll();
  } else {
    ctx.play(demo);
    playing = true;
  }
});

$('#pause').click(() => {
  ctx.muteAll();
});
