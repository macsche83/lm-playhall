// Game Wrapper Utilities for L&M's Playhall
// Version: 1.0.0
// Common game initialization and utility functions

/**
 * Initialize Kaboom with standard settings
 * @param {Object} options - Override default Kaboom settings
 * @returns {Object} Kaboom context
 */
function initGame(options = {}) {
    const defaults = {
        width: 800,
        height: 600,
        background: [135, 206, 235], // Sky blue
        root: document.getElementById("game-container"),
        scale: 1,
    };

    const config = { ...defaults, ...options };

    return kaboom(config);
}

/**
 * Get settings from localStorage
 * @param {string} gameId - Unique game identifier
 * @param {string} key - Setting key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Setting value
 */
function getSetting(gameId, key, defaultValue) {
    const storageKey = `${gameId}-${key}`;
    const value = localStorage.getItem(storageKey);

    if (value === null) {
        return defaultValue;
    }

    // Try to parse JSON, fallback to string
    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
}

/**
 * Save setting to localStorage
 * @param {string} gameId - Unique game identifier
 * @param {string} key - Setting key
 * @param {*} value - Value to save
 */
function saveSetting(gameId, key, value) {
    const storageKey = `${gameId}-${key}`;
    const stringValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(storageKey, stringValue);
}

/**
 * Clear all settings for a game
 * @param {string} gameId - Unique game identifier
 */
function clearSettings(gameId) {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
        if (key.startsWith(`${gameId}-`)) {
            localStorage.removeItem(key);
        }
    });
}

/**
 * Detect if running on mobile device
 * @returns {boolean} True if mobile
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Get responsive dimensions based on screen size
 * @returns {Object} {width, height, scale}
 */
function getResponsiveDimensions() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Base dimensions
    const baseWidth = 800;
    const baseHeight = 600;

    // Calculate scale to fit screen
    const scaleX = screenWidth / baseWidth;
    const scaleY = screenHeight / baseHeight;
    const scale = Math.min(scaleX, scaleY, 1); // Don't scale up, only down

    return {
        width: baseWidth,
        height: baseHeight,
        scale: scale,
    };
}

/**
 * Create a back to launcher button
 * @param {Object} position - {x, y} position
 * @returns {GameObj} Button object
 */
function createBackButton(position = { x: 20, y: 20 }) {
    const btn = add([
        text("← Launcher", { size: 20 }),
        pos(position.x, position.y),
        color(200, 200, 200),
        area(),
        "back-button",
    ]);

    btn.onClick(() => {
        // Navigate back to launcher
        window.location.href = '../../index.html';
    });

    return btn;
}

/**
 * Random utility functions
 */
const GameUtils = {
    /**
     * Get random element from array
     * @param {Array} array - Array to choose from
     * @returns {*} Random element
     */
    choose: (array) => {
        return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * Get random number between min and max
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random number
     */
    random: (min, max) => {
        return Math.random() * (max - min) + min;
    },

    /**
     * Get random integer between min and max
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Random integer
     */
    randomInt: (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Shuffle array
     * @param {Array} array - Array to shuffle
     * @returns {Array} Shuffled array
     */
    shuffle: (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    },

    /**
     * Clamp value between min and max
     * @param {number} value - Value to clamp
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number} Clamped value
     */
    clamp: (value, min, max) => {
        return Math.min(Math.max(value, min), max);
    },

    /**
     * Linear interpolation
     * @param {number} a - Start value
     * @param {number} b - End value
     * @param {number} t - Time (0-1)
     * @returns {number} Interpolated value
     */
    lerp: (a, b, t) => {
        return a + (b - a) * t;
    },
};

/**
 * Common color palette
 */
const Colors = {
    // Primary colors
    RED: [255, 100, 100],
    GREEN: [100, 255, 100],
    BLUE: [100, 100, 255],
    YELLOW: [255, 255, 100],
    PINK: [255, 100, 255],
    CYAN: [100, 255, 255],

    // UI colors
    WHITE: [255, 255, 255],
    BLACK: [0, 0, 0],
    GRAY: [150, 150, 150],
    LIGHT_GRAY: [200, 200, 200],
    DARK_GRAY: [50, 50, 50],

    // Status colors
    SUCCESS: [100, 255, 100],
    ERROR: [255, 100, 100],
    WARNING: [255, 200, 100],
    INFO: [100, 200, 255],

    // Background colors
    SKY_BLUE: [135, 206, 235],
    GRASS_GREEN: [100, 200, 100],
    OCEAN_BLUE: [50, 100, 200],
};

/**
 * Performance monitoring
 */
const Performance = {
    /**
     * Log FPS to console
     */
    logFPS: () => {
        onUpdate(() => {
            if (Math.floor(time()) % 5 === 0) {
                console.log(`FPS: ${Math.floor(debug.fps())}`);
            }
        });
    },

    /**
     * Get object count
     * @returns {number} Number of game objects
     */
    getObjectCount: () => {
        return get('*').length;
    },

    /**
     * Show FPS counter on screen
     * @param {Object} position - {x, y} position
     */
    showFPS: (position = { x: width() - 100, y: 20 }) => {
        const fpsText = add([
            text("FPS: 60", { size: 16 }),
            pos(position.x, position.y),
            color(255, 255, 255),
            layer("ui"),
        ]);

        onUpdate(() => {
            fpsText.text = `FPS: ${Math.floor(debug.fps())}`;
        });
    },
};

/**
 * Audio utilities (placeholder for future sound integration)
 */
const Audio = {
    /**
     * Play sound effect (placeholder)
     * @param {string} soundName - Name of sound
     */
    playSFX: (soundName) => {
        // Future: play(soundName);
        console.log(`[Audio] Playing: ${soundName}`);
    },

    /**
     * Play background music (placeholder)
     * @param {string} musicName - Name of music track
     */
    playMusic: (musicName) => {
        // Future: music = play(musicName, { loop: true });
        console.log(`[Audio] Playing music: ${musicName}`);
    },

    /**
     * Stop all audio (placeholder)
     */
    stopAll: () => {
        // Future: stopAllSounds();
        console.log(`[Audio] Stopping all audio`);
    },
};

// Export for future module use
// For now, these are globally available when script is included
