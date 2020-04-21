import { SubscriptionLike } from 'rxjs';

export { linear } from './linear';
export { constant } from './constant';

export interface Param {
  subscribe(param: AudioParam): SubscriptionLike;
}
