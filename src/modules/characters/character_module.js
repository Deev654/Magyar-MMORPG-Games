import { EventBus } from '../common/event_bus.js';

export class CharacterModule {
  constructor() {
    this.id = 'characters';
    this.eventBus = new EventBus();
    this.characters = new Map();
  }

  onRegister(engine) {
    this.engine = engine;
  }

  spawnCharacter({ id, texture, position }) {
    if (this.characters.has(id)) {
      return this.characters.get(id);
    }

    const sprite = this.engine.createSprite({
      texture,
      x: position.x,
      y: position.y,
    });

    const character = {
      id,
      spriteId: sprite.id,
      texture,
      position: { ...position },
    };

    this.characters.set(id, character);
    this.eventBus.emitEvent('characterSpawned', character);
    return character;
  }

  removeCharacter(id) {
    const character = this.characters.get(id);
    if (!character) return;
    this.engine.destroySprite(character.spriteId);
    this.characters.delete(id);
    this.eventBus.emitEvent('characterRemoved', { id });
  }

  onState(state) {
    state.characters?.forEach((charState) => {
      const existing = this.characters.get(charState.id);
      if (!existing) {
        this.spawnCharacter({
          id: charState.id,
          texture: charState.texture,
          position: charState.position,
        });
        return;
      }

      existing.position = { ...charState.position };
      this.eventBus.emitEvent('characterUpdated', existing);
    });
  }
}
