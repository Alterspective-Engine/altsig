# AltSig - Alterspective Email Signature Generator

**Version:** 1.0.0
**Status:** Production Ready
**Deployment:** Azure Static Web Apps

---

## Overview

AltSig is a web-based email signature generator designed specifically for Alterspective employees. It creates professional, brand-compliant email signatures that work seamlessly with Microsoft Outlook and other email clients.

### Key Features

- **Interactive Form** - Simple input fields for employee information
- **Live Preview** - Real-time signature preview as you type
- **Copy to Clipboard** - One-click copy for easy Outlook installation
- **Download HTML** - Export signatures as HTML files
- **Mobile Responsive** - Works on all devices
- **Brand Compliant** - Follows Alterspective brand guidelines
- **Email Client Compatible** - Tested with Outlook, Gmail, Apple Mail

---

## Quick Start

### For End Users (Employees)

1. **Visit the Generator**
   - Go to [https://your-deployment-url.azurestaticapps.net](https://your-deployment-url.azurestaticapps.net)
   - Or your custom domain when configured

2. **Fill in Your Information**
   - Full Name (required)
   - Job Title (required)
   - Email Address (required)
   - Mobile Number (required)
   - Website (optional)

3. **Generate Signature**
   - Click "Generate Signature"
   - Review the live preview

4. **Install in Outlook**
   - Click "Copy Signature"
   - Open Outlook
   - Go to Settings > Signatures
   - Paste signature
   - Save

📖 **Detailed Instructions:** See [OUTLOOK-INSTALLATION-GUIDE.md](docs/OUTLOOK-INSTALLATION-GUIDE.md)

---

## For Developers

### Prerequisites

- Node.js 18+ and npm 9+
- Git
- Azure account (for deployment)
- GitHub account (for CI/CD)

### Local Development

```bash
# Clone repository
git clone https://github.com/alterspective/altsig.git
cd altsig

# Install dependencies
npm install

# Serve locally
npm run serve
# Opens at http://localhost:3000

# Run tests
npm test

# Run tests with UI
npm run test:ui
```

### Project Structure

```
altsig/
├── public/                    # Web root (deployed to Azure)
│   ├── index.html            # Main signature generator
│   ├── assets/
│   │   ├── images/           # Logos and images
│   │   ├── styles/           # CSS files (future)
│   │   └── scripts/          # JS files (future)
│   └── templates/            # Email signature templates
│
├── docs/                     # Documentation
│   ├── QUICK-START.md
│   ├── OUTLOOK-INSTALLATION-GUIDE.md
│   ├── CUSTOMIZATION-WORKSHEET.md
│   └── LOGO-EXPORT-GUIDE.md
│
├── tests/                    # Playwright tests
│   ├── signature-generator.spec.js
│   └── snapshots/           # Test snapshots
│
├── .github/                  # GitHub Actions
│   └── workflows/
│       └── azure-static-web-apps.yml
│
├── staticwebapp.config.json  # Azure config
├── package.json              # Dependencies
├── playwright.config.js      # Test config
├── .gitignore               # Git ignore rules
├── CHANGELOG.md             # Version history
├── PROJECT-TAXONOMY.md      # Naming conventions
├── DEPLOYMENT-GUIDE.md      # Deployment instructions
└── README.md                # This file
```

### Technology Stack

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Testing:** Playwright
- **Hosting:** Azure Static Web Apps
- **CI/CD:** GitHub Actions
- **Version Control:** Git/GitHub

---

## Deployment

### Azure Static Web Apps

The application automatically deploys to Azure when you push to the `main` branch.

**Quick Deployment Steps:**

1. **Create Azure Static Web App**
   ```bash
   az staticwebapp create \
     --name altsig-prod \
     --resource-group altsig-rg \
     --source https://github.com/[your-org]/altsig \
     --branch main \
     --app-location "/" \
     --login-with-github
   ```

2. **Add Deployment Token to GitHub**
   - Copy token from Azure Portal
   - Add as `AZURE_STATIC_WEB_APPS_API_TOKEN` secret in GitHub

3. **Push to Deploy**
   ```bash
   git push origin main
   ```

📖 **Full Deployment Guide:** See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

### Custom Domain Setup

1. Add custom domain in Azure Portal
2. Configure DNS records at your registrar
3. Validate domain in Azure
4. SSL certificate auto-issued

---

## Configuration

### Environment Variables

Configure in Azure Portal > Static Web App > Configuration:

```bash
VITE_PUBLIC_ENVIRONMENT=production
VITE_PUBLIC_VERSION=1.0.0
```

### Application Settings

Edit `staticwebapp.config.json` for:
- Routes and redirects
- Security headers
- MIME types
- Error pages

---

## Testing

### Run All Tests

```bash
npm test
```

### Test Specific Browser

```bash
npm run test:chromium   # Chrome/Edge
npm run test:firefox    # Firefox
npm run test:webkit     # Safari
```

### Mobile Testing

```bash
npm run test:mobile
```

### Debug Tests

```bash
npm run test:debug
```

### View Test Report

```bash
npm run test:report
```

---

## Customization

### Updating Brand Colors

Edit the CSS in `public/index.html`:

```css
:root {
  --color-primary: #2C8248;    /* Alterspective green */
  --color-secondary: #08233D;   /* Alterspective navy */
  --color-accent: #ABDD65;      /* Alterspective lime */
}
```

### Updating Logo

1. Export new logo as PNG (180px width recommended)
2. Save to `public/assets/images/alterspective-logo.png`
3. Optimize with TinyPNG or similar
4. Test in generator

📖 **Logo Guide:** See [docs/LOGO-EXPORT-GUIDE.md](docs/LOGO-EXPORT-GUIDE.md)

### Adding New Fields

1. Add input field to form in `index.html`
2. Update `generateSignature()` function
3. Modify email signature template
4. Update tests
5. Update documentation

📖 **Customization Worksheet:** See [docs/CUSTOMIZATION-WORKSHEET.md](docs/CUSTOMIZATION-WORKSHEET.md)

---

## Documentation

### For End Users
- [Quick Start Guide](docs/QUICK-START.md) - Get started in 5 minutes
- [Outlook Installation](docs/OUTLOOK-INSTALLATION-GUIDE.md) - Step-by-step Outlook setup
- [FAQ](#faq) - Common questions

### For Developers
- [Deployment Guide](DEPLOYMENT-GUIDE.md) - Azure deployment instructions
- [Project Taxonomy](PROJECT-TAXONOMY.md) - Naming conventions and standards
- [Changelog](CHANGELOG.md) - Version history
- [Testing Guide](docs/TEST-GUIDE.md) - Testing documentation

### For Designers
- [Logo Export Guide](docs/LOGO-EXPORT-GUIDE.md) - Preparing brand assets
- [Customization Worksheet](docs/CUSTOMIZATION-WORKSHEET.md) - Brand customization

---

## FAQ

### General Questions

**Q: Which email clients are supported?**
A: Microsoft Outlook (Windows/Mac/Web), Gmail, Apple Mail, and most modern email clients.

**Q: Can I use this on mobile?**
A: Yes, the generator is mobile-responsive. However, signature installation must be done on desktop for most email clients.

**Q: Is my data saved?**
A: No, all data stays in your browser. Nothing is sent to any server.

**Q: Can I customize the signature design?**
A: The design follows Alterspective brand guidelines and cannot be customized by individual users. Contact IT for design changes.

### Technical Questions

**Q: Why use tables instead of divs?**
A: Email clients have limited CSS support. Tables ensure consistent rendering across all platforms.

**Q: Can I add images besides the logo?**
A: Yes, but ensure they're hosted online (not local files) and optimized for email (under 100KB total).

**Q: Does this work offline?**
A: The generator requires internet access initially to load, but then works offline.

**Q: How do I report a bug?**
A: Create an issue on GitHub or contact the development team.

### Deployment Questions

**Q: How much does Azure hosting cost?**
A: Azure Static Web Apps has a free tier that's sufficient for most use cases.

**Q: Can I deploy to a different host?**
A: Yes, the app is static HTML/CSS/JS and can be hosted anywhere (Netlify, Vercel, etc.).

**Q: How do I rollback a deployment?**
A: See the [Rollback Procedures](DEPLOYMENT-GUIDE.md#rollback-procedures) section in the deployment guide.

---

## Troubleshooting

### Common Issues

#### Signature Doesn't Display in Outlook

**Solution:**
1. Ensure you copied the entire signature (select all)
2. In Outlook, use Ctrl+V (not right-click paste)
3. Clear Outlook signature cache and retry

#### Logo Not Showing

**Solution:**
1. Check logo file path is correct
2. Ensure logo file exists in `public/assets/images/`
3. Verify logo is accessible (not blocked by firewall)
4. Try using base64-encoded logo (see docs)

#### Form Not Working

**Solution:**
1. Check browser console for errors (F12)
2. Ensure JavaScript is enabled
3. Try different browser
4. Clear browser cache

#### Test Failures

**Solution:**
```bash
# Update Playwright browsers
npx playwright install

# Run tests in headed mode to see what's happening
npm run test:headed

# Check test results
npm run test:report
```

📖 **More Troubleshooting:** See [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md#troubleshooting)

---

## Contributing

### Development Workflow

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow project taxonomy
   - Update tests
   - Update documentation

3. **Test Changes**
   ```bash
   npm test
   ```

4. **Commit Changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

### Coding Standards

- Follow naming conventions in [PROJECT-TAXONOMY.md](PROJECT-TAXONOMY.md)
- Write tests for new features
- Update documentation
- Use semantic commit messages
- Keep commits small and focused

### Commit Message Format

```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Test changes
- `chore:` - Build/tooling changes

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** (1.x.x) - Breaking changes
- **MINOR** (x.1.x) - New features, backward compatible
- **PATCH** (x.x.1) - Bug fixes, backward compatible

**Current Version:** 1.0.0

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## License

MIT License - See LICENSE file for details

Copyright (c) 2025 Alterspective

---

## Support

### Getting Help

- **Documentation:** See [docs/](docs/) directory
- **Issues:** [GitHub Issues](https://github.com/alterspective/altsig/issues)
- **Email:** support@alterspective.com.au

### Reporting Bugs

1. Check [existing issues](https://github.com/alterspective/altsig/issues)
2. Create new issue with:
   - Bug description
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Screenshots (if applicable)
   - Browser/OS information

### Feature Requests

Submit feature requests as GitHub issues with:
- Clear description of feature
- Use case/benefit
- Proposed implementation (if applicable)

---

## Roadmap

### Version 1.1.0 (Planned)
- [ ] Additional signature templates
- [ ] Dark mode support
- [ ] Signature preview in multiple email clients
- [ ] Save signature to local storage

### Version 1.2.0 (Planned)
- [ ] Batch signature generation
- [ ] CSV import for multiple employees
- [ ] Admin dashboard
- [ ] Usage analytics

### Version 2.0.0 (Future)
- [ ] Backend API integration
- [ ] Database storage
- [ ] User authentication
- [ ] Team management features

---

## Acknowledgments

- **Design:** Alterspective Brand Team
- **Development:** Alterspective Development Team
- **Testing:** Alterspective QA Team
- **Tools:** Playwright, Azure Static Web Apps

---

## Links

- **Production Site:** [To be configured]
- **Staging Site:** [To be configured]
- **Documentation:** [docs/](docs/)
- **GitHub Repository:** https://github.com/alterspective/altsig
- **Issue Tracker:** https://github.com/alterspective/altsig/issues

---

**Last Updated:** 2025-11-04
**Maintained By:** Alterspective Development Team

---

## Getting Started Checklist

### For New Developers
- [ ] Clone repository
- [ ] Install Node.js 18+
- [ ] Run `npm install`
- [ ] Run `npm test` to verify setup
- [ ] Read [PROJECT-TAXONOMY.md](PROJECT-TAXONOMY.md)
- [ ] Review [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)

### For Deployment
- [ ] Create Azure Static Web App
- [ ] Configure GitHub secrets
- [ ] Set up custom domain (optional)
- [ ] Configure SSL
- [ ] Enable monitoring
- [ ] Test production deployment
- [ ] Update team documentation with URLs

### For End Users
- [ ] Access generator URL
- [ ] Generate your signature
- [ ] Install in Outlook
- [ ] Test email signature
- [ ] Report any issues

---

Made with ❤️ by Alterspective
