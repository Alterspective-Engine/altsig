# Coding Standards - AltSig Project

**Version:** 1.0.0
**Last Updated:** 2025-11-17
**Project:** Alterspective Email Signature Generator
**Status:** Active

---

## Table of Contents

1. [General Principles](#general-principles)
2. [HTML Standards](#html-standards)
3. [CSS Standards](#css-standards)
4. [JavaScript Standards](#javascript-standards)
5. [Email HTML Standards](#email-html-standards)
6. [Testing Standards](#testing-standards)
7. [Code Review Process](#code-review-process)

---

## General Principles

### Code Quality Fundamentals

**1. Readability Over Cleverness**
- Write code that is easy to understand
- Use clear, descriptive names
- Add comments only when "why" is not obvious from code
- Prefer explicit over implicit

**2. DRY (Don't Repeat Yourself)**
- Extract repeated logic into functions
- Create reusable components
- Avoid copy-paste programming
- Single source of truth for data

**3. KISS (Keep It Simple, Stupid)**
- Simplest solution that works
- Avoid over-engineering
- Don't add features "just in case"
- Reduce complexity

**4. YAGNI (You Aren't Gonna Need It)**
- Build what you need now
- Don't build for hypothetical futures
- Add complexity only when needed
- Focus on current requirements

**5. Separation of Concerns**
- HTML: Structure
- CSS: Presentation
- JavaScript: Behavior
- Each in its own file (when practical)

---

## HTML Standards

### Document Structure

#### Valid HTML5
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Description here">
    <title>Page Title | AltSig</title>
    <!-- External styles -->
    <link rel="stylesheet" href="assets/styles/main.css">
</head>
<body>
    <!-- Content -->

    <!-- Scripts at bottom -->
    <script src="assets/scripts/generator.js"></script>
</body>
</html>
```

### Semantic HTML

**✅ DO:**
```html
<header>
    <h1>Signature Generator</h1>
</header>

<main>
    <section class="form-section">
        <form id="signatureForm">
            <label for="fullName">Full Name</label>
            <input type="text" id="fullName" name="fullName" required>
        </form>
    </section>
</main>

<footer>
    <p>&copy; 2025 Alterspective</p>
</footer>
```

**❌ DON'T:**
```html
<div class="header">
    <div class="title">Signature Generator</div>
</div>

<div class="main">
    <div class="section">
        <div class="label">Full Name</div>
        <div class="input">
            <input type="text">
        </div>
    </div>
</div>
```

### Attributes Order
1. `id`
2. `class`
3. `name`
4. `type`
5. `value`
6. `required` / `disabled`
7. `aria-*`
8. `data-*`

```html
<input
    id="emailAddress"
    class="form-input form-input--required"
    name="email"
    type="email"
    value=""
    required
    aria-label="Email address"
    data-validation="email"
>
```

### Accessibility Requirements

**Required for All Interactive Elements:**
```html
<!-- Labels for inputs -->
<label for="mobile">Mobile Number</label>
<input id="mobile" type="tel">

<!-- Alt text for images -->
<img src="logo.png" alt="Alterspective Logo">

<!-- ARIA labels for icons -->
<button aria-label="Copy to clipboard">
    <svg aria-hidden="true">...</svg>
</button>

<!-- Keyboard accessible -->
<div
    role="button"
    tabindex="0"
    aria-label="Generate signature"
    onkeypress="handleKeyPress(event)"
>
    Generate
</div>
```

---

## CSS Standards

### Naming Convention: BEM

**Block Element Modifier**
```css
/* Block */
.signature-form { }

/* Element */
.signature-form__input { }
.signature-form__label { }
.signature-form__button { }

/* Modifier */
.signature-form__input--required { }
.signature-form__input--error { }
.signature-form__button--primary { }
.signature-form__button--disabled { }
```

### CSS Organization

```css
/* ==========================================
   1. CSS VARIABLES
   ========================================== */
:root {
    /* Colors */
    --color-primary: #2C8248;
    --color-secondary: #08233D;
    --color-accent: #ABDD65;
    --color-background: #F5F5F5;
    --color-text: #333333;
    --color-error: #DC3545;

    /* Spacing */
    --spacing-xs: 4px;
    --spacing-sm: 8px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;

    /* Typography */
    --font-primary: 'Montserrat', sans-serif;
    --font-secondary: Georgia, serif;
    --font-size-sm: 13px;
    --font-size-md: 16px;
    --font-size-lg: 18px;
    --font-size-xl: 26px;
}

/* ==========================================
   2. RESET / BASE STYLES
   ========================================== */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* ==========================================
   3. TYPOGRAPHY
   ========================================== */
body {
    font-family: var(--font-primary);
    font-size: var(--font-size-md);
    line-height: 1.6;
    color: var(--color-text);
}

h1, h2, h3 {
    font-family: var(--font-secondary);
}

/* ==========================================
   4. LAYOUT
   ========================================== */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: var(--spacing-lg);
}

/* ==========================================
   5. COMPONENTS
   ========================================== */
.btn {
    padding: var(--spacing-sm) var(--spacing-md);
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn--primary {
    background-color: var(--color-primary);
    color: white;
}

/* ==========================================
   6. UTILITIES
   ========================================== */
.hidden {
    display: none !important;
}

.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
}

/* ==========================================
   7. MEDIA QUERIES
   ========================================== */
@media (max-width: 768px) {
    .container {
        padding: var(--spacing-md);
    }
}
```

### CSS Best Practices

**✅ DO:**
- Use CSS variables for colors, spacing, fonts
- Use relative units (rem, em, %) over absolute (px)
- Mobile-first approach for media queries
- Consistent naming with BEM
- Group related properties
- Alphabetize properties within groups

**❌ DON'T:**
- Use `!important` (except for utilities)
- Use inline styles (except email HTML)
- Use overly specific selectors
- Use ID selectors for styling (#id)
- Use magic numbers (explain or use variables)

---

## JavaScript Standards

### Code Style

#### Variables
```javascript
// Use const by default
const userName = 'John Smith';
const config = { timeout: 5000 };

// Use let only when reassignment needed
let counter = 0;
counter++;

// Never use var
// ❌ var oldStyle = 'deprecated';
```

#### Functions
```javascript
// Named functions for clarity
function generateSignature(userData) {
    // Validate inputs
    if (!userData.name) {
        throw new Error('Name is required');
    }

    // Clear logic
    const template = getTemplate();
    const html = populateTemplate(template, userData);

    return html;
}

// Arrow functions for callbacks
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);

// Async/await for promises
async function fetchUserData(userId) {
    try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw error;
    }
}
```

#### Error Handling
```javascript
// Always handle errors explicitly
function parsePhoneNumber(phone) {
    if (!phone || typeof phone !== 'string') {
        throw new TypeError('Phone must be a non-empty string');
    }

    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');

    if (digits.length < 10) {
        throw new Error('Phone number must have at least 10 digits');
    }

    return digits;
}

// Use try-catch for operations that can fail
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showSuccessMessage('Copied to clipboard!');
    } catch (error) {
        console.error('Clipboard write failed:', error);
        showErrorMessage('Failed to copy. Please try manually.');
    }
}
```

### Documentation

#### JSDoc Comments
```javascript
/**
 * Generates an email signature HTML from user data
 * @param {Object} userData - User information
 * @param {string} userData.name - Full name of the employee
 * @param {string} userData.title - Job title
 * @param {string} userData.email - Email address
 * @param {string} userData.phone - Mobile phone number
 * @param {string} [userData.website] - Website URL (optional)
 * @returns {string} Complete HTML signature ready to copy
 * @throws {Error} If required fields are missing
 *
 * @example
 * const signature = generateSignature({
 *   name: 'John Smith',
 *   title: 'Managing Director',
 *   email: 'john@example.com',
 *   phone: '0412 345 678'
 * });
 */
function generateSignature(userData) {
    // Implementation
}
```

### Module Organization

```javascript
// ==========================================
// CONSTANTS
// ==========================================
const CONFIG = {
    MAX_NAME_LENGTH: 50,
    LOGO_PATH: 'assets/images/alterspective-symbol.png',
    DEFAULT_WEBSITE: 'alterspective.com.au'
};

const BRAND_COLORS = {
    primary: '#2C8248',
    secondary: '#08233D',
    accent: '#ABDD65'
};

// ==========================================
// STATE
// ==========================================
let currentSignature = null;
let formValid = false;

// ==========================================
// UTILITY FUNCTIONS
// ==========================================
/**
 * Formats Australian mobile number to international format
 */
function formatPhoneNumber(phone) {
    const digits = phone.replace(/\D/g, '');
    return digits.startsWith('0')
        ? `+61${digits.slice(1)}`
        : `+61${digits}`;
}

/**
 * Validates email address format
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// ==========================================
// CORE FUNCTIONS
// ==========================================
function generateSignature(userData) {
    // Main signature generation logic
}

function populateTemplate(template, data) {
    // Template population logic
}

// ==========================================
// EVENT HANDLERS
// ==========================================
function handleFormSubmit(event) {
    event.preventDefault();

    const formData = getFormData();
    const signature = generateSignature(formData);
    displaySignature(signature);
}

function handleCopyClick(event) {
    copyToClipboard(currentSignature);
}

// ==========================================
// INITIALIZATION
// ==========================================
function init() {
    attachEventListeners();
    loadUserPreferences();
    generateInitialSignature();
}

// Run on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
```

---

## Email HTML Standards

### Critical Differences: Web HTML vs Email HTML

**⚠️ EMAIL HTML IS NOT WEB HTML**

Email clients have limited CSS support and render HTML differently than web browsers. Following these rules is **MANDATORY** for email signature generation.

### Table-Based Layout (REQUIRED)

**✅ CORRECT for Email:**
```html
<!-- Use tables for all layout -->
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
    <tr>
        <td style="padding: 10px; vertical-align: top;">
            <!-- Logo column -->
            <img src="logo.png" width="120" height="120" alt="Logo">
        </td>
        <td style="padding: 10px; vertical-align: top;">
            <!-- Content column -->
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td style="font-size: 26px; color: #08233D;">
                        John Smith
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
```

**❌ WRONG for Email:**
```html
<!-- DON'T use divs, flexbox, or grid for email -->
<div class="signature">
    <div class="logo-column">
        <img src="logo.png">
    </div>
    <div class="content-column">
        <h1>John Smith</h1>
    </div>
</div>
```

### Inline CSS (REQUIRED)

**✅ CORRECT:**
```html
<!-- All styles must be inline -->
<td style="font-family: Arial, sans-serif; font-size: 18px; color: #08233D; padding: 5px 0;">
    Managing Director
</td>
```

**❌ WRONG:**
```html
<!-- No external stylesheets -->
<link rel="stylesheet" href="styles.css">

<!-- No style blocks -->
<style>
.title { font-size: 18px; }
</style>

<!-- No classes for styling -->
<td class="title">Managing Director</td>
```

### Image Handling for Email

**Base64 Embedding (REQUIRED for Signatures):**
```html
<!-- Embed image as base64 data URL -->
<img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgA..."
    width="120"
    height="120"
    alt="Alterspective Logo"
    style="display: block; border: 0;"
>
```

**Why base64?**
- No broken images when copying/pasting
- Works in all email clients
- No external dependencies
- Signature is self-contained

### Email-Safe CSS Properties

**✅ SAFE (Use These):**
```css
/* Typography */
font-family: Arial, sans-serif;
font-size: 16px;
font-weight: bold;
color: #333333;
text-align: left;

/* Spacing */
padding: 10px;
margin: 0;  /* Limited support */

/* Borders */
border: 1px solid #cccccc;
border-left: 2px solid #2C8248;

/* Display */
display: block;
display: inline;
display: table;
display: table-cell;
vertical-align: top;

/* Dimensions */
width: 200px;
height: auto;
```

**❌ AVOID (Poor Support):**
```css
/* Modern layout */
display: flex;
display: grid;
position: absolute;
position: fixed;

/* CSS3 features */
border-radius: 5px;  /* Some support */
box-shadow: 0 2px 4px;  /* Poor support */
transform: rotate(10deg);  /* No support */
transition: all 0.3s;  /* No support */

/* Selectors */
.class > .child { }  /* Avoid complex selectors */
:hover { }  /* Limited support */
::before { }  /* No support */
```

### Complete Email Signature Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Signature</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">

    <!-- Main signature table -->
    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse; font-family: Arial, sans-serif;">
        <tr>
            <!-- Logo column -->
            <td style="vertical-align: top; padding-right: 15px;">
                <img
                    src="data:image/png;base64,[BASE64_DATA_HERE]"
                    width="120"
                    height="120"
                    alt="Alterspective Logo"
                    style="display: block; border: 0;"
                >
            </td>

            <!-- Divider column -->
            <td style="vertical-align: top; padding-right: 15px;">
                <table cellpadding="0" cellspacing="0" border="0" style="height: 120px; border-collapse: collapse;">
                    <tr>
                        <td style="width: 2px; border-left: 2px solid #2C8248; font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>
                </table>
            </td>

            <!-- Content column -->
            <td style="vertical-align: top;">
                <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                    <!-- Name -->
                    <tr>
                        <td style="font-family: Georgia, serif; font-size: 26px; font-weight: normal; color: #08233D; padding-bottom: 2px;">
                            John Smith
                        </td>
                    </tr>
                    <!-- Title -->
                    <tr>
                        <td style="font-family: Georgia, serif; font-size: 18px; font-weight: normal; color: #08233D; padding-bottom: 8px;">
                            Managing Director
                        </td>
                    </tr>
                    <!-- Email -->
                    <tr>
                        <td style="font-family: Arial, sans-serif; font-size: 13px; color: #2C8248; padding: 1px 0;">
                            e. <a href="mailto:john@example.com" style="color: #2C8248; text-decoration: none;">john@example.com</a>
                        </td>
                    </tr>
                    <!-- Phone -->
                    <tr>
                        <td style="font-family: Arial, sans-serif; font-size: 13px; color: #2C8248; padding: 1px 0;">
                            m. <a href="tel:+61412345678" style="color: #2C8248; text-decoration: none;">0412 345 678</a>
                        </td>
                    </tr>
                    <!-- Website -->
                    <tr>
                        <td style="font-family: Arial, sans-serif; font-size: 13px; color: #2C8248; padding: 1px 0;">
                            w. <a href="https://www.alterspective.com.au" target="_blank" style="color: #2C8248; text-decoration: none;">alterspective.com.au</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>
</html>
```

### Email Testing Requirements

**Test in ALL of these:**
- ✅ Outlook 2016+ (Windows)
- ✅ Outlook for Mac
- ✅ Outlook Web (Office 365)
- ✅ Gmail (web interface)
- ✅ Apple Mail (macOS/iOS)
- ✅ Thunderbird

**Never assume it works without testing!**

---

## Testing Standards

### Test Coverage Requirements

**Minimum Coverage:**
- Core functionality: 90%
- Edge cases: 80%
- Error handling: 100%

### Playwright Test Structure

```javascript
// tests/signature-generator.spec.js

const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Signature Generator', () => {

    // Setup before each test
    test.beforeEach(async ({ page }) => {
        const filePath = path.join(__dirname, '..', 'public', 'index.html');
        await page.goto(`file://${filePath}`);
    });

    // Test organization: Feature > Scenario
    test.describe('Form Validation', () => {

        test('should show error for empty required fields', async ({ page }) => {
            // Arrange
            await page.locator('#fullName').fill('');

            // Act & Assert
            page.on('dialog', async dialog => {
                expect(dialog.message()).toContain('required');
                await dialog.accept();
            });

            await page.locator('#generateBtn').click();
        });

    });

    test.describe('Signature Generation', () => {

        test('should generate signature with all fields', async ({ page }) => {
            // Arrange
            await page.locator('#fullName').fill('John Smith');
            await page.locator('#jobTitle').fill('Director');
            await page.locator('#email').fill('john@example.com');
            await page.locator('#mobile').fill('0412 345 678');

            // Act
            await page.locator('#generateBtn').click();
            await page.waitForTimeout(500);

            // Assert
            const preview = page.locator('#preview');
            await expect(preview).toContainText('John Smith');
            await expect(preview).toContainText('Director');
            await expect(preview).toContainText('john@example.com');
        });

    });

});
```

### Test Best Practices

**✅ DO:**
- Write descriptive test names
- Follow Arrange-Act-Assert pattern
- Test user behavior, not implementation
- Use meaningful assertions
- Clean up after tests
- Run tests before commits

**❌ DON'T:**
- Test implementation details
- Write flaky tests
- Depend on test execution order
- Use magic numbers
- Skip cleanup

---

## Code Review Process

### Before Submitting Code

**Self-Review Checklist:**
- [ ] Code follows naming conventions
- [ ] No console.log() statements (unless intentional)
- [ ] No commented-out code
- [ ] No TODOs (create issues instead)
- [ ] Tests pass (`npm test`)
- [ ] Linting passes (`npm run lint`)
- [ ] No merge conflicts
- [ ] Changes documented
- [ ] Email HTML tested in Outlook

### Commit Standards

**Conventional Commits Format:**
```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation only
- `style:` - Code style (formatting, no logic change)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**
```
feat(generator): add phone number validation

Validate Australian mobile phone format before generating
signature. Shows error if format is invalid.

Closes #42
```

```
fix(email-template): correct divider border in Outlook

Changed divider from div with background to table with
border-left for better Outlook compatibility.
```

---

## Quality Gates

### Definition of Done

Code is considered "done" when:
- [ ] Functionality complete and tested
- [ ] All tests pass
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] No linting errors
- [ ] Deployed to staging and verified
- [ ] Email signatures tested in Outlook
- [ ] Meets accessibility standards
- [ ] Performance acceptable (<2s load time)

---

## Enforcement

These standards are **mandatory** for all code in the AltSig project. Code that doesn't meet these standards should not be merged.

Use automated tools where possible:
- ESLint for JavaScript
- Stylelint for CSS
- Prettier for formatting
- Playwright for testing

**Questions?** Contact project maintainer or refer to:
- PROJECT-TAXONOMY.md
- EMAIL-HTML-GUIDE.md
- QUALITY-ASSURANCE.md

---

**Document Control**
- **Version:** 1.0.0
- **Created:** 2025-11-17
- **Author:** Claude Code
- **Status:** Active
- **Review Date:** 2026-05-17 (6 months)
