# Project Workflow & Ticketing System

## Overview

L&M's Playhall uses GitHub's built-in project management tools for tracking work from ideation to deployment.

## System Components

1. **GitHub Issues** - Individual tasks and tickets
2. **GitHub Projects** - Kanban board for visual workflow
3. **Issue Templates** - Standardized ticket creation
4. **Labels** - Categorization and workflow stages

## Workflow Stages

Every ticket moves through these stages:

```
🔵 Ideation → 🟡 Refinement → 🟠 Planning → 🟣 Implementing → 🟢 Testing → 🔵 Deploying → ⚪ Documenting → ✅ Done
```

### Stage Descriptions

| Stage | Label | Description | Activities |
|-------|-------|-------------|-----------|
| **Ideation** | `stage: ideation` | New ideas being discussed | Brainstorm, gather feedback, validate concept |
| **Refinement** | `stage: refinement` | Defining requirements | Write detailed requirements, acceptance criteria |
| **Planning** | `stage: planning` | Implementation planning | Technical design, break into subtasks, estimate effort |
| **Implementing** | `stage: implementing` | Active development | Write code, create game, build features |
| **Testing** | `stage: testing` | Being tested | Run tests, fix bugs, QA review |
| **Deploying** | `stage: deploying` | Ready to deploy | Merge to main, deploy to production |
| **Documenting** | `stage: documenting` | Needs documentation | Write/update docs, add examples |
| **Done** | `stage: done` | Completed | Closed and deployed |

## Issue Types

### 🎮 New Game

**Use when**: Proposing a new educational game

**Template**: `.github/ISSUE_TEMPLATE/new-game.yml`

**Required info**:
- Game name and description
- Category (Learning/Focus/Relaxation)
- Target age group
- Learning goals
- Core mechanic
- Win condition

**Example**:
```
Title: [GAME] Number Catch
Labels: type: game, category: learning, stage: ideation
```

### ✨ Feature Request

**Use when**: Suggesting enhancements to existing functionality

**Template**: `.github/ISSUE_TEMPLATE/feature.yml`

**Required info**:
- Feature name
- Problem it solves
- Proposed solution
- User story
- Affected areas

**Example**:
```
Title: [FEATURE] Add difficulty levels to ABC Learning
Labels: type: feature, stage: ideation
```

### 🐛 Bug Report

**Use when**: Something is broken or not working correctly

**Template**: `.github/ISSUE_TEMPLATE/bug.yml`

**Required info**:
- Bug description
- Expected vs actual behavior
- Steps to reproduce
- Browser/device
- Frequency and severity

**Example**:
```
Title: [BUG] Letters don't fall on mobile Safari
Labels: type: bug, stage: refinement, priority: high
```

### 📚 Documentation

**Use when**: Improving or adding documentation

**Template**: `.github/ISSUE_TEMPLATE/documentation.yml`

**Required info**:
- Documentation type (new, update, fix, etc.)
- Files affected
- What needs improvement
- Proposed changes

**Example**:
```
Title: [DOCS] Add mobile testing guide
Labels: type: docs, stage: ideation
```

## Label System

### Stage Labels (Workflow)

- `stage: ideation` 🔵 - New ideas
- `stage: refinement` 🟡 - Defining scope
- `stage: planning` 🟠 - Technical planning
- `stage: implementing` 🟣 - In development
- `stage: testing` 🟢 - Being tested
- `stage: deploying` 🔵 - Deploying
- `stage: documenting` ⚪ - Needs docs
- `stage: done` ✅ - Complete

### Type Labels (What)

- `type: game` 🎮 - New game
- `type: feature` ✨ - New feature
- `type: bug` 🐛 - Bug fix
- `type: docs` 📚 - Documentation
- `type: refactor` ♻️ - Code refactoring

### Priority Labels (When)

- `priority: high` 🔴 - Urgent, do first
- `priority: medium` 🟡 - Normal priority
- `priority: low` 🟢 - Nice to have

### Category Labels (Where)

- `category: learning` 📚 - Learning games
- `category: focus` 🎯 - Focus games
- `category: relaxation` 🧘 - Relaxation games

