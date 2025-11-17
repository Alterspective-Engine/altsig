# AltSig Project Structure

**Version:** 1.0.0
**Last Updated:** 2025-11-04

---

## Current Directory Structure

```
altsig/
│
├── 📁 .github/                          # GitHub configuration
│   └── workflows/
│       └── azure-static-web-apps.yml   # Azure deployment workflow
│
├── 📁 public/                           # Web root (Azure serves this)
│   ├── index.html                      # Main generator (renamed from generate-signature.html)
│   ├── 📁 assets/
│   │   ├── 📁 images/                  # Image assets
│   │   │   ├── alterspective-logo.png
│   │   │   └── alterspective-symbol.png
│   │   ├── 📁 styles/                  # CSS files (for future use)
│   │   └── 📁 scripts/                 # JS files (for future use)
│   └── 📁 templates/
│       └── email-signature-template.html
│
├── 📁 docs/                             # Documentation
│   ├── QUICK-START.md
│   ├── OUTLOOK-INSTALLATION-GUIDE.md
│   ├── CUSTOMIZATION-WORKSHEET.md
│   ├── LOGO-EXPORT-GUIDE.md
│   ├── TEST-GUIDE.md
│   ├── LOGO-READY-TO-USE.md
│   ├── CONVERSION-SUMMARY.md
│   ├── IMPLEMENTATION-VERIFIED.md
│   └── START-HERE.md
│
├── 📁 tests/                            # Test files
│   ├── signature-generator.spec.js
│   └── 📁 snapshots/
│       └── (Playwright test snapshots)
│
├── 📁 archive/                          # Archived files
│   └── (Old versions and deprecated files)
│
├── 📄 staticwebapp.config.json          # Azure Static Web Apps config
├── 📄 package.json                      # Project metadata and scripts
├── 📄 package-lock.json                 # Locked dependencies
├── 📄 playwright.config.js              # Playwright test configuration
├── 📄 .gitignore                        # Git ignore rules
├── 📄 CHANGELOG.md                      # Version history
├── 📄 PROJECT-TAXONOMY.md               # Naming conventions and rules
├── 📄 DEPLOYMENT-GUIDE.md               # Azure deployment guide
├── 📄 PROJECT-STRUCTURE.md              # This file
└── 📄 README.md                         # Main project readme

```

---

## File Purpose Reference

### Root Level Files

| File | Purpose | Edit Frequency |
|------|---------|----------------|
| `staticwebapp.config.json` | Azure routing and security config | Rarely |
| `package.json` | Project metadata, dependencies, scripts | Occasionally |
| `playwright.config.js` | Test framework configuration | Rarely |
| `.gitignore` | Files to exclude from version control | Rarely |
| `CHANGELOG.md` | Version history and release notes | Every release |
| `PROJECT-TAXONOMY.md` | Naming and organizational rules | Rarely |
| `DEPLOYMENT-GUIDE.md` | Deployment instructions | Occasionally |
| `README.md` | Main project documentation | Occasionally |

### Public Directory (Web Root)

| File/Folder | Purpose | Deployed to Azure |
|-------------|---------|-------------------|
| `public/index.html` | Main signature generator interface | ✅ Yes |
| `public/assets/images/` | Logo and image files | ✅ Yes |
| `public/assets/styles/` | CSS files (future separation) | ✅ Yes |
| `public/assets/scripts/` | JS files (future separation) | ✅ Yes |
| `public/templates/` | Email signature templates | ✅ Yes |

### Documentation Directory

| File | Audience | Purpose |
|------|----------|---------|
| `docs/QUICK-START.md` | End Users | Quick guide for employees |
| `docs/OUTLOOK-INSTALLATION-GUIDE.md` | End Users | Outlook setup instructions |
| `docs/CUSTOMIZATION-WORKSHEET.md` | Designers | Brand customization guide |
| `docs/LOGO-EXPORT-GUIDE.md` | Designers | Logo preparation guide |
| `docs/TEST-GUIDE.md` | Developers | Testing documentation |

### Tests Directory

| File/Folder | Purpose |
|-------------|---------|
| `tests/signature-generator.spec.js` | Playwright test suite |
| `tests/snapshots/` | Visual regression test snapshots |

---

## File Organization Rules

### When to Use Each Directory

#### `/public/` - Production Code
**Use for:**
- HTML files served to users
- CSS stylesheets
- JavaScript files
- Images and fonts
- Any file that should be publicly accessible

**Do NOT use for:**
- Source code that needs building
- Test files
- Documentation
- Configuration files
- Development tools

#### `/docs/` - Documentation
**Use for:**
- User guides
- Developer documentation
- Design guidelines
- Process documentation
- Tutorials

**Format:** Markdown (.md) files only
**Naming:** UPPERCASE-WITH-DASHES.md

#### `/tests/` - Test Code
**Use for:**
- Playwright test files (*.spec.js)
- Test utilities and helpers
- Test snapshots and fixtures
- Test data files

**Do NOT use for:**
- Production code
- Documentation
- Configuration

#### `/archive/` - Historical Files
**Use for:**
- Old versions of files
- Deprecated features
- Legacy code
- Experimental code that didn't work out

**Organization:**
- By date: `archive/2025-11-04/`
- By version: `archive/v0.9/`

---

## Key File Paths Reference

### For End Users
- **Signature Generator:** `https://[your-domain]/` or `https://[your-domain]/index.html`

### For Developers
- **Main Source:** `public/index.html`
- **Logo (in page):** `public/assets/images/alterspective-logo.png`
- **Tests:** `tests/signature-generator.spec.js`
- **Deployment Config:** `staticwebapp.config.json`
- **CI/CD Workflow:** `.github/workflows/azure-static-web-apps.yml`

