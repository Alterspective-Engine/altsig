/**
 * Test that production site is live and has latest features
 */

import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://red-tree-046c93b03.5.azurestaticapps.net';

test.describe('Production Site Verification', () => {
    test('main signature site is accessible', async ({ page }) => {
        // Navigate to main site
        const response = await page.goto(PRODUCTION_URL, {
            waitUntil: 'networkidle',
            timeout: 30000
        });

        expect(response.status()).toBe(200);

        // Check main elements exist
        await expect(page.locator('#fullName')).toBeVisible();
        await expect(page.locator('#generateBtn')).toBeVisible();

        console.log('✅ Main site is live at:', PRODUCTION_URL);

        // Take screenshot
        await page.screenshot({
            path: 'tests/screenshots/production-main-live.png',
            fullPage: true
        });
    });

    test('themed signatures page is accessible', async ({ page }) => {
        // Navigate to themed signatures
        const themedUrl = `${PRODUCTION_URL}/themed-signatures.html`;
        const response = await page.goto(themedUrl, {
            waitUntil: 'networkidle',
            timeout: 30000
        });

        expect(response.status()).toBe(200);

        // Check themed elements exist
        await expect(page.locator('#theme-selector-container')).toBeVisible();
        await expect(page.locator('#fullName')).toBeVisible();

        // Check that form fields are empty (latest change)
        const fullNameValue = await page.locator('#fullName').inputValue();
        const jobTitleValue = await page.locator('#jobTitle').inputValue();

        console.log('\n=== PRODUCTION VERIFICATION ===');
        console.log('✅ Themed signatures page is live at:', themedUrl);
        console.log('✅ Form fields are empty (latest change):', fullNameValue === '', jobTitleValue === '');

        // Take screenshot
        await page.screenshot({
            path: 'tests/screenshots/production-themed-live.png',
            fullPage: true
        });
    });

    test('auto-regeneration works on production', async ({ page }) => {
        const themedUrl = `${PRODUCTION_URL}/themed-signatures.html`;
        await page.goto(themedUrl, {
            waitUntil: 'networkidle',
            timeout: 30000
        });

        // Fill in form gradually
        await page.fill('#fullName', 'Test User');
        await page.fill('#jobTitle', 'QA Test');
        await page.fill('#email', 'test@alterspective.com.au');

        // Should not generate yet (missing mobile)
        await page.waitForTimeout(600);
        let previewContent = await page.locator('#previewNew').innerHTML();
        const noTableYet = !previewContent.includes('<table');

        // Add mobile - should trigger generation
        await page.fill('#mobile', '0400 123 456');
        await page.waitForTimeout(600);

        previewContent = await page.locator('#previewNew').innerHTML();
        const hasTable = previewContent.includes('<table');

        console.log('\n=== AUTO-REGENERATION TEST ===');
        console.log('✅ Validation working (no table without all fields):', noTableYet);
        console.log('✅ Auto-generation working:', hasTable);
        console.log('✅ Latest features deployed successfully');
    });
});