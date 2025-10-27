"""Küzdelemhez kapcsolódó segédfüggvények."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class CombatStats:
  """A sebzéskalkulációhoz szükséges adatok."""

  base: int
  multiplier: float
  defense: int = 0

  def __post_init__(self) -> None:
    if self.base < 0:
      msg = "Az alapsebzés nem lehet negatív."
      raise ValueError(msg)
    if self.multiplier <= 0:
      msg = "A szorzónak pozitívnak kell lennie."
      raise ValueError(msg)
    if self.defense < 0:
      msg = "A védelem nem lehet negatív."
      raise ValueError(msg)


def calculate_damage(stats: CombatStats) -> int:
  """Egyszerű sebzéskalkuláció.

  A sebzés a base és multiplier szorzata, amiből levonásra kerül a defense.
  Az eredményt sosem engedjük 0 alá csökkenni.
  """

  raw_damage = stats.base * stats.multiplier - stats.defense
  return max(0, round(raw_damage))
