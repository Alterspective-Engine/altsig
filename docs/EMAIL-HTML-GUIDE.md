# Email HTML Development Guide

**Version:** 1.0.0
**Last Updated:** 2025-11-17
**Project:** AltSig Email Signature Generator
**Purpose:** Guidelines for creating HTML specifically for email clients

---

## ⚠️ CRITICAL WARNING

**EMAIL HTML ≠ WEB HTML**

Email clients have rendering engines from the 1990s. Modern CSS and HTML features **DO NOT WORK** in email. Following web development practices will result in broken email signatures.

**This is not optional. This is mandatory.**

---

## Table of Contents

1. [Why Email HTML Is Different](#why-email-html-is-different)
2. [Email Client Support Matrix](#email-client-support-matrix)
3. [Table-Based Layout](#table-based-layout)
4. [Inline CSS Rules](#inline-css-rules)
5. [Image Handling](#image-handling)
6. [Typography](#typography)
7. [Links and Buttons](#links-and-buttons)
8. [Common Pitfalls](#common-pitfalls)
9. [Testing Checklist](#testing-checklist)

---

## Why Email HTML Is Different

### The Problem

**Email clients render HTML differently than browsers:**

1. **Microsoft Outlook (Windows)** - Uses Microsoft Word's rendering engine
2. **Gmail** - Strips many CSS properties and JavaScript
3. **Apple Mail** - Best support but still limited
4. **Outlook.com** - Different from desktop Outlook
5. **Mobile clients** - Various levels of support

### The Rules

To ensure email signatures work everywhere:

1. ✅ Use **tables** for all layout
2. ✅ Use **inline CSS** for all styling
3. ✅ Use **base64 images** for logos
4. ✅ Use **simple, email-safe CSS** properties only
5. ❌ **NO** external stylesheets
6. ❌ **NO** JavaScript
7. ❌ **NO** div/flexbox/grid layouts
8. ❌ **NO** CSS classes (except for web preview)
9. ❌ **NO** modern CSS (transforms, shadows, etc.)

---

## Email Client Support Matrix

### CSS Property Support

| Property | Outlook | Gmail | Apple Mail | Notes |
|----------|---------|-------|------------|-------|
| `font-family` | ✅ | ✅ | ✅ | Use web-safe fonts |
| `font-size` | ✅ | ✅ | ✅ | Use px, not rem/em |
| `color` | ✅ | ✅ | ✅ | Hex values only |
| `background-color` | ⚠️ | ✅ | ✅ | Limited in Outlook |
| `padding` | ✅ | ✅ | ✅ | Safe to use |
| `margin` | ⚠️ | ⚠️ | ✅ | Use padding instead |
| `border` | ✅ | ✅ | ✅ | Solid borders only |
| `border-radius` | ❌ | ⚠️ | ✅ | Avoid |
| `box-shadow` | ❌ | ❌ | ⚠️ | Don't use |
| `display: flex` | ❌ | ❌ | ❌ | Use tables |
| `display: grid` | ❌ | ❌ | ❌ | Use tables |
| `position` | ❌ | ❌ | ❌ | Don't use |
| `transform` | ❌ | ❌ | ❌ | Don't use |
| `transition` | ❌ | ❌ | ❌ | Don't use |

### HTML Element Support

| Element | Outlook | Gmail | Apple Mail | Notes |
|---------|---------|-------|------------|-------|
| `<table>` | ✅ | ✅ | ✅ | Primary layout method |
| `<td>` | ✅ | ✅ | ✅ | Table cells |
| `<tr>` | ✅ | ✅ | ✅ | Table rows |
| `<img>` | ✅ | ✅ | ✅ | Must have width/height |
| `<a>` | ✅ | ✅ | ✅ | Links |
| `<strong>` | ✅ | ✅ | ✅ | Bold text |
| `<em>` | ✅ | ✅ | ✅ | Italic text |
| `<div>` | ⚠️ | ⚠️ | ✅ | Use tables instead |
| `<span>` | ⚠️ | ⚠️ | ✅ | Limited support |
| `<p>` | ⚠️ | ⚠️ | ✅ | Use tables instead |

✅ = Full support | ⚠️ = Partial support | ❌ = No support

---

## Table-Based Layout

### Why Tables?

Tables have **universal support** across all email clients. They are the **ONLY** reliable way to create layouts in email.

### Basic Table Structure

```html
<!-- Outer container table -->
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
    <tr>
        <td style="padding: 10px;">
            <!-- Content here -->
        </td>
    </tr>
</table>
```

### Required Table Attributes

**ALWAYS include these:**
```html
<table
    cellpadding="0"
    cellspacing="0"
    border="0"
    style="border-collapse: collapse;"
>
```

**Why:**
- `cellpadding="0"` - Removes default cell padding
- `cellspacing="0"` - Removes gaps between cells
- `border="0"` - Removes default borders
- `border-collapse: collapse` - Ensures clean borders

### Multi-Column Layout

```html
<!-- Two-column layout -->
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
    <tr>
        <!-- Left column -->
        <td style="vertical-align: top; width: 120px; padding-right: 15px;">
            <img src="logo.png" width="120" height="120" alt="Logo" style="display: block;">
        </td>

        <!-- Right column -->
        <td style="vertical-align: top;">
            <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                    <td style="font-size: 26px; color: #08233D;">
                        John Smith
                    </td>
                </tr>
                <tr>
                    <td style="font-size: 18px; color: #08233D;">
                        Managing Director
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>
```

### Vertical Divider (Email-Safe)

**❌ WRONG (doesn't work in Outlook):**
```html
<td>
    <div style="width: 2px; height: 120px; background-color: #2C8248;"></div>
</td>
```

**✅ CORRECT (works everywhere):**
```html
<td style="vertical-align: top; padding: 0 15px;">
    <table cellpadding="0" cellspacing="0" border="0" style="height: 120px; border-collapse: collapse;">
        <tr>
            <td style="width: 2px; border-left: 2px solid #2C8248; font-size: 1px; line-height: 1px;">&nbsp;</td>
        </tr>
    </table>
</td>
```

**Why it works:**
- Uses `border-left` instead of background color
- Borders have better email client support
- The `&nbsp;` ensures the cell has content

---

## Inline CSS Rules

### Why Inline Only?

1. Gmail **strips** `<style>` blocks
2. Most email clients **ignore** external stylesheets
3. CSS **classes** have poor support
4. **Inline styles** work universally

### All Styles Must Be Inline

**❌ WRONG:**
```html
<style>
.name { font-size: 26px; color: #08233D; }
</style>

<td class="name">John Smith</td>
```

**✅ CORRECT:**
```html
<td style="font-family: Georgia, serif; font-size: 26px; color: #08233D; padding: 2px 0;">
    John Smith
</td>
```

### Email-Safe CSS Properties

**Typography:**
```css
font-family: Arial, sans-serif;  /* Use web-safe fonts */
font-size: 16px;                 /* Use px, not rem/em */
font-weight: bold;               /* Or normal */
color: #333333;                  /* Hex colors only */
text-align: left;                /* left, center, right */
line-height: 1.4;                /* Number or px */
text-decoration: none;           /* For links */
```

**Spacing:**
```css
padding: 10px;                   /* All sides */
padding: 10px 20px;              /* Vertical horizontal */
padding: 5px 10px 5px 10px;      /* Top right bottom left */
/* margin: avoid if possible, use padding */
```

**Borders:**
```css
border: 1px solid #cccccc;
border-left: 2px solid #2C8248;
border-top: 1px solid #e0e0e0;
/* Don't use: border-radius, box-shadow */
```

**Layout:**
```css
width: 200px;                    /* Fixed widths in px */
height: auto;                    /* Or fixed px */
vertical-align: top;             /* top, middle, bottom */
display: block;                  /* For images */
display: table;                  /* For tables */
display: table-cell;             /* For cells */
```

**Colors:**
```css
color: #333333;                  /* Text color */
background-color: #f5f5f5;       /* Background */
/* Use hex values, not rgba() or hsl() */
```

### CSS Properties to AVOID

**Never use these in email:**
```css
/* Layout */
display: flex;
display: grid;
position: absolute;
position: fixed;
float: left;

/* Visual effects */
box-shadow: 0 2px 4px rgba(0,0,0,0.1);
border-radius: 5px;
transform: rotate(10deg);
filter: blur(5px);
opacity: 0.5;

/* Animations */
transition: all 0.3s;
animation: slide 1s;
@keyframes slide { }

/* Advanced selectors */
:hover { }
::before { }
::after { }
:nth-child() { }

/* Modern units */
rem, em, vw, vh, %, calc()
```

---

## Image Handling

### Base64 Embedding (REQUIRED)

For email signatures, images **MUST** be embedded as base64 to avoid broken images when copying to Outlook.

**Converting Image to Base64:**

```javascript
// In the generator application
async function convertImageToBase64(imagePath) {
    const response = await fetch(imagePath);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

// Usage
const logoBase64 = await convertImageToBase64('assets/images/alterspective-symbol.png');
```

**Base64 in HTML:**

```html
<img
    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA..."
    width="120"
    height="120"
    alt="Alterspective Logo"
    style="display: block; border: 0; outline: none;"
>
```

### Image Best Practices

**Required Attributes:**
```html
<img
    src="image.png"
    width="120"           <!-- REQUIRED: Always specify -->
    height="120"          <!-- REQUIRED: Always specify -->
    alt="Logo"            <!-- REQUIRED: For accessibility -->
    style="display: block; border: 0;"  <!-- REQUIRED: Removes gaps -->
>
```

**Why width/height are required:**
- Without them, Outlook shows broken placeholder
- Prevents layout shifts while loading
- Required for proper rendering

**Image Styling:**
```css
display: block;         /* Removes bottom gap */
border: 0;              /* Removes border in some clients */
outline: none;          /* Removes outline in some clients */
max-width: 100%;        /* Responsive on mobile (careful!) */
height: auto;           /* Maintains aspect ratio */
```

### Image Size Recommendations

**For Email Signatures:**
- Logo: 120x120px to 180x180px
- Maximum file size: 50KB
- Format: PNG (for transparency) or JPG
- Resolution: 72-144 DPI (standard to retina)

---

## Typography

### Web-Safe Font Stack

**Always include fallbacks:**

```css
/* Serif */
font-family: Georgia, 'Times New Roman', Times, serif;

/* Sans-serif */
font-family: Arial, Helvetica, sans-serif;
font-family: 'Trebuchet MS', Helvetica, sans-serif;
font-family: Verdana, Geneva, sans-serif;

/* Monospace */
font-family: 'Courier New', Courier, monospace;
```

**AltSig Brand Typography:**
```css
/* Name */
font-family: Georgia, serif;
font-size: 26px;
font-weight: normal;
color: #08233D;

/* Title */
font-family: Georgia, serif;
font-size: 18px;
font-weight: normal;
color: #08233D;

/* Contact info */
font-family: Arial, sans-serif;
font-size: 13px;
color: #2C8248;
```

### Font Size Guidelines

**Use pixels only:**
```css
font-size: 13px;  /* ✅ CORRECT */
font-size: 1rem;  /* ❌ WRONG - not supported */
font-size: 100%;  /* ❌ WRONG - inconsistent */
```

**Recommended sizes for email:**
- Body text: 13-16px
- Headings: 18-26px
- Small text: 11-12px (minimum for readability)

---

## Links and Buttons

### Email Links

```html
<!-- Email link -->
<a
    href="mailto:john@example.com"
    style="color: #2C8248; text-decoration: none;"
>
    john@example.com
</a>

<!-- Phone link -->
<a
    href="tel:+61412345678"
    style="color: #2C8248; text-decoration: none;"
>
    0412 345 678
</a>

<!-- Website link -->
<a
    href="https://www.alterspective.com.au"
    target="_blank"
    rel="noopener"
    style="color: #2C8248; text-decoration: none;"
>
    alterspective.com.au
</a>
```

### Link Styling

**Best practices:**
```css
color: #2C8248;              /* Brand color */
text-decoration: none;       /* Remove underline */
```

**Note:** Some email clients will force underlines on links. This is expected behavior and cannot be completely prevented.

### Buttons (If Needed)

**Table-based button:**
```html
<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
    <tr>
        <td
            style="
                background-color: #2C8248;
                padding: 12px 24px;
                border: 1px solid #2C8248;
                text-align: center;
            "
        >
            <a
                href="https://example.com"
                target="_blank"
                style="
                    color: #ffffff;
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    text-decoration: none;
                    display: inline-block;
                "
            >
                Click Here
            </a>
        </td>
    </tr>
</table>
```

---

## Common Pitfalls

### Mistake #1: Using Modern Layout

**❌ WRONG:**
```html
<div style="display: flex;">
    <div style="flex: 1;">Logo</div>
    <div style="flex: 2;">Content</div>
</div>
```

**✅ CORRECT:**
```html
<table cellpadding="0" cellspacing="0" border="0">
    <tr>
        <td style="width: 120px;">Logo</td>
        <td>Content</td>
    </tr>
</table>
```

### Mistake #2: Using External Styles

**❌ WRONG:**
```html
<link rel="stylesheet" href="styles.css">
<div class="signature">...</div>
```

**✅ CORRECT:**
```html
<table style="border-collapse: collapse;">...</table>
```

### Mistake #3: Not Specifying Image Dimensions

**❌ WRONG:**
```html
<img src="logo.png" alt="Logo">
```

**✅ CORRECT:**
```html
<img src="logo.png" width="120" height="120" alt="Logo" style="display: block;">
```

### Mistake #4: Using Background Images

**❌ WRONG:**
```html
<div style="background-image: url('bg.jpg'); height: 200px;">
    Content
</div>
```

**✅ CORRECT:**
Use background color only, or layer tables with images

### Mistake #5: Complex Selectors

**❌ WRONG:**
```css
.signature > .content .name:hover {
    color: red;
}
```

**✅ CORRECT:**
```html
<td style="color: #08233D;">Name</td>
```

---

## Testing Checklist

### Before Deployment

**Test signature in:**
- [ ] Outlook 2016+ (Windows) - **CRITICAL**
- [ ] Outlook for Mac - **CRITICAL**
- [ ] Outlook Web (Office 365) - **CRITICAL**
- [ ] Gmail (web interface)
- [ ] Apple Mail (macOS)
- [ ] Apple Mail (iOS)
- [ ] Thunderbird

### What to Test

**Visual:**
- [ ] Logo displays correctly
- [ ] Vertical divider shows (if applicable)
- [ ] Text formatting matches design
- [ ] Colors are correct
- [ ] Spacing looks good

**Functional:**
- [ ] Email link opens mail client
- [ ] Phone link opens dialer (mobile)
- [ ] Website link opens in browser
- [ ] All links have correct href values

**Copy/Paste:**
- [ ] Signature copies completely
- [ ] Logo embeds (not broken image)
- [ ] Formatting preserved
- [ ] No extra spacing
- [ ] Works when pasting

### Testing Tools

**Online:**
- [Litmus](https://litmus.com/) - Paid, comprehensive
- [Email on Acid](https://www.emailonacid.com/) - Paid
- [Putsmail](https://putsmail.com/) - Free, simple

**Manual:**
- Create test email account
- Send signature to yourself
- Test on multiple devices

---

## Quick Reference

### Email HTML Golden Rules

1. ✅ Tables for layout
2. ✅ Inline CSS only
3. ✅ Base64 images
4. ✅ Simple CSS properties
5. ✅ Web-safe fonts
6. ✅ Fixed dimensions (px)
7. ✅ Test in Outlook
8. ❌ NO flexbox/grid
9. ❌ NO external styles
10. ❌ NO JavaScript

### Must-Have Attributes

**Tables:**
```html
cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;"
```

**Images:**
```html
width="120" height="120" alt="Logo" style="display: block; border: 0;"
```

**Links:**
```html
style="color: #2C8248; text-decoration: none;"
```

---

## Getting Help

**Questions about email HTML?**
1. Check this guide first
2. Test in Outlook (the most restrictive client)
3. Review CODING-STANDARDS.md
4. Consult project maintainer

**Remember:** If it doesn't work in Outlook, it's not ready for production.

---

**Document Control**
- **Version:** 1.0.0
- **Created:** 2025-11-17
- **Author:** Claude Code
- **Status:** Active
- **Review Date:** 2026-05-17 (6 months)
