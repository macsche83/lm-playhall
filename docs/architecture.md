# Architecture Documentation

## Overview

L&M's Playhall is a browser-based educational game platform built with simplicity and extensibility in mind. This document provides detailed architectural information for developers.

## System Architecture

### High-Level Architecture

```
┌──────────────────────────────────────────────────┐
│                  User's Browser                  │
│                                                  │
│  ┌────────────────────────────────────────────┐ │
│  │          Game Launcher (SPA)               │ │
│  │  - Game menu                               │ │
│  │  - Category filters                        │ │
│  │  - Game cards                              │ │
│  └────────────────────────────────────────────┘ │
│                      │                           │
│                      ▼                           │
│  ┌────────────────────────────────────────────┐ │
│  │           Individual Game                  │ │
│  │  - Kaboom.js runtime                       │ │
│  │  - Game logic                              │ │
│  │  - Scene management                        │ │
│  └────────────────────────────────────────────┘ │
│                      │                           │
│                      ▼                           │
│  ┌────────────────────────────────────────────┐ │
│  │          Shared Utilities                  │ │
│  │  - UI components                           │ │
│  │  - Common functions                        │ │
│  └────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────────────┐
│            External Dependencies                 │
│  - Kaboom.js (CDN)                              │
│  - (Future: fonts, sounds)                      │
└──────────────────────────────────────────────────┘
```

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| HTML5 | Latest | Structure and semantics |
| CSS3 | Latest | Styling and layout |
| JavaScript | ES6+ | Game logic and interactions |
| Kaboom.js | 3000.0.1 | 2D game engine |

### Development Tools

| Tool | Purpose |
|------|---------|
| Git | Version control |
| GitHub | Repository hosting |
| GitHub Pages | Static site hosting |
| GitHub CLI | Repository management |
| Puppeteer | Automated testing |
| Python HTTP Server | Local development server |

### Why These Choices?

**Kaboom.js**
- Pros: Simple API, small bundle, good docs, active community
- Cons: Limited to 2D, less powerful than Phaser/Unity
- Verdict: Perfect for simple educational games

**No Build Step**
- Pros: Simple, fast iteration, AI-friendly, easy deployment
- Cons: No TypeScript, no module bundling, no minification
- Verdict: Simplicity wins for this project size

**GitHub Pages**
- Pros: Free, automatic deployment, HTTPS, CDN
- Cons: Static only, no backend, limited to 1GB
- Verdict: Perfect fit for client-side games

## Directory Structure

```
/
├── .ai/                        # AI assistant context
│   ├── context.md              # Project vision and goals
│   ├── architecture.md         # AI-focused architecture
│   ├── conventions.md          # Coding standards
│   └── prompts/                # Prompt templates
│       ├── new-game.md
│       ├── new-feature.md
│       ├── bug-fix.md
│       └── refactor.md
│
├── .claude/                    # Claude Code specific
│   └── (slash commands)
│
├── docs/                       # Human-focused documentation
│   ├── architecture.md         # This file
│   ├── development.md          # Development guide
│   ├── testing.md              # Testing guide
│   ├── deployment.md           # Deployment guide
│   ├── game-catalog.md         # All games list
│   └── adding-games.md         # How to add games
│
├── games/                      # All games
│   ├── abc-learning/           # Each game isolated
│   │   ├── game.js             # Game logic
│   │   └── README.md           # Game docs
│   └── [future-games]/
│
├── shared/                     # Shared code
│   ├── ui-components.js        # Common UI
│   └── game-wrapper.js         # Game utilities
│
├── tests/                      # All tests
│   ├── launcher/               # Launcher tests
│   └── games/                  # Per-game tests
│       └── abc-learning/
│           ├── test-browser.js
│           ├── test-gameplay.js
│           └── ...
│
├── .gitignore                  # Git ignore rules
├── ARCHITECTURE.md             # Quick reference
├── CONTRIBUTING.md             # Contribution guide
├── README.md                   # Project overview
├── index.html                  # Game launcher page
└── launcher.js                 # Launcher logic
```

