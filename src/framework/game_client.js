import { EventEmitter } from 'node:events';

export class GameClient extends EventEmitter {
  constructor({ engine }) {
    super();
    this.engine = engine;
    this.modules = new Map();
    this.overlays = [];
  }

  async initialize() {
    await this.engine.bootstrap();
    this.emit('ready');
  }

  async start() {
    await this.engine.start();
    this.emit('started');
  }

  registerModule(module) {
    if (!module?.id) {
      throw new Error('Module must expose a unique id');
    }

    if (this.modules.has(module.id)) {
      throw new Error(`Module with id ${module.id} already registered`);
    }

    module.onRegister?.(this.engine);
    this.modules.set(module.id, module);
    this.emit('moduleRegistered', module.id);
  }

  getModule(id) {
    return this.modules.get(id);
  }

  addOverlay(overlay) {
    overlay.attach?.(this.engine);
    this.overlays.push(overlay);
  }
}
