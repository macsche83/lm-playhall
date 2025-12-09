# Prompt Template: Refactoring

Use this template when asking an AI assistant to refactor code.

## Template

```
I want to refactor [COMPONENT/FILE] to improve [GOAL].

Refactoring Goal:
- **What**: [What code needs refactoring?]
- **Why**: [What's the problem with current code?]
- **Goal**: [What improvement are we targeting?]
  - [ ] Better readability
  - [ ] Better performance
  - [ ] Better maintainability
  - [ ] Reduce duplication
  - [ ] Simplify logic

Current Issues:
- [Issue 1]
- [Issue 2]

Constraints:
- Must maintain existing functionality
- Must pass all existing tests
- Follow conventions in .ai/conventions.md

Please:
1. Read the current code
2. Propose refactoring approach
3. Implement the refactoring
4. Verify tests still pass
5. Document any significant changes
```

## Example 1: Extract Shared Code

```
I want to refactor repeated UI code in games to a shared utility.

Refactoring Goal:
- **What**: Common UI patterns (buttons, score display, pause menus)
- **Why**: Same UI code is duplicated across multiple games
- **Goal**: Reduce duplication, easier to maintain consistent UI

Current Issues:
- Button creation code duplicated in every game
- Score display logic repeated
- Pause menu implemented slightly differently in each game
- Hard to maintain consistent styling

Target:
- Create shared/ui-components.js
- Extract common button creation
- Extract score display
- Extract pause menu
- Update all games to use shared components

Constraints:
- Must maintain existing functionality
- Must pass all existing tests
- Each game should still work independently
- Follow conventions in .ai/conventions.md

Please:
1. Read game.js files from all games
2. Identify common UI patterns
3. Create shared/ui-components.js with utilities
4. Update games to use shared code
5. Verify all games still work
6. Update docs/architecture.md
```

## Example 2: Simplify Complex Function

```
I want to refactor the letter spawning logic in ABC Learning.

Refactoring Goal:
- **What**: spawnLetter() function in games/abc-learning/game.js
- **Why**: Function is too long (100+ lines) and hard to understand
- **Goal**: Better readability and maintainability

Current Issues:
- One function does too many things
- Deep nesting (if inside if inside if)
- Hard to test individual parts
- Unclear variable names

Target:
- Break into smaller functions:
  - getRandomPosition()
  - createLetterObject()
  - attachLetterBehavior()
  - spawnLetter() (orchestrates the above)
- Improve variable names
- Add comments for complex logic

Constraints:
- Must maintain exact same behavior
- Must pass all existing tests
- Follow conventions in .ai/conventions.md

Please:
1. Read games/abc-learning/game.js
2. Analyze spawnLetter() function
3. Break into smaller, focused functions
4. Improve naming and structure
5. Add clarifying comments
6. Verify tests pass and game works identically
```

## Example 3: Improve Performance

```
I want to refactor ABC Learning to improve performance on mobile.

Refactoring Goal:
- **What**: Game loop and object creation in ABC Learning
- **Why**: Game lags on older mobile devices
- **Goal**: Improve performance, maintain 60fps

Current Issues:
- Too many letters on screen at once (50+)
- Letters not destroyed when off-screen
- Particle effects too intensive
- Checking every letter every frame

Target:
- Limit max letters on screen (20-30)
- Destroy off-screen letters
- Reduce particle effects on mobile
- Optimize collision detection
- Use object pooling if needed

Constraints:
- Must maintain gameplay feel
- Must pass all existing tests
- Should work on iPhone 8+ and Android equivalents
- Follow conventions in .ai/conventions.md

Please:
1. Read games/abc-learning/game.js
2. Profile performance (if possible)
3. Implement optimizations
4. Test on mobile or responsive mode
5. Verify smooth 60fps gameplay
6. Document performance improvements
```

## Refactoring Best Practices

### Before Refactoring
- [ ] Run all tests (confirm they pass)
- [ ] Understand the current code fully
- [ ] Identify specific issues to fix
- [ ] Have clear success criteria

### During Refactoring
- [ ] Make small, incremental changes
- [ ] Test after each change
- [ ] Commit working states
- [ ] Don't add new features (refactor only)

### After Refactoring
- [ ] All tests pass
- [ ] Functionality is identical
- [ ] Code is clearer/faster/better
- [ ] Documentation updated if needed

### Red Flags

Avoid these refactoring mistakes:
- ❌ Changing behavior while refactoring
- ❌ Making changes without testing
- ❌ Over-engineering simple code
- ❌ Breaking existing tests
- ❌ Not following project conventions

### When NOT to Refactor

Don't refactor if:
- Code works and is clear enough
- No tests exist (write tests first)
- Under time pressure (fix bugs first)
- Major changes planned (wait for rewrite)

## Testing Your Refactor

```javascript
// Before refactoring
function oldImplementation() { /* ... */ }

// After refactoring
function newImplementation() { /* ... */ }

// Verify identical behavior
console.assert(
    oldImplementation() === newImplementation(),
    "Refactor changed behavior!"
);
```

Always verify:
1. Same inputs → same outputs
2. Same side effects
3. Same error handling
4. Same performance (or better)
