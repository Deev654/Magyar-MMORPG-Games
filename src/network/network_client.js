import { EventEmitter } from 'node:events';

export class NetworkClient extends EventEmitter {
  constructor() {
    super();
    this.connected = false;
    this.url = null;
  }

  async connect(url) {
    this.url = url;
    await delay(10);
    this.connected = true;
    this.emit('connected', { url });
  }

  async disconnect() {
    if (!this.connected) return;
    await delay(5);
    this.connected = false;
    this.emit('disconnected');
  }

  async send(message) {
    if (!this.connected) {
      throw new Error('Cannot send while disconnected');
    }
    await delay(1);
    this.emit('sent', message);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
