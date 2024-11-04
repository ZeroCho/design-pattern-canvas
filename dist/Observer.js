class Observer {
}
export const saveCompleteEvent = Symbol('saveComplete');
export class SubscriptionManager {
    listeners = {};
    static instance;
    constructor() { }
    addEvent(event) {
        if (this.listeners[event]) {
            return this.listeners[event];
        }
        this.listeners[event] = [];
        return this.listeners[event];
    }
    subscribe(event, v) {
        this.listeners[event].push(v);
    }
    unsubscribe(event, name) {
        this.listeners[event] = this.listeners[event].filter((v) => v.name !== name);
    }
    publish(event) {
        this.listeners[event].forEach((target) => {
            target.publish(event);
        });
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new SubscriptionManager();
        }
        return this.instance;
    }
}
export class SaveCompleteObserver extends Observer {
    listeners = [];
    subscribe(v) {
        this.listeners.push(v);
    }
    unsubscribe(name) {
        this.listeners = this.listeners.filter((v) => v.name !== name);
    }
    publish() {
        this.listeners.forEach((target) => {
            target.publish('saveComplete');
        });
    }
}
