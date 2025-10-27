# Entity-Component Architecture

## 1. Design Goals
- **Flexibility:** Support rapid addition of new creature types, interactive objects, and UI widgets without altering core systems.
- **Scalability:** Partition entities across server shards and client prediction layers.
- **Data-Driven Authoring:** Components defined by configuration enabling live tuning.

## 2. Entity Structure
- Entities are lightweight identifiers (UUIDs) with no inherent data.
- Metadata stored in the **Registry**: `EntityId -> {ComponentSet, Tags, OwnershipShard}`.
- Entities categorized into layers: `World`, `Instance`, `UI`, `SimulationGhost`.

## 3. Component Model
- Components are plain data structs serialized via binary and JSON schemas.
- Each component versioned with semantic version numbers for live patches.
- Components grouped by domains:
  - **Transform:** position, rotation, scale, movement mode.
  - **Stats:** health, stamina, focus, resistances.
  - **Abilities:** available skills, cooldown trackers, glyph deck.
  - **Inventory:** equipment slots, bag references, crafting materials.
  - **AI Brain:** behavior tree reference, current state, blackboard keys.
  - **QuestState:** active quests, progress flags, dialogue history.
  - **Faction:** reputation values, allegiances, hostility flags.
  - **NetSync:** replication settings, interest management radius.
  - **ScriptHooks:** event subscriptions and exported variables.

## 4. Systems
Each system iterates over specific component combinations:
- **MovementSystem:** `(Transform, Stats)`; handles physics, mount interactions.
- **CombatSystem:** `(Transform, Stats, Abilities)`; resolves attacks, glyphs, damage formulas.
- **InventorySystem:** `(Inventory)`; validates trades, crafting ingredient consumption.
- **QuestSystem:** `(QuestState, ScriptHooks)`; updates quest states via scripting signals.
- **FactionSystem:** `(Faction, Stats)`; applies reputation modifiers, PvP flagging.
- **NetSyncSystem:** `(NetSync, Transform, Stats)`; packages state updates per interest groups.
- **AIControllerSystem:** `(AI Brain, Transform, Stats)`; executes behavior trees.

Systems communicate through an event bus with deterministic ordering per tick: Input -> AI -> Simulation -> Scripting -> Networking -> Cleanup.

## 5. Lifecycle
1. **Creation:** Entities spawned via blueprints specifying component templates.
2. **Initialization:** System-specific listeners populate runtime caches.
3. **Update:** Systems run at fixed tick rate (30 Hz server, interpolated client).
4. **Destruction:** Components deregister from systems; deferred removal to maintain consistency within a tick.

## 6. Data Flow & Tooling
- Component definitions stored in `data/components/*.yaml` with schema validation.
- Hot-reload pipeline monitors definitions and updates running instances.
- Editor surfaces component composition via drag-and-drop; scripting API exposes `EntityRef` for runtime manipulation.

## 7. Alternative Model Consideration
If ECS is unsuitable for a subsystem (e.g., UI), adopt **Model-View-Presenter** with ECS proxies bridging gameplay state to UI widgets.
