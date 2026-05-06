## [1.0.10](https://github.com/j3r3mC/auth-service-lib/compare/v1.0.9...v1.0.10) (2026-05-06)
# Changelog

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au versionnage sémantique (SemVer).

---

## [1.0.0] - 2026-05-06
### Ajouté
- Première version stable de `@j3r3mcdev/auth-service`
- Fonctions de hachage de mot de passe (bcrypt)
- Fonctions de génération et vérification de tokens (JWT-ready)
- Helpers de sanitization (nettoyage d’input)
- Validators (email, mot de passe, formats)
- Build ESM complet compatible Node 20+
- Déclarations TypeScript (`.d.ts`)
- Exports propres via `package.json`
- Structure `dist/` générée automatiquement
- Support complet NestJS / TypeScript

---

## [Unreleased]
### À venir
- Ajout d’un module de gestion de refresh tokens
- Ajout d’un système de rate limiting
- Ajout d’un helper pour les cookies sécurisés
