import { EventEmitter } from 'node:events';

export class AuthService extends EventEmitter {
  constructor(networkClient) {
    super();
    this.networkClient = networkClient;
    this.session = null;
  }

  async authenticate(credentials) {
    if (!this.networkClient.connected) {
      throw new Error('Cannot authenticate before connecting');
    }

    await this.networkClient.send({ type: 'auth', payload: credentials });

    if (credentials.password === 'swordfish') {
      this.session = {
        token: 'session-token',
        playerId: credentials.username,
      };
      this.emit('authenticated', this.session);
      return this.session;
    }

    const error = new Error('Invalid credentials');
    this.emit('authenticationFailed', error);
    throw error;
  }
}
