/**
 * Theme Configuration Module (SOLID Compliant)
 *
 * FIXED ISSUES:
 * - Separated data from logic (Single Responsibility)
 * - Removed circular references
 * - Simplified date range checking
 * - Better error handling
 */

/**
 * Theme data configuration
 * Pure data, no logic
 */
export const THEMES = {
    standard: {
        id: 'standard',
        name: 'Standard',
        description: 'Classic Alterspective branding',
        available: true,
        dateRange: null, // Always available
        colors: {
            primary: '#17232D',
            secondary: '#2C8248',
            accent: '#ABDD65',
            divider: '#2C8248',
            text: '#17232D',
            link: '#2C8248'
        },
        logo: {
            type: 'standard',
            path: 'assets/images/alterspective-logo.png',
            symbolPath: 'assets/images/alterspective-symbol.png',
            overlay: null
        },
        decorations: {
            enabled: false,
            icons: {}
        },
        messages: {
            footer: null,
            greeting: null
        }
    },

    christmas: {
        id: 'christmas',
        name: 'Christmas',
        description: 'Holiday office closure period',
        available: true,
        dateRange: {
            start: { month: 11, day: 20 },
            end: { month: 12, day: 31 }
        },
        colors: {
            primary: '#17232D',      // Keep standard colors
            secondary: '#2C8248',    // Keep standard green
            accent: '#ABDD65',       // Keep standard accent
            divider: '#2C8248',      // Keep standard divider
            text: '#17232D',         // Keep standard text
            link: '#2C8248'          // Keep standard link
        },
        logo: {
            type: 'themed',
            path: 'assets/images/Themes/Christmass/Christmass-transparent.png',
            symbolPath: 'assets/images/Themes/Christmass/Christmass-transparent.png',
            base64Path: 'assets/images/Themes/Christmass/christmass-transparent-base64.txt',
            overlay: null,
            overlayPosition: null,
            overlaySize: null
        },
        decorations: {
            enabled: false,    // No decorations
            icons: {}         // No icons
        },
        messages: {
            footer: "We're taking a moment to slow down, recharge and reset for the year ahead. The team will be offline from Monday 23 December to Friday 3 January, returning with fresh energy and new perspective for 2025.",
            greeting: null,    // No greeting
            signoff: null     // No special signoff
        }
    },

    newYear: {
        id: 'newYear',
        name: 'New Year',
        description: 'Celebrate the new year with elegance',
        available: false,  // Disabled to avoid confusion
        dateRange: {
            start: { month: 12, day: 26 },
            end: { month: 1, day: 10 }
        },
        colors: {
            primary: '#17232D',
            secondary: '#FFD700',
            accent: '#C0C0C0',
            divider: '#FFD700',
            text: '#17232D',
            link: '#B8860B'
        },
        logo: {
            type: 'themed',
            path: 'assets/images/alterspective-logo.png',
            symbolPath: 'assets/images/alterspective-symbol.png',
            overlay: 'assets/images/Themes/NewYear/sparkle-overlay.png',
            overlayPosition: 'around',
            overlaySize: 1.2
        },
        decorations: {
            enabled: true,
            dividerStyle: 'champagne',
            confetti: {
                enabled: true,
                opacity: 0.03,
                colors: ['gold', 'silver']
            },
            yearBadge: {
                enabled: true,
                text: '2025',
                position: 'top-right',
                style: 'elegant'
            },
            icons: {}
        },
        messages: {
            footer: 'Here\'s to a prosperous 2025!',
            greeting: 'Best wishes for the New Year',
            signoff: 'Happy New Year,'
        }
    },

    easter: {
        id: 'easter',
        name: 'Easter',
        description: 'Spring celebration theme',
        available: false,
        dateRange: {
            start: { month: 3, day: 15 },
            end: { month: 4, day: 30 }
        },
        colors: {
            primary: '#17232D',
            secondary: '#E6B8EA',
            accent: '#FFE5B4',
            divider: '#B4E5FF',
            text: '#17232D',
            link: '#9370DB'
        },
        logo: {
            type: 'standard',
            path: 'assets/images/alterspective-logo.png',
            symbolPath: 'assets/images/alterspective-symbol.png',
            overlay: null
        },
        decorations: {
            enabled: false,
            icons: {}
        },
        messages: {}
    },

    halloween: {
        id: 'halloween',
        name: 'Halloween',
        description: 'Spooky season theme (subtle)',
        available: false,
        dateRange: {
            start: { month: 10, day: 15 },
            end: { month: 11, day: 1 }
        },
        colors: {
            primary: '#17232D',
            secondary: '#FF8C00',
            accent: '#8B4513',
            divider: '#FF8C00',
            text: '#17232D',
            link: '#D2691E'
        },
        logo: {
            type: 'standard',
            path: 'assets/images/alterspective-logo.png',
            symbolPath: 'assets/images/alterspective-symbol.png',
            overlay: null
        },
        decorations: {
            enabled: false,
            icons: {}
        },
        messages: {}
    }
};

