# Development Guide

## Getting Started

This guide will help you set up your development environment and start contributing to L&M's Playhall.

## Prerequisites

### Required

- **Git**: Version control
  ```bash
  git --version  # Should be 2.x or higher
  ```

- **Web Browser**: Modern browser with dev tools
  - Chrome/Edge (recommended for testing)
  - Firefox
  - Safari

- **Text Editor**: Any code editor
  - VS Code (recommended)
  - Cursor
  - Sublime Text
  - Vim/Emacs

### Optional

- **Python 3**: For local development server
  ```bash
  python3 --version  # v3.6 or higher
  ```

- **Node.js**: For running tests
  ```bash
  node --version  # v20 or higher
  npm --version
  ```

- **GitHub CLI**: For repository management
  ```bash
  gh --version
  ```

## Installation

### 1. Clone the Repository

```bash
# HTTPS
git clone https://github.com/macsche83/lm-playhall.git

# SSH (if configured)
git clone git@github.com:macsche83/lm-playhall.git

cd lm-playhall
```

### 2. Install Dependencies (Optional)

Only needed if running tests:

```bash
npm install
```

This installs:
- `puppeteer` - Headless browser for testing

### 3. Start Development Server

```bash
# Method 1: Python (recommended)
python3 -m http.server 8080

# Method 2: Node.js (if you prefer)
npx http-server -p 8080

# Method 3: Just open the file
open index.html  # macOS
start index.html  # Windows
xdg-open index.html  # Linux
```

### 4. Open in Browser

Navigate to: http://localhost:8080

## Project Structure

```
lm-playhall/
├── .ai/                    # AI assistant documentation
├── .claude/                # Claude Code configuration
├── docs/                   # Human documentation (you are here)
├── games/                  # All games
│   └── abc-learning/       # Example game
├── shared/                 # Shared utilities
├── tests/                  # All tests
├── index.html              # Launcher page
├── launcher.js             # Launcher logic
└── README.md               # Project overview
```

## Development Workflow

### Daily Workflow

1. **Pull latest changes**
   ```bash
   git pull origin main
   ```

2. **Create a branch** (for features/fixes)
   ```bash
   git checkout -b feat/my-feature
   # or
   git checkout -b fix/my-bugfix
   ```

3. **Start the server**
   ```bash
   python3 -m http.server 8080
   ```

4. **Make changes**
   - Edit files in your editor
   - Save and reload browser to see changes

5. **Test your changes**
   ```bash
   # Run relevant tests
   node tests/games/abc-learning/test-gameplay.js
   ```

6. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: Add new feature"
   ```

7. **Push changes**
   ```bash
   git push origin feat/my-feature
   ```

8. **Create Pull Request** (if contributing)
   ```bash
   gh pr create --title "Add new feature" --body "Description..."
   ```

### Hot Reload

No build step means instant updates:
1. Save file
2. Reload browser (Cmd+R / Ctrl+R)
3. See changes immediately

### Browser DevTools

**Essential shortcuts**:
- Open DevTools: `F12` or `Cmd+Opt+I` (Mac) / `Ctrl+Shift+I` (Win)
- Console: `Cmd+Opt+J` / `Ctrl+Shift+J`
- Responsive Mode: `Cmd+Opt+M` / `Ctrl+Shift+M`

**Useful features**:
- Console for `console.log()` output
- Network tab for loading issues
- Application tab for localStorage
- Performance tab for FPS issues

## Adding a New Game

### Step-by-Step

1. **Create game directory**
   ```bash
   mkdir -p games/my-game
   cd games/my-game
   ```

2. **Create game.js**
   ```javascript
   // Game: My Game
   // Version: 1.0.0
   // Purpose: [What does it teach?]

   kaboom({
       width: 800,
       height: 600,
       background: [135, 206, 235],
       root: document.getElementById("game-container"),
   });

   scene("start", () => {
       add([
           text("My Game!", { size: 48 }),
           pos(width() / 2, height() / 2),
           anchor("center"),
       ]);
   });

   go("start");
   ```

3. **Create README.md**
   ```markdown
   # My Game

   Brief description

   ## How to Play
   1. Instructions

   ## Learning Goals
   - Skills taught
   ```

4. **Create index.html** (if custom layout needed)
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>My Game</title>
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <style>
           body {
               margin: 0;
               display: flex;
               justify-content: center;
               align-items: center;
               min-height: 100vh;
               background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
           }
       </style>
   </head>
   <body>
       <div id="game-container"></div>
       <script src="https://unpkg.com/kaboom@3000.0.1/dist/kaboom.js"></script>
       <script src="game.js"></script>
   </body>
   </html>
   ```

5. **Update launcher** (add to `launcher.js`)
   ```javascript
   {
       id: 'my-game',
       name: 'My Game',
       description: 'Brief description',
       category: 'learning', // or 'focus' or 'relaxation'
       icon: '🎮',
       path: 'games/my-game/index.html'
   }
   ```

6. **Create tests**
   ```bash
   mkdir -p tests/games/my-game
   ```

7. **Test locally**
   - Open http://localhost:8080
   - Click your game in launcher
   - Verify it works

8. **Commit and push**
   ```bash
   git add games/my-game
   git commit -m "feat: Add My Game"
   git push
   ```

## Common Development Tasks

### Testing Changes Locally

```bash
# Start server
python3 -m http.server 8080 &

# Run tests
node tests/games/abc-learning/test-browser.js

# View specific game
open http://localhost:8080/games/abc-learning/index.html
```