## Creating Issues

### Via GitHub Web UI

1. Go to: https://github.com/macsche83/lm-playhall/issues/new/choose
2. Select appropriate template
3. Fill out the form
4. Submit

### Via GitHub CLI

```bash
# Create a new game issue
gh issue create --title "[GAME] Number Catch" \
  --label "type: game,stage: ideation,category: learning" \
  --body "Game description here..."

# Create a bug report
gh issue create --title "[BUG] Letters don't fall" \
  --label "type: bug,stage: refinement,priority: high" \
  --body "Bug details here..."

# Create a feature request
gh issue create --title "[FEATURE] Difficulty levels" \
  --label "type: feature,stage: ideation" \
  --body "Feature description here..."
```

## GitHub Project Board Setup

### Create a Project Board

1. Go to: https://github.com/macsche83/lm-playhall/projects
2. Click **"New project"**
3. Choose **"Board"** template
4. Name it: "L&M's Playhall Development"
5. Click **"Create project"**

### Configure Board Columns

Set up these columns to match workflow stages:

1. **💡 Ideation** - New ideas
2. **📝 Refinement** - Being refined
3. **📋 Planning** - Being planned
4. **🔨 Implementing** - In development
5. **🧪 Testing** - Being tested
6. **🚀 Deploying** - Ready to deploy
7. **📖 Documenting** - Needs docs
8. **✅ Done** - Completed

### Automate Board

GitHub Projects (beta) can automatically move issues based on labels:

**Automation rules** (set in Project settings):
- When issue gets `stage: implementing` → Move to "Implementing"
- When issue gets `stage: testing` → Move to "Testing"
- When issue gets `stage: done` → Move to "Done"
- When issue is closed → Move to "Done"

## Workflow Examples

### Example 1: New Game (Full Cycle)

```
1. IDEATION
   - Create issue: "[GAME] Number Catch"
   - Labels: type: game, stage: ideation, category: learning
   - Discuss concept in comments
   - Get feedback from community

2. REFINEMENT
   - Update label: stage: refinement
   - Define detailed requirements
   - Write learning goals
   - Specify acceptance criteria

3. PLANNING
   - Update label: stage: planning
   - Create technical design
   - Break into subtasks:
     * [TASK] Create game.js structure
     * [TASK] Implement number spawning
     * [TASK] Add scoring logic
     * [TASK] Create tests
   - Estimate effort: 2-3 days

4. IMPLEMENTING
   - Update label: stage: implementing
   - Assign to developer
   - Create branch: feat/number-catch
   - Write code following conventions
   - Make commits referencing issue #

5. TESTING
   - Update label: stage: testing
   - Write tests
   - Test on desktop and mobile
   - Fix any bugs found
   - Request code review

6. DEPLOYING
   - Update label: stage: deploying
   - Merge PR to main
   - Push to GitHub
   - Wait for GitHub Pages deployment
   - Verify on live site

7. DOCUMENTING
   - Update label: stage: documenting
   - Add game to launcher
   - Write game README
   - Update game catalog
   - Add to main README

8. DONE
   - Update label: stage: done
   - Close issue
   - Celebrate! 🎉
```

### Example 2: Bug Fix (Quick Cycle)

```
1. REFINEMENT (Start here for bugs)
   - Create issue: "[BUG] Letters don't fall on mobile"
   - Labels: type: bug, stage: refinement, priority: high
   - Add reproduction steps
   - Specify browser/device

2. PLANNING
   - Update label: stage: planning
   - Identify root cause
   - Plan fix approach

3. IMPLEMENTING
   - Update label: stage: implementing
   - Fix the bug
   - Test the fix

4. TESTING
   - Update label: stage: testing
   - Verify fix works
   - Test on affected devices
   - Ensure no regressions

5. DEPLOYING
   - Update label: stage: deploying
   - Deploy to production
   - Verify fix on live site

6. DONE
   - Update label: stage: done
   - Close issue
```

### Example 3: Documentation (Simple Cycle)

