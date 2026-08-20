---
title: "E-Mails mit OpenPGP verschlüsseln – unter Windows, Linux und macOS"
slug: "openpgp-e-mail-verschluesselung"
description: "OpenPGP verständlich erklärt: Schlüssel prüfen, Thunderbird einsetzen und Outlook, S/MIME sowie Microsoft Purview richtig einordnen."
status: "Freigegeben"
date: "2026-08-02"
author: "Sascha Bachmeier"
---

# E-Mails mit OpenPGP verschlüsseln – unter Windows, Linux und macOS

E-Mails durchlaufen Endgeräte, Mailserver und Netze verschiedener Anbieter. TLS schützt die Verbindungen, aber nicht grundsätzlich den Inhalt gegenüber allen beteiligten Diensten. OpenPGP setzt deshalb direkt an der Nachricht an: Verschlüsselt wird mit dem öffentlichen Schlüssel des Empfängers, entschlüsselt mit dessen privatem Schlüssel. Eine digitale Signatur macht zusätzlich Herkunft und Unverändertheit prüfbar.

> **Kurzfassung:** Für einen einheitlichen OpenPGP-Arbeitsablauf auf Windows, Linux und macOS ist Thunderbird der geradlinigste Einstieg. Outlook unterstützt nativ vor allem S/MIME und Microsoft-Purview-Verschlüsselung. OpenPGP benötigt dort eine zusätzliche, zur Outlook-Version passende Lösung.

## PGP, OpenPGP und GnuPG

PGP bezeichnet ursprünglich „Pretty Good Privacy“. OpenPGP ist der offene Nachrichten- und Schlüsselformatstandard. GnuPG, häufig über den Befehl gpg verwendet, ist eine freie Implementierung für Schlüsselverwaltung, Verschlüsselung und Signaturen.

## Das Schlüsselpaar

Der **öffentliche Schlüssel** darf verteilt werden. Andere verwenden ihn, um Nachrichten für dich zu verschlüsseln oder deine Signaturen zu prüfen. Der **private Schlüssel** bleibt ausschließlich unter deiner Kontrolle. Er entschlüsselt Nachrichten und erstellt Signaturen.

Zu einer belastbaren Einrichtung gehören:

- eine starke Passphrase,
- eine verschlüsselte Sicherung des privaten Schlüssels,
- ein getrennt aufbewahrtes Widerrufszertifikat und
- ein dokumentierter Fingerabdruck.

## Fingerabdrücke prüfen

Eine Schlüsseldatei beweist allein noch nicht, wem der Schlüssel gehört. Vergleiche den vollständigen Fingerabdruck über einen zweiten vertrauenswürdigen Kanal.

| Adresse | Fingerabdruck |
|---|---|
| info@s-bac.de | 23E1 6A0E 00D1 ED9D F154 B5AA B5C6 FEC6 480A 8059 |
| s.bachmeier@s-bac.de | 9370 A560 EEA3 8C44 2719 DD55 9E65 7EE8 87FA ED42 |

