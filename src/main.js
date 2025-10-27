import { GameClient } from './framework/game_client.js';
import { PhaserAdapter } from './framework/phaser_adapter.js';
import { NetworkClient } from './network/network_client.js';
import { AuthService } from './network/auth_service.js';
import { StateSynchronizer } from './network/state_synchronizer.js';
import { CharacterModule } from './modules/characters/character_module.js';
import { AnimationModule } from './modules/animations/animation_module.js';
import { UIModule } from './modules/ui/ui_module.js';
import { InventoryModule } from './modules/inventory/inventory_module.js';
import { DebugOverlay } from './tooling/debug_overlay.js';
import { NetworkLogger } from './tooling/network_logger.js';

const phaserAdapter = new PhaserAdapter();
const gameClient = new GameClient({ engine: phaserAdapter });

const networkClient = new NetworkClient();
const authService = new AuthService(networkClient);
const stateSynchronizer = new StateSynchronizer(networkClient);

const characterModule = new CharacterModule();
const animationModule = new AnimationModule();
const uiModule = new UIModule();
const inventoryModule = new InventoryModule();

const debugOverlay = new DebugOverlay();
const networkLogger = new NetworkLogger(networkClient);

// Register core modules with the client
[characterModule, animationModule, uiModule, inventoryModule].forEach((module) =>
  gameClient.registerModule(module)
);

// Attach developer tooling
networkLogger.attach();
gameClient.addOverlay(debugOverlay);

authService.on('authenticated', (session) => {
  console.log('[main] Authenticated as', session.playerId);
  stateSynchronizer.start(characterModule, inventoryModule, uiModule);
});

authService.on('authenticationFailed', (err) => {
  console.error('[main] Authentication failed', err.message);
});

(async () => {
  await gameClient.initialize();
  await networkClient.connect('wss://example.com/game');
  await authService.authenticate({ username: 'hero', password: 'swordfish' });
})();
