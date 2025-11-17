const { test } = require('@playwright/test');
const path = require('path');

test('Verify header logo displays', async ({ page }) => {
  // Navigate to the file
  const filePath = path.join(__dirname, 'signature-generator-v2.html');
  await page.goto(`file://${filePath}`);
  await page.waitForTimeout(2000);

  console.log('\n=== CHECKING HEADER LOGO ===\n');

  // Check if the header logo image exists and is loaded
  const headerLogo = page.locator('.header img[alt="Alterspective Logo"]');
  const logoExists = await headerLogo.count() > 0;
  
  console.log('✓ Header logo element exists:', logoExists);

  if (logoExists) {
    const logoSrc = await headerLogo.getAttribute('src');
    console.log('✓ Header logo src:', logoSrc);

    // Check if the image loaded successfully (naturalWidth > 0)
    const isLoaded = await headerLogo.evaluate((img) => {
      return img.complete && img.naturalWidth > 0;
    });
    
    console.log('✓ Header logo loaded successfully:', isLoaded);

    if (isLoaded) {
      console.log('\n✅ SUCCESS: Header logo is displaying!');
    } else {
      console.log('\n❌ ISSUE: Header logo failed to load');
    }
  }

  // Take screenshot
  await page.screenshot({ path: 'test-header-logo.png', fullPage: true });

  console.log('\n=== TEST COMPLETE ===\n');
});
