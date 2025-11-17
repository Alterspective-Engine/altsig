# Claude AI Assistant Instructions - AltSig Project

**Version:** 1.1.0
**Last Updated:** 2025-11-17
**Project:** Alterspective Email Signature Generator
**Purpose:** Instructions for AI assistants working on this project

---

## Overview

This document provides specific instructions for AI assistants (like Claude Code) when working on the AltSig project. Following these rules ensures consistency, quality, and maintainability.

---

## Core Principles

### 1. Quality Over Speed

**NEVER** sacrifice quality for speed. Better to take time and do it right than to rush and create technical debt.

- Think before coding
- Plan the approach
- Test thoroughly
- Review carefully

### 2. Follow Established Standards

This project has comprehensive standards that **MUST** be followed:

- **[PROJECT-TAXONOMY.md](docs/PROJECT-TAXONOMY.md)** - File and folder organization
- **[CODING-STANDARDS.md](docs/CODING-STANDARDS.md)** - Code quality and style
- **[EMAIL-HTML-GUIDE.md](docs/EMAIL-HTML-GUIDE.md)** - Email-specific HTML rules
- **[QUALITY-ASSURANCE.md](docs/QUALITY-ASSURANCE.md)** - Testing and QA workflow

**Read these documents before making any code changes.**

### 3. Email HTML Is Special

⚠️ **CRITICAL:** Email HTML is NOT web HTML.

- Email signatures use **tables** for layout (not div/flexbox/grid)
- All CSS must be **inline** (no external stylesheets)
- Images must be **base64 embedded** (no external URLs)
- Only **email-safe CSS** properties (no modern CSS)
- **MUST test in Outlook** before claiming complete

See [EMAIL-HTML-GUIDE.md](docs/EMAIL-HTML-GUIDE.md) for complete rules.

### 4. Always Test and Verify

**NEVER** claim something works without testing it:

- Run automated tests (`npm test`)
- Test manually in browsers
- Test email signatures in Outlook (Windows, Mac, Web)
- Verify in production after deployment

See [QUALITY-ASSURANCE.md](docs/QUALITY-ASSURANCE.md) for testing workflow.

---

## Required Reading

Before working on this project, you **MUST** review:

### Essential Documents (Read First)
1. **[README.md](README.md)** - Project overview and setup
2. **[PROJECT-TAXONOMY.md](docs/PROJECT-TAXONOMY.md)** - File organization
3. **[CODING-STANDARDS.md](docs/CODING-STANDARDS.md)** - Code standards
4. **[EMAIL-HTML-GUIDE.md](docs/EMAIL-HTML-GUIDE.md)** - Email HTML rules

### Reference Documents (Consult as Needed)
5. **[CHANGELOG.md](CHANGELOG.md)** - Version history
6. **[QUALITY-ASSURANCE.md](docs/QUALITY-ASSURANCE.md)** - QA workflow
7. **[DEPLOYMENT-GUIDE.md](docs/DEPLOYMENT-GUIDE.md)** - Deployment procedures
8. **[TEST-GUIDE.md](docs/TEST-GUIDE.md)** - Testing documentation

---

## Development Workflow

### Before Making Changes

1. **Understand the Requirement**
   - Read the request carefully
   - Ask clarifying questions if anything is unclear
   - Confirm understanding before proceeding

2. **Review Relevant Documentation**
   - Check which files will be affected
   - Review standards for those file types
   - Look at existing similar code

3. **Plan the Approach**
   - Think through the implementation
   - Consider edge cases
   - Identify testing needs
   - Estimate complexity

### While Making Changes

1. **Follow Standards**
   - Use correct naming conventions (see PROJECT-TAXONOMY.md)
   - Follow code style (see CODING-STANDARDS.md)
   - Email HTML: Follow EMAIL-HTML-GUIDE.md **strictly**
   - Add comments only when "why" isn't obvious

2. **Write Tests**
   - Add tests for new features
   - Update tests for changed features
   - Ensure edge cases are covered
   - Run tests frequently (`npm test`)

3. **Make Incremental Changes**
   - Small, logical commits
   - Test after each significant change
   - Don't mix unrelated changes
   - Keep commits focused

### After Making Changes

1. **Self-Review**
   - Review your own code
   - Check against coding standards
   - Verify tests pass
   - Test manually

