/**
 * Themed Signature Generator Module
 *
 * Extends the base SignatureGenerator to add themed elements.
 * Maintains email client compatibility while adding tasteful seasonal decorations.
 */

import { SignatureGenerator } from '../signature-generator.js';
import { ThemeManager } from './theme-manager.js';
import { CONFIG } from '../config.js';

export class ThemedSignatureGenerator extends SignatureGenerator {
    constructor(config = CONFIG) {
        super(config);
        this.themeManager = null; // Must be set via setThemeManager()
    }

    /**
     * Generate themed new email signature
     * @param {Object} data - Form data
     * @param {Object} options - Theme options
     * @returns {string} Themed HTML signature
     */
    generateThemedNewEmailSignature(data, options = {}) {
        // Validate theme manager is set
        if (!this.themeManager) {
            throw new Error('ThemeManager must be set before generating themed signatures');
        }

        // Validate data first
        this._validateData(data);

        const theme = this.themeManager.getCurrentTheme();
        const decorationIntensity = this.themeManager.getDecorationIntensity();

        // Get appropriate logo for the theme
        let logoSrc = this.config.logo.base64 || this.config.logo.fallbackPath;

        // Use Christmas logo if it's Christmas theme and available
        if (theme.id === 'christmas' && this.config.logo.christmasBase64) {
            logoSrc = this.config.logo.christmasBase64;
        }

        // Format phone for tel: link
        const mobileForLink = this._formatPhoneForLink(data.mobile);

        // Theme colors
        const colors = theme.colors;

        // Get divider style based on theme
        const dividerStyle = this._getThemedDividerStyle(theme, decorationIntensity);

        // Get optional greeting message
        const greetingMessage = this._getThemeGreeting(theme, decorationIntensity);

        // Generate the HTML
        return `<!DOCTYPE html>
<html>
<head>
    <style type="text/css">
        /* Theme-specific link colors */
        a { color: ${colors.link} !important; text-decoration: none !important; }
        a:link { color: ${colors.link} !important; }
        a:visited { color: ${colors.link} !important; }
        a:hover { color: ${colors.link} !important; }
        a:active { color: ${colors.link} !important; }
        span a { color: ${colors.link} !important; }
        .ExternalClass a { color: ${colors.link} !important; }
    </style>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: ${this.config.fonts.signatureBody};">

    <!-- THEMED EMAIL SIGNATURE TABLE -->
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${this.config.fonts.signatureBody}; border-collapse: collapse;">
        ${greetingMessage ? `
        <!-- Optional seasonal greeting -->
        <tr>
            <td colspan="3" style="padding-bottom: 10px; font-size: 11px; color: ${colors.secondary}; font-style: italic;">
                ${greetingMessage}
            </td>
        </tr>
        ` : ''}

        <tr>
            <!-- Logo (themed if available) -->
            <td style="vertical-align: top; padding-right: 15px; ${dividerStyle}">
                ${this._getThemedLogoHtml(theme, logoSrc, false, decorationIntensity)}
            </td>

            <!-- Spacer -->
            <td style="width: 15px; font-size: 1px; line-height: 100%;">&nbsp;</td>

            <!-- Contact Information -->
            <td style="vertical-align: top;">
                <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">

                    <!-- Name with optional festive icon -->
                    <tr>
                        <td style="font-family: ${this.config.fonts.signatureName}; font-size: 16px; font-weight: 600; color: ${colors.text}; padding-bottom: 5px; line-height: 100%;">
                            ${this._getDecorativeIcon(theme, 'before', decorationIntensity)}
                            ${this._escapeHtml(data.fullName)}
                            ${this._getDecorativeIcon(theme, 'after', decorationIntensity)}
                        </td>
                    </tr>

                    <!-- Job Title -->
                    <tr>
                        <td style="font-family: ${this.config.fonts.signatureBody}; font-size: 14px; color: ${colors.secondary}; font-weight: 500; padding-bottom: 15px; line-height: 100%;">
                            ${this._escapeHtml(data.jobTitle)}
                        </td>
                    </tr>

                    <!-- Phone -->
                    <tr>
                        <td style="font-family: ${this.config.fonts.signatureBody}; font-size: 13px; color: ${colors.text}; padding-bottom: 5px; line-height: 100%;">
                            <span style="color: ${colors.secondary}; font-weight: 600;">P:</span>
                            <a href="tel:${mobileForLink}" style="color: ${colors.text} !important; text-decoration: none;">
                                <span style="color: ${colors.text} !important;">${this._escapeHtml(data.mobile)}</span>
                            </a>
                        </td>
                    </tr>

                    <!-- Email -->
                    <tr>
                        <td style="font-family: ${this.config.fonts.signatureBody}; font-size: 13px; color: ${colors.text}; padding-bottom: 5px; line-height: 100%;">
                            <span style="color: ${colors.secondary}; font-weight: 600;">E:</span>
                            <a href="mailto:${this._escapeHtml(data.email)}" style="color: ${colors.text} !important; text-decoration: none;">
                                <span style="color: ${colors.text} !important;">${this._escapeHtml(data.email)}</span>
                            </a>
                        </td>
                    </tr>

                    <!-- Website -->
                    <tr>
                        <td style="font-family: ${this.config.fonts.signatureBody}; font-size: 13px; color: ${colors.text}; padding-bottom: ${theme.messages.footer ? '10' : '15'}px; line-height: 100%;">
                            <span style="color: ${colors.secondary}; font-weight: 600;">W:</span>
                            <a href="https://${this._escapeHtml(data.website)}" style="color: ${colors.text} !important; text-decoration: none;" target="_blank">
                                <span style="color: ${colors.text} !important;">${this._escapeHtml(data.website)}</span>
                            </a>
                        </td>
                    </tr>

                    ${this._getThemeFooterMessage(theme, colors, decorationIntensity)}

                </table>
            </td>
        </tr>
    </table>

</body>
</html>`;
    }

