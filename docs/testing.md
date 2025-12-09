# Testing Guide

## Testing Strategy

L&M's Playhall uses automated browser testing with Puppeteer for integration and end-to-end tests. This document explains how to write and run tests.

## Test Philosophy

1. **User-Centric**: Test what users experience, not implementation details
2. **Visual Verification**: Screenshots for manual review
3. **Integration Focus**: Test complete flows, not isolated units
4. **Maintainable**: Tests should be easy to update as games evolve

## Test Types

### Integration Tests
- Test game flows (start → play → complete)
- Verify UI interactions (clicks, navigation)
- Check game state changes

### Visual Tests
- Capture screenshots at key moments
- Manual review of visual appearance
- Regression detection

### No Unit Tests
- Minimal business logic to test
- Game logic is tightly coupled to Kaboom.js
- Integration tests provide better coverage

## Test Structure

```
tests/
├── launcher/                   # Launcher tests (future)
└── games/                      # Per-game tests
    └── abc-learning/           # Example game tests
        ├── test-browser.js     # Basic browser loading
        ├── test-gameplay.js    # Main game flow
        ├── test-settings.js    # Settings screen
        ├── test-pause-menu.js  # Pause functionality
        ├── test-positions.js   # Object positioning
        └── test-with-logs.js   # Debug/logging test
```

## Running Tests

### Prerequisites

```bash
# Install dependencies
npm install

# Start local server
python3 -m http.server 8080 &
```

### Run All Tests (Game)

```bash
# Run each test for ABC Learning
node tests/games/abc-learning/test-browser.js
node tests/games/abc-learning/test-gameplay.js
node tests/games/abc-learning/test-settings.js
node tests/games/abc-learning/test-pause-menu.js
node tests/games/abc-learning/test-positions.js
```

### Run Single Test

```bash
node tests/games/abc-learning/test-gameplay.js
```

### Check Screenshots

Screenshots are saved to the project root:
- `test-1-start.png`
- `test-2-settings.png`
- etc.

## Writing Tests

### Basic Test Template

```javascript
const puppeteer = require('puppeteer');

(async () => {
    console.log('Launching browser...');
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Set viewport (mobile or desktop)
        await page.setViewport({ width: 800, height: 600 });

        // Listen for console/errors (optional)
        page.on('console', msg => {
            console.log(`[BROWSER]: ${msg.text()}`);
        });

        // Navigate to game
        console.log('Navigating to game...');
        await page.goto('http://localhost:8080/games/abc-learning/index.html');
        await page.waitForTimeout(1000); // Wait for load

        // Test actions
        console.log('Performing test actions...');
        await page.click('.play-button'); // Click play
        await page.waitForTimeout(2000);

        // Take screenshot
        await page.screenshot({ path: 'test-result.png' });

        console.log('Test complete!');

    } catch (error) {
        console.error('Test failed:', error);
        throw error;

    } finally {
        await browser.close();
    }
})();
```

### Clicking Elements

```javascript
// By selector
await page.click('.play-button');
await page.click('#settings-btn');

// By text
await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('canvas'));
    // Kaboom renders to canvas, so click coordinates
    buttons[0].click();
});

// By coordinate (for canvas games)
await page.mouse.click(400, 300);

// Wait after click
await page.click('.button');
await page.waitForTimeout(1000);
```

### Evaluating Game State

```javascript
// Execute code in browser context
const gameState = await page.evaluate(() => {
    // Access Kaboom global state
    return {
        width: width(),
        height: height(),
        objectCount: get('*').length,
        score: score, // If score is global
    };
});

console.log('Game state:', gameState);
```

### Injecting Debug Code

```javascript
// Inject custom code to inspect game
await page.evaluate(() => {
    console.log('=== INJECTING DEBUG CODE ===');

    // Expose game internals
    window.debugGame = {
        getScore: () => score,
        getAllObjects: () => get('*'),
        getLetters: () => get('letter'),
    };
});

// Later, access debug info
const letters = await page.evaluate(() => {
    return window.debugGame.getLetters().map(l => ({
        text: l.text,
        pos: l.pos,
    }));
});

console.log('Letters on screen:', letters);
```

### Taking Screenshots

```javascript
// Full page screenshot
await page.screenshot({ path: 'test-full.png' });

// Specific element
const element = await page.$('.game-container');
await element.screenshot({ path: 'test-element.png' });

// With delay
await page.waitForTimeout(2000); // Wait for animation
await page.screenshot({ path: 'test-after-animation.png' });
```

### Waiting for Conditions

```javascript
// Wait for selector
await page.waitForSelector('.game-loaded');

// Wait for timeout
await page.waitForTimeout(3000);

// Wait for function
await page.waitForFunction(() => {
    return window.gameReady === true;
});

// Wait for navigation
await page.waitForNavigation();
```

### Listening to Browser Events

```javascript
// Console logs
page.on('console', msg => {
    console.log(`[BROWSER LOG]:`, msg.text());
});

// Errors
page.on('pageerror', error => {
    console.error(`[BROWSER ERROR]:`, error.message);
});

// Network requests
page.on('request', request => {
    console.log(`[REQUEST]:`, request.url());
});

// Failed requests
page.on('requestfailed', request => {
    console.log(`[REQUEST FAILED]:`, request.url());
});
```

## Test Examples

### Example 1: Basic Loading Test

