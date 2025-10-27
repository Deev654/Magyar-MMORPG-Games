# Item & Crafting System Design

## 1. Philosophy
- Reward exploration and collaboration by tying best recipes to regional discoveries and social hubs.
- Ensure balance via stat budgets and rarity tiers validated automatically.
- Provide extensible framework for live updates without code changes.

## 2. Data-Driven Configuration
- Items stored in `data/items/*.json` following schema:
```json
{
  "id": "herb_moon",
  "name": "Moon Herb",
  "category": "Herbalism",
  "rarity": "Uncommon",
  "itemLevel": 10,
  "stats": {"focus": 4},
  "effects": ["status:night_vision"],
  "tags": ["ingredient", "alchemy"],
  "sockets": {"glyph": 0},
  "binding": "OnPickup"
}
```
- Crafting recipes defined in `data/recipes/*.json`:
```json
{
  "id": "potion_moonlight",
  "profession": "Alchemy",
  "tier": 2,
  "inputs": [
    {"itemId": "herb_moon", "quantity": 3},
    {"itemId": "essence_lunar", "quantity": 1}
  ],
  "outputs": [
    {"itemId": "potion_moonlight", "quantity": 1}
  ],
  "craftingTime": 20,
  "station": "cauldron_tier2",
  "requiresTrait": "HerbalScholar",
  "successRates": {
    "base": 0.92,
    "crits": [
      {"chance": 0.05, "reward": {"itemId": "potion_moonlight_superior", "quantity": 1}}
    ]
  }
}
```

## 3. Item Categories
- **Weapons:** swords, bows, fokos, enchanted instruments.
- **Armor:** light (roving), medium (hussar), heavy (bastion).
- **Trinkets:** talismans, runic charms, bardic notes.
- **Consumables:** food, potions, sigils.
- **Resources:** raw materials, essences, runestones.
- **Housing:** décor, functional stations, blueprints.

## 4. Crafting Professions
| Profession | Focus | Stations |
|------------|-------|----------|
| Alchemy | Potions, poisons, tinctures | Cauldrons, alchemy tables |
| Smithing | Weapons, armor, tools | Forges, anvils |
| Runecrafting | Glyphs, enchantments | Rune altars |
| Weaving | Clothing, banners, tents | Looms |
| Cooking | Meals, feasts | Hearths |
| Carpentry | Housing items, siege engines | Workshops |

## 5. Progression
- Professions level via experience earned per craft (XP = base value * difficulty modifier).
- Unlock recipes through faction vendors, world drops, and research mini-games.
- Mastery tiers grant passive bonuses (reduced material cost, faster crafting).

## 6. Crafting Gameplay Loop
1. Acquire recipe blueprint (drops, vendors, research).
2. Gather ingredients via harvesting, dungeons, trading.
3. Travel to required station tier (guild hall upgrades provide higher tiers).
4. Engage crafting minigame (timed glyph alignment) to influence success/crit.
5. Receive item, XP, and potential byproducts.

## 7. Item Progression Mechanics
- **Infusion:** Items gain extra stat budgets using rare essences; requires player level and reputation thresholds.
- **Socketing:** Glyph sockets accept runes granting conditional bonuses.
- **Attunement:** Bind gear to faction shrines unlocking unique traits.

## 8. Economy Integration
- Recipes tagged with supply/demand metadata enabling dynamic vendor pricing.
- Marketplace analytics highlight resource shortages encouraging players to craft specific goods.
- Crafting orders board allows asynchronous commission fulfillment.

## 9. Validation & Balancing
- Automated validator checks:
  - Stat budget vs. rarity guidelines.
  - Recipe inputs availability and profession alignment.
  - Circular dependencies in recipes.
- Simulation harness runs economic models to ensure price stability.

## 10. Extensibility
- Live-ops can introduce new recipe packs by dropping JSON in `data/recipes/events/` with start/end dates.
- Localization extracted via string keys referencing translation database.
