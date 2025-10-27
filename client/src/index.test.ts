import { describe, expect, it } from 'vitest';
import { calculateClientDamage } from './index.js';

describe('calculateClientDamage', () => {
  it('kiszámolja a sebzést pozitív értékekre', () => {
    expect(
      calculateClientDamage({
        base: 10,
        multiplier: 1.5,
      }),
    ).toBe(15);
  });

  it('negatív eredményt nullára kerekít', () => {
    expect(
      calculateClientDamage({
        base: 10,
        multiplier: -0.6,
      }),
    ).toBe(0);
  });
});
