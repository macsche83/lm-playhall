# Architecture

## System Overview

L&M's Playhall uses a **multi-game launcher architecture** where each game is a self-contained module accessed through a central launcher interface.

```
┌─────────────────────────────────────┐
│      Game Launcher (index.html)     │
│  - Game selection menu              │
│  - Category filtering               │
│  - Game previews                    │
└─────────────────────────────────────┘
              │
              ├─────────────────┬──────────────┬───────────────┐
              │                 │              │               │
      ┌───────▼──────┐  ┌──────▼──────┐  ┌───▼──────┐  ┌────▼─────┐
      │ ABC Learning │  │  Game 2     │  │  Game 3  │  │  Game N  │
      │  (Kaboom.js) │  │ (Kaboom.js) │  │ (...)    │  │  (...)   │
      └──────────────┘  └─────────────┘  └──────────┘  └──────────┘
              │                 │              │               │
              └─────────────────┴──────────────┴───────────────┘
                                │
                        ┌───────▼───────┐
                        │ Shared Utils  │
                        │ - UI common   │
                        │ - Analytics   │
                        └───────────────┘
```

## Directory Structure

```
/
├── index.html              # Game launcher page
├── launcher.js             # Launcher UI logic
├── games/
│   ├── abc-learning/       # Each game in own directory
│   │   ├── game.js         # Game logic
│   │   └── README.md       # Game-specific docs
│   ├── [game-2]/
│   └── [game-n]/
├── shared/                 # Shared code across games
│   ├── ui-components.js    # Common UI elements
│   └── game-wrapper.js     # Game initialization wrapper
├── tests/                  # All tests
│   ├── launcher/           # Launcher tests
│   └── games/              # Per-game tests
│       └── abc-learning/
└── docs/                   # Documentation
```

## Game Architecture

Each game follows a consistent pattern:

### Game Structure
```javascript
// games/[game-name]/game.js
kaboom({
    width: 800,
    height: 600,
    background: [r, g, b],
    root: document.getElementById("game-container"),
});

// Scenes:
scene("start", () => { /* Menu */ });
scene("game", () => { /* Main gameplay */ });
scene("pause", () => { /* Pause menu */ });
```

### Game Lifecycle
1. **Load**: User selects game from launcher
2. **Initialize**: Game loads Kaboom.js and assets
3. **Start Scene**: Game shows start menu
4. **Game Scene**: Main gameplay loop
5. **Exit**: Return to launcher (optional)

## Key Design Decisions

### 1. Why Kaboom.js?
- Simple 2D game engine
- Great for educational games
- Small bundle size
- Good documentation
- Active community

### 2. Why No Build Step?
- Simplicity: Just HTML/JS/CSS
- Fast iteration
- Easy for AI assistants to understand
- Works directly on GitHub Pages
- No toolchain complexity

### 3. Why Self-Contained Games?
- Independent deployment
- Easy to add/remove games
- Isolated testing
- Different contributors can work independently
- Clear boundaries

### 4. Why Shared Utilities?
- DRY principle for common UI
- Consistent look and feel
- Easier maintenance
- Shared best practices

## Data Flow

### Launcher → Game
```
User clicks game
  → launcher.js loads game iframe/page
  → game.js initializes
  → Kaboom.js starts
  → Game shows start scene
```

### Game State
- Each game manages its own state
- No cross-game state persistence (yet)
- LocalStorage used for game-specific settings
- No backend required

## Performance Considerations

- Kaboom.js loads from CDN (cached)
- Games load on-demand
- Assets are minimal (text-based when possible)
- Target: < 3 second load time
- Mobile-first responsive design

## Security

- No user data collection
- No external API calls (except CDN)
- CSP headers via GitHub Pages
- No authentication needed
- All client-side only

## Testing Strategy

- **Unit Tests**: Not applicable (minimal logic)
- **Integration Tests**: Puppeteer for game flows
- **E2E Tests**: Full game scenarios
- **Manual Testing**: Visual verification

## Deployment

- **Platform**: GitHub Pages
- **CI/CD**: Git push triggers automatic deployment
- **URL**: https://macsche83.github.io/lm-playhall/
- **Rollback**: Git revert

## Future Considerations

- Progressive Web App (PWA) support
- Offline play
- Achievement system
- Parent/teacher dashboard
- Multi-language support
- Accessibility improvements (WCAG 2.1)
