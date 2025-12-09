// Initialize Kaboom
kaboom({
    width: 800,
    height: 600,
    background: [135, 206, 235], // Sky blue
    root: document.getElementById("game-container"),
    gravity: 800, // Add gravity so letters fall
});

// Game state
let score = 0;
let currentLetter = 'A';
let gameStarted = false;
let hitsOnCurrentLetter = 0;
let hitsNeeded = 10;
let currentLetterIndex = 0;
let isResuming = false; // Track if we're resuming from pause

// All letters we'll practice (default to all, can be changed in settings)
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let selectedLetters = [...alphabet]; // Default to all letters

// Load a simple font - using default font instead of external URL
// loadFont("arcade", "https://examples.kaboomjs.com/fonts/apl386.ttf");

// Function to get a random letter (from selected letters or all wrong letters)
function getRandomLetter() {
    return selectedLetters[Math.floor(Math.random() * selectedLetters.length)];
}

// Function to get the next letter in the sequence
function getNextLetter() {
    currentLetterIndex = (currentLetterIndex + 1) % selectedLetters.length;
    return selectedLetters[currentLetterIndex];
}

// Function to get a random color
function getRandomColor() {
    const colors = [
        rgb(255, 100, 100), // red
        rgb(100, 255, 100), // green
        rgb(100, 100, 255), // blue
        rgb(255, 255, 100), // yellow
        rgb(255, 100, 255), // pink
        rgb(100, 255, 255), // cyan
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Start screen
scene("start", () => {
    add([
        text("ABC Learning Game!", { size: 48 }),
        pos(width() / 2, height() / 2 - 100),
        anchor("center"),
        color(255, 255, 255),
    ]);

    add([
        text("Click letters to catch them!", { size: 24 }),
        pos(width() / 2, height() / 2),
        anchor("center"),
        color(255, 255, 255),
    ]);

    const playBtn = add([
        text("PLAY", { size: 32 }),
        pos(width() / 2, height() / 2 + 80),
        anchor("center"),
        color(100, 255, 100),
        area(),
        "play-button",
    ]);

    const settingsBtn = add([
        text("SETTINGS", { size: 32 }),
        pos(width() / 2, height() / 2 + 140),
        anchor("center"),
        color(255, 200, 100),
        area(),
        "settings-button",
    ]);

    playBtn.onClick(() => {
        go("game");
    });

    settingsBtn.onClick(() => {
        go("settings");
    });
});

// Settings scene - letter selection
scene("settings", () => {
    add([
        text("Select Letters to Practice", { size: 36 }),
        pos(width() / 2, 40),
        anchor("center"),
        color(255, 255, 255),
    ]);

    add([
        text("Click letters to select/deselect", { size: 18 }),
        pos(width() / 2, 80),
        anchor("center"),
        color(200, 200, 200),
    ]);

    // Track which letters are selected (use a temporary copy)
    let tempSelectedLetters = [...selectedLetters];

    // Create letter buttons in a grid (6 rows, 5 columns fits nicely)
    const lettersPerRow = 7;
    const letterSize = 50;
    const letterSpacing = 60;
    const startX = (width() - (lettersPerRow * letterSpacing)) / 2 + letterSpacing / 2;
    const startY = 130;

    const letterButtons = [];

    alphabet.forEach((letter, index) => {
        const row = Math.floor(index / lettersPerRow);
        const col = index % lettersPerRow;
        const x = startX + col * letterSpacing;
        const y = startY + row * letterSpacing;

        const isSelected = tempSelectedLetters.includes(letter);

        const btn = add([
            text(letter, { size: 32 }),
            pos(x, y),
            anchor("center"),
            color(isSelected ? rgb(100, 255, 100) : rgb(150, 150, 150)),
            area(),
            "letter-btn",
            {
                letter: letter,
                selected: isSelected
            }
        ]);

        btn.onClick(() => {
            // Toggle selection
            btn.selected = !btn.selected;
            btn.color = btn.selected ? rgb(100, 255, 100) : rgb(150, 150, 150);

            // Update temp selected letters
            if (btn.selected) {
                if (!tempSelectedLetters.includes(letter)) {
                    tempSelectedLetters.push(letter);
                }
            } else {
                tempSelectedLetters = tempSelectedLetters.filter(l => l !== letter);
            }
        });

        letterButtons.push(btn);
    });

    // Select All button
    const selectAllBtn = add([
        text("Select All", { size: 24 }),
        pos(width() / 2 - 150, height() - 80),
        anchor("center"),
        color(100, 200, 255),
        area(),
        "select-all-btn",
    ]);

    selectAllBtn.onClick(() => {
        tempSelectedLetters = [...alphabet];
        letterButtons.forEach(btn => {
            btn.selected = true;
            btn.color = rgb(100, 255, 100);
        });
    });

    // Clear All button
    const clearAllBtn = add([
        text("Clear All", { size: 24 }),
        pos(width() / 2, height() - 80),
        anchor("center"),
        color(255, 150, 100),
        area(),
        "clear-all-btn",
    ]);

    clearAllBtn.onClick(() => {
        tempSelectedLetters = [];
        letterButtons.forEach(btn => {
            btn.selected = false;
            btn.color = rgb(150, 150, 150);
        });
    });

    // Start Game button
    const startBtn = add([
        text("START GAME", { size: 32 }),
        pos(width() / 2 + 150, height() - 80),
        anchor("center"),
        color(100, 255, 100),
        area(),
        "start-game-btn",
    ]);

    startBtn.onClick(() => {
        if (tempSelectedLetters.length === 0) {
            // Don't allow starting with no letters
            shake(10);
            return;
        }
        // Save the selected letters
        selectedLetters = [...tempSelectedLetters];
        currentLetterIndex = 0;
        go("game");
    });

    // Back button
    const backBtn = add([
        text("< BACK", { size: 20 }),
        pos(50, 30),
        anchor("left"),
        color(200, 200, 200),
        area(),
        "back-btn",
    ]);

    backBtn.onClick(() => {
        go("start");
    });
});

// Pause Menu scene
scene("pausemenu", () => {
    // Semi-transparent overlay
    add([
        rect(width(), height()),
        pos(0, 0),
        color(0, 0, 0),
        opacity(0.7),
    ]);

    // Pause menu title
    add([
        text("GAME PAUSED", { size: 48 }),
        pos(width() / 2, height() / 2 - 120),
        anchor("center"),
        color(255, 255, 255),
    ]);

    // Resume button
    const resumeBtn = add([
        text("RESUME", { size: 36 }),
        pos(width() / 2, height() / 2 - 30),
        anchor("center"),
        color(100, 255, 100),
        area(),
        "resume-btn",
    ]);

    resumeBtn.onClick(() => {
        isResuming = true;
        go("game");
    });

    // Settings button
    const settingsBtn = add([
        text("SETTINGS", { size: 36 }),
        pos(width() / 2, height() / 2 + 40),
        anchor("center"),
        color(100, 200, 255),
        area(),
        "settings-btn",
    ]);

    settingsBtn.onClick(() => {
        go("settings");
    });

    // Main Menu button
    const mainMenuBtn = add([
        text("MAIN MENU", { size: 36 }),
        pos(width() / 2, height() / 2 + 110),
        anchor("center"),
        color(255, 150, 100),
        area(),
        "mainmenu-btn",
    ]);

    mainMenuBtn.onClick(() => {
        // Reset game state
        score = 0;
        currentLetterIndex = 0;
        hitsOnCurrentLetter = 0;
        go("start");
    });
});

// Main game scene
scene("game", () => {
    // Initialize with first letter in selected letters
    currentLetter = selectedLetters[currentLetterIndex];

    // Only reset hits if not resuming from pause
    if (!isResuming) {
        hitsOnCurrentLetter = 0;
    }
    isResuming = false; // Reset the flag

    // Display the target letter at the top
    const targetDisplay = add([
        text("Find: " + currentLetter, { size: 64 }),
        pos(width() / 2, 80),
        anchor("center"),
        color(255, 255, 255),
        "target-display",
    ]);

    // Progress display (hits on current letter)
    const progressDisplay = add([
        text(hitsOnCurrentLetter + "/" + hitsNeeded, { size: 28 }),
        pos(width() / 2, 140),
        anchor("center"),
        color(255, 255, 200),
        "progress-display",
    ]);

    // Score display
    const scoreDisplay = add([
        text("Score: " + score, { size: 32 }),
        pos(20, 20),
        color(255, 255, 255),
        "score-display",
    ]);

    // Menu button (top right)
    const menuBtn = add([
        text("MENU", { size: 24 }),
        pos(width() - 20, 20),
        anchor("right"),
        color(255, 200, 100),
        area(),
        "menu-btn",
    ]);

    menuBtn.onClick(() => {
        go("pausemenu");
    });

    // Ground
    add([
        rect(width(), 100),
        pos(0, height() - 100),
        color(34, 139, 34),
        area(),
        "ground",
    ]);

    // Function to spawn a falling letter
    function spawnLetter() {
        const letterToSpawn = Math.random() < 0.4 ? currentLetter : getRandomLetter();
        const letterColor = getRandomColor();
        
        const letter = add([
            text(letterToSpawn, { size: 72 }),
            pos(rand(50, width() - 50), -50),
            anchor("center"),
            color(letterColor),
            area(),
            "letter",
            {
                value: letterToSpawn,
                clicked: false,
                fallSpeed: 200
            },
        ]);

        // Manually make letter fall
        letter.onUpdate(() => {
            letter.pos.y += letter.fallSpeed * dt();

            // Remove letter when it hits the ground
            if (letter.pos.y >= height() - 100) {
                destroy(letter);
            }
        });

        // Make letters clickable
        letter.onClick(() => {
            if (letter.clicked) return;
            letter.clicked = true;

            if (letter.value === currentLetter) {
                // Correct letter!
                score += 10;
                hitsOnCurrentLetter++;

                // Update score display
                const scoreDisplayObj = get("score-display")[0];
                if (scoreDisplayObj) {
                    scoreDisplayObj.text = "Score: " + score;
                }

                // Update progress display
                const progressDisplayObj = get("progress-display")[0];
                if (progressDisplayObj) {
                    progressDisplayObj.text = hitsOnCurrentLetter + "/" + hitsNeeded;
                }

                // Celebration effect
                addKaboom(letter.pos);
                // play("coin", { volume: 0.5 }); // Commented out - sound not loaded

                // Remove letter
                destroy(letter);

                // Check if we've hit the letter enough times
                if (hitsOnCurrentLetter >= hitsNeeded) {
                    // Move to next letter!
                    hitsOnCurrentLetter = 0;
                    currentLetter = getNextLetter();

                    // Update target display
                    const targetDisplayObj = get("target-display")[0];
                    if (targetDisplayObj) {
                        targetDisplayObj.text = "Find: " + currentLetter;
                    }

                    // Update progress display
                    if (progressDisplayObj) {
                        progressDisplayObj.text = hitsOnCurrentLetter + "/" + hitsNeeded;
                    }

                    // Big celebration for completing a letter!
                    shake(5);
                }
            } else {
                // Wrong letter - shake it
                letter.color = rgb(255, 0, 0);
                shake(10);
            }
        });
    }

    // Spawn letters periodically
    loop(1.5, () => {
        spawnLetter();
    });

    // Initial letters
    wait(0.5, () => spawnLetter());
    wait(1, () => spawnLetter());
});

// Start the game
go("start");