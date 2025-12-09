# Coding Conventions

## General Principles

1. **Clarity over cleverness**: Write code that's easy to understand
2. **Consistency**: Follow existing patterns in the codebase
3. **Simplicity**: Avoid over-engineering
4. **Documentation**: Comment the "why", not the "what"
5. **AI-friendly**: Write code that AI assistants can easily understand and extend

## JavaScript Conventions

### Style
- Use ES6+ features (const/let, arrow functions, template literals)
- 4-space indentation
- Semicolons required
- Single quotes for strings (except templates)
- camelCase for variables and functions
- PascalCase for classes (rare in this project)

### Variables
```javascript
// Good
const gameScore = 0;
let currentLetter = 'A';
const FALL_SPEED = 200; // Constants in UPPER_CASE

// Avoid
var score = 0; // Don't use var
let s = 0; // Unclear names
```

### Functions
```javascript
// Good - descriptive names, clear purpose
function getRandomLetter() {
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

// Good - arrow functions for callbacks
playBtn.onClick(() => {
    go("game");
});

// Avoid - unclear function names
function doStuff() { }
function x() { }
```

### Comments
```javascript
// Good - explain WHY
// Kaboom requires body() component for collision detection
letter.add(body());

// Avoid - state the obvious
// Set score to 0
let score = 0;
```

## Kaboom.js Specific

### Scene Organization
```javascript
// Standard scene structure
scene("sceneName", () => {
    // 1. Add background elements
    // 2. Add UI elements
    // 3. Add interactive elements
    // 4. Set up event handlers
    // 5. Set up game loop
});
```

### Component Ordering
```javascript
// Consistent order for Kaboom components
add([
    text("Hello"),           // Display
    pos(100, 100),          // Position
    anchor("center"),       // Anchor
    color(255, 255, 255),   // Color
    area(),                 // Collision area
    body(),                 // Physics body
    "tag-name",             // Tags last
]);
```

### Naming Conventions
- Scene names: lowercase, descriptive ("start", "game", "pause", "settings")
- Tags: kebab-case ("play-button", "falling-letter")
- Game objects: camelCase (playBtn, targetLetter)

## File Organization

### Game Structure
```
games/[game-name]/
├── game.js          # Main game logic (required)
├── README.md        # Game documentation (required)
└── assets/          # Game-specific assets (optional)
```

### Game Metadata
Each game.js should start with:
```javascript
// Game: ABC Learning
// Version: 1.0.0
// Purpose: Letter recognition and alphabet learning
// Author: [name]
// Last Updated: YYYY-MM-DD
```

## Testing Conventions

### Test File Naming
- `test-[feature].js` for feature tests
- Location: `tests/games/[game-name]/`

### Test Structure
```javascript
// 1. Setup (launch browser, navigate)
// 2. Act (click, type, wait)
// 3. Assert (check results, take screenshots)
// 4. Cleanup (close browser)
```

### Screenshots
- Name pattern: `[test-name]-[step]-[description].png`
- Example: `test-gameplay-3-letters-falling.png`

## Git Conventions

### Commit Messages
```
<type>: <short description>

<detailed description if needed>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

Types:
- `feat:` New feature or game
- `fix:` Bug fix
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `style:` Formatting changes
- `chore:` Maintenance tasks

### Examples
```
feat: Add memory matching game

Created new memory game with card flipping mechanics and difficulty levels.

fix: ABC game letters not falling on mobile

Adjusted gravity and spawn rate for better mobile performance.

docs: Update architecture documentation

Added multi-game launcher architecture diagram.
```

### Branch Naming
- `main` - Production code
- `feat/[feature-name]` - New features
- `fix/[bug-name]` - Bug fixes
- `docs/[doc-name]` - Documentation

## HTML/CSS Conventions

### HTML
- Semantic HTML5 tags
- Descriptive IDs and classes
- Keep inline styles minimal

### CSS
- Mobile-first responsive design
- Use Flexbox/Grid for layout
- Consistent color scheme across games

## Documentation

### README Structure
```markdown
# Game Name

Brief description

## How to Play
1. Step by step

## Learning Goals
- What skills does this teach?

## Controls
- Click/Touch/Keyboard

## Settings
- Customization options
```

### Code Documentation
- Document complex algorithms
- Explain game mechanics
- Note Kaboom.js quirks or workarounds
- Add TODOs for future improvements

## Error Handling

```javascript
// Good - graceful degradation
try {
    // Load optional feature
} catch (e) {
    console.warn('Feature unavailable:', e);
    // Game continues without it
}

// Avoid - silent failures
try {
    // Critical feature
} catch (e) {
    // Empty catch
}
```

## Performance

- Limit game objects (< 100 on screen)
- Clean up old objects with `destroy()`
- Use object pooling for frequently created objects
- Test on mobile devices
- Keep frame rate at 60fps

## Accessibility

- Keyboard navigation support
- High contrast colors
- Large touch targets (min 44x44px)
- Clear visual feedback
- Simple, readable fonts

## AI Assistant Guidelines

When working with AI assistants on this project:

1. **Always read existing code first** before suggesting changes
2. **Follow existing patterns** rather than introducing new ones
3. **Keep it simple** - don't over-engineer solutions
4. **Test changes** - run tests and verify in browser
5. **Document decisions** - explain why, not just what
6. **Ask for clarification** if requirements are unclear

## Code Review Checklist

- [ ] Follows naming conventions
- [ ] Consistent with existing code style
- [ ] Properly commented
- [ ] No console.log() in production code
- [ ] Tested in browser
- [ ] Mobile-friendly
- [ ] Documented in README if user-facing
- [ ] Git commit message is clear
