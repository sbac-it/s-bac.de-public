# Technische Architektur

**Projekt:** s-bac.de  
**Dokument:** 09_Technische_Architektur.md  
**Version:** 1.0  
**Status:** Freigegeben  
**Autor:** Sascha Bachmeier  
**Erstellt:** 2026-07-24  
**Letzte Änderung:** 2026-07-24  
**Gültig ab:** 2026-07-24  
**Nächste Review:** 2027-01-24

---

# 1. Zweck

Dieses Dokument beschreibt die technische Architektur von s-bac.de.

Es dient als Grundlage für Entwicklung, Betrieb, Wartung und zukünftige Erweiterungen der Website.

Alle technischen Entscheidungen orientieren sich an den zuvor definierten Projekt-, Design- und Architekturprinzipien.

---

# 2. Architekturziele

Die technische Architektur verfolgt folgende Ziele:

- hohe Wartbarkeit
- klare Projektstruktur
- einfache Erweiterbarkeit
- gute Performance
- hohe Sicherheit
- langfristige Stabilität
- reproduzierbare Entwicklungsprozesse

Die Architektur soll sowohl für Einzelentwickler als auch für spätere Projektbeteiligte verständlich und nachvollziehbar bleiben.

---

# 3. Grundprinzipien

Die Architektur orientiert sich an folgenden Leitlinien:

- Einfachheit vor Komplexität
- Standardisierung vor Individualentwicklung
- Dokumentation vor Implementierung
- Wiederverwendbarkeit von Komponenten
- Trennung von Inhalt, Darstellung und Struktur
- Nachvollziehbare Architekturentscheidungen

Technische Entscheidungen werden dokumentiert und regelmäßig überprüft.

---

# 4. Architekturübersicht

Die technische Architektur besteht aus mehreren logisch getrennten Ebenen:

- Quellcode und Repository
- Entwicklungsumgebung
- Designsystem
- Inhalte
- statischer Build und Deployment-Artefakt
- Produktionsumgebung

Jede Ebene besitzt klar definierte Verantwortlichkeiten und Schnittstellen.

---

# 5. Projektstruktur

Das Projekt ist in mehrere logisch getrennte Bereiche gegliedert.

```text
s-bac.de/
├── assets/
├── docs/
├── scripts/
├── content/
└── README.md
```

Die Trennung ermöglicht eine übersichtliche Organisation von Quellmaterial, Dokumentation und Hilfswerkzeugen.

---

# 6. Repository

Das Git-Repository bildet die zentrale Quelle für sämtliche Projektdateien.

Es dient insbesondere:

- der Versionsverwaltung
- der Dokumentation von Änderungen
- der Nachvollziehbarkeit technischer Entscheidungen
- der Zusammenarbeit
- der Sicherung des Projektstands

Alle Änderungen erfolgen grundsätzlich versioniert über Git.

---

# 7. Verzeichnisstruktur

## assets/

Enthält sämtliche statischen Ressourcen der Website.

Beispiele:

- Logos
- Bilder
- Icons
- Schriftarten
- Downloads

---

## docs/

Enthält die vollständige Projektdokumentation.

Hierzu gehören unter anderem:

- Architektur
- Designsystem
- Contentstrategie
- SEO
- Komponenten
- Betrieb
- Deployment

Die Dokumentation gilt als führende technische Referenz.

---

## scripts/

Enthält Hilfsskripte zur Entwicklung und Projektpflege.

Beispiele:

- Automatisierungen
- Build-Hilfen
- Konvertierungen
- Validierungen

---

## content/

Enthält die versionierten Seiteninhalte, die vom eigenständigen Generator verarbeitet werden.

## src/ und dist/

`src/` enthält die Implementierungsquellen. `dist/` wird durch den Build erzeugt und bildet das vollständig auslieferbare, nicht redaktionell zu pflegende Deployment-Artefakt.

---

# 8. Entwicklungsworkflow

Die Entwicklung erfolgt grundsätzlich nach folgendem Ablauf:

