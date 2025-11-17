const { test, expect } = require('@playwright/test');
const path = require('path');

test('Simple check - no cache', async ({ page }) => {
  // Clear cache before test
  await page.context().clearCookies();

  // Navigate to the file with cache bypass
  const filePath = path.join(__dirname, 'signature-generator-v2.html');
  const timestamp = Date.now();
  await page.goto(`file://${filePath}?t=${timestamp}`, {
    waitUntil: 'networkidle'
  });

  console.log('\n=== PAGE LOADED ===');

  // Hard reload to bypass cache
  await page.reload({ waitUntil: 'networkidle' });

  console.log('=== PAGE RELOADED (CACHE CLEARED) ===\n');

  // Wait for page to be ready
  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({ path: 'test-simple-screenshot.png', fullPage: true });

  // Check if logo path is correct in the page source
  const pageContent = await page.content();

  const hasCorrectHeaderLogoPath = pageContent.includes('public/assets/images/Alterspective_Logo_reversed_FA.png');
  const hasCorrectJSLogoPath = pageContent.includes('public/assets/images/Alterspective_Symbol_FA.png');
  const hasGreenLinkCSS = pageContent.includes('a { color: #2C8248 !important');

  console.log('✓ Header logo path correct:', hasCorrectHeaderLogoPath);
  console.log('✓ JS logo path correct:', hasCorrectJSLogoPath);
  console.log('✓ Green link CSS present:', hasGreenLinkCSS);

  // Try to find the generate button
  const generateButton = page.locator('button:has-text("Generate Signature")');
  const buttonExists = await generateButton.count() > 0;
  console.log('✓ Generate button found:', buttonExists);

  if (buttonExists) {
    await generateButton.click();
    await page.waitForTimeout(1500);

    // Check preview content
    const preview = page.locator('#preview');
    const previewHTML = await preview.innerHTML();

    console.log('\n=== SIGNATURE GENERATED ===');
    console.log('✓ Preview has content:', previewHTML.length > 100);
    console.log('✓ Green color in signature:', previewHTML.includes('#2C8248'));
    console.log('✓ !important in signature:', previewHTML.includes('!important'));

    // Take another screenshot
    await page.screenshot({ path: 'test-after-generate.png', fullPage: true });
  }

  console.log('\n=== TEST COMPLETE ===\n');
});
