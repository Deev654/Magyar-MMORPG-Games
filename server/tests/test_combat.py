"""Teszteli a sebzéskalkulációt."""

import pytest

from mmorpg.combat import CombatStats, calculate_damage


def test_calculate_damage_basic() -> None:
    stats = CombatStats(base=20, multiplier=1.25, defense=5)
    assert calculate_damage(stats) == 20


def test_calculate_damage_never_negative() -> None:
    stats = CombatStats(base=5, multiplier=1.1, defense=50)
    assert calculate_damage(stats) == 0


def test_invalid_values_raise() -> None:
    with pytest.raises(ValueError):
        CombatStats(base=-1, multiplier=1.0)
    with pytest.raises(ValueError):
        CombatStats(base=1, multiplier=0)
    with pytest.raises(ValueError):
        CombatStats(base=1, multiplier=1.0, defense=-3)
