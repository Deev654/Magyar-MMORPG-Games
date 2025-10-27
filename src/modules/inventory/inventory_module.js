import { EventBus } from '../common/event_bus.js';

export class InventoryModule {
  constructor() {
    this.id = 'inventory';
    this.eventBus = new EventBus();
    this.items = [];
  }

  onRegister(engine) {
    this.engine = engine;
  }

  setItems(items) {
    this.items = [...items];
    this.eventBus.emitEvent('inventoryUpdated', this.items);
  }

  addItem(item) {
    this.items.push(item);
    this.eventBus.emitEvent('itemAdded', item);
  }

  removeItem(itemId) {
    const index = this.items.findIndex((item) => item.id === itemId);
    if (index === -1) return;
    const [removed] = this.items.splice(index, 1);
    this.eventBus.emitEvent('itemRemoved', removed);
  }

  onState(state) {
    if (!state.inventory) return;
    this.setItems(state.inventory);
  }
}
