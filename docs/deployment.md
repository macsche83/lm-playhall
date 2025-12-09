# Deployment Guide

## Overview

L&M's Playhall is deployed to GitHub Pages, providing free static site hosting with HTTPS and CDN distribution.

## Deployment Architecture

```
Local Changes → Git Commit → Git Push → GitHub → GitHub Pages → CDN → Users
```

**Deployment Time**: ~30-60 seconds after push

## Prerequisites

- Git installed and configured
- GitHub account
- Repository access (owner or collaborator)
- GitHub CLI (optional but recommended)

## Initial Setup

### 1. Enable GitHub Pages

This was already done during initial setup, but here's how to verify or re-enable:

#### Via GitHub Website
1. Go to https://github.com/macsche83/lm-playhall
2. Click **Settings**
3. Scroll to **Pages** section
4. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **Save**

#### Via GitHub CLI
```bash
gh repo edit --enable-pages --pages-branch main --pages-path /
```

#### Via API
```bash
gh api repos/macsche83/lm-playhall/pages -X POST \
  --field 'source[branch]=main' \
  --field 'source[path]=/'
```

### 2. Verify Deployment

Check status:
```bash
gh api repos/macsche83/lm-playhall/pages
```

Should return:
```json
{
  "status": "built",
  "html_url": "https://macsche83.github.io/lm-playhall/"
}
```

## Deployment Process

### Standard Deployment

```bash
# 1. Make changes locally
# Edit files...

# 2. Test locally
python3 -m http.server 8080
# Open http://localhost:8080 and verify

# 3. Run tests
node tests/games/abc-learning/test-gameplay.js

# 4. Commit changes
git add .
git commit -m "feat: Add new feature

Detailed description of changes.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

# 5. Push to GitHub
git push origin main

# 6. Wait for deployment (~30-60 seconds)

# 7. Verify live site
open https://macsche83.github.io/lm-playhall/
```

### Deployment Workflow Diagram

```
┌─────────────────┐
│  Local Changes  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Run Tests     │ ◄── MUST PASS
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Git Commit     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Git Push      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub Actions │ (automatic)
│  Builds Site    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub Pages   │
│  Deploys        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  CDN Distributes│
│  Worldwide      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│     Users       │
│  Access Site    │
└─────────────────┘
```

## Deployment Checklist

### Before Every Deployment

- [ ] Changes tested locally
- [ ] All tests pass
- [ ] No console errors
- [ ] Mobile layout verified
- [ ] All games still work
- [ ] Links aren't broken
- [ ] Commit message is descriptive

### After Deployment

- [ ] Visit live site: https://macsche83.github.io/lm-playhall/
- [ ] Test main functionality
- [ ] Check on mobile device
- [ ] Verify no 404 errors
- [ ] Check browser console for errors

## Monitoring Deployment

### Check Build Status

```bash
# Via GitHub CLI
gh run list --limit 5

# View specific run
gh run view <run-id>

# Watch logs
gh run watch
```

### Manual Check

1. Go to: https://github.com/macsche83/lm-playhall/actions
2. Look for latest workflow run
3. Green ✅ = Success
4. Red ❌ = Failed (check logs)

## Rollback

### If Deployment Breaks

**Option 1: Revert Last Commit**
```bash
# Revert the breaking commit
git revert HEAD

# Push revert
git push origin main

# Wait for redeployment
```

**Option 2: Reset to Previous Commit**
```bash
# Find the last working commit
git log --oneline

# Reset to that commit (example: abc1234)
git reset --hard abc1234

# Force push (WARNING: destructive)
git push --force origin main
```

**Option 3: Cherry-pick Fix**
```bash
# If fix is ready on another branch
git cherry-pick <commit-hash>
git push origin main
```

## Deployment Configuration

### .gitignore

Ensure these are NOT deployed:
```
node_modules/
.claude/
*.png
.DS_Store
npm-debug.log
```

Current `.gitignore`:
```bash
cat .gitignore
```

### Files Deployed

Only these are deployed to production:
- `index.html` - Launcher
- `launcher.js` - Launcher logic
- `games/` - All game directories
- `shared/` - Shared utilities
- `README.md` - Project docs
- `.ai/` - AI context
- `docs/` - Documentation

NOT deployed:
- `node_modules/` - Dev dependencies
- `tests/` - Test files
- `.claude/` - Local config
- `*.png` - Screenshots

## Environment-Specific Config

### Development
```javascript
const IS_DEV = window.location.hostname === 'localhost';

if (IS_DEV) {
    console.log('Running in development mode');
    // Enable debug features
}
```

