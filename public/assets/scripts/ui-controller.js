/**
 * UI Controller Module
 *
 * Handles all DOM manipulation and user interface updates.
 * This module follows SOLID principles:
 * - Single Responsibility: Only handles UI/DOM operations
 * - Dependency Inversion: Depends on injected dependencies (generator, handlers, config)
 *
 * This is the ONLY module that directly manipulates the DOM
 */

import { CONFIG } from './config.js';

/**
 * UIController Class
 * Manages all user interface interactions and DOM updates
 */
export class UIController {
    /**
     * Constructor with dependency injection
     * @param {Object} dependencies - Injected dependencies
     * @param {SignatureGenerator} dependencies.signatureGenerator
     * @param {ClipboardHandler} dependencies.clipboardHandler
     * @param {DownloadHandler} dependencies.downloadHandler
     * @param {Object} dependencies.config
     */
    constructor({ signatureGenerator, clipboardHandler, downloadHandler, config = CONFIG }) {
        if (!signatureGenerator) {
            throw new Error('UIController requires signatureGenerator dependency');
        }
        if (!clipboardHandler) {
            throw new Error('UIController requires clipboardHandler dependency');
        }
        if (!downloadHandler) {
            throw new Error('UIController requires downloadHandler dependency');
        }

        this.generator = signatureGenerator;
        this.clipboard = clipboardHandler;
        this.downloader = downloadHandler;
        this.config = config;

        // Storage for generated signatures
        this.signatures = {
            newEmail: null,
            reply: null
        };

        // Cache DOM elements
        this.elements = {};

        // Bind methods to maintain 'this' context
        this.handleGenerateBoth = this.handleGenerateBoth.bind(this);
        this.handleCopyNew = this.handleCopyNew.bind(this);
        this.handleCopyReply = this.handleCopyReply.bind(this);
        this.handleDownloadNew = this.handleDownloadNew.bind(this);
        this.handleDownloadReply = this.handleDownloadReply.bind(this);
        this.handleShowTab = this.handleShowTab.bind(this);
    }

    /**
     * Initialize the UI Controller
     * Caches DOM elements and sets up event listeners
     */
    init() {
        this._cacheElements();
        this._setupEventListeners();
        this._initializeButtonStates();

        console.log('✓ UIController initialized');

        // Log logo status
        if (this.config.logo.base64) {
            console.log('✓ Logo embedded successfully (base64 length:', this.config.logo.base64.length, ')');
        } else {
            console.warn('⚠ Logo not embedded - using relative path fallback');
        }
    }

    /**
     * Cache DOM elements for performance
     * @private
     */
    _cacheElements() {
        const ids = this.config.elements;

        // Form inputs
        this.elements.fullName = document.getElementById(ids.form.fullName);
        this.elements.jobTitle = document.getElementById(ids.form.jobTitle);
        this.elements.email = document.getElementById(ids.form.email);
        this.elements.mobile = document.getElementById(ids.form.mobile);
        this.elements.website = document.getElementById(ids.form.website);

        // Preview containers
        this.elements.previewNew = document.getElementById(ids.preview.new);
        this.elements.previewReply = document.getElementById(ids.preview.reply);

        // Buttons
        this.elements.generateBtn = document.getElementById(ids.buttons.generate);
        this.elements.copyNewBtn = document.getElementById(ids.buttons.copyNew);
        this.elements.copyReplyBtn = document.getElementById(ids.buttons.copyReply);
        this.elements.downloadNewBtn = document.getElementById(ids.buttons.downloadNew);
        this.elements.downloadReplyBtn = document.getElementById(ids.buttons.downloadReply);

        // Success messages
        this.elements.successMsgNew = document.getElementById(ids.messages.successNew);
        this.elements.successMsgReply = document.getElementById(ids.messages.successReply);

        // Installation instructions
        this.elements.installInstructions = document.getElementById(ids.instructions.container);
    }

