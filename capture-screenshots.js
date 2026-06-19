/**
 * TrithuctreBooks — UI Screenshot Capture
 * Dùng Playwright để chụp giao diện tại các viewport chuẩn.
 * Chạy: node capture-screenshots.js
 * Yêu cầu: server đang chạy tại http://localhost:8080
 *          (hoặc double-click start-server.bat trước)
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE_URL = 'http://localhost:8080/index.html';
const OUT_DIR = path.join(__dirname, 'output', 'screenshots');
const REPORT_PATH = path.join(__dirname, 'report.json');

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'tablet-768',   width: 768,  height: 1024 },
  { name: 'mobile-390',   width: 390,  height: 844  },
];

// Sections to screenshot (scroll position in px)
const SECTIONS = [
  { name: 'banner-slider',   scrollY: 0 },
  { name: 'sach-moi',        scrollY: 900 },
  { name: 'combo-sach-hay',  scrollY: 2200 },
  { name: 'uu-dai-thang',    scrollY: 3400 },
  { name: 'banner-2col',     scrollY: 4200 },
];

async function run() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

  const report = { status: 'running', timestamp: new Date().toISOString(), results: [] };
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));

  const browser = await chromium.launch({ headless: true });

  for (const vp of VIEWPORTS) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });

    try {
      await page.goto(BASE_URL, { waitUntil: 'networkidle', timeout: 20000 });
      await page.waitForTimeout(2500); // wait for owl carousel init

      // Full-page screenshot
      const fullPath = path.join(OUT_DIR, `${vp.name}-fullpage.png`);
      await page.screenshot({ path: fullPath, fullPage: true });
      report.results.push({ viewport: vp.name, file: fullPath, status: 'ok' });

      // Section screenshots
      for (const sec of SECTIONS) {
        await page.evaluate(y => window.scrollTo(0, y), sec.scrollY);
        await page.waitForTimeout(500);
        const secPath = path.join(OUT_DIR, `${vp.name}-${sec.name}.png`);
        await page.screenshot({ path: secPath });
        report.results.push({ viewport: vp.name, section: sec.name, file: secPath, status: 'ok' });
      }

    } catch (err) {
      report.results.push({ viewport: vp.name, status: 'error', error: err.message });
    }

    await page.close();
  }

  await browser.close();

  report.status = 'done';
  report.completedAt = new Date().toISOString();
  fs.writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
  console.log('Screenshots saved to:', OUT_DIR);
  console.log('Report written to:', REPORT_PATH);
}

run().catch(err => {
  const report = { status: 'failed', error: err.message, timestamp: new Date().toISOString() };
  require('fs').writeFileSync(require('path').join(__dirname, 'report.json'), JSON.stringify(report, null, 2));
  console.error(err);
  process.exit(1);
});
