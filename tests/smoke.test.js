import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { GameClient } from '../src/framework/game_client.js';
import { PhaserAdapter } from '../src/framework/phaser_adapter.js';
import { NetworkClient } from '../src/network/network_client.js';
import { AuthService } from '../src/network/auth_service.js';
import { StateSynchronizer } from '../src/network/state_synchronizer.js';
import { CharacterModule } from '../src/modules/characters/character_module.js';
import { UIModule } from '../src/modules/ui/ui_module.js';
import { InventoryModule } from '../src/modules/inventory/inventory_module.js';
import { DebugOverlay } from '../src/tooling/debug_overlay.js';

const noopRuntime = {
  async initialize() {},
  async start() {},
  createSprite({ texture, x, y }) {
    return { id: `${texture}-${x}-${y}`, texture, x, y, metadata: {} };
  },
  destroySprite() {},
};

describe('smoke test', () => {
  let engine;
  let client;
  let network;
  let auth;
  let sync;
  let characters;
  let ui;
  let inventory;

  beforeEach(() => {
    engine = new PhaserAdapter(noopRuntime);
    client = new GameClient({ engine });
    network = new NetworkClient();
    auth = new AuthService(network);
    sync = new StateSynchronizer(network);
    characters = new CharacterModule();
    ui = new UIModule();
    inventory = new InventoryModule();
  });

  it('boots engine, authenticates and syncs state', async () => {
    const overlay = new DebugOverlay();
    client.addOverlay(overlay);
    client.registerModule(characters);
    client.registerModule(ui);
    client.registerModule(inventory);

    await client.initialize();
    await network.connect('ws://localhost/test');
    const session = await auth.authenticate({ username: 'alice', password: 'swordfish' });
    assert.equal(session.playerId, 'alice');

    sync.start(characters, inventory, ui);

    await network.send({
      type: 'stateUpdate',
      payload: {
        characters: [
          { id: 'char-1', texture: 'hero', position: { x: 10, y: 20 } },
        ],
        inventory: [{ id: 'item-1', name: 'Sword' }],
        ui: { statusBar: { visible: true } },
      },
    });

    assert.ok(characters.characters.has('char-1'));
    assert.equal(inventory.items.length, 1);
    assert.ok(ui.widgets.has('statusBar'));
    assert.ok(overlay.render().includes('bootstrapped'));
  });
});