    /**
     * Generate themed reply signature (compact)
     * @param {Object} data - Form data
     * @param {Object} options - Theme options
     * @returns {string} Themed reply signature HTML
     */
    generateThemedReplySignature(data, options = {}) {
        // Validate theme manager is set
        if (!this.themeManager) {
            throw new Error('ThemeManager must be set before generating themed signatures');
        }

        // Validate data
        this._validateData(data);

        const theme = this.themeManager.getCurrentTheme();
        const decorationIntensity = this.themeManager.getDecorationIntensity();

        // Get appropriate logo for the theme
        let logoSrc = this.config.logo.base64 || this.config.logo.fallbackPath;

        // Use Christmas logo if it's Christmas theme and available (even for reply)
        if (theme.id === 'christmas' && this.config.logo.christmasBase64) {
            logoSrc = this.config.logo.christmasBase64;
        }

        // Format phone
        const mobileForLink = this._formatPhoneForLink(data.mobile);

        // Theme colors
        const colors = theme.colors;

        // Simple divider for reply (more subtle)
        const dividerStyle = `border-right: 2px solid ${colors.divider};`;

        return `<!DOCTYPE html>
<html>
<head>
    <style type="text/css">
        a { text-decoration: none !important; }
    </style>
    <meta charset="UTF-8">
</head>
<body style="margin: 0; padding: 0; font-family: ${this.config.fonts.signatureBody};">

    <!-- THEMED REPLY SIGNATURE TABLE - COMPACT -->
    <table cellpadding="0" cellspacing="0" border="0" style="font-family: ${this.config.fonts.signatureBody}; border-collapse: collapse;">
        <tr>
            <!-- Small logo/symbol -->
            <td rowspan="3" style="vertical-align: middle; padding-right: 10px; ${dividerStyle}">
                ${this._getThemedLogoHtml(theme, logoSrc, true, decorationIntensity * 0.5)} <!-- Reduced decoration for reply -->
            </td>

            <!-- Spacer -->
            <td rowspan="3" style="width: 10px;">&nbsp;</td>

            <!-- Line 1: Name & Title -->
            <td style="font-family: ${this.config.fonts.signatureBody}; font-size: 13px; font-weight: 600; color: ${colors.text}; padding: 0 0 2px 0; line-height: 1.2;">
                ${this._escapeHtml(data.fullName)}
                <span style="color: ${colors.secondary}; font-weight: 400; font-size: 12px;"> • ${this._escapeHtml(data.jobTitle)}</span>
            </td>
        </tr>
        <tr>
            <!-- Line 2: Email -->
            <td style="font-family: ${this.config.fonts.signatureBody}; font-size: 12px; color: ${colors.text}; padding: 2px 0; line-height: 1.2;">
                <a href="mailto:${this._escapeHtml(data.email)}" style="color: ${colors.text} !important; text-decoration: none;">
                    <span style="color: ${colors.text} !important;">${this._escapeHtml(data.email)}</span>
                </a>
            </td>
        </tr>
        <tr>
            <!-- Line 3: Mobile -->
            <td style="font-family: ${this.config.fonts.signatureBody}; font-size: 12px; color: ${colors.text}; padding: 2px 0 0 0; line-height: 1.2;">
                m. <a href="tel:${mobileForLink}" style="color: ${colors.text} !important; text-decoration: none;">
                    <span style="color: ${colors.text} !important;">${this._escapeHtml(data.mobile)}</span>
                </a>
            </td>
        </tr>
    </table>

</body>
</html>`;
    }

