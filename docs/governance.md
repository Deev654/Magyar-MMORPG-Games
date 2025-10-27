# Governance modell és kommunikációs csatornák

Ez a dokumentum határozza meg a projekt működésének irányítási modelljét és a hivatalos kommunikációs csatornákat.

## Szerepkörök

- **Core maintainerek**: stratégiai irány, release döntések, roadmap karbantartása. Legalább két maintainer jóváhagyása szükséges kritikus változtatásokhoz.
- **Module ownerek**: felelősek egy adott komponens (kliens, szerver, tooling) technikai minőségéért.
- **Közösségi hozzájárulók**: issue-kat, PR-okat és visszajelzéseket nyújtanak.

## Döntéshozatal

1. **RFC folyamat**: nagyobb architekturális döntésekhez RFC dokumentum szükséges (`docs/rfcs/` mappában), amelyet a Discord #rfc csatornában vitatunk meg.
2. **Szavazás**: ha konszenzus nem alakul ki, egyszerű többségi szavazással döntünk a core maintainerek között.
3. **Átláthatóság**: minden döntés összefoglalóját közzétesszük a GitHub Discussions "Announcements" kategóriájában.

## Kommunikációs csatornák

| Csatorna | Cél | Link |
| --- | --- | --- |
| Discord #general | Napi szintű kommunikáció | https://discord.gg/magyar-mmorpg |
| Discord #announcements | Release-ek, fontos hírek | https://discord.gg/magyar-mmorpg |
| Discord #rfc | Technikai tervezés, RFC-k | https://discord.gg/magyar-mmorpg |
| GitHub Discussions | Hosszabb távú megbeszélések | https://github.com/Magyar-MMORPG-Games/.github/discussions |
| Nyilvános fórum | Közösségi visszajelzések (HU) | https://forum.magyar-mmorpg.hu |

## Meetingek

- **Kétheti koordinációs hívás**: minden második szerdán 18:00-kor Discord voice-on.
- **Nyílt közösségi AMA**: negyedévente egyszer a fórumban.

## Konfliktuskezelés

- A közösségi irányelvek megsértése esetén a core maintainerek moderációs döntést hoznak.
- Súlyos esetben ideiglenes vagy végleges kitiltás a kommunikációs csatornákról.

## Dokumentum karbantartása

- Minden negyedévben felülvizsgáljuk a governance dokumentumot.
- Módosításokat PR-on keresztül kell javasolni, a core maintainerek jóváhagyásával.
