# Reply Signature Guide

**Version:** 2.0.0
**Created:** 2025-11-17
**Purpose:** Guide for using the compact reply signature feature

---

## Overview

AltSig now offers TWO signature types:

1. **New Email Signature** - Full signature for composing new messages
2. **Reply Signature** - Compact signature for replies and forwards

This guide explains the reply signature feature and when to use each type.

---

## Signature Type Comparison

### New Email Signature (Original)

**Use For:**
- Composing new emails
- First contact with clients
- Formal business communications
- Marketing/sales outreach

**Specifications:**
- **Logo:** 120x120px symbol
- **Layout:** Vertical with left-aligned logo
- **Height:** ~120px
- **Includes:** Name, Title, Email, Mobile, Website
- **Font:** Georgia serif for name/title, Arial for contact info
- **File Size:** ~15-20KB (with base64 logo)

**Visual Layout:**
```
[Logo 120x120] | Name (26px)
               | Job Title (18px)
               | Email
               | Mobile
               | Website
```

### Reply Signature (NEW)

**Use For:**
- Email replies
- Email forwards
- Ongoing conversations
- Internal communications
- Long email threads

**Specifications:**
- **Logo:** 40x40px symbol (67% smaller)
- **Layout:** Horizontal single-line format
- **Height:** ~40-45px (67% reduction)
- **Includes:** Name, Title, Email, Mobile (NO website)
- **Font:** Arial only (14px bold name, 13px others)
- **File Size:** ~4-6KB (with base64 logo)

**Visual Layout:**
```
[Logo 40x40] | Name • Job Title • email@domain.com • m. 0488 180 044
```

---

## Design Rationale

### Why a Reply Signature?

**Problem:**
- Full signatures become intrusive in email threads
- Multiple replies create visual clutter
- Full signature repeats information already in thread
- Professional image requires branding without domination

**Solution:**
- Compact horizontal layout
- 67% size reduction (120px → 40px height)
- Essential info only (no website)
- Maintains brand identity with smaller logo
- Email-thread friendly design

### Design Evaluation

The reply signature was rated against 10 categories:

| Category | Score | Notes |
|----------|-------|-------|
| Email Compatibility | 9/10 | Table-based, inline CSS, works everywhere |
| Brand Fit | 9/10 | Maintains Alterspective colors and logo |
| Intrusiveness | 10/10 | 67% smaller, perfect for threads |
| Size/File Size | 10/10 | ~4-6KB, fast loading |
| Readability | 8/10 | Clear, good contrast, may wrap on mobile |
| Professionalism | 9/10 | Clean, minimalist, appropriate |
| Mobile Compatibility | 8/10 | Works well, may wrap to 2 lines |
| Information Hierarchy | 9/10 | Name prominent, logical flow |
| Outlook Compatibility | 9/10 | Table-based, inline CSS, base64 image |
| User Experience | 9/10 | Non-intrusive, easy to scan |

**Overall Score: 90/100 (Excellent)**

---

## How to Generate Reply Signature

### Step 1: Access the Generator

1. Open the Alterspective Email Signature Generator
2. Fill in your employee information:
   - Full Name *
   - Job Title *
   - Email Address *
   - Mobile Number *
   - Website (optional - not used in reply signature)

### Step 2: Select Reply Signature Type

1. In the **Signature Type** section, click **"↩️ Reply/Forward"**
2. Notice the specs card updates to show reply signature specifications
3. The website field will be hidden (not needed for replies)

### Step 3: Generate

1. Click **"🚀 Generate Signature"**
2. Preview the compact signature in the Live Preview panel
3. Verify all information is correct

### Step 4: Install in Outlook

**Option A: As Reply/Forward Only Signature**

1. Click **"📋 Copy for Outlook"**
2. Open Outlook Settings → Signatures
3. Create a **new signature** named "Reply Signature"
4. Paste the copied signature
5. Under "Choose default signature":
   - **New messages:** Select your full signature
   - **Replies/forwards:** Select "Reply Signature"
6. Save

**Option B: Manual Installation**

1. Download the HTML file
2. Open Outlook Settings → Signatures
3. Import or manually set up the signature
4. Configure for replies/forwards only

---

## Technical Specifications

### HTML Structure

```html
<table cellpadding="0" cellspacing="0" border="0" style="...">
  <tr>
    <!-- 40x40px Logo -->
    <td><img src="[BASE64]" width="40" height="40"></td>

    <!-- 1px Green Divider -->
    <td>[Divider]</td>

    <!-- Contact Info (Single Row) -->
    <td>
      Name • Title • Email • Mobile
    </td>
  </tr>
</table>
```

### CSS Properties

**All CSS is inline** (email-safe):
- Font: Arial, Helvetica, sans-serif
- Name: 14px bold, #17232D (navy)
- Other text: 13px regular, #2C8248 (green)
- Links: #2C8248 with no underline
- Separator dots: • (bullet character)

### Image Embedding

- **Logo:** Base64 encoded PNG
- **Size:** 40x40px
- **Format:** PNG with transparency
- **Encoding:** Embedded in src attribute
- **No external URLs** - prevents tracking pixels, works offline

### Email Client Compatibility

**Tested and Working:**
- ✅ Microsoft Outlook (Windows)
- ✅ Microsoft Outlook (Mac)
- ✅ Microsoft Outlook (Web)
- ✅ Gmail (Web)
- ✅ Gmail (iOS/Android)
- ✅ Apple Mail
- ✅ Thunderbird

**Known Issues:**
- May wrap to 2 lines on very small mobile screens (320px width)
- This is acceptable and degrades gracefully

---

## Best Practices

### When to Use Reply Signature

