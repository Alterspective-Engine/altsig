const { test } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

test('Dump page HTML', async ({ page }) => {
  const filePath = path.join(__dirname, 'signature-generator-v2.html');
  await page.goto(`file://${filePath}`);
  await page.waitForTimeout(1000);

  // Get the outer HTML of the page
  const html = await page.content();

  // Save to file
  fs.writeFileSync('page-dump.html', html);

  // Check first 500 characters for CSS bleeding
  const first500 = html.substring(0, 500);
  console.log('\n=== FIRST 500 CHARACTERS ===');
  console.log(first500);
  console.log('\n=== END ===\n');

  // Check if there's CSS text in the body
  const bodyStart = html.indexOf('<body');
  const bodyContent = html.substring(bodyStart, bodyStart + 500);
  console.log('\n=== BODY START (500 chars) ===');
  console.log(bodyContent);
  console.log('\n=== END ===\n');
});