```
1. IDEATION
   - Create issue: "[DOCS] Add mobile testing guide"
   - Labels: type: docs, stage: ideation

2. IMPLEMENTING (Skip planning for simple docs)
   - Update label: stage: implementing
   - Write the documentation
   - Add examples and screenshots

3. TESTING (Review)
   - Update label: stage: testing
   - Have someone review for clarity
   - Fix any issues

4. DEPLOYING
   - Update label: stage: deploying
   - Merge and deploy

5. DONE
   - Update label: stage: done
   - Close issue
```

## Best Practices

### Creating Issues

✅ **Do**:
- Use appropriate templates
- Fill out all required fields
- Be specific and clear
- Add relevant labels
- Reference related issues
- Include screenshots/examples

❌ **Don't**:
- Create vague issues
- Skip the template
- Duplicate existing issues
- Forget to add labels
- Mix multiple unrelated topics

### Managing Issues

✅ **Do**:
- Update labels as work progresses
- Comment with updates
- Link related PRs
- Close when truly done
- Archive completed work

❌ **Don't**:
- Leave labels stale
- Ghost issues without updates
- Keep completed issues open
- Forget to document outcomes

### Using Labels

✅ **Do**:
- Always have a stage label
- Always have a type label
- Add priority for bugs/features
- Add category for games
- Update stage as work progresses

❌ **Don't**:
- Use conflicting labels
- Skip stage labels
- Add too many labels
- Forget to update stages

## Reporting & Metrics

### View Current Work

**All issues**:
```bash
gh issue list
```

**By stage**:
```bash
gh issue list --label "stage: implementing"
gh issue list --label "stage: testing"
```

**By type**:
```bash
gh issue list --label "type: game"
gh issue list --label "type: bug"
```

**By priority**:
```bash
gh issue list --label "priority: high"
```

### Project Health

Track these metrics:
- Open vs closed issues
- Average time in each stage
- Bug fix rate
- Feature completion rate
- Documentation coverage

## Integration with Development

### Referencing Issues in Commits

```bash
# Reference an issue
git commit -m "feat: Add number spawning #42"

# Close an issue
git commit -m "fix: Mobile letter fall speed

Fixes #42"

# Reference multiple issues
git commit -m "feat: Complete Number Catch game

Implements #42, #43, #44"
```

### Referencing Issues in PRs

```markdown
## Related Issues

- Closes #42
- Related to #43
- Depends on #41
```

## Tips & Tricks

### Filtering Issues

```bash
# Open bugs only
gh issue list --label "type: bug" --state open

# High priority items
gh issue list --label "priority: high"

# In progress work
gh issue list --label "stage: implementing"

# Games in ideation
gh issue list --label "type: game,stage: ideation"
```

### Bulk Operations

```bash
# Add label to multiple issues
gh issue edit 42 43 44 --add-label "priority: high"

# Move to next stage
gh issue edit 42 --remove-label "stage: implementing" \
  --add-label "stage: testing"
```

### Automation Ideas

Consider setting up GitHub Actions for:
- Auto-label based on file paths
- Auto-assign based on labels
- Auto-comment on stage changes
- Auto-close stale issues
- Auto-deploy on merge

## Quick Reference

### Creating Issues

| Type | Command |
|------|---------|
| Game | `gh issue create --template new-game.yml` |
| Feature | `gh issue create --template feature.yml` |
| Bug | `gh issue create --template bug.yml` |
| Docs | `gh issue create --template documentation.yml` |

### Updating Stage

```bash
# Move to next stage
gh issue edit <number> --remove-label "stage: X" --add-label "stage: Y"
```

### Common Labels

```bash
# Stage progression
stage: ideation → refinement → planning → implementing → testing → deploying → documenting → done

# Types
type: game | feature | bug | docs | refactor

# Priorities
priority: high | medium | low

# Categories
category: learning | focus | relaxation
```

## Support

Questions about the workflow?
- Check [CONTRIBUTING.md](../CONTRIBUTING.md)
- Ask in [GitHub Discussions](https://github.com/macsche83/lm-playhall/discussions)
- Open an issue with label `type: docs`

---

**Last Updated**: 2025-12-09
**Maintained by**: macsche83
