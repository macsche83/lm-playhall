# GitHub Project Setup Guide

## Quick Setup Instructions

Follow these steps to complete your project management setup:

## ✅ Already Done

- [x] Issue templates created
- [x] Labels created
- [x] Workflow documentation written

## 🔧 Manual Setup Required

### 1. Create GitHub Project Board

1. Go to: https://github.com/macsche83/lm-playhall/projects
2. Click **"New project"**
3. Choose **"Board"** view
4. Name: **"L&M's Playhall Development"**
5. Click **"Create"**

### 2. Add Board Columns

Create these columns (in order):

| Column | Description |
|--------|-------------|
| 💡 Ideation | New ideas being discussed |
| 📝 Refinement | Defining requirements |
| 📋 Planning | Implementation planning |
| 🔨 Implementing | Active development |
| 🧪 Testing | Being tested |
| 🚀 Deploying | Ready to deploy |
| 📖 Documenting | Needs documentation |
| ✅ Done | Completed |

### 3. Configure Automation (Optional)

In Project Settings → Workflows:

**Auto-add items**:
- When an issue is opened → Add to project
- When a PR is opened → Add to project

**Auto-move items**:
- When issue gets label `stage: implementing` → Move to "🔨 Implementing"
- When issue gets label `stage: testing` → Move to "🧪 Testing"
- When issue gets label `stage: done` → Move to "✅ Done"
- When issue is closed → Move to "✅ Done"

### 4. Enable GitHub Discussions (Optional)

1. Go to: https://github.com/macsche83/lm-playhall/settings
2. Scroll to **"Features"**
3. Check **"Discussions"**
4. Click **"Set up discussions"**

This provides a space for:
- Q&A
- Ideas and brainstorming
- Show and tell
- Announcements

### 5. Test the System

Create a test issue to verify everything works:

```bash
gh issue create \
  --title "[GAME] Test Game" \
  --label "type: game,stage: ideation,category: learning" \
  --body "This is a test issue to verify the ticketing system."
```

Then:
1. Check it appears in your Project board
2. Update the label to `stage: planning`
3. Verify it moves columns (if automation is set up)
4. Close the issue
5. Verify it moves to "Done"

## 📚 Documentation

Full workflow documentation: [docs/workflow.md](../docs/workflow.md)

## 🎯 Using the System

### Create New Issues

**Via Web UI**:
https://github.com/macsche83/lm-playhall/issues/new/choose

**Via CLI**:
```bash
# New game
gh issue create --template new-game.yml

# Feature request
gh issue create --template feature.yml

# Bug report
gh issue create --template bug.yml

# Documentation
gh issue create --template documentation.yml
```

### View Issues

```bash
# All open issues
gh issue list

# By stage
gh issue list --label "stage: implementing"

# By priority
gh issue list --label "priority: high"

# By type
gh issue list --label "type: game"
```

### Update Issue Stage

```bash
# Move to next stage
gh issue edit <number> \
  --remove-label "stage: ideation" \
  --add-label "stage: refinement"
```

## 🏷️ Available Labels

### Stages
- `stage: ideation` - New ideas
- `stage: refinement` - Defining scope
- `stage: planning` - Technical planning
- `stage: implementing` - In development
- `stage: testing` - Being tested
- `stage: deploying` - Deploying
- `stage: documenting` - Needs docs
- `stage: done` - Complete

### Types
- `type: game` - New game
- `type: feature` - New feature
- `type: bug` - Bug fix
- `type: docs` - Documentation
- `type: refactor` - Code refactoring

### Priorities
- `priority: high` - Urgent
- `priority: medium` - Normal
- `priority: low` - Nice to have

### Categories
- `category: learning` - Learning games
- `category: focus` - Focus games
- `category: relaxation` - Relaxation games

## 🔄 Typical Workflow

```
Idea → Refine → Plan → Implement → Test → Deploy → Document → Done
```

1. **Create issue** with template
2. **Add labels** (stage, type, priority, category)
3. **Move through stages** as work progresses
4. **Reference in commits** (#issue-number)
5. **Close when complete**

## 💡 Examples

### New Game
```bash
gh issue create \
  --title "[GAME] Number Catch" \
  --label "type: game,stage: ideation,category: learning,priority: high" \
  --body "A game to teach number recognition for ages 3-6..."
```

### Bug Report
```bash
gh issue create \
  --title "[BUG] Letters don't fall on mobile" \
  --label "type: bug,stage: refinement,priority: high" \
  --body "Description of bug with reproduction steps..."
```

### Feature Request
```bash
gh issue create \
  --title "[FEATURE] Add difficulty levels" \
  --label "type: feature,stage: ideation,priority: medium" \
  --body "Add Easy/Medium/Hard difficulty options..."
```

## 🚀 Next Steps

1. Complete the manual setup steps above
2. Create your first real issue
3. Start working through your backlog
4. Update stages as you progress
5. Track your progress on the Project board

## ❓ Questions?

- Read the full guide: [docs/workflow.md](../docs/workflow.md)
- Check [CONTRIBUTING.md](../CONTRIBUTING.md)
- Ask in GitHub Discussions

---

**Setup Time**: ~10 minutes
**Last Updated**: 2025-12-09
