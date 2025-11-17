// Reply Signature Generator Functions
// Part of AltSig v2.0 - Alterspective Email Signature Generator

// Global variable to track current signature type
let currentSignatureType = 'new'; // 'new' or 'reply'

function selectSignatureType(type) {
    currentSignatureType = type;

    const newEmailBtn = document.getElementById('newEmailBtn');
    const replyBtn = document.getElementById('replyBtn');
    const specsCard = document.getElementById('specsCard');
    const signatureTypeHint = document.getElementById('signatureTypeHint');
    const websiteInput = document.getElementById('website');
    const websiteFormGroup = websiteInput.parentElement;

    if (type === 'new') {
        // Style buttons
        newEmailBtn.style.background = '#2C8248';
        newEmailBtn.style.color = 'white';
        newEmailBtn.style.borderColor = '#2C8248';
        replyBtn.style.background = 'white';
        replyBtn.style.color = '#666';
        replyBtn.style.borderColor = '#e0e0e0';

        // Update specs card
        specsCard.innerHTML = `
            <h3>New Email Signature Specs</h3>
            <ul>
                <li>Geometric symbol logo (120x120px)</li>
                <li>Vertical green divider (2px)</li>
                <li>Minimal padding (15px spacing)</li>
                <li>Georgia serif for name/title</li>
                <li>Arial sans-serif for contact</li>
                <li>Outlook 2016+ compatible</li>
            </ul>
        `;

        // Update hint
        signatureTypeHint.textContent = 'Full signature for new emails (includes website)';

        // Show website field
        websiteFormGroup.style.display = 'block';

    } else if (type === 'reply') {
        // Style buttons
        replyBtn.style.background = '#2C8248';
        replyBtn.style.color = 'white';
        replyBtn.style.borderColor = '#2C8248';
        newEmailBtn.style.background = 'white';
        newEmailBtn.style.color = '#666';
        newEmailBtn.style.borderColor = '#e0e0e0';

        // Update specs card
        specsCard.innerHTML = `
            <h3>Reply Signature Specs</h3>
            <ul>
                <li>Compact 40x40px logo</li>
                <li>Horizontal single-line layout</li>
                <li>67% smaller than new email signature</li>
                <li>Name, title, email, mobile only</li>
                <li>Perfect for reply threads</li>
                <li>All email clients compatible</li>
            </ul>
        `;

        // Update hint
        signatureTypeHint.textContent = 'Compact signature for replies (no website, minimal space)';

        // Hide website field for replies
        websiteFormGroup.style.display = 'none';
    }

    // Reset preview
    document.getElementById('preview').innerHTML = '<p style="color: #666; text-align: center;">Fill in the form and click "Generate Signature"</p>';
    document.getElementById('copyBtn').disabled = true;
    document.getElementById('downloadBtn').disabled = true;
}

function generateCurrentSignature() {
    if (currentSignatureType === 'new') {
        generateSignature();
    } else {
        generateReplySignature();
    }
}

function generateReplySignature() {
    const fullName = document.getElementById('fullName').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();

    // Validation
    if (!fullName || !jobTitle || !email || !mobile) {
        alert('Please fill in all required fields (marked with *)');
        return;
    }

    // Format phone number for tel: link (remove spaces and add +61)
    const mobileForLink = '+61' + mobile.replace(/^0/, '').replace(/\s/g, '');

    // Use base64 logo for clipboard copy, or fallback to path for preview
    const logoSrc = logoBase64 || logoPath;

    // Generate compact reply signature HTML
    window.generatedHTML = `<!DOCTYPE html>
<html>
<head>
    <style type="text/css">
        /* Force green links in all email clients */
        a { color: #2C8248 !important; text-decoration: none !important; }
        a:link { color: #2C8248 !important; }
        a:visited { color: #2C8248 !important; }
        a:hover { color: #2C8248 !important; }
        a:active { color: #2C8248 !important; }
        span a { color: #2C8248 !important; }
        /* Outlook-specific link color override */
        .ExternalClass a { color: #2C8248 !important; }
    </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">

    <table cellpadding="0" cellspacing="0" border="0" style="font-family: Arial, sans-serif; line-height: 1.3; border-collapse: collapse;">
        <tr>
            <!-- Logo Symbol (Small 40x40) -->
            <td style="vertical-align: middle; padding-right: 10px;">
                <img src="${logoSrc}"
                     alt="Alterspective"
                     width="40"
                     height="40"
                     style="display: block; border: 0;">
            </td>

            <!-- Vertical Divider -->
            <td style="vertical-align: middle; padding-right: 10px;">
                <table cellpadding="0" cellspacing="0" border="0" style="height: 40px; border-collapse: collapse;">
                    <tr>
                        <td style="width: 1px; border-left: 1px solid #2C8248; font-size: 1px; line-height: 1px;">&nbsp;</td>
                    </tr>
                </table>
            </td>

            <!-- Spacer after divider -->
            <td style="width: 10px; font-size: 1px; line-height: 1px;">&nbsp;</td>

            <!-- Contact Information - Compact inline format -->
            <td style="vertical-align: middle;">
                <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                    <tr>
                        <!-- Name -->
                        <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; font-weight: bold; color: #17232D; padding: 0; margin: 0; padding-right: 8px; white-space: nowrap;">
                            ${fullName}
                        </td>

                        <!-- Separator dot -->
                        <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #2C8248; padding: 0 6px 0 0;">
                            •
                        </td>

                        <!-- Job Title -->
                        <td style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #2C8248; padding: 0; margin: 0; padding-right: 8px; white-space: nowrap;">
                            ${jobTitle}
                        </td>

                        <!-- Separator dot -->
                        <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #2C8248; padding: 0 6px 0 0;">
                            •
                        </td>

                        <!-- Email -->
                        <td style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #2C8248; padding: 0; margin: 0; padding-right: 8px; white-space: nowrap;">
                            <a href="mailto:${email}" style="color: #2C8248 !important; text-decoration: none;"><span style="color: #2C8248 !important;">${email}</span></a>
                        </td>

                        <!-- Separator dot -->
                        <td style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: #2C8248; padding: 0 6px 0 0;">
                            •
                        </td>

                        <!-- Mobile -->
                        <td style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: #2C8248; padding: 0; margin: 0; white-space: nowrap;">
                            m. <a href="tel:${mobileForLink}" style="color: #2C8248 !important; text-decoration: none;"><span style="color: #2C8248 !important;">${mobile}</span></a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>

</body>
</html>`;

    // Extract just the table for preview
    const previewHTML = generatedHTML.match(/<table[^>]*>[\s\S]*<\/table>/)[0];
    document.getElementById('preview').innerHTML = previewHTML;

    // Enable buttons
    document.getElementById('copyBtn').disabled = false;
    document.getElementById('downloadBtn').disabled = false;
}
