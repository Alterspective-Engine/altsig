# Changelog

All notable changes to the AltSig (Alterspective Email Signature Generator) project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Azure Static Web Apps deployment
- Project restructuring according to taxonomy
- External CSS and JS file separation
- Mobile responsive improvements
- Additional signature templates

---

## [1.0.0] - 2025-11-04

### Added
- Initial release of signature generator web application
- Interactive form for employee information input
- Live preview of email signature
- Copy to clipboard functionality
- Download HTML functionality
- Support for Australian phone number formatting
- Alterspective branding and logo integration
- Professional signature template with Playfair Display and Montserrat fonts
- Auto-generation on page load with default values
- Form validation for required fields
- Success messages for user actions
- Comprehensive project documentation:
  - PROJECT-TAXONOMY.md (naming conventions, file organization)
  - CHANGELOG.md (this file)
  - README.md (project overview)
  - QUICK-START.md (user guide)
  - OUTLOOK-INSTALLATION-GUIDE.md (deployment instructions)
  - TEST-GUIDE.md (testing documentation)
  - CUSTOMIZATION-WORKSHEET.md (customization guide)
- Playwright test suite with automated testing
- Test snapshots for visual regression testing

### Features
- **Form Fields:**
  - Full Name (required)
  - Job Title (required)
  - Email Address (required)
  - Mobile Number (required)
  - Website (optional)
- **Output Options:**
  - Live HTML preview
  - Copy to clipboard
  - Download as HTML file
  - View HTML source code
- **Design:**
  - Responsive layout
  - Professional color scheme (Alterspective green #2C8248, navy #08233D)
  - Clean, modern interface
  - Two-column layout (form + preview)

### Technical Details
- Pure HTML, CSS, JavaScript (no framework dependencies)
- Table-based email signature layout (Outlook compatible)
- Inline styles for email client compatibility
- Base64 logo encoding option
- localStorage potential for saving preferences

---

## [0.9.0-beta.1] - 2025-11-03

### Added
- Beta version for internal testing
- Multiple signature template variations
- Logo export and conversion documentation

### Changed
- Refined signature layout based on feedback
- Improved mobile number formatting
- Updated color scheme to match brand guidelines

### Fixed
- Logo alignment issues in various email clients
- Font fallback chain for better compatibility
- Phone number link formatting

---

## [0.8.0-alpha.1] - 2025-11-02

### Added
- Alpha version for initial development
- Basic signature template structure
- Form input fields
- Simple copy functionality

### Known Issues
- Limited email client testing
- No mobile responsive design
- Missing input validation

---

## Version History Summary

| Version | Date | Type | Description |
|---------|------|------|-------------|
| 1.0.0 | 2025-11-04 | Release | Initial production release |
| 0.9.0-beta.1 | 2025-11-03 | Beta | Internal testing version |
| 0.8.0-alpha.1 | 2025-11-02 | Alpha | Initial development version |

---

## Upgrade Guide

### Upgrading to 1.0.0
This is the initial release, no upgrade steps needed.

---

## Breaking Changes

### Version 1.0.0
No breaking changes (initial release).

---

## Deprecation Notices

### Version 1.0.0
- None

### Future Deprecations
- Base64-encoded logo approach may be deprecated in favor of hosted images (v2.0.0)
- Inline styles may be refactored to external CSS (v2.0.0)

---

## Support

### Version Support Policy
- **v1.x** - Active support and updates
- **v0.x** - No longer supported

### Reporting Issues
To report bugs or request features:
1. Check existing issues in the repository
2. Create a new issue with detailed description
3. Include browser/email client information
4. Provide steps to reproduce (for bugs)

---

## Release Process

### Version Numbering
- **Major (x.0.0)** - Breaking changes, major new features
- **Minor (1.x.0)** - New features, backward compatible
- **Patch (1.0.x)** - Bug fixes, minor improvements

### Release Checklist
- [ ] Update version in package.json
- [ ] Update CHANGELOG.md with release notes
- [ ] Run full test suite
- [ ] Create git tag `v[version]`
- [ ] Deploy to Azure Static Web Apps
- [ ] Verify production deployment
- [ ] Announce release to team

---

## Links

- [Project Repository](#) - Add GitHub URL
- [Azure Static Web App](#) - Add production URL
- [Documentation](./README.md)
- [Deployment Guide](./docs/DEPLOYMENT-GUIDE.md)
- [Contributing Guidelines](#) - To be added

---

**Maintained by:** Alterspective Development Team
**Last Updated:** 2025-11-04
