# Hozzájárulási irányelvek

Köszönjük, hogy hozzájárulnál a Magyar MMORPG Games projekthez! A következő útmutató segít abban, hogy a folyamat zökkenőmentes legyen minden résztvevő számára.

## Előfeltételek

- Node.js 18.x (kliens fejlesztéshez)
- Python 3.11 (szerver fejlesztéshez)
- Git és GitHub-fiók

## Kommunikáció

- **Discord**: [discord.gg/magyar-mmorpg](https://discord.gg/magyar-mmorpg) – valós idejű egyeztetésekhez.
- **Fórum**: [GitHub Discussions](https://github.com/Magyar-MMORPG-Games/.github/discussions) – hosszabb távú megbeszélésekhez, döntések dokumentálásához.
- **Heti státusz**: A Discord szerveren minden hétfőn aszinkron státuszfrissítő szálat indítunk.

Mielőtt új feature vagy változtatás mellett döntünk, egyeztessünk a megfelelő csatornán.

## Issue-k és pull requestek

1. Nézd meg az [issue sablonokat](.github/ISSUE_TEMPLATE) és válaszd ki a megfelelőt.
2. Ha új feature-t javasolsz, előbb nyiss egy discussziót, majd egy `feature request` issue-t.
3. Kisebb hibák esetén elegendő a `bug report` issue.
4. Pull request esetén hivatkozz a kapcsolódó issue-ra, és tartsd be az alábbi commit/PR szabályokat:
   - Használj beszédes commit üzeneteket.
   - PR leírásban foglald össze a főbb változtatásokat és a teszteredményeket.

## Fejlesztői workflow

1. Forkold a repót és hozd létre a fejlesztői branch-et (`feat/`, `fix/`, `docs/` prefix javasolt).
2. Tartsd naprakészen a branch-ed a `main`-nel.
3. Futtasd a helyi ellenőrzéseket, mielőtt PR-t küldesz:

### Kliens
```bash
cd client
npm install
npm run lint
npm run format:check
npm test
```

### Szerver
```bash
cd server
python -m pip install -r requirements-dev.txt
python -m pip install -e .
make lint
make format-check
make test
```

## Kódstílus

- **TypeScript**: ESLint + Prettier szabályok. Ne keverj `any` típusokat; preferáld a típusdefiníciókat.
- **Python**: Black formázás, Ruff lint. Használj típusannotációkat és dokumentáld a központi függvényeket.

## Review folyamat

- Legalább egy core maintainer jóváhagyása szükséges.
- A PR-nek zöld CI eredménnyel kell rendelkeznie.
- Ha változásod új döntést vagy irányelvet vezet be, frissítsd a releváns dokumentációt (pl. governance, release process).

## Biztonsági jelentések

Biztonsági hibát a `security@magyar-mmorpg.hu` címre jelezz, ne publikus issue-ban.

Köszönjük a közreműködésed!