### Debugging a Game

```javascript
// Add debug info in game.js
onUpdate(() => {
    debug.log(`Score: ${score}`);
    debug.log(`FPS: ${debug.fps()}`);
});

// Or use browser console
console.log('Current state:', { score, level, lives });
```

### Checking Game Performance

```javascript
// FPS counter
onUpdate(() => {
    debug.log(`FPS: ${debug.fps()}`);
});

// Count game objects
onUpdate(() => {
    const objects = get('*');
    debug.log(`Objects: ${objects.length}`);
});

// Memory usage (in browser DevTools)
// Performance tab → Memory → Take snapshot
```

### Testing on Mobile

**Option 1: Responsive Mode**
1. Open DevTools (`F12`)
2. Click device toolbar icon
3. Select device (iPhone, iPad, etc.)
4. Test touch events

**Option 2: Real Device**
1. Find your computer's IP:
   ```bash
   # macOS/Linux
   ifconfig | grep inet

   # Windows
   ipconfig
   ```
2. On mobile, visit: `http://YOUR_IP:8080`
3. Test on actual device

**Option 3: ngrok (remote testing)**
```bash
# Install ngrok
brew install ngrok

# Start tunnel
ngrok http 8080

# Use the https URL on any device
```

### Updating Kaboom.js Version

```html
<!-- Update CDN link in all game HTML files -->
<script src="https://unpkg.com/kaboom@NEW_VERSION/dist/kaboom.js"></script>
```

Test thoroughly after updating!

### Working with LocalStorage

```javascript
// Save settings
localStorage.setItem('game-difficulty', 'hard');
localStorage.setItem('game-volume', '0.8');

// Load settings
const difficulty = localStorage.getItem('game-difficulty') || 'medium';
const volume = parseFloat(localStorage.getItem('game-volume')) || 1.0;

// Clear settings (useful for testing)
localStorage.clear();

// View in DevTools
// Application tab → Local Storage → http://localhost:8080
```

### Code Formatting

No formatter required, but follow conventions:

```javascript
// Good spacing
function spawnLetter() {
    const letter = choose(alphabet);
    const x = rand(50, width() - 50);

    add([
        text(letter, { size: 48 }),
        pos(x, -50),
        color(255, 255, 255),
        area(),
        body(),
        "letter",
    ]);
}

// Use consistent indentation (4 spaces)
// Add blank lines between logical sections
// Group related code together
```

## Using AI Assistants

### With Claude Code

```bash
# Read project context
cat .ai/context.md

# Use prompt templates
cat .ai/prompts/new-game.md

# Ask Claude to help
# "Following .ai/conventions.md, help me add a new game..."
```

### With Cursor

The `.cursorrules` file (if present) automatically configures Cursor to follow project conventions.

### With GitHub Copilot

Add comments describing what you want:

```javascript
// Create a function that spawns a letter at a random x position
// The letter should fall with gravity and disappear off screen
function spawnLetter() {
    // Copilot will suggest implementation
}
```

## Troubleshooting

### Game Won't Load

1. Check browser console for errors
2. Verify Kaboom.js CDN is accessible
3. Check file paths are correct
4. Try hard reload: `Cmd+Shift+R` / `Ctrl+Shift+R`

### Tests Failing

```bash
# Ensure server is running
lsof -i :8080

# If not, start it
python3 -m http.server 8080 &

# Run test again
node tests/games/abc-learning/test-browser.js
```

### LocalStorage Not Working

- Check browser settings (cookies/storage enabled)
- Try incognito mode
- Clear existing storage and retry

### Mobile Not Working

- Verify computer and phone on same WiFi
- Check firewall allows port 8080
- Use HTTPS with ngrok if needed

### Performance Issues

```javascript
// Limit game objects
const maxLetters = 20;
if (get('letter').length >= maxLetters) {
    // Don't spawn more
}

// Destroy off-screen objects
onUpdate(() => {
    get('letter').forEach(letter => {
        if (letter.pos.y > height() + 100) {
            destroy(letter);
        }
    });
});
```

## Best Practices

### Do's

✅ Follow conventions in `.ai/conventions.md`
✅ Test on both desktop and mobile
✅ Write descriptive commit messages
✅ Add comments for complex logic
✅ Keep games self-contained
✅ Use shared utilities where appropriate
✅ Test before committing

### Don'ts

❌ Don't commit `node_modules/`
❌ Don't hardcode personal paths
❌ Don't leave `console.log()` in production
❌ Don't ignore test failures
❌ Don't push to `main` without testing
❌ Don't break existing games when adding new ones

## Resources

### Documentation

- [Architecture](architecture.md)
- [Testing Guide](testing.md)
- [Deployment Guide](deployment.md)
- [Game Catalog](game-catalog.md)
- [Adding Games](adding-games.md)

### External Resources

- [Kaboom.js Docs](https://kaboomjs.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [GitHub Pages](https://pages.github.com/)
- [Puppeteer Docs](https://pptr.dev/)

### Getting Help

- Check existing games for examples
- Read `.ai/` documentation
- Ask AI assistant (Claude, Copilot, Cursor)
- Open GitHub issue
- Check browser DevTools console

## Next Steps

Now that you're set up:

1. Explore the existing game: `games/abc-learning/`
2. Try making a small change
3. Run the tests
4. Read [adding-games.md](adding-games.md) for more details
5. Start building your first game!

Happy coding! 🎮
