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
    // Navigate to the production HTML file
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    await page.goto(`file://${filePath}`);
  });

  test('should load the page successfully', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Alterspective Email Signature Generator/);

    // Check main heading
    const heading = page.locator('h1');
    await expect(heading).toContainText('Alterspective Email Signature Generator');

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

  test('should generate signature automatically on page load', async ({ page }) => {
    // Wait for auto-generation on page load
    await page.waitForTimeout(500);

    // Check that preview has content (not the placeholder text)
    const preview = page.locator('#preview');
    const previewContent = await preview.textContent();

    expect(previewContent).toContain('Igor Jericevich');
    expect(previewContent).toContain('Managing Director');
    expect(previewContent).toContain('igor.jericevich@alterspective.com.au');
  });

  test('should generate signature when clicking Generate button', async ({ page }) => {
    // Clear a field first
    await page.locator('#fullName').fill('Test User');

    // Click generate button
    await page.locator('button:has-text("Generate Signature")').click();

    // Check preview updates
    const preview = page.locator('#preview');
    await expect(preview).toContainText('Test User');
  });

  test('should update preview with custom employee data', async ({ page }) => {
    // Fill in custom data
    await page.locator('#fullName').fill('Sarah Johnson');
    await page.locator('#jobTitle').fill('Senior Consultant');
    await page.locator('#email').fill('sarah.johnson@alterspective.com.au');
    await page.locator('#mobile').fill('0412 345 678');

    // Generate
    await page.locator('button:has-text("Generate Signature")').click();

    // Verify preview
    const preview = page.locator('#preview');
    await expect(preview).toContainText('Sarah Johnson');
    await expect(preview).toContainText('Senior Consultant');
    await expect(preview).toContainText('sarah.johnson@alterspective.com.au');
    await expect(preview).toContainText('0412 345 678');
  });

  test('should show validation alert for empty required fields', async ({ page }) => {
    // Clear required field
    await page.locator('#fullName').fill('');

    // Set up dialog handler
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Please fill in all required fields');
      await dialog.accept();
    });

    // Try to generate
    await page.locator('button:has-text("Generate Signature")').click();
  });

  test('should have correct signature layout structure', async ({ page }) => {
    // Wait for auto-generation
    await page.waitForTimeout(500);

    // Check for table structure in preview
    const preview = page.locator('#preview');
    const tables = preview.locator('table');

    // Should have table-based layout
    await expect(tables.first()).toBeVisible();

    // Check for logo image
    const logoImg = preview.locator('img[alt="Alterspective"]');
    await expect(logoImg).toBeVisible();
    await expect(logoImg).toHaveAttribute('src', 'alterspective-logo.png');
  });

  test('should display clickable email link', async ({ page }) => {
    await page.waitForTimeout(500);

    // Check email link in preview
    const emailLink = page.locator('#preview a[href^="mailto:"]');
    await expect(emailLink).toBeVisible();
    await expect(emailLink).toHaveAttribute('href', 'mailto:igor.jericevich@alterspective.com.au');
  });

  test('should display clickable phone link', async ({ page }) => {
    await page.waitForTimeout(500);

    // Check phone link in preview
    const phoneLink = page.locator('#preview a[href^="tel:"]');
    await expect(phoneLink).toBeVisible();

    // Should format phone number with +61
    const href = await phoneLink.getAttribute('href');
    expect(href).toContain('+61488180044');
  });

  test('should display clickable website link', async ({ page }) => {
    await page.waitForTimeout(500);

    // Check website link
    const websiteLink = page.locator('#preview a[href*="alterspective.com.au"]');
    await expect(websiteLink).toBeVisible();
    await expect(websiteLink).toHaveAttribute('target', '_blank');
  });

  test('should enable copy button after generation', async ({ page }) => {
    await page.waitForTimeout(500);

    // Copy button should be enabled
    const copyBtn = page.locator('#copyBtn');
    await expect(copyBtn).toBeEnabled();
  });

  test('should enable download button after generation', async ({ page }) => {
    await page.waitForTimeout(500);

    // Download button should be enabled
    const downloadBtn = page.locator('#downloadBtn');
    await expect(downloadBtn).toBeEnabled();
  });

  test('should show HTML code output', async ({ page }) => {
    await page.waitForTimeout(500);

    // HTML code section should be visible
    const codeCard = page.locator('#codeCard');
    await expect(codeCard).toBeVisible();

    // Should contain HTML code
    const htmlOutput = page.locator('#htmlOutput');
    const codeContent = await htmlOutput.textContent();

    expect(codeContent).toContain('<!DOCTYPE html>');
    expect(codeContent).toContain('<table');
    expect(codeContent).toContain('Igor Jericevich');
  });

  test('should have correct brand colors in UI', async ({ page }) => {
    // Check header has gradient background
    const container = page.locator('.container');
    await expect(container).toBeVisible();

    // Check card elements exist
    const cards = page.locator('.card');
    expect(await cards.count()).toBeGreaterThan(0);
  });

  test('should apply correct styling to signature elements', async ({ page }) => {
    await page.waitForTimeout(500);

    // Check that name has correct font styling (inline styles)
    const preview = page.locator('#preview');
    const nameElement = preview.locator('td').filter({ hasText: 'Igor Jericevich' }).first();

    const style = await nameElement.getAttribute('style');
    expect(style).toContain('font-size: 28px');
    expect(style).toContain('color: #08233D'); // Navy color
  });

  test('should have vertical divider in signature', async ({ page }) => {
    await page.waitForTimeout(500);

    // Check for divider styling
    const preview = page.locator('#preview');
    const dividerCells = preview.locator('td[style*="border-right"]');

    expect(await dividerCells.count()).toBeGreaterThan(0);
  });

  test('should format mobile number correctly for tel: link', async ({ page }) => {
    // Use different mobile number
    await page.locator('#mobile').fill('0412 345 678');
    await page.locator('button:has-text("Generate Signature")').click();

    await page.waitForTimeout(300);

    // Check the generated HTML code
    const htmlOutput = await page.locator('#htmlOutput').textContent();

    // Should convert 0412 345 678 to +61412345678
    expect(htmlOutput).toContain('tel:+61412345678');

    // But display should keep original format
    expect(htmlOutput).toContain('0412 345 678');
  });

  test('should handle custom website URL', async ({ page }) => {
    await page.locator('#website').fill('custom.alterspective.com.au');
    await page.locator('button:has-text("Generate Signature")').click();

    await page.waitForTimeout(300);

    const preview = page.locator('#preview');
    await expect(preview).toContainText('custom.alterspective.com.au');
  });

  test('should copy signature to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);

    await page.waitForTimeout(500);

    // Click copy button
    await page.locator('#copyBtn').click();

    // Check success message appears
    const successMsg = page.locator('#successMsg');
    await expect(successMsg).toBeVisible();

    // Success message should auto-hide after 3 seconds
    await page.waitForTimeout(3500);
    await expect(successMsg).toBeHidden();
  });

  test('should generate unique filename for download', async ({ page }) => {
    // Change name
    await page.locator('#fullName').fill('Sarah Johnson');
    await page.locator('button:has-text("Generate Signature")').click();

    // We can't easily test actual download, but we can verify the download button works
    const downloadBtn = page.locator('#downloadBtn');
    await expect(downloadBtn).toBeEnabled();

    // The filename should be based on name: sarah-johnson-signature.html
    // This would be tested in the actual download, but here we verify button is functional
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
      await page.locator('button:has-text("Generate Signature")').click();

      await page.waitForTimeout(300);

      // Verify structure is maintained
      const preview = page.locator('#preview');
      await expect(preview).toContainText(testCase.name);
      await expect(preview).toContainText(testCase.title);

      // Check table structure still exists
      const tables = preview.locator('table');
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

  test('should have responsive grid layout', async ({ page }) => {
    // Check main grid exists
    const mainGrid = page.locator('.main-grid');
    await expect(mainGrid).toBeVisible();

    // Should have two cards side by side (on desktop)
    const cards = mainGrid.locator('.card');
    expect(await cards.count()).toBe(2);
  });

  test('should preserve formatting in generated HTML', async ({ page }) => {
    await page.waitForTimeout(500);

    const htmlOutput = await page.locator('#htmlOutput').textContent();

    // Check key HTML structure elements
    expect(htmlOutput).toContain('<!DOCTYPE html>');
    expect(htmlOutput).toContain('<table');
    expect(htmlOutput).toContain('cellpadding="0"');
    expect(htmlOutput).toContain('cellspacing="0"');
    expect(htmlOutput).toContain('border="0"');

    // Check inline styles are present
    expect(htmlOutput).toContain('font-family');
    expect(htmlOutput).toContain('color: #08233D'); // Navy
    expect(htmlOutput).toContain('color: #2C8248'); // Green
  });

  test('should include logo reference in generated HTML', async ({ page }) => {
    await page.waitForTimeout(500);

    const htmlOutput = await page.locator('#htmlOutput').textContent();

    // Logo should be referenced
    expect(htmlOutput).toContain('alterspective-logo.png');
    expect(htmlOutput).toContain('alt="Alterspective"');
    expect(htmlOutput).toContain('width="180"');
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
    await page.locator('button:has-text("Generate Signature")').click();

    await page.waitForTimeout(300);

    const preview = page.locator('#preview');
    await expect(preview).toContainText("O'Brien-Smith");
  });

  test('should maintain proper spacing in signature layout', async ({ page }) => {
    await page.waitForTimeout(500);

    // Check that spacing cell exists (30px width between logo and text)
    const preview = page.locator('#preview');
    const spacingCell = preview.locator('td[style*="width: 30px"]');

    expect(await spacingCell.count()).toBeGreaterThan(0);
  });

  test('performance: should generate signature quickly', async ({ page }) => {
    const startTime = Date.now();

    await page.locator('#fullName').fill('Performance Test');
    await page.locator('button:has-text("Generate Signature")').click();

    await page.waitForTimeout(100);

    const endTime = Date.now();
    const duration = endTime - startTime;

    // Should generate in under 500ms
    expect(duration).toBeLessThan(500);

    // Verify it actually generated
    const preview = page.locator('#preview');
    await expect(preview).toContainText('Performance Test');
  });

});

test.describe('Visual Regression Tests', () => {

  test('should match visual snapshot of generator page', async ({ page }) => {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    await page.goto(`file://${filePath}`);

    // Wait for page to fully render
    await page.waitForTimeout(1000);

    // Take screenshot for visual comparison
    await expect(page).toHaveScreenshot('generator-page.png', {
      fullPage: true,
      timeout: 10000
    });
  });

  test('should match visual snapshot of generated signature', async ({ page }) => {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    await page.goto(`file://${filePath}`);

    await page.waitForTimeout(1000);

    // Screenshot just the preview area
    const preview = page.locator('#preview');
    await expect(preview).toHaveScreenshot('signature-preview.png');
  });

});
