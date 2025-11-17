# Alterspective Email Signature Conversion

## Overview

This package contains everything you need to convert your Adobe Illustrator email signature design into HTML format suitable for Outlook and other email clients.

---

## What's Included

### 📄 Files in This Package:

1. **email-signature-template.html** - Ready-to-use HTML email signature template
2. **LOGO-EXPORT-GUIDE.md** - Step-by-step guide to export logo from Adobe Illustrator
3. **OUTLOOK-INSTALLATION-GUIDE.md** - Complete installation instructions for Outlook
4. **Alterspective Email Signatures FA.ai** - Original Adobe Illustrator design file
5. **README.md** - This file (quick start guide)

---

## Quick Start Guide

### Step 1: Export Your Logo (5 minutes)

1. Open `Alterspective Email Signatures FA.ai` in Adobe Illustrator
2. Follow the instructions in **LOGO-EXPORT-GUIDE.md**
3. Export the logo as a PNG file (200-250px width recommended)
4. Upload the logo to your website or image hosting service
5. Note the full HTTPS URL (e.g., `https://yoursite.com/logo.png`)

### Step 2: Customize the HTML Template (10 minutes)

1. Open **email-signature-template.html** in a text editor
2. Replace all placeholders (marked with [BRACKETS]) with your information:
   - `[FULL NAME]` - Your name
   - `[JOB TITLE]` - Your position
   - `[PHONE NUMBER]` - Your phone number
   - `[EMAIL ADDRESS]` - Your email
   - `[WEBSITE URL]` - Company website
   - Logo URL - Replace with your hosted logo URL
3. Save the file

### Step 3: Install in Outlook (5 minutes)

1. Open **OUTLOOK-INSTALLATION-GUIDE.md**
2. Find the section for your version of Outlook:
   - **Windows Desktop** - Most common for business users
   - **Mac Desktop** - For Mac users
   - **Outlook Web** - For Office 365 web interface
3. Follow the copy-paste instructions
4. Test your signature by composing a new email

---

## Brand Colors Reference

Your Alterspective brand colors (extracted from the .ai file):

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Alterspective Citrus** | #ABDD65 | RGB(171, 221, 101) | Accent/highlights |
| **Alterspective Green** | #2C8248 | RGB(44, 130, 72) | Primary brand color |
| **Alterspective Marine** | #085256 | RGB(8, 82, 86) | Teal accent |
| **Alterspective Navy** | #08233D | RGB(8, 35, 61) | Dark text/headers |

These colors are already applied in the HTML template for a consistent brand look.

---

## Important Notes

### ⚠️ Before You Begin:

1. **Logo Hosting Required** - Email signatures cannot use local images. Your logo must be uploaded to a web server accessible via HTTPS URL.

2. **No .ai Files in Email** - Adobe Illustrator files cannot be directly used in email signatures. They must be converted to web formats (PNG, JPG, or HTML).

3. **Test Across Platforms** - Email clients render HTML differently. Test your signature in:
   - Outlook (Desktop & Web)
   - Gmail
   - Apple Mail
   - Mobile devices

4. **Keep It Simple** - The simpler the design, the more consistent it will appear across email clients.

---

## Workflow Summary

```
Adobe Illustrator File (.ai)
          ↓
   Export Logo as PNG
          ↓
   Upload to Web Server
          ↓
   Customize HTML Template
          ↓
   Copy & Paste into Outlook
          ↓
   Test & Deploy
```

---

## Alternative Approaches

### Option 1: Full Image Signature
Instead of HTML, export the entire signature as a single PNG image:
- **Pros:** Looks identical everywhere, easy to implement
- **Cons:** Links require image maps, larger file size, not accessible, not responsive

### Option 2: Hybrid Approach
Use a logo image + HTML text:
- **Pros:** Best of both worlds, smaller file size
- **Cons:** Requires HTML knowledge (already done in template!)

### Option 3: Professional Service
Use an email signature management service:
- **Exclaimer**
- **WiseStamp**
- **Email Signature Rescue**
- **CodeTwo**

**Pros:** Centralized management, analytics, company-wide deployment
**Cons:** Monthly subscription cost

---

## Troubleshooting

### Common Issues:

**Q: The logo doesn't show up in my signature**
- A: Verify the image URL is correct, publicly accessible, and uses HTTPS

**Q: Formatting looks wrong when I paste into Outlook**
- A: Try copying from Chrome browser, or use Outlook's HTML insertion method (see guide)

**Q: Links aren't clickable**
- A: Ensure `href` attributes are correct in the HTML (mailto:, tel:, https://)

**Q: Signature looks different on mobile**
- A: This is normal. The template uses responsive design to adapt to screen size

**Q: Can I use this in Gmail?**
- A: Yes! The same HTML works in Gmail. Go to Settings > See all settings > General > Signature

---

## For Team-Wide Deployment

If deploying across your entire team:

1. **Standardize the template** - Create versions for different roles/departments
2. **Host images centrally** - Use company web server or CDN
3. **Document the process** - Share these guides with your team
4. **Provide support** - Designate someone to help with installation
5. **Consider automation** - Microsoft 365 admins can deploy signatures via Exchange rules

---

## Technical Specifications

### HTML Template:
- **Format:** HTML5 with inline CSS
- **Table-based layout:** For maximum email client compatibility
- **No external stylesheets:** All styling is inline (required for emails)
- **Responsive design:** Adapts to mobile devices
- **Web-safe fonts:** Falls back to system fonts

### Recommended Image Specs:
- **Format:** PNG (with transparency) or JPG
- **Logo width:** 200-250px
- **Resolution:** 144 DPI (2x for retina)
- **File size:** Under 50KB
- **Color mode:** RGB

---

## Need Help?

1. **Logo Export Issues** → See LOGO-EXPORT-GUIDE.md
2. **Outlook Installation Issues** → See OUTLOOK-INSTALLATION-GUIDE.md
3. **HTML Customization** → Edit the template carefully, preserving the HTML structure
4. **Company-wide Deployment** → Consult your IT department

---

## Version History

- **v1.0** (2025-11-04) - Initial conversion from Adobe Illustrator to HTML

---

## Credits

- **Original Design:** Alterspective Email Signatures FA.ai
- **Conversion:** HTML email signature template with Outlook compatibility
- **Brand Colors:** Extracted from original .ai file
- **Font Reference:** Montserrat (web-safe alternatives provided)

---

**Ready to get started?** Follow the Quick Start Guide above!

For detailed step-by-step instructions, refer to the individual guide files.
