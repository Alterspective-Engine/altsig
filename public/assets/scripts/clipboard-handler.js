/**
 * Clipboard Handler Module
 *
 * Handles copying signature HTML to clipboard.
 * This module follows SOLID principles:
 * - Single Responsibility: Only handles clipboard operations
 * - Dependency Inversion: Depends on abstractions (configuration)
 *
 * Uses modern Clipboard API with fallback to execCommand for older browsers
 */

import { CONFIG } from './config.js';

/**
 * ClipboardHandler Class
 * Manages copying HTML content to clipboard
 */
export class ClipboardHandler {
    /**
     * Constructor
     * @param {Object} config - Configuration object (injected dependency)
     */
    constructor(config = CONFIG) {
        if (!config) {
            throw new Error('ClipboardHandler requires a configuration object');
        }
        this.config = config;
    }

    /**
     * Copy signature HTML to clipboard
     * Extracts table from full HTML and copies formatted content
     *
     * @param {string} fullHtml - Complete HTML document with signature
     * @returns {Promise<boolean>} True if copy succeeded, false otherwise
     */
    async copySignature(fullHtml) {
        if (!fullHtml) {
            throw new Error('No HTML provided to copy');
        }

        try {
            // Extract just the table portion for copying
            const tableMatch = fullHtml.match(/<table[^>]*>[\s\S]*<\/table>/);

            if (!tableMatch || !tableMatch[0]) {
                throw new Error('No table found in HTML');
            }

            const tableHTML = tableMatch[0];

            // Try modern Clipboard API first (preferred method)
            if (navigator.clipboard && navigator.clipboard.write) {
                return await this._copyWithClipboardAPI(tableHTML);
            }

            // Fallback to execCommand method (for older browsers and better Outlook compatibility)
            return this._copyWithExecCommand(tableHTML);

        } catch (error) {
            console.error('Copy to clipboard failed:', error);
            throw new Error(`Failed to copy signature: ${error.message}`);
        }
    }

    /**
     * Copy using modern Clipboard API
     * @private
     * @param {string} html - HTML content to copy
     * @returns {Promise<boolean>} Success status
     */
    async _copyWithClipboardAPI(html) {
        try {
            // Create blob with HTML content
            const blob = new Blob([html], { type: 'text/html' });
            const data = [new ClipboardItem({ 'text/html': blob })];

            await navigator.clipboard.write(data);
            return true;
        } catch (error) {
            console.warn('Clipboard API failed, falling back to execCommand:', error);
            // Fall back to execCommand if Clipboard API fails
            return this._copyWithExecCommand(html);
        }
    }

    /**
     * Copy using legacy execCommand method
     * This method works better for Outlook compatibility
     * @private
     * @param {string} html - HTML content to copy
     * @returns {boolean} Success status
     */
    _copyWithExecCommand(html) {
        // Create temporary div to hold the HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '0';

        // Add to DOM
        document.body.appendChild(tempDiv);

        try {
            // Select the content
            const range = document.createRange();
            range.selectNodeContents(tempDiv);

            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);

            // Execute copy command
            const success = document.execCommand('copy');

            // Clean up selection
            selection.removeAllRanges();

            return success;

        } finally {
            // Always remove temp div, even if copy fails
            document.body.removeChild(tempDiv);
        }
    }

    /**
     * Check if clipboard functionality is available
     * @returns {boolean} True if clipboard is supported
     */
    isSupported() {
        return (
            (navigator.clipboard && navigator.clipboard.write) ||
            (document.queryCommandSupported && document.queryCommandSupported('copy'))
        );
    }
}
