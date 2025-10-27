# Kiadási folyamat és verziókezelési stratégia

Ez a dokumentum írja le, hogyan készítjük elő és publikáljuk a Magyar MMORPG Games projekt kiadásait.

## Verziózás

- **Szemantikus verziózás (SemVer)**: `MAJOR.MINOR.PATCH`
  - **MAJOR**: inkompatibilis API változás vagy jelentős gameplay módosítás.
  - **MINOR**: kompatibilis funkcióbővítés.
  - **PATCH**: hibajavítások, dokumentáció frissítések.
- A `main` branch mindig a legfrissebb stabil állapotot tükrözi.
- Aktív fejlesztés `feature/*` vagy `fix/*` brancheken történik.

## Kiadási ágak

- A kiadáshoz `release/x.y.z` branch-et hozunk létre.
- A branch stabilizálására csak kritikus bugfixek és dokumentációs frissítések kerülhetnek.
- A kiadás lezárása után a branch-et merge-öljük `main`-be és `develop`-be (ha létezik), majd tageljük.

## Kiadás előkészítése

1. **Release planning**: a Discordon és a GitHub Discussions-ön egyeztetjük a kiadás tartalmát.
2. **Kiadási jegyzet**: nyiss egy `Release` típusú issue-t, amely felsorolja a fő funkciókat, hibajavításokat és ismert problémákat.
3. **Automatizált ellenőrzések**: győződj meg róla, hogy a GitHub Actions CI minden lépése zöld.
4. **Kód fagyasztás**: a `release/x.y.z` branch létrejötte után új feature nem merge-elhető.

## Kiadás lépései

1. Frissítsd a verziószámot a kliens (`client/package.json`) és szerver (`server/pyproject.toml`, `server/src/mmorpg/__init__.py`) fájlokban.
2. Futtasd a teljes ellenőrzési sort helyben vagy a CI-ban (lint, format-check, test, build).
3. Készítsd el a kiadási megjegyzéseket a `CHANGELOG.md`-ben vagy a release issue-ban.
4. Merge-eld a `release/x.y.z` branchet `main`-be pull requesttel.
5. Hozz létre Git tag-et: `git tag -s vX.Y.Z -m "Release vX.Y.Z"` és pushold fel (`git push origin vX.Y.Z`).
6. Publikáld a GitHub Release-t, csatolva a release note-ot és releváns asseteket (build artifaktok, kliens preview).

## Hotfix folyamat

- Kritikus hibák esetén hozz létre `hotfix/x.y.z+1` branchet a `main`-ről.
- Készíts pull requestet `main`-be, majd merge után backportold a változtatást a `develop` és aktuális `release` branch-ekbe.

## Release utáni teendők

- Kommunikáld a Discord #announcements csatornán és a fórumban.
- Frissítsd a projekt státuszát és roadmapjét.
- Gyűjts visszajelzést a következő iterációhoz.
