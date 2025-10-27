# Worldbuilding & Validation Tools

## 1. Goals
- Enable designers to author expansive zones with cultural authenticity.
- Provide rapid iteration cycles through live previews and automated checks.
- Maintain data integrity for scripts, items, and world entities.

## 2. Tool Suite Overview
1. **Territory Editor (TE):** Desktop application for terrain sculpting, biome painting, and point-of-interest placement.
2. **Settlement Builder (SB):** Modular layout tool for towns, dungeons, and instanced content.
3. **Content Validator (CV):** Automated pipeline verifying data assets before deployment.
4. **Playtest Launcher (PL):** Spins up local shards with selected content packs.

## 3. Territory Editor Features
- Heightmap sculpting with erosion and river generation tuned for Carpathian Basin landscapes.
- Biome layers referencing `data/biomes/*.yaml` controlling vegetation, weather, ambient audio.
- Placement tools for ECS blueprints (creatures, resource nodes, NPC hubs).
- Pathing visualization for mount routes, NPC patrols, and event triggers.
- Integration with photogrammetry assets for landmarks (e.g., Vajdahunyad Castle).

## 4. Settlement Builder Features
- Grid and spline-based placement for buildings and walls.
- Procedural interior generator using tile sets defined in `data/tilesets/*.json`.
- Encounter designer linking spawn tables to areas.
- Lighting and day/night presets with preview.
- Export to `data/maps/{zone}/{version}/` including navmesh and occlusion data.

## 5. Content Validator Pipeline
- Runs as CI job or local command `tools/validate_content.py`.
- Steps:
  1. Schema validation for items, recipes, components, scripts.
  2. Graph analysis for quest dependencies ensuring no dead-ends.
  3. Balance checks for combat stats and loot tables.
  4. Localization coverage ensuring all string keys have translations.
  5. Build packaging verifying asset references exist.
- Outputs HTML and JSON reports stored under `reports/`.

## 6. Playtest Launcher
- Command-line tool `tools/playtest_launcher`.
- Features: content pack selection, shard topology configuration, telemetry toggles.
- Supports snapshotting player progress for targeted tests.

## 7. Collaboration & Version Control
- All tool outputs stored in Git LFS with metadata summarizing changes.
- Designer annotations saved as sidecar files enabling review workflows.
- Integration with task tracking for change requests.

## 8. Automation & Live Ops
- Nightly builds auto-run validators, generate metrics dashboard.
- Live ops use deployment templates to push curated content packs to seasonal servers.

## 9. Extensibility
- Plugin system for TE/SB allowing community-contributed modules.
- Scripting API enabling procedural generation macros.

## 10. Training & Documentation
- Interactive tutorials inside tools.
- Knowledge base with video walkthroughs and best practices for representing Hungarian heritage respectfully.
