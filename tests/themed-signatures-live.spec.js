/**
 * Themed Signatures Live Server Tests
 * Tests against running live server at http://127.0.0.1:5500
 */

import { test, expect } from '@playwright/test';

const LIVE_SERVER_URL = 'http://127.0.0.1:5500/public/themed-signatures.html';

test.describe('Themed Signatures - Live Server Tests', () => {
    test('page loads without errors', async ({ page }) => {
        // Listen for console errors
        const consoleErrors = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                consoleErrors.push(msg.text());
            }
        });

        // Navigate to page
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });

        // Wait for JavaScript to execute
        await page.waitForTimeout(1000);

        // Check for errors
        console.log('Console errors:', consoleErrors);
        expect(consoleErrors.length).toBe(0);

        // Take screenshot
        await page.screenshot({ path: 'tests/screenshots/themed-signatures-loaded.png', fullPage: true });
    });

    test('theme selector renders correctly', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Check theme selector exists
        await expect(page.locator('.theme-selector')).toBeVisible();

        // Check theme options are present
        const themeOptions = await page.locator('.theme-option').count();
        expect(themeOptions).toBeGreaterThan(0);

        // Take screenshot
        await page.screenshot({ path: 'tests/screenshots/theme-selector.png' });
    });

    test('can switch themes', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Disable auto-detect
        await page.locator('#theme-auto-detect').uncheck();
        await page.waitForTimeout(500);

        // Click Christmas theme
        await page.locator('.theme-option[data-theme-id="christmas"]').click();
        await page.waitForTimeout(500);

        // Take screenshot of Christmas theme
        await page.screenshot({ path: 'tests/screenshots/christmas-theme.png', fullPage: true });

        // Click New Year theme
        await page.locator('.theme-option[data-theme-id="newYear"]').click();
        await page.waitForTimeout(500);

        // Take screenshot of New Year theme
        await page.screenshot({ path: 'tests/screenshots/newyear-theme.png', fullPage: true });
    });

    test('can generate themed signatures', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Fill in form
        await page.fill('#fullName', 'Test User');
        await page.fill('#jobTitle', 'Quality Tester');
        await page.fill('#email', 'test@alterspective.com.au');
        await page.fill('#mobile', '0400 123 456');

        // Generate signatures
        await page.click('#generateBtn');
        await page.waitForTimeout(1000);

        // Check previews are populated
        const newPreview = await page.locator('#previewNew table').count();
        const replyPreview = await page.locator('#previewReply table').count();

        expect(newPreview).toBeGreaterThan(0);
        expect(replyPreview).toBeGreaterThan(0);

        // Check buttons are enabled
        await expect(page.locator('#copyNewBtn')).toBeEnabled();
        await expect(page.locator('#downloadNewBtn')).toBeEnabled();

        // Take screenshot
        await page.screenshot({ path: 'tests/screenshots/generated-themed-signatures.png', fullPage: true });
    });

    test('decoration levels work', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Click minimal
        await page.locator('.decoration-buttons button[data-level="minimal"]').click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'tests/screenshots/decoration-minimal.png' });

        // Click festive
        await page.locator('.decoration-buttons button[data-level="festive"]').click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: 'tests/screenshots/decoration-festive.png' });
    });

    test('navigation links work', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Click standard signatures link
        await page.click('.theme-nav-link');
        await page.waitForTimeout(1000);

        // Should be on index.html
        expect(page.url()).toContain('index.html');

        // Take screenshot
        await page.screenshot({ path: 'tests/screenshots/navigation-to-standard.png' });
    });
});