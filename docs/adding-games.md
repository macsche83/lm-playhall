# Adding Games Guide

## Overview

This guide walks you through adding a new game to L&M's Playhall from start to finish.

## Prerequisites

- Read [development.md](development.md) for setup instructions
- Familiar with JavaScript and Kaboom.js basics
- Understanding of project structure
- Local development environment ready

## Planning Your Game

### 1. Define the Game

Answer these questions:

**Educational Value**:
- What skill does it teach?
- What age group is it for?
- What will players learn?

**Game Design**:
- What's the core mechanic?
- How do players interact?
- What's the win/lose condition?
- How long is a typical session?

**Category**:
- Learning (teaches a skill)
- Focus (improves concentration)
- Relaxation (promotes calm)

**Example**:
```
Game: Number Catch
Skill: Number recognition and counting
Age: 3-6 years
Category: Learning
Mechanic: Click falling numbers that match the target
Win: Catch 10 correct numbers
Session: 2-5 minutes
```

### 2. Research Similar Games

Look at existing games:
- `games/abc-learning/` - Letter catching game
- See what patterns to reuse
- Check shared utilities available

### 3. Sketch the Screens

Plan your scenes:
1. **Start Scene**: Title, play button, settings
2. **Game Scene**: Main gameplay
3. **Pause Scene**: Resume, settings, quit
4. **Settings Scene**: Game options (optional)

## Implementation Steps

### Step 1: Create Game Directory

```bash
# Navigate to project root
cd lm-playhall

# Create game directory
mkdir -p games/my-game

# Create test directory
mkdir -p tests/games/my-game

cd games/my-game
```

### Step 2: Create Game Files

#### games/my-game/game.js

Start with this template:

```javascript
// Game: My Game Name
// Version: 1.0.0
// Purpose: Brief description of what this game teaches
// Author: Your Name
// Last Updated: YYYY-MM-DD

// Initialize Kaboom
kaboom({
    width: 800,
    height: 600,
    background: [135, 206, 235], // Sky blue
    root: document.getElementById("game-container"),
    gravity: 800, // If objects should fall
});

// Game state
let score = 0;
let gameStarted = false;

// Constants
const SPAWN_RATE = 1.5; // seconds between spawns

// Start scene
scene("start", () => {
    add([
        text("My Game!", { size: 48 }),
        pos(width() / 2, height() / 2 - 100),
        anchor("center"),
        color(255, 255, 255),
    ]);

    add([
        text("Brief instructions here", { size: 24 }),
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

    playBtn.onClick(() => {
        go("game");
    });
});

// Main game scene
scene("game", () => {
    // Reset game state
    score = 0;
    gameStarted = true;

    // Score display
    const scoreText = add([
        text(`Score: ${score}`, { size: 24 }),
        pos(20, 20),
        color(255, 255, 255),
        { value: score },
    ]);

    // Game logic here
    // ...

    // Update score display
    onUpdate(() => {
        scoreText.text = `Score: ${score}`;
    });
});

// Start with start scene
go("start");
```

#### games/my-game/index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Game - L&M's Playhall</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            font-family: 'Arial', sans-serif;
        }
        #game-container {
            box-shadow: 0 10px 50px rgba(0,0,0,0.3);
            border-radius: 10px;
            overflow: hidden;
        }
    </style>
</head>
<body>
    <div id="game-container"></div>

    <!-- Load Kaboom.js from CDN -->
    <script src="https://unpkg.com/kaboom@3000.0.1/dist/kaboom.js"></script>
    <script src="game.js"></script>
</body>
</html>
```

#### games/my-game/README.md

```markdown
# My Game

Brief description of the game.

## Learning Goals

- Skill 1
- Skill 2
- Skill 3

## How to Play

1. Step 1
2. Step 2
3. Step 3

## Controls

- **Click/Touch**: Action description
- **Keyboard**: Key actions (if any)

## Settings

- Setting 1: Description
- Setting 2: Description

## Target Age

X-Y years old

## Development

- Version: 1.0.0
- Last Updated: YYYY-MM-DD
- Status: In Development

## Known Issues

- None

## Future Enhancements

