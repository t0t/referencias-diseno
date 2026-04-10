# Referencias de Diseño — Documentación

Showcase curado de sitios web excepcionales seleccionados por calidad estética y excelencia técnica.

## Propósito

Base de referencias de diseño para:
- Inspiración visual y conceptual
- Análisis de design systems, grids y tipografía
- Patrones de navegación y UX
- Estándares de calidad estética y técnica

## Arquitectura

```
referencias-diseno/
├── index.html                     # Showcase principal (43 cards)
├── assets/
│   ├── css/style.css              # CSS — Design System Sergio Forés
│   └── js/                        # JS vanilla modular
│       ├── main.js                # Filtrado por categoría
│       ├── favorites.js           # Favoritos (localStorage)
│       ├── mobile-menu.js         # Menú hamburguesa
│       └── scroll-indicator.js    # Scroll indicator / back-to-top
├── screenshots/                   # Capturas JPEG (1400x900, q90)
├── optimized/                     # WebP (cwebp -q 80 -resize 700)
├── scripts/
│   ├── screenshot-pipeline.js     # Pipeline automatizado (captura + optimiza + actualiza HTML)
│   ├── screenshot-generator.js    # Generador legacy (Puppeteer, lista hardcodeada)
│   ├── screenshot_generator.py    # Generador legacy (Selenium, lee del HTML)
│   └── performance/
│       └── optimize-images.sh     # Batch JPG → WebP
└── docs/                          # Esta documentación
```

## Tecnologías

- **HTML5** semántico
- **CSS** con tokens del Design System (tipografía 3 tallas φ, spacing áureo, colores semánticos, BEM)
- **JS vanilla** ES6+ modular
- **Puppeteer** para captura automatizada de screenshots
- **cwebp** para optimización de imágenes

## Cómo funciona

### Layout

Grid compacto tipo mosaico. `gap: 0`, imágenes con `aspect-ratio: 16/10`, contenido como overlay en hover (gradiente oscuro + texto blanco). En móvil: columna única con info siempre visible.

### Filtros

Cada card tiene `data-category` con una o más categorías: `portfolio`, `agency`, `experimental`, `cultural`, `minimalist`. El JS filtra mostrando/ocultando cards.

### Favoritos

Sistema de favoritos persistente con `localStorage`. Botón de corazón en cada card (visible en hover). Filtro "Favoritos" muestra solo las marcadas.

## Categorías

| Categoría | Descripción |
|-----------|-------------|
| Portfolio | Showcases personales de diseñadores/desarrolladores |
| Agency | Estudios y agencias de diseño/desarrollo |
| Experimental | Proyectos innovadores y conceptuales |
| Cultural | Instituciones, arte, proyectos culturales |
| Minimalist | Diseño reducido al esencial |
