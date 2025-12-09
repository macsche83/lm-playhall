# Contributing to L&M's Playhall

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Quick Start

1. Read [docs/development.md](docs/development.md) for setup
2. Check [.ai/conventions.md](.ai/conventions.md) for coding standards
3. Look at existing games for examples
4. Start with a small change or new game

## Ways to Contribute

### 1. Add a New Game

Perfect for first-time contributors!

- See [docs/adding-games.md](docs/adding-games.md)
- Use [.ai/prompts/new-game.md](.ai/prompts/new-game.md) template
- Start with a simple concept
- Test thoroughly

### 2. Fix Bugs

- Check [GitHub Issues](https://github.com/macsche83/lm-playhall/issues)
- Use [.ai/prompts/bug-fix.md](.ai/prompts/bug-fix.md) template
- Include tests with fix
- Describe the bug and solution

### 3. Add Features

- Propose feature in an issue first
- Use [.ai/prompts/new-feature.md](.ai/prompts/new-feature.md) template
- Keep features simple and focused
- Update documentation

### 4. Improve Documentation

- Fix typos or unclear instructions
- Add examples
- Update screenshots
- Translate documentation (future)

### 5. Testing

- Add test coverage
- Report bugs with reproducible steps
- Test on different devices
- Improve test infrastructure

## Contribution Guidelines

### Code Standards

Follow conventions in [.ai/conventions.md](.ai/conventions.md):

**Style**:
- ES6+ JavaScript
- 4-space indentation
- Semicolons required
- camelCase for variables
- Descriptive names

**Example**:
```javascript
// Good
function getRandomLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
}

// Avoid
function grl() {
    return 'A'; // Not random, unclear name
}
```

### Commit Messages

Format:
```
<type>: <short description>

<detailed description if needed>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

**Types**:
- `feat:` New feature or game
- `fix:` Bug fix
- `docs:` Documentation
- `refactor:` Code refactoring
- `test:` Tests
- `style:` Formatting
- `chore:` Maintenance

**Examples**:
```bash
feat: Add Number Catch game

New game teaching number recognition for ages 3-6.
Includes start, game, and pause scenes.
Tests included and passing.

fix: ABC game letters not clickable on mobile

Increased touch target size from 32px to 44px.
Tested on iPhone and Android.

docs: Add mobile testing guide

Added instructions for testing on real devices
including ngrok setup.
```

### Pull Request Process

1. **Fork** the repository
2. **Create branch**: `git checkout -b feat/your-feature`
3. **Make changes**: Follow conventions
4. **Test locally**: All tests must pass
5. **Commit**: Clear, descriptive messages
6. **Push**: `git push origin feat/your-feature`
7. **Create PR**: Include description and screenshots

**PR Template**:
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New game
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation
- [ ] Other: ___

## Testing
- [ ] Tested locally
- [ ] All tests pass
- [ ] Tested on mobile
- [ ] No console errors

## Screenshots
(if applicable)

## Checklist
- [ ] Follows code conventions
- [ ] Updated documentation
- [ ] Added/updated tests
- [ ] No breaking changes
```

### Code Review

What we look for:

**Must Have**:
- ✅ Code follows conventions
- ✅ Tests pass
- ✅ No console errors
- ✅ Documentation updated
- ✅ Commit messages clear

**Nice to Have**:
- ⭐ Well-commented code
- ⭐ Performance optimized
- ⭐ Mobile-tested
- ⭐ Accessibility considered

## Development Workflow

### Setting Up

```bash
# Fork and clone
git clone https://github.com/YOUR_USERNAME/lm-playhall.git
cd lm-playhall

# Install dependencies
npm install

# Start server
python3 -m http.server 8080
```

### Making Changes

```bash
# Create branch
git checkout -b feat/my-feature

# Make changes
# Edit files...

# Test
node tests/games/abc-learning/test-browser.js

# Commit
git add .
git commit -m "feat: Add my feature"

# Push
git push origin feat/my-feature
```

### Creating PR

```bash
# Via GitHub CLI
gh pr create --title "Add my feature" --body "Description..."

# Or via web
# Go to GitHub and click "New Pull Request"
```

## Testing Requirements

### All Changes Must Include

- Unit tests (if applicable)
- Integration tests (for games)
- Manual testing checklist

### Testing Checklist

- [ ] Runs without errors
- [ ] Works on desktop (800x600+)
- [ ] Works on mobile (375x667)
- [ ] Runs at 60 FPS
- [ ] Loads in < 3 seconds
- [ ] All existing tests still pass

## Game-Specific Guidelines

### Educational Value

Games must teach or reinforce a skill:
- Clear learning objective
- Age-appropriate
- Engaging and fun
- Measurable progress

### User Experience

- Intuitive controls (no complex instructions)
- Visual feedback for all actions
- Clear win/lose conditions
- Appropriate difficulty
- Mobile-friendly

### Technical Requirements

- Built with Kaboom.js 3000.0.1
- Self-contained in `games/[name]/`
- Includes README.md
- Has tests
- No external dependencies (beyond Kaboom)

## Documentation Standards

### Code Comments

```javascript
// Good - explain WHY
// Kaboom requires body() component for collision detection
letter.add(body());

// Avoid - state the obvious
// Add a body component
letter.add(body());
```

### README Structure

Every game needs:
```markdown
# Game Name

Brief description

## Learning Goals
- What it teaches

## How to Play
- Step-by-step instructions

## Controls
- How to interact

## Settings
- Customization options

## Development
- Version, date, status
```

## Community Guidelines

### Be Respectful

- Constructive feedback only
- No discrimination
- Help others learn
- Credit contributors

### Be Patient

- Remember everyone is learning
- Explain clearly
- Link to documentation
- Offer solutions

### Be Collaborative

- Review others' PRs
- Share knowledge
- Improve documentation
- Celebrate successes

## Questions?

- Read the docs in [docs/](docs/)
- Check [.ai/](.ai/) for AI context
- Open a [GitHub Issue](https://github.com/macsche83/lm-playhall/issues)
- Reference existing games

## Recognition

Contributors are recognized in:
- [docs/game-catalog.md](docs/game-catalog.md)
- Git commit history
- GitHub contributors page

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (ISC).

## Getting Help

Stuck? Try these:

1. **Documentation**: Read [docs/development.md](docs/development.md)
2. **Examples**: Look at `games/abc-learning/`
3. **AI Assistants**: Use `.ai/prompts/` templates
4. **Issues**: Ask on GitHub
5. **External**: Kaboom.js docs, MDN

## First Contribution?

Great! Here's what to do:

1. **Easy Start**: Fix a typo in documentation
2. **Next Level**: Add a test to existing game
3. **Challenge**: Create a simple new game (Number Catch?)

Don't be shy - everyone was new once! 🚀

## Thank You!

Your contributions make L&M's Playhall better for everyone. Thank you for helping kids learn, focus, and relax through play! 🎮

---

**Last Updated**: 2025-12-09
**Maintainer**: macsche83
