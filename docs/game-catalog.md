# Game Catalog

## Overview

This document catalogs all games in L&M's Playhall, their purpose, features, and status.

## Games by Category

### Learning 📚

#### ABC Learning
- **Status**: ✅ Production
- **Version**: 1.0.0
- **Path**: `games/abc-learning/`
- **Description**: Letter recognition and alphabet learning game
- **Target Age**: 3-6 years
- **Skills**: Letter identification, hand-eye coordination, focus
- **Features**:
  - Letter selection (practice specific letters)
  - Progress tracking
  - Pause menu
  - Settings customization
- **Controls**: Click/Touch
- **Last Updated**: 2025-11-30

### Focus 🎯

_Coming soon..._

### Relaxation 🧘

_Coming soon..._

## Game Details

### ABC Learning

**Learning Objectives**:
- Recognize letters A-Z
- Associate letter shapes with names
- Develop clicking/tapping accuracy
- Build sustained attention

**Gameplay**:
1. Target letter is displayed at top
2. Letters fall from the sky with gravity
3. Player clicks the matching letter
4. Score increases for correct letters
5. Progress bar fills after 10 correct hits
6. Advance to next letter in sequence

**Settings**:
- **Letter Selection**: Choose which letters to practice (A-F, A-Z, custom)
- All letters selected by default
- Useful for beginners to focus on a subset

**Difficulty**: Fixed (future: add difficulty levels)

**Performance**:
- Target: 60 FPS
- Max objects: ~20 letters on screen
- Works on: Desktop, tablet, mobile

**Known Issues**:
- None currently

**Future Enhancements**:
- Difficulty levels (Easy/Medium/Hard)
- Sound effects
- Voice pronunciation
- Lowercase letters mode
- Timed challenges
- Two-player mode

**Testing**: 6/7 tests passing (test-body-component.js has pre-existing issue)

---

## Adding New Games

See [adding-games.md](adding-games.md) for a guide on how to add new games to this catalog.

## Game Status Legend

- ✅ **Production**: Live and stable
- 🚧 **In Development**: Being built
- 🧪 **Testing**: In testing phase
- 📝 **Planned**: Approved, not started
- 💡 **Proposed**: Idea stage
- ⏸️ **Paused**: Development on hold
- 🗄️ **Archived**: No longer maintained

## Planned Games

### Number Catch 🔢
- **Status**: 💡 Proposed
- **Category**: Learning
- **Target Age**: 3-6 years
- **Skills**: Number recognition, counting
- **Description**: Similar to ABC Learning but with numbers 1-10
- **Priority**: High

### Shape Matcher 🔷
- **Status**: 💡 Proposed
- **Category**: Learning
- **Target Age**: 3-5 years
- **Skills**: Shape recognition, matching
- **Description**: Match falling shapes with target shape
- **Priority**: Medium

### Color Quest 🎨
- **Status**: 💡 Proposed
- **Category**: Learning
- **Target Age**: 2-5 years
- **Skills**: Color recognition, color names
- **Description**: Click objects of the target color
- **Priority**: Medium

### Memory Match 🃏
- **Status**: 💡 Proposed
- **Category**: Focus
- **Target Age**: 5-12 years
- **Skills**: Memory, concentration
- **Description**: Classic card matching game
- **Priority**: Medium

### Breathing Buddy 🫁
- **Status**: 💡 Proposed
- **Category**: Relaxation
- **Target Age**: All ages
- **Skills**: Breathing technique, calm
- **Description**: Guided breathing exercises with visual feedback
- **Priority**: Low

### Calm Coloring 🖍️
- **Status**: 💡 Proposed
- **Category**: Relaxation
- **Target Age**: 5+ years
- **Skills**: Fine motor, relaxation, creativity
- **Description**: Simple coloring activity
- **Priority**: Low

## Game Metrics

### Current Stats (as of 2025-12-09)

| Metric | Value |
|--------|-------|
| Total Games | 1 |
| Learning Games | 1 |
| Focus Games | 0 |
| Relaxation Games | 0 |
| In Production | 1 |
| In Development | 0 |
| Planned | 6 |

### Goals

**Q1 2026**:
- [ ] 3 Learning games
- [ ] 1 Focus game
- [ ] 1 Relaxation game

**Q2 2026**:
- [ ] 5 Learning games
- [ ] 2 Focus games
- [ ] 2 Relaxation games

## Game Requirements

All games must meet these requirements:

### Technical
- [ ] Built with Kaboom.js 3000.0.1
- [ ] Works on mobile (375x667) and desktop (800x600+)
- [ ] Runs at 60 FPS
- [ ] Loads in < 3 seconds
- [ ] No console errors

### User Experience
- [ ] Clear instructions
- [ ] Intuitive controls
- [ ] Visual feedback for actions
- [ ] Appropriate for target age
- [ ] Educational value

### Code Quality
- [ ] Follows conventions in `.ai/conventions.md`
- [ ] Self-contained in `games/[name]/` directory
- [ ] Has README.md with documentation
- [ ] Has tests in `tests/games/[name]/`
- [ ] Uses shared utilities where appropriate

### Documentation
- [ ] Listed in this catalog
- [ ] README in game directory
- [ ] Updated launcher with game card
- [ ] Tests documented

## Game Ideas (Brainstorm)

**Learning**:
- Math Facts (addition, subtraction)
- Sight Words
- Rhyming Words
- Animal Sounds
- Clock Reading
- Money Counting

**Focus**:
- Simon Says
- Sequence Memory
- Find the Difference
- Attention Training
- Reaction Time
- Pattern Recognition

**Relaxation**:
- Zen Garden
- Star Gazing
- Rain Sounds
- Bubble Pop
- Peaceful Scenes
- Guided Meditation

## Community Contributions

Want to contribute a game? See [CONTRIBUTING.md](../CONTRIBUTING.md) for guidelines.

**Current Contributors**:
- macsche83 (ABC Learning)

## Maintenance Schedule

### Monthly
- Review all games for bugs
- Update dependencies if needed
- Check mobile compatibility

### Quarterly
- Performance audit
- User feedback review
- Plan new games

### Yearly
- Major version updates
- Architecture review
- Feature enhancements

## Archive

_No archived games yet._

---

**Last Updated**: 2025-12-09
**Maintained by**: macsche83
**Contact**: via GitHub issues
