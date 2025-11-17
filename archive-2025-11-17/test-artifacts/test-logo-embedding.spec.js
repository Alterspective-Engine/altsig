const { test } = require('@playwright/test');
const path = require('path');

test('Verify logo is base64 embedded', async ({ page }) => {
  // Navigate to the file
  const filePath = path.join(__dirname, 'signature-generator-v2.html');
  await page.goto(`file://${filePath}`);
  await page.waitForTimeout(2000);

  // Click Generate Signature button
  await page.click('#generateBtn');
  await page.waitForTimeout(1000);

  // Get the generated HTML
  const generatedHTML = await page.evaluate(() => window.generatedHTML);

  console.log('\n=== CHECKING LOGO EMBEDDING ===\n');

  // Check if the HTML contains base64 image data
  const hasBase64Logo = generatedHTML.includes('data:image/png;base64,');
  const hasLogoPath = generatedHTML.includes('public/assets/images/Alterspective_Symbol_FA.png');

  console.log('✓ Base64 logo embedded:', hasBase64Logo);
  console.log('✓ Using fallback path instead:', hasLogoPath);

  // Extract and show first 100 chars of the img src
  const imgMatch = generatedHTML.match(/<img src="([^"]+)"/);
  if (imgMatch) {
    const imgSrc = imgMatch[1];
    const preview = imgSrc.substring(0, 100);
    console.log('\n✓ Image src (first 100 chars):', preview);
    console.log('✓ Image src length:', imgSrc.length);

    if (imgSrc.startsWith('data:image/png;base64,')) {
      console.log('\n✅ SUCCESS: Logo is base64 embedded!');
    } else {
      console.log('\n❌ ISSUE: Logo is using file path instead of base64');
    }
  }

  console.log('\n=== TEST COMPLETE ===\n');
});
