# ABC Learning

An educational game to help children learn letter recognition and the alphabet through interactive gameplay.

## Learning Goals

- **Letter Recognition**: Identify letters A-Z by shape
- **Letter Names**: Associate letter shapes with their names
- **Hand-Eye Coordination**: Develop clicking/tapping accuracy
- **Sustained Attention**: Build focus through progressive challenges
- **Sequential Learning**: Master letters in order

## How to Play

1. A target letter is displayed at the top (e.g., "Find: A")
2. Letters fall from the sky like rain
3. Click or tap the matching letter before it falls off screen
4. Score points for each correct letter
5. Progress bar fills after 10 correct hits
6. Advance to the next letter in the alphabet

## Controls

- **Click/Touch**: Click or tap on falling letters
- **Settings Button**: Customize which letters to practice
- **Pause Button**: Pause the game (appears during gameplay)

## Settings

### Letter Selection
Choose which letters to practice:
- **All Letters**: A-Z (default)
- **Beginners**: A-F (just starting)
- **Custom**: Select specific letters

Perfect for:
- Introducing letters one at a time
- Practicing specific problem letters
- Gradual difficulty progression

## Features

- ✅ Interactive letter catching gameplay
- ✅ Progress tracking with visual progress bar
- ✅ Customizable letter selection
- ✅ Pause functionality
- ✅ Mobile-friendly design
- ✅ No ads or tracking

## Target Age

3-6 years old

Primary audience: Preschool and kindergarten children learning the alphabet.

## Technical Details

- **Framework**: Kaboom.js 3000.0.1
- **Language**: JavaScript (ES6+)
- **Version**: 1.0.0
- **Status**: ✅ Production
- **Performance**: 60 FPS, ~50MB memory
- **Compatibility**: Desktop and mobile browsers

## Game Scenes

### Start Scene
- Game title and instructions
- PLAY button
- SETTINGS button

### Settings Scene
- Letter selection grid (A-Z)
- Select/deselect letters
- START GAME button

### Game Scene
- Target letter display
- Falling letters
- Score counter
- Progress bar
- MENU button (pause)

### Pause Scene
- RESUME button
- MAIN MENU button

## Development

- **Created**: 2025-11-28
- **Last Updated**: 2025-12-09
- **Author**: macsche83
- **Version**: 1.0.0

## Testing

Tests located in: `tests/games/abc-learning/`

Run tests:
```bash
# Start server
python3 -m http.server 8080 &

# Run tests
node tests/games/abc-learning/test-browser.js
node tests/games/abc-learning/test-gameplay.js
node tests/games/abc-learning/test-settings.js
node tests/games/abc-learning/test-pause-menu.js
node tests/games/abc-learning/test-positions.js
```

Test Status: 6/7 passing (test-body-component.js has known issue)

## Known Issues

- test-body-component.js fails due to Kaboom.js API issue (non-critical)

## Future Enhancements

- [ ] Difficulty levels (Easy/Medium/Hard)
- [ ] Sound effects for correct/incorrect
- [ ] Voice pronunciation of letters
- [ ] Lowercase letters mode
- [ ] Timed challenges
- [ ] Two-player competitive mode
- [ ] Letter writing practice
- [ ] Achievement badges
- [ ] Parent/teacher progress dashboard

## Play Online

https://macsche83.github.io/lm-playhall/games/abc-learning/

## Credits

Built with ❤️ for L&M's Playhall
