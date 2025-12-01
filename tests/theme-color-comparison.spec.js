/**
 * Theme Color Comparison Test
 * Generates signatures with different themes to show color differences
 */

import { test, expect } from '@playwright/test';

const LIVE_SERVER_URL = 'http://127.0.0.1:5500/public/themed-signatures.html';

test.describe('Theme Color Comparison', () => {
    test('generate Christmas vs Standard comparison', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        // Fill form
        await page.fill('#fullName', 'John Smith');
        await page.fill('#jobTitle', 'Senior Consultant');
        await page.fill('#email', 'john.smith@alterspective.com.au');
        await page.fill('#mobile', '0412 345 678');

        // Ensure auto-detect is ON (should be Christmas)
        const autoDetect = await page.locator('#theme-auto-detect');
        if (!await autoDetect.isChecked()) {
            await autoDetect.check();
            await page.waitForTimeout(500);
        }

        // Generate Christmas signature
        await page.click('#generateBtn');
        await page.waitForTimeout(1500);

        // Take screenshot of Christmas theme
        await page.screenshot({
            path: 'tests/screenshots/christmas-signature-full.png',
            fullPage: true
        });

        // Log the Christmas colors being used
        const christmasSignature = await page.evaluate(() => {
            const preview = document.getElementById('previewNew');
            const html = preview.innerHTML;

            // Extract colors from the HTML
            const secondaryMatch = html.match(/color:\s*#165B33/);
            const accentMatch = html.match(/color:\s*#EA4630/);
            const dividerMatch = html.match(/border-right:\s*\d+px\s+solid\s+#BB2528/);

            return {
                hasSecondarColor: !!secondaryMatch,
                hasAccentColor: !!accentMatch,
                hasDividerColor: !!dividerMatch,
                htmlSnippet: html.substring(0, 500)
            };
        });

        console.log('\n=== CHRISTMAS THEME COLORS ===');
        console.log('Has Christmas secondary green (#165B33):', christmasSignature.hasSecondaryColor);
        console.log('Has Christmas accent red (#EA4630):', christmasSignature.hasAccentColor);
        console.log('Has Christmas divider red (#BB2528):', christmasSignature.hasDividerColor);

        // Now switch to Standard theme manually
        await page.locator('#theme-auto-detect').uncheck();
        await page.waitForTimeout(500);

        await page.locator('.theme-option[data-theme-id="standard"]').click();
        await page.waitForTimeout(1000);

        // Re-generate with Standard theme
        await page.click('#generateBtn');
        await page.waitForTimeout(1500);

        // Take screenshot of Standard theme
        await page.screenshot({
            path: 'tests/screenshots/standard-signature-full.png',
            fullPage: true
        });

        // Log the Standard colors
        const standardSignature = await page.evaluate(() => {
            const preview = document.getElementById('previewNew');
            const html = preview.innerHTML;

            // Extract colors from the HTML
            const secondaryMatch = html.match(/color:\s*#2C8248/);
            const accentMatch = html.match(/color:\s*#ABDD65/);
            const dividerMatch = html.match(/border-right:\s*\d+px\s+solid\s+#2C8248/);

            return {
                hasSecondaryColor: !!secondaryMatch,
                hasAccentColor: !!accentMatch,
                hasDividerColor: !!dividerMatch
            };
        });

        console.log('\n=== STANDARD THEME COLORS ===');
        console.log('Has Standard secondary green (#2C8248):', standardSignature.hasSecondaryColor);
        console.log('Has Standard accent lime (#ABDD65):', standardSignature.hasAccentColor);
        console.log('Has Standard divider green (#2C8248):', standardSignature.hasDividerColor);

        // Verify they're different
        console.log('\n=== COMPARISON ===');
        console.log('Themes are different:',
            christmasSignature.hasAccentColor !== standardSignature.hasAccentColor ||
            christmasSignature.hasDividerColor !== standardSignature.hasDividerColor
        );
    });

    test('show all three decoration levels', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        // Fill form
        await page.fill('#fullName', 'Sarah Johnson');
        await page.fill('#jobTitle', 'Marketing Director');
        await page.fill('#email', 'sarah.johnson@alterspective.com.au');
        await page.fill('#mobile', '0499 876 543');

        // Test Minimal decoration
        await page.locator('.decoration-buttons button[data-level="minimal"]').click();
        await page.waitForTimeout(500);
        await page.click('#generateBtn');
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'tests/screenshots/christmas-minimal.png', fullPage: true });

        // Test Normal decoration
        await page.locator('.decoration-buttons button[data-level="normal"]').click();
        await page.waitForTimeout(500);
        await page.click('#generateBtn');
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'tests/screenshots/christmas-normal.png', fullPage: true });

        // Test Festive decoration
        await page.locator('.decoration-buttons button[data-level="festive"]').click();
        await page.waitForTimeout(500);
        await page.click('#generateBtn');
        await page.waitForTimeout(1500);
        await page.screenshot({ path: 'tests/screenshots/christmas-festive.png', fullPage: true });

        console.log('\n=== DECORATION LEVELS ===');
        console.log('✓ Minimal decoration screenshot saved');
        console.log('✓ Normal decoration screenshot saved');
        console.log('✓ Festive decoration screenshot saved');
    });
});
