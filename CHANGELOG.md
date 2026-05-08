# Changelog

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

Le format suit les recommandations de [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/)
et ce projet adhère au versionnage sémantique (SemVer).

---

## [Unreleased]

### Added

- Support futur pour permissions avancées
- Support futur pour stratégies d’extraction custom supplémentaires

---

## [1.1.0] - 2026-05-08

### Added

- Ajout complet du **Auth Guard** configurable (extract, verify, build-user, access)
- Ajout du module `extract-token` + extracteur par défaut
- Ajout du module `build-user` + builder par défaut
- Ajout du module `deep-merge` utilisé par le guard
- Ajout des tests unitaires complets :
  - hashing
  - tokens
  - sanitize
  - validators
  - auth-guard
  - extract-token
  - build-user
  - deep-merge

### Changed

- Réorganisation complète de l’architecture interne (`src/auth/...`)
- README entièrement réécrit et enrichi
- Export global simplifié et stabilisé

### Fixed

- Correction des chemins d’import dans les tests
- Correction de comportements edge-case dans sanitize et validators

---

## [1.0.0] - 2026-05-06

### Added

- Première version stable de `@j3r3mcdev/auth-service`
- Hashing bcrypt (hash / compare)
- Tokens JWT (generate / verify)
- Validators (email, password, UUID…)
- Sanitization (trim, escape, normalize)
- Build ESM complet compatible Node 20+
- Déclarations TypeScript
- Exports propres via `package.json`
- Structure `dist/` générée automatiquement
