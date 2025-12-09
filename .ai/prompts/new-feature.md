# Prompt Template: Adding a Feature

Use this template when asking an AI assistant to add a feature to an existing game or the launcher.

## Template

```
I want to add [FEATURE_NAME] to [GAME_NAME / Launcher].

Feature Description:
- **What**: [Brief description of the feature]
- **Why**: [What problem does it solve?]
- **Where**: [Which file(s) need changes?]
- **User Story**: As a [user type], I want to [action] so that [benefit]

Requirements:
1. Follow conventions in .ai/conventions.md
2. Maintain existing architecture
3. Don't break existing functionality
4. Update tests if needed
5. Update documentation

Please:
1. Read the relevant files first
2. Implement the feature
3. Test it works
4. Update any affected documentation
```

## Example 1: Game Feature

```
I want to add difficulty levels to ABC Learning game.

Feature Description:
- **What**: Add Easy/Medium/Hard difficulty settings
- **Why**: Allow players to adjust game speed to their skill level
- **Where**: games/abc-learning/game.js (settings scene)
- **User Story**: As a parent, I want to adjust difficulty so my child
  can start easy and progress when ready

Difficulty should affect:
- Easy: Slow letter fall speed, more time to click
- Medium: Normal speed (current)
- Hard: Fast speed, more letters on screen

Requirements:
1. Follow conventions in .ai/conventions.md
2. Maintain existing architecture
3. Don't break existing functionality
4. Update tests if needed
5. Update games/abc-learning/README.md

Please:
1. Read games/abc-learning/game.js first
2. Add difficulty to settings scene
3. Apply difficulty settings in game scene
4. Test all three levels
5. Update README with new feature
```

## Example 2: Launcher Feature

```
I want to add game categories to the launcher.

Feature Description:
- **What**: Filter games by category (Learning, Focus, Relaxation)
- **Why**: Help users find the right type of game quickly
- **Where**: launcher.js and index.html
- **User Story**: As a user, I want to filter games by category so I can
  find games that match my current need

Requirements:
1. Add category filter buttons to launcher UI
2. Each game needs a category property
3. Filter games when category is selected
4. "All" button shows all games
5. Visual indication of selected category

Please:
1. Read launcher.js and index.html first
2. Implement category filtering
3. Update game metadata to include categories
4. Test filtering works correctly
5. Update docs/development.md with new game metadata field
```

## Tips

- Describe the feature clearly
- Explain the user benefit
- Specify exact files to modify
- Include acceptance criteria
- Mention any edge cases
