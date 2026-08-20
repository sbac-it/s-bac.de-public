---
title: "S/MIME in der Praxis: Warum ich WISeID und CAcert parallel verwende"
slug: "smime-wiseid-cacert"
description: "Ein persönlicher Erfahrungsbericht über S/MIME mit WISeID und CAcert, Zertifikatsvertrauen, Schlüsselaustausch und die ergänzende Nutzung von OpenPGP."
status: "Freigegeben"
date: "2026-08-18"
author: "Sascha Bachmeier"
---

# S/MIME in der Praxis: Warum ich WISeID und CAcert parallel verwende

E-Mails werden heute fast selbstverständlich über verschlüsselte Verbindungen übertragen. Ein Schlosssymbol im Mailprogramm oder Browser vermittelt dabei schnell den Eindruck, auch die Nachricht selbst sei durchgehend geschützt. In vielen Fällen besteht jedoch lediglich eine Transportverschlüsselung zwischen einzelnen Stationen: vom Mailclient zum eigenen Anbieter und anschließend zwischen den beteiligten Mailservern.

Das ist wichtig, aber keine Ende-zu-Ende-Verschlüsselung. Auf den beteiligten Systemen kann eine Nachricht grundsätzlich im Klartext verarbeitet oder gespeichert werden. Wer dort über ausreichende Berechtigungen verfügt oder sich unbefugt Zugriff verschafft, könnte ihre Inhalte unter Umständen einsehen.

Mit S/MIME und OpenPGP existieren seit vielen Jahren zwei Verfahren, die E-Mails digital signieren und Ende-zu-Ende verschlüsseln können. Trotzdem haben sich beide im privaten Mailverkehr nicht flächendeckend etabliert. In diesem Artikel beschreibe ich, wie und warum ich S/MIME-Zertifikate von WISeID und CAcert parallel einsetze, weshalb ich für meine alltägliche private Kommunikation dennoch OpenPGP bevorzuge und welche praktischen Hürden mir dabei begegnen.

## Signieren und Verschlüsseln sind zwei verschiedene Dinge

Eine digitale Signatur schützt nicht vor dem Lesen der E-Mail. Sie ermöglicht dem Empfänger vielmehr, die Herkunft und Unversehrtheit einer Nachricht zu prüfen. Der Mailclient kann feststellen, ob die Nachricht nach dem Signieren verändert wurde und mit welchem Zertifikat die Signatur erstellt wurde.

Bei einer verschlüsselten Nachricht wird der Inhalt dagegen mit dem öffentlichen Schlüssel des Empfängers geschützt. Entschlüsseln lässt er sich nur mit dem zugehörigen privaten Schlüssel. Der Absender benötigt daher vor dem Versand das S/MIME-Zertifikat des Empfängers, denn dieses enthält dessen öffentlichen Schlüssel.

S/MIME verwendet ein hierarchisches Vertrauensmodell. Zertifizierungsstellen bestätigen die Zuordnung zwischen einem öffentlichen Schlüssel und den im Zertifikat enthaltenen Angaben. Damit ein Mailclient ein Zertifikat als vertrauenswürdig einstufen kann, muss er dessen Zertifikatskette bis zu einer vertrauten Stammzertifizierungsstelle prüfen können.

Genau an diesem Punkt unterscheiden sich WISeID und CAcert in meinem praktischen Einsatz.

## Warum ich WISeID Personal verwende

Für eine meiner privaten E-Mail-Adressen habe ich mich bewusst für die kostenpflichtige Variante **WISeID Personal** entschieden. Für meinen Anwendungsfall bot sie das passende Verhältnis zwischen Kosten und praktischem Nutzen. Da die Adresse nicht geschäftlich verwendet wird, benötige ich kein Unternehmenszertifikat. Gleichzeitig wollte ich meine persönlichen Angaben in das Zertifikat aufnehmen lassen und mich nicht auf eine reine Bestätigung des Zugriffs auf die E-Mail-Adresse beschränken.

