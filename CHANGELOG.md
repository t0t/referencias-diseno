# Changelog

## 2026-04-10

### v4.0 — Rediseño completo

- CSS reescrito con Design System Sergio Forés (tokens canónicos, BEM, tipografía 3 tallas φ, spacing áureo)
- Layout compacto tipo mosaico: grid gap 0, aspect-ratio 16/10, overlay en hover
- Dark mode con toggle sol/luna (persistente en localStorage)
- Eliminado nav de filtros del header
- Eliminado Service Worker y critical CSS inline (causaban conflictos de cache)
- Eliminado CSS async loader
- Clases migradas a BEM: `.c-ref`, `.c-ref__img`, `.c-ref__info`, `.c-header`, `.c-theme-toggle`

### Screenshot pipeline

- Nuevo `scripts/screenshot-pipeline.js` unificado (Puppeteer + cwebp)
- Detecta placeholders en HTML, captura, optimiza WebP, actualiza HTML
- Flags: `--url`, `--all`, `--optimize-only`

### Contenido

- 50 referencias (de 32 originales)
- Nuevas: Isomorphic Labs, UBS, Augustinus Fonden, Zoomo Estudio, Aptos Network, Rye Island, Adovasio, Tosen, Koby Kooba, Nippori Lamm, Godly, Oh Dada, siteInspire, Benvenusa, Hover States, Route, Room 6x8, Antidote

### Infraestructura

- Repo GitHub: github.com/t0t/referencias-diseno
- GitHub Pages: t0t.github.io/referencias-diseno
- Documentación actualizada (README, docs/)

---

## Pre-v4 (legacy)

- 32 referencias con screenshots manuales
- CSS propio sin design system
- Service Worker + critical CSS inline + async loader
- Scripts separados: screenshot-generator.js (Puppeteer) + screenshot_generator.py (Selenium)