- Feature 1
- Feature 2
```

### Step 3: Implement Game Logic

Build out your game scenes:

1. **Start Scene**: Menu and instructions
2. **Game Scene**: Core gameplay loop
3. **Pause Scene**: Pause functionality

Follow patterns from ABC Learning game:
- Look at `games/abc-learning/game.js`
- Use similar structure
- Reuse shared utilities

### Step 4: Add to Launcher

#### Update launcher.js

```javascript
// In launcher.js, add your game to the games array
const games = [
    {
        id: 'abc-learning',
        name: 'ABC Learning',
        description: 'Learn the alphabet!',
        category: 'learning',
        icon: '🔤',
        path: 'games/abc-learning/index.html'
    },
    // ADD YOUR GAME HERE
    {
        id: 'my-game',
        name: 'My Game',
        description: 'Brief description',
        category: 'learning', // or 'focus' or 'relaxation'
        icon: '🎮', // Choose appropriate emoji
        path: 'games/my-game/index.html'
    },
];
```

### Step 5: Create Tests

#### tests/games/my-game/test-browser.js

```javascript
const puppeteer = require('puppeteer');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox']
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({ width: 800, height: 600 });

        // Listen for errors
        let errors = [];
        page.on('pageerror', e => {
            console.error('[BROWSER ERROR]:', e.message);
            errors.push(e);
        });

        // Navigate
        console.log('Navigating to game...');
        await page.goto('http://localhost:8080/games/my-game/index.html');
        await page.waitForTimeout(2000);

        // Take screenshot
        await page.screenshot({ path: 'test-my-game-load.png' });

        if (errors.length > 0) {
            console.error('FAIL: Page has errors');
            process.exit(1);
        }

        console.log('PASS: Game loaded successfully');

    } catch (error) {
        console.error('Test failed:', error);
        throw error;
    } finally {
        await browser.close();
    }
})();
```

#### tests/games/my-game/test-gameplay.js

```javascript
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost:8080/games/my-game/index.html');

        // Test gameplay flow
        console.log('1. Start screen');
        await page.screenshot({ path: 'test-my-game-1-start.png' });

        console.log('2. Clicking PLAY...');
        await page.mouse.click(400, 380); // Adjust coordinates
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'test-my-game-2-playing.png' });

        console.log('3. Playing...');
        await page.waitForTimeout(5000);
        await page.screenshot({ path: 'test-my-game-3-gameplay.png' });

        console.log('PASS: Gameplay test complete');

    } finally {
        await browser.close();
    }
})();
```

### Step 6: Test Locally

```bash
# Start server
python3 -m http.server 8080 &

# Test directly
open http://localhost:8080/games/my-game/index.html

# Test via launcher
open http://localhost:8080

# Run tests
node tests/games/my-game/test-browser.js
node tests/games/my-game/test-gameplay.js
```

### Step 7: Update Documentation

#### Update docs/game-catalog.md

Add your game to the catalog:

```markdown
#### My Game
- **Status**: 🚧 In Development
- **Version**: 1.0.0
- **Path**: `games/my-game/`
- **Description**: Brief description
- **Target Age**: X-Y years
- **Skills**: Skill list
- **Features**: Feature list
- **Controls**: Click/Touch
- **Last Updated**: YYYY-MM-DD
```

### Step 8: Create Pull Request (if contributing)

```bash
# Create branch
git checkout -b feat/add-my-game

# Add files
git add games/my-game/
git add tests/games/my-game/
git add launcher.js
git add docs/game-catalog.md

# Commit
git commit -m "feat: Add My Game

New game that teaches [skill] for ages [X-Y].

Features:
- Feature 1
- Feature 2

Tests included and passing.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# Push
git push origin feat/add-my-game