Diese Adresse ist insbesondere für die verschlüsselte Kommunikation mit technisch weniger versierten Personen vorgesehen. Der entscheidende Vorteil besteht für mich darin, dass die Zertifikatskette auf den von mir und meinen Kommunikationspartnern verwendeten Systemen gewöhnlich bereits als vertrauenswürdig erkannt wird.

Der Empfänger muss daher normalerweise keine zusätzliche Stammzertifizierungsstelle einrichten, bevor sein Mailclient meine Signatur prüfen kann. Mit einer signierten Nachricht erhält er zugleich mein persönliches Zertifikat und den darin enthaltenen öffentlichen Schlüssel. Abhängig vom verwendeten Mailprogramm wird das Zertifikat automatisch übernommen oder kann mit wenigen Schritten gespeichert werden.

Die kostenpflichtige Variante löst nicht alle organisatorischen Probleme von S/MIME. Auch der Empfänger benötigt ein eigenes S/MIME-Zertifikat und muss mir seinen öffentlichen Schlüssel zur Verfügung stellen, bevor ich eine Nachricht für ihn verschlüsseln kann. WISeID reduziert in meinem Anwendungsfall aber eine wesentliche Einstiegshürde: Die Vertrauensstellung der ausstellenden Zertifizierungsstelle muss auf der Gegenseite üblicherweise nicht erst manuell hergestellt werden.

## Warum ich zusätzlich CAcert verwende

Für meine weiteren E-Mail-Adressen verwende ich kostenlose Client-Zertifikate von CAcert. CAcert ist eine gemeinschaftlich betriebene Zertifizierungsstelle, deren Zertifikate unter anderem zum Signieren und Verschlüsseln von E-Mails eingesetzt werden können.

CAcert verwendet ein eigenes Assurance-Verfahren. Dabei wird die Identität eines Mitglieds nach den Regeln der CAcert-Community geprüft. Ab einer ausreichenden Zahl von Assurance Points kann der bestätigte Name in ein persönliches Zertifikat aufgenommen werden. Da ich selbst die entsprechende Prüfung durchlaufen habe und CAcert-Assurer bin, können meine Zertifikate neben der E-Mail-Adresse auch meinen geprüften Namen enthalten.

Der wesentliche Unterschied zu meinem WISeID-Zertifikat liegt nicht in der grundlegenden Funktionsweise der Verschlüsselung, sondern in der Verbreitung der Vertrauenskette. Die CAcert-Stammzertifikate sind in den Vertrauensspeichern vieler Betriebssysteme und Anwendungen nicht standardmäßig enthalten. Ein Mailclient kann mein Zertifikat zwar empfangen und technisch verarbeiten, die ausstellende Zertifizierungsstelle aber zunächst als unbekannt einstufen.

Damit meine CAcert-Zertifikate ohne entsprechende Warnung als vertrauenswürdig angezeigt werden, muss mein Kommunikationspartner die benötigten CAcert-Stamm- und Zwischenzertifikate aus einer verifizierten Quelle installieren und ihnen für den vorgesehenen Zweck vertrauen. CAcert empfiehlt, vor dem Import die Fingerabdrücke der Stammzertifikate zu kontrollieren.

Für technisch versierte Kommunikationspartner ist dieser zusätzliche Schritt meist vertretbar. Bei Personen ohne Erfahrung mit Zertifikaten kann er jedoch eine erhebliche Hürde darstellen. Genau deshalb verwende ich CAcert vor allem für Adressen und Kontakte, bei denen ich die notwendige Einrichtung erklären kann oder die Gegenseite bereits mit Public-Key-Infrastrukturen vertraut ist.

## Der erste Kontakt beginnt mit einer signierten Nachricht

Eine S/MIME-verschlüsselte Kommunikation kann normalerweise nicht allein mit der Kenntnis einer E-Mail-Adresse begonnen werden. Der Absender benötigt zunächst das persönliche Zertifikat des Empfängers und damit dessen öffentlichen Schlüssel.

Mein Standardvorgehen besteht deshalb aus einem wechselseitigen Austausch signierter Nachrichten:

