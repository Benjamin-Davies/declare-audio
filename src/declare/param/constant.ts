import { of } from 'rxjs';

import { linear } from './linear';

export const constant = (value: number) => linear(of({ time: 0, value }));
