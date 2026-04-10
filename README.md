# REFS — Showcase de referencias de diseño

**Live:** https://t0t.github.io/referencias-diseno/

Galería curada de 50 sitios web excepcionales seleccionados por calidad estética y excelencia técnica.

## Arquitectura

```
referencias-diseno/
├── index.html                     # Showcase principal (50 cards)
├── assets/
│   ├── css/style.css              # CSS — Design System Sergio Forés (BEM, tokens canónicos)
│   └── js/
│       ├── main.js                # Core
│       ├── favorites.js           # Sistema de favoritos (localStorage)
│       └── scroll-indicator.js    # Indicador scroll / back-to-top
├── screenshots/                   # Capturas JPEG (1400×900)
├── optimized/                     # WebP optimizadas (cwebp -q 80 -resize 700)
├── scripts/
│   ├── screenshot-pipeline.js     # Pipeline: captura → optimiza → actualiza HTML
│   └── performance/
│       └── optimize-images.sh     # Conversión batch JPG → WebP
└── docs/                          # Documentación técnica
```

## Stack

- **HTML5** semántico + **CSS** con tokens del Design System (tipografía 3 tallas, spacing áureo, colores semánticos)
- **BEM** estricto: `.c-ref`, `.c-ref__img`, `.c-ref__info`, `.c-header`, `.c-theme-toggle`
- **JS vanilla** modular
- **Puppeteer** + **cwebp** para pipeline de screenshots
- **Dark mode** con toggle sol/luna, persistente en localStorage

## Uso

### Ver en local

```bash
python3 -m http.server 8000
# → http://localhost:8000
```

### Añadir una referencia nueva

```bash
cd 2-FRAGUA/referencias-diseno
node scripts/screenshot-pipeline.js --url https://ejemplo.com
```

Captura screenshot, optimiza a WebP y guarda en `screenshots/` + `optimized/`. Luego añadir la card al HTML.

### Solo optimizar imágenes existentes

```bash
node scripts/screenshot-pipeline.js --optimize-only
```

## 50 referencias (por categoría)

- **Portfolio** — Verde, Olivier Guilleux, Ben Elwyn, Camila Rosa, Adovasio, Tosen, Benvenusa
- **Agency** — Temper Studio, Commission Studio, Flying Bisons, Koby Kooba, Zoomo Estudio, Room 6x8, Route
- **Experimental** — Isomorphic Labs, Aptos Network, Godly, Oh Dada, Hover States, Antidote
- **Cultural** — Augustinus Fonden, CCNCN 2022, Paul Smith Foundation, Nippori Lamm
- **Directory** — siteInspire, Godly, Hover States
- **E-commerce** — Clue Perfumery, Rye Island

## Layout

Grid compacto tipo mosaico. Gap 0, imágenes con `aspect-ratio: 16/10`, info como overlay en hover (gradiente oscuro + texto blanco). En móvil: columna única con info visible. Dark mode con toggle.

---

Proyecto personal de Sergio Forés.
Última actualización: 10 abril 2026.
