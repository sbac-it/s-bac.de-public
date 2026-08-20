# Architecture Decision Records (ADR)

**Projekt:** s-bac.de  
**Version:** 1.1
**Status:** Freigegeben  
**Autor:** Sascha Bachmeier  
**Erstellt:** 2026-07-24  
**Letzte Änderung:** 2026-08-20
**Gültig ab:** 2026-07-24  
**Nächste Review:** 2027-01-24

---

# 1. Zweck

Dieses Dokument dient als zentrale Übersicht aller Architecture Decision Records (ADR) des Projekts **s-bac.de**.

ADRs dokumentieren grundlegende Architekturentscheidungen einschließlich ihrer Motivation, der betrachteten Alternativen sowie ihrer Auswirkungen auf das Projekt.

Jede ADR besitzt eine eindeutige Nummer und wird als eigenständiges Dokument im Verzeichnis `docs/adr/` abgelegt.

---

# 2. Architekturprinzipien

Für alle ADRs gelten folgende Grundsätze:

- Jede Entscheidung erhält genau eine ADR.
- ADRs werden nach der Freigabe nicht überschrieben.
- Änderungen werden durch neue ADRs dokumentiert.
- ADRs sind Bestandteil der Projektdokumentation.
- Jedes Projektdokument verweist bei Bedarf auf die zugehörigen ADRs.

---

# 3. ADR-Übersicht

| ADR | Titel | Status |
|------|-------|:------:|
| ADR-0001 | Dokumentation vor Implementierung | ⏳ |
| ADR-0002 | Single Source of Truth | ⏳ |
| ADR-0003 | Dokumentationsportal | ⏳ |
| ADR-0004 | Git als Versionsverwaltung | ⏳ |
| ADR-0005 | Sitejet als CMS | Ersetzt |
| ADR-0006 | Komponentenorientierte Entwicklung | ⏳ |
| ADR-0007 | Mobile First | ⏳ |
| ADR-0008 | Semantic HTML | ⏳ |
| ADR-0009 | SEO by Design | ⏳ |
| ADR-0010 | Verbindliches Design System für s-bac.de | Gültig |
| ADR-0011 | Standardstruktur der Component Library | Gültig |
| ADR-0012 | Eigenständiger statischer Build ohne SiteJet | Freigegeben |

---

# 4. Lebenszyklus einer ADR

```text
Idee
 │
 ▼
Diskussion
 │
 ▼
Review
 │
 ▼
Freigabe
 │
 ▼
Implementierung
 │
 ▼
Archivierung (falls ersetzt)
```

---

# 5. Statusdefinitionen

| Status | Bedeutung |
|---------|-----------|
| Entwurf | ADR wird ausgearbeitet |
| Review | Fachliche Prüfung |
| Freigegeben | Verbindliche Architekturentscheidung |
| Ersetzt | Durch eine neuere ADR abgelöst |
| Verworfen | Entscheidung wurde nicht übernommen |

---

# 6. Pflegehinweise

Neue Architekturentscheidungen werden ausschließlich als eigenständige ADR-Dokumente erstellt und anschließend in diesem Index ergänzt.

---

# 7. Verwandte Dokumente

- README.md
- INDEX.md
- GLOSSAR.md
- DOCUMENTATION_STANDARD.md
- docs/adr/

---

# 8. Dokumentenrevision

| Version | Datum | Beschreibung | Autor |
|---------|--------|--------------|--------|
| 1.0 | 2026-07-24 | Dokument erstellt und als ADR-Index freigegeben | Sascha Bachmeier |
| 1.1 | 2026-08-20 | ADR-0010 bis ADR-0012 ergänzt und ADR-0005 als ersetzt markiert | Sascha Bachmeier |