1. Konzept erstellen
2. Dokumentation aktualisieren
3. Review durchführen
4. Umsetzung vorbereiten
5. Änderungen implementieren
6. Testen
7. Commit
8. Push in das Git-Repository
9. Übernahme in die Produktivumgebung

Dieser Ablauf gewährleistet eine nachvollziehbare und reproduzierbare Projektentwicklung.

---

# 9. Statischer Build und Veröffentlichung

Das GitHub-Repository ist die verbindliche Projektquelle. Der Generator erzeugt daraus eine eigenständig lauffähige statische Website ohne CMS-Laufzeitabhängigkeit.

Die Rollenverteilung ist wie folgt:

| Komponente | Aufgabe |
|------------|----------|
| Git | Versionsverwaltung |
| Repository | Projektquelle (Single Source of Truth) |
| Dokumentation | Architektur und Entscheidungen |
| Statischer Generator | Erzeugung des auslieferbaren Stands in `dist/` |
| netcup-Webhosting | Auslieferung der Entwicklungs- und Produktionswebsite |

Änderungen werden dokumentiert, lokal umgesetzt, gebaut und validiert. Der erzeugte Stand wird zuerst auf `dev.s-bac.de` geprüft und anschließend auf `s-bac.de` veröffentlicht.

---

# 10. Asset-Management

Alle statischen Ressourcen werden zentral verwaltet.

Hierzu gehören insbesondere:

- Logos
- Grafiken
- Icons
- Schriftarten
- Downloads
- Dokumente

Für Assets gelten folgende Grundsätze:

- sprechende Dateinamen
- möglichst verlustfreie Originaldateien
- optimierte Web-Versionen
- nachvollziehbare Ordnerstruktur
- keine doppelten Dateien

---

# 11. Komponentenstrategie

Die Website basiert auf wiederverwendbaren Komponenten.

Neue Seitenelemente sollen bevorzugt aus bestehenden Komponenten aufgebaut werden.

Dies verbessert:

- Wartbarkeit
- Konsistenz
- Erweiterbarkeit
- Entwicklungsaufwand

Neue Komponenten werden dokumentiert und in den Komponentenkatalog aufgenommen.

---

# 12. Konfigurationsmanagement

Projektbezogene Einstellungen werden nachvollziehbar dokumentiert.

Hierzu gehören beispielsweise:

- Domain-Konfiguration
- DNS-Einstellungen
- Hosting- und Deployment-Konfiguration
- Analysewerkzeuge
- externe Dienste
- Sicherheitskonfiguration

Konfigurationsänderungen werden versioniert dokumentiert.

---

# 13. Sicherheit

Die technische Architektur berücksichtigt Sicherheitsaspekte bereits während der Planung und Entwicklung.

Grundsätze:

- HTTPS für sämtliche Inhalte
- minimale Angriffsfläche
- regelmäßige Aktualisierung aller eingesetzten Komponenten
- sichere Verwaltung von Zugangsdaten
- nachvollziehbare Konfigurationsänderungen
- datenschutzkonforme Verarbeitung personenbezogener Daten

Sicherheitsmaßnahmen werden regelmäßig überprüft und bei Bedarf angepasst.

---

# 14. Performance

Die Website soll auf allen unterstützten Endgeräten eine hohe Performance bieten.

Hierzu werden unter anderem folgende Maßnahmen berücksichtigt:

- optimierte Bildgrößen
- moderne Bildformate (z. B. WebP oder AVIF, sofern sinnvoll)
- minimierte CSS- und JavaScript-Dateien
- effiziente Nutzung von Browser-Caching
- reduzierte Anzahl externer Abhängigkeiten
- schlanke Seitenstruktur

Performance wird als Bestandteil der Benutzererfahrung betrachtet.

---

# 15. Wartbarkeit

Die Architektur ist auf langfristige Pflege und Erweiterbarkeit ausgelegt.

Hierzu gehören insbesondere:

- klar strukturierter Quellcode
- konsistente Benennung von Dateien und Komponenten
- vollständige Dokumentation
- nachvollziehbare Versionshistorie
- regelmäßige technische Überprüfung

