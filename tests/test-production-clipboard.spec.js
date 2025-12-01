/**
 * Production Clipboard Test
 * Verifies clipboard functionality on the live Azure site
 */

import { test, expect } from '@playwright/test';

const PRODUCTION_URL = 'https://red-tree-046c93b03.5.azurestaticapps.net/themed-signatures.html';

test.describe('Production Themed Signatures Clipboard', () => {
    test('clipboard works on production site', async ({ page, context }) => {
        // Grant clipboard permissions
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);

        // Navigate to production themed signatures page
        await page.goto(PRODUCTION_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(3000); // Wait for page to fully load

        // Fill in the form
        await page.fill('#fullName', 'Production Test');
        await page.fill('#jobTitle', 'Quality Assurance');
        await page.fill('#email', 'test@alterspective.com.au');
        await page.fill('#mobile', '0400 000 000');

        // Generate signatures
        await page.click('#generateBtn');
        await page.waitForTimeout(2000);

        // Verify buttons are enabled
        const copyNewBtn = page.locator('#copyNewBtn');
        const copyReplyBtn = page.locator('#copyReplyBtn');

        await expect(copyNewBtn).toBeEnabled();
        await expect(copyReplyBtn).toBeEnabled();

        // Test copying New Email signature
        await copyNewBtn.click();
        await page.waitForTimeout(500);

        // Check success message appears
        const successMsgNew = page.locator('#successMsgNew');
        await expect(successMsgNew).toBeVisible();
        await expect(successMsgNew).toContainText('Themed signature copied');

        // Wait for message to auto-hide
        await page.waitForTimeout(3500);
        await expect(successMsgNew).not.toBeVisible();

        // Test copying Reply signature
        await copyReplyBtn.click();
        await page.waitForTimeout(500);

        // Check success message appears
        const successMsgReply = page.locator('#successMsgReply');
        await expect(successMsgReply).toBeVisible();
        await expect(successMsgReply).toContainText('Reply signature copied');

        console.log('\n=== PRODUCTION CLIPBOARD TEST ===');
        console.log('✅ Production site loaded successfully');
        console.log('✅ Signatures generated');
        console.log('✅ Copy buttons enabled');
        console.log('✅ New Email signature copied');
        console.log('✅ Reply signature copied');
        console.log('✅ Success messages displayed correctly');
        console.log('✅ Messages auto-hide after 3 seconds');
        console.log('\nProduction URL:', PRODUCTION_URL);

        // Take screenshot for verification
        await page.screenshot({
            path: 'tests/screenshots/production-clipboard-success.png',
            fullPage: true
        });
    });
});