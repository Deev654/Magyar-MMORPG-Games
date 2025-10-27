# Magyar MMORPG Games

Magyar MMORPG Games egy közösségi kezdeményezés, amelynek célja egy nyílt forráskódú MMORPG játék és az ahhoz kapcsolódó eszköztár felépítése. Ez a repó tartalmazza a játék kliensének, szerverének és támogató dokumentációjának alapjait.

## Projekt áttekintés

- **Kliens**: TypeScript-alapú kliensoldali modul, amely a játék kliensének alapját képezi.
- **Szerver**: Python-alapú back-end komponensek, amelyek a játék logikájáért felelnek.
- **Dokumentáció**: Irányelvek a hozzájáruláshoz, a kódstílushoz és a kiadási folyamathoz.

## Fejlesztői beállítás

### Kliens
1. Telepítsd a Node.js 18.x vagy újabb verzióját.
2. Futtasd a `npm install` parancsot a `client` könyvtárban.
3. A fejlesztői parancsok:
   - `npm run build`: Típus-ellenőrzés a TypeScript fordítóval.
   - `npm run lint`: ESLint ellenőrzés.
   - `npm run format:check`: Prettier formázás-ellenőrzés.
   - `npm test`: Vitest alapú egységtesztek.

### Szerver
1. Telepítsd a Python 3.11 vagy újabb verzióját.
2. Hozz létre és aktiválj egy virtuális környezetet.
3. Telepítsd a függőségeket: `pip install -r server/requirements-dev.txt`.
4. Fejlesztői parancsok:
   - `make -C server lint`: Ruff statikus analízis.
   - `make -C server format-check`: Black formázás-ellenőrzés.
   - `make -C server test`: Pytest tesztek futtatása.

## CI/CD

A GitHub Actions workflow automatikusan futtatja a build, lint és teszt lépéseket a kliens és a szerver komponenseken minden push és pull request esetén. A részleteket lásd a [`.github/workflows/ci.yml`](.github/workflows/ci.yml) fájlban.

## Kiadási stratégia

A kiadási folyamat és a verziókezelési stratégia részletesen a [docs/release-process.md](docs/release-process.md) dokumentumban található.

## Governance és kommunikáció

A projekt irányítási modelljét és a hivatalos kommunikációs csatornákat a [docs/governance.md](docs/governance.md) fájl ismerteti.

## Hozzájárulás

Kérjük, olvasd el a [CONTRIBUTING.md](CONTRIBUTING.md) dokumentumot, mielőtt pull requestet nyújtasz be vagy issue-t nyitsz.

## Licenc

A projekt licencelése később kerül meghatározásra.
