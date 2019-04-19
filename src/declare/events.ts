export type Event<T> = [number, T];
export type EventListener<T> = (time: number, data: T) => void;

export class EventSource<T> {
  private listeners: Array<EventListener<T>> = [];
  private cancelListeners: Array<EventListener<void>> = [];
  private pastEvents: Array<Event<T>> = [];

  public listen(
    listener: EventListener<T>,
    includePast: boolean = true
  ): EventSource<T> {
    if (includePast) {
      for (const event of this.pastEvents) {
        listener(...event);
      }
    }
    this.listeners.push(listener);
    return this;
  }

  public onCancel(listener: EventListener<void>): EventSource<T> {
    this.cancelListeners.push(listener);
    return this;
  }

  public trigger(time: number, data: T): EventSource<T> {
    this.pastEvents.push([time, data]);
    for (const listener of this.listeners) {
      listener(time, data);
    }
    return this;
  }

  public cancel(time: number): EventSource<T> {
    for (let i = this.pastEvents.length - 1; i >= 0; i++) {
      const [t] = this.pastEvents[i];
      if (t > time) {
        this.pastEvents.splice(i, 1);
      }
    }

    for (const listener of this.cancelListeners) {
      listener(time);
    }

    return this;
  }

  public map<U>(f: (time: number, data: T) => Event<U>): EventSource<T> {
    const newSource = new EventSource<U>();
    return this.listen((time, data) => {
      newSource.trigger(...f(time, data));
    });
  }
}

export function combineSources<T>(
  ...sources: Array<EventSource<T>>
): EventSource<T> {
  const newSource = new EventSource<T>();
  const listener = newSource.trigger.bind(newSource);
  for (const source of sources) {
    source.listen(listener);
  }
  return newSource;
}

export function once<T>(time: number, data: T): EventSource<T> {
  const eventSource = new EventSource<T>();
  eventSource.trigger(time, data);
  return eventSource;
}

export function repeat<T>(
  startTime: number,
  interval: number,
  data: T
): EventSource<T> {
  const eventSource = new EventSource<T>();
  let time = startTime;

  eventSource.trigger(time, data);
  time += interval;

  setInterval(() => {
    eventSource.trigger(time, data);
    time += interval;
  }, interval * 1000);

  return eventSource;
}