## Component Details

### Game Launcher

**Purpose**: Central hub for game selection

**Files**:
- `index.html` - HTML structure and styles
- `launcher.js` - Game menu logic

**Responsibilities**:
1. Display available games
2. Filter by category
3. Load selected game
4. Handle navigation

**Data Structure**:
```javascript
const games = [
    {
        id: 'abc-learning',
        name: 'ABC Learning',
        description: 'Learn the alphabet!',
        category: 'learning',
        icon: '🔤',
        path: 'games/abc-learning/index.html'
    },
    // ...more games
];
```

### Individual Games

**Purpose**: Self-contained educational games

**Structure**:
```
games/[game-name]/
├── game.js           # Main game logic (required)
├── README.md         # Game documentation (required)
├── index.html        # Game page (optional, can use shared)
└── assets/           # Game-specific assets (optional)
```

**Game Lifecycle**:
1. **Load**: User selects from launcher
2. **Init**: Kaboom.js initializes
3. **Start Scene**: Show menu
4. **Game Scene**: Main loop
5. **Pause/Settings**: Optional scenes
6. **Exit**: Return to launcher

**Standard Scenes**:
- `start` - Main menu, play button, settings
- `game` - Main gameplay loop
- `pause` - Pause menu
- `settings` - Game configuration

### Shared Utilities

**Purpose**: DRY principle for common code

**Files**:
- `shared/ui-components.js` - Reusable UI elements
- `shared/game-wrapper.js` - Common game utilities

**Example Components**:
```javascript
// Button creation
function createButton(text, pos, color, onClick) { }

// Score display
function createScoreDisplay(pos) { }

// Pause menu
function createPauseMenu(resumeCallback, quitCallback) { }
```

## Data Flow

### Launcher → Game Flow

```
1. User clicks game card in launcher
   ↓
2. launcher.js loads game iframe/page
   ↓
3. game.js initializes Kaboom
   ↓
4. Kaboom loads from CDN (cached)
   ↓
5. Game shows start scene
   ↓
6. User plays game
   ↓
7. [Optional] Return to launcher
```

### Game State Management

Each game manages its own state independently:

```javascript
// Game-specific state
let score = 0;
let currentLevel = 1;
let gameStarted = false;

// Persistent settings (localStorage)
localStorage.setItem('abc-difficulty', 'medium');
localStorage.setItem('abc-selectedLetters', 'ABCDEF');
```

**State Characteristics**:
- No global state across games
- No backend/database
- LocalStorage for settings only
- Session state resets on reload

## Communication Patterns

### Game ↔ Launcher

Currently: Minimal communication
- Launcher loads game in iframe/new page
- Game can link back to launcher

Future: PostMessage API
```javascript
// Game → Launcher
window.parent.postMessage({
    type: 'game-complete',
    score: 100,
    time: 120
}, '*');

// Launcher receives
window.addEventListener('message', (event) => {
    if (event.data.type === 'game-complete') {
        // Handle completion
    }
});
```

### Game ↔ Shared Utils

Direct import/include:
```html
<script src="../../shared/ui-components.js"></script>
<script src="game.js"></script>
```

```javascript
// game.js can now use shared functions
const playBtn = createButton('PLAY', vec2(400, 300), 'green', () => {
    go('game');
});
```

## Performance Considerations

### Optimization Strategies

1. **Lazy Loading**: Games load only when selected
2. **CDN Caching**: Kaboom.js cached by browser
3. **Object Pooling**: Reuse game objects (letters, particles)
4. **Culling**: Destroy off-screen objects
5. **Throttling**: Limit spawn rates

### Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| Initial Load | < 3s | ~1s |
| Game Load | < 2s | ~1s |
| Frame Rate | 60 FPS | 60 FPS |
| Memory | < 100MB | ~50MB |
| Bundle Size | < 500KB | ~200KB |

### Mobile Optimization

