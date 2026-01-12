# AltSig Technical Summary

**Version:** 1.0.0
**Updated:** 2026-01-12
**Purpose:** Comprehensive technical reference for maintaining the AltSig email signature generator

---

## Quick Reference

### URLs
| Environment | URL | Port |
|-------------|-----|------|
| **Production** | https://brave-stone-0b7eb4800.3.azurestaticapps.net | - |
| **Local Dev** | http://localhost:3000 | 3000 |
| **Dev (ngrok)** | https://dev-altsig.alterspective.io | 3000 |

### Start Commands
```bash
# Local development
start.bat              # Windows
npm run serve          # Any platform

# Testing
npm test               # Run all Playwright tests
npm run test:headed    # Run with browser visible
npm run test:chromium  # Chromium only
```

---

## Architecture Overview

```
public/
├── index.html                    # Main web page
├── themed-signatures.html        # Holiday/seasonal signatures
└── assets/
    ├── images/                   # Logo files
    ├── styles/
    │   ├── main.css             # Main UI styles
    │   └── themes.css           # Seasonal theme styles
    └── scripts/
        ├── app.js               # Entry point (DI container)
        ├── config.js            # Configuration + base64 logo (67KB)
        ├── signature-generator.js # Core generation logic
        ├── ui-controller.js     # DOM manipulation
        ├── clipboard-handler.js # Copy to clipboard
        └── download-handler.js  # File download
```

### Module Responsibilities

| Module | Responsibility | DOM Access |
|--------|---------------|------------|
| `app.js` | Dependency injection, initialization | No |
| `config.js` | All configuration constants, base64 logo | No |
| `signature-generator.js` | Generate HTML signatures | No |
| `ui-controller.js` | DOM manipulation, event handling | Yes |
| `clipboard-handler.js` | Copy HTML to clipboard | Yes |
| `download-handler.js` | Download signature as file | Yes |

---

## Email HTML Critical Patterns

### 1. Vertical Divider Line

**WORKING PATTERN (use this):**
```html
<td style="border-right: 2px solid #2C8248; padding-right: 15px;">
    <img src="[base64]" width="120" height="120" style="display: block; border: 0;">
</td>
<td style="width: 15px;">&nbsp;</td>  <!-- Spacer -->
<td>Contact information...</td>
```

**Why it works:**
- `border-right` on cells with content (logo image) is reliable in Outlook
- No separate divider element to get stripped during copy/paste
- Simpler HTML = fewer rendering bugs

**BROKEN PATTERNS (do NOT use):**
```html
<!-- FAILS: background-color on empty cell -->
<td style="width: 2px; background-color: #2C8248;">&nbsp;</td>

<!-- FAILS: border-left on empty cell -->
<td style="border-left: 2px solid #2C8248;">&nbsp;</td>

<!-- FAILS: div-based divider -->
<td><div style="width: 2px; background-color: #2C8248;"></div></td>
```

### 2. Line Height

**ALWAYS use `100%`:**
```html
<td style="line-height: 100%;">Text</td>
```

**NEVER use numeric values:**
```html
<!-- WRONG - causes spacing issues in Outlook -->
<td style="line-height: 1.2;">Text</td>
```

### 3. Images (Base64 Required)

**For email signatures, images MUST be base64 embedded:**
```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
     width="120"
     height="120"
     alt="Alterspective"
     style="display: block; border: 0;">
```

**Required attributes:**
- `width` and `height` - Prevents layout shifts, required for Outlook
- `alt` - Accessibility
- `style="display: block; border: 0;"` - Removes gaps and borders

### 4. Table Structure

**Always include these attributes:**
```html
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
```

### 5. Link Styling

**Email links should have inline color:**
```html
<a href="mailto:email@example.com" style="color: #17232D !important; text-decoration: none;">
    <span style="color: #17232D !important;">email@example.com</span>
</a>
```

The `<span>` wrapper with color ensures the color persists in Outlook.

---

## Signature Specifications

### New Email Signature (Full)

| Property | Value |
|----------|-------|
| Logo Size | 120x120px |
| Divider | 2px solid #2C8248 |
| Divider Method | `border-right` on logo cell |
| Spacing | 15px |
| Name Font Size | 16px |
| Title Font Size | 13px |
| Contact Font Size | 12px |
| Line Height | 100% |