/**
 * Settings configuration
 */
export const THEME_SETTINGS = {
    autoDetect: true,
    userOverride: true,
    fallbackTheme: 'standard',
    decorationLevels: {
        minimal: 0.3,
        normal: 0.6,
        festive: 1.0
    },
    defaultDecorationLevel: 'normal'
};

/**
 * Theme Service - Handles theme logic (Single Responsibility)
 * Separated from configuration data
 */
export class ThemeService {
    constructor(themes = THEMES, settings = THEME_SETTINGS) {
        this.themes = themes;
        this.settings = settings;
    }

    /**
     * Check if date is in range
     * @private
     * @param {Date} date
     * @param {Object} range - {start: {month, day}, end: {month, day}}
     * @returns {boolean}
     */
    _isDateInRange(date, range) {
        if (!range) return true;

        const month = date.getMonth() + 1; // Convert to 1-indexed
        const day = date.getDate();
        const { start, end } = range;

        // Create comparable date values (MMDD format)
        const currentDate = month * 100 + day;
        const startDate = start.month * 100 + start.day;
        const endDate = end.month * 100 + end.day;

        // Handle year boundary (e.g., Dec 26 to Jan 10)
        if (startDate > endDate) {
            return currentDate >= startDate || currentDate <= endDate;
        }

        // Normal range
        return currentDate >= startDate && currentDate <= endDate;
    }

    /**
     * Get current theme based on date
     * @param {Date} date - Optional date to check (defaults to today)
     * @returns {string} Theme ID
     */
    getCurrentTheme(date = new Date()) {
        if (!this.settings.autoDetect) {
            return this.settings.fallbackTheme;
        }

        // Find first available SEASONAL theme that matches current date
        // Check seasonal themes first (those with dateRange defined)
        for (const [themeId, theme] of Object.entries(this.themes)) {
            if (!theme.available) continue;
            if (!theme.dateRange) continue; // Skip themes without date ranges (like standard)

            if (this._isDateInRange(date, theme.dateRange)) {
                return themeId;
            }
        }

        // If no seasonal theme matches, return fallback (standard)
        return this.settings.fallbackTheme;
    }

    /**
     * Get theme by ID with fallback
     * @param {string} themeId
     * @returns {Object} Theme configuration
     */
    getTheme(themeId) {
        const theme = this.themes[themeId];

        if (!theme) {
            console.warn(`Theme '${themeId}' not found, using fallback`);
            return this.themes[this.settings.fallbackTheme];
        }

        if (!theme.available) {
            console.warn(`Theme '${themeId}' not available, using fallback`);
            return this.themes[this.settings.fallbackTheme];
        }

        return theme;
    }

    /**
     * Get all available themes
     * @returns {Array} Array of available theme objects
     */
    getAvailableThemes() {
        return Object.values(this.themes).filter(theme => theme.available);
    }

    /**
     * Check if a theme is currently in season
     * @param {string} themeId
     * @param {Date} date - Optional date to check
     * @returns {boolean}
     */
    isThemeInSeason(themeId, date = new Date()) {
        const theme = this.themes[themeId];

        if (!theme) return false;
        if (!theme.dateRange) return true; // Always in season

        return this._isDateInRange(date, theme.dateRange);
    }

    /**
     * Validate theme configuration
     * @param {Object} theme
     * @returns {boolean}
     */
    validateTheme(theme) {
        const required = ['id', 'name', 'colors', 'logo', 'decorations', 'messages'];

        for (const field of required) {
            if (!theme[field]) {
                console.error(`Theme missing required field: ${field}`);
                return false;
            }
        }

        return true;
    }

    /**
     * Get decoration intensity for a level
     * @param {string} level - 'minimal', 'normal', or 'festive'
     * @returns {number} Intensity value 0-1
     */
    getDecorationIntensity(level) {
        return this.settings.decorationLevels[level] || this.settings.decorationLevels.normal;
    }
}

// Export singleton instance for convenience
export const themeService = new ThemeService();

// Export convenience functions that delegate to service
export const getCurrentTheme = (date) => themeService.getCurrentTheme(date);
export const getTheme = (themeId) => themeService.getTheme(themeId);
export const getAvailableThemes = () => themeService.getAvailableThemes();
export const isThemeInSeason = (themeId, date) => themeService.isThemeInSeason(themeId, date);