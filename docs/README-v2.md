# Alterspective Email Signatures v2.0

## 🎯 Quick Start (30 Seconds)

1. **Open:** `signature-generator-v2.html`
2. **Click:** "Generate Signature" (pre-filled with example)
3. **Click:** "Copy for Outlook"
4. **Paste:** Into Outlook (Ctrl+V or Cmd+V)
5. **Done!** ✅

---

## 📦 Files Overview

### ✅ **Use These Files (v2.0 - Correct):**

| File | Purpose | Use When |
|------|---------|----------|
| **signature-generator-v2.html** | Employee signature generator | Creating any signature |
| **signature-template-v2.html** | Pre-filled template (Igor's) | Testing/reference |
| **alterspective-symbol.png** | Geometric logo (120x120) | Required for signatures |
| **README-v2.md** | This file | Setup instructions |
| **IMPLEMENTATION-VERIFIED.md** | Technical specs | Developer reference |

### ❌ **Don't Use (v1 - Deprecated):**

These files use the wrong logo and incorrect spacing:
- ~~generate-signature.html~~ (v1 - wrong logo)
- ~~email-signature-FINAL.html~~ (v1 - wrong padding)
- ~~alterspective-logo.png~~ (full logo with text - incorrect)

---

## 🎨 What's Correct in v2.0

### ✅ Logo
- **Geometric symbol only** (triangular shape)
- 120 x 120 pixels
- File: `alterspective-symbol.png`
- ❌ NOT the full logo with "Alterspective" text

### ✅ Layout
```
[Symbol] --15px-- | --15px-- Igor Jericevich (26px Georgia)
                  |          Managing Director (18px Georgia)
                  |          [8px gap]
                  |          email@... (13px Arial green)
                  |          m. 0488... (13px Arial green)
                  |          website (13px Arial green)
```

### ✅ Spacing
- Logo → Divider: **15px**
- Divider → Text: **15px**
- Name → Title: **2px**
- Title → Email: **8px spacer**
- Between contact lines: **1px**

### ✅ Colors
- Name/Title text: **#17232D** (Alterspective Navy)
- Contact links: **#2C8248** (Alterspective Green)
- Vertical divider: **#2C8248** (Green)

### ✅ Fonts
- Name/Title: **Georgia, serif** (26px / 18px)
- Contact info: **Arial, sans-serif** (13px)

---

## 🚀 Installation Methods

### Method 1: Windows Outlook Desktop

1. Open `signature-generator-v2.html` in browser
2. Click "Copy for Outlook"
3. Open Outlook
4. **File → Options → Mail → Signatures**
5. Click "New"
6. Name it (e.g., "Alterspective 2025")
7. Paste in editor (Ctrl+V)
8. Set as default for new messages
9. Click OK

### Method 2: Mac Outlook Desktop

1. Open `signature-generator-v2.html` in browser
2. Click "Copy for Outlook"
3. Open Outlook
4. **Outlook → Preferences → Signatures**
5. Click "+" to create new
6. Paste in editor (Cmd+V)
7. Close preferences (auto-saves)

### Method 3: Outlook Web (Office 365)

1. Open `signature-generator-v2.html` in browser
2. Click "Copy for Outlook"
3. Go to outlook.office.com
4. Click Settings ⚙️ → **View all Outlook settings**
5. **Mail → Compose and reply → Email signature**
6. Paste in editor
7. Click Save

---

## 👥 Team Deployment

### Option A: Self-Service (Recommended)

Share these 3 files with each employee:
1. `signature-generator-v2.html`
2. `alterspective-symbol.png`
3. `README-v2.md`

They open the generator, fill in their details, copy, paste. Done in 2 minutes.

### Option B: IT Creates for Everyone

1. Open `signature-generator-v2.html`
2. Enter employee details for each person
3. Click "Download HTML"
4. Send each employee their HTML file + `alterspective-symbol.png`
5. They open in browser and copy-paste

---

## ⚠️ Critical Requirements

### 1. Logo File Location

The logo **MUST** be in the same folder as the HTML file:

```
✅ CORRECT:
Your Folder/
├── signature-generator-v2.html
├── alterspective-symbol.png  ← Together!
└── README-v2.md

❌ WRONG:
Desktop/
├── signature-generator-v2.html
Documents/
└── alterspective-symbol.png  ← Separated = broken!
```

### 2. Use Correct Logo

- ✅ `alterspective-symbol.png` (geometric shape)
- ❌ `alterspective-logo.png` (full logo with text)

### 3. Copy Method

Always use "Copy for Outlook" button in generator (not copy HTML code).

---

## 🧪 Testing Checklist

Before rolling out company-wide:

- [ ] Logo displays correctly (geometric symbol)
- [ ] Vertical green divider visible
- [ ] Name in large serif font
- [ ] Title in medium serif font
- [ ] Contact info in green
- [ ] Email link opens mail client
- [ ] Phone link clickable (mobile)
- [ ] Website link opens browser
- [ ] Spacing matches design
- [ ] Tested in Outlook
- [ ] Tested on mobile device
- [ ] Send test email to yourself

---

## 📋 Employee Instructions

**Short version to send to team:**

```
1. Download these files to your computer:
   - signature-generator-v2.html
   - alterspective-symbol.png

2. Keep them in the SAME folder

3. Double-click signature-generator-v2.html

4. Fill in your details

5. Click "Copy for Outlook"

6. Paste into Outlook signature settings

Done! Takes 2 minutes.
```

---

## 🔧 Customization

### Change Your Details

Use the generator web interface - no code editing needed!

### Bulk Generate

For IT departments creating many signatures:
1. Use the generator
2. Fill in each person's info
3. Click "Download HTML"
4. Repeat for each employee

### Update Logo

Replace `alterspective-symbol.png` with new logo (keep same filename and size).

---

## 📱 Mobile Compatibility

The signature is responsive and works on:
- ✅ iPhone Mail app
- ✅ Android Gmail app
- ✅ Outlook Mobile
- ✅ Samsung Email
- ✅ All major mobile email clients

---

## 🆘 Troubleshooting

### Logo doesn't show

**Problem:** Broken image icon appears

**Solution:**
1. Check `alterspective-symbol.png` is in same folder as HTML
2. Check filename is exact (case-sensitive)
3. Try reopening generator and regenerating

### Wrong logo appears

**Problem:** Shows full logo with text instead of geometric symbol

**Solution:**
- You're using v1 files
- Use `signature-generator-v2.html` (not v1)
- Use `alterspective-symbol.png` (not alterspective-logo.png)

### Spacing looks wrong

**Problem:** Too much or too little padding

**Solution:**
- You're using v1 files
- Use `signature-generator-v2.html` for correct spacing

### Can't copy to Outlook

**Problem:** Copy button doesn't work

**Solution:**
1. Click "Download HTML" instead
2. Open downloaded file in browser
3. Select signature manually
4. Copy and paste

### Links don't work

**Problem:** Email/phone/website not clickable

**Solution:**
- Make sure you copied the full signature (use "Copy for Outlook" button)
- Don't copy from HTML code view

---

## 📊 Version Changelog

### v2.0 (Current - Corrected)
- ✅ Fixed logo (geometric symbol only)
- ✅ Fixed padding (15px spacing)
- ✅ Fixed font sizes (26/18/13px)
- ✅ Tight vertical spacing
- ✅ Exact match to design image

### v1.0 (Deprecated)
- ❌ Used wrong logo (full logo with text)
- ❌ Too much padding (30px)
- ❌ Wrong font sizes
- ❌ Loose spacing

---

## 🎯 Quality Standards

All v2.0 signatures meet:

✅ **Visual Standards:**
- Exact match to approved design
- Correct brand colors
- Proper logo usage
- Professional typography

✅ **Technical Standards:**
- Outlook 2016+ compatible
- Gmail compatible
- Mobile responsive
- Table-based HTML (no flexbox/grid)
- Inline CSS only
- Valid HTML5

✅ **Accessibility:**
- Alt text for images
- Semantic HTML
- Screen reader friendly
- High contrast text

---

## 📞 Support

**For employees:**
- See "Employee Instructions" section above
- Check "Troubleshooting" section
- Contact IT if still having issues

**For IT administrators:**
- See "Team Deployment" section
- Review `IMPLEMENTATION-VERIFIED.md` for technical specs
- Check Playwright tests for validation

---

## 🔗 Related Files

- **Technical specs:** `IMPLEMENTATION-VERIFIED.md`
- **Test suite:** `test-signature-generator.spec.js`
- **Test guide:** `TEST-GUIDE.md`
- **Playwright config:** `playwright.config.js`

---

## ✅ Success Criteria

Your deployment is successful when:

- [ ] All employees have signature with correct geometric logo
- [ ] Spacing matches approved design
- [ ] All links work (email, phone, website)
- [ ] Signatures display correctly in Outlook, Gmail, mobile
- [ ] No broken images
- [ ] Brand colors are correct
- [ ] Professional appearance maintained

---

**Version:** 2.0 (Corrected Layout)
**Date:** November 2025
**Status:** ✅ Production Ready

**Key Changes from v1:**
- Correct geometric symbol logo
- Fixed padding/spacing
- Exact design match

---

## 📸 Visual Reference

Your signature should look like:

```
[Geometric    |  Igor Jericevich
 Triangular   |  Managing Director
 Logo Symbol] |
 120x120      |  igor.jericevich@alterspective.com.au
              |  m. 0488 180 044
              |  alterspective.com.au
```

- Logo: Geometric shape (NOT full logo)
- Divider: Thin green vertical line
- Text: Tight spacing, minimal padding
- Colors: Navy (name/title), Green (contact)

---

**Ready to deploy!** Start with `signature-generator-v2.html`
