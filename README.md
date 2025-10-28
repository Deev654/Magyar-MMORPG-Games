# Magyar MMORPG Launcher

Ez a projekt egy egyszerű indító alkalmazás a Magyar MMORPG játékhoz. A grafikus felület Python és Tkinter segítségével készült, és lehetőséget ad új felhasználók regisztrációjára, bejelentkezésre, majd a játék indítására.

## Funkciók
- Regisztráció új fiókkal, jelszó-ellenőrzéssel
- Bejelentkezés meglévő fiókkal
- "Játék indítása" gomb, ami csak sikeres bejelentkezés után aktiválódik
- A felhasználói adatok egyszerű, SHA-256 hash-elt formában a `launcher/users.json` fájlban tárolódnak

## Futatás fejlesztői környezetben
1. Győződj meg róla, hogy Python 3.10 vagy újabb verzió telepítve van.
2. Indítsd el a programot:
   ```bash
   python launcher/main.py
   ```

## Windows-os futtatható (MMORPG.exe) készítése
1. Telepítsd a `pyinstaller` csomagot:
   ```bash
   pip install pyinstaller
   ```
2. Hozd létre az indító EXE-t:
   ```bash
   pyinstaller --noconfirm --onefile --noconsole launcher/main.py
   ```
3. A kész `MMORPG.exe` fájlt a `dist` mappában találod. Ne felejtsd el a `launcher/users.json` fájlt is mellékelni, hogy a regisztrált fiókok elérhetőek maradjanak.

## Fejlesztés
- A felhasználói adatbázis alapértelmezetten üres. A regisztráció létrehozza a szükséges `users.json` fájlt.
- A "Játék indítása" gomb jelenleg információs üzenetet jelenít meg. Itt lehet összekötni a valódi kliens indításával.

