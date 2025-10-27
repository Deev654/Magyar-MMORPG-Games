# Quest & Event Scripting System

## 1. Objectives
- Empower narrative designers to author quests without engine rebuilds.
- Provide deterministic server-authoritative execution with client mirroring.
- Integrate deeply with ECS events and data-driven content.

## 2. Architecture Overview
- **Script Language:** Domain-specific language (DSL) compiled to bytecode. Syntax inspired by YAML + embedded expressions.
- **Runtime:** Stack-based virtual machine running on server; optional client sandbox for prediction.
- **Asset Pipeline:** Scripts stored under `data/scripts/{region}/{quest}.qs`. Build step validates against schemas and outputs bytecode caches.

## 3. Script Execution Model
1. Script registered with `QuestSystem` via `QuestBlueprint` referencing script asset.
2. When triggered, VM instantiates `ScriptContext` containing:
   - Bound entities (`actor`, `target`, `environment`).
   - Persistent variables (quest state, counters).
   - Access to services (dialogue, combat, rewards).
3. VM processes events in discrete ticks; blocking operations yield until conditions met.
4. Scripts may spawn child coroutines for parallel objectives.

## 4. Event API
Scripts listen and emit events via `EventBus`. Core events:
- `OnQuestAccepted(actorId, questId)`
- `OnObjectiveProgress(actorId, questId, objectiveId, delta)`
- `OnDialogueChoice(actorId, nodeId, optionId)`
- `OnEntityKilled(killerId, victimId, tags)`
- `OnItemCollected(actorId, itemId, quantity)`
- `OnLocationEntered(actorId, zoneId)`
- `OnTimerElapsed(contextId, timerId)`

Scripts can emit:
- `EmitObjectiveUpdate(objectiveId, progress)`
- `EmitQuestState(state)` (e.g., `Active`, `Completed`, `Failed`)
- `EmitReward(grantId, actorId)`
- `EmitWorldEvent(eventId, payload)`

## 5. DSL Syntax Highlights
```yaml
quest "Song of the Táltos" {
  on_accept {
    call dialogue.start(actor, "intro_dialogue")
    call objective.activate("gather_herbs")
  }

  objective "gather_herbs" {
    require item.collected("moon-herb", 5)
    on_complete {
      call spawn.npc("forest_spirit", location: "grove")
    }
  }

  objective "defeat_spirit" {
    require entity.defeated(tag: "forest_spirit")
    on_complete {
      call reward.grant(actor, "spirit_charm")
      call quest.complete()
    }
  }
}
```

## 6. API Surface
### 6.1 Services Available
- `dialogue.start(entityRef, nodeId)`
- `objective.activate(objectiveId)` / `objective.update(objectiveId, progress)` / `objective.complete(objectiveId)`
- `item.grant(entityRef, itemId, quantity)` / `item.consume(...)`
- `entity.spawn(blueprintId, location)` / `entity.despawn(entityRef)`
- `reward.grant(entityRef, rewardTableId)`
- `world.trigger(eventId, payload)`
- `timer.start(duration, callbackId)` / `timer.cancel(callbackId)`

### 6.2 Context Accessors
- `ctx.actor`, `ctx.partyMembers`, `ctx.faction`
- `ctx.variables` (key-value store persisted per player)
- `ctx.flags` (bitset for quick conditional checks)

## 7. Debugging & Tooling
- Script debugger with breakpoints, step-through, and variable inspection.
- Automated tests run sample scripts in headless mode verifying state transitions.
- Hot-reload supported via incremental compilation.

## 8. Security & Stability
- Sandbox restricts file IO, network, and long loops (tick budget).
- Permission model ensures only authorized scripts can modify certain world states.