    /**
     * Setup event listeners for all interactive elements
     * @private
     */
    _setupEventListeners() {
        if (this.elements.generateBtn) {
            this.elements.generateBtn.addEventListener('click', this.handleGenerateBoth);
        }

        if (this.elements.copyNewBtn) {
            this.elements.copyNewBtn.addEventListener('click', this.handleCopyNew);
        }

        if (this.elements.copyReplyBtn) {
            this.elements.copyReplyBtn.addEventListener('click', this.handleCopyReply);
        }

        if (this.elements.downloadNewBtn) {
            this.elements.downloadNewBtn.addEventListener('click', this.handleDownloadNew);
        }

        if (this.elements.downloadReplyBtn) {
            this.elements.downloadReplyBtn.addEventListener('click', this.handleDownloadReply);
        }

        // Tab switching for installation instructions
        const tabButtons = document.querySelectorAll('.os-tab');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const tabName = e.target.getAttribute('data-tab');
                this.handleShowTab(tabName);
            });
        });
    }

    /**
     * Initialize button states (disabled until signatures are generated)
     * @private
     */
    _initializeButtonStates() {
        this._setActionButtonsState(false);
    }

    /**
     * Handle "Generate Both Signatures" button click
     */
    handleGenerateBoth() {
        try {
            // Get form data
            const formData = this._getFormData();

            // Generate both signatures using injected generator
            this.signatures.newEmail = this.generator.generateNewEmailSignature(formData);
            this.signatures.reply = this.generator.generateReplySignature(formData);

            // Display previews
            this._displayPreview('new', this.signatures.newEmail);
            this._displayPreview('reply', this.signatures.reply);

            // Enable action buttons
            this._setActionButtonsState(true);

            console.log('✓ Both signatures generated successfully');

        } catch (error) {
            this._showError(error.message);
            console.error('Signature generation failed:', error);
        }
    }

    /**
     * Handle copy new email signature button click
     */
    async handleCopyNew() {
        await this._handleCopy(this.signatures.newEmail, 'successMsgNew', 'New Email');
    }

    /**
     * Handle copy reply signature button click
     */
    async handleCopyReply() {
        await this._handleCopy(this.signatures.reply, 'successMsgReply', 'Reply');
    }

    /**
     * Handle download new email signature button click
     */
    handleDownloadNew() {
        this._handleDownload(
            this.signatures.newEmail,
            this.config.download.filenames.newEmail,
            'New Email'
        );
    }

    /**
     * Handle download reply signature button click
     */
    handleDownloadReply() {
        this._handleDownload(
            this.signatures.reply,
            this.config.download.filenames.reply,
            'Reply'
        );
    }

    /**
     * Handle tab switching for installation instructions
     * @param {string} os - Operating system ('windows' or 'mac')
     */
    handleShowTab(os) {
        // Remove active class from all tabs and content
        const tabs = document.querySelectorAll('.os-tab');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => tab.classList.remove('active'));
        contents.forEach(content => content.classList.remove('active'));

        // Add active class to selected tab and content
        const selectedTab = document.querySelector(`.os-tab[data-tab="${os}"]`);
        const selectedContent = document.getElementById(`${os}-tab`);

        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        if (selectedContent) {
            selectedContent.classList.add('active');
        }
    }

    /**
     * Get form data from inputs
     * @private
     * @returns {Object} Form data
     */
    _getFormData() {
        return {
            fullName: this.elements.fullName?.value.trim() || '',
            jobTitle: this.elements.jobTitle?.value.trim() || '',
            email: this.elements.email?.value.trim() || '',
            mobile: this.elements.mobile?.value.trim() || '',
            website: this.elements.website?.value.trim() || this.config.defaults.website
        };
    }

    /**
     * Display signature preview in the UI
     * @private
     * @param {string} type - 'new' or 'reply'
     * @param {string} fullHtml - Complete HTML document
     */
    _displayPreview(type, fullHtml) {
        const previewElement = type === 'new' ? this.elements.previewNew : this.elements.previewReply;

        if (!previewElement) {
            console.warn(`Preview element for ${type} not found`);
            return;
        }

        try {
            // Extract just the table for preview display
            const tableHtml = this.generator.extractTableForPreview(fullHtml);
            previewElement.innerHTML = tableHtml;
        } catch (error) {
            console.error(`Failed to display ${type} preview:`, error);
            previewElement.innerHTML = '<p style="color: red;">Error displaying preview</p>';
        }
    }

    /**
     * Generic copy handler
     * @private
     * @param {string} html - HTML to copy
     * @param {string} messageElementKey - Success message element key
     * @param {string} signatureType - Human-readable signature type
     */
    async _handleCopy(html, messageElementKey, signatureType) {
        if (!html) {
            this._showError(`No ${signatureType} signature generated yet. Please generate signatures first.`);
            return;
        }

        try {
            // Use injected clipboard handler
            await this.clipboard.copySignature(html);

            // Show success message
            this._showSuccessMessage(messageElementKey, `${signatureType} signature copied to clipboard!`);

            // Show installation instructions
            this._showInstallInstructions();

            console.log(`✓ ${signatureType} signature copied to clipboard`);

        } catch (error) {
            this._showError(`Failed to copy ${signatureType} signature: ${error.message}`);
            console.error('Copy failed:', error);
        }
    }

    /**
     * Generic download handler
     * @private
     * @param {string} html - HTML to download
     * @param {string} filename - Filename for download
     * @param {string} signatureType - Human-readable signature type
     */
    _handleDownload(html, filename, signatureType) {
        if (!html) {
            this._showError(`No ${signatureType} signature generated yet. Please generate signatures first.`);
            return;
        }

        try {
            // Use injected download handler
            this.downloader.downloadSignature(html, filename);

            console.log(`✓ ${signatureType} signature downloaded as ${filename}`);

        } catch (error) {
            this._showError(`Failed to download ${signatureType} signature: ${error.message}`);
            console.error('Download failed:', error);
        }
    }

    /**
     * Set state of action buttons (copy/download)
     * @private
     * @param {boolean} enabled - Whether buttons should be enabled
     */
    _setActionButtonsState(enabled) {
        const buttons = [
            this.elements.copyNewBtn,
            this.elements.copyReplyBtn,
            this.elements.downloadNewBtn,
            this.elements.downloadReplyBtn
        ];

        buttons.forEach(button => {
            if (button) {
                button.disabled = !enabled;
            }
        });
    }

    /**
     * Show success message
     * @private
     * @param {string} messageElementKey - Element key in this.elements
     * @param {string} message - Message to display
     */
    _showSuccessMessage(messageElementKey, message) {
        const messageElement = this.elements[messageElementKey];

        if (!messageElement) {
            console.warn(`Success message element ${messageElementKey} not found`);
            return;
        }

        messageElement.textContent = message;
        messageElement.style.display = 'block';

        // Auto-hide after 4 seconds
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 4000);
    }

    /**
     * Show error message
     * @private
     * @param {string} message - Error message to display
     */
    _showError(message) {
        // Could add a dedicated error element in the UI
        // For now, using alert as fallback
        alert(message);
        console.error('UI Error:', message);
    }

    /**
     * Show installation instructions
     * @private
     */
    _showInstallInstructions() {
        if (!this.elements.installInstructions) {
            return;
        }

        this.elements.installInstructions.classList.add('show');

        // Smooth scroll to instructions after a short delay
        setTimeout(() => {
            this.elements.installInstructions.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            });
        }, 100);
    }
}
