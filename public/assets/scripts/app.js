/**
 * Application Entry Point
 *
 * This is the main orchestrator that wires up all dependencies using
 * Dependency Injection pattern.
 *
 * SOLID Principles Applied:
 * - Single Responsibility: Only wires dependencies and initializes app
 * - Open/Closed: Can extend with new modules without modifying existing code
 * - Liskov Substitution: All dependencies are interchangeable via interfaces
 * - Interface Segregation: Each module has focused, minimal interface
 * - Dependency Inversion: Depends on abstractions (injected dependencies)
 *
 * This architecture allows:
 * - Easy unit testing (inject mocks)
 * - Swappable implementations (e.g., different clipboard/download strategies)
 * - Clear separation of concerns
 * - Maintainable, scalable codebase
 */

import { CONFIG } from './config.js';
import { SignatureGenerator } from './signature-generator.js';
import { ClipboardHandler } from './clipboard-handler.js';
import { DownloadHandler } from './download-handler.js';
import { UIController } from './ui-controller.js';

/**
 * Application Class
 * Manages application lifecycle and dependency wiring
 */
class App {
    constructor() {
        this.initialized = false;
    }

    /**
     * Initialize the application
     * Creates all dependencies and wires them together
     */
    init() {
        if (this.initialized) {
            console.warn('App already initialized');
            return;
        }

        console.log('🚀 Initializing AltSig Email Signature Generator v2.0...');

        try {
            // Create all dependencies with dependency injection
            // Each module gets only what it needs (Interface Segregation Principle)

            // 1. Create SignatureGenerator with config
            const signatureGenerator = new SignatureGenerator(CONFIG);
            console.log('✓ SignatureGenerator created');

            // 2. Create ClipboardHandler with config
            const clipboardHandler = new ClipboardHandler(CONFIG);
            console.log('✓ ClipboardHandler created');

            // 3. Create DownloadHandler with config
            const downloadHandler = new DownloadHandler(CONFIG);
            console.log('✓ DownloadHandler created');

            // 4. Create UIController with all dependencies injected
            //    (Dependency Inversion Principle - UIController depends on abstractions)
            const uiController = new UIController({
                signatureGenerator,
                clipboardHandler,
                downloadHandler,
                config: CONFIG
            });
            console.log('✓ UIController created with injected dependencies');

            // 5. Initialize the UI Controller
            //    This sets up event listeners and caches DOM elements
            uiController.init();

            // Store controller for potential external access
            this.uiController = uiController;

            this.initialized = true;
            console.log('✅ AltSig application initialized successfully!');
            console.log('📝 Ready to generate email signatures');

        } catch (error) {
            console.error('❌ Application initialization failed:', error);
            throw error;
        }
    }

    /**
     * Get the UI Controller instance
     * Useful for testing or external integrations
     * @returns {UIController}
     */
    getUIController() {
        if (!this.initialized) {
            throw new Error('App not initialized. Call app.init() first.');
        }
        return this.uiController;
    }
}

/**
 * Create and initialize the application when DOM is ready
 */
function initializeApp() {
    const app = new App();
    app.init();

    // Expose app instance globally for debugging (optional)
    if (typeof window !== 'undefined') {
        window.AltSigApp = app;
    }

    return app;
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM already loaded
    initializeApp();
}

// Export for testing
export { App, initializeApp };
