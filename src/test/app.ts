import $ from 'jquery';

import { context } from '../declare/core';
import { gain, osc } from '../declare/nodes';

const ctx = context();
let playing = false;

$('#play').click(() => {
  if (playing) {
    ctx.unmuteAll();
  } else {
    ctx.play(gain(0.1, osc(440, 'sine'), osc(550, 'sine')));
    playing = true;
  }
});

$('#pause').click(() => {
  ctx.muteAll();
});
