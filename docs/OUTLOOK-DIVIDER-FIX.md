# Outlook Divider Line Fix

**Issue:** Vertical green divider line not showing in Outlook
**Date Fixed:** 2025-11-17
**Current Method:** border-right on logo cell
**Version:** 2.2.0

---

## Problem Description

When copying the email signature to Microsoft Outlook, the vertical green divider line between the logo and contact information was **not displaying**, even though it showed correctly in the browser preview.

### Visual Comparison

**Before (Broken in Outlook):**
```
[Logo]     Name
           Job Title
           Contact Info
```

**After (Fixed):**
```
[Logo] | Name
       | Job Title
       | Contact Info
```

---

## Root Cause

Microsoft Outlook has **inconsistent support** for CSS `border` properties in email signatures, especially when using:
- `border-left` on empty divider cells
- `background-color` on empty cells (gets stripped during copy/paste)
- Nested table structures for dividers
- Separate divider elements

---

## Current Solution (VERIFIED WORKING)

**Use `border-right` directly on the logo cell.**

### Implementation in `signature-generator.js`

**New Email Signature (line ~75):**
```html
<td style="vertical-align: top; padding-right: 15px; border-right: 2px solid #2C8248;">
    <img src="[base64-logo]" width="120" height="120" style="display: block; border: 0;">
</td>
```

**Reply Signature (line ~173):**
```html
<td rowspan="3" style="vertical-align: middle; padding-right: 10px; border-right: 1px solid #2C8248;">
    <img src="[base64-logo]" width="40" height="40" style="display: block; border: 0;">
</td>
```

---

## Why This Works

1. **Border on content cell** - Outlook reliably renders borders on cells that contain content (the logo image)
2. **No separate divider element** - Reduces HTML complexity and copy/paste issues
3. **Border-right, not border-left** - The border appears on the side adjacent to the contact info
4. **Simpler HTML structure** - Less nesting = fewer rendering bugs

---

## What DOESN'T Work in Outlook

### Approach 1: Separate Divider Cell with Background Color
```html
<!-- BROKEN: background-color gets stripped during copy/paste -->
<td style="width: 2px; background-color: #2C8248; font-size: 1px;">
    &nbsp;
</td>
```

### Approach 2: Separate Divider Cell with Border-Left
```html
<!-- BROKEN: border-left on empty/spacer cells is unreliable -->
<td style="border-left: 2px solid #2C8248;">
    &nbsp;
</td>
```

### Approach 3: Div-Based Divider
```html
<!-- BROKEN: Divs get stripped or converted -->
<td>
    <div style="width: 2px; height: 120px; background-color: #2C8248;"></div>
</td>
```

### Approach 4: Nested Table Divider
```html
<!-- BROKEN: Complex structure gets corrupted during copy/paste -->
<td style="vertical-align: top;">
    <table>
        <tr>
            <td style="width: 2px; background-color: #2C8248;"></td>
        </tr>
    </table>
</td>
```

---

## Configuration Reference

From `config.js`:

```javascript
signatures: {
    new: {
        logo: { width: 120, height: 120 },
        divider: { width: 2, color: '#2C8248' },
        spacing: 15,
        lineHeight: '100%'
    },
    reply: {
        logo: { width: 40, height: 40 },
        divider: { width: 1, color: '#2C8248' },
        spacing: 10,
        lineHeight: '100%'
    }
}
```

---

## Testing Results

### Email Clients Tested

| Client | border-right on logo | background-color cell | border-left cell |
|--------|---------------------|----------------------|------------------|
| **Outlook Windows** | Works | Fails | Fails |
| **Outlook Mac** | Works | Fails | Fails |
| **Outlook Web** | Works | Fails | Fails |
| Gmail Web | Works | Works | Works |
| Apple Mail | Works | Works | Works |
| Thunderbird | Works | Works | Works |

**Conclusion:** `border-right` on the logo cell is the **only reliable method** that works across all email clients, especially Outlook.

---

## Testing Procedure

1. Generate signature in AltSig
2. Click "Copy" button for either signature type
3. Open Outlook Settings Signatures
4. Paste signature (Ctrl+V / Cmd+V)
5. **Verify:** Green divider line appears between logo and text
6. Send test email to self
7. **Verify:** Received email shows green divider line

---

## Critical Rules for Email Dividers

### DO:
- Use `border-right` on content cells (cells with actual content like images)
- Keep border properties on the same cell as the content
- Use solid borders only (`border: Npx solid #COLOR`)
- Test in Outlook Windows (most restrictive client)

### DON'T:
- Use separate divider cells with `background-color`
- Use `border-left` on empty spacer cells
- Use `<div>` elements for dividers
- Use nested tables just for dividers
- Assume it works without testing in Outlook

---

## Related Issues

### Line Height
Always use `line-height: 100%` in email signatures, never numeric values (1.1, 1.2, etc.). Numeric values are calculated differently in Outlook and cause spacing issues.

```html
<!-- CORRECT -->
<td style="line-height: 100%;">Text</td>

<!-- WRONG -->
<td style="line-height: 1.2;">Text</td>
```

### Images
Always embed images as base64 for email signatures:
```html
<img src="data:image/png;base64,iVBORw0KGg..." width="120" height="120">
```

---

## Version History

### v2.2.0 (2026-01-12)
- **Updated:** Documentation to reflect current `border-right` approach
- **Clarified:** Why previous approaches (background-color, border-left) failed
- **Added:** Configuration reference from config.js

### v2.1.1 (2025-11-17)
- **Fixed:** Vertical divider not showing in Outlook
- **Changed:** Settled on `border-right` on logo cell approach
- **Tested:** All Outlook versions (Windows, Mac, Web)

---

## Quick Reference Card

| Attribute | New Email | Reply |
|-----------|-----------|-------|
| **Method** | `border-right` on logo TD | `border-right` on logo TD |
| **Width** | 2px | 1px |
| **Color** | `#2C8248` | `#2C8248` |
| **Logo Size** | 120x120px | 40x40px |
| **Spacing** | 15px | 10px |
| **Line Height** | 100% | 100% |

**Working Code Pattern:**
```html
<td style="border-right: 2px solid #2C8248; padding-right: 15px;">
    <img src="[base64]" width="120" height="120" style="display: block; border: 0;">
</td>
```

---

**Document Status:** Active
**Last Tested:** 2025-11-17
**Updated:** 2026-01-12
**Next Review:** When Outlook updates or issues reported
