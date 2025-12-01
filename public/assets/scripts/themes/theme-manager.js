/**
 * Theme Manager Module (SOLID Compliant)
 *
 * FIXED ISSUES:
 * - Properly injected dependencies (Dependency Inversion)
 * - Added cleanup methods to prevent memory leaks
 * - Added null checks for DOM operations
 * - Separated UI rendering concerns
 * - Added error handling
 */

import { ThemeService, THEME_SETTINGS } from './theme-config.js';

export class ThemeManager {
    /**
     * @param {ThemeService} themeService - Injected theme service
     * @param {Object} options - Configuration options
     */
    constructor(themeService, options = {}) {
        // Dependency Injection - no default instantiation
        if (!themeService) {
            throw new Error('ThemeManager requires a ThemeService instance');
        }

        this.themeService = themeService;
        this.currentThemeId = null;
        this.decorationLevel = options.decorationLevel || THEME_SETTINGS.defaultDecorationLevel;
        this.autoDetect = options.autoDetect !== undefined ? options.autoDetect : THEME_SETTINGS.autoDetect;
        this.onThemeChange = options.onThemeChange || null;

        // Storage key for user preferences
        this.storageKey = options.storageKey || 'altsig-theme-preferences';

        // Track event listeners for cleanup
        this._eventListeners = [];

        // Load saved preferences
        this.loadPreferences();

        // Initialize theme
        if (this.autoDetect) {
            this.detectAndSetTheme();
        } else {
            this.setTheme(this.currentThemeId || THEME_SETTINGS.fallbackTheme);
        }
    }

    /**
     * Detect current theme based on date and set it
     */
    detectAndSetTheme() {
        const detectedThemeId = this.themeService.getCurrentTheme();
        this.setTheme(detectedThemeId);
    }

    /**
     * Set the active theme
     * @param {string} themeId - Theme identifier
     * @param {boolean} savePreference - Whether to save this as user preference
     */
    setTheme(themeId, savePreference = false) {
        // Validate theme exists and is available
        const theme = this.themeService.getTheme(themeId);

        if (!theme) {
            console.error(`Failed to set theme '${themeId}', using fallback`);
            themeId = THEME_SETTINGS.fallbackTheme;
        }

        this.currentThemeId = themeId;
        this.currentTheme = this.themeService.getTheme(themeId);

        if (savePreference) {
            this.savePreferences();
        }

        // Trigger callback if provided
        if (this.onThemeChange && typeof this.onThemeChange === 'function') {
            try {
                this.onThemeChange(this.currentTheme);
            } catch (error) {
                console.error('Error in onThemeChange callback:', error);
            }
        }

        return this.currentTheme;
    }

    /**
     * Get the current active theme
     * @returns {Object} Current theme configuration
     */
    getCurrentTheme() {
        return this.currentTheme;
    }

    /**
     * Get the current theme ID
     * @returns {string} Current theme ID
     */
    getCurrentThemeId() {
        return this.currentThemeId;
    }

    /**
     * Set decoration level
     * @param {string} level - 'minimal', 'normal', or 'festive'
     */
    setDecorationLevel(level) {
        const validLevels = Object.keys(THEME_SETTINGS.decorationLevels);

        if (!validLevels.includes(level)) {
            console.warn(`Invalid decoration level: ${level}. Valid levels: ${validLevels.join(', ')}`);
            return;
        }

        this.decorationLevel = level;
        this.savePreferences();

        // Trigger theme update to apply new decoration level
        if (this.onThemeChange && typeof this.onThemeChange === 'function') {
            try {
                this.onThemeChange(this.currentTheme);
            } catch (error) {
                console.error('Error in onThemeChange callback:', error);
            }
        }
    }

    /**
     * Get current decoration intensity (0-1)
     * @returns {number} Decoration intensity value
     */
    getDecorationIntensity() {
        return this.themeService.getDecorationIntensity(this.decorationLevel);
    }

