/**
 * Test simplified holiday signatures
 */

import { test, expect } from '@playwright/test';

const LIVE_SERVER_URL = 'http://127.0.0.1:5500/public/themed-signatures.html';

test.describe('Simplified Holiday Signatures', () => {
    test('generates holiday signatures with minimal changes', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        // Fill form
        await page.fill('#fullName', 'John Smith');
        await page.fill('#jobTitle', 'Managing Director');
        await page.fill('#email', 'john@alterspective.com.au');
        await page.fill('#mobile', '0400 123 456');

        // Wait for auto-generation
        await page.waitForTimeout(1000);

        // Get generated HTML
        const newEmailHTML = await page.evaluate(() => window.newEmailHTML);
        const replyHTML = await page.evaluate(() => window.replyHTML);

        console.log('\n=== SIMPLIFIED HOLIDAY SIGNATURE CHECK ===');

        // Check what's NOT in the signature (removed decorations)
        console.log('\nRemoved Elements:');
        console.log('❌ No Christmas tree icon:', !newEmailHTML.includes('🎄'));
        console.log('❌ No "Season\'s Greetings":', !newEmailHTML.includes('Season'));
        console.log('❌ No "Wishing you":', !newEmailHTML.includes('Wishing'));
        console.log('❌ No holiday colors (red/green):', !newEmailHTML.includes('#BB2528') && !newEmailHTML.includes('#165B33'));

        // Check what IS in the signature (kept elements)
        console.log('\nKept Elements:');
        console.log('✅ Standard green color:', newEmailHTML.includes('#2C8248'));
        console.log('✅ Office closure message:', newEmailHTML.includes('taking a moment to slow down'));
        console.log('✅ Name present:', newEmailHTML.includes('John Smith'));
        console.log('✅ Standard layout preserved:', newEmailHTML.includes('<table'));

        // Check reply signature
        console.log('\nReply Signature:');
        console.log('✅ No decorative icons:', !replyHTML.includes('🎄'));
        console.log('✅ Compact format:', replyHTML.includes('rowspan="3"'));
        console.log('✅ Standard colors:', replyHTML.includes('#2C8248'));

        // Extract and display the closure message
        const closureMatch = newEmailHTML.match(/We&#x27;re taking.*?2025\./);
        if (closureMatch) {
            console.log('\nClosure Message Found:');
            console.log(closureMatch[0].replace(/&#x27;/g, "'"));
        }

        // Take screenshot
        await page.screenshot({
            path: 'tests/screenshots/simplified-holiday-signature.png',
            fullPage: true
        });

        // All checks
        expect(newEmailHTML.includes('🎄')).toBe(false);
        expect(newEmailHTML.includes('Season')).toBe(false);
        expect(newEmailHTML.includes('#2C8248')).toBe(true);
        expect(newEmailHTML.includes('taking a moment to slow down')).toBe(true);
    });
});