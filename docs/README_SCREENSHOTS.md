# Screenshot Pipeline

## Pipeline automatizado

El script `scripts/screenshot-pipeline.js` gestiona todo el ciclo:

1. Parsea `index.html` buscando cards con "Screenshot pendiente"
2. Captura cada URL con Puppeteer (Chrome headless, 1400x900, JPEG q90)
3. Optimiza a WebP con cwebp (q80, resize 700px ancho)
4. Actualiza el HTML: sustituye el placeholder por `<img>`

### Uso

```bash
# Solo pendientes (cards con placeholder)
node scripts/screenshot-pipeline.js

# Todas las cards
node scripts/screenshot-pipeline.js --all

# Una URL concreta
node scripts/screenshot-pipeline.js --url https://ejemplo.com

# Solo optimizar JPG existentes a WebP
node scripts/screenshot-pipeline.js --optimize-only
```

### Requisitos

- Node.js + Puppeteer (`npm install`)
- Google Chrome instalado en `/Applications/Google Chrome.app/`
- cwebp (`brew install webp`)

## Configuración técnica

| Parámetro | Valor |
|-----------|-------|
| Viewport | 1400 x 900 |
| Formato captura | JPEG quality 90 |
| Espera post-carga | 2500ms (networkidle2 + pausa) |
| Formato optimizado | WebP quality 80, 700px ancho |
| Directorio capturas | `screenshots/` |
| Directorio optimizado | `optimized/` |

## Naming

Los archivos se nombran por slug de la URL:
- `https://www.tosen.es/` → `www.tosen.es.jpg` / `www.tosen.es.webp`
- `https://kobykooba.com/#our-work` → `kobykooba.com-our-work.jpg`

## Estado actual

- 43 referencias totales
- 42 screenshots capturados
- 1 pendiente: nippori.lamm.tokyo (timeout — servidor japonés lento)