    /**
     * Toggle auto-detect mode
     * @param {boolean} enabled
     */
    setAutoDetect(enabled) {
        this.autoDetect = Boolean(enabled);

        if (enabled) {
            this.detectAndSetTheme();
        }

        this.savePreferences();
    }

    /**
     * Get list of available themes for UI
     * @returns {Array} Array of theme objects with UI metadata
     */
    getThemeList() {
        const themes = this.themeService.getAvailableThemes();

        return themes.map(theme => ({
            id: theme.id,
            name: theme.name,
            description: theme.description,
            inSeason: this.themeService.isThemeInSeason(theme.id),
            active: theme.id === this.currentThemeId,
            colors: theme.colors
        }));
    }

    /**
     * Create theme selector UI element
     * @param {Object} config - UI configuration
     * @returns {HTMLElement|null} Theme selector element or null if creation fails
     */
    createThemeSelector(config = {}) {
        try {
            const container = document.createElement('div');
            container.className = 'theme-selector';

            container.innerHTML = `
                <div class="theme-selector-header">
                    <h3>${config.title || 'Theme Selection'}</h3>
                    <label class="auto-detect-toggle">
                        <input type="checkbox" id="theme-auto-detect" ${this.autoDetect ? 'checked' : ''}>
                        <span>Auto-detect by season</span>
                    </label>
                </div>
                <div class="theme-options" id="theme-options">
                    ${this._renderThemeOptions()}
                </div>
                <div class="decoration-level">
                    <label>Decoration Level:</label>
                    <div class="decoration-buttons">
                        <button type="button" data-level="minimal" class="${this.decorationLevel === 'minimal' ? 'active' : ''}">Subtle</button>
                        <button type="button" data-level="normal" class="${this.decorationLevel === 'normal' ? 'active' : ''}">Normal</button>
                        <button type="button" data-level="festive" class="${this.decorationLevel === 'festive' ? 'active' : ''}">Festive</button>
                    </div>
                </div>
            `;

            // Attach event listeners
            this._attachSelectorEvents(container);

            return container;
        } catch (error) {
            console.error('Failed to create theme selector:', error);
            return null;
        }
    }

    /**
     * Render theme option buttons
     * @private
     */
    _renderThemeOptions() {
        const themes = this.getThemeList();

        return themes.map(theme => {
            const seasonBadge = theme.inSeason && theme.id !== 'standard' ?
                '<span class="season-badge">In Season</span>' : '';

            const previewGradient = `background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%);`;

            return `
                <button type="button"
                        class="theme-option ${theme.active ? 'active' : ''}"
                        data-theme-id="${theme.id}"
                        ${this.autoDetect && !theme.active ? 'disabled' : ''}
                        aria-label="Select ${theme.name} theme">
                    <div class="theme-preview" style="${previewGradient}"></div>
                    <span class="theme-name">${theme.name}</span>
                    ${seasonBadge}
                </button>
            `;
        }).join('');
    }

