# Magyar MMORPG Client Prototype

Ez a repó egy könnyűsúlyú MMORPG kliens-prototípus, amely moduláris architektúrát, alap hálózati réteget és fejlesztői toolingot demonstrál.

## Felépítés

- `src/framework`: egyszerű adapter egy Phaser-szerű motorhoz és a `GameClient` koordinátorhoz.
- `src/network`: kapcsolatkezelés, hitelesítés és állapot-szinkronizáció.
- `src/modules`: karakter, animáció, UI és inventory modulok egységes eseménybuszra építve.
- `src/tooling`: debug overlay és hálózati naplózó.
- `tests`: Node.js built-in testrunnerrel írt smoke tesztek.

## Futatás

```bash
npm install # opcionális, a példa nem használ külső függőséget
npm start
```

## Tesztelés

```bash
npm test
```

A teszt egy beépített stub motort használ, így motor telepítése nélkül is futtatható.
