export class StateSynchronizer {
  constructor(networkClient) {
    this.networkClient = networkClient;
    this.handlers = [];
    this.listener = this.handleMessage.bind(this);
  }

  start(...modules) {
    this.handlers = modules.filter(Boolean);
    this.networkClient.on('message', this.listener);
  }

  stop() {
    this.networkClient.off('message', this.listener);
    this.handlers = [];
  }

  handleMessage(message) {
    if (message.type !== 'stateUpdate') return;
    this.handlers.forEach((handler) => handler.onState?.(message.payload));
  }
}