    /**
     * Attach event listeners to theme selector
     * @private
     */
    _attachSelectorEvents(container) {
        // Auto-detect toggle
        const autoDetectToggle = container.querySelector('#theme-auto-detect');
        if (autoDetectToggle) {
            const autoDetectHandler = (e) => {
                this.setAutoDetect(e.target.checked);

                // Update theme options state
                const options = container.querySelectorAll('.theme-option');
                options.forEach(option => {
                    if (e.target.checked && !option.classList.contains('active')) {
                        option.disabled = true;
                    } else {
                        option.disabled = false;
                    }
                });
            };

            autoDetectToggle.addEventListener('change', autoDetectHandler);
            this._eventListeners.push({ element: autoDetectToggle, type: 'change', handler: autoDetectHandler });
        }

        // Theme selection buttons
        const themeOptions = container.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            const themeClickHandler = (e) => {
                if (this.autoDetect) return; // Ignore if auto-detect is on

                const themeId = e.currentTarget.dataset.themeId;
                if (!themeId) return;

                this.setTheme(themeId, true);

                // Update active state
                themeOptions.forEach(opt => opt.classList.remove('active'));
                e.currentTarget.classList.add('active');
            };

            option.addEventListener('click', themeClickHandler);
            this._eventListeners.push({ element: option, type: 'click', handler: themeClickHandler });
        });

        // Decoration level buttons
        const decorationButtons = container.querySelectorAll('.decoration-buttons button');
        decorationButtons.forEach(button => {
            const decorationHandler = (e) => {
                const level = e.currentTarget.dataset.level;
                if (!level) return;

                this.setDecorationLevel(level);

                // Update active state
                decorationButtons.forEach(btn => btn.classList.remove('active'));
                e.currentTarget.classList.add('active');
            };

            button.addEventListener('click', decorationHandler);
            this._eventListeners.push({ element: button, type: 'click', handler: decorationHandler });
        });
    }

    /**
     * Apply theme colors to UI elements
     * @param {HTMLElement} targetElement - Element to apply theme to
     */
    applyThemeToElement(targetElement) {
        if (!targetElement || !this.currentTheme) {
            console.warn('Cannot apply theme: invalid element or theme');
            return;
        }

        try {
            const theme = this.currentTheme;
            const intensity = this.getDecorationIntensity();

            // Apply CSS variables for theme colors
            targetElement.style.setProperty('--theme-primary', theme.colors.primary);
            targetElement.style.setProperty('--theme-secondary', theme.colors.secondary);
            targetElement.style.setProperty('--theme-accent', theme.colors.accent);
            targetElement.style.setProperty('--theme-divider', theme.colors.divider);
            targetElement.style.setProperty('--theme-text', theme.colors.text);
            targetElement.style.setProperty('--theme-link', theme.colors.link);
            targetElement.style.setProperty('--theme-decoration-intensity', intensity);

            // Add theme class for specific styling
            const themeClasses = Array.from(targetElement.classList).filter(cls => cls.startsWith('theme-'));
            themeClasses.forEach(cls => targetElement.classList.remove(cls));

            targetElement.classList.add(`theme-${this.currentThemeId}`);
            targetElement.classList.add(`decoration-${this.decorationLevel}`);
        } catch (error) {
            console.error('Failed to apply theme to element:', error);
        }
    }

    /**
     * Load user preferences from localStorage
     * @private
     */
    loadPreferences() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const preferences = JSON.parse(saved);
                this.currentThemeId = preferences.themeId || null;
                this.decorationLevel = preferences.decorationLevel || THEME_SETTINGS.defaultDecorationLevel;
                this.autoDetect = preferences.autoDetect !== undefined ?
                    preferences.autoDetect : THEME_SETTINGS.autoDetect;
            }
        } catch (error) {
            console.warn('Failed to load theme preferences:', error);
            // Continue with defaults
        }
    }

    /**
     * Save user preferences to localStorage
     * @private
     */
    savePreferences() {
        try {
            const preferences = {
                themeId: this.currentThemeId,
                decorationLevel: this.decorationLevel,
                autoDetect: this.autoDetect
            };
            localStorage.setItem(this.storageKey, JSON.stringify(preferences));
        } catch (error) {
            console.warn('Failed to save theme preferences:', error);
        }
    }

    /**
     * Reset to default preferences
     */
    resetPreferences() {
        try {
            localStorage.removeItem(this.storageKey);
            this.autoDetect = THEME_SETTINGS.autoDetect;
            this.decorationLevel = THEME_SETTINGS.defaultDecorationLevel;
            this.detectAndSetTheme();
        } catch (error) {
            console.error('Failed to reset preferences:', error);
        }
    }

    /**
     * Clean up event listeners and resources
     * Call this when disposing of the ThemeManager instance
     */
    destroy() {
        // Remove all event listeners
        this._eventListeners.forEach(({ element, type, handler }) => {
            try {
                element.removeEventListener(type, handler);
            } catch (error) {
                console.warn('Failed to remove event listener:', error);
            }
        });

        this._eventListeners = [];

        // Clear callback
        this.onThemeChange = null;

        console.log('ThemeManager destroyed');
    }
}