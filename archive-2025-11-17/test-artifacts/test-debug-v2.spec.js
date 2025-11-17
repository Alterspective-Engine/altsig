const { test, expect } = require('@playwright/test');
const path = require('path');

test('Debug signature-generator-v2.html page load', async ({ page }) => {
  // Listen for console messages
  page.on('console', msg => {
    console.log(`BROWSER ${msg.type()}: ${msg.text()}`);
  });

  // Listen for page errors
  page.on('pageerror', error => {
    console.log(`PAGE ERROR: ${error.message}`);
  });

  // Listen for dialog (alerts)
  page.on('dialog', async dialog => {
    console.log(`DIALOG ${dialog.type()}: ${dialog.message()}`);
    await dialog.accept();
  });

  // Navigate to the file
  const filePath = path.join(__dirname, 'signature-generator-v2.html');
  await page.goto(`file://${filePath}`);

  // Wait a bit for page to load
  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({ path: 'debug-v2-screenshot.png', fullPage: true });

  // Check if preview has content
  const previewContent = await page.locator('#preview').textContent();
  console.log('Preview content:', previewContent);

  // Check if buttons are enabled
  const copyBtnDisabled = await page.locator('#copyBtn').isDisabled();
  const downloadBtnDisabled = await page.locator('#downloadBtn').isDisabled();
  console.log('Copy button disabled:', copyBtnDisabled);
  console.log('Download button disabled:', downloadBtnDisabled);

  // Check for any visible alerts or error messages
  const alerts = await page.locator('[role="alert"]').count();
  console.log('Number of alerts:', alerts);

  // Check if logo image exists in preview
  const logoInPreview = await page.locator('#preview img').count();
  console.log('Logo images in preview:', logoInPreview);

  if (logoInPreview > 0) {
    const logoSrc = await page.locator('#preview img').first().getAttribute('src');
    console.log('Logo src:', logoSrc);
  }
});