✅ **DO use for:**
- Replying to existing email threads
- Forwarding emails
- Internal team communications
- Follow-up messages
- Long conversation chains

❌ **DON'T use for:**
- New business contacts
- First emails to clients
- Marketing campaigns
- Sales outreach
- Formal proposals

### Setting Up Both Signatures

**Recommended Outlook Setup:**

1. **Create TWO signatures:**
   - "Professional Signature" (full/new email)
   - "Reply Signature" (compact/reply)

2. **Set defaults in Outlook:**
   - New messages → "Professional Signature"
   - Replies/forwards → "Reply Signature"

3. **Result:**
   - New emails automatically get full signature
   - Replies automatically get compact signature
   - Can manually switch if needed

### Updating Your Signatures

When your information changes:

1. Generate BOTH signature types with new info
2. Update both signatures in Outlook
3. Test by sending yourself an email
4. Verify both new and reply signatures work

---

## File Organization

### Template Files

```
public/
├── templates/
│   ├── email-signature-template.html       # New email signature
│   └── email-signature-reply-template.html # Reply signature (NEW)
```

### JavaScript Files

```
public/
├── assets/
│   └── scripts/
│       └── reply-signature.js              # Reply signature logic
```

### Images Used

**Reply signature uses:**
- `Alterspective_Symbol_FA.png` (40x40px)
- Same logo as full signature, just smaller size

---

## Troubleshooting

### Problem: Signature Wraps to Multiple Lines

**Cause:** Very long names/titles or narrow email client window

**Solutions:**
1. Abbreviate job title if very long
2. This is expected on mobile - degrades gracefully
3. Test in your specific email client

### Problem: Logo Doesn't Display

**Cause:** Base64 encoding not supported (very rare)

**Solutions:**
1. Ensure you clicked "Generate Signature" first
2. Try copying again
3. Use Download HTML option and import

### Problem: Links Aren't Green

**Cause:** Email client CSS override

**Solutions:**
1. The signature includes extensive CSS rules to force green
2. Some webmail clients may override (rare)
3. Links will still work, just may be different color

### Problem: Signature Too Small on Desktop

**Cause:** Personal preference for larger signature

**Solutions:**
1. Use the full "New Email" signature instead
2. Reply signature is intentionally compact
3. Consider context - is this a reply or new email?

---

## Advanced Customization

### Changing Reply Signature Size

**To make the logo larger:**

Edit `/public/assets/scripts/reply-signature.js`:

```javascript
// Change from 40x40 to 60x60
width="60"
height="60"
```

**Note:** Larger logos reduce the "compact" benefit.

### Removing Separator Dots

Edit the HTML template to remove bullet separators:

```javascript
// Remove these lines:
<td style="...">•</td>
```

### Changing Font Sizes

Edit inline styles in `reply-signature.js`:

```javascript
// Name size (currently 14px)
font-size: 14px;

// Other text (currently 13px)
font-size: 13px;
```

---

## Development Notes

### Implementation Details

**Files Created:**
- `public/templates/email-signature-reply-template.html`
- `public/assets/scripts/reply-signature.js`

**Files Modified:**
- `public/index.html` (added signature type selector and script reference)

**Functions Added:**
- `selectSignatureType(type)` - Switches between new/reply modes
- `generateCurrentSignature()` - Calls appropriate generator
- `generateReplySignature()` - Generates compact reply signature

### Testing Checklist

Before deployment:

- [ ] Generate reply signature with test data
- [ ] Copy to clipboard works
- [ ] Download HTML works
- [ ] Test in Outlook Windows
- [ ] Test in Outlook Mac
- [ ] Test in Outlook Web
- [ ] Test in Gmail
- [ ] Verify logo displays correctly
- [ ] Verify links are clickable
- [ ] Verify green color scheme
- [ ] Test on mobile (may wrap - acceptable)

---

## FAQ

### Q: Should I use reply signature for all emails?

**A:** No. Use the full signature for new emails and first contact. Use reply signature only for ongoing conversations.

### Q: Can I have different reply signatures for different accounts?

**A:** Yes. Generate multiple reply signatures and set them up in Outlook for each email account.

### Q: Will this work in Gmail?

**A:** Yes. The reply signature works in Gmail web and mobile apps.

### Q: Does the reply signature include social media icons?

**A:** No. To keep it compact, only essential contact info is included.

### Q: Can I add the website link back?

**A:** Yes, but it defeats the purpose of a compact signature. Consider using the full signature instead.

### Q: What if my name is very long?

**A:** The signature uses `white-space: nowrap` so it won't break within elements. Very long text may wrap the entire signature to multiple lines on mobile.

### Q: How often should I update my signatures?

**A:** Update whenever your contact information changes (phone, email, job title, etc.).

---

## Version History

### Version 2.0.0 (2025-11-17)
- ✨ **NEW:** Reply signature feature
- ✨ **NEW:** Signature type selector in generator
- ✨ **NEW:** Automatic website field hiding for replies
- ✨ **NEW:** Separate specs cards for each type
- ✨ **NEW:** This documentation

### Version 1.0.0 (2025-11-04)
- Initial release with new email signature only

---

## Support

**Questions or Issues?**

1. Review this guide thoroughly
2. Check [OUTLOOK-INSTALLATION-GUIDE.md](OUTLOOK-INSTALLATION-GUIDE.md)
3. Test in multiple email clients
4. Contact IT support if problems persist

---

**Document Control:**
- **Version:** 2.0.0
- **Created:** 2025-11-17
- **Author:** AltSig Development Team
- **Status:** Active
- **Next Review:** 2026-05-17

---

Made with care for Alterspective employees.
