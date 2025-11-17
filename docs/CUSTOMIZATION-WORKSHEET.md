# Email Signature Customization Worksheet

Use this worksheet to gather all the information you need before customizing your email signature template.

---

## Personal Information

Fill out this form with your details, then use it to replace the placeholders in the HTML template.

### Your Details:

```
FULL NAME:          _____________________________________________

JOB TITLE:          _____________________________________________

PHONE NUMBER:       _____________________________________________
  (Display format, e.g., +61 2 1234 5678)

PHONE (for links):  _____________________________________________
  (No spaces, e.g., +61-2-1234-5678)

MOBILE NUMBER:      _____________________________________________
  (Display format, e.g., +61 412 345 678)

MOBILE (for links): _____________________________________________
  (No spaces, e.g., +61-412-345-678)

EMAIL ADDRESS:      _____________________________________________
  (e.g., yourname@alterspective.com)

WEBSITE URL:        _____________________________________________
  (e.g., www.alterspective.com)

WEBSITE (full URL): _____________________________________________
  (e.g., https://www.alterspective.com)
```

---

## Logo Information

```
LOGO FILE NAME:     _____________________________________________
  (e.g., alterspective-logo.png)

LOGO HOSTED URL:    _____________________________________________
  (e.g., https://yourdomain.com/images/alterspective-logo.png)

LOGO WIDTH (px):    _____________________________________________
  (Recommended: 200-250px)
```

---

## Social Media (Optional)

Only fill out if you want social media icons in your signature:

```
LINKEDIN URL:       _____________________________________________
  (e.g., https://linkedin.com/in/yourprofile)

TWITTER/X URL:      _____________________________________________
  (e.g., https://twitter.com/yourhandle)

FACEBOOK URL:       _____________________________________________
  (Optional)

INSTAGRAM URL:      _____________________________________________
  (Optional)
```

---

## Find & Replace Guide

Use this table to replace placeholders in your HTML file:

| Find This | Replace With | Your Value |
|-----------|--------------|------------|
| `[FULL NAME]` | Your name | _____________ |
| `[JOB TITLE]` | Your position | _____________ |
| `[PHONE NUMBER]` | Display format | _____________ |
| `[PHONE-NUMBER]` | Link format (no spaces) | _____________ |
| `[MOBILE NUMBER]` | Display format | _____________ |
| `[MOBILE-NUMBER]` | Link format (no spaces) | _____________ |
| `[EMAIL-ADDRESS]` | Your email | _____________ |
| `[WEBSITE-URL]` | Domain only | _____________ |
| `https://yourdomain.com/path-to-logo/` | Logo URL | _____________ |
| `[LINKEDIN-URL]` | LinkedIn profile | _____________ |
| `[TWITTER-URL]` | Twitter/X profile | _____________ |

---

## Example (Filled Out)

Here's an example to help you understand the format:

```
FULL NAME:          Sarah Johnson
JOB TITLE:          Senior Strategy Consultant
PHONE NUMBER:       +61 2 9876 5432
PHONE (for links):  +61-2-9876-5432
MOBILE NUMBER:      +61 412 345 678
MOBILE (for links): +61-412-345-678
EMAIL ADDRESS:      sarah.johnson@alterspective.com
WEBSITE URL:        www.alterspective.com
WEBSITE (full URL): https://www.alterspective.com
LOGO HOSTED URL:    https://alterspective.com/images/logo.png
LINKEDIN URL:       https://linkedin.com/in/sarahjohnson
```

---

## Customization Steps

Once you've filled out this worksheet:

### Step 1: Open the Template
- Open `email-signature-template.html` in a text editor
- Recommended editors: VS Code, Sublime Text, Notepad++, or Notepad

### Step 2: Find & Replace
Use your text editor's "Find & Replace" function:

**In VS Code / Sublime Text / Notepad++:**
- Press `Ctrl + H` (Windows) or `Cmd + H` (Mac)
- Enter the placeholder in "Find" field
- Enter your value in "Replace" field
- Click "Replace All"

**Example:**
```
Find:     [FULL NAME]
Replace:  Sarah Johnson
→ Click "Replace All"
```

Repeat for each placeholder.

### Step 3: Update Logo URL
Find this line:
```html
<img src="https://yourdomain.com/path-to-logo/alterspective-logo.png"
```

Replace with your actual logo URL:
```html
<img src="https://alterspective.com/images/logo.png"
```

### Step 4: Remove Unused Sections (Optional)
If you don't have certain information, delete that section:

**Don't have a mobile number?**
Delete these lines:
```html
<tr>
    <td style="...">
        <span style="...">M:</span>
        <a href="tel:[MOBILE-NUMBER]" ...>[MOBILE NUMBER]</a>
    </td>
</tr>
```

**Don't want social media icons?**
Delete the entire social media table section.

### Step 5: Save the File
- Save as: `my-email-signature.html`
- Keep the original template as a backup

### Step 6: Test in Browser
- Double-click the HTML file
- Opens in your web browser
- Verify all information is correct
- Click each link to test functionality

---

## Checklist Before Installing

Before copying to Outlook, verify:

- [ ] All [PLACEHOLDERS] have been replaced
- [ ] Name and title are correct
- [ ] Phone numbers display correctly
- [ ] Email address is correct
- [ ] Website URL works when clicked
- [ ] Logo displays (not broken image)
- [ ] Logo URL uses https:// (not http://)
- [ ] Social media links work (if included)
- [ ] No typos or formatting errors
- [ ] Tested in web browser
- [ ] Ready to copy to Outlook

---

## Common Mistakes to Avoid

### ❌ Don't Do This:

1. **Leaving placeholders**
   - ❌ `[FULL NAME]` still visible
   - ✅ Replace with actual name

2. **Wrong phone format for links**
   - ❌ `tel:+61 2 1234 5678` (has spaces)
   - ✅ `tel:+61-2-1234-5678` (no spaces)

3. **Missing https:// in logo URL**
   - ❌ `src="yourdomain.com/logo.png"`
   - ✅ `src="https://yourdomain.com/logo.png"`

4. **Local file path for logo**
   - ❌ `src="C:/Users/Documents/logo.png"`
   - ✅ `src="https://yourdomain.com/logo.png"`

5. **Deleting HTML structure**
   - ❌ Removing `<tr>`, `<td>`, or `</table>` tags
   - ✅ Only delete complete sections (entire `<tr>...</tr>`)

---

## Need Help?

- **Can't find/replace?** Use text editor's help menu (F1)
- **Logo won't display?** See LOGO-EXPORT-GUIDE.md
- **Formatting breaks?** Restore from backup and try again
- **Still stuck?** Refer to README.md troubleshooting

---

## Quick Reference: Phone Number Formats

Email links require specific formats:

### Phone Link Format (href attribute):
```
International: +61-2-1234-5678
US Format:     +1-555-123-4567
UK Format:     +44-20-1234-5678
```
**Rule:** Country code + area code + number, separated by hyphens, NO SPACES

### Phone Display Format (visible text):
```
International: +61 2 1234 5678
US Format:     +1 (555) 123-4567
UK Format:     +44 20 1234 5678
```
**Rule:** Whatever format looks professional to you

---

## Save This Worksheet

Keep this filled-out worksheet for:
- Future updates to your signature
- Helping team members with theirs
- Reference when contact info changes
- Creating signatures for new hires

---

**Worksheet Version:** 1.0
**Last Updated:** 2025-11-04
