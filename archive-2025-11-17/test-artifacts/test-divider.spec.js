const { test, expect } = require('@playwright/test');
const path = require('path');

test('Verify vertical divider appears in signature', async ({ page }) => {
    const generatorPath = path.join(__dirname, 'signature-generator-v2.html');

    // Navigate to the generator
    await page.goto(`file://${generatorPath}`);
    await page.waitForTimeout(2000);

    // Generate signature
    await page.click('button:has-text("Generate Signature")');
    await page.waitForTimeout(500);

    // Check generated HTML for divider
    const generatedHTML = await page.evaluate(() => window.generatedHTML);

    console.log('\n=== DIVIDER CHECK ===\n');

    // Check for border-left style
    const hasBorderDivider = generatedHTML.includes('border-left: 2px solid #2C8248');
    console.log('1. Has border-left divider:', hasBorderDivider);

    // Check for green color
    const hasGreenColor = generatedHTML.includes('#2C8248');
    console.log('2. Has green color (#2C8248):', hasGreenColor);

    // Extract divider HTML
    const dividerMatch = generatedHTML.match(/<!-- Vertical Divider -->[\s\S]*?<\/td>/);
    if (dividerMatch) {
        console.log('3. Divider HTML found:');
        console.log(dividerMatch[0].substring(0, 200) + '...');
    } else {
        console.log('3. Divider HTML: NOT FOUND');
    }

    // Check in preview
    const previewDivider = page.locator('#preview td[style*="border-left"]');
    const dividerCount = await previewDivider.count();
    console.log('4. Divider elements in preview:', dividerCount);

    if (dividerCount > 0) {
        const dividerStyle = await previewDivider.first().getAttribute('style');
        console.log('5. Divider style:', dividerStyle);
    }

    console.log('\n=== END DIVIDER CHECK ===\n');

    expect(hasBorderDivider).toBe(true);
    expect(hasGreenColor).toBe(true);
});
