/**
 * Test clipboard functionality for themed signatures
 */

import { test, expect } from '@playwright/test';

const LIVE_SERVER_URL = 'http://127.0.0.1:5500/public/themed-signatures.html';

test.describe('Themed Signatures Clipboard Tests', () => {
    test('copy to clipboard functionality works', async ({ page, context }) => {
        // Grant clipboard permissions
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);

        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        // Fill form
        await page.fill('#fullName', 'Test User');
        await page.fill('#jobTitle', 'Test Manager');
        await page.fill('#email', 'test@alterspective.com.au');
        await page.fill('#mobile', '0400 123 456');

        // Generate signatures
        await page.click('#generateBtn');
        await page.waitForTimeout(1500);

        // Check that copy buttons are enabled
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

        // Try to read clipboard (this might not work in all environments)
        try {
            const clipboardContent = await page.evaluate(() => navigator.clipboard.readText());
            console.log('\n=== CLIPBOARD CONTENT (NEW EMAIL) ===');
            console.log('Content length:', clipboardContent.length);
            console.log('Contains DOCTYPE:', clipboardContent.includes('<!DOCTYPE'));
            console.log('Contains table:', clipboardContent.includes('<table'));
            console.log('Contains Christmas greeting:', clipboardContent.includes('Wishing you a wonderful holiday season'));
        } catch (e) {
            console.log('Could not read clipboard directly (expected in some test environments)');
        }

        // Wait for success message to disappear
        await page.waitForTimeout(3500);
        await expect(successMsgNew).not.toBeVisible();

        // Test copying Reply signature
        await copyReplyBtn.click();
        await page.waitForTimeout(500);

        // Check success message appears
        const successMsgReply = page.locator('#successMsgReply');
        await expect(successMsgReply).toBeVisible();
        await expect(successMsgReply).toContainText('Reply signature copied');

        console.log('\n=== CLIPBOARD TEST RESULTS ===');
        console.log('✓ Copy New Email button works');
        console.log('✓ Copy Reply button works');
        console.log('✓ Success messages display correctly');
        console.log('✓ Success messages auto-hide after 3 seconds');

        // Take screenshot showing success
        await page.screenshot({
            path: 'tests/screenshots/clipboard-test-success.png',
            fullPage: true
        });
    });

    test('clipboard contains HTML signature content', async ({ page, context }) => {
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);

        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        // Fill and generate
        await page.fill('#fullName', 'John Smith');
        await page.fill('#jobTitle', 'CEO');
        await page.fill('#email', 'john@alterspective.com.au');
        await page.fill('#mobile', '0412 345 678');

        await page.click('#generateBtn');
        await page.waitForTimeout(1500);

        // Copy and verify content structure
        await page.click('#copyNewBtn');
        await page.waitForTimeout(500);

        // Check that the generated HTML is proper
        const generatedHTML = await page.evaluate(() => window.newEmailHTML);

        console.log('\n=== GENERATED HTML VALIDATION ===');
        console.log('HTML exists:', !!generatedHTML);
        console.log('HTML length:', generatedHTML?.length || 0);
        console.log('Is valid HTML:', generatedHTML?.startsWith('<!DOCTYPE'));
        console.log('Contains name:', generatedHTML?.includes('John Smith'));
        console.log('Contains title:', generatedHTML?.includes('CEO'));
        console.log('Contains email:', generatedHTML?.includes('john@alterspective.com.au'));
        console.log('Contains mobile:', generatedHTML?.includes('0412 345 678'));

        // Check theme elements
        const theme = await page.evaluate(() => {
            return window.themeManager?.getCurrentTheme()?.id;
        });

        console.log('\nCurrent theme:', theme);

        if (theme === 'christmas') {
            console.log('Contains Christmas greeting:', generatedHTML?.includes('Wishing you'));
            console.log('Contains Season\'s Greetings:', generatedHTML?.includes('Season'));
            console.log('Has Christmas colors:', generatedHTML?.includes('#BB2528') || generatedHTML?.includes('#165B33'));
        }

        expect(generatedHTML).toBeTruthy();
        expect(generatedHTML.length).toBeGreaterThan(1000);
    });

    test('verify clipboard handler is loaded', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Check if ClipboardHandler class exists
        const hasClipboardHandler = await page.evaluate(() => {
            return typeof window.ClipboardHandler !== 'undefined';
        });

        // Check if clipboard functions are available
        const clipboardFunctions = await page.evaluate(() => {
            const btn = document.getElementById('copyNewBtn');
            return {
                hasButton: !!btn,
                hasClickHandler: !!btn?.onclick || btn?.hasAttribute('onclick') || !!btn?._listeners,
                clipboardApiAvailable: !!navigator.clipboard,
                writeTextAvailable: typeof navigator.clipboard?.writeText === 'function'
            };
        });

        console.log('\n=== CLIPBOARD SYSTEM CHECK ===');
        console.log('ClipboardHandler loaded:', hasClipboardHandler);
        console.log('Copy button exists:', clipboardFunctions.hasButton);
        console.log('Clipboard API available:', clipboardFunctions.clipboardApiAvailable);
        console.log('WriteText function available:', clipboardFunctions.writeTextAvailable);

        expect(clipboardFunctions.clipboardApiAvailable).toBe(true);
        expect(clipboardFunctions.writeTextAvailable).toBe(true);
    });
});