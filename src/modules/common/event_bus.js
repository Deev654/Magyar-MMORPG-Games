import { EventEmitter } from 'node:events';

export class EventBus extends EventEmitter {
  emitEvent(type, payload) {
    this.emit(type, payload);
  }

  subscribe(type, listener) {
    this.on(type, listener);
    return () => this.off(type, listener);
  }
}
