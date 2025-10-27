import { EventBus } from '../common/event_bus.js';

export class UIModule {
  constructor() {
    this.id = 'ui';
    this.eventBus = new EventBus();
    this.widgets = new Map();
  }

  onRegister(engine) {
    this.engine = engine;
  }

  createWidget(id, config) {
    this.widgets.set(id, { id, ...config });
    this.eventBus.emitEvent('widgetCreated', { id, config });
  }

  updateWidget(id, patch) {
    const widget = this.widgets.get(id);
    if (!widget) return;
    Object.assign(widget, patch);
    this.eventBus.emitEvent('widgetUpdated', { id, patch });
  }

  onState(state) {
    if (!state.ui) return;
    Object.entries(state.ui).forEach(([id, config]) => {
      if (!this.widgets.has(id)) {
        this.createWidget(id, config);
        return;
      }
      this.updateWidget(id, config);
    });
  }
}