### For Deployment
- **Web Root:** `public/` (entire folder deployed to Azure)
- **Entry Point:** `public/index.html`
- **Assets:** `public/assets/`

---

## Naming Conventions Quick Reference

### Files
- **HTML:** `kebab-case.html` (e.g., `index.html`, `signature-template.html`)
- **CSS:** `kebab-case.css` (e.g., `main.css`, `form-styles.css`)
- **JavaScript:** `kebab-case.js` (e.g., `generator.js`, `validator.js`)
- **Images:** `brand-descriptor.ext` (e.g., `alterspective-logo.png`)
- **Documentation:** `UPPERCASE-DASHES.md` (e.g., `README.md`, `QUICK-START.md`)
- **Tests:** `feature-name.spec.js` (e.g., `signature-generator.spec.js`)

### Directories
- **Lowercase with hyphens:** `kebab-case`
- **Examples:** `assets/`, `test-results/`, `node-modules/`

### Variables (JavaScript)
- **Variables/Functions:** `camelCase`
- **Constants:** `UPPER_SNAKE_CASE`
- **Classes:** `PascalCase`

---

## Migration Summary

### What Changed

**Old Structure:**
```
AltSig/
├── generate-signature.html            (root level)
├── alterspective-logo.png             (root level)
├── test-signature-generator.spec.js   (root level)
└── (various .md files)                (root level)
```

**New Structure:**
```
AltSig/
├── public/
│   ├── index.html                     (moved and renamed)
│   └── assets/images/
│       └── alterspective-logo.png     (organized)
├── docs/                              (organized)
│   └── *.md files
└── tests/                             (organized)
    └── *.spec.js files
```

### File Mappings

| Old Location | New Location | Changes |
|--------------|--------------|---------|
| `generate-signature.html` | `public/index.html` | Renamed, paths updated |
| `alterspective-logo.png` | `public/assets/images/alterspective-logo.png` | Moved to assets |
| `test-*.spec.js` | `tests/*.spec.js` | Moved to tests directory |
| `*.md` (various) | `docs/*.md` | Moved to docs (except root docs) |

### Path Updates Required

Updated in `public/index.html`:
- Logo path: `alterspective-logo.png` → `assets/images/alterspective-logo.png`
- Logo reference in JavaScript: Updated to new path

---

## Azure Deployment Configuration

### What Gets Deployed

**Included in deployment:**
- Everything in `public/` directory
- `staticwebapp.config.json` (Azure config)

**Excluded from deployment:**
- `node_modules/`
- `tests/`
- `docs/`
- `archive/`
- `.git/`
- Development files

### Build Configuration

```yaml
app_location: "/"              # Source code location
api_location: ""               # No API (static site only)
output_location: ""            # No build output (pure HTML)
```

**Note:** We use `skip_app_build: true` because this is a pure HTML/CSS/JS application with no build process.

---

## Development Workflow

### Adding New Features

1. **Code Changes**
   - Edit `public/index.html` (or create new files in public/)
   - Update asset paths if needed
   - Follow naming conventions

2. **Testing**
   - Update/create tests in `tests/`
   - Run `npm test`
   - Verify all tests pass

3. **Documentation**
   - Update relevant .md files in `docs/`
   - Update `CHANGELOG.md`
   - Update `README.md` if needed

4. **Deployment**
   - Commit changes
   - Push to main branch
   - GitHub Actions auto-deploys to Azure

### File Creation Checklist

Before creating a new file:
- [ ] Check if similar file exists
- [ ] Choose correct directory (public/docs/tests)
- [ ] Follow naming convention
- [ ] Update this structure document
- [ ] Add to .gitignore if needed (temp files, etc.)

---

## Common Tasks

### Add New Image
```bash
# 1. Optimize image
# 2. Copy to correct location
cp new-image.png public/assets/images/

# 3. Reference in HTML
<img src="assets/images/new-image.png" alt="Description">
```

### Add New Documentation
```bash
# 1. Create markdown file
touch docs/NEW-GUIDE.md

# 2. Follow documentation template
# 3. Link from README.md
```

### Add New Test
```bash
# 1. Create test file
touch tests/new-feature.spec.js

# 2. Follow test conventions
# 3. Run tests: npm test
```

### Add New Template
```bash
# 1. Create template file
touch public/templates/new-template.html

# 2. Follow signature structure
# 3. Test in multiple email clients
```

---

## Maintenance

### Regular Updates

**Weekly:**
- Review and merge PRs
- Check test results
- Review error logs

**Monthly:**
- Update dependencies (`npm update`)
- Review and archive old files
- Check disk usage
- Update documentation

**Quarterly:**
- Security audit
- Performance review
- Documentation review
- Clean archive directory

---

## Quick Reference Card

### Most Common Commands
```bash
# Start development
npm run serve

# Run tests
npm test

# Deploy (automatic on push)
git push origin main

# View structure
tree -L 3 -I 'node_modules'
```

### Most Common Files
```bash
public/index.html              # Main app
staticwebapp.config.json       # Azure config
package.json                   # Project config
CHANGELOG.md                   # Version history
```

### Most Common Paths
```bash
/public/                       # Web root
/public/assets/images/         # Images
/docs/                         # Documentation
/tests/                        # Tests
```

---

## Support

For questions about project structure:
- See [PROJECT-TAXONOMY.md](PROJECT-TAXONOMY.md) for detailed rules
- See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md) for deployment info
- Contact: development-team@alterspective.com.au

---

**Document Version:** 1.0.0
**Last Updated:** 2025-11-04
**Maintained By:** Alterspective Development Team
