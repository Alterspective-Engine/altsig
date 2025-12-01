/**
 * Debug test for themed signature generation
 * Captures detailed console output to diagnose generation issues
 */

import { test, expect } from '@playwright/test';

const LIVE_SERVER_URL = 'http://127.0.0.1:5500/public/themed-signatures.html';

test.describe('Debug Themed Signature Generation', () => {
    test('capture generation process details', async ({ page }) => {
        // Capture all console messages
        const consoleMessages = [];
        page.on('console', msg => {
            consoleMessages.push({
                type: msg.type(),
                text: msg.text()
            });
        });

        // Capture errors
        const pageErrors = [];
        page.on('pageerror', error => {
            pageErrors.push(error.message);
        });

        // Navigate to page
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        console.log('\n=== PAGE LOAD CONSOLE ===');
        consoleMessages.forEach(msg => {
            console.log(`[${msg.type}] ${msg.text}`);
        });

        console.log('\n=== PAGE ERRORS ===');
        console.log(pageErrors.length > 0 ? pageErrors : 'No errors');

        // Clear previous messages
        consoleMessages.length = 0;

        // Fill form
        await page.fill('#fullName', 'Test User');
        await page.fill('#jobTitle', 'Quality Tester');
        await page.fill('#email', 'test@alterspective.com.au');
        await page.fill('#mobile', '0400 123 456');

        console.log('\n=== FORM FILLED ===');

        // Click generate button
        console.log('\n=== CLICKING GENERATE BUTTON ===');
        await page.click('#generateBtn');
        await page.waitForTimeout(2000);

        console.log('\n=== GENERATION CONSOLE ===');
        consoleMessages.forEach(msg => {
            console.log(`[${msg.type}] ${msg.text}`);
        });

        console.log('\n=== PAGE ERRORS AFTER GENERATION ===');
        console.log(pageErrors.length > 0 ? pageErrors : 'No errors');

        // Check if functions exist
        const functionsExist = await page.evaluate(() => {
            return {
                generateThemedSignatures: typeof window.generateThemedSignatures === 'function',
                signatureGenerator: typeof window.signatureGenerator !== 'undefined',
                themeManager: typeof window.themeManager !== 'undefined',
                CONFIG: typeof window.CONFIG !== 'undefined'
            };
        });

        console.log('\n=== FUNCTION AVAILABILITY ===');
        console.log(JSON.stringify(functionsExist, null, 2));

        // Check preview content
        const previewContent = await page.evaluate(() => {
            return {
                newEmailHTML: document.getElementById('previewNew').innerHTML.substring(0, 200),
                replyHTML: document.getElementById('previewReply').innerHTML.substring(0, 200),
                newEmailTableCount: document.querySelectorAll('#previewNew table').length,
                replyTableCount: document.querySelectorAll('#previewReply table').length
            };
        });

        console.log('\n=== PREVIEW CONTENT ===');
        console.log(JSON.stringify(previewContent, null, 2));

        // Check button states
        const buttonStates = await page.evaluate(() => {
            return {
                copyNew: document.getElementById('copyNewBtn').disabled,
                downloadNew: document.getElementById('downloadNewBtn').disabled,
                copyReply: document.getElementById('copyReplyBtn').disabled,
                downloadReply: document.getElementById('downloadReplyBtn').disabled
            };
        });

        console.log('\n=== BUTTON STATES (disabled) ===');
        console.log(JSON.stringify(buttonStates, null, 2));

        // Take screenshot
        await page.screenshot({ path: 'tests/screenshots/debug-themed-generation.png', fullPage: true });
        console.log('\n=== SCREENSHOT SAVED ===');
        console.log('tests/screenshots/debug-themed-generation.png');
    });
});
