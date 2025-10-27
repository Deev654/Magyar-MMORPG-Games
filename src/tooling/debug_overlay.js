export class DebugOverlay {
  constructor() {
    this.metrics = new Map();
    this.engine = null;
  }

  attach(engine) {
    this.engine = engine;
    engine.on?.('bootstrapped', () => this.trackMetric('bootstrapped', Date.now()));
    engine.on?.('started', () => this.trackMetric('started', Date.now()));
  }

  trackMetric(key, value) {
    this.metrics.set(key, value);
  }

  render() {
    const entries = Array.from(this.metrics.entries()).map(
      ([key, value]) => `${key}: ${value}`
    );
    return entries.join('\n');
  }
}
