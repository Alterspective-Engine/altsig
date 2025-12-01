/**
 * Test input validation for themed signatures
 */

import { test, expect } from '@playwright/test';

const LIVE_SERVER_URL = 'http://127.0.0.1:5500/public/themed-signatures.html';

test.describe('Input Validation Tests', () => {
    test('validates email format correctly', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Fill valid data first
        await page.fill('#fullName', 'Test User');
        await page.fill('#jobTitle', 'QA Engineer');
        await page.fill('#mobile', '0400 123 456');

        console.log('\n=== EMAIL VALIDATION TEST ===');

        // Test invalid email formats
        const invalidEmails = [
            'notanemail',
            'missing@domain',
            '@nodomain.com',
            'spaces in@email.com',
            'double@@domain.com'
        ];

        for (const invalidEmail of invalidEmails) {
            await page.fill('#email', invalidEmail);
            await page.waitForTimeout(600); // Wait for debounce

            const previewContent = await page.locator('#previewNew').innerHTML();
            const hasTable = previewContent.includes('<table');

            console.log(`Invalid email "${invalidEmail}": Generated = ${hasTable} (should be false)`);
            expect(hasTable).toBe(false);
        }

        // Test valid email
        await page.fill('#email', 'valid@alterspective.com.au');
        await page.waitForTimeout(600);

        const validContent = await page.locator('#previewNew').innerHTML();
        const hasValidTable = validContent.includes('<table');

        console.log(`Valid email: Generated = ${hasValidTable} (should be true)`);
        expect(hasValidTable).toBe(true);
    });

    test('validates phone number format correctly', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        // Fill valid data first
        await page.fill('#fullName', 'Test User');
        await page.fill('#jobTitle', 'QA Engineer');
        await page.fill('#email', 'test@alterspective.com.au');

        console.log('\n=== PHONE VALIDATION TEST ===');

        // Test invalid phone formats
        const invalidPhones = [
            '123456',           // Too short
            '1234567890123',    // Too long
            '0100 000 000',     // Invalid area code (01)
            '0900 000 000',     // Invalid area code (09)
            '+44 20 1234 5678', // Non-Australian
            'not a phone'       // Text
        ];

        for (const invalidPhone of invalidPhones) {
            await page.fill('#mobile', invalidPhone);
            await page.waitForTimeout(600);

            const previewContent = await page.locator('#previewNew').innerHTML();
            const hasTable = previewContent.includes('<table');

            console.log(`Invalid phone "${invalidPhone}": Generated = ${hasTable} (should be false)`);
            expect(hasTable).toBe(false);
        }

        // Test valid Australian phone numbers
        const validPhones = [
            '0400 123 456',     // Mobile with spaces
            '0400123456',       // Mobile without spaces
            '02 9876 5432',     // Landline with spaces
            '0298765432',       // Landline without spaces
            '+61 400 123 456',  // International format
            '0488-180-044'      // With dashes
        ];

        for (const validPhone of validPhones) {
            await page.fill('#mobile', validPhone);
            await page.waitForTimeout(600);

            const previewContent = await page.locator('#previewNew').innerHTML();
            const hasTable = previewContent.includes('<table');

            console.log(`Valid phone "${validPhone}": Generated = ${hasTable} (should be true)`);
            expect(hasTable).toBe(true);
        }
    });

    test('requires all mandatory fields', async ({ page }) => {
        await page.goto(LIVE_SERVER_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1000);

        console.log('\n=== REQUIRED FIELDS TEST ===');

        // Clear all fields
        await page.fill('#fullName', '');
        await page.fill('#jobTitle', '');
        await page.fill('#email', '');
        await page.fill('#mobile', '');
        await page.fill('#website', '');

        // Try to generate - should not work
        await page.click('#generateBtn');
        await page.waitForTimeout(500);

        let previewContent = await page.locator('#previewNew').innerHTML();
        console.log('Empty form: Generated =', previewContent.includes('<table'), '(should be false)');
        expect(previewContent.includes('<table')).toBe(false);

        // Add fields one by one
        await page.fill('#fullName', 'John Doe');
        await page.waitForTimeout(600);
        previewContent = await page.locator('#previewNew').innerHTML();
        console.log('Name only: Generated =', previewContent.includes('<table'), '(should be false)');

        await page.fill('#jobTitle', 'Manager');
        await page.waitForTimeout(600);
        previewContent = await page.locator('#previewNew').innerHTML();
        console.log('Name + Title: Generated =', previewContent.includes('<table'), '(should be false)');

        await page.fill('#email', 'john@alterspective.com.au');
        await page.waitForTimeout(600);
        previewContent = await page.locator('#previewNew').innerHTML();
        console.log('Name + Title + Email: Generated =', previewContent.includes('<table'), '(should be false)');

        await page.fill('#mobile', '0400 111 222');
        await page.waitForTimeout(600);
        previewContent = await page.locator('#previewNew').innerHTML();
        console.log('All required fields: Generated =', previewContent.includes('<table'), '(should be true)');
        expect(previewContent.includes('<table')).toBe(true);

        // Website is optional - removing it should still work
        await page.fill('#website', '');
        await page.waitForTimeout(600);
        previewContent = await page.locator('#previewNew').innerHTML();
        console.log('Without optional website: Generated =', previewContent.includes('<table'), '(should be true)');
        expect(previewContent.includes('<table')).toBe(true);
    });
});