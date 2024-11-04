abstract class Observer {
  abstract subscribe(v: Listener): void;
  abstract unsubscribe(name: string): void;
  abstract publish(): void;
}

interface Listener {
  name: string;
  publish(event: string): void;
}

export const saveCompleteEvent = Symbol('saveComplete');
export class SubscriptionManager {
  listeners: {
    [key: string]: Listener[]
  } = {};
  private static instance: SubscriptionManager;
  private constructor() {}

  addEvent(event: string) {
    if (this.listeners[event]) {
      return this.listeners[event];
    }
    this.listeners[event] = [];
    return this.listeners[event];
  }
  subscribe(event: string, v: Listener): void {
    this.listeners[event].push(v);
  }
  unsubscribe(event: string, name: string): void {
    this.listeners[event] = this.listeners[event].filter((v) => v.name !== name);
  }
  publish(event: string) {
    this.listeners[event].forEach((target) => {
      target.publish(event);
    });
  }
  static getInstance() {
    if (!this.instance) {
      this.instance = new SubscriptionManager()
    }
    return this.instance;
  }
}

export class SaveCompleteObserver extends Observer {
  listeners: Listener[] = [];

  override subscribe(v: Listener): void {
    this.listeners.push(v);
  }
  override unsubscribe(name: string): void {
    this.listeners = this.listeners.filter((v) => v.name !== name);
  }
  override publish() {
    this.listeners.forEach((target) => {
      target.publish('saveComplete');
    });
  }
}