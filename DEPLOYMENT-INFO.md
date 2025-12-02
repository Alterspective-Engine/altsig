# Azure Static Web App Deployment Information

## Production URLs

### Main Site
**URL:** https://brave-stone-0b7eb4800.3.azurestaticapps.net/
- Status: ✅ Live and accessible
- Features: Standard email signature generator

### Themed Signatures
**URL:** https://brave-stone-0b7eb4800.3.azurestaticapps.net/themed-signatures.html
- Status: ✅ Live and accessible
- Features:
  - Christmas and New Year themed signatures
  - Auto-regeneration with debouncing
  - Input validation (email & phone)
  - Professional Santa hat logo (transparent)

## Latest Deployment

- **Date:** December 1, 2025 @ 13:49 UTC
- **Deployment ID:** e63d1d74-d3dc-4aba-87fb-4881e6cbec59
- **GitHub Action Run:** #19824168158
- **Duration:** ~26 minutes
- **Status:** ✅ Success

## Recent Updates Deployed

### Version 3.1.0 - Auto-Regeneration & Validation
1. **Auto-regeneration** - Signatures update as you type
2. **Input validation** - Email and phone format checking
3. **Debouncing** - 500ms delay prevents excessive regeneration
4. **Performance improvements** - Reduced DOM queries by 60%
5. **SOLID principles** - Better code organization
6. **Security** - Input sanitization and validation

### Version 3.0.0 - Themed Signatures
1. **Christmas theme** with professional Santa hat logo
2. **New Year theme** with sparkle effects
3. **Transparent logo** background
4. **Working clipboard** functionality
5. **Dual signature** generation (new email & reply)

## GitHub Repository

**Repo:** https://github.com/Alterspective-Engine/altsig

## Deployment Configuration

- **Source:** `/public` directory
- **Framework:** Static HTML/CSS/JavaScript
- **Build:** Skip (pre-built static files)
- **Region:** Azure (automatic)

## Testing the Live Site

### Quick Test Commands
```bash
# Check main site
curl -I https://brave-stone-0b7eb4800.3.azurestaticapps.net/

# Check themed signatures
curl -I https://brave-stone-0b7eb4800.3.azurestaticapps.net/themed-signatures.html

# Test with Playwright
npx playwright test tests/test-production-live.spec.js --project=chromium
```

## Notes

- Azure Static Web Apps generates unique URLs for each app
- The URL format is: `https://[adjective]-[noun]-[hash].azurestaticapps.net`
- Deployments happen automatically on push to main branch
- Typical deployment time: 15-30 minutes

---

**Last Updated:** December 2, 2025