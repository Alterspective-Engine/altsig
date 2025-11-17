# AltSig Project Taxonomy

**Version:** 1.0.0
**Last Updated:** 2025-11-04
**Project:** Alterspective Email Signature Generator
**Deployment Target:** Azure Static Web Apps

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Directory Structure](#directory-structure)
3. [Naming Conventions](#naming-conventions)
4. [File Organization](#file-organization)
5. [Versioning Strategy](#versioning-strategy)
6. [Asset Management](#asset-management)
7. [Documentation Standards](#documentation-standards)

---

## Project Overview

### Project Identity
- **Project Name:** AltSig (Alterspective Signature Generator)
- **Repository Name:** `altsig` or `alterspective-signature-generator`
- **Primary Domain:** To be configured in Azure Static Web Apps
- **Purpose:** Web-based email signature generator for Alterspective employees

### Technology Stack
- **Frontend:** Vanilla HTML, CSS, JavaScript (ES6+)
- **Testing:** Playwright
- **Hosting:** Azure Static Web Apps
- **CI/CD:** GitHub Actions (via Azure Static Web Apps)

---

## Directory Structure

### Production Structure
```
altsig/
├── .github/                          # GitHub workflows and configs
│   └── workflows/
│       └── azure-static-web-apps.yml # Azure deployment workflow
│
├── public/                           # Public web root (served by Azure)
│   ├── index.html                    # Main signature generator
│   ├── assets/                       # Static assets
│   │   ├── images/
│   │   │   ├── alterspective-logo.png
│   │   │   └── alterspective-symbol.png
│   │   ├── styles/
│   │   │   └── main.css              # External stylesheet
│   │   └── scripts/
│   │       └── generator.js          # Signature generation logic
│   └── templates/                    # Email signature templates
│       └── email-signature-template.html
│
├── docs/                             # Project documentation
│   ├── DEPLOYMENT-GUIDE.md
│   ├── QUICK-START.md
│   ├── OUTLOOK-INSTALLATION-GUIDE.md
│   ├── CUSTOMIZATION-WORKSHEET.md
│   └── LOGO-EXPORT-GUIDE.md
│
├── tests/                            # Test files
│   ├── signature-generator.spec.js
│   └── snapshots/                    # Playwright snapshots
│
├── archive/                          # Archived/deprecated files
│   └── [dated-folders]/
│
├── .gitignore                        # Git ignore rules
├── staticwebapp.config.json          # Azure Static Web Apps config
├── package.json                      # NPM dependencies
├── package-lock.json                 # Locked dependencies
├── playwright.config.js              # Playwright configuration
├── README.md                         # Main project readme
└── PROJECT-TAXONOMY.md               # This file

```

### Folder Purpose Definitions

#### `/public/` - Web Root
- **Purpose:** All files served directly to users
- **Access:** Public (served by Azure Static Web Apps)
- **Contents:** HTML, CSS, JS, images, fonts
- **Restriction:** No sensitive data, no server-side code

#### `/public/assets/` - Static Assets
- **Purpose:** All static resources (images, styles, scripts)
- **Organization:**
  - `images/` - All image files (logos, icons)
  - `styles/` - CSS stylesheets
  - `scripts/` - JavaScript files
- **Naming:** Use kebab-case for all files

#### `/docs/` - Documentation
- **Purpose:** All project documentation
- **Format:** Markdown (.md) files
- **Naming:** UPPERCASE-WITH-DASHES.md
- **Audience:** Developers and end-users

#### `/tests/` - Test Suite
- **Purpose:** All test files and test-related assets
- **Framework:** Playwright
- **Naming:** `[feature-name].spec.js`
- **Snapshots:** Store in `/tests/snapshots/`

#### `/archive/` - Historical Files
- **Purpose:** Deprecated code, old versions, archived files
- **Organization:** By date `YYYY-MM-DD/` or by version `v1.x/`
- **Access:** Not served in production
- **Retention:** Keep for 6 months, then delete

---

## Naming Conventions

### File Naming Standards

#### HTML Files
- **Pattern:** `[purpose]-[descriptor].html`
- **Case:** kebab-case (all lowercase with hyphens)
- **Examples:**
  - `index.html` (main entry point)
  - `signature-generator.html`
  - `email-signature-template.html`

#### CSS Files
- **Pattern:** `[component/feature].css`
- **Case:** kebab-case
- **Examples:**
  - `main.css` (global styles)
  - `signature-preview.css`
  - `form-styles.css`

#### JavaScript Files
- **Pattern:** `[feature/module].js`
- **Case:** kebab-case
- **Examples:**
  - `generator.js`
  - `form-validator.js`
  - `clipboard-handler.js`

#### Image Files
- **Pattern:** `[brand/component]-[descriptor].[ext]`
- **Case:** kebab-case
- **Formats:** `.png`, `.svg`, `.jpg`, `.webp`
- **Examples:**
  - `alterspective-logo.png`
  - `alterspective-symbol.svg`
  - `icon-email.svg`

#### Documentation Files
- **Pattern:** `[SUBJECT]-[TYPE].md`
- **Case:** UPPERCASE-WITH-DASHES
- **Examples:**
  - `README.md`
  - `DEPLOYMENT-GUIDE.md`
  - `QUICK-START.md`
  - `API-REFERENCE.md`

#### Test Files
- **Pattern:** `[feature-name].spec.js` or `[feature-name].test.js`
- **Case:** kebab-case
- **Examples:**
  - `signature-generator.spec.js`
  - `form-validation.test.js`

### Directory Naming Standards
- **Case:** kebab-case (all lowercase)
- **Exceptions:**
  - `.github/` (GitHub convention)
  - `node_modules/` (npm convention)
- **Examples:**
  - `public/`
  - `assets/`
  - `test-results/`

### Variable Naming Standards (JavaScript)

#### Variables and Functions
- **Pattern:** camelCase
- **Examples:**
  ```javascript
  const fullName = 'John Smith';
  const emailAddress = 'john@example.com';
  function generateSignature() { }
  function formatPhoneNumber(phone) { }
  ```

#### Constants
- **Pattern:** UPPER_SNAKE_CASE
- **Examples:**
  ```javascript
  const LOGO_PATH = 'assets/images/alterspective-logo.png';
  const MAX_NAME_LENGTH = 50;
  const DEFAULT_WEBSITE = 'alterspective.com.au';
  ```

#### Classes
- **Pattern:** PascalCase
- **Examples:**
  ```javascript
  class SignatureGenerator { }
  class FormValidator { }
  ```

#### Private Variables
- **Pattern:** _camelCase (prefix with underscore)
- **Examples:**
  ```javascript
  const _privateConfig = {};
  function _internalHelper() { }
  ```

### CSS Naming Standards

#### Class Names (BEM Methodology)
- **Pattern:** `block__element--modifier`
- **Case:** kebab-case
- **Examples:**
  ```css
  .signature-form { }
  .signature-form__input { }
  .signature-form__input--required { }
  .btn--primary { }
  .card--preview { }
  ```

#### ID Selectors
- **Pattern:** camelCase
- **Usage:** Sparingly (prefer classes)
- **Examples:**
  ```css
  #fullName { }
  #previewSection { }
  ```

---

## File Organization

### HTML Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- 1. Meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="...">

    <!-- 2. Title -->
    <title>Page Title | AltSig</title>

    <!-- 3. External stylesheets -->
    <link rel="stylesheet" href="assets/styles/main.css">

    <!-- 4. Inline critical CSS (if needed) -->
    <style>/* Critical CSS */</style>
</head>
<body>
    <!-- Page content -->

    <!-- Scripts at end of body -->
    <script src="assets/scripts/generator.js"></script>
</body>
</html>
```

### JavaScript Module Organization
```javascript
// 1. Constants
const CONFIG = { };

// 2. State/Global variables
let generatedHTML = '';

// 3. Utility functions
function formatPhoneNumber(phone) { }

// 4. Core functions
function generateSignature() { }

// 5. Event handlers
function handleFormSubmit(event) { }

// 6. Initialization
document.addEventListener('DOMContentLoaded', init);
```

### CSS Organization
```css
/* 1. CSS Variables */
:root {
    --color-primary: #2C8248;
    --color-secondary: #08233D;
}

/* 2. Reset/Base styles */
* { box-sizing: border-box; }

/* 3. Typography */
body { font-family: sans-serif; }

/* 4. Layout */
.container { max-width: 1200px; }

/* 5. Components */
.btn { }
.card { }

/* 6. Utilities */
.hidden { display: none; }

/* 7. Media queries */
@media (max-width: 768px) { }
```

---

## Versioning Strategy

### Semantic Versioning (SemVer)
**Format:** `MAJOR.MINOR.PATCH`

#### Version Components
- **MAJOR:** Breaking changes (e.g., 1.0.0 → 2.0.0)
- **MINOR:** New features, backward compatible (e.g., 1.0.0 → 1.1.0)
- **PATCH:** Bug fixes, backward compatible (e.g., 1.0.0 → 1.0.1)

#### Pre-release Versions
- **Alpha:** `1.0.0-alpha.1` (internal testing)
- **Beta:** `1.0.0-beta.1` (external testing)
- **RC:** `1.0.0-rc.1` (release candidate)

### Version Documentation

#### package.json
```json
{
  "name": "altsig",
  "version": "1.0.0",
  "description": "Alterspective Email Signature Generator"
}
```

#### HTML Meta Tag
```html
<meta name="version" content="1.0.0">
<meta name="build-date" content="2025-11-04">
```

#### Git Tags
```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

### Version History Location
- **Primary:** `CHANGELOG.md` (keep at project root)
- **Format:** [Keep a Changelog](https://keepachangelog.com/)

---

## Asset Management

### Image Guidelines

#### Logo Files
- **Primary Logo:** `alterspective-logo.png`
  - Format: PNG with transparency
  - Size: 180px width (standard), 360px width (2x retina)
  - Location: `/public/assets/images/`

- **Symbol/Icon:** `alterspective-symbol.png`
  - Format: PNG or SVG
  - Size: 64px × 64px (icon), 512px × 512px (high-res)
  - Location: `/public/assets/images/`

#### Image Optimization
- **PNG:** Optimize with TinyPNG or similar
- **SVG:** Minify with SVGO
- **JPG:** 85% quality maximum
- **WebP:** Use for modern browsers with fallbacks

#### Image Naming
```
[brand/component]-[descriptor]-[size].[ext]

Examples:
alterspective-logo.png           (default size)
alterspective-logo-2x.png        (retina)
alterspective-logo.svg           (vector)
icon-email.svg
icon-phone.svg
background-header.webp
```

### Font Management
- **Primary Font:** System fonts for performance
- **Web Fonts:** Load via Google Fonts or self-host
- **Format:** WOFF2 (primary), WOFF (fallback)
- **Location:** `/public/assets/fonts/` (if self-hosted)

---

## Documentation Standards

### Required Documentation Files

#### 1. README.md (Project Root)
- Project overview
- Quick start guide
- Technology stack
- Installation instructions
- Basic usage
- Link to full documentation

#### 2. CHANGELOG.md
- Version history
- Release notes
- Breaking changes
- Bug fixes

#### 3. DEPLOYMENT-GUIDE.md
- Azure Static Web Apps setup
- Environment configuration
- CI/CD pipeline
- Domain setup
- SSL configuration

#### 4. CONTRIBUTING.md (if open source)
- Contribution guidelines
- Code standards
- Pull request process
- Testing requirements

### Documentation Format

#### Markdown Standards
- Use ATX-style headers (`#` not underlines)
- Use fenced code blocks with language tags
- Use relative links for internal docs
- Include table of contents for long docs

#### Code Examples
- Include complete, runnable examples
- Add comments explaining key steps
- Show expected output
- Include error handling

#### Version Information
Every documentation file should include:
```markdown
**Version:** 1.0.0
**Last Updated:** 2025-11-04
**Compatibility:** AltSig v1.x
```

---

## Best Practices

### Security
- Never commit API keys or secrets
- Use environment variables for configuration
- Sanitize all user inputs
- Validate file uploads
- Use HTTPS only in production

### Performance
- Minimize HTTP requests
- Optimize images
- Minify CSS and JS for production
- Use CDN for static assets
- Enable caching headers

### Accessibility
- Use semantic HTML
- Include alt text for images
- Ensure keyboard navigation
- Maintain color contrast ratios
- Test with screen readers

### SEO
- Include meta descriptions
- Use proper heading hierarchy
- Add Open Graph tags
- Create sitemap.xml
- Implement structured data

---

## Compliance Checklist

Before deploying to Azure Static Web Apps:

- [ ] All files follow naming conventions
- [ ] Directory structure matches taxonomy
- [ ] Version number updated in package.json
- [ ] CHANGELOG.md updated
- [ ] All documentation reviewed and current
- [ ] No sensitive data in repository
- [ ] Images optimized
- [ ] Code minified for production
- [ ] Tests passing
- [ ] staticwebapp.config.json configured
- [ ] GitHub Actions workflow set up
- [ ] Domain and SSL configured
- [ ] Analytics implemented (if required)

---

## Support and Maintenance

### Version Support Policy
- **Current version:** Full support
- **Previous major version:** Security updates only (6 months)
- **Older versions:** No support

### Update Schedule
- **Major releases:** Annually or as needed
- **Minor releases:** Quarterly or as needed
- **Patch releases:** As bugs are discovered

### Contact
For questions about this taxonomy:
- Project maintainer: [Your Name]
- Email: [your.email@alterspective.com.au]
- Repository: [GitHub URL]

---

**Document Control**
- **Created:** 2025-11-04
- **Author:** Claude Code Assistant
- **Status:** Active
- **Review Date:** 2026-05-04 (6 months)
