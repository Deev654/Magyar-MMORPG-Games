export class NetworkLogger {
  constructor(networkClient) {
    this.networkClient = networkClient;
    this.entries = [];
    this.boundLogSend = this.logSend.bind(this);
    this.boundLogConnect = this.logConnect.bind(this);
    this.boundLogDisconnect = this.logDisconnect.bind(this);
  }

  attach() {
    this.networkClient.on('connected', this.boundLogConnect);
    this.networkClient.on('disconnected', this.boundLogDisconnect);
    this.networkClient.on('sent', this.boundLogSend);
  }

  detach() {
    this.networkClient.off('connected', this.boundLogConnect);
    this.networkClient.off('disconnected', this.boundLogDisconnect);
    this.networkClient.off('sent', this.boundLogSend);
  }

  logConnect({ url }) {
    this.entries.push({ type: 'connect', url, timestamp: Date.now() });
  }

  logDisconnect() {
    this.entries.push({ type: 'disconnect', timestamp: Date.now() });
  }

  logSend(message) {
    this.entries.push({ type: 'send', message, timestamp: Date.now() });
  }
}
