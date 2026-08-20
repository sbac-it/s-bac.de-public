# Deployment

**Projekt:** s-bac.de  
**Dokument:** 11_Deployment.md  
**Version:** 1.0  
**Status:** Freigegeben  
**Autor:** Sascha Bachmeier  
**Erstellt:** 2026-07-24  
**Letzte Änderung:** 2026-07-24  
**Gültig ab:** 2026-07-24  
**Nächste Review:** 2027-01-24

---

# 1. Zweck

Dieses Dokument beschreibt den Prozess zur Veröffentlichung neuer Inhalte und technischer Änderungen für s-bac.de.

Es stellt sicher, dass Deployments reproduzierbar, nachvollziehbar und mit möglichst geringem Risiko durchgeführt werden.

---

# 2. Deployment-Ziele

Der Deployment-Prozess verfolgt folgende Ziele:

- sichere Veröffentlichung
- reproduzierbare Abläufe
- minimale Ausfallzeiten
- vollständige Nachvollziehbarkeit
- einfache Rollback-Möglichkeiten
- konsistente Qualität

---

# 3. Grundprinzipien

Für jedes Deployment gelten folgende Grundsätze:

- Dokumentation vor Veröffentlichung
- erfolgreicher Funktionstest
- Review vor Deployment
- Versionsverwaltung über Git
- Veröffentlichung erst nach erfolgreicher Prüfung

Deployments erfolgen kontrolliert und nachvollziehbar.

---

# 4. Deployment-Architektur

Der Veröffentlichungsprozess besteht aus mehreren Stufen.

```text
Dokumentation
        ↓
Lokale Entwicklung
        ↓
Review
        ↓
Git Commit
        ↓
Git Push
        ↓
Statischer Build und Validierung
        ↓
dev.s-bac.de
        ↓
Freigabe
        ↓
s-bac.de
```

Jede Stufe besitzt definierte Ein- und Ausgangskriterien.

---

# 5. Deployment-Prozess

Jede Veröffentlichung folgt einem standardisierten Ablauf.

## Phase 1 – Planung

Vor Beginn der Umsetzung werden folgende Punkte geprüft:

- Ziel der Änderung
- betroffene Komponenten
- Auswirkungen auf bestehende Funktionen
- notwendige Dokumentationsanpassungen

---

## Phase 2 – Umsetzung

Die Änderungen werden lokal entwickelt und getestet.

Während dieser Phase gelten folgende Anforderungen:

- nachvollziehbare Commits
- saubere Projektstruktur
- Einhaltung der Architekturvorgaben
- Aktualisierung der Dokumentation

---

## Phase 3 – Review

Vor der Veröffentlichung erfolgt ein Review.

Geprüft werden insbesondere:

- Funktion
- Darstellung
- Konsistenz
- Dokumentation
- Performance

Erst nach erfolgreichem Review wird das Deployment vorbereitet.

---

## Phase 4 – Veröffentlichung

Aus dem freigegebenen Git-Stand wird ein statischer Build erzeugt und validiert. Dieser wird zunächst auf `dev.s-bac.de` veröffentlicht und geprüft. Anschließend wird derselbe nachvollziehbare Stand auf `s-bac.de` im netcup-Webhosting bereitgestellt.

Nach der Veröffentlichung werden folgende Punkte überprüft:

- Erreichbarkeit
- Navigation
- Darstellung
- Formulare
- Downloads
- interne Verlinkungen

---

# 6. Rollback-Strategie

Sollte nach einem Deployment ein kritischer Fehler auftreten, wird auf den letzten bekannten stabilen Stand zurückgekehrt.

Die Rollback-Strategie umfasst:

- Analyse des Fehlers
- Wiederherstellung des vorherigen Stands
- Dokumentation der Ursache
- Planung einer korrigierten Veröffentlichung

Rollback-Maßnahmen werden nachvollziehbar dokumentiert.

---

# 7. Freigabe

Vor jeder Veröffentlichung müssen folgende Voraussetzungen erfüllt sein:

- Dokumentation aktualisiert
- Änderungen getestet
- Review abgeschlossen
- Git-Repository aktuell
- keine bekannten kritischen Fehler

Erst danach erfolgt die Veröffentlichung in die Produktivumgebung.

---

# 8. Deployment-Checkliste

Vor jeder Veröffentlichung sind mindestens folgende Punkte zu überprüfen:

| Prüfschritt | Status |
|-------------|:------:|
| Dokumentation aktualisiert | ☐ |
| Änderungen lokal getestet | ☐ |
| Review abgeschlossen | ☐ |
| Git-Repository aktuell | ☐ |
| Commit erstellt | ☐ |
| Änderungen nach GitHub übertragen | ☐ |
| Statischer Build erfolgreich erzeugt | ☐ |
| Statische Validierung erfolgreich | ☐ |
| Deployment auf dev.s-bac.de geprüft | ☐ |
| Freigegebener Stand auf s-bac.de veröffentlicht | ☐ |
| Website erreichbar | ☐ |
| Navigation geprüft | ☐ |
| Formulare getestet | ☐ |
| Interne Links geprüft | ☐ |
| Darstellung auf Desktop und Mobilgeräten geprüft | ☐ |

Erst nach erfolgreicher Prüfung aller Punkte gilt ein Deployment als abgeschlossen.

---

# 9. Qualitätssicherung

Nach jedem Deployment erfolgt eine Qualitätskontrolle.

Hierzu gehören insbesondere:

- Funktionsprüfung aller geänderten Bereiche
- Überprüfung der Darstellung auf verschiedenen Bildschirmgrößen
- Kontrolle interner und externer Verlinkungen
- Prüfung der Ladezeiten
- Sichtprüfung der Inhalte
- Dokumentation festgestellter Abweichungen

Festgestellte Mängel werden priorisiert und zeitnah behoben.

---

# 10. Designentscheidungen (ADR)

## ADR-0001

**Titel:** Kontrollierter manueller Deployment-Prozess

### Kontext

Das Projekt wird derzeit ohne automatisierte CI/CD-Pipeline betrieben.

### Entscheidung

Deployments erfolgen bewusst manuell nach einem definierten und dokumentierten Ablauf.

### Begründung

Dieses Vorgehen ermöglicht:

- vollständige Kontrolle über jede Veröffentlichung
- einfache Nachvollziehbarkeit
- geringe Komplexität
- schnelle Fehleranalyse
- schrittweise Erweiterbarkeit

Eine spätere Automatisierung bleibt ausdrücklich möglich.

**Status:** Akzeptiert

---

# Verwandte Dokumente

- README.md
- INDEX.md
- GLOSSAR.md
- 09_Technische_Architektur.md
- 10_Betrieb_und_Wartung.md
- ADR_INDEX.md
- adr/ADR-0001.md

---

# Dokumentenrevision

| Version | Datum | Beschreibung | Autor |
|---------|--------|--------------|--------|
| 0.1 | 2026-07-24 | Dokument angelegt | Sascha Bachmeier |
| 0.2 | 2026-07-24 | Deployment-Prozess, Rollback, Qualitätssicherung und ADR ergänzt | Sascha Bachmeier |
| 1.0 | 2026-07-24 | Dokument auf Dokumentationsstandard 1.0 angepasst | Sascha Bachmeier |
