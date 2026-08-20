# s-bac.de

Öffentliche Referenzimplementierung und ausgewählte Dokumentation des persönlichen Fachportals von Sascha Bachmeier.

## Inhalte

- statische Website unter `src/` und `content/pages/`
- Fachartikel unter `content/fachwissen/`
- Designsystem und öffentliche Assets
- reproduzierbarer Build und statische Validierung
- ausgewählte Architekturentscheidungen und technische Dokumentation

## Build

```sh
npm run build
```

Der auslieferbare Stand wird unter `dist/` erzeugt.

Für die nicht zu indexierende Entwicklungsumgebung:

```sh
npm run build:dev
```

## Prüfung

```sh
npm test
```

## Umgebungen

- Entwicklung: https://dev.s-bac.de
- Produktion: https://www.s-bac.de

Das öffentliche Repository enthält bewusst keine Zugangsdaten, Sicherungen, Hosting-Exporte oder interne redaktionelle Zwischenstände.