```javascript
// tests/games/my-game/test-browser.js
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Test: Page loads without errors
    let errors = [];
    page.on('pageerror', e => errors.push(e));

    await page.goto('http://localhost:8080/games/my-game/index.html');
    await page.waitForTimeout(3000);

    if (errors.length > 0) {
        console.error('FAIL: Page has errors:', errors);
        process.exit(1);
    }

    await page.screenshot({ path: 'test-my-game-load.png' });
    console.log('PASS: Game loaded successfully');

    await browser.close();
})();
```

### Example 2: Gameplay Flow Test

```javascript
// tests/games/my-game/test-gameplay.js
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/games/my-game/index.html');

    // Step 1: Start screen
    console.log('1. Start screen loaded');
    await page.screenshot({ path: 'test-1-start.png' });

    // Step 2: Click play button
    console.log('2. Clicking PLAY...');
    await page.mouse.click(400, 380); // Adjust coordinates
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-2-playing.png' });

    // Step 3: Verify game is running
    const objectCount = await page.evaluate(() => {
        return get('*').length;
    });
    console.log(`3. Game objects: ${objectCount}`);

    if (objectCount < 3) {
        console.error('FAIL: Too few game objects');
        process.exit(1);
    }

    // Step 4: Wait for gameplay
    console.log('4. Playing for 5 seconds...');
    await page.waitForTimeout(5000);
    await page.screenshot({ path: 'test-3-gameplay.png' });

    console.log('PASS: Gameplay test complete');
    await browser.close();
})();
```

### Example 3: Settings Test

```javascript
// tests/games/my-game/test-settings.js
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('http://localhost:8080/games/my-game/index.html');

    // Click SETTINGS button
    console.log('1. Clicking SETTINGS...');
    await page.mouse.click(400, 440);
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-settings-1.png' });

    // Change a setting
    console.log('2. Changing setting...');
    await page.mouse.click(300, 250); // Click setting option
    await page.waitForTimeout(500);

    // Start game with new settings
    console.log('3. Starting game...');
    await page.mouse.click(400, 550);
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'test-settings-2.png' });

    // Verify setting applied
    const result = await page.evaluate(() => {
        // Check if setting is applied
        return localStorage.getItem('my-game-difficulty');
    });

    if (result !== 'hard') {
        console.error('FAIL: Setting not applied');
        process.exit(1);
    }

    console.log('PASS: Settings test complete');
    await browser.close();
})();
```

## Testing Checklist

### For Each New Game

- [ ] test-browser.js (loads without errors)
- [ ] test-gameplay.js (main game flow works)
- [ ] test-settings.js (if game has settings)
- [ ] test-pause-menu.js (if game has pause)
- [ ] Screenshot verification (visually check)
- [ ] Mobile viewport test (800x600 and 375x667)

### Before Committing

- [ ] All tests pass
- [ ] No console errors
- [ ] Screenshots look correct
- [ ] Tested on actual device (if possible)
- [ ] Server was running during tests

### Before Deploying

- [ ] All games tested
- [ ] Launcher tested
- [ ] Mobile testing complete
- [ ] No broken links
- [ ] Performance acceptable (60fps)

## Continuous Integration (Future)

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      - run: npm install
      - run: python3 -m http.server 8080 &
      - run: sleep 3
      - run: node tests/games/abc-learning/test-browser.js
      - run: node tests/games/abc-learning/test-gameplay.js
```

## Debugging Tests

### Run in Non-Headless Mode

```javascript
const browser = await puppeteer.launch({
    headless: false,  // Show browser window
    slowMo: 250,      // Slow down actions
});
```

### Increase Timeouts

```javascript
// Default
await page.waitForTimeout(1000);

// Longer for debugging
await page.waitForTimeout(5000);
```

### Add More Logging

```javascript
console.log('Before click');
await page.mouse.click(400, 300);
console.log('After click');

const state = await page.evaluate(() => {
    return { objects: get('*').length };
});
console.log('State:', state);
```

### Save HTML Snapshots

```javascript
const html = await page.content();
fs.writeFileSync('page-snapshot.html', html);
```

## Best Practices

### Do's

✅ Test user-visible behavior
✅ Use screenshots for visual verification
✅ Add descriptive console.log statements
✅ Test on multiple viewport sizes
✅ Clean up (close browser) even on error
✅ Use meaningful test file names

### Don'ts

❌ Don't test Kaboom.js internals
❌ Don't make tests too brittle (exact pixel positions)
❌ Don't commit screenshot files to git (.gitignore them)
❌ Don't forget to start the server before testing
❌ Don't use fixed delays for async operations (use waitFor*)

## Troubleshooting

### Tests Timing Out

- Increase `await page.waitForTimeout()` durations
- Check server is running
- Verify URL is correct

### Clicks Not Working

- Try `await page.mouse.click(x, y)` instead of `await page.click()`
- Verify element is visible
- Check z-index isn't blocking clicks

### Screenshots Empty

- Wait longer before screenshot
- Check viewport is set correctly
- Verify page loaded successfully

### Browser Won't Launch

```bash
# Install Chrome dependencies (Linux)
sudo apt-get install chromium-browser

# Or use system Chrome
const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome'
});
```

## Resources

- [Puppeteer Docs](https://pptr.dev/)
- [Puppeteer API](https://pptr.dev/api)
- [Testing Best Practices](https://pptr.dev/guides/testing)

Happy testing! 🧪