2. **Test Thoroughly**
   - Run automated tests
   - Manual testing in browsers
   - Email signatures: Test in Outlook (REQUIRED)
   - Test edge cases and error states

3. **Update Documentation**
   - Update CHANGELOG.md
   - Update README.md if needed
   - Add/update code comments
   - Update relevant guides

4. **Report What You Did**
   - Summarize changes clearly
   - Mention any issues encountered
   - Highlight what was tested
   - Note any follow-up needed

---

## Critical Rules

### Email HTML Development

**⚠️ MANDATORY RULES - NO EXCEPTIONS:**

1. **Use Tables for Layout**
   ```html
   <!-- ✅ CORRECT -->
   <table cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
       <tr>
           <td>Content</td>
       </tr>
   </table>

   <!-- ❌ WRONG -->
   <div class="container">Content</div>
   ```

2. **All CSS Must Be Inline**
   ```html
   <!-- ✅ CORRECT -->
   <td style="font-size: 16px; color: #333;">Text</td>

   <!-- ❌ WRONG -->
   <style>.text { font-size: 16px; }</style>
   <td class="text">Text</td>
   ```

3. **Images Must Be Base64**
   ```html
   <!-- ✅ CORRECT for email signatures -->
   <img src="data:image/png;base64,iVBORw0KGg..." width="120" height="120" alt="Logo">

   <!-- ❌ WRONG for email signatures -->
   <img src="logo.png" alt="Logo">
   ```

4. **Test in Outlook**
   - Outlook Windows (most restrictive)
   - Outlook Mac
   - Outlook Web
   - Gmail
   - Don't claim it works until tested!

### File Organization

**Follow PROJECT-TAXONOMY.md strictly:**

```
✅ Correct placement:
public/index.html          # Main web app
public/assets/images/      # Images
public/assets/styles/      # CSS files
public/assets/scripts/     # JavaScript files
tests/[feature].spec.js    # Test files
docs/[GUIDE].md           # Documentation

❌ Wrong placement:
signature-generator.html   # In root (should be public/index.html)
test-*.spec.js            # In root (should be tests/)
logo.png                  # In root (should be public/assets/images/)
```

### Code Quality

**Non-Negotiable Standards:**

1. **No Code Duplication**
   - Extract repeated logic into functions
   - Reuse existing components
   - DRY principle

2. **Clear Naming**
   - Variables: `camelCase` (e.g., `fullName`, `emailAddress`)
   - Constants: `UPPER_SNAKE_CASE` (e.g., `MAX_LENGTH`, `BRAND_COLOR`)
   - Functions: Verbs (e.g., `generateSignature`, `validateEmail`)
   - Files: `kebab-case` (e.g., `signature-generator.js`)

3. **Error Handling**
   - Handle all errors explicitly
   - Provide meaningful error messages
   - Never let errors crash silently
   - Log errors appropriately

4. **No Debugging Code in Production**
   - No `console.log()` statements
   - No commented-out code
   - No TODO comments (create issues instead)
   - No debug variables

### Testing Requirements

**Every Code Change Must:**

1. **Have Automated Tests**
   - New features need new tests
   - Changed features need updated tests
   - Edge cases must be covered
   - All tests must pass before committing

2. **Be Manually Tested**
   - Test in multiple browsers
   - Test on mobile devices
   - Email HTML: Test in Outlook (REQUIRED)
   - Test error scenarios

3. **Pass Quality Gates**
   - No linting errors
   - No TypeScript errors (if applicable)
   - No console warnings
   - All tests passing

---

## Common Scenarios

### Scenario 1: Adding a New Feature

```markdown
1. Read the requirement carefully
2. Review CODING-STANDARDS.md
3. Check PROJECT-TAXONOMY.md for file placement
4. Plan the implementation
5. Write tests first (TDD approach)
6. Implement the feature
7. Test thoroughly (automated + manual)
8. Update documentation
9. Update CHANGELOG.md
10. Report what you did
```

### Scenario 2: Fixing a Bug

```markdown
1. Understand the bug
2. Write a failing test that reproduces it
3. Fix the bug
4. Verify the test now passes
5. Run full test suite
6. Test manually
7. Update CHANGELOG.md
8. Report the fix
```

### Scenario 3: Modifying Email HTML

```markdown
1. ⚠️ READ EMAIL-HTML-GUIDE.md FIRST
2. Understand current structure
3. Make changes following email HTML rules
4. VERIFY: Uses tables for layout
5. VERIFY: All CSS is inline
6. VERIFY: Images are base64
7. Test in Outlook Windows (REQUIRED)
8. Test in Outlook Mac (REQUIRED)
9. Test in Outlook Web (REQUIRED)
10. Test copy/paste functionality
11. Report testing results
```

### Scenario 4: Refactoring Code

```markdown
1. Ensure tests cover existing behavior
2. Make refactoring changes
3. Verify tests still pass
4. Verify behavior unchanged
5. No functional changes in refactor
6. Update documentation if needed
7. Report what was refactored
```

---

## Quality Checklist

Before claiming any task is complete:

### Code Quality
- [ ] Follows CODING-STANDARDS.md
- [ ] No code duplication
- [ ] Clear, descriptive names
- [ ] Appropriate error handling
- [ ] No debugging code (console.log, etc.)
- [ ] No commented-out code

### Email HTML (if applicable)
- [ ] Uses tables for layout
- [ ] All CSS is inline
- [ ] Images are base64 embedded
- [ ] No modern CSS (flexbox, grid, etc.)
- [ ] Tested in Outlook Windows
- [ ] Tested in Outlook Mac
- [ ] Tested in Outlook Web

### Testing
- [ ] Automated tests added/updated
- [ ] All tests pass (`npm test`)
- [ ] Manually tested in browsers
- [ ] Edge cases tested
- [ ] Error scenarios tested

### Documentation
- [ ] CHANGELOG.md updated
- [ ] README.md updated (if needed)
- [ ] Code comments added (where needed)
- [ ] Relevant guides updated

### File Organization
- [ ] Files in correct locations (per PROJECT-TAXONOMY.md)
- [ ] Correct naming conventions used
- [ ] No files in wrong directories

---

## What NOT to Do

### ❌ NEVER Do These Things

1. **Skip Testing**
   - Don't claim something works without testing
   - Don't skip Outlook testing for email HTML
   - Don't assume tests will pass

2. **Ignore Standards**
   - Don't use divs for email layout
   - Don't put CSS in external files for email
   - Don't use wrong naming conventions
   - Don't skip code review checklist

3. **Create Technical Debt**
   - Don't duplicate code
   - Don't leave TODOs in code
   - Don't commit debugging code
   - Don't skip documentation

4. **Make Unsafe Changes**
   - Don't commit secrets/passwords
   - Don't skip input validation
   - Don't ignore security best practices
   - Don't deploy without verification

5. **Be Careless**
   - Don't make changes without understanding
   - Don't skip file reviews
   - Don't ignore edge cases
   - Don't rush through testing

---

## Getting Help

### When Stuck

1. **Review Documentation**
   - Check relevant guide documents
   - Look at similar existing code
   - Review CHANGELOG for recent changes

2. **Analyze the Problem**
   - What exactly isn't working?
   - What error messages appear?
   - What have you tried?
   - What are the constraints?

3. **Ask Specific Questions**
   - Provide context
   - Show what you've tried
   - Specify what you need help with
   - Include relevant code/errors

### Resources

- **Project Documentation:** `docs/` directory
- **Standards:** See links at top of this file
- **Examples:** Look at existing code
- **Testing:** Run `npm test` to see test patterns

---

## Success Criteria

You've done a good job when:

✅ Code follows all standards
✅ Tests pass and cover new functionality
✅ Email HTML works in Outlook (if applicable)
✅ Documentation is updated
✅ Changes are well-explained
✅ No technical debt created
✅ Quality gates all pass

---

## Remember

1. **Quality is mandatory, not optional**
2. **Email HTML has special rules - follow them**
3. **Test everything, especially in Outlook**
4. **Documentation must stay current**
5. **Standards exist for good reasons**
6. **When in doubt, ask before proceeding**

**This project maintains high standards. Help us keep it that way.**

---

## Quick Reference Card

### File Locations
- Production: `public/`
- Tests: `tests/`
- Docs: `docs/`
- Config: Root directory

### Naming Conventions
- Files: `kebab-case.js`
- Variables: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- CSS Classes: `block__element--modifier`

### Email HTML Musts
- ✅ Tables for layout
- ✅ Inline CSS only
- ✅ Base64 images
- ✅ Test in Outlook
- ❌ No divs/flexbox/grid
- ❌ No external styles
- ❌ No modern CSS

### Before Committing
- [ ] Tests pass
- [ ] Manual testing done
- [ ] Email tested in Outlook
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] No debug code
- [ ] Follows standards

---

**Document Control**
- **Version:** 1.1.0
- **Created:** 2025-11-17
- **Author:** Project Team
- **Status:** Active
- **Review Date:** 2026-05-17 (6 months)

---

**Questions?** Review the documentation in `docs/` directory or ask the project maintainer.

---

## CRITICAL LESSONS LEARNED - Email Signature Generation

**⚠️ READ THIS SECTION BEFORE MAKING ANY EMAIL SIGNATURE CHANGES**

This section documents **hard-won lessons** from troubleshooting email signature issues in Outlook. These are not theoretical - they are proven solutions to real problems.

---

### Lesson 1: Vertical Divider Lines in Outlook

**❌ WHAT DOESN'T WORK:**

```html
<!-- BROKEN: Separate divider cell with border-left -->
<td>
    <img src="logo.png" width="120" height="120">
</td>
<td>
    <table>
        <tr>
            <td style="border-left: 2px solid #2C8248;"></td>
        </tr>
    </table>
</td>
```

**❌ ALSO DOESN'T WORK:**

```html
<!-- BROKEN: Div with background-color -->
<td>
    <div style="width: 2px; background-color: #2C8248; height: 120px;"></div>
</td>
```

**❌ ALSO DOESN'T WORK:**

```html
<!-- BROKEN: Table cell with background-color -->
<td>
    <table>
        <tr>
            <td style="width: 2px; background-color: #2C8248;"></td>
        </tr>
    </table>
</td>
```

**✅ WHAT WORKS IN OUTLOOK:**

```html
<!-- WORKING: border-right on the logo cell itself -->
<td style="border-right: 2px solid #2C8248; padding-right: 15px;">
    <img src="logo.png" width="120" height="120">
</td>
<td style="width: 15px;"></td> <!-- spacing -->
<td>
    Contact information...
</td>
```

**WHY THIS WORKS:**
- Outlook reliably renders `border-right` on content cells
- No separate divider element to strip during copy/paste
- Simpler HTML = more reliable
- Tested and verified in Outlook Windows, Mac, and Web

**RULE:** For vertical dividers, use `border-right` on the logo TD, never a separate divider element.

---

### Lesson 2: Line Height in Email Signatures

**❌ DON'T USE:**
```html
<!-- These cause spacing issues in Outlook -->
<td style="line-height: 1.1;">Name</td>
<td style="line-height: 1.2;">Title</td>
<td style="line-height: 1.3;">Email</td>
<td style="line-height: 1.4;">Phone</td>
```

**✅ USE:**
```html
<!-- Always use 100% for consistent spacing -->
<td style="line-height: 100%;">Name</td>
<td style="line-height: 100%;">Title</td>
<td style="line-height: 100%;">Email</td>
<td style="line-height: 100%;">Phone</td>
```

**WHY:**
- Numeric line-heights (1.1, 1.2, etc.) are calculated differently in Outlook
- 100% gives consistent, tight spacing
- Prevents unwanted vertical gaps
- Works identically across all email clients

**RULE:** Always use `line-height: 100%` in email signatures, never numeric values.

---

### Lesson 3: Testing with Playwright Before Claiming Success

**❌ WRONG APPROACH:**
```bash
# Making changes
sed -i '' 's/old/new/g' file.html
echo "✓ Fixed!"
# NO TESTING!
```

**✅ CORRECT APPROACH:**
```bash
# Making changes
sed -i '' 's/old/new/g' file.html

# ALWAYS TEST IMMEDIATELY
npx playwright test tests/debug-dual-signature.spec.js --project=chromium

# Check the output:
# ✓ New email signature generated successfully
# ✓ Reply signature generated successfully
# ✓ All buttons enabled
```

**WHY:**
- JavaScript syntax errors show up immediately
- Missing closing braces are caught
- DOM element mismatches are revealed
- Function scope issues are detected
- Console errors are captured