1. Ich sende meinem Kommunikationspartner zunächst eine digital signierte S/MIME-Nachricht. Die Nachricht enthält mein Zertifikat und meinen öffentlichen Schlüssel.
2. Der Empfänger prüft die Signatur und übernimmt mein Zertifikat in seinen Mailclient.
3. Der Empfänger antwortet ebenfalls mit einer digital signierten Nachricht. Dadurch erhalte ich sein Zertifikat und seinen öffentlichen Schlüssel.
4. Sobald beide Seiten über das Zertifikat der jeweils anderen Person verfügen, können die folgenden Nachrichten Ende-zu-Ende-verschlüsselt versendet werden.

Die digitale Signatur ermöglicht bei der ersten Kontaktaufnahme somit die Prüfung der Nachricht und transportiert gleichzeitig den öffentlichen Schlüssel. Antwortet der Empfänger ohne S/MIME-Signatur, fehlt mir weiterhin sein Zertifikat. In diesem Fall bitte ich um eine signierte Antwort und unterstütze bei Bedarf bei der Einrichtung.

## Thunderbird und iPhone

Unter macOS, Linux und Windows verwende ich Mozilla Thunderbird in der jeweils aktuellen Fassung. Für mich hat das den Vorteil, dass die Verwaltung von Konten, Zertifikaten und Schlüsseln auf allen drei Betriebssystemen weitgehend einheitlich funktioniert. Thunderbird unterstützt sowohl S/MIME als auch OpenPGP direkt.

Meine S/MIME-Zertifikate verwende ich außerdem mit der Mail-App auf dem iPhone. iOS unterstützt das digitale Signieren und Verschlüsseln einzelner Nachrichten mit S/MIME. Außerhalb einer gemeinsamen Exchange-Umgebung wird auch dort üblicherweise zunächst eine signierte Nachricht benötigt, damit das Zertifikat des Empfängers verfügbar ist.

Eine ausführliche Schritt-für-Schritt-Anleitung möchte ich bewusst nicht wiederholen. Solche Anleitungen sind bereits in ausreichender Zahl vorhanden und können durch Änderungen an Menüs oder Programmversionen schnell veralten.

## Sicherung der Zertifikate und privaten Schlüssel

Meine exportierten Zertifikate bewahre ich verschlüsselt auf meinem NAS auf. Von dort kann ich sie bei Bedarf in Thunderbird oder auf einem mobilen Gerät installieren.

Entscheidend ist dabei nicht nur das öffentlich weitergebbare Zertifikat. Für die eigene Nutzung wird auch der private Schlüssel benötigt. Gerät dieser in fremde Hände, können damit je nach Verwendungszweck Nachrichten im eigenen Namen signiert oder für den Schlüssel verschlüsselte Inhalte gelesen werden.

Exportierte PKCS#12-Dateien sollten deshalb mit einem starken Kennwort geschützt und nur an einem zuverlässig abgesicherten Ort aufbewahrt werden. Die Sicherung alter privater Schlüssel ist ebenfalls wichtig: Ein neues Zertifikat mit einem neuen Schlüsselpaar ersetzt den alten privaten Schlüssel nicht. Geht dieser verloren, können damit verschlüsselte Bestandsnachrichten möglicherweise nicht mehr entschlüsselt werden.

## Warum ich im privaten Alltag OpenPGP bevorzuge

Obwohl ich S/MIME aktiv nutze, bevorzuge ich für meinen regelmäßigen privaten Mailverkehr OpenPGP. Meine ausgehenden Nachrichten werden deshalb standardmäßig mit meinem OpenPGP-Schlüssel signiert.

Diese Entscheidung ist teilweise eine persönliche Präferenz – beinahe eine Glaubensfrage. Sowohl S/MIME als auch OpenPGP beruhen auf öffentlich dokumentierten Standards. Der für mich relevante Unterschied liegt vor allem im Vertrauensmodell und in der Verwaltung der öffentlichen Schlüssel.

