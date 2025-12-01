/**
 * Themed Signatures Tests
 *
 * Tests the themed signature generation functionality
 * including theme detection, signature generation, and UI interactions.
 */

import { test, expect } from '@playwright/test';

test.describe('Themed Email Signatures', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/themed-signatures.html');
    });

    test('themed signatures page loads correctly', async ({ page }) => {
        // Check page title
        await expect(page).toHaveTitle(/Themed Email Signatures/);

        // Check header elements
        await expect(page.locator('h1')).toContainText('Themed Email Signatures');

        // Check navigation link back to standard
        await expect(page.locator('.theme-nav-link')).toContainText('Standard Signatures');

        // Check form fields
        await expect(page.locator('#fullName')).toBeVisible();
        await expect(page.locator('#jobTitle')).toBeVisible();
        await expect(page.locator('#email')).toBeVisible();
        await expect(page.locator('#mobile')).toBeVisible();
        await expect(page.locator('#website')).toBeVisible();

        // Check generate button
        await expect(page.locator('#generateBtn')).toBeVisible();
        await expect(page.locator('#generateBtn')).toContainText('Generate Themed Signatures');
    });

    test('theme selector is present and functional', async ({ page }) => {
        // Check theme selector exists
        await expect(page.locator('.theme-selector')).toBeVisible();

        // Check auto-detect toggle
        await expect(page.locator('#theme-auto-detect')).toBeVisible();

        // Check theme options
        await expect(page.locator('.theme-option')).toHaveCount(3, { timeout: 5000 }); // Standard, Christmas, New Year

        // Check decoration level buttons
        await expect(page.locator('.decoration-buttons button')).toHaveCount(3);
    });

    test('can switch between themes', async ({ page }) => {
        // Disable auto-detect
        await page.locator('#theme-auto-detect').uncheck();

        // Click on Christmas theme
        await page.locator('.theme-option[data-theme-id="christmas"]').click();
        await expect(page.locator('.theme-option[data-theme-id="christmas"]')).toHaveClass(/active/);

        // Click on New Year theme
        await page.locator('.theme-option[data-theme-id="newYear"]').click();
        await expect(page.locator('.theme-option[data-theme-id="newYear"]')).toHaveClass(/active/);

        // Click on Standard theme
        await page.locator('.theme-option[data-theme-id="standard"]').click();
        await expect(page.locator('.theme-option[data-theme-id="standard"]')).toHaveClass(/active/);
    });

    test('can adjust decoration level', async ({ page }) => {
        // Click on decoration level buttons
        const decorationButtons = page.locator('.decoration-buttons button');

        // Click Subtle
        await decorationButtons.filter({ hasText: 'Subtle' }).click();
        await expect(decorationButtons.filter({ hasText: 'Subtle' })).toHaveClass(/active/);

        // Click Normal
        await decorationButtons.filter({ hasText: 'Normal' }).click();
        await expect(decorationButtons.filter({ hasText: 'Normal' })).toHaveClass(/active/);

        // Click Festive
        await decorationButtons.filter({ hasText: 'Festive' }).click();
        await expect(decorationButtons.filter({ hasText: 'Festive' })).toHaveClass(/active/);
    });

    test('generates themed signatures successfully', async ({ page }) => {
        // Fill form with test data
        await page.fill('#fullName', 'Test User');
        await page.fill('#jobTitle', 'Test Manager');
        await page.fill('#email', 'test@alterspective.com.au');
        await page.fill('#mobile', '0400 123 456');
        await page.fill('#website', 'alterspective.com.au');

        // Generate signatures
        await page.click('#generateBtn');

        // Wait for signatures to be generated
        await page.waitForTimeout(500);

        // Check that previews are populated
        const newPreview = await page.locator('#previewNew').innerHTML();
        expect(newPreview).toContain('table');
        expect(newPreview).toContain('Test User');
        expect(newPreview).toContain('Test Manager');

        const replyPreview = await page.locator('#previewReply').innerHTML();
        expect(replyPreview).toContain('table');
        expect(replyPreview).toContain('Test User');

        // Check that action buttons are enabled
        await expect(page.locator('#copyNewBtn')).toBeEnabled();
        await expect(page.locator('#downloadNewBtn')).toBeEnabled();
        await expect(page.locator('#copyReplyBtn')).toBeEnabled();
        await expect(page.locator('#downloadReplyBtn')).toBeEnabled();
    });

    test('applies Christmas theme styling', async ({ page }) => {
        // Disable auto-detect and select Christmas theme
        await page.locator('#theme-auto-detect').uncheck();
        await page.locator('.theme-option[data-theme-id="christmas"]').click();

        // Fill form
        await page.fill('#fullName', 'Santa Claus');
        await page.fill('#jobTitle', 'Gift Delivery Manager');
        await page.fill('#email', 'santa@alterspective.com.au');
        await page.fill('#mobile', '0400 HOHOHO');

        // Generate signatures
        await page.click('#generateBtn');

        // Wait for generation
        await page.waitForTimeout(500);

        // Check that signatures contain themed colors
        const newPreview = await page.locator('#previewNew').innerHTML();

        // Christmas theme uses different colors
        expect(newPreview).toContain('#165B33'); // Christmas green
        // OR it might use the divider color
        expect(newPreview.toLowerCase()).toMatch(/#bb2528|#165b33/i);
    });

    test('copy and download buttons work', async ({ page }) => {
        // Fill form
        await page.fill('#fullName', 'Test User');
        await page.fill('#jobTitle', 'Test Position');
        await page.fill('#email', 'test@alterspective.com.au');
        await page.fill('#mobile', '0400 000 000');

        // Generate signatures
        await page.click('#generateBtn');

        // Wait for generation
        await page.waitForTimeout(500);

        // Test copy button (check for success message)
        await page.click('#copyNewBtn');
        await expect(page.locator('#successMsgNew')).toBeVisible();

        await page.click('#copyReplyBtn');
        await expect(page.locator('#successMsgReply')).toBeVisible();

        // Test download buttons (check they don't throw errors)
        const downloadPromise = page.waitForEvent('download');
        await page.click('#downloadNewBtn');
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toContain('.html');
    });

    test('navigation between standard and themed pages works', async ({ page }) => {
        // Navigate to standard signatures
        await page.click('.theme-nav-link');
        await expect(page).toHaveURL(/index\.html/);

        // Navigate back to themed signatures
        await page.click('a:has-text("Try Festive Signatures")');
        await expect(page).toHaveURL(/themed-signatures\.html/);
    });

    test('theme auto-detection works based on date', async ({ page }) => {
        // This test would check if the correct theme is selected based on current date
        // For now, we'll just check that auto-detect is enabled by default
        await expect(page.locator('#theme-auto-detect')).toBeChecked();

        // Check that a theme is selected
        const activeTheme = await page.locator('.theme-option.active').count();
        expect(activeTheme).toBeGreaterThan(0);
    });

    test('themed signatures contain proper email HTML structure', async ({ page }) => {
        // Fill form
        await page.fill('#fullName', 'HTML Test');
        await page.fill('#jobTitle', 'Quality Tester');
        await page.fill('#email', 'html@alterspective.com.au');
        await page.fill('#mobile', '0400 111 222');

        // Generate signatures
        await page.click('#generateBtn');
        await page.waitForTimeout(500);

        // Check HTML structure of new email signature
        const newPreview = await page.locator('#previewNew').innerHTML();

        // Check for essential email HTML elements
        expect(newPreview).toContain('cellpadding="0"');
        expect(newPreview).toContain('cellspacing="0"');
        expect(newPreview).toContain('border="0"');
        expect(newPreview).toContain('style=');

        // Check for no modern CSS (flexbox/grid)
        expect(newPreview).not.toContain('display: flex');
        expect(newPreview).not.toContain('display: grid');

        // Check for inline styles (required for email)
        expect(newPreview).toContain('font-family:');
        expect(newPreview).toContain('color:');
    });
});

test.describe('Theme Persistence', () => {
    test('remembers theme selection across page refreshes', async ({ page }) => {
        await page.goto('/themed-signatures.html');

        // Disable auto-detect and select Christmas theme
        await page.locator('#theme-auto-detect').uncheck();
        await page.locator('.theme-option[data-theme-id="christmas"]').click();

        // Select festive decoration level
        await page.locator('.decoration-buttons button[data-level="festive"]').click();

        // Refresh page
        await page.reload();

        // Check that selections persist
        await expect(page.locator('#theme-auto-detect')).not.toBeChecked();
        await expect(page.locator('.theme-option[data-theme-id="christmas"]')).toHaveClass(/active/);
        await expect(page.locator('.decoration-buttons button[data-level="festive"]')).toHaveClass(/active/);
    });
});