# Quality Assurance Workflow

**Version:** 1.0.0
**Last Updated:** 2025-11-17
**Project:** AltSig Email Signature Generator
**Purpose:** Ensure high-quality, maintainable code and reliable output

---

## Table of Contents

1. [Quality Philosophy](#quality-philosophy)
2. [Pre-Development Checklist](#pre-development-checklist)
3. [Development Workflow](#development-workflow)
4. [Testing Requirements](#testing-requirements)
5. [Code Review Process](#code-review-process)
6. [Deployment Checklist](#deployment-checklist)
7. [Post-Deployment Verification](#post-deployment-verification)

---

## Quality Philosophy

### Core Principles

**1. Test Everything**
- Every feature must have automated tests
- Test before committing
- Test after merging
- Test in production

**2. Review All Changes**
- No direct commits to main/production
- All code must be reviewed
- AI-generated code is NOT exception

**3. Verify in Real Environment**
- Automated tests are not enough
- Manual testing in Outlook is **REQUIRED**
- Test on multiple devices and email clients

**4. Document Everything**
- Code changes must update documentation
- Breaking changes must be documented
- Changelog must be updated

**5. Maintain High Standards**
- Follow coding standards religiously
- No shortcuts
- Quality over speed
- Technical debt must be addressed

---

## Pre-Development Checklist

Before starting ANY code changes:

### 1. Understand the Requirement
- [ ] Requirement is clear and unambiguous
- [ ] Acceptance criteria defined
- [ ] Edge cases identified
- [ ] Success metrics established

### 2. Review Documentation
- [ ] Read CODING-STANDARDS.md
- [ ] Read EMAIL-HTML-GUIDE.md (if touching email HTML)
- [ ] Review PROJECT-TAXONOMY.md for file organization
- [ ] Check existing related code

### 3. Plan the Implementation
- [ ] Identify files to be modified
- [ ] Determine testing strategy
- [ ] Consider impact on existing features
- [ ] Plan for rollback if needed

### 4. Environment Setup
- [ ] Latest code pulled from main
- [ ] Dependencies up to date (`npm install`)
- [ ] Tests passing locally (`npm test`)
- [ ] Linter configured and passing

---

## Development Workflow

### Step 1: Create Feature Branch

```bash
# Pull latest changes
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/[feature-name]
# OR
git checkout -b fix/[bug-description]
```

### Step 2: Implement Changes

**While Coding:**

1. **Write Code in Small Increments**
   - Commit frequently
   - Each commit should be logical unit
   - Test after each significant change

2. **Follow Standards**
   - Use naming conventions
   - Follow file organization rules
   - Add comments where "why" isn't obvious
   - No console.log() in production code

3. **Test Continuously**
   - Run tests after each change
   - Fix tests that break
   - Add new tests for new features
   - Verify email HTML in Outlook

### Step 3: Self-Review

Before requesting review:

**Code Quality Check:**
- [ ] Code follows CODING-STANDARDS.md
- [ ] Email HTML follows EMAIL-HTML-GUIDE.md
- [ ] No code duplication
- [ ] Functions are single-purpose
- [ ] Variables have clear names
- [ ] No magic numbers (use constants)

**Testing Check:**
- [ ] All tests pass (`npm test`)
- [ ] New tests added for new features
- [ ] Edge cases covered
- [ ] Error scenarios tested

**Documentation Check:**
- [ ] Code is self-documenting
- [ ] Complex logic has comments
- [ ] CHANGELOG.md updated
- [ ] README updated (if needed)

**Clean-up Check:**
- [ ] No commented-out code
- [ ] No console.log() statements
- [ ] No TODO comments (create issues instead)
- [ ] No debug code
- [ ] No merge conflicts

### Step 4: Manual Testing

**For Web UI Changes:**
1. Test in Chrome
2. Test in Firefox
3. Test in Safari
4. Test on mobile (Chrome/Safari)
5. Test all form validations
6. Test error states
7. Test success states

**For Email Signature Changes:**
1. **REQUIRED:** Test in Outlook Windows
2. **REQUIRED:** Test in Outlook Mac
3. **REQUIRED:** Test in Outlook Web
4. Test in Gmail
5. Test in Apple Mail
6. Test copy/paste functionality
7. Test embedded logo displays

**Critical Email Tests:**
```
✅ Logo embeds (not broken image)
✅ Vertical divider shows
✅ Text formatting correct
✅ Colors match brand
✅ Links are clickable
✅ Phone number formats correctly
✅ No extra spacing
✅ Works when pasting to email
```

---

## Testing Requirements

### Automated Testing

#### Test Coverage Minimums
- **Core functionality:** 90% coverage
- **Edge cases:** 80% coverage
- **Error handling:** 100% coverage

#### Test Organization

```javascript
// tests/[feature-name].spec.js

const { test, expect } = require('@playwright/test');
const path = require('path');

test.describe('Feature Name', () => {

    test.beforeEach(async ({ page }) => {
        // Setup
        const filePath = path.join(__dirname, '..', 'public', 'index.html');
        await page.goto(`file://${filePath}`);
    });

    test.describe('Sub-feature', () => {

        test('should do expected behavior', async ({ page }) => {
            // Arrange
            await page.locator('#input').fill('test value');

            // Act
            await page.locator('#submit').click();

            // Assert
            await expect(page.locator('#result')).toContainText('expected');
        });

    });

});
```

#### Running Tests

```bash
# Run all tests
npm test

# Run specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run in headed mode (see browser)
npm run test:headed

# Run in debug mode
npm run test:debug

# View test report
npm run test:report
```

#### Test Success Criteria

Tests must:
- [ ] Pass consistently (no flakiness)
- [ ] Run in reasonable time (<2 minutes)
- [ ] Have descriptive names
- [ ] Test user behavior, not implementation
- [ ] Clean up after themselves

### Manual Testing

#### Email Signature Testing Protocol

**Required for EVERY email HTML change:**

1. **Generate Signature**
   - Fill all fields
   - Click "Generate Signature"
   - Verify preview looks correct

2. **Copy to Outlook (Windows)**
   - Click "Copy for Outlook"
   - Open Outlook
   - Create new email
   - Paste signature (Ctrl+V)
   - Send test email to yourself
   - Verify received email

3. **Copy to Outlook (Mac)**
   - Same as Windows
   - Check for Mac-specific issues

4. **Copy to Outlook Web**
   - Open Outlook Web
   - Settings > Signatures
   - Paste signature
   - Compose new email
   - Verify signature appears

5. **Test in Gmail**
   - Settings > General > Signature
   - Paste signature
   - Compose new email
   - Send test email

6. **Visual Verification**
   - Logo displays (not broken)
   - Divider is visible
   - Colors are correct
   - Spacing is appropriate
   - Links are clickable
   - Text is readable

7. **Cross-Device Testing**
   - Desktop (Windows/Mac)
   - Mobile (iOS/Android)
   - Tablet (if available)

#### Web UI Testing Protocol

1. **Form Validation**
   - Try submitting empty fields
   - Try invalid email format
   - Try invalid phone format
   - Verify error messages

2. **Generate Function**
   - Fill valid data
   - Click generate
   - Verify preview updates
   - Check HTML output

3. **Copy Function**
   - Click copy button
   - Verify success message
   - Verify clipboard contains HTML
   - Verify embedded logo in HTML

4. **Download Function**
   - Click download
   - Verify file downloads
   - Open downloaded file
   - Verify content is correct

5. **Edge Cases**
   - Very long names
   - Special characters
   - International characters
   - Empty optional fields

---

## Code Review Process

### Requesting Review

**Create Pull Request with:**

1. **Clear Title**
   ```
   feat(generator): add phone number validation
   fix(email-template): correct divider in Outlook
   ```

2. **Description Template**
   ```markdown
   ## Changes
   - Added phone number format validation
   - Updated error messages
   - Added tests for validation

   ## Testing
   - [x] All automated tests pass
   - [x] Manually tested in Outlook Windows
   - [x] Manually tested in Outlook Mac
   - [x] Tested edge cases

   ## Screenshots
   [Attach screenshots if UI changes]

   ## Checklist
   - [x] Code follows CODING-STANDARDS.md
   - [x] Email HTML follows EMAIL-HTML-GUIDE.md
   - [x] Tests added/updated
   - [x] Documentation updated
   - [x] CHANGELOG.md updated
   ```

3. **Link Related Issues**
   - Reference issue number
   - Use keywords: "Closes #42", "Fixes #12"

### Reviewer Checklist

Reviewers must verify:

**Code Quality:**
- [ ] Follows coding standards
- [ ] No code duplication
- [ ] Clear variable names
- [ ] Appropriate comments
- [ ] Error handling present

**Email HTML (if applicable):**
- [ ] Uses tables for layout
- [ ] All CSS is inline
- [ ] Images are base64 embedded
- [ ] No modern CSS properties
- [ ] No flexbox/grid

**Testing:**
- [ ] Tests are present
- [ ] Tests are meaningful
- [ ] Tests pass
- [ ] Edge cases covered

**Documentation:**
- [ ] Code is self-documenting
- [ ] CHANGELOG updated
- [ ] README updated (if needed)

**Security:**
- [ ] No secrets committed
- [ ] Input validation present
- [ ] No SQL injection risk
- [ ] No XSS vulnerabilities

### Review Outcomes

**Approve:**
- All checks pass
- No concerns
- Ready to merge

**Request Changes:**
- List specific issues
- Provide examples of fixes
- Re-review after changes

**Comment:**
- Non-blocking suggestions
- Questions for clarification
- Kudos for good work

---

## Deployment Checklist

### Pre-Deployment

**Code Quality:**
- [ ] All tests passing (`npm test`)
- [ ] Linter passing (`npm run lint`)
- [ ] No console warnings/errors
- [ ] Code reviewed and approved

**Documentation:**
- [ ] CHANGELOG.md updated with version and changes
- [ ] README.md updated (if needed)
- [ ] Version number bumped in package.json

**Testing:**
- [ ] Manual testing complete
- [ ] Email signature tested in Outlook
- [ ] Cross-browser testing done
- [ ] Mobile testing done

**Preparation:**
- [ ] Backup current production (if applicable)
- [ ] Rollback plan documented
- [ ] Stakeholders notified
- [ ] Deployment window scheduled

### Deployment

**Azure Static Web Apps Deployment:**

```bash
# Automated via GitHub Actions
git push origin main

# Manual deployment (if needed)
npx @azure/static-web-apps-cli deploy ./public \
  --deployment-token $AZURE_TOKEN \
  --env production
```

**Verify Deployment:**
```bash
# Check HTTP status
curl -I https://brave-stone-0b7eb4800.3.azurestaticapps.net/

# Check content
curl https://brave-stone-0b7eb4800.3.azurestaticapps.net/ | head -20
```

### Post-Deployment

**Immediate Verification:**
- [ ] Site is accessible
- [ ] HTTP status is 200
- [ ] No JavaScript errors in console
- [ ] All features work

**Functional Testing:**
- [ ] Generate signature
- [ ] Copy to clipboard
- [ ] Download HTML
- [ ] Test in Outlook

**Monitor:**
- [ ] Check error logs
- [ ] Monitor performance
- [ ] Watch for user reports
- [ ] Review analytics (if available)

---

## Post-Deployment Verification

### Production Testing

**Within 1 hour of deployment:**

1. **Smoke Test**
   - [ ] Visit production URL
   - [ ] Page loads successfully
   - [ ] No console errors
   - [ ] All links work

2. **Critical Path Test**
   - [ ] Fill form with valid data
   - [ ] Generate signature
   - [ ] Preview displays correctly
   - [ ] Copy to clipboard works
   - [ ] Download works

3. **Email Signature Test**
   - [ ] Generate signature
   - [ ] Copy to Outlook
   - [ ] Send test email
   - [ ] Verify received email

### Monitoring

**First 24 hours:**
- Check every 2 hours
- Monitor error logs
- Watch for user reports
- Be ready to rollback

**First week:**
- Daily checks
- Review any issues
- Collect user feedback
- Address problems quickly

### Rollback Procedure

**If critical issue found:**

1. **Immediate:**
   ```bash
   # Revert to previous version
   git revert [bad-commit-hash]
   git push origin main
   ```

2. **Communicate:**
   - Notify stakeholders
   - Document the issue
   - Plan the fix

3. **Fix:**
   - Create hotfix branch
   - Fix the issue
   - Follow full QA process
   - Deploy fix

---

## Quality Metrics

### Success Criteria

**Code Quality:**
- Zero linting errors
- >90% test coverage
- All tests passing
- Code review approval

**Email Compatibility:**
- Works in Outlook Windows ✅
- Works in Outlook Mac ✅
- Works in Outlook Web ✅
- Works in Gmail ✅
- Works in Apple Mail ✅

**Performance:**
- Page load <2 seconds
- Signature generation <500ms
- Copy to clipboard <100ms

**User Experience:**
- Form validation works
- Error messages are clear
- Success feedback is visible
- No broken images

### Continuous Improvement

**Monthly Review:**
- Analyze test failures
- Review code quality metrics
- Identify pain points
- Update processes

**Quarterly Review:**
- Review documentation
- Update standards
- Train team on changes
- Celebrate successes

---

## Tools and Automation

### Required Tools

**Development:**
- Node.js 18+
- npm 9+
- Git
- Visual Studio Code (or preferred IDE)

**Testing:**
- Playwright
- Chrome/Firefox/Safari browsers
- Outlook (for email testing)

**Quality:**
- ESLint (JavaScript linting)
- Prettier (code formatting)
- Playwright Test (automated testing)

### Automation

**Git Hooks (Recommended):**

```bash
# .husky/pre-commit
npm run lint
npm test
```

**GitHub Actions (Active):**
- Automatic testing on PR
- Automatic deployment on merge to main
- Test reports generation

---

## Common Scenarios

### Scenario 1: Urgent Hotfix

1. Create hotfix branch from main
2. Make minimal change to fix issue
3. Test thoroughly (don't skip!)
4. Fast-track review
5. Deploy immediately
6. Monitor closely

### Scenario 2: Large Feature

1. Break into smaller PRs
2. Feature flag if needed
3. Test each increment
4. Deploy incrementally
5. Verify at each step

### Scenario 3: Refactoring

1. Ensure tests cover existing behavior
2. Refactor in small steps
3. Run tests after each change
4. No functional changes in refactor PR
5. Verify behavior unchanged

---

## Remember

**Quality is NOT negotiable.**

- No shortcuts
- No "quick fixes" without testing
- No skipping code review
- No deploying without verification
- No untested email HTML

**When in doubt:**
1. Test more
2. Review documentation
3. Ask for help
4. Do it right

---

**Document Control**
- **Version:** 1.0.0
- **Created:** 2025-11-17
- **Author:** Claude Code
- **Status:** Active
- **Review Date:** 2026-05-17 (6 months)
