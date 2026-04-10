# Performance

## Optimizaciones actuales

### Imágenes
- Screenshots originales JPEG en `screenshots/` (~10MB total)
- Versiones WebP optimizadas en `optimized/` (~1.3MB, -85%)
- Pipeline automatizado: `screenshot-pipeline.js`

### CSS
- CSS único (`style.css`) con tokens del Design System
- Sin critical CSS inline ni async loader (eliminados por simplicidad)
- Sin Service Worker (eliminado — causaba conflictos de cache)

### Layout
- Grid CSS nativo con `gap: 0` — layout compacto tipo mosaico
- `aspect-ratio: 16/10` en todas las imágenes — filas uniformes
- `contain: layout style` en cards — aislamiento de rendering
- Lazy loading nativo (`loading="lazy"`) en imágenes

### JS
- Vanilla JS modular, sin frameworks
- Carga directa (sin async loader) — ~4 scripts ligeros

## Pendiente

- Migrar `<img>` a `<picture>` con fuente WebP y fallback JPEG
- Evaluar si reintroducir Service Worker para offline
- Lighthouse audit post-rediseño
