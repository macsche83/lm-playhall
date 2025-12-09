# 🎮 L&M's Playhall

A collection of educational browser games designed to help children learn, focus, and relax through interactive play.

## 🌟 Features

- **Educational**: Games that teach real skills
- **Safe**: No ads, no tracking, no data collection
- **Accessible**: Works on desktop and mobile browsers
- **Free**: No cost, no subscriptions
- **Open Source**: Built with love, shared with the community

## 🎯 Game Categories

### 📚 Learning
Games that teach foundational skills like letters, numbers, shapes, and colors.

### 🎯 Focus
Games that improve concentration, memory, and attention.

### 🧘 Relaxation
Games that promote calm, mindfulness, and stress relief.

## 🎲 Available Games

### ABC Learning
**Status**: ✅ Live
**Age**: 3-6 years
**Skills**: Letter recognition, alphabet learning, hand-eye coordination

Catch falling letters to learn the alphabet! Choose which letters to practice and track your progress.

[**Play Now →**](https://macsche83.github.io/lm-playhall/games/abc-learning/)

---

**More games coming soon!** See the [game catalog](docs/game-catalog.md) for planned games.

## 🚀 Quick Start

### Play Online
Visit: **https://macsche83.github.io/lm-playhall/**

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/macsche83/lm-playhall.git
   cd lm-playhall
   ```

2. **Start a local server**
   ```bash
   # Python 3
   python3 -m http.server 8080

   # Or just open index.html in your browser
   open index.html  # macOS
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

## 📖 Documentation

- **[Architecture](ARCHITECTURE.md)** - System design and technical overview
- **[Contributing](CONTRIBUTING.md)** - How to contribute games or code
- **[Development Guide](docs/development.md)** - Setup and development workflow
- **[Adding Games](docs/adding-games.md)** - Step-by-step guide to create games
- **[Game Catalog](docs/game-catalog.md)** - Complete list of all games
- **[Testing Guide](docs/testing.md)** - How to write and run tests
- **[Deployment Guide](docs/deployment.md)** - How deployment works

### For AI Assistants
- **[.ai/context.md](.ai/context.md)** - Project vision and context
- **[.ai/architecture.md](.ai/architecture.md)** - Architecture for AI
- **[.ai/conventions.md](.ai/conventions.md)** - Coding standards
- **[.ai/prompts/](.ai/prompts/)** - Prompt templates

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Game Engine**: [Kaboom.js](https://kaboomjs.com/) 3000.0.1
- **Testing**: Puppeteer
- **Hosting**: GitHub Pages
- **Deployment**: Git + GitHub CLI

## 🎨 Project Structure

```
├── games/              # All games
│   └── abc-learning/   # Each game in own directory
├── shared/             # Shared utilities
├── docs/               # Documentation
├── tests/              # All tests
├── index.html          # Game launcher
└── launcher.js         # Launcher logic
```

## 🤝 Contributing

We welcome contributions! Whether you want to:
- 🎮 Add a new game
- 🐛 Fix a bug
- 📚 Improve documentation
- ✨ Suggest features

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. Fork the repository
2. Create a branch: `git checkout -b feat/my-game`
3. Make your changes
4. Test locally
5. Commit: `git commit -m "feat: Add my game"`
6. Push: `git push origin feat/my-game`
7. Create a Pull Request

## 📝 License

ISC License - see LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Kaboom.js](https://kaboomjs.com/)
- Hosted on [GitHub Pages](https://pages.github.com/)
- AI assistance from [Claude](https://claude.ai/)

## 📧 Contact

- **GitHub**: [@macsche83](https://github.com/macsche83)
- **Issues**: [GitHub Issues](https://github.com/macsche83/lm-playhall/issues)
- **Discussions**: [GitHub Discussions](https://github.com/macsche83/lm-playhall/discussions)

## 🚦 Status

- **Version**: 1.0.0
- **Games**: 1 live, 6+ planned
- **Status**: ✅ Active development
- **Last Updated**: December 2025

## 🗺️ Roadmap

### Q1 2026
- [ ] Add 2 more learning games (numbers, shapes)
- [ ] Add 1 focus game (memory)
- [ ] Improve mobile experience
- [ ] Add sound effects

### Q2 2026
- [ ] Add relaxation games
- [ ] Multi-language support
- [ ] Achievement system
- [ ] Parent/teacher dashboard

### Future
- [ ] Offline PWA support
- [ ] Multiplayer games
- [ ] Custom game creator
- [ ] Analytics dashboard

## ❤️ Built For

This project is built with love for kids and families. The goal is to create quality educational games that are:
- Free and accessible to all
- Safe and privacy-respecting
- Fun and engaging
- Actually educational

---

**Play now at: https://macsche83.github.io/lm-playhall/**

Enjoy! 🎉
