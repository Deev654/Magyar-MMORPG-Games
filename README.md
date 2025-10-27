# Magyar MMORPG Games

Ez a repó a Magyar MMORPG közösségi játék fejlesztésének kiindulópontja. A projekt célja egy Godot 4 alapú kliens és egy moduláris TypeScript/NestJS szerver létrehozása, megosztott API-szerződésekkel és fejlesztői eszközökkel.

## Könyvtárstruktúra

- `client/` – Godot 4 alapú kliensprojekt.
- `server/` – NestJS alapú backend és szolgáltatások.
- `shared/` – Protocol Buffers definíciók és generált kliens/szerver bindingok.
- `tools/` – fejlesztői segédprogramok, build scriptek, CI konfigurációk.
- `docs/` – architektúra leírások, technológiai döntések, tervezési anyagok.

## Telepítés

1. **Követelmények**
   - Godot Engine 4.2 vagy újabb
   - Node.js 20+ és pnpm
   - Docker és Docker Compose (opcionális, de ajánlott a lokális környezethez)

2. **Repo klónozása**
   ```bash
   git clone https://github.com/<felhasznalo>/Magyar-MMORPG-Games.git
   cd Magyar-MMORPG-Games
   ```

3. **Dependency telepítése**
   ```bash
   pnpm install --filter server...
   pnpm install --filter shared...
   ```

4. **Lokális környezet indítása Dockerrel**
   ```bash
   docker compose up --build
   ```

## Build folyamat

- **Kliens:**
  ```bash
  godot --headless --path client --export-debug "Windows Desktop" build/client/Windows.exe
  ```
- **Szerver:**
  ```bash
  pnpm --filter server build
  pnpm --filter server start
  ```
- **Shared generálás:**
  ```bash
  pnpm --filter shared proto:generate
  ```

## Hozzájárulási irányelvek

1. Forkold a repót, hozz létre feature branchet.
2. Tartsd be a Conventional Commits formátumot (`feat:`, `fix:`, `docs:`, stb.).
3. Futtasd a lintet és a teszteket a PR elküldése előtt.
4. Készíts részletes PR leírást a változtatások összefoglalásával és teszteléssel.

További részletek a [docs/architecture.md](docs/architecture.md) fájlban találhatók.

