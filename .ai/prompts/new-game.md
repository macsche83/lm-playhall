# Prompt Template: Adding a New Game

Use this template when asking an AI assistant to create a new game for L&M's Playhall.

## Template

```
I want to add a new game to L&M's Playhall called "[GAME_NAME]".

Game Details:
- **Purpose**: [What skill does it teach? Learning/Focus/Relaxation?]
- **Target Age**: [Age range]
- **Core Mechanic**: [Describe the main gameplay in 1-2 sentences]
- **Win Condition**: [How does the player succeed?]
- **Visual Style**: [Colors, theme, feel]

Requirements:
1. Follow the existing architecture in .ai/architecture.md
2. Use conventions from .ai/conventions.md
3. Create in games/[game-name]/ directory
4. Include:
   - game.js with Kaboom.js implementation
   - README.md with game documentation
   - Tests in tests/games/[game-name]/
5. Scenes needed: start, game, pause
6. Make it mobile-friendly

Similar to: [Reference an existing game if applicable]

Please:
1. Read the .ai/ documentation first
2. Create the game structure
3. Implement the game logic
4. Write tests
5. Update the game launcher to include this game
```

## Example

```
I want to add a new game to L&M's Playhall called "Number Catch".

Game Details:
- **Purpose**: Number recognition and counting (Learning)
- **Target Age**: 3-6 years old
- **Core Mechanic**: Numbers 1-10 fall from the sky. A target number is shown.
  Player clicks the matching numbers as they fall.
- **Win Condition**: Catch 10 correct numbers to advance to next number
- **Visual Style**: Colorful, playful, similar to ABC Learning but with numbers

Requirements:
1. Follow the existing architecture in .ai/architecture.md
2. Use conventions from .ai/conventions.md
3. Create in games/number-catch/ directory
4. Include:
   - game.js with Kaboom.js implementation
   - README.md with game documentation
   - Tests in tests/games/number-catch/
5. Scenes needed: start, game, pause
6. Make it mobile-friendly

Similar to: ABC Learning game (games/abc-learning/game.js)

Please:
1. Read the .ai/ documentation first
2. Create the game structure
3. Implement the game logic
4. Write tests
5. Update the game launcher to include this game
```

## Tips

- Be specific about the game mechanics
- Reference similar games in the collection
- Specify any unique features or settings
- Mention if it needs special assets
- Define success criteria clearly