- Responsive design (320px - 2560px)
- Touch-friendly targets (44x44px minimum)
- Reduced particles on mobile
- Simplified physics if needed

## Security

### Current Security Measures

1. **No Backend**: No server-side vulnerabilities
2. **Static Content**: XSS limited to own code
3. **HTTPS**: Enforced by GitHub Pages
4. **CSP**: Content Security Policy headers
5. **No Auth**: No passwords to steal
6. **No Data**: Nothing to leak

### Potential Risks

| Risk | Likelihood | Mitigation |
|------|------------|-----------|
| XSS | Low | No user input stored |
| CSRF | None | No forms/auth |
| CDN Compromise | Low | Use SRI hashes |
| Data Leak | None | No data collected |

### Future Security

If adding features:
- User accounts → OAuth only
- Scores → Backend with validation
- Multiplayer → WebRTC (P2P) or secure WebSocket

## Scalability

### Current Limits

- **Games**: No hard limit, tested with 1
- **Users**: Unlimited (static hosting)
- **Traffic**: GitHub Pages handles millions
- **Storage**: 1GB repo limit (currently 2MB)

### Scaling Considerations

**If 100+ games**:
- Category-based code splitting
- Search functionality
- Pagination in launcher

**If millions of users**:
- No change needed (static site)
- CDN handles traffic
- No backend bottleneck

**If adding features**:
- User accounts → Separate backend
- Leaderboards → External service
- Real-time → P2P WebRTC

## Error Handling

### Browser Compatibility

```javascript
// Check for required features
if (!window.localStorage) {
    alert('Your browser is too old. Please upgrade.');
}

// Graceful degradation
try {
    // Optional feature
    enableParticles();
} catch (e) {
    console.warn('Particles disabled:', e);
}
```

### Game Errors

```javascript
// Kaboom error handling
onError((err) => {
    console.error('Kaboom error:', err);
    // Show user-friendly message
    add([
        text('Oops! Something went wrong.\nClick to reload.'),
        pos(width()/2, height()/2),
        anchor('center'),
        area(),
    ]).onClick(() => location.reload());
});
```

## Testing Architecture

See [testing.md](testing.md) for detailed testing information.

**Test Structure**:
- Unit tests: Not applicable (minimal logic)
- Integration tests: Puppeteer for game flows
- E2E tests: Full user scenarios
- Manual tests: Visual verification

## Deployment Architecture

See [deployment.md](deployment.md) for detailed deployment information.

**Deployment Flow**:
```
Local Dev → Git Commit → Git Push → GitHub Actions → GitHub Pages → CDN → Users
```

## Future Architecture Considerations

### Potential Enhancements

1. **Progressive Web App (PWA)**
   - Offline play
   - Add to home screen
   - Background sync

2. **Backend (optional)**
   - User accounts
   - Progress tracking
   - Leaderboards
   - Multiplayer

3. **Build System (if needed)**
   - TypeScript for type safety
   - Module bundling
   - Minification
   - Asset optimization

4. **Advanced Features**
   - Achievements system
   - Daily challenges
   - Parental dashboard
   - Analytics (privacy-first)

### Migration Paths

**If adding TypeScript**:
1. Add tsconfig.json
2. Convert files incrementally
3. Add build step
4. Update deployment

**If adding Backend**:
1. Separate backend repo
2. Deploy to Heroku/Vercel/Railway
3. Keep games static
4. API for dynamic features only

**If adding CMS**:
1. Headless CMS for game metadata
2. Games still static code
3. Content managed via UI
4. Build step to fetch content

## Conclusion

The current architecture prioritizes:
- **Simplicity**: Easy to understand and modify
- **Maintainability**: Clear structure and conventions
- **Extensibility**: Easy to add new games
- **AI-Friendly**: Well-documented for AI assistants
- **Performance**: Fast and lightweight
- **Zero Cost**: Free hosting and tools

This architecture serves the current needs well and can evolve as requirements grow.