### Production
```javascript
const IS_PROD = window.location.hostname === 'macsche83.github.io';

if (IS_PROD) {
    // Disable debug features
    // Enable analytics (future)
}
```

## Custom Domain (Optional)

### Setup Custom Domain

1. Buy a domain (example.com)
2. Add CNAME record:
   ```
   Type: CNAME
   Name: www (or @)
   Value: macsche83.github.io
   ```
3. In GitHub repo settings → Pages:
   - Add custom domain: `www.example.com`
   - Enable HTTPS

4. Update all references in code

## Performance Optimization

### CDN Caching

GitHub Pages uses Fastly CDN:
- Static assets cached automatically
- Cache TTL: 10 minutes default
- Global edge locations

### Cache Headers

GitHub Pages sets these automatically:
```
Cache-Control: max-age=600
```

### Force Cache Refresh

If users see old version:
1. Hard refresh: `Cmd+Shift+R` / `Ctrl+Shift+R`
2. Or wait 10 minutes
3. Or clear browser cache

## Deployment Frequency

### Recommended

- **Minor changes**: Deploy immediately
- **New games**: After thorough testing
- **Bug fixes**: ASAP
- **Major refactors**: After extensive testing

### Best Practices

- Deploy small, frequent changes
- Test before every deploy
- Deploy during low-traffic times (if applicable)
- Monitor after deployment

## Troubleshooting

### Deployment Fails

```bash
# Check git status
git status

# Check for large files (>100MB limit)
find . -type f -size +50M

# Check for sensitive data
git log --all --full-history -- path/to/file
```

### Site Shows Old Version

1. Check deployment completed:
   ```bash
   gh api repos/macsche83/lm-playhall/pages
   ```

2. Clear browser cache

3. Try incognito mode

4. Check CDN cache (wait 10 minutes)

### 404 Errors

- Check file paths are correct
- Verify files are committed and pushed
- Check `.gitignore` isn't excluding needed files
- Ensure file names match exactly (case-sensitive)

### Slow Loading

- Check file sizes (images, scripts)
- Verify CDN is being used
- Test from different locations
- Check browser DevTools Network tab

## Deployment Logs

### GitHub Actions Logs

View deployment logs:
```bash
gh run list
gh run view <run-id>
gh run view <run-id> --log
```

### Access Logs

Not available on GitHub Pages free tier. Use Google Analytics or similar if needed (privacy considerations).

## Security

### HTTPS

- Enabled by default
- Enforced by GitHub Pages
- Certificate auto-renewed

### Headers

GitHub Pages sets secure headers:
- `Strict-Transport-Security`
- `X-Content-Type-Options`
- `X-Frame-Options`

### No Secrets

Never commit:
- API keys
- Passwords
- Private keys
- `.env` files

## Continuous Deployment (Future)

### Automated Testing

Create `.github/workflows/test.yml`:
```yaml
name: Test and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '20'
      - run: npm install
      - run: npm test
```

### Deploy Previews (PR)

For pull request previews:
```yaml
- name: Deploy Preview
  uses: rossjrw/pr-preview-action@v1
  with:
    source-dir: ./
```

## Deployment Metrics

### What to Monitor

- Build success rate
- Deployment time
- Error rates (4xx, 5xx)
- Page load time
- Mobile performance

### Tools (Optional)

- Google Analytics
- Vercel Analytics
- Sentry (error tracking)
- WebPageTest (performance)

## Alternative Deployment Options

### Vercel

```bash
npm i -g vercel
vercel deploy
```

Pros: Faster deployments, better analytics
Cons: More complex, not free at scale

### Netlify

```bash
npm i -g netlify-cli
netlify deploy
```

Pros: Form handling, serverless functions
Cons: More complex setup

### GitHub Pages (Current)

Pros: Simple, free, integrated
Cons: Slower, fewer features

**Recommendation**: Stick with GitHub Pages unless you need advanced features.

## Deployment Commands Reference

```bash
# Check deployment status
gh api repos/macsche83/lm-playhall/pages

# View recent deployments
gh run list --limit 5

# Deploy (just push)
git push origin main

# Force redeploy (empty commit)
git commit --allow-empty -m "Trigger rebuild"
git push origin main

# Rollback
git revert HEAD
git push origin main
```

## Summary

**Deployment is simple:**
1. Test locally ✅
2. Commit changes ✅
3. Push to GitHub ✅
4. Wait 30-60 seconds ✅
5. Verify live site ✅

**Live URL**: https://macsche83.github.io/lm-playhall/

Happy deploying! 🚀