[Öffentliche PGP-Schlüssel und Fingerabdrücke aufrufen](/kontakt/#pgp-communication)

## Thunderbird auf Windows, Linux und macOS

Thunderbird unterstützt OpenPGP direkt. Die grundlegende Bedienung ist auf allen drei Plattformen weitgehend gleich.

### Eigenen Schlüssel einrichten

1. Konten-Einstellungen öffnen.
2. Für das Konto Ende-zu-Ende-Verschlüsselung wählen.
3. Einen OpenPGP-Schlüssel erzeugen oder einen vorhandenen privaten Schlüssel importieren.
4. Den persönlichen Schlüssel der E-Mail-Adresse zuordnen.
5. Den privaten Schlüssel verschlüsselt außerhalb des Geräts sichern.

Verwendest du dasselbe Postfach auf mehreren Geräten, solltest du nicht unkoordiniert mehrere persönliche Schlüssel erzeugen. Sichere den vorhandenen Schlüssel geschützt und importiere ihn gezielt auf den weiteren Geräten.

### Empfängerschlüssel importieren

1. Die ASC-Datei von einer vertrauenswürdigen Quelle laden.
2. Im OpenPGP-Schlüsselmanager importieren.
3. Den Fingerabdruck unabhängig vergleichen.
4. Den Schlüssel erst danach für die Adresse akzeptieren.

### Verschlüsseln und signieren

Beim Verfassen kannst du Verschlüsselung und digitale Signatur getrennt aktivieren. Verschlüsselung schützt den Inhalt. Die Signatur macht Herkunft und Unverändertheit prüfbar. Für jeden Empfänger wird ein akzeptierter öffentlicher Schlüssel benötigt.

Absender, Empfänger, Versandzeit und technische Metadaten bleiben zumindest teilweise sichtbar. Schreibe keine vertraulichen Informationen in die Betreffzeile.

## Windows und Outlook

Unter Windows ist Thunderbird der direkte plattformübergreifende Weg. Gpg4win bündelt GnuPG mit Windows-Werkzeugen.

Microsoft dokumentiert für Outlook nativ vor allem:

- S/MIME mit Zertifikaten,
- Microsoft Purview Message Encryption in geeigneten Microsoft-365-Plänen und
- organisationsabhängige Schutzrichtlinien.

Diese Verfahren sind nicht OpenPGP. Ein OpenPGP-Schlüssel ist kein Outlook-S/MIME-Zertifikat.

OpenPGP in Outlook benötigt zusätzliche Komponenten. Gpg4win stellt Outlook-Integrationen bereit. Die konkrete Unterstützung hängt von Outlook-Generation, Bereitstellungsmodell und Organisationsvorgaben ab. Klassisches und neues Outlook für Windows müssen getrennt betrachtet werden. Prüfe vor einer Einführung die aktuelle Kompatibilität.

Für kleine heterogene Umgebungen ist Thunderbird häufig einfacher. In zentral verwalteten Microsoft-365-Umgebungen können S/MIME oder Purview besser zum Identitäts-, Compliance- und Gerätebetrieb passen.

## Linux und GnuPG

Linux-Distributionen bieten GnuPG üblicherweise über ihre Paketverwaltung an. Einen öffentlichen Schlüssel prüfst und importierst du so:

    gpg --show-keys --fingerprint info-s-bac-de-public-key.asc
    gpg --import info-s-bac-de-public-key.asc

Eine Datei wird verschlüsselt beziehungsweise entschlüsselt:

    gpg --armor --encrypt --recipient info@s-bac.de nachricht.txt
    gpg --decrypt nachricht.txt.asc

Für reproduzierbare Abläufe ist ein geprüfter vollständiger Fingerabdruck eindeutiger als die E-Mail-Adresse allein.

## macOS und Apple Mail

Thunderbird bietet auch unter macOS den konsistenten integrierten OpenPGP-Weg. GnuPG kann zusätzlich installiert und im Terminal verwendet werden.

Apple Mail besitzt keinen vergleichbaren eingebauten OpenPGP-Arbeitsablauf. Drittanbieter wie GPG Suite bieten Integrationen an. Prüfe vor Installation, Systemupdate und produktivem Einsatz die aktuelle macOS-, Mail- und Lizenzkompatibilität.

## OpenPGP, S/MIME und Purview

| Merkmal | OpenPGP | S/MIME | Microsoft Purview |
|---|---|---|---|
| Vertrauensmodell | Schlüssel und Fingerabdrücke | Zertifikate und Zertifizierungsstellen | Microsoft-365-Identität und Richtlinien |
| Typische Clients | Thunderbird, GnuPG, Erweiterungen | Outlook, Apple Mail, Thunderbird | Outlook und Microsoft 365 |
| Zentrale Verwaltung | möglich, nicht zwingend | gut zentralisierbar | stark in Microsoft 365 integriert |
| OpenPGP-kompatibel | ja | nein | nein |

Keines der Verfahren ist pauschal das beste. Entscheidend sind Empfängerkreis, Geräte, Administration, regulatorische Vorgaben und die Fähigkeit, Schlüssel oder Zertifikate zuverlässig zu verwalten.

## Schlüssel sicher betreiben

- Private Schlüssel niemals per E-Mail oder Download-Link teilen.
- Sicherungen mit einer starken Passphrase schützen.
- Sicherung und Passphrase getrennt aufbewahren.
- Ein Widerrufszertifikat vorbereiten und geschützt sichern.
- Fingerabdruck, Gültigkeit, Sicherungsort und Erneuerung dokumentieren.
- Alte private Schlüssel geschützt erhalten, solange Archive damit entschlüsselt werden müssen.

## Häufige Fehler

1. Fingerabdruck nicht unabhängig prüfen.
2. Privaten statt öffentlichen Schlüssel weitergeben.
3. Keine getestete Sicherung anlegen.
4. Vertrauliche Angaben in die Betreffzeile schreiben.
5. Outlook-Verschlüsselung mit OpenPGP gleichsetzen.
6. Software-Kompatibilität nicht prüfen.
7. Verschlüsseln, aber nicht signieren.

## Ein sinnvoller Test

1. Thunderbird für zwei Testadressen einrichten.
2. Öffentliche Schlüssel austauschen.
3. Fingerabdrücke über einen zweiten Kanal vergleichen.
4. Eine signierte Testnachricht senden und prüfen.
5. Eine verschlüsselte und signierte Nachricht austauschen.
6. Sicherung und Widerruf dokumentieren.

Erst wenn dieser Ablauf verstanden und wiederholbar ist, sollte OpenPGP für wichtige Kommunikation eingesetzt werden.

## Fazit

OpenPGP kann E-Mail-Inhalte wirksam Ende-zu-Ende schützen. Belastbar wird der Kommunikationsweg durch geprüfte Fingerabdrücke, geschützte private Schlüssel, getestete Sicherungen und einen nachvollziehbaren Lebenszyklus.

Thunderbird bietet einen weitgehend einheitlichen Ablauf. Outlook verfolgt nativ andere Verschlüsselungsmodelle; OpenPGP muss dort bewusst ergänzt und für die konkrete Outlook-Version geprüft werden.

[Ergänzend: S/MIME mit WISeID und CAcert in der Praxis](/fachwissen/smime-wiseid-cacert/)

## Quellen

- [Thunderbird: Einführung in Ende-zu-Ende-Verschlüsselung](https://support.mozilla.org/en-US/kb/introduction-to-e2e-encryption)
- [Thunderbird: OpenPGP – Anleitung und FAQ](https://support.mozilla.org/en-US/kb/openpgp-thunderbird-howto-and-faq)
- [Microsoft: S/MIME oder Microsoft Purview in Outlook](https://support.microsoft.com/en-US/Outlook/mail/send-s-mime-or-microsoft-purview-encrypted-emails-in-outlook)
- [Microsoft: Schutzmöglichkeiten für Nachrichten in Outlook](https://support.microsoft.com/en-US/Outlook/mail/learn-about-securing-and-protecting-email-messages-in-outlook)
- [GnuPG-Handbuch](https://gnupg.org/documentation/manuals/gnupg/)
- [Gpg4win](https://www.gpg4win.org/)
- [GPG Suite](https://gpgtools.org/)

*Stand der Produktangaben: 2. August 2026. Funktionen, Lizenzen und Kompatibilitäten können sich ändern und sollten vor einer produktiven Einführung erneut geprüft werden.*
