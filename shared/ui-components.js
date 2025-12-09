// Shared UI Components for L&M's Playhall
// Version: 1.0.0
// Common UI elements that can be reused across games

/**
 * Create a standard button with consistent styling
 * @param {string} label - Button text
 * @param {Object} position - {x, y} position
 * @param {Object} options - Optional configuration
 * @param {Function} onClick - Click handler
 * @returns {GameObj} Kaboom game object
 */
function createButton(label, position, options = {}, onClick) {
    const defaults = {
        size: 32,
        color: [100, 255, 100],
        hoverColor: [150, 255, 150],
        tag: 'button',
    };

    const config = { ...defaults, ...options };

    const btn = add([
        text(label, { size: config.size }),
        pos(position.x, position.y),
        anchor("center"),
        color(...config.color),
        area(),
        config.tag,
    ]);

    // Hover effect
    btn.onHoverUpdate(() => {
        btn.color = rgb(...config.hoverColor);
    });

    btn.onHoverEnd(() => {
        btn.color = rgb(...config.color);
    });

    // Click handler
    if (onClick) {
        btn.onClick(onClick);
    }

    return btn;
}

/**
 * Create a score display
 * @param {Object} position - {x, y} position
 * @param {number} initialScore - Starting score
 * @param {Object} options - Optional configuration
 * @returns {Object} Score object with text and update method
 */
function createScoreDisplay(position, initialScore = 0, options = {}) {
    const defaults = {
        size: 24,
        color: [255, 255, 255],
        prefix: 'Score: ',
    };

    const config = { ...defaults, ...options };

    const scoreObj = {
        value: initialScore,
        text: null,
    };

    scoreObj.text = add([
        text(`${config.prefix}${scoreObj.value}`, { size: config.size }),
        pos(position.x, position.y),
        color(...config.color),
    ]);

    // Update method
    scoreObj.update = (newScore) => {
        scoreObj.value = newScore;
        scoreObj.text.text = `${config.prefix}${scoreObj.value}`;
    };

    return scoreObj;
}

/**
 * Create a progress bar
 * @param {Object} position - {x, y} position
 * @param {Object} size - {width, height} dimensions
 * @param {number} current - Current progress
 * @param {number} max - Maximum progress
 * @param {Object} options - Optional configuration
 * @returns {Object} Progress bar object with update method
 */
function createProgressBar(position, size, current, max, options = {}) {
    const defaults = {
        bgColor: [100, 100, 100],
        fillColor: [100, 255, 100],
        borderColor: [255, 255, 255],
    };

    const config = { ...defaults, ...options };

    const progressObj = {
        current,
        max,
        background: null,
        fill: null,
    };

    // Background
    progressObj.background = add([
        rect(size.width, size.height),
        pos(position.x, position.y),
        color(...config.bgColor),
        outline(2, rgb(...config.borderColor)),
    ]);

    // Fill
    const fillWidth = (current / max) * size.width;
    progressObj.fill = add([
        rect(fillWidth, size.height),
        pos(position.x, position.y),
        color(...config.fillColor),
    ]);

    // Update method
    progressObj.update = (newCurrent) => {
        progressObj.current = Math.min(newCurrent, progressObj.max);
        const newWidth = (progressObj.current / progressObj.max) * size.width;
        progressObj.fill.width = newWidth;
    };

    return progressObj;
}

/**
 * Create a pause menu overlay
 * @param {Function} onResume - Resume callback
 * @param {Function} onQuit - Quit callback
 * @param {Object} options - Optional configuration
 * @returns {Array} Array of menu game objects
 */
