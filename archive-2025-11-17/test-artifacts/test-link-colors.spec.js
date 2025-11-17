const { test, expect } = require('@playwright/test');
const path = require('path');

test('Verify green link colors in signature', async ({ page }) => {
  // Navigate to the file
  const filePath = path.join(__dirname, 'signature-generator-v2.html');
  await page.goto(`file://${filePath}`);

  // Wait for page to load
  await page.waitForTimeout(2000);

  // Click Generate Signature button
  await page.click('#generateBtn');

  // Wait for signature to generate
  await page.waitForTimeout(1000);

  // Get the generated HTML from the preview
  const previewHTML = await page.locator('#preview').innerHTML();

  console.log('\n=== CHECKING LINK COLORS ===\n');

  // Check if the HTML contains the green color (#2C8248)
  const hasGreenColor = previewHTML.includes('#2C8248');
  const hasImportant = previewHTML.includes('!important');

  console.log('✓ Green color (#2C8248) found in HTML:', hasGreenColor);
  console.log('✓ !important flag found in HTML:', hasImportant);

  // Extract link styles
  const emailLinkMatch = previewHTML.match(/mailto:[^>]+style="([^"]+)"/);
  const phoneLinkMatch = previewHTML.match(/tel:[^>]+style="([^"]+)"/);
  const websiteLinkMatch = previewHTML.match(/https:\/\/[^>]+style="([^"]+)"/);

  if (emailLinkMatch) {
    console.log('\nEmail link style:', emailLinkMatch[1]);
  }
  if (phoneLinkMatch) {
    console.log('Phone link style:', phoneLinkMatch[1]);
  }
  if (websiteLinkMatch) {
    console.log('Website link style:', websiteLinkMatch[1]);
  }

  // Check for CSS in head
  const headContent = await page.evaluate(() => {
    const head = document.querySelector('head');
    return head ? head.innerHTML : '';
  });

  const hasStyleTag = headContent.includes('<style');
  const hasLinkColorCSS = headContent.includes('a { color: #2C8248');

  console.log('\n✓ <style> tag in <head>:', hasStyleTag);
  console.log('✓ Link color CSS rule:', hasLinkColorCSS);

  // Verify expectations
  expect(hasGreenColor).toBe(true);
  expect(hasImportant).toBe(true);

  console.log('\n=== ALL CHECKS PASSED ===\n');
});
