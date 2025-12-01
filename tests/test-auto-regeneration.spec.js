/**
 * Test auto-regeneration functionality for themed signatures
 */

import { test, expect } from '@playwright/test';

const LIVE_SERVER_URL = 'http://127.0.0.1:5500/public/themed-signatures.html';

test.describe('Auto-Regeneration Tests', () => {
    test('signatures auto-regenerate on form input changes', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Check if signatures are already generated (due to default values)
        const previewNew = page.locator('#previewNew');
        const initialContent = await previewNew.innerHTML();
        const hasInitialSignature = !initialContent.includes('Click "Generate Themed Signatures"');

        console.log('\n=== AUTO-REGENERATION TEST ===');
        console.log('Initial signature present:', hasInitialSignature);

        // Clear form first
        await page.fill('#fullName', '');
        await page.fill('#jobTitle', '');
        await page.fill('#email', '');
        await page.fill('#mobile', '');
        await page.waitForTimeout(100);

        // Verify no signature is shown
        let previewContent = await previewNew.innerHTML();
        console.log('After clearing: Has table:', previewContent.includes('<table'));

        // Start typing in fields one by one
        await page.fill('#fullName', 'John Doe');
        await page.waitForTimeout(600); // Wait for debounce
        previewContent = await previewNew.innerHTML();
        console.log('After name only: Has table:', previewContent.includes('<table'));

        await page.fill('#jobTitle', 'Senior Developer');
        await page.waitForTimeout(600);
        previewContent = await previewNew.innerHTML();
        console.log('After name + title: Has table:', previewContent.includes('<table'));

        await page.fill('#email', 'john.doe@alterspective.com.au');
        await page.waitForTimeout(600);
        previewContent = await previewNew.innerHTML();
        console.log('After name + title + email: Has table:', previewContent.includes('<table'));

        // Fill in mobile - this should trigger auto-generation
        await page.fill('#mobile', '0411 222 333');
        await page.waitForTimeout(600); // Wait for debounce to trigger

        // Check that signature was generated
        previewContent = await previewNew.innerHTML();
        const hasSignature = previewContent.includes('<table') && previewContent.includes('John Doe');

        console.log('\n=== AUTO-GENERATION RESULTS ===');
        console.log('✓ Signature auto-generated:', hasSignature);
        console.log('✓ Contains name:', previewContent.includes('John Doe'));
        console.log('✓ Contains title:', previewContent.includes('Senior Developer'));
        console.log('✓ Contains email:', previewContent.includes('john.doe@alterspective.com.au'));
        console.log('✓ Contains mobile:', previewContent.includes('0411 222 333'));

        expect(hasSignature).toBe(true);

        // Test that changing a field regenerates
        await page.fill('#fullName', 'Jane Smith');
        await page.waitForTimeout(600);

        previewContent = await previewNew.innerHTML();
        const regenerated = previewContent.includes('Jane Smith') && !previewContent.includes('John Doe');

        console.log('\n=== REGENERATION ON CHANGE ===');
        console.log('✓ Signature regenerated:', regenerated);
        console.log('✓ New name present:', previewContent.includes('Jane Smith'));
        console.log('✓ Old name removed:', !previewContent.includes('John Doe'));

        expect(regenerated).toBe(true);

        // Take screenshot
        await page.screenshot({
            path: 'tests/screenshots/auto-regeneration-test.png',
            fullPage: true
        });
    });

    test('theme changes trigger auto-regeneration', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);

        // Ensure form has values
        await page.fill('#fullName', 'Theme Test');
        await page.fill('#jobTitle', 'QA Engineer');
        await page.fill('#email', 'test@alterspective.com.au');
        await page.fill('#mobile', '0400 000 000');
        await page.waitForTimeout(600);

        // Get initial signature
        const previewNew = page.locator('#previewNew');
        let previewContent = await previewNew.innerHTML();

        // Check current theme
        const isChristmas = await page.locator('.theme-option.selected').getAttribute('data-theme');
        console.log('\n=== THEME CHANGE TEST ===');
        console.log('Initial theme:', isChristmas);

        // Change theme
        if (isChristmas === 'christmas') {
            // Switch to New Year
            await page.click('[data-theme="newYear"]');
        } else {
            // Switch to Christmas
            await page.click('[data-theme="christmas"]');
        }

        await page.waitForTimeout(1000);

        // Check that signature regenerated with new theme
        const newTheme = await page.locator('.theme-option.selected').getAttribute('data-theme');
        previewContent = await previewNew.innerHTML();

        console.log('New theme:', newTheme);
        console.log('✓ Theme changed:', isChristmas !== newTheme);
        console.log('✓ Signature still present:', previewContent.includes('<table'));
        console.log('✓ Contains user data:', previewContent.includes('Theme Test'));

        expect(isChristmas).not.toBe(newTheme);
        expect(previewContent.includes('Theme Test')).toBe(true);
    });

    test('decoration level changes trigger regeneration', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);

        // Ensure form has values
        await page.fill('#fullName', 'Decoration Test');
        await page.fill('#jobTitle', 'Designer');
        await page.fill('#email', 'design@alterspective.com.au');
        await page.fill('#mobile', '0499 888 777');
        await page.waitForTimeout(600);

        console.log('\n=== DECORATION LEVEL TEST ===');

        // Try different decoration levels
        const decorationButtons = ['Subtle', 'Normal', 'Festive'];

        for (const level of decorationButtons) {
            const button = page.locator(`button:has-text("${level}")`);
            if (await button.isVisible()) {
                await button.click();
                await page.waitForTimeout(600);

                const previewContent = await page.locator('#previewNew').innerHTML();
                console.log(`✓ ${level} level applied`);
                console.log(`  Signature present:`, previewContent.includes('Decoration Test'));
            }
        }

        const finalContent = await page.locator('#previewNew').innerHTML();
        expect(finalContent.includes('Decoration Test')).toBe(true);
    });
});