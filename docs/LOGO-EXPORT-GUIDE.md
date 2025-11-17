# Logo Export Guide for Email Signatures

## How to Export Logo from Adobe Illustrator

Since the email signature is currently in Adobe Illustrator format (.ai), you need to export the logo as a web-friendly image format.

### Method 1: Export as PNG (Recommended for Email Signatures)

1. **Open the .ai file** in Adobe Illustrator
   - Open `Alterspective Email Signatures FA.ai`

2. **Select the Logo**
   - Use the Selection Tool (V) to click and select the logo element
   - Make sure only the logo is selected (not text or other elements)

3. **Export for Screens**
   - Go to **File > Export > Export for Screens...**
   - Or use **File > Export > Export As...**

4. **Configure Export Settings**
   - **Format:** PNG
   - **Resolution:** 2x or 3x (for retina displays)
   - **Background:** Transparent (if logo has transparent background)
   - **Color Mode:** RGB
   - Recommended dimensions: 200-300px width

5. **Save the File**
   - Name it something clear like: `alterspective-logo.png`
   - Save to a location you can easily find

### Method 2: Save for Web (Legacy)

1. **Select the Logo** in Illustrator
2. Go to **File > Export > Save for Web (Legacy)**
3. Settings:
   - **Format:** PNG-24 (for transparency) or PNG-8 (smaller file size)
   - **Transparency:** Checked (if needed)
   - **Image Size:** Width around 200-300px
   - **Quality:** High
4. Click **Save**

### Alternative Method: Export Each Signature Variant

If your .ai file has multiple signature designs (for different team members):

1. **Create separate artboards** for each signature variation
2. Go to **File > Export > Export for Screens**
3. Select **Range:** All Artboards
4. Each artboard will export as a separate logo/signature image

---

## Recommended Export Specifications

### For Logo Only:
- **Format:** PNG with transparency
- **Width:** 200-250px
- **Resolution:** 144 DPI (2x) for retina displays
- **File size:** Keep under 50KB if possible

### For Full Signature (Alternative Approach):
If you want to export the entire signature as an image:
- **Format:** PNG
- **Width:** 500-600px
- **Height:** Auto (maintain aspect ratio)
- **Resolution:** 144 DPI
- **Background:** Transparent or white

---

## After Export: Hosting the Image

Email signatures require images to be hosted online (not attached to emails).

### Option 1: Upload to Your Website
Upload the logo to your company website:
```
https://yourcompany.com/images/signatures/alterspective-logo.png
```

### Option 2: Use Image Hosting Services
- **Imgur** (free, public)
- **Cloudinary** (free tier available)
- **AWS S3** (professional option)
- **Google Drive** (with public sharing link)

### Option 3: Email Signature Services
Professional email signature management tools like:
- **WiseStamp**
- **Exclaimer**
- **Signature Rescue**

These services host images for you automatically.

---

## Important Notes

1. **Never use local file paths** (`C:\Users\...` or `file://`) - these won't work in email signatures
2. **Always use HTTPS** URLs for security
3. **Keep file sizes small** (under 100KB total for entire signature)
4. **Test across email clients** (Gmail, Outlook, Apple Mail) before rolling out
5. **Use web-safe fonts** in HTML or fall back to system fonts

---

## Brand Colors Reference

Based on the .ai file analysis, here are your brand colors:

| Color Name | RGB Values | Hex Code | Usage |
|------------|-----------|----------|-------|
| **Alterspective Citrus** | RGB(171, 221, 101) | #ABDD65 | Accent/highlights |
| **Alterspective Green** | RGB(44, 130, 72) | #2C8248 | Primary green |
| **Alterspective Marine** | RGB(8, 82, 86) | #085256 | Teal accent |
| **Alterspective Navy** | RGB(23, 35, 45) | #17232D | Dark navy/text |

Alternative Navy: RGB(8, 35, 61) = #08233D

---

## Font Information

The .ai file uses **Montserrat** font. For email signatures:
- Use web-safe alternatives like: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`
- Or specify Montserrat with fallbacks: `'Montserrat', 'Segoe UI', sans-serif`

Note: Not all email clients support custom fonts, so always include fallback fonts.
