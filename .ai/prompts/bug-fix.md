# Prompt Template: Bug Fix

Use this template when asking an AI assistant to fix a bug.

## Template

```
There's a bug in [GAME_NAME / Component] that needs fixing.

Bug Description:
- **What's broken**: [Describe the incorrect behavior]
- **Expected behavior**: [What should happen?]
- **Actual behavior**: [What actually happens?]
- **Steps to reproduce**:
  1. [Step 1]
  2. [Step 2]
  3. [Bug occurs]
- **Affected files**: [Which files likely contain the bug?]
- **Browser/Device**: [Where does it occur? All browsers? Mobile only?]

Please:
1. Read the affected files
2. Identify the root cause
3. Fix the bug
4. Test the fix works
5. Verify existing functionality still works
6. Add a test case if missing
```

## Example 1: Game Bug

```
There's a bug in ABC Learning game that needs fixing.

Bug Description:
- **What's broken**: Letters fall too slowly on mobile devices
- **Expected behavior**: Letters should fall at the same speed on all devices
- **Actual behavior**: On mobile, letters fall at half the normal speed
- **Steps to reproduce**:
  1. Open game on iPhone Safari
  2. Start game
  3. Observe letter fall speed (noticeably slower)
- **Affected files**: games/abc-learning/game.js (gravity or spawn rate)
- **Browser/Device**: iOS Safari, Chrome on Android

Additional context:
- Desktop works fine
- Might be related to screen size or touch detection
- Gravity setting might need adjustment based on device

Please:
1. Read games/abc-learning/game.js
2. Test on mobile (or use responsive mode)
3. Identify why speed differs
4. Fix to ensure consistent speed
5. Test on both desktop and mobile
6. Update tests/games/abc-learning/ if needed
```

## Example 2: UI Bug

```
There's a bug in the launcher that needs fixing.

Bug Description:
- **What's broken**: Game cards overlap on narrow screens
- **Expected behavior**: Cards should stack vertically on mobile
- **Actual behavior**: Cards overlap and text is unreadable
- **Steps to reproduce**:
  1. Open launcher
  2. Resize browser to < 600px width
  3. Cards overlap
- **Affected files**: index.html (CSS), launcher.js
- **Browser/Device**: All browsers on mobile, narrow desktop windows

Additional context:
- Likely a CSS flexbox/grid issue
- Should be responsive
- Cards should maintain aspect ratio

Please:
1. Read index.html CSS section
2. Test at various screen widths
3. Fix responsive layout
4. Ensure works from 320px to 4K
5. Test on actual mobile device if possible
```

## Example 3: Logic Bug

```
There's a bug in ABC Learning that needs fixing.

Bug Description:
- **What's broken**: Score increases even when wrong letter is clicked
- **Expected behavior**: Score only increases for correct letters
- **Actual behavior**: Any letter click increases score
- **Steps to reproduce**:
  1. Start game
  2. Target letter shows "A"
  3. Click on "B"
  4. Score still increases
- **Affected files**: games/abc-learning/game.js (click handler)
- **Browser/Device**: All browsers

Additional context:
- Worked in previous version
- Likely introduced in recent commit
- Check letter comparison logic

Please:
1. Read games/abc-learning/game.js
2. Find the onClick handler for letters
3. Check letter comparison logic
4. Fix to only award points for correct letters
5. Test thoroughly (correct and incorrect clicks)
6. Run existing tests to verify
```

## Debugging Tips for AI

When fixing bugs:

1. **Read the code first** - Don't assume what's wrong
2. **Look for recent changes** - Check git history if bug is new
3. **Check console** - Look for JavaScript errors
4. **Test thoroughly** - Try edge cases
5. **Verify the fix** - Make sure it actually solves the problem
6. **Don't break other things** - Run all tests after fix
7. **Document if needed** - Add comments for tricky fixes

## Common Bug Categories

### Performance
- Too many objects created
- Objects not destroyed
- Memory leaks
- Slow loops

### Logic
- Off-by-one errors
- Incorrect conditionals
- Wrong variable scope
- State not reset

### UI/UX
- Responsive layout issues
- Touch vs click events
- Z-index problems
- Overlapping elements

### Browser-specific
- Safari quirks
- Mobile viewport issues
- Touch event handling
- CSS compatibility
