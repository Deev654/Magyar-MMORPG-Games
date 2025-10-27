# Projektarchitektúra és technológiai döntések

## Áttekintés
A Magyar MMORPG játék célja egy modern, moduláris és könnyen bővíthető rendszer létrehozása, amely külön kezeli a kliensoldali élményt, a szerveroldali logikát és a megosztott komponenseket. Az architektúra négy fő alrendszerre épül:

- **`client/`** – a játék kliens alkalmazása, grafikai és felhasználói interakciók.
- **`server/`** – a játék backendje, amely a játékszabályokat, perzisztenciát és skálázást biztosítja.
- **`shared/`** – a kliens és szerver között megosztott API-k, adatmodellek és protokoll definíciók.
- **`tools/`** – fejlesztői eszközök, build scriptek és segédprogramok.

Ez a felosztás biztosítja a tiszta felelősségi köröket, megkönnyíti a csapatmunka szervezését, és lehetővé teszi a modulok független fejlesztését vagy verziózását.

## Technológiai döntések

### Játékmotor: Godot 4
A projekt alapját a Godot 4 játékmotor adja, amelyet az alábbi szempontok alapján választottunk:

1. **Nyílt forráskódú és szabadon használható** – könnyen testre szabható, jogdíjmentes felhasználással.
2. **GDScript és C# támogatás** – lehetővé teszi a gyors prototípus-készítést, miközben kritikus részekhez teljesítményorientált nyelvek is rendelkezésre állnak.
3. **Beépített hálózati funkciók** – a Godot magas szintű replikációs és RPC eszközei segítik az MMORPG jellegű rendszerek fejlesztését.
4. **Erős közösség és dokumentáció** – könnyen hozzáférhető példák, pluginok és támogatás.
5. **Platformfüggetlen build** – PC, mobil és web export opciók, ami a magyar játékosközösség széles elérését teszi lehetővé.

### Szerveroldal
- **Nyelv és keretrendszer:** Node.js + TypeScript + NestJS a moduláris szerverarchitektúrához és a skálázható REST/WebSocket endpointokhoz.
- **Adatbázis:** PostgreSQL a robusztus tranzakciókezelés és a földrajzi replikáció támogatása miatt.
- **Üzenetkezelés:** Redis Streams a valós idejű eseményfeldolgozáshoz és skálázható játékszoba-kezeléshez.

### Közös API réteg
- **Protokoll:** gRPC + Protocol Buffers a gépileg generált kliens-szerver bindingokhoz és típusbiztonsághoz.
- **Verziókezelés:** Monorepo strukturában versionált `.proto` fájlok, CI-val ellenőrzött kompatibilitás.

### Eszközlánc és fejlesztői workflow
- **Build és csomagkezelés:** `pnpm` a Node.js alapú projektekhez, `godot` CLI export a klienshez.
- **CI/CD:** GitHub Actions pipeline linteléshez, teszteléshez, automatikus buildhez.
- **Minőségbiztosítás:** ESLint, Prettier, és Jest a szerveroldali és közös modulokhoz; GUT (Godot Unit Test) a klienshez.
- **Konténerizáció:** Docker Compose a fejlesztői környezet összállításához, külön szolgáltatás definíciókkal a szerver, adatbázis és segédkomponensek számára.

## További lépések
- Architektúra diagramok és sequence diagramok hozzáadása a `docs/` könyvtárhoz.
- Részletes modul-specifikációk és API-szerződések kidolgozása a `shared/` mappában.
- Infrastrukturális terv elkészítése (deployment, monitoring, logging).

