/**
 * Signature Generator Module
 *
 * Core business logic for generating email signatures.
 * This module follows SOLID principles:
 * - Single Responsibility: Only generates signature HTML
 * - Open/Closed: Extensible for new signature types
 * - Dependency Inversion: Depends on configuration, not concrete implementations
 *
 * NO DOM manipulation - pure functions only
 * Can be unit tested without browser environment
 */

import { CONFIG } from './config.js';

/**
 * SignatureGenerator Class
 * Generates HTML for email signatures based on provided data
 */
export class SignatureGenerator {
    /**
     * Constructor
     * @param {Object} config - Configuration object (injected dependency)
     */
    constructor(config = CONFIG) {
        if (!config) {
            throw new Error('SignatureGenerator requires a configuration object');
        }
        this.config = config;
    }

    /**
     * Generate New Email Signature (Full Version)
     * @param {Object} data - Form data {fullName, jobTitle, email, mobile, website}
     * @returns {string} Complete HTML document with signature
     */
    generateNewEmailSignature(data) {
        // Validate required fields
        this._validateData(data);

        // Get logo source (base64 or fallback)
        const logoSrc = this.config.logo.base64 || this.config.logo.fallbackPath;

        // Format phone number for tel: link
        const mobileForLink = this._formatPhoneForLink(data.mobile);

        // Get specifications
        const spec = this.config.signatures.new;
        const colors = this.config.colors;

        // Generate complete HTML document
        return `<!DOCTYPE html>
<html>
<head>
    <style type="text/css">
        /* Force green links in all email clients */
        a { color: ${colors.green} !important; text-decoration: none !important; }
        a:link { color: ${colors.green} !important; }
        a:visited { color: ${colors.green} !important; }
        a:hover { color: ${colors.green} !important; }
        a:active { color: ${colors.green} !important; }
        span a { color: ${colors.green} !important; }
        /* Outlook-specific link color override */
        .ExternalClass a { color: ${colors.green} !important; }
    </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: ${this.config.fonts.signatureBody};">

    <!-- EMAIL SIGNATURE TABLE - FULL VERSION -->
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${this.config.fonts.signatureBody}; border-collapse: collapse;">
        <tr>
            <!-- Logo (120x120px) with vertical divider via border-right -->
            <td style="vertical-align: top; padding-right: ${spec.spacing}px; border-right: ${spec.divider.width}px solid ${spec.divider.color};">
                <img src="${logoSrc}"
                     alt="${this.config.logo.alt}"
                     width="${spec.logo.width}"
                     height="${spec.logo.height}"
                     style="display: block; border: 0;">
            </td>

            <!-- Spacer after logo/divider -->
            <td style="width: ${spec.spacing}px; font-size: 1px; line-height: ${spec.lineHeight};">&nbsp;</td>

            <!-- Contact Information -->
            <td style="vertical-align: top;">
                <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">

                    <!-- Name -->
                    <tr>
                        <td style="font-family: ${this.config.fonts.signatureName}; font-size: ${spec.fontSize.name}px; font-weight: 600; color: ${colors.navy}; padding-bottom: 5px; line-height: ${spec.lineHeight};">
                            ${this._escapeHtml(data.fullName)}
                        </td>
                    </tr>

                    <!-- Job Title -->
                    <tr>
                        <td style="font-family: ${this.config.fonts.signatureBody}; font-size: ${spec.fontSize.title}px; color: ${colors.green}; font-weight: 500; padding-bottom: 15px; line-height: ${spec.lineHeight};">
                            ${this._escapeHtml(data.jobTitle)}
                        </td>
                    </tr>

                    <!-- Phone -->
                    <tr>
                        <td style="font-family: ${this.config.fonts.signatureBody}; font-size: ${spec.fontSize.contact}px; color: ${colors.navy}; padding-bottom: 5px; line-height: ${spec.lineHeight};">
                            <span style="color: ${colors.green}; font-weight: 600;">P:</span>
                            <a href="tel:${mobileForLink}" style="color: ${colors.navy} !important; text-decoration: none;"><span style="color: ${colors.navy} !important;">${this._escapeHtml(data.mobile)}</span></a>
                        </td>
                    </tr>

                    <!-- Email -->
                    <tr>
                        <td style="font-family: ${this.config.fonts.signatureBody}; font-size: ${spec.fontSize.contact}px; color: ${colors.navy}; padding-bottom: 5px; line-height: ${spec.lineHeight};">
                            <span style="color: ${colors.green}; font-weight: 600;">E:</span>
                            <a href="mailto:${this._escapeHtml(data.email)}" style="color: ${colors.navy} !important; text-decoration: none;"><span style="color: ${colors.navy} !important;">${this._escapeHtml(data.email)}</span></a>
                        </td>
                    </tr>

                    <!-- Website -->
                    <tr>
                        <td style="font-family: ${this.config.fonts.signatureBody}; font-size: ${spec.fontSize.contact}px; color: ${colors.navy}; padding-bottom: 15px; line-height: ${spec.lineHeight};">
                            <span style="color: ${colors.green}; font-weight: 600;">W:</span>
                            <a href="https://${this._escapeHtml(data.website)}" style="color: ${colors.navy} !important; text-decoration: none;" target="_blank"><span style="color: ${colors.navy} !important;">${this._escapeHtml(data.website)}</span></a>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>

</body>
</html>`;
    }

