## Changelog

Toutes les modifications notables de ce projet sont documentées dans ce fichier.  
Le format suit les recommandations de **Keep a Changelog** et ce projet adhère au **versionnage sémantique (SemVer)**.

---

## [Unreleased]

### Added

- Nouveaux modules WAF optionnels (anti‑bot, rate‑limit intelligent)
- Support Fastify (préparation)
- Hooks d’audit (préparation)

---

## [1.1.0] - 2026-05-09

### Added

- **WAF complet** : SQLi, XSS, LFI, RFI, Path Traversal, User‑Agent filtering
- **Pipeline WAF** configurable (activation/désactivation par module)
- **Middlewares avancés** : normalisation de chemins, validation d’en‑têtes, détection d’anomalies
- **Tests complets** pour tous les middlewares (100% coverage)
- **Exemples d’intégration** (Express, Hono, NestJS)

### Changed

- Réorganisation complète de l’architecture interne (`src/middleware/advanced`)
- Amélioration du typage global (User, Permissions, Guards)
- Documentation enrichie (README premium)

### Fixed

- Correction de faux positifs SQLi
- Correction de la validation JWT dans certains cas edge
- Correction du build ESM

---

## [1.0.27] - 2026-05-08

### Added

- **Système de rôles et permissions** (RBAC simple + permissions granulaires)
- Guards : `requireRole`, `requireAnyRole`, `requirePermissions`
- Tests unitaires complets pour les guards
- Normalisation du format utilisateur via `buildUser()`

### Changed

- Amélioration du système d’extraction de token
- Refactor du module JWT pour plus de stabilité

### Fixed

- Correction de la propagation d’erreurs dans les guards
- Correction de la validation de permissions vides

---

## [1.0.0] - 2026-05-06

### Added

- Version initiale de `@j3r3mcdev/auth-service`
- Hashing sécurisé (bcrypt)
- Génération et validation de JWT
- Extract-token (header, cookie, query)
- Validators (email, password, UUID)
- Build ESM complet
- Tests unitaires de base

## Roadmap

Voici les évolutions prévues pour les prochaines versions de la librairie.  
Cette roadmap est vivante et évoluera en fonction des besoins de la communauté.

---

### 🔥 Sécurité & WAF

- [ ] Module **Anti‑Bot** (détection comportementale + UA + IP reputation)
- [ ] **Rate‑Limit intelligent** (basé sur heuristiques + anomalies)
- [ ] **Règles dynamiques WAF** (chargées depuis un fichier ou une API)
- [ ] Support des **listes noires / blanches IP** avec cache en mémoire
- [ ] Ajout d’un module **CSRF** optionnel

---

### 🛡️ Auth & Permissions

- [ ] **Refresh Tokens** (rotation + invalidation)
- [ ] **Sessions sécurisées** (cookies HttpOnly + SameSite)
- [ ] Permissions **wildcard avancées** (`article:*, user:*`)
- [ ] **Héritage de rôles** (RBAC hiérarchique complet)
- [ ] Support des **policies** (style Laravel / NestJS)

---

### ⚙️ Frameworks & Intégrations

- [ ] Support **Fastify** complet
- [ ] Support **Bun** (middleware + WAF)
- [ ] Adaptateur **Next.js API Routes**
- [ ] Adaptateur **SvelteKit**

---

### 🧪 Qualité & Tests

- [ ] Tests E2E complets (Express + Hono)
- [ ] Tests de performance du WAF
- [ ] Benchmarks publics (SQLi, XSS, Path Traversal)

---

### 📦 DX & Documentation

- [ ] Documentation complète sur un site dédié (Docusaurus)
- [ ] Génération automatique des types & API docs
- [ ] Exemples avancés (microservices, multi‑tenants)
- [ ] Tutoriels vidéo

---

### 🚀 Vision long terme

- [ ] **Security Engine** complet (WAF + RBAC + audit + anti‑bot)
- [ ] Mode **Zero‑Config** pour projets simples
- [ ] Mode **Enterprise** pour API critiques

## Licence

Ce projet est distribué sous la licence **CC BY‑NC 4.0 (Attribution — Non Commercial)**.

Vous êtes autorisé à :

- utiliser le code
- le modifier
- le redistribuer
- créer des dérivés

À condition de :

- **créditer l’auteur original : Jérémy (j3r3mcdev)**
- **ne pas utiliser le code à des fins commerciales**
- **ne pas vendre le code, même modifié**
- **ne pas l’intégrer dans un produit ou service payant**

Toute utilisation commerciale est strictement interdite sans accord écrit de l’auteur.
