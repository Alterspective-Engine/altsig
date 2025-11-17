// Reply Signature Generator Functions - Version 2.0
// Dual signature generation with side-by-side display

function generateBothSignatures() {
    const fullName = document.getElementById('fullName').value.trim();
    const jobTitle = document.getElementById('jobTitle').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const website = document.getElementById('website').value.trim() || 'alterspective.com.au';

    // Validation
    if (!fullName || !jobTitle || !email || !mobile) {
        alert('Please fill in all required fields (marked with *)');
        return;
    }

    // Generate both signatures
    generateSignature(); // Generate new email signature (original function)

    // Store the new email signature HTML
    window.newEmailHTML = window.generatedHTML;

    // Generate reply signature
    generateReplySignatureHTML(fullName, jobTitle, email, mobile);

    // Store the reply signature HTML
    window.replyHTML = window.generatedHTML;

    // Display both signatures
    displayBothSignatures();

    // Enable all action buttons
    document.getElementById('copyNewBtn').disabled = false;
    document.getElementById('downloadNewBtn').disabled = false;
    document.getElementById('copyReplyBtn').disabled = false;
    document.getElementById('downloadReplyBtn').disabled = false;
}

function generateReplySignatureHTML(fullName, jobTitle, email, mobile) {
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
}

function displayBothSignatures() {
    // Extract table from new email signature
    const newEmailTable = window.newEmailHTML.match(/<table[^>]*>[\s\S]*<\/table>/)[0];

    // Extract table from reply signature
    const replyTable = window.replyHTML.match(/<table[^>]*>[\s\S]*<\/table>/)[0];

    // Display in preview containers
    document.getElementById('previewNew').innerHTML = newEmailTable;
    document.getElementById('previewReply').innerHTML = replyTable;
}

function copyNewSignature() {
    copySignatureToClipboard(window.newEmailHTML, 'successMsgNew');
}

function copyReplySignature() {
    copySignatureToClipboard(window.replyHTML, 'successMsgReply');
}

function copySignatureToClipboard(html, messageId) {
    // Create a temporary container
    const tempDiv = document.createElement('div');
    const tableHTML = html.match(/<table[^>]*>[\s\S]*<\/table>/)[0];
    tempDiv.innerHTML = tableHTML;
    document.body.appendChild(tempDiv);

    // Select the content
    const range = document.createRange();
    range.selectNodeContents(tempDiv);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Copy to clipboard
    try {
        document.execCommand('copy');

        // Show success message
        const successMsg = document.getElementById(messageId);
        successMsg.style.display = 'block';
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 4000);

        // Show installation instructions
        if (typeof showInstallInstructions === 'function') {
            showInstallInstructions();
        }
    } catch (err) {
        alert('Failed to copy. Please try the Download button instead.');
    }

    // Clean up
    selection.removeAllRanges();
    document.body.removeChild(tempDiv);
}

function downloadNewSignature() {
    downloadSignatureHTML(window.newEmailHTML, 'alterspective-signature-new-email.html');
}

function downloadReplySignature() {
    downloadSignatureHTML(window.replyHTML, 'alterspective-signature-reply.html');
}

function downloadSignatureHTML(html, filename) {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
