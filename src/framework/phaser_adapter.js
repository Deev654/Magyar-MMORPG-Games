import { EventEmitter } from 'node:events';

/**
 * Lightweight Phaser-like adapter so that higher layers do not depend
 * on Phaser at runtime while still allowing the real engine to be
 * plugged in for production builds.
 */
export class PhaserAdapter extends EventEmitter {
  constructor(phaserRuntime) {
    super();
    this.runtime = phaserRuntime ?? createFallbackRuntime();
    this.sceneGraph = new Map();
  }

  async bootstrap() {
    await this.runtime.initialize();
    this.emit('bootstrapped');
  }

  async start() {
    await this.runtime.start();
    this.emit('started');
  }

  createSprite(config) {
    const sprite = this.runtime.createSprite(config);
    this.sceneGraph.set(sprite.id, sprite);
    return sprite;
  }

  destroySprite(id) {
    const sprite = this.sceneGraph.get(id);
    if (sprite) {
      this.runtime.destroySprite(sprite);
      this.sceneGraph.delete(id);
    }
  }
}

function createFallbackRuntime() {
  let counter = 0;
  return {
    async initialize() {
      return Promise.resolve();
    },
    async start() {
      return Promise.resolve();
    },
    createSprite({ texture, x = 0, y = 0 }) {
      return {
        id: `sprite-${counter++}`,
        texture,
        x,
        y,
        metadata: {},
      };
    },
    destroySprite(sprite) {
      sprite.destroyed = true;
    },
  };
}