Bei OpenPGP verwalte ich meine Schlüssel und Vertrauensentscheidungen stärker selbst. Ich kann Schlüssel über unabhängige Wege prüfen und bin nicht für jede Identitätszuordnung von einer zentralen Zertifizierungsstelle abhängig. Das bedeutet nicht, dass OpenPGP grundsätzlich sicherer als S/MIME wäre. Die Sicherheit hängt bei beiden Verfahren unter anderem von der Schlüsselverwaltung, der verwendeten Software, der Prüfung des Kommunikationspartners und dem Schutz des privaten Schlüssels ab.

## Öffentliche Verzeichnisse als Vorteil von OpenPGP

Ein weiterer praktischer Grund für meine OpenPGP-Präferenz ist die Möglichkeit, bereits vor der ersten Kontaktaufnahme nach einem öffentlichen Schlüssel zu suchen. Dafür verwende ich hauptsächlich:

- [keys.openpgp.org](https://keys.openpgp.org/)
- das [PGP Global Directory](https://keyserver1.pgp.com/vkd/GetWelcomeScreen.event)

`keys.openpgp.org` wird von Thunderbird standardmäßig für die Suche nach OpenPGP-Schlüsseln verwendet. Der Dienst erlaubt eine Suche anhand der vollständigen E-Mail-Adresse. Damit die zugehörigen Identitätsinformationen veröffentlicht und über die Adresse gefunden werden können, muss deren Inhaber die Veröffentlichung zuvor bestätigen.

Finde ich einen passenden Schlüssel, kann ich ihn vor dem Versand der ersten Nachricht in Thunderbird übernehmen. Ein Treffer ist allerdings nicht automatisch ein vollständiger Identitätsnachweis. Bei besonders vertraulicher Kommunikation sollte der Fingerabdruck zusätzlich über einen unabhängigen Kommunikationsweg abgeglichen werden.

Bei S/MIME fehlt im öffentlichen Mailverkehr ein vergleichbar etabliertes und von verbreiteten Mailclients selbstverständlich genutztes Zertifikatsverzeichnis. Technische Möglichkeiten wie Verzeichnisdienste und das DNSSEC-basierte SMIMEA-Verfahren existieren, haben sich im gewöhnlichen privaten Mailverkehr jedoch nicht flächendeckend durchgesetzt.

## WISeID, CAcert und OpenPGP im Vergleich

| Eigenschaft | WISeID Personal | CAcert | OpenPGP |
|---|---|---|---|
| Grundmodell | S/MIME mit Zertifizierungsstelle | S/MIME mit gemeinschaftlicher Zertifizierungsstelle | Dezentral verwaltete OpenPGP-Schlüssel |
| Kosten in meinem Fall | kostenpflichtig | kostenlos | kostenlos |
| Persönliche Angaben | in meiner gewählten Variante enthalten | nach entsprechender Assurance möglich | vom Schlüsselinhaber selbst eingetragen |
| Vertrauen beim Empfänger | Zertifikatskette wird gewöhnlich erkannt | Vertrauenskette muss meist manuell eingerichtet werden | abhängig von Schlüsselprüfung und lokalem Vertrauensmodell |
| Erste verschlüsselte Nachricht | meist nach Zertifikatsaustausch | meist nach Zertifikatsaustausch | bei veröffentlichtem und geprüftem Schlüssel vorab möglich |
| Mein hauptsächlicher Einsatz | Kontakte mit niedriger technischer Einstiegshürde | weitere Adressen und technisch versierte Kontakte | regelmäßige private Kommunikation |

Diese Gegenüberstellung ist keine allgemeingültige Rangfolge. Sie beschreibt meine Anforderungen und Erfahrungen. In Unternehmen können zentrale Verzeichnisdienste, Gerätemanagement, interne Zertifizierungsstellen oder E-Mail-Gateways die Ausgangslage erheblich verändern.

## Grenzen der Ende-zu-Ende-Verschlüsselung

S/MIME und OpenPGP schützen den Inhalt einer Nachricht, lösen aber nicht jedes Datenschutz- und Sicherheitsproblem. Bestimmte Metadaten müssen für die Zustellung weiterhin verarbeitet werden. Dazu gehören insbesondere Absender, Empfänger und technische Transportinformationen. Auch der Betreff einer E-Mail ist üblicherweise nicht zuverlässig Ende-zu-Ende-verschlüsselt.

Eine verschlüsselte Nachricht schützt außerdem nicht vor einem bereits kompromittierten Endgerät. Ebenso kann ein legitimer Empfänger Inhalte nach dem Entschlüsseln kopieren oder weiterleiten. Verliert ein Benutzer seinen privaten Schlüssel, verliert er möglicherweise auch den Zugriff auf ältere verschlüsselte Nachrichten.

## Warum sich E-Mail-Verschlüsselung kaum durchgesetzt hat

Aus meiner Sicht scheitert E-Mail-Verschlüsselung heute weniger an fehlenden kryptografischen Verfahren als an ihrer Handhabung. Anwender müssen Zertifikate oder Schlüssel erzeugen, sichern, auf mehreren Geräten einrichten und bei Ablauf rechtzeitig ersetzen. Kommunikationspartner müssen öffentliche Schlüssel austauschen und deren Zuordnung zur richtigen Person bewerten.

Gleichzeitig vermittelt die vorhandene Transportverschlüsselung vielen Nutzern bereits ein ausreichendes Sicherheitsgefühl. Der Unterschied zwischen einer verschlüsselten Verbindung zum Mailserver und einer Ende-zu-Ende-verschlüsselten Nachricht ist außerhalb von IT-Fachkreisen wenig bekannt – und selbst innerhalb der IT nicht immer vollständig präsent.

## Fazit

Für mich gibt es nicht die eine ideale Lösung für jede E-Mail-Adresse und jeden Kommunikationspartner.

WISeID Personal verwende ich dort, wo eine möglichst geringe technische Einstiegshürde wichtig ist. CAcert ermöglicht mir kostenlose persönliche Zertifikate für weitere E-Mail-Adressen, setzt bei der Gegenseite aber die bewusste Installation der Vertrauenskette voraus.

OpenPGP bleibt meine bevorzugte Lösung für den regelmäßigen privaten Mailverkehr. Ausschlaggebend sind für mich das dezentrale Vertrauensmodell, die eigene Kontrolle über die Schlüssel und die Möglichkeit, veröffentlichte Schlüssel bereits vor der ersten Kontaktaufnahme zu suchen.

S/MIME und OpenPGP ergänzen sich in meinem Alltag. Entscheidend ist letztlich nicht, welches Verfahren auf dem Papier überlegen erscheint. Entscheidend ist, ob Absender und Empfänger es tatsächlich verwenden, ihre Schlüssel sorgfältig schützen und den Unterschied zwischen Transport- und Ende-zu-Ende-Verschlüsselung verstehen.

[Ergänzend: E-Mails mit OpenPGP verschlüsseln](/fachwissen/openpgp-e-mail-verschluesselung/)

## Quellen

- [Thunderbird: Einführung in Ende-zu-Ende-Verschlüsselung](https://support.mozilla.org/en-US/kb/introduction-to-e2e-encryption)
- [Thunderbird: Voraussetzungen zum Versand verschlüsselter Nachrichten](https://support.mozilla.org/de/kb/voraussetzungen-zum-versand-verschlusselter-e-mailrden)
- [Apple: S/MIME in der Mail-App verwenden](https://support.apple.com/de-de/102245)
- [CAcert: Certification Practice Statement](https://www.cacert.org/policy/CertificationPracticeStatement.html)
- [CAcert: Stammzertifikate importieren](https://wiki.cacert.org/FAQ/ImportRootCert)
- [RFC 8550: S/MIME Version 4.0 Certificate Handling](https://www.rfc-editor.org/info/rfc8550/)
- [RFC 8162: DNS-basierte Zuordnung von S/MIME-Zertifikaten](https://www.rfc-editor.org/rfc/rfc8162)
- [RFC 9580: OpenPGP](https://www.rfc-editor.org/rfc/rfc9580.html)
- [keys.openpgp.org: Funktionsweise und Adressbestätigung](https://keys.openpgp.org/about/)

*Stand: 18. August 2026. Zertifikatsangebote, Preise, Vertrauensspeicher und Bedienoberflächen können sich ändern und sollten vor einer konkreten Einrichtung geprüft werden.*
