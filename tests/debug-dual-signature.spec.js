const { test, expect } = require('@playwright/test');

test.describe('Dual Signature Generator - Debug Test', () => {

    test('should load page and capture console logs', async ({ page }) => {
        // Capture all console messages
        const consoleLogs = [];
        page.on('console', msg => {
            consoleLogs.push({
                type: msg.type(),
                text: msg.text()
            });
            console.log(`[${msg.type().toUpperCase()}] ${msg.text()}`);
        });

        // Capture page errors
        page.on('pageerror', error => {
            console.error('PAGE ERROR:', error.message);
        });

        // Load the page
        console.log('\n=== Loading page ===');
        await page.goto('/');

        // Wait for page to be fully loaded
        await page.waitForLoadState('networkidle');

        console.log('\n=== Page loaded, checking elements ===');

        // Check if key elements exist
        const elements = {
            'fullName input': '#fullName',
            'jobTitle input': '#jobTitle',
            'email input': '#email',
            'mobile input': '#mobile',
            'website input': '#website',
            'generate button': '#generateBtn',
            'previewNew': '#previewNew',
            'previewReply': '#previewReply',
            'copyNewBtn': '#copyNewBtn',
            'copyReplyBtn': '#copyReplyBtn',
            'downloadNewBtn': '#downloadNewBtn',
            'downloadReplyBtn': '#downloadReplyBtn'
        };

        for (const [name, selector] of Object.entries(elements)) {
            const element = await page.locator(selector);
            const exists = await element.count() > 0;
            console.log(`${exists ? '✓' : '✗'} ${name}: ${exists ? 'found' : 'MISSING'}`);
        }

        console.log('\n=== Checking button onclick handlers ===');

        // Check what the generate button does
        const generateBtnOnClick = await page.$eval('#generateBtn', el => el.getAttribute('onclick'));
        console.log('Generate button onclick:', generateBtnOnClick);

        console.log('\n=== Checking if functions exist ===');

        // Check if our functions exist in the global scope
        const functionChecks = await page.evaluate(() => {
            return {
                generateBothSignatures: typeof generateBothSignatures !== 'undefined',
                generateSignature: typeof generateSignature !== 'undefined',
                copyNewSignature: typeof copyNewSignature !== 'undefined',
                copyReplySignature: typeof copyReplySignature !== 'undefined',
                downloadNewSignature: typeof downloadNewSignature !== 'undefined',
                downloadReplySignature: typeof downloadReplySignature !== 'undefined',
                logoBase64: typeof logoBase64 !== 'undefined',
                logoPath: typeof logoPath !== 'undefined'
            };
        });

        for (const [funcName, exists] of Object.entries(functionChecks)) {
            console.log(`${exists ? '✓' : '✗'} ${funcName}: ${exists ? 'defined' : 'UNDEFINED'}`);
        }

        console.log('\n=== Attempting to generate signatures ===');

        // Try to click the generate button
        try {
            await page.click('#generateBtn');
            console.log('✓ Clicked generate button');

            // Wait a bit for any errors
            await page.waitForTimeout(1000);

            // Check if previews were populated
            const previewNewContent = await page.$eval('#previewNew', el => el.innerHTML);
            const previewReplyContent = await page.$eval('#previewReply', el => el.innerHTML);

            console.log('\nPreview New content length:', previewNewContent.length);
            console.log('Preview Reply content length:', previewReplyContent.length);

            if (previewNewContent.includes('<table')) {
                console.log('✓ New email signature generated successfully');
            } else {
                console.log('✗ New email signature NOT generated');
                console.log('Content:', previewNewContent.substring(0, 200));
            }

            if (previewReplyContent.includes('<table')) {
                console.log('✓ Reply signature generated successfully');
            } else {
                console.log('✗ Reply signature NOT generated');
                console.log('Content:', previewReplyContent.substring(0, 200));
            }

            // Check button states
            const buttonStates = await page.evaluate(() => {
                return {
                    copyNewBtn: document.getElementById('copyNewBtn')?.disabled,
                    copyReplyBtn: document.getElementById('copyReplyBtn')?.disabled,
                    downloadNewBtn: document.getElementById('downloadNewBtn')?.disabled,
                    downloadReplyBtn: document.getElementById('downloadReplyBtn')?.disabled
                };
            });

            console.log('\nButton states (should be false/enabled):');
            for (const [btn, disabled] of Object.entries(buttonStates)) {
                console.log(`  ${btn}: ${disabled ? 'DISABLED' : 'enabled'}`);
            }

        } catch (error) {
            console.error('✗ Error clicking generate button:', error.message);
        }

        console.log('\n=== All console logs captured ===');
        consoleLogs.forEach(log => {
            if (log.type === 'error') {
                console.error(`ERROR: ${log.text}`);
            }
        });

        // Take a screenshot for visual debugging
        await page.screenshot({
            path: 'tests/screenshots/debug-dual-signature.png',
            fullPage: true
        });
        console.log('\n✓ Screenshot saved to tests/screenshots/debug-dual-signature.png');
    });

});
