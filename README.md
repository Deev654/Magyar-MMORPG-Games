# Magyar-MMORPG-Games

Ez a repó egy nyílt forráskódú magyar MMORPG-projekt kezdőpontja. A részletes tervek és implementációk még kidolgozás alatt állnak.

## Indító használata

A projekt tartalmaz egy egyszerű `game_launcher.py` indítót, amely később a kliens és a szerver komponensek elindításáért felel majd. Jelenleg bemutatja, hogy mely modulok vannak tervezés alatt.

```bash
python3 game_launcher.py            # Áttekintés megjelenítése
python3 game_launcher.py --mode client  # Kliens indításának helyőrzője
python3 game_launcher.py --mode server  # Szerver indításának helyőrzője
```

A jövőbeni fejlesztések során a `--mode` kapcsolóhoz tartozó logikát bővíteni kell a tényleges indítási folyamatokkal.