Ziel ist es, Änderungen effizient und mit geringem Risiko durchführen zu können.

---

# 16. Backup und Wiederherstellung

Alle projektrelevanten Dateien werden versioniert im Git-Repository verwaltet.

Zusätzlich werden regelmäßige Sicherungen der Entwicklungsumgebung und der veröffentlichten Inhalte empfohlen.

Im Wiederherstellungsfall soll der letzte bekannte stabile Projektstand reproduzierbar bereitgestellt werden.

---

# 17. Architekturentscheidungen (ADR)

Technische Grundsatzentscheidungen werden als Architecture Decision Records (ADR) dokumentiert.

Jede ADR enthält mindestens:

- Titel
- Kontext
- Entscheidung
- Begründung
- Auswirkungen
- Status

Dadurch bleiben technische Entscheidungen langfristig nachvollziehbar.

---

# 18. Single Source of Truth (SSOT)

Für alle projektrelevanten Informationen ist jeweils eine führende Quelle definiert.

| Bereich | Führende Quelle |
|---------|-----------------|
| Projektdokumentation | `docs/` |
| Statische Ressourcen | `assets/` |
| Hilfsskripte | `scripts/` |
| Versionshistorie | Git-Repository |
| Quellcode und Inhalte | GitHub-Repository |
| Deployment-Artefakt | erzeugtes Verzeichnis `dist/` |
| Veröffentlichung | netcup-Webhosting |
| Architekturentscheidungen | ADRs innerhalb der Dokumentation |

Diese Zuordnung verhindert redundante Informationen und erleichtert die langfristige Pflege des Projekts.

---

# 19. Qualitätsziele

Die technische Architektur orientiert sich an messbaren Qualitätszielen.

| Bereich | Zielwert |
|---------|----------|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 95 |
| Lighthouse Best Practices | ≥ 95 |
| Lighthouse SEO | ≥ 95 |
| Core Web Vitals | Grüner Bereich |
| Kritische HTML-Fehler | 0 |
| Broken Links | 0 |

Die Zielwerte dienen als Orientierung für Qualitätssicherung und kontinuierliche Verbesserung.

---

# 20. Designentscheidungen (ADR)

## ADR-0001

**Titel:** Git-Repository als zentrale Projektquelle

### Kontext

Die Website wird als statischer Build im netcup-Webhosting veröffentlicht. Dokumentation, Inhalte und technische Entwicklung liegen gemeinsam im Git-Repository.

### Entscheidung

Das Git-Repository ist die führende technische Projektquelle (Single Source of Truth).

Das GitHub-Repository ist die alleinige verbindliche Projektquelle. `dist/` ist ausschließlich ein daraus erzeugtes Deployment-Artefakt.

### Begründung

Diese Trennung ermöglicht:

- vollständige Versionskontrolle
- nachvollziehbare Änderungen
- reproduzierbare Entwicklungsprozesse
- klare Verantwortlichkeiten
- langfristige Wartbarkeit

### Auswirkungen

Alle technischen Änderungen werden zunächst im Repository dokumentiert und versioniert, bevor sie in die Produktivumgebung übernommen werden.

**Status:** Akzeptiert

---

# Verwandte Dokumente

- README.md
- INDEX.md
- GLOSSAR.md
- 02_Informationsarchitektur.md
- 03_Designsystem.md
- 06_Komponentenkatalog.md
- 08_SEO-Strategie.md
- 10_Betrieb_und_Wartung.md
- 11_Deployment.md
- ADR_INDEX.md
- adr/ADR-0001.md

---

# Dokumentenrevision

| Version | Datum | Beschreibung | Autor |
|---------|--------|--------------|--------|
| 0.1 | 2026-07-24 | Dokument angelegt | Sascha Bachmeier |
| 0.2 | 2026-07-24 | Projektstruktur, Entwicklungsworkflow, Sitejet-Integration, Sicherheit, Qualitätsziele und ADR ergänzt | Sascha Bachmeier |
| 1.0 | 2026-07-24 | Dokument auf Dokumentationsstandard 1.0 angepasst | Sascha Bachmeier |