**RULE:** After ANY change to signature generation code, run Playwright tests immediately.

---

### Lesson 4: Dual Signature Generation - Function Scope

**❌ WRONG:**
```javascript
// External file: reply-signature.js
function generateBothSignatures() {
    generateSignature(); // ❌ Can't access - wrong scope!
    const logoSrc = logoBase64; // ❌ Can't access - undefined!
}
```

**✅ CORRECT:**
```javascript
// Inline in index.html <script> tag
function generateBothSignatures() {
    generateSignature(); // ✅ Same scope
    const logoSrc = logoBase64; // ✅ Accessible
}
```

**WHY:**
- Signature generation needs access to `logoBase64`, `logoPath` variables
- These are defined in the inline `<script>` tag
- External scripts have different scope
- All dual signature functions must be inline

**RULE:** All signature generation functions MUST be in the inline `<script>` tag, never in external `.js` files.

---

### Lesson 5: Check Archives Before Trying New Approaches

**❌ WRONG APPROACH:**
```markdown
1. User reports divider doesn't work
2. Guess at solution (background-color? border-left?)
3. Implement untested theory
4. Doesn't work
5. Try another guess
6. Repeat...
```

**✅ CORRECT APPROACH:**
```markdown
1. User reports divider doesn't work
2. CHECK ARCHIVES FIRST:
   - Look in archive-2025-11-17/
   - Find signature-CORRECT.html or email-signature-FINAL.html
   - See what actually worked before
3. Implement proven solution
4. Test with Playwright
5. Done!
```

**WHY:**
- Archive contains working examples
- No need to reinvent the wheel
- Saves time and frustration
- Proven solutions over theories

**RULE:** Before implementing a fix, check `archive-*/` for working examples.

---

### Lesson 6: Outlook Copy/Paste Strips Certain Elements

**ELEMENTS OUTLOOK STRIPS:**
- ❌ `<div>` tags (converted or removed)
- ❌ Nested tables used only for styling
- ❌ `border-left` on empty divider cells
- ❌ `background-color` on empty cells
- ❌ CSS classes (always stripped)
- ❌ External stylesheets (always stripped)

**ELEMENTS OUTLOOK PRESERVES:**
- ✅ `<table>` with content
- ✅ `<td>` with text or images
- ✅ `border-right` on content cells
- ✅ Inline styles on content elements
- ✅ `<img>` with base64 src
- ✅ `<a>` with href

**RULE:** Only use elements and styles that Outlook preserves. Put borders on content cells, not empty dividers.

---

### Lesson 7: The "Generate Both" Button Workflow

**IMPLEMENTATION CHECKLIST:**

1. ✅ **HTML Layout**
   - Two preview divs: `#previewNew` and `#previewReply`
   - Four buttons: `#copyNewBtn`, `#downloadNewBtn`, `#copyReplyBtn`, `#downloadReplyBtn`
   - All in side-by-side grid layout

2. ✅ **JavaScript Functions** (ALL INLINE)
   ```javascript
   function generateBothSignatures() {
       generateSignature();           // Generate new email
       window.newEmailHTML = window.generatedHTML;
       
       // Generate reply signature inline
       window.replyHTML = `...`;
       
       // Display both
       // Enable all buttons
   }
   ```

3. ✅ **Error Handling**
   ```javascript
   // Check if match succeeded
   if (newEmailTable && newEmailTable[0]) {
       document.getElementById('previewNew').innerHTML = newEmailTable[0];
   }
   ```

4. ✅ **Testing**
   ```bash
   npx playwright test tests/debug-dual-signature.spec.js
   # Must show:
   # ✓ Both signatures generated
   # ✓ All buttons enabled
   ```

**RULE:** Follow this exact pattern for dual signature generation.

---

### Lesson 8: When Things Break, Use Playwright to Debug

**DEBUGGING WORKFLOW:**

```bash
# 1. Run the debug test
npx playwright test tests/debug-dual-signature.spec.js --project=chromium

# 2. Read the console output
# It will show:
# - Which elements exist/missing
# - Which functions are defined/undefined  
# - JavaScript errors with line numbers
# - Whether signatures generated
# - Button states

# 3. Check the screenshot
open tests/screenshots/debug-dual-signature.png

# 4. Fix the exact issue identified

# 5. Test again

# 6. Repeat until all ✓
```

