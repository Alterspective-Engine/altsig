/**
 * Test New Year Theme
 */

import { test, expect } from '@playwright/test';

const LIVE_SERVER_URL = 'http://127.0.0.1:5500/public/themed-signatures.html';

test.describe('New Year Theme Test', () => {
    test('generate New Year signature with sparkles', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        // Fill form
        await page.fill('#fullName', 'Sarah Williams');
        await page.fill('#jobTitle', 'Chief Executive Officer');
        await page.fill('#email', 'sarah.williams@alterspective.com.au');
        await page.fill('#mobile', '0411 222 333');

        // Disable auto-detect and select New Year theme
        await page.locator('#theme-auto-detect').uncheck();
        await page.waitForTimeout(500);

        await page.locator('.theme-option[data-theme-id="newYear"]').click();
        await page.waitForTimeout(1000);

        // Set to festive decoration level
        await page.locator('.decoration-buttons button[data-level="festive"]').click();
        await page.waitForTimeout(500);

        // Generate signature
        await page.click('#generateBtn');
        await page.waitForTimeout(1500);

        // Take screenshot
        await page.screenshot({
            path: 'tests/screenshots/newyear-signature-festive.png',
            fullPage: true
        });

        // Check for sparkles in the generated HTML
        const hasSparkles = await page.evaluate(() => {
            const preview = document.getElementById('previewNew');
            const html = preview.innerHTML;
            return html.includes('✨') && html.includes('🎊') && html.includes('🎉');
        });

        console.log('\n=== NEW YEAR THEME TEST ===');
        console.log('Has sparkle decorations:', hasSparkles);

        expect(hasSparkles).toBe(true);
    });
});