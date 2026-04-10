# REFS — Showcase de referencias de diseño

**Live:** https://t0t.github.io/referencias-diseno/

Galería curada de sitios web excepcionales. 43 referencias seleccionadas por calidad estética y excelencia técnica.

## Arquitectura

```
referencias-diseno/
├── index.html                     # Showcase principal
├── assets/
│   ├── css/style.css              # CSS — Design System Sergio Forés (BEM, tokens canónicos)
│   └── js/
│       ├── main.js                # Filtrado por categoría
│       ├── favorites.js           # Sistema de favoritos (localStorage)
│       ├── mobile-menu.js         # Menú hamburguesa responsive
│       └── scroll-indicator.js    # Indicador scroll / back-to-top
├── screenshots/                   # Capturas JPEG (1400×900)
├── optimized/                     # WebP optimizadas (cwebp -q 80 -resize 700)
├── scripts/
│   ├── screenshot-pipeline.js     # Pipeline: captura → optimiza → actualiza HTML
│   ├── performance/
│   │   └── optimize-images.sh     # Conversión batch JPG → WebP
│   └── testing/                   # Scripts de performance
└── docs/                          # Auditorías y documentación técnica
```

## Stack

- **HTML5** semántico + **CSS** con tokens del Design System (tipografía 3 tallas, spacing áureo, colores semánticos)
- **BEM** estricto: `.c-ref`, `.c-ref__img`, `.c-ref__info`, `.c-header`, `.c-filters`
- **JS vanilla** modular (filtros, favoritos, mobile menu)
- **Puppeteer** + **cwebp** para pipeline de screenshots

## Uso

### Ver en local

```bash
# Desde la raíz de CEREBRO-DIGITAL
python3 -m http.server 8000
# → http://localhost:8000/2-FRAGUA/referencias-diseno/
```

### Añadir una referencia nueva

1. Editar `index.html` — añadir card con placeholder
2. Ejecutar pipeline:

```bash
cd 2-FRAGUA/referencias-diseno
node scripts/screenshot-pipeline.js
```

El pipeline detecta cards con "Screenshot pendiente", captura la web, optimiza a WebP y actualiza el HTML automáticamente.

### Solo optimizar imágenes existentes

```bash
node scripts/screenshot-pipeline.js --optimize-only
```

### Capturar una URL concreta

```bash
node scripts/screenshot-pipeline.js --url https://ejemplo.com
```

## 43 referencias (por categoría)

- **Portfolio** — Verde, Olivier Guilleux, Ben Elwyn, Camila Rosa, Adovasio, Tosen, sergio-dev refs
- **Agency** — Temper Studio, Commission Studio, Flying Bisons, Koby Kooba, Zoomo Estudio, etc.
- **Experimental** — Isomorphic Labs, Aptos Network, Godly, Ancient Artifacts, etc.
- **Cultural** — Augustinus Fonden, CCNCN 2022, Paul Smith Foundation, Nippori Lamm, etc.
- **E-commerce** — Clue Perfumery, Rye Island, etc.

## Layout

Grid compacto tipo mosaico. Gap 0, imágenes con `aspect-ratio: 16/10`, info como overlay en hover (gradiente oscuro + texto blanco). En móvil: columna única con info visible.

---

Proyecto personal de Sergio Forés.
Última actualización: abril 2026.