    /**
     * Generate Reply Signature (Compact Version)
     * Clean three-line format: Name/Title on line 1, Email on line 2, Mobile on line 3
     * @param {Object} data - Form data {fullName, jobTitle, email, mobile}
     * @returns {string} Complete HTML document with compact signature
     */
    generateReplySignature(data) {
        // Validate required fields
        this._validateData(data);

        // Get logo source
        const logoSrc = this.config.logo.base64 || this.config.logo.fallbackPath;

        // Format phone number
        const mobileForLink = this._formatPhoneForLink(data.mobile);

        // Get specifications
        const spec = this.config.signatures.reply;
        const colors = this.config.colors;

        // Generate compact three-line HTML document
        return `<!DOCTYPE html>
<html>
<head>
    <style type="text/css">
        /* Force link colors in all email clients */
        a { text-decoration: none !important; }
    </style>
    <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: ${this.config.fonts.signatureBody};">

    <!-- REPLY SIGNATURE TABLE - COMPACT THREE-LINE VERSION -->
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${this.config.fonts.signatureBody}; border-collapse: collapse;">
        <tr>
            <!-- Logo Symbol (40x40px) with vertical divider -->
            <td rowspan="3" style="vertical-align: middle; padding-right: ${spec.spacing}px; border-right: ${spec.divider.width}px solid ${spec.divider.color};">
                <img src="${logoSrc}"
                     alt="${this.config.logo.alt}"
                     width="${spec.logo.width}"
                     height="${spec.logo.height}"
                     style="display: block; border: 0;">
            </td>

            <!-- Spacer after logo/divider -->
            <td rowspan="3" style="width: ${spec.spacing}px;">&nbsp;</td>

            <!-- Line 1: Name & Job Title -->
            <td style="font-family: ${this.config.fonts.signatureBody}; font-size: ${spec.fontSize.name}px; font-weight: 600; color: ${colors.navy}; padding: 0 0 2px 0; line-height: 1.2;">
                ${this._escapeHtml(data.fullName)}<span style="color: ${colors.green}; font-weight: 400; font-size: ${spec.fontSize.title}px;"> • ${this._escapeHtml(data.jobTitle)}</span>
            </td>
        </tr>
        <tr>
            <!-- Line 2: Email -->
            <td style="font-family: ${this.config.fonts.signatureBody}; font-size: ${spec.fontSize.contact}px; color: ${colors.navy}; padding: 2px 0; line-height: 1.2;">
                <a href="mailto:${this._escapeHtml(data.email)}" style="color: ${colors.navy} !important; text-decoration: none;"><span style="color: ${colors.navy} !important;">${this._escapeHtml(data.email)}</span></a>
            </td>
        </tr>
        <tr>
            <!-- Line 3: Mobile -->
            <td style="font-family: ${this.config.fonts.signatureBody}; font-size: ${spec.fontSize.contact}px; color: ${colors.navy}; padding: 2px 0 0 0; line-height: 1.2;">
                m. <a href="tel:${mobileForLink}" style="color: ${colors.navy} !important; text-decoration: none;"><span style="color: ${colors.navy} !important;">${this._escapeHtml(data.mobile)}</span></a>
            </td>
        </tr>
    </table>

</body>
</html>`;
    }

    /**
     * Extract table HTML from complete document
     * Used for preview display (without DOCTYPE/head/body tags)
     * @param {string} fullHtml - Complete HTML document
     * @returns {string} Just the table element
     */
    extractTableForPreview(fullHtml) {
        const match = fullHtml.match(/<table[^>]*>[\s\S]*<\/table>/);
        if (!match || !match[0]) {
            throw new Error('No table found in generated HTML');
        }
        return match[0];
    }

    /**
     * Validate form data
     * @private
     * @param {Object} data - Form data to validate
     * @throws {Error} If validation fails
     */
    _validateData(data) {
        if (!data) {
            throw new Error('No data provided for signature generation');
        }

        const required = this.config.validation.required;
        const missing = [];

        for (const field of required) {
            if (!data[field] || data[field].trim() === '') {
                missing.push(field);
            }
        }

        if (missing.length > 0) {
            throw new Error(`Missing required fields: ${missing.join(', ')}`);
        }

        // Validate email format
        if (!this.config.validation.emailRegex.test(data.email)) {
            throw new Error('Invalid email address format');
        }
    }

    /**
     * Format phone number for tel: link
     * Converts Australian mobile format to international
     * @private
     * @param {string} mobile - Mobile number (e.g., "0412 345 678")
     * @returns {string} Formatted for tel: link (e.g., "+61412345678")
     */
    _formatPhoneForLink(mobile) {
        // Remove leading 0 and all spaces, prepend +61
        return this.config.validation.mobilePrefix +
               mobile.replace(/^0/, '').replace(/\s/g, '');
    }

    /**
     * Escape HTML special characters to prevent injection
     * @private
     * @param {string} str - String to escape
     * @returns {string} HTML-safe string
     */
    _escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}