**WHAT THE TEST REVEALS:**
- ✓/✗ All DOM elements present
- ✓/✗ All functions defined
- ✓/✗ Signatures generated successfully
- ✓/✗ Buttons enabled/disabled
- Full console log capture
- Visual screenshot

**RULE:** When debugging signature generation, ALWAYS run Playwright test first to see exactly what's broken.

---

### Lesson 9: Common Mistakes and How to Avoid Them

**MISTAKE #1: Commenting out the wrong line**
```javascript
// ❌ BROKEN
function generateBothSignatures() {
    // generateSignature(); // DON'T COMMENT THIS OUT!
    window.newEmailHTML = window.generatedHTML; // undefined!
}
```

**MISTAKE #2: Missing closing brace**
```javascript
// ❌ BROKEN
function generateBothSignatures() {
    generateSignature();
    window.newEmailHTML = window.generatedHTML;
    // Missing closing }
```

**MISTAKE #3: Wrong element ID**
```javascript
// ❌ BROKEN
document.getElementById('preview').innerHTML = html; // #preview doesn't exist!

// ✅ CORRECT
document.getElementById('previewNew').innerHTML = html;
```

**MISTAKE #4: Calling undefined function**
```javascript
// ❌ BROKEN - function in external file
<button onclick="generateBothSignatures()">Generate</button>
// Function defined in reply-signature.js (wrong scope!)

// ✅ CORRECT - function inline
<script>
    function generateBothSignatures() { ... }
</script>
<button onclick="generateBothSignatures()">Generate</button>
```

**RULE:** Use Playwright tests to catch these immediately.

---

## QUICK TROUBLESHOOTING GUIDE

**PROBLEM:** Divider line not showing in Outlook

**SOLUTION:**
1. Check: Is `border-right` on the logo `<td>`?
2. Not a separate divider element?
3. Color is `#2C8248`?
4. Test in Outlook Windows (paste signature)

---

**PROBLEM:** Line spacing looks wrong

**SOLUTION:**
1. Check: All `line-height` values are `100%`?
2. No numeric values (1.1, 1.2, etc.)?
3. Search for: `line-height: 1\.` and replace with `100%`

---

**PROBLEM:** Signatures don't generate

**SOLUTION:**
1. Run: `npx playwright test tests/debug-dual-signature.spec.js`
2. Check console for: "function not defined"
3. Check: Are functions in inline `<script>` tag?
4. Check: Missing closing braces?

---

**PROBLEM:** "Cannot read properties of null"

**SOLUTION:**
1. Element ID doesn't exist in HTML
2. Check: `#previewNew` and `#previewReply` present?
3. Check: Button IDs match JavaScript?
4. Run Playwright test to see which element is missing

---

## EMERGENCY RECOVERY PROCEDURE

If you break signature generation:

```bash
# 1. Check if backups exist
ls -la public/*.bak* 

# 2. Restore from most recent backup
cp public/index.html.bak2 public/index.html

# 3. Check archives for working version
ls -la archive-2025-11-17/development-iterations/

# 4. Copy working structure from archive
grep -A20 "border-right: 2px" archive-2025-11-17/development-iterations/email-signature-FINAL.html

# 5. Apply fix carefully

# 6. Test immediately
npx playwright test tests/debug-dual-signature.spec.js
```

---

## FINAL CHECKLIST - Email Signature Changes

Before claiming any email signature change is complete:

- [ ] ✅ Divider uses `border-right` on logo TD
- [ ] ✅ All `line-height` values are `100%`
- [ ] ✅ All functions are in inline `<script>` tag
- [ ] ✅ Playwright tests pass
- [ ] ✅ Both signatures generate
- [ ] ✅ All buttons work
- [ ] ✅ No console errors
- [ ] ✅ Tested in Outlook Windows (copy/paste)
- [ ] ✅ Divider line visible in pasted signature
- [ ] ✅ Line spacing looks correct
- [ ] ✅ CHANGELOG.md updated
- [ ] ✅ This section of CLAUDE.md read and followed

---

**These lessons were learned through actual debugging sessions. Don't skip them!**

**Last Updated:** 2025-11-17
**Lessons Count:** 9 critical patterns
**Status:** Battle-tested and verified