# Create PR
gh pr create --title "Add My Game" --body "Description of game..."
```

## Game Development Tips

### Start Simple

Begin with minimal functionality:
1. Just the start screen
2. Then add basic gameplay
3. Then add features incrementally

Don't try to build everything at once!

### Use Existing Patterns

Copy patterns from ABC Learning:
- Scene structure
- Button creation
- Score display
- Pause menu

### Test Frequently

- Test after every major change
- Use browser DevTools console
- Check on mobile viewport
- Run automated tests

### Keep It Self-Contained

- Game should work independently
- Don't rely on global state
- Include all needed assets
- Document dependencies

### Mobile-First

Design for mobile first:
- Large touch targets (44x44px minimum)
- Simple controls (tap/swipe)
- Readable text sizes
- Portrait or landscape?

### Performance

Watch for:
- Too many objects (< 50 on screen)
- Memory leaks (destroy unused objects)
- Frame rate (maintain 60 FPS)
- Load time (< 3 seconds)

## Common Patterns

### Spawning Objects

```javascript
function spawnItem() {
    const x = rand(50, width() - 50);

    add([
        text("X", { size: 48 }),
        pos(x, -50),
        body(), // Falls with gravity
        area(),
        "item",
    ]);
}

// Spawn every N seconds
loop(2, () => {
    if (gameStarted) {
        spawnItem();
    }
});
```

### Click Detection

```javascript
const item = add([
    text("Click Me", { size: 32 }),
    pos(400, 300),
    area(),
    "clickable",
]);

item.onClick(() => {
    score++;
    destroy(item);
});
```

### Score Tracking

```javascript
let score = 0;

const scoreText = add([
    text(`Score: ${score}`),
    pos(20, 20),
]);

onUpdate(() => {
    scoreText.text = `Score: ${score}`;
});
```

### Pause Menu

```javascript
function showPauseMenu() {
    // Dim background
    const overlay = add([
        rect(width(), height()),
        pos(0, 0),
        color(0, 0, 0),
        opacity(0.7),
        layer("ui"),
        "pause-overlay",
    ]);

    // Resume button
    const resumeBtn = add([
        text("RESUME", { size: 32 }),
        pos(width() / 2, height() / 2),
        anchor("center"),
        area(),
        layer("ui"),
    ]);

    resumeBtn.onClick(() => {
        destroy(overlay);
        destroy(resumeBtn);
        // Resume game logic
    });
}
```

### Settings Storage

```javascript
// Save setting
function saveSetting(key, value) {
    localStorage.setItem(`my-game-${key}`, value);
}

// Load setting
function loadSetting(key, defaultValue) {
    return localStorage.getItem(`my-game-${key}`) || defaultValue;
}

// Usage
saveSetting('difficulty', 'hard');
const difficulty = loadSetting('difficulty', 'medium');
```

## Checklist

Before submitting your game:

### Functionality
- [ ] Game loads without errors
- [ ] Start scene works
- [ ] Game scene works
- [ ] Pause works (if applicable)
- [ ] Settings work (if applicable)
- [ ] Score tracking works
- [ ] Win/lose conditions work

### User Experience
- [ ] Clear instructions
- [ ] Intuitive controls
- [ ] Visual feedback
- [ ] Appropriate difficulty
- [ ] Fun to play!

### Technical
- [ ] Follows conventions
- [ ] No console errors
- [ ] Runs at 60 FPS
- [ ] Works on mobile
- [ ] Tests pass

### Documentation
- [ ] README.md complete
- [ ] Added to game-catalog.md
- [ ] Added to launcher
- [ ] Commit message clear

## Getting Help

Stuck? Resources:

1. **Read existing games**: `games/abc-learning/`
2. **Check docs**: All files in `docs/`
3. **AI assistants**: Use `.ai/prompts/new-game.md`
4. **Kaboom docs**: https://kaboomjs.com/
5. **GitHub issues**: Ask questions

## Examples

### Simple Click Game

Minimal example:

```javascript
kaboom();

let score = 0;

scene("game", () => {
    add([text(`Score: ${score}`)]);

    loop(1, () => {
        const target = add([
            circle(20),
            pos(rand(0, width()), rand(0, height())),
            area(),
        ]);

        target.onClick(() => {
            score++;
            destroy(target);
        });
    });
});

go("game");
```

### Falling Objects Game

```javascript
kaboom({ gravity: 1000 });

scene("game", () => {
    loop(1.5, () => {
        add([
            rect(30, 30),
            pos(rand(0, width()), 0),
            body(),
            area(),
        ]).onClick(() => {
            // Handle click
        });
    });
});

go("game");
```

## Next Steps

Ready to build? Follow the steps above and create something amazing!

For detailed Kaboom.js examples, visit: https://kaboomjs.com/

Happy game making! 🎮