    /**
     * Get themed divider style
     * @private
     */
    _getThemedDividerStyle(theme, intensity) {
        const baseStyle = `border-right: 2px solid ${theme.colors.divider}; padding-right: 15px;`;

        if (!theme.decorations.enabled || intensity < 0.3) {
            return baseStyle;
        }

        // Add special divider patterns for certain themes
        switch (theme.decorations.dividerStyle) {
            case 'holly':
                // For email, we can't use complex patterns, so just use the color
                return `border-right: 3px solid ${theme.colors.divider}; padding-right: 15px;`;

            case 'champagne':
                // Dotted for bubbly effect
                return `border-right: 2px dotted ${theme.colors.divider}; padding-right: 15px;`;

            default:
                return baseStyle;
        }
    }

    /**
     * Get themed logo HTML
     * @private
     */
    _getThemedLogoHtml(theme, logoSrc, isReply = false, intensity = 1) {
        const size = isReply ? 40 : 120;

        // For Christmas theme, the logoSrc already contains the Christmas logo
        // Just use it directly without any emoji decorations
        if (theme.id === 'christmas') {
            return `<img src="${logoSrc}"
                         alt="${this.config.logo.alt}"
                         width="${size}"
                         height="${size}"
                         style="display: block; border: 0;">`;
        }

        // For New Year theme, keep the sparkles but with regular logo
        if (theme.id === 'newYear' && theme.decorations.enabled && intensity >= 0.5 && !isReply) {
            // Create a 3x3 table grid with sparkles in corners and logo in center
            return `<table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                <tr>
                    <td style="width: 10px; height: 10px; font-size: 12px; text-align: center;">✨</td>
                    <td style="width: ${size}px;">&nbsp;</td>
                    <td style="width: 10px; height: 10px; font-size: 12px; text-align: center;">🎊</td>
                </tr>
                <tr>
                    <td>&nbsp;</td>
                    <td style="padding: 0;">
                        <img src="${logoSrc}"
                             alt="${this.config.logo.alt}"
                             width="${size}"
                             height="${size}"
                             style="display: block; border: 0;">
                    </td>
                    <td>&nbsp;</td>
                </tr>
                <tr>
                    <td style="width: 10px; height: 10px; font-size: 12px; text-align: center;">🎉</td>
                    <td>&nbsp;</td>
                    <td style="width: 10px; height: 10px; font-size: 12px; text-align: center;">✨</td>
                </tr>
            </table>`;
        }

        // Default: just the logo
        return `<img src="${logoSrc}"
                     alt="${this.config.logo.alt}"
                     width="${size}"
                     height="${size}"
                     style="display: block; border: 0;">`;
    }

    /**
     * Get decorative icon if theme has them
     * @private
     */
    _getDecorativeIcon(theme, position, intensity) {
        if (!theme?.decorations?.enabled || intensity < 0.5) {
            return '';
        }

        const icon = theme.decorations?.icons?.[position];
        if (!icon) return '';

        // Escape HTML in icon (in case it's not an emoji)
        const safeIcon = String(icon);
        return `<span style="margin-${position === 'before' ? 'right' : 'left'}: 5px;">${safeIcon}</span>`;
    }

    /**
     * Get theme greeting message
     * @private
     */
    _getThemeGreeting(theme, intensity) {
        if (!theme?.messages?.greeting || intensity < 0.3) {
            return null;
        }

        // Escape HTML in greeting message for safety
        const div = document.createElement('div');
        div.textContent = theme.messages.greeting;
        return div.innerHTML;
    }

    /**
     * Get theme footer message row
     * @private
     */
    _getThemeFooterMessage(theme, colors, intensity) {
        if (!theme?.messages?.footer || intensity < 0.5) {
            return '';
        }

        // Escape HTML in footer message for safety
        const div = document.createElement('div');
        div.textContent = theme.messages.footer;
        const safeFooter = div.innerHTML;

        return `
            <!-- Seasonal footer message -->
            <tr>
                <td style="font-family: ${this.config.fonts.signatureBody}; font-size: 11px; color: ${colors.accent}; padding-top: 5px; font-style: italic; line-height: 100%;">
                    ${safeFooter}
                </td>
            </tr>
        `;
    }

    /**
     * Set the theme manager
     * @param {ThemeManager} manager
     */
    setThemeManager(manager) {
        if (!manager) {
            throw new Error('ThemeManager instance is required');
        }

        if (typeof manager.getCurrentTheme !== 'function') {
            throw new Error('Invalid ThemeManager: missing getCurrentTheme method');
        }

        if (typeof manager.getDecorationIntensity !== 'function') {
            throw new Error('Invalid ThemeManager: missing getDecorationIntensity method');
        }

        this.themeManager = manager;
    }

    /**
     * Get current theme
     * @returns {Object} Current theme configuration
     */
    getCurrentTheme() {
        if (!this.themeManager) {
            throw new Error('ThemeManager not set');
        }
        return this.themeManager.getCurrentTheme();
    }
}