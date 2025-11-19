/**
 * Download Handler Module
 *
 * Handles downloading signature HTML as files.
 * This module follows SOLID principles:
 * - Single Responsibility: Only handles file downloads
 * - Dependency Inversion: Depends on configuration abstraction
 *
 * Creates downloadable HTML files for email signature installation
 */

import { CONFIG } from './config.js';

/**
 * DownloadHandler Class
 * Manages downloading HTML content as files
 */
export class DownloadHandler {
    /**
     * Constructor
     * @param {Object} config - Configuration object (injected dependency)
     */
    constructor(config = CONFIG) {
        if (!config) {
            throw new Error('DownloadHandler requires a configuration object');
        }
        this.config = config;
    }

    /**
     * Download signature HTML as a file
     *
     * @param {string} html - Complete HTML document to download
     * @param {string} filename - Name for the downloaded file
     * @returns {boolean} True if download succeeded
     */
    downloadSignature(html, filename) {
        if (!html) {
            throw new Error('No HTML provided for download');
        }

        if (!filename) {
            throw new Error('No filename provided for download');
        }

        try {
            // Create blob from HTML content
            const blob = new Blob([html], {
                type: `${this.config.download.fileType};${this.config.download.encoding}`
            });

            // Create object URL for the blob
            const url = URL.createObjectURL(blob);

            // Create temporary anchor element
            const downloadLink = document.createElement('a');
            downloadLink.href = url;
            downloadLink.download = filename;
            downloadLink.style.display = 'none';

            // Add to DOM, click, and remove
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            // Clean up object URL after a short delay
            // (gives browser time to start download)
            setTimeout(() => {
                URL.revokeObjectURL(url);
            }, 100);

            return true;

        } catch (error) {
            console.error('Download failed:', error);
            throw new Error(`Failed to download signature: ${error.message}`);
        }
    }

    /**
     * Download new email signature
     * Uses default filename from configuration
     *
     * @param {string} html - Complete HTML document
     * @returns {boolean} Success status
     */
    downloadNewEmailSignature(html) {
        return this.downloadSignature(
            html,
            this.config.download.filenames.newEmail
        );
    }

    /**
     * Download reply signature
     * Uses default filename from configuration
     *
     * @param {string} html - Complete HTML document
     * @returns {boolean} Success status
     */
    downloadReplySignature(html) {
        return this.downloadSignature(
            html,
            this.config.download.filenames.reply
        );
    }

    /**
     * Check if download functionality is supported
     * @returns {boolean} True if downloads are supported
     */
    isSupported() {
        return (
            typeof Blob !== 'undefined' &&
            typeof URL !== 'undefined' &&
            typeof URL.createObjectURL === 'function'
        );
    }
}
