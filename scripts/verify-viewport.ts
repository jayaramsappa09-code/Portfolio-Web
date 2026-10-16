import { chromium } from '/root/.bun/install/global/node_modules/playwright';

async function verify() {
  const browser = await chromium.launch({
    headless: true,
  });

  // Test 1: Desktop 1440x900
  console.log('Testing 1440x900 desktop...');
  const pageDesktop = await browser.newPage({
    viewport: { width: 1440, height: 900 },
  });

  const consoleErrors: string[] = [];
  pageDesktop.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  await pageDesktop.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await pageDesktop.waitForTimeout(1000);

  const desktopOverflow = await pageDesktop.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  console.log('Desktop 1440x900 result:', desktopOverflow);
  await pageDesktop.screenshot({ path: '/tmp/screenshot-desktop-1440.png', fullPage: false });
  await pageDesktop.close();

  // Test 2: Mobile 390x844
  console.log('Testing 390x844 mobile...');
  const pageMobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
  });

  pageMobile.on('console', (msg) => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  await pageMobile.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await pageMobile.waitForTimeout(1000);

  const mobileOverflow = await pageMobile.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      hasOverflow: document.documentElement.scrollWidth > window.innerWidth,
    };
  });

  console.log('Mobile 390x844 result:', mobileOverflow);
  await pageMobile.screenshot({ path: '/tmp/screenshot-mobile-390.png', fullPage: false });
  await pageMobile.close();

  await browser.close();

  console.log('Console Errors:', consoleErrors);
  if (!desktopOverflow.hasOverflow && !mobileOverflow.hasOverflow && consoleErrors.length === 0) {
    console.log('SUCCESS: ZERO HORIZONTAL OVERFLOW AND ZERO CONSOLE ERRORS');
  } else {
    console.log('REVIEW RESULT:', { desktopOverflow, mobileOverflow, consoleErrors });
  }
}

verify().catch((err) => {
  console.error(err);
  process.exit(1);
});
