# Outlook Email Signature Installation Guide

## Complete Guide to Installing Your HTML Email Signature in Outlook

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Customizing Your Signature](#customizing-your-signature)
3. [Method 1: Outlook Desktop (Windows)](#method-1-outlook-desktop-windows)
4. [Method 2: Outlook Desktop (Mac)](#method-2-outlook-desktop-mac)
5. [Method 3: Outlook Web (Office 365)](#method-3-outlook-web-office-365)
6. [Testing Your Signature](#testing-your-signature)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, make sure you have:

- [ ] Exported logo from Adobe Illustrator (see `LOGO-EXPORT-GUIDE.md`)
- [ ] Uploaded logo to a web server (must be accessible via HTTPS URL)
- [ ] Your contact information ready (name, title, phone, email, website)
- [ ] The HTML signature template file: `email-signature-template.html`

---

## Customizing Your Signature

### Step 1: Edit the HTML Template

1. Open `email-signature-template.html` in a text editor (VS Code, Notepad++, Sublime Text, or even Notepad)

2. Replace the following placeholders with your actual information:

   ```html
   [FULL NAME]           → e.g., John Smith
   [JOB TITLE]           → e.g., Senior Consultant
   [PHONE-NUMBER]        → e.g., +61-2-1234-5678 (for tel: link, no spaces)
   [PHONE NUMBER]        → e.g., +61 2 1234 5678 (for display)
   [MOBILE-NUMBER]       → e.g., +61-412-345-678 (for tel: link)
   [MOBILE NUMBER]       → e.g., +61 412 345 678 (for display)
   [EMAIL-ADDRESS]       → e.g., john.smith@alterspective.com
   [WEBSITE-URL]         → e.g., www.alterspective.com
   [LINKEDIN-URL]        → e.g., https://linkedin.com/in/yourprofile
   [TWITTER-URL]         → e.g., https://twitter.com/yourhandle
   ```

3. Update the logo URL:
   ```html
   Replace: https://yourdomain.com/path-to-logo/alterspective-logo.png
   With:    https://yourcompany.com/images/alterspective-logo.png
   ```

4. (Optional) Update social media icon URLs if you have them

5. Save the file

### Step 2: Test the HTML File

1. Double-click the HTML file to open it in your web browser
2. Verify all information is correct
3. Check that all links work (click on email, phone, website)
4. Ensure the logo displays correctly

---

## Method 1: Outlook Desktop (Windows)

### Installation Steps:

1. **Open the HTML signature in a browser**
   - Double-click `email-signature-template.html`
   - It will open in your default web browser (Chrome, Edge, Firefox)

2. **Select and copy the signature**
   - Press `Ctrl + A` to select all
   - Press `Ctrl + C` to copy

3. **Open Outlook Signature Settings**
   - Open Outlook
   - Click **File** > **Options**
   - Click **Mail** in the left sidebar
   - Click **Signatures...** button

4. **Create a new signature**
   - Click **New**
   - Name it (e.g., "Alterspective Standard")
   - In the signature editor box, press `Ctrl + V` to paste
   - Your formatted signature should appear with formatting intact

5. **Set as default**
   - Under "Choose default signature"
   - For **New messages**, select your new signature
   - For **Replies/forwards**, select your signature or "(none)" as preferred

6. **Click OK** to save

### Alternative Method (Direct HTML):

If the copy-paste method doesn't preserve formatting:

1. In Outlook, go to **File > Options > Mail > Signatures**
2. Create a new signature
3. Click inside the signature editor
4. Press `Ctrl + F3` or right-click and look for an option to insert HTML
5. Some versions require using Registry Editor to enable direct HTML paste (not recommended for non-technical users)

---

## Method 2: Outlook Desktop (Mac)

### Installation Steps:

1. **Open the HTML signature in a browser**
   - Double-click `email-signature-template.html`
   - Opens in Safari, Chrome, or your default browser

2. **Select and copy**
   - Press `Command + A` to select all
   - Press `Command + C` to copy

3. **Open Outlook Signature Settings**
   - Open Outlook for Mac
   - Go to **Outlook** menu > **Preferences**
   - Click **Signatures**

4. **Create new signature**
   - Click the **+** button to create a new signature
   - Name it (e.g., "Alterspective Standard")
   - In the signature editor, press `Command + V` to paste
   - The formatted signature should appear

5. **Set as default**
   - Choose which account to use this signature with
   - Set for new messages and/or replies

6. **Close** the preferences window (auto-saves)

---

## Method 3: Outlook Web (Office 365)

### Installation Steps:

1. **Open the HTML signature in a browser**
   - Right-click `email-signature-template.html`
   - Open with your web browser

2. **Select and copy**
   - Press `Ctrl + A` (Windows) or `Command + A` (Mac)
   - Press `Ctrl + C` (Windows) or `Command + C` (Mac)

3. **Access Outlook Web Settings**
   - Go to https://outlook.office.com or https://outlook.office365.com
   - Log in with your credentials
   - Click the **Settings gear icon** (⚙️) in the top right
   - Scroll down and click **View all Outlook settings**

4. **Navigate to Signatures**
   - Click **Mail** in the left sidebar
   - Click **Compose and reply**
   - Scroll down to the **Email signature** section

5. **Create your signature**
   - Click in the signature editor box
   - Press `Ctrl + V` (Windows) or `Command + V` (Mac) to paste
   - Your formatted signature should appear

6. **Configure options**
   - ✅ Check "Include signature on new messages I compose" (if desired)
   - ✅ Check "Include signature on messages I forward or reply to" (if desired)

7. **Save**
   - Click **Save** at the bottom of the settings panel

---

## Testing Your Signature

### Test Checklist:

1. **Compose a new email**
   - Click "New Email" in Outlook
   - Verify your signature appears at the bottom
   - Check that formatting looks correct

2. **Test all hyperlinks**
   - Click the email link - should open your email client
   - Click the phone link - should offer to call (on mobile)
   - Click the website link - should open in browser
   - Click social media icons - should go to correct profiles

3. **Send a test email to yourself**
   - Send to your personal email (Gmail, etc.)
   - Check how it renders in different email clients

4. **Test on mobile**
   - Open the test email on your phone
   - Verify it displays correctly
   - Check that links work on mobile

5. **Reply/Forward test**
   - Reply to an email
   - Check if signature appears (based on your settings)
   - Ensure it doesn't duplicate

---

## Troubleshooting

### Logo doesn't appear

**Problem:** Logo shows as broken image or doesn't load

**Solutions:**
- Verify the image URL is correct and accessible
- Make sure URL uses `https://` not `http://`
- Check that the image is publicly accessible (not behind a login)
- Try opening the image URL directly in a browser
- Reduce image file size if it's too large (>100KB)

### Formatting looks wrong

**Problem:** Colors, fonts, or spacing don't match the template

**Solutions:**
- Try copying from a different browser (Chrome usually works best)
- Clear Outlook's formatting before pasting: use "Paste as Plain Text" first, then reformat
- Use the alternative HTML insertion method for your platform
- Check that inline CSS styles weren't stripped out

### Links don't work

**Problem:** Email, phone, or website links aren't clickable

**Solutions:**
- Verify the HTML has correct `href` attributes:
  - Email: `href="mailto:email@domain.com"`
  - Phone: `href="tel:+1234567890"`
  - Website: `href="https://website.com"`
- Re-copy and paste the signature
- Manually recreate links in Outlook's signature editor

### Signature appears twice

**Problem:** Signature duplicates when replying

**Solutions:**
- In signature settings, uncheck "Include signature on replies/forwards"
- Or manually delete duplicate before sending

### Different appearance across email clients

**Problem:** Signature looks different in Gmail vs Outlook vs Apple Mail

**Solutions:**
- This is normal - email clients render HTML differently
- Keep the design simple (tables, inline styles)
- Avoid advanced CSS (flexbox, grid, external stylesheets)
- Test in all major clients before rolling out company-wide
- Consider using a professional email signature service for consistency

### Mobile signature issues

**Problem:** Signature doesn't scale on mobile devices

**Solutions:**
- The template uses responsive design principles
- Ensure images have `max-width` CSS properties
- Keep total signature width under 600px
- Test on actual devices, not just browser dev tools

---

## Company-Wide Deployment

### For IT Administrators:

If deploying signatures company-wide:

1. **Microsoft 365 Admin Center**
   - Create Exchange transport rules
   - Set organization-wide signatures
   - Manage via centralized policy

2. **Third-Party Solutions**
   - Consider tools like Exclaimer, CodeTwo, or WiseStamp
   - These provide centralized management and analytics
   - Ensure consistency across all employees

3. **Create variations**
   - Make templates for different roles/departments
   - Standardize while allowing personalization
   - Document the process for new hires

---

## Best Practices

1. **Keep it simple** - Less is more in email signatures
2. **Mobile-friendly** - 50%+ of emails are opened on mobile
3. **Professional colors** - Stick to your brand palette
4. **Test thoroughly** - Across all email clients you use
5. **Update regularly** - Keep contact information current
6. **Legal compliance** - Include required disclaimers if needed
7. **Accessibility** - Use alt text for images
8. **File size** - Keep total signature under 100KB

---

## Additional Resources

- [Microsoft Support: Create Email Signatures](https://support.microsoft.com/en-us/office/create-and-add-an-email-signature-in-outlook-8ee5d4f4-68fd-464a-a1c1-0e1c80bb27f2)
- [HTML Email Best Practices](https://www.campaignmonitor.com/css/)
- [Email on Acid](https://www.emailonacid.com/) - Test across email clients

---

## Support

If you encounter issues not covered in this guide:
1. Check the Troubleshooting section above
2. Verify all prerequisites are met
3. Contact your IT department for assistance
4. Review the `LOGO-EXPORT-GUIDE.md` for image hosting issues

---

**Version:** 1.0
**Last Updated:** 2025-11-04
**Company:** Alterspective
