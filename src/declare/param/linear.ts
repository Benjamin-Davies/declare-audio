import { Observable } from 'rxjs';

import { BaseParam } from '.';
import { ValueAudioEvent } from '../events';

export class LinearParam extends BaseParam<ValueAudioEvent> {
  next(param: AudioParam, { value, time }: ValueAudioEvent) {
    param.linearRampToValueAtTime(value, time);
  }
}

export const linear = (source: Observable<ValueAudioEvent>) => new LinearParam(source);
