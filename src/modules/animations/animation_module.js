import { EventBus } from '../common/event_bus.js';

export class AnimationModule {
  constructor() {
    this.id = 'animations';
    this.eventBus = new EventBus();
    this.animations = new Map();
  }

  onRegister(engine) {
    this.engine = engine;
  }

  playAnimation(spriteId, animation) {
    this.animations.set(spriteId, animation);
    this.eventBus.emitEvent('animationStarted', { spriteId, animation });
  }

  stopAnimation(spriteId) {
    const animation = this.animations.get(spriteId);
    if (!animation) return;
    this.animations.delete(spriteId);
    this.eventBus.emitEvent('animationStopped', { spriteId, animation });
  }

  onState(state) {
    state.animations?.forEach(({ spriteId, animation }) => {
      this.playAnimation(spriteId, animation);
    });
  }
}