### Reply Signature (Compact)

| Property | Value |
|----------|-------|
| Logo Size | 40x40px |
| Divider | 1px solid #2C8248 |
| Divider Method | `border-right` on logo cell |
| Spacing | 10px |
| Name Font Size | 14px |
| Title Font Size | 13px |
| Contact Font Size | 13px |
| Line Height | 100% (1.2 for content) |

---

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Navy | `#17232D` | Primary text, headings, contact info |
| Green | `#2C8248` | Divider line, job title, labels (P:, E:, W:) |
| Citrus | `#ABDD65` | Accent highlights |
| Marine | `#075156` | Backgrounds, buttons |
| Pale Blue | `#E5EEEF` | Light backgrounds |

---

## Font Stack

```css
/* Name (Georgia) */
font-family: Georgia, 'Times New Roman', Times, serif;

/* Body/Contact (Arial) */
font-family: Arial, Helvetica, sans-serif;
```

---

## Testing Requirements

### Before ANY Change to Signature Generation

1. Run Playwright tests:
   ```bash
   npm test
   ```

2. Manual test in Outlook:
   - Generate signature
   - Copy to clipboard
   - Paste in Outlook signature settings
   - **Verify:** Divider line visible
   - **Verify:** Logo displays correctly
   - **Verify:** Links are clickable
   - Send test email
   - **Verify:** Received email looks correct

### Test Files

| Test File | Purpose |
|-----------|---------|
| `test-signature-generator.spec.js` | Core functionality (30+ tests) |
| `debug-dual-signature.spec.js` | Dual signature generation |
| `test-production-live.spec.js` | Production site testing |
| `test-themed-generation.spec.js` | Holiday signatures |

---

## Common Issues & Solutions

### Issue: Divider not showing in Outlook
**Solution:** Ensure using `border-right` on logo cell, not separate divider element

### Issue: Spacing looks wrong in Outlook
**Solution:** Check all `line-height` values are `100%`, not numeric

### Issue: Logo not displaying
**Solution:** Ensure logo is base64 embedded, has width/height attributes

### Issue: Links not colored correctly
**Solution:** Wrap link text in `<span>` with `color` style, use `!important`

### Issue: Signature generation fails
**Solution:** Check for JavaScript syntax errors, run Playwright tests

---

## File Locations Quick Reference

| What | Where |
|------|-------|
| Main HTML | `public/index.html` |
| Signature generation | `public/assets/scripts/signature-generator.js` |
| Configuration | `public/assets/scripts/config.js` |
| Base64 logo | Embedded in `config.js` |
| Logo image file | `public/assets/images/Alterspective_Symbol_FA.png` |
| Tests | `tests/*.spec.js` |
| Email HTML guide | `docs/EMAIL-HTML-GUIDE.md` |
| Divider fix docs | `docs/OUTLOOK-DIVIDER-FIX.md` |

---

## Deployment

### Azure Static Web Apps

- **Provider:** Azure Static Web Apps
- **Repository:** GitHub (Alterspective-Engine/altsig)
- **Build:** None required (static files)
- **Deploy folder:** `/public`
- **CI/CD:** `.github/workflows/azure-static-web-apps.yml`

### Manual Deployment Checklist

1. [ ] All tests pass (`npm test`)
2. [ ] Manual Outlook test completed
3. [ ] CHANGELOG.md updated
4. [ ] Commit and push to main branch
5. [ ] Verify Azure deployment succeeded
6. [ ] Test production URL

---

## Pre-Update Checklist

Before making ANY changes to email signature code:

- [ ] Read this document
- [ ] Read `docs/EMAIL-HTML-GUIDE.md`
- [ ] Read `docs/OUTLOOK-DIVIDER-FIX.md`
- [ ] Understand the current implementation
- [ ] Plan changes before coding
- [ ] After changes: Run Playwright tests
- [ ] After changes: Test in Outlook (REQUIRED)
- [ ] Update CHANGELOG.md

---

## Emergency Recovery

If signature generation breaks:

```bash
# Check git history for working version
git log --oneline -10

# Restore specific file from commit
git checkout <commit-hash> -- public/assets/scripts/signature-generator.js

# Or restore entire public folder
git checkout <commit-hash> -- public/
```

---

**Remember:** Email HTML is NOT web HTML. Always test in Outlook before claiming anything works.
