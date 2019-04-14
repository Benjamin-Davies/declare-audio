import $ from 'jquery';

import { context } from '../declare/core';
import { gain, osc } from '../declare/nodes';

const ctx = context();
let playing = false;

$('#play').click(() => {
  if (playing) {
    ctx.unmuteAll();
  } else {
    ctx.play(gain(0.1, ...[2, 4, 5, 6, 8].map(n => osc(110 * n, 'sine'))));
    playing = true;
  }
});

$('#pause').click(() => {
  ctx.muteAll();
});
