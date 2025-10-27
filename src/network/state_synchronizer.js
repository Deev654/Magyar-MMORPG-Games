export class StateSynchronizer {
  constructor(networkClient) {
    this.networkClient = networkClient;
    this.handlers = [];
    this.listener = this.handleMessage.bind(this);
  }

  start(...modules) {
    this.handlers = modules.filter(Boolean);
    this.networkClient.on('sent', this.listener);
  }

  stop() {
    this.networkClient.off('sent', this.listener);
    this.handlers = [];
  }

  handleMessage(message) {
    if (message.type !== 'stateUpdate') return;
    this.handlers.forEach((handler) => handler.onState?.(message.payload));
  }
}