function createPauseMenu(onResume, onQuit, options = {}) {
    const defaults = {
        overlayOpacity: 0.7,
        title: 'PAUSED',
    };

    const config = { ...defaults, ...options };

    const menuObjects = [];

    // Overlay
    const overlay = add([
        rect(width(), height()),
        pos(0, 0),
        color(0, 0, 0),
        opacity(config.overlayOpacity),
        layer("ui"),
        "pause-overlay",
    ]);
    menuObjects.push(overlay);

    // Title
    const title = add([
        text(config.title, { size: 48 }),
        pos(width() / 2, height() / 2 - 100),
        anchor("center"),
        color(255, 255, 255),
        layer("ui"),
    ]);
    menuObjects.push(title);

    // Resume button
    const resumeBtn = add([
        text("RESUME", { size: 32 }),
        pos(width() / 2, height() / 2),
        anchor("center"),
        color(100, 255, 100),
        area(),
        layer("ui"),
        "resume-button",
    ]);
    menuObjects.push(resumeBtn);

    resumeBtn.onClick(() => {
        menuObjects.forEach(obj => destroy(obj));
        if (onResume) onResume();
    });

    // Quit button
    const quitBtn = add([
        text("MAIN MENU", { size: 32 }),
        pos(width() / 2, height() / 2 + 80),
        anchor("center"),
        color(255, 100, 100),
        area(),
        layer("ui"),
        "quit-button",
    ]);
    menuObjects.push(quitBtn);

    quitBtn.onClick(() => {
        menuObjects.forEach(obj => destroy(obj));
        if (onQuit) onQuit();
    });

    return menuObjects;
}

/**
 * Create a settings toggle button (for selecting options)
 * @param {string} label - Toggle label
 * @param {Object} position - {x, y} position
 * @param {boolean} initialState - Initial on/off state
 * @param {Function} onChange - Change callback
 * @param {Object} options - Optional configuration
 * @returns {Object} Toggle object with state and update method
 */
function createToggle(label, position, initialState, onChange, options = {}) {
    const defaults = {
        size: 24,
        onColor: [100, 255, 100],
        offColor: [150, 150, 150],
    };

    const config = { ...defaults, ...options };

    const toggleObj = {
        state: initialState,
        label: null,
        box: null,
    };

    // Label
    toggleObj.label = add([
        text(label, { size: config.size }),
        pos(position.x, position.y),
        anchor("left"),
        color(255, 255, 255),
    ]);

    // Toggle box
    const boxSize = config.size;
    const boxColor = toggleObj.state ? config.onColor : config.offColor;

    toggleObj.box = add([
        rect(boxSize, boxSize),
        pos(position.x - boxSize - 10, position.y),
        anchor("left"),
        color(...boxColor),
        outline(2, rgb(255, 255, 255)),
        area(),
        "toggle-box",
    ]);

    // Click handler
    toggleObj.box.onClick(() => {
        toggleObj.state = !toggleObj.state;
        toggleObj.box.color = rgb(...(toggleObj.state ? config.onColor : config.offColor));
        if (onChange) onChange(toggleObj.state);
    });

    return toggleObj;
}

/**
 * Show a temporary message (toast notification)
 * @param {string} message - Message to display
 * @param {number} duration - Duration in seconds
 * @param {Object} options - Optional configuration
 */
function showToast(message, duration = 2, options = {}) {
    const defaults = {
        position: { x: width() / 2, y: 100 },
        size: 24,
        bgColor: [0, 0, 0],
        textColor: [255, 255, 255],
        opacity: 0.8,
    };

    const config = { ...defaults, ...options };

    // Background
    const bg = add([
        rect(message.length * 15, 50),
        pos(config.position.x, config.position.y),
        anchor("center"),
        color(...config.bgColor),
        opacity(config.opacity),
        layer("ui"),
    ]);

    // Text
    const txt = add([
        text(message, { size: config.size }),
        pos(config.position.x, config.position.y),
        anchor("center"),
        color(...config.textColor),
        layer("ui"),
    ]);

    // Auto-destroy after duration
    wait(duration, () => {
        destroy(bg);
        destroy(txt);
    });
}

// Export for use in games (if using modules in the future)
// For now, these functions are globally available when script is included
