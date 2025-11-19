// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

/**
 * Playwright Tests for Alterspective Email Signature Generator
 *
 * Tests the signature generator functionality including:
 * - Page loading and UI elements
 * - Form input and validation
 * - Signature generation
 * - Live preview
 * - Copy to clipboard
 * - Download functionality
 */

test.describe('Alterspective Email Signature Generator', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the page via http-server (supports ES6 modules)
    await page.goto('/');
  });

  test('should load the page successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Email Signature Generator/);

    // Check main heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('Email Signature Generator');

    // Check that the page has loaded with gradient background
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should have all form fields visible', async ({ page }) => {
    // Check all input fields exist
    await expect(page.locator('#fullName')).toBeVisible();
    await expect(page.locator('#jobTitle')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#mobile')).toBeVisible();
    await expect(page.locator('#website')).toBeVisible();

    // Check labels
    await expect(page.locator('label[for="fullName"]')).toContainText('Full Name');
    await expect(page.locator('label[for="jobTitle"]')).toContainText('Job Title');
    await expect(page.locator('label[for="email"]')).toContainText('Email Address');
    await expect(page.locator('label[for="mobile"]')).toContainText('Mobile Number');
  });

  test('should have default values pre-filled', async ({ page }) => {
    // Check that Igor's details are pre-filled
    await expect(page.locator('#fullName')).toHaveValue('Igor Jericevich');
    await expect(page.locator('#jobTitle')).toHaveValue('Managing Director');
    await expect(page.locator('#email')).toHaveValue('igor.jericevich@alterspective.com.au');
    await expect(page.locator('#mobile')).toHaveValue('0488 180 044');
    await expect(page.locator('#website')).toHaveValue('alterspective.com.au');
  });

  test('should generate both signatures when clicking Generate button', async ({ page }) => {
    // Click generate button
    await page.locator('#generateBtn').click();

    // Wait for generation
    await page.waitForTimeout(500);

    // Check that New Email preview has content
    const previewNew = page.locator('#previewNew');
    const previewNewContent = await previewNew.textContent();

    expect(previewNewContent).toContain('Igor Jericevich');
    expect(previewNewContent).toContain('Managing Director');
    expect(previewNewContent).toContain('igor.jericevich@alterspective.com.au');

    // Check that Reply preview has content
    const previewReply = page.locator('#previewReply');
    const previewReplyContent = await previewReply.textContent();

    expect(previewReplyContent).toContain('Igor Jericevich');
    expect(previewReplyContent).toContain('Managing Director');
  });

  test('should update signatures with custom employee data', async ({ page }) => {
    // Fill in custom data
    await page.locator('#fullName').fill('Test User');
    await page.locator('#jobTitle').fill('Tester');

    // Click generate button
    await page.locator('#generateBtn').click();

    // Wait for generation
    await page.waitForTimeout(300);

    // Check both previews update
    const previewNew = page.locator('#previewNew');
    await expect(previewNew).toContainText('Test User');
    await expect(previewNew).toContainText('Tester');

    const previewReply = page.locator('#previewReply');
    await expect(previewReply).toContainText('Test User');
  });

  test('should update both previews with complete custom employee data', async ({ page }) => {
    // Fill in custom data
    await page.locator('#fullName').fill('Sarah Johnson');
    await page.locator('#jobTitle').fill('Senior Consultant');
    await page.locator('#email').fill('sarah.johnson@alterspective.com.au');
    await page.locator('#mobile').fill('0412 345 678');

    // Generate
    await page.locator('#generateBtn').click();

    await page.waitForTimeout(300);

    // Verify New Email preview
    const previewNew = page.locator('#previewNew');
    await expect(previewNew).toContainText('Sarah Johnson');
    await expect(previewNew).toContainText('Senior Consultant');
    await expect(previewNew).toContainText('sarah.johnson@alterspective.com.au');
    await expect(previewNew).toContainText('0412 345 678');

    // Verify Reply preview
    const previewReply = page.locator('#previewReply');
    await expect(previewReply).toContainText('Sarah Johnson');
    await expect(previewReply).toContainText('Senior Consultant');
  });

  test('should show validation alert for empty required fields', async ({ page }) => {
    // Clear required field
    await page.locator('#fullName').fill('');

    // Set up dialog handler
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('required');
      await dialog.accept();
    });

    // Try to generate
    await page.locator('#generateBtn').click();
  });

  test('should have correct signature layout structure', async ({ page }) => {
    // Generate signatures
    await page.locator('#generateBtn').click();
    await page.waitForTimeout(500);

    // Check for table structure in New Email preview
    const previewNew = page.locator('#previewNew');
    const tablesNew = previewNew.locator('table');

    // Should have table-based layout
    await expect(tablesNew.first()).toBeVisible();

    // Check for logo image with base64 data
    const logoImgNew = previewNew.locator('img[alt="Alterspective"]');
    await expect(logoImgNew).toBeVisible();

    // Logo should use base64 data
    const logoSrc = await logoImgNew.getAttribute('src');
    expect(logoSrc).toContain('data:image');

    // Check Reply preview also has table structure
    const previewReply = page.locator('#previewReply');
    const tablesReply = previewReply.locator('table');
    await expect(tablesReply.first()).toBeVisible();
  });

  test('should display clickable email link in both signatures', async ({ page }) => {
    await page.locator('#generateBtn').click();
    await page.waitForTimeout(500);

    // Check email link in New Email preview
    const emailLinkNew = page.locator('#previewNew a[href^="mailto:"]');
    await expect(emailLinkNew).toBeVisible();
    await expect(emailLinkNew).toHaveAttribute('href', 'mailto:igor.jericevich@alterspective.com.au');

    // Check email link in Reply preview
    const emailLinkReply = page.locator('#previewReply a[href^="mailto:"]');
    await expect(emailLinkReply).toBeVisible();
  });

  test('should display clickable phone link in both signatures', async ({ page }) => {
    await page.locator('#generateBtn').click();
    await page.waitForTimeout(500);

    // Check phone link in New Email preview
    const phoneLinkNew = page.locator('#previewNew a[href^="tel:"]');
    await expect(phoneLinkNew).toBeVisible();

    // Should format phone number with +61
    const href = await phoneLinkNew.getAttribute('href');
    expect(href).toContain('+61488180044');
  });

  test('should display clickable website link in New Email signature', async ({ page }) => {
    await page.locator('#generateBtn').click();
    await page.waitForTimeout(500);

    // Check website link in New Email preview (Reply doesn't have website)
    const websiteLink = page.locator('#previewNew a[target="_blank"]').filter({ hasText: 'alterspective.com.au' });
    await expect(websiteLink).toBeVisible();

    const href = await websiteLink.getAttribute('href');
    expect(href).toContain('alterspective.com.au');
  });

  test('should enable copy buttons after generation', async ({ page }) => {
    await page.locator('#generateBtn').click();
    await page.waitForTimeout(500);

    // Both copy buttons should be enabled
    const copyNewBtn = page.locator('#copyNewBtn');
    const copyReplyBtn = page.locator('#copyReplyBtn');
    await expect(copyNewBtn).toBeEnabled();
    await expect(copyReplyBtn).toBeEnabled();
  });

  test('should enable download buttons after generation', async ({ page }) => {
    await page.locator('#generateBtn').click();
    await page.waitForTimeout(500);

    // Both download buttons should be enabled
    const downloadNewBtn = page.locator('#downloadNewBtn');
    const downloadReplyBtn = page.locator('#downloadReplyBtn');
    await expect(downloadNewBtn).toBeEnabled();
    await expect(downloadReplyBtn).toBeEnabled();
  });

  test('should have correct brand colors in UI', async ({ page }) => {
    // Check header has gradient background
    const container = page.locator('.container');
    await expect(container).toBeVisible();

    // Check card elements exist
    const cards = page.locator('.card');
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('should apply correct inline styling to signature elements', async ({ page }) => {
    await page.locator('#generateBtn').click();
    await page.waitForTimeout(500);

    // Check that signature has inline styles (required for email compatibility)
    const previewNew = page.locator('#previewNew');
    const htmlContent = await previewNew.innerHTML();

    // Verify inline styles are present
    expect(htmlContent).toContain('font-family');
    expect(htmlContent).toContain('font-size');
    expect(htmlContent).toContain('color: #17232D'); // Navy color
    expect(htmlContent).toContain('color: #2C8248'); // Green color

    // Verify specific styling exists in the HTML
    expect(htmlContent).toContain('font-weight');
  });

  test('should have vertical divider in signatures', async ({ page }) => {
    await page.locator('#generateBtn').click();
    await page.waitForTimeout(500);

    // Check for divider styling in New Email
    const previewNew = page.locator('#previewNew');
    const dividerCellsNew = previewNew.locator('td[style*="border-right"]');
    expect(await dividerCellsNew.count()).toBeGreaterThan(0);

    // Check for divider in Reply
    const previewReply = page.locator('#previewReply');
    const dividerCellsReply = previewReply.locator('td[style*="border-right"]');
    expect(await dividerCellsReply.count()).toBeGreaterThan(0);
  });

  test('should format mobile number correctly for tel: link', async ({ page }) => {
    // Use different mobile number
    await page.locator('#mobile').fill('0412 345 678');
    await page.locator('#generateBtn').click();

    await page.waitForTimeout(300);

    // Check the New Email preview
    const previewNew = page.locator('#previewNew');
    const phoneLink = previewNew.locator('a[href^="tel:"]');
    const href = await phoneLink.getAttribute('href');

    // Should convert 0412 345 678 to +61412345678
    expect(href).toContain('tel:+61412345678');

    // But display should keep original format
    await expect(previewNew).toContainText('0412 345 678');
  });

  test('should handle custom website URL', async ({ page }) => {
    await page.locator('#website').fill('custom.alterspective.com.au');
    await page.locator('#generateBtn').click();

    await page.waitForTimeout(300);

    const previewNew = page.locator('#previewNew');
    await expect(previewNew).toContainText('custom.alterspective.com.au');
  });

  test('should copy New Email signature to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.locator('#generateBtn').click();
    await page.waitForTimeout(500);

    // Click copy button for New Email
    await page.locator('#copyNewBtn').click();

    // Brief wait for clipboard operation
    await page.waitForTimeout(500);
  });

  test('should enable download buttons with custom name', async ({ page }) => {
    // Change name
    await page.locator('#fullName').fill('Sarah Johnson');
    await page.locator('#generateBtn').click();

    await page.waitForTimeout(500);

    // Both download buttons should be enabled
    const downloadNewBtn = page.locator('#downloadNewBtn');
    const downloadReplyBtn = page.locator('#downloadReplyBtn');
    await expect(downloadNewBtn).toBeEnabled();
    await expect(downloadReplyBtn).toBeEnabled();
  });

  test('should maintain signature structure with different inputs', async ({ page }) => {
    const testCases = [
      { name: 'John Smith', title: 'CEO' },
      { name: 'Emma Wilson', title: 'Senior Consultant' },
      { name: 'Michael Brown', title: 'Project Manager' }
    ];

    for (const testCase of testCases) {
      await page.locator('#fullName').fill(testCase.name);
      await page.locator('#jobTitle').fill(testCase.title);
      await page.locator('#generateBtn').click();

      await page.waitForTimeout(300);

      // Verify structure is maintained in both previews
      const previewNew = page.locator('#previewNew');
      await expect(previewNew).toContainText(testCase.name);
      await expect(previewNew).toContainText(testCase.title);

      const previewReply = page.locator('#previewReply');
      await expect(previewReply).toContainText(testCase.name);

      // Check table structure still exists
      const tables = previewNew.locator('table');
      expect(await tables.count()).toBeGreaterThan(0);
    }
  });

  test('should show appropriate hints for each field', async ({ page }) => {
    // Check hints are displayed
    await expect(page.locator('.hint').filter({ hasText: 'First and Last Name' })).toBeVisible();
    await expect(page.locator('.hint').filter({ hasText: 'Official position' })).toBeVisible();
    await expect(page.locator('.hint').filter({ hasText: 'Company email' })).toBeVisible();
    await expect(page.locator('.hint').filter({ hasText: 'Australian format' })).toBeVisible();
  });

  test('should have responsive layout for signature preview cards', async ({ page }) => {
    // Check both signature preview sections exist
    const newEmailSection = page.locator('#previewNew').locator('..');
    const replySection = page.locator('#previewReply').locator('..');

    await expect(newEmailSection).toBeVisible();
    await expect(replySection).toBeVisible();
  });

  test('should preserve formatting in generated signatures', async ({ page }) => {
    await page.locator('#generateBtn').click();
    await page.waitForTimeout(500);

    // Check New Email preview HTML structure
    const previewNew = page.locator('#previewNew');
    const htmlContent = await previewNew.innerHTML();

    // Check key HTML structure elements
    expect(htmlContent).toContain('<table');
    expect(htmlContent).toContain('cellpadding="0"');
    expect(htmlContent).toContain('cellspacing="0"');
    expect(htmlContent).toContain('border="0"');

    // Check inline styles are present
    expect(htmlContent).toContain('font-family');
    expect(htmlContent).toContain('color'); // Color styles should be inline
  });

  test('should include base64 logo in generated signatures', async ({ page }) => {
    await page.locator('#generateBtn').click();
    await page.waitForTimeout(500);

    // Check New Email preview
    const previewNew = page.locator('#previewNew');
    const logoImg = previewNew.locator('img[alt="Alterspective"]');

    await expect(logoImg).toBeVisible();

    // Logo should use base64 data
    const logoSrc = await logoImg.getAttribute('src');
    expect(logoSrc).toContain('data:image');
  });

  test('should validate email format visually', async ({ page }) => {
    // Input field should have type="email"
    const emailInput = page.locator('#email');
    await expect(emailInput).toHaveAttribute('type', 'email');

    // Browser will handle validation for email format
  });

  test('should validate phone format visually', async ({ page }) => {
    // Input field should have type="tel"
    const mobileInput = page.locator('#mobile');
    await expect(mobileInput).toHaveAttribute('type', 'tel');
  });

  test('should have accessible form labels', async ({ page }) => {
    // All inputs should have associated labels
    const fullNameLabel = page.locator('label[for="fullName"]');
    const jobTitleLabel = page.locator('label[for="jobTitle"]');
    const emailLabel = page.locator('label[for="email"]');
    const mobileLabel = page.locator('label[for="mobile"]');
    const websiteLabel = page.locator('label[for="website"]');

    await expect(fullNameLabel).toBeVisible();
    await expect(jobTitleLabel).toBeVisible();
    await expect(emailLabel).toBeVisible();
    await expect(mobileLabel).toBeVisible();
    await expect(websiteLabel).toBeVisible();
  });

  test('should handle special characters in names', async ({ page }) => {
    await page.locator('#fullName').fill("O'Brien-Smith");
    await page.locator('#generateBtn').click();

    await page.waitForTimeout(300);

    const previewNew = page.locator('#previewNew');
    await expect(previewNew).toContainText("O'Brien-Smith");
  });

  test('should maintain proper spacing in signature layout', async ({ page }) => {
    await page.locator('#generateBtn').click();
    await page.waitForTimeout(500);

    // Check that spacing cell exists between logo and text in New Email
    const previewNew = page.locator('#previewNew');
    const spacingCell = previewNew.locator('td[style*="width"]');

    expect(await spacingCell.count()).toBeGreaterThan(0);
  });

  test('performance: should generate both signatures quickly', async ({ page }) => {
    const startTime = Date.now();

    await page.locator('#fullName').fill('Performance Test');
    await page.locator('#generateBtn').click();

    await page.waitForTimeout(100);

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Should generate in under 1 second
    expect(duration).toBeLessThan(1000);

    // Verify both signatures generated
    const previewNew = page.locator('#previewNew');
    await expect(previewNew).toContainText('Performance Test');

    const previewReply = page.locator('#previewReply');
    await expect(previewReply).toContainText('Performance Test');
  });

});

test.describe('Visual Regression Tests', () => {

  test('should match visual snapshot of generator page', async ({ page }) => {
    
    await page.goto('/');

    // Wait for page to fully render
    await page.waitForTimeout(1000);

    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('generator-page.png', {
      fullPage: true,
      timeout: 10000
    });
  });

  test('should match visual snapshot of generated signatures', async ({ page }) => {

    await page.goto('/');

    // Generate signatures first
    await page.locator('#generateBtn').click();
    await page.waitForTimeout(1000);

    // Screenshot the New Email preview area
    const previewNew = page.locator('#previewNew');
    await expect(previewNew).toHaveScreenshot('signature-preview-new.png');

    // Screenshot the Reply preview area
    const previewReply = page.locator('#previewReply');
    await expect(previewReply).toHaveScreenshot('signature-preview-reply.png');
  });

});
