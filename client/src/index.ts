export interface DamageCalculationInput {
  base: number;
  multiplier: number;
}

export function calculateClientDamage({ base, multiplier }: DamageCalculationInput): number {
  if (base < 0) {
    throw new Error('Base damage nem lehet negatív.');
  }

  const scaled = base * multiplier;
  return Math.round(Math.max(0, scaled));
}
