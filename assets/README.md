# Statische Ressourcen

Dieser Ordner ist die führende Quelle für statische, markenübergreifend
verwendbare Projektressourcen.

| Bereich | Inhalt |
|---|---|
| `logo/` | produktiv eingesetzte Logo-Dateien |
| `design/` | Fotografie und weitere Gestaltungsressourcen |
| `screenshots/` | freigegebene Referenz- und Prüfansichten |

Die Referenzimplementierung unter `src/` bindet Logo und Fotografie über
relative symbolische Verknüpfungen ein. Dadurch existiert jede Binärdatei nur
einmal im Repository.
