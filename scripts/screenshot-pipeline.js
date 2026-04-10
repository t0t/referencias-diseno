#!/usr/bin/env node
/**
 * Screenshot Pipeline — referencias-diseno
 *
 * Captura screenshots de URLs, optimiza a WebP, actualiza el HTML.
 *
 * Uso:
 *   node scripts/screenshot-pipeline.js                  # Solo pendientes (placeholder)
 *   node scripts/screenshot-pipeline.js --all            # Todas las cards
 *   node scripts/screenshot-pipeline.js --url URL        # Una URL concreta
 *   node scripts/screenshot-pipeline.js --optimize-only  # Solo optimizar JPG→WebP
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE = path.resolve(__dirname, '..');
const SCREENSHOTS_DIR = path.join(BASE, 'screenshots');
const OPTIMIZED_DIR = path.join(BASE, 'optimized');
const HTML_FILE = path.join(BASE, 'index.html');

const VIEWPORT = { width: 1400, height: 900, deviceScaleFactor: 1 };
const QUALITY = 90;
const WAIT_MS = 2500;

// ── Helpers ──

function slugify(url) {
  return url
    .replace(/^https?:\/\//, '')
    .replace(/\/+$/, '')
    .replace(/[^a-zA-Z0-9.-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

function parseHTML() {
  return fs.readFileSync(HTML_FILE, 'utf-8');
}

function findPendingCards(html) {
  const cards = [];
  const re = /<div class="reference-card"[^>]*>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g;
  let match;
  while ((match = re.exec(html)) !== null) {
    const block = match[0];
    const isPending = block.includes('Screenshot pendiente');
    const urlMatch = block.match(/href="([^"]+)"\s*target="_blank"\s*class="reference-link"/);
    const titleMatch = block.match(/class="reference-title">([^<]+)</);
    if (urlMatch) {
      cards.push({
        url: urlMatch[1],
        title: titleMatch ? titleMatch[1].trim() : slugify(urlMatch[1]),
        pending: isPending,
        block: block,
      });
    }
  }
  return cards;
}

// ── Capture ──

async function capture(browser, url, filename) {
  const page = await browser.newPage();
  try {
    await page.setViewport(VIEWPORT);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise((r) => setTimeout(r, WAIT_MS));

    const outPath = path.join(SCREENSHOTS_DIR, filename);
    await page.screenshot({ path: outPath, type: 'jpeg', quality: QUALITY, fullPage: false });
    console.log(`  ✓ ${filename}`);
    return true;
  } catch (err) {
    console.log(`  ✗ ${url} — ${err.message}`);
    return false;
  } finally {
    await page.close();
  }
}

// ── Optimize ──

function optimizeToWebP(jpgFile) {
  const basename = path.basename(jpgFile, path.extname(jpgFile));
  const webpPath = path.join(OPTIMIZED_DIR, `${basename}.webp`);
  try {
    execSync(`cwebp -q 80 -resize 700 0 "${jpgFile}" -o "${webpPath}"`, { stdio: 'pipe' });
    return true;
  } catch {
    return false;
  }
}

// ── Update HTML ──

function updateHTML(url, screenshotFile) {
  let html = parseHTML();
  const slug = slugify(url);

  // Find the placeholder div for this URL and replace with img
  const escapedUrl = url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const placeholderRe = new RegExp(
    `<div class="reference-image"[^>]*>Screenshot pendiente</div>\\s*` +
    `<a href="${escapedUrl}"`,
    'g'
  );

  const imgTag =
    `<img src="screenshots/${screenshotFile}" alt="Screenshot de ${slug}" class="reference-image" loading="lazy">\n` +
    `                    <a href="${url}"`;

  html = html.replace(placeholderRe, imgTag);
  fs.writeFileSync(HTML_FILE, html, 'utf-8');
}

// ── Main ──

async function main() {
  const args = process.argv.slice(2);
  const flagAll = args.includes('--all');
  const flagOptOnly = args.includes('--optimize-only');
  const flagUrl = args.includes('--url') ? args[args.indexOf('--url') + 1] : null;

  // Ensure dirs
  [SCREENSHOTS_DIR, OPTIMIZED_DIR].forEach((d) => {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
  });

  // Optimize-only mode
  if (flagOptOnly) {
    console.log('Optimizando JPG → WebP...');
    const files = fs.readdirSync(SCREENSHOTS_DIR).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));
    let ok = 0;
    for (const f of files) {
      if (optimizeToWebP(path.join(SCREENSHOTS_DIR, f))) ok++;
    }
    console.log(`${ok}/${files.length} optimizadas.`);
    return;
  }

  // Parse cards
  const html = parseHTML();
  let cards = findPendingCards(html);

  if (flagUrl) {
    cards = cards.filter((c) => c.url === flagUrl);
    if (!cards.length) {
      cards = [{ url: flagUrl, title: slugify(flagUrl), pending: true }];
    }
  } else if (!flagAll) {
    cards = cards.filter((c) => c.pending);
  }

  if (!cards.length) {
    console.log('No hay cards pendientes.');
    return;
  }

  console.log(`Capturando ${cards.length} screenshots...\n`);

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let captured = 0;
  let optimized = 0;

  for (const card of cards) {
    const filename = `${slugify(card.url)}.jpg`;

    // Capture
    const ok = await capture(browser, card.url, filename);
    if (!ok) continue;
    captured++;

    // Optimize
    if (optimizeToWebP(path.join(SCREENSHOTS_DIR, filename))) optimized++;

    // Update HTML
    if (card.pending) {
      updateHTML(card.url, filename);
    }

    // Pause between captures
    await new Promise((r) => setTimeout(r, 800));
  }

  await browser.close();

  console.log(`\n── Resultado ──`);
  console.log(`Capturadas: ${captured}/${cards.length}`);
  console.log(`Optimizadas: ${optimized}/${cards.length}`);
  console.log(`HTML actualizado.`);
}

main().catch((err) => {
  console.error('Error fatal:', err);
  process.exit(1);
});
