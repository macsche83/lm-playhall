# Architecture - Quick Reference

> For detailed architecture documentation, see [docs/architecture.md](docs/architecture.md)

## Overview

L&M's Playhall is a collection of educational browser games built with simplicity and extensibility in mind.

## Structure

```
├── games/              # Self-contained games
│   └── abc-learning/   # Each game in own directory
├── shared/             # Shared utilities
├── index.html          # Game launcher
├── launcher.js         # Launcher logic
└── docs/               # Documentation
```

## Key Design Decisions

1. **No Build Step**: Simple HTML/JS/CSS for fast iteration
2. **Kaboom.js**: 2D game engine, perfect for educational games
3. **Self-Contained Games**: Each game is independent
4. **GitHub Pages**: Free, simple deployment
5. **AI-Friendly**: Well-documented for AI assistants

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Game Engine**: Kaboom.js 3000.0.1
- **Testing**: Puppeteer
- **Hosting**: GitHub Pages
- **Deployment**: Git + GitHub CLI

## Game Architecture

Each game follows this pattern:

```javascript
kaboom({
    width: 800,
    height: 600,
    background: [r, g, b],
    root: document.getElementById("game-container"),
});

scene("start", () => { /* Menu */ });
scene("game", () => { /* Gameplay */ });
scene("pause", () => { /* Pause menu */ });

go("start");
```

## Data Flow

```
Launcher → Game Selection → Game Load → Kaboom Init → Game Scenes
```

- No backend
- No cross-game state
- LocalStorage for settings
- All client-side

## Adding Games

1. Create `games/[name]/` directory
2. Add `game.js` and `index.html`
3. Update `launcher.js`
4. Create tests
5. Update documentation

See [docs/adding-games.md](docs/adding-games.md) for detailed guide.

## Performance

- Target: 60 FPS
- Load time: < 3 seconds
- Mobile-first design
- Object culling and pooling

## Security

- Static site only
- No user data collection
- HTTPS enforced
- No authentication needed

## Documentation

- **AI Context**: [.ai/](.ai/) - For AI assistants
- **Developer Docs**: [docs/](docs/) - For humans
- **Game Catalog**: [docs/game-catalog.md](docs/game-catalog.md)
- **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)

## Quick Links

- [Development Guide](docs/development.md)
- [Testing Guide](docs/testing.md)
- [Deployment Guide](docs/deployment.md)
- [Adding Games](docs/adding-games.md)

## Live Site

https://macsche83.github.io/lm-playhall/
