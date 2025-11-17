# Azure Static Web Apps - Deployment Checklist

**Project:** AltSig - Alterspective Email Signature Generator
**Version:** 1.0.0
**Date:** 2025-11-04

---

## Pre-Deployment Checklist

### 1. Code Quality ✅

- [x] **Project structure organized** according to taxonomy
- [x] **Naming conventions** followed throughout
- [x] **Logo paths updated** to use `assets/images/`
- [x] **Main file renamed** to `public/index.html`
- [ ] **All tests passing** - Run `npm test`
- [ ] **No console errors** - Check browser console
- [ ] **Code reviewed** by team member
- [ ] **No sensitive data** in code (API keys, passwords)

### 2. Configuration Files ✅

- [x] **staticwebapp.config.json** created and configured
- [x] **.gitignore** created with proper exclusions
- [x] **package.json** updated with correct metadata
- [x] **GitHub Actions workflow** created at `.github/workflows/azure-static-web-apps.yml`
- [x] **Playwright config** present and working

### 3. Documentation ✅

- [x] **README.md** comprehensive and up-to-date
- [x] **CHANGELOG.md** created with version history
- [x] **PROJECT-TAXONOMY.md** created with naming rules
- [x] **DEPLOYMENT-GUIDE.md** created with instructions
- [x] **PROJECT-STRUCTURE.md** created with file organization
- [x] **User documentation** moved to `docs/` directory
- [ ] **All documentation reviewed** for accuracy

### 4. Assets and Resources ✅

- [x] **Logo files** in `public/assets/images/`
- [ ] **Images optimized** (compressed for web)
- [ ] **All assets accessible** (no broken links)
- [ ] **Font loading** tested
- [ ] **Mobile responsive** verified

### 5. Testing 🔄

- [ ] **Unit tests pass** - `npm test`
- [ ] **Cross-browser testing**
  - [ ] Chrome/Edge
  - [ ] Firefox
  - [ ] Safari
- [ ] **Mobile testing**
  - [ ] iOS Safari
  - [ ] Android Chrome
- [ ] **Email client testing**
  - [ ] Outlook Desktop (Windows)
  - [ ] Outlook Desktop (Mac)
  - [ ] Outlook Web
  - [ ] Gmail
  - [ ] Apple Mail
- [ ] **Form validation** working
- [ ] **Copy to clipboard** working
- [ ] **Download HTML** working

---

## Azure Setup Checklist

### 1. Azure Account 🔄

- [ ] **Azure subscription** active
- [ ] **Resource group** created (e.g., `altsig-rg`)
- [ ] **Billing alerts** configured
- [ ] **Access permissions** verified

### 2. Static Web App Creation 🔄

- [ ] **Static Web App** created in Azure Portal
  - Name: `altsig-prod`
  - Region: `Australia East` (or closest to users)
  - Plan: Free or Standard
- [ ] **GitHub integration** configured
- [ ] **Deployment token** copied
- [ ] **Build settings** configured:
  - App location: `/`
  - API location: `` (empty)
  - Output location: `` (empty)

### 3. GitHub Configuration 🔄

- [ ] **Repository** created/confirmed
- [ ] **GitHub secret** added:
  - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
  - Value: [deployment token from Azure]
- [ ] **GitHub Actions** enabled
- [ ] **Workflow permissions** set to read/write
- [ ] **Branch protection** rules configured (optional)

### 4. Environment Variables 🔄

- [ ] **Production environment** variables set in Azure:
  - `VITE_PUBLIC_ENVIRONMENT=production`
  - `VITE_PUBLIC_VERSION=1.0.0`
- [ ] **Secrets** configured (if any)
- [ ] **Connection strings** set (if applicable)

---

## Deployment Execution Checklist

### 1. Pre-Deployment 🔄

- [ ] **Backup** current version (if updating)
- [ ] **Version number** updated in `package.json`
- [ ] **CHANGELOG.md** updated with release notes
- [ ] **All changes committed** to git
- [ ] **Clean working directory** - `git status`
- [ ] **Tests passing** locally - `npm test`

### 2. Deployment 🔄

- [ ] **Push to GitHub**
  ```bash
  git add .
  git commit -m "release: version 1.0.0"
  git tag -a v1.0.0 -m "Release version 1.0.0"
  git push origin main
  git push origin v1.0.0
  ```
- [ ] **GitHub Action triggered** - Check Actions tab
- [ ] **Build completed** successfully
- [ ] **Deployment completed** successfully
- [ ] **No errors** in GitHub Actions logs

### 3. Post-Deployment Verification 🔄

#### Immediate Checks (0-5 minutes)
- [ ] **Site is accessible** at Azure URL
- [ ] **Homepage loads** without errors
- [ ] **Logo displays** correctly
- [ ] **No 404 errors** in browser console
- [ ] **SSL certificate** valid (if custom domain)

#### Functional Testing (5-15 minutes)
- [ ] **Form accepts input** in all fields
- [ ] **Generate Signature** button works
- [ ] **Preview displays** correctly
- [ ] **Copy to Clipboard** works
- [ ] **Download HTML** works
- [ ] **Validation** working (required fields)
- [ ] **Error messages** display appropriately

#### Cross-Browser Testing (15-30 minutes)
- [ ] **Chrome** - Full functionality
- [ ] **Firefox** - Full functionality
- [ ] **Safari** - Full functionality
- [ ] **Edge** - Full functionality
- [ ] **Mobile Chrome** - Responsive and functional
- [ ] **Mobile Safari** - Responsive and functional

#### Email Client Testing (30-60 minutes)
- [ ] Generate test signature
- [ ] Copy and paste into:
  - [ ] **Outlook Desktop (Windows)**
  - [ ] **Outlook Desktop (Mac)**
  - [ ] **Outlook Web**
  - [ ] **Gmail**
  - [ ] **Apple Mail**
- [ ] Send test emails
- [ ] Verify signature appears correctly in received emails

---

## Custom Domain Setup Checklist

### 1. Domain Configuration 🔄

- [ ] **Custom domain** decided (e.g., `signatures.alterspective.com.au`)
- [ ] **DNS access** confirmed
- [ ] **Domain added** in Azure Portal
- [ ] **Validation token** copied from Azure

### 2. DNS Configuration 🔄

- [ ] **CNAME record** added:
  ```
  Type: CNAME
  Name: signatures
  Value: [altsig-prod].azurestaticapps.net
  TTL: 3600
  ```
- [ ] **TXT record** added for validation:
  ```
  Type: TXT
  Name: _dnsauth.signatures
  Value: [validation-token]
  TTL: 3600
  ```
- [ ] **DNS propagation** waited for (check with `nslookup`)

### 3. SSL Certificate 🔄

- [ ] **Domain validated** in Azure Portal
- [ ] **SSL certificate** auto-issued
- [ ] **HTTPS works** at custom domain
- [ ] **HTTP redirects** to HTTPS
- [ ] **Certificate valid** and trusted

---

## Monitoring and Analytics Checklist

### 1. Application Insights 🔄

- [ ] **Application Insights** enabled in Azure
- [ ] **Instrumentation key** configured
- [ ] **Basic telemetry** working
- [ ] **Custom events** configured for:
  - Signature generation
  - Copy to clipboard
  - Download HTML
- [ ] **Error logging** verified

### 2. Alerts and Notifications 🔄

- [ ] **Uptime monitoring** configured
- [ ] **Error rate alerts** set up
- [ ] **Performance alerts** configured
- [ ] **Email notifications** tested
- [ ] **Slack/Teams notifications** configured (optional)

### 3. Analytics 🔄

- [ ] **Google Analytics** added (optional)
- [ ] **Usage tracking** verified
- [ ] **Goal tracking** configured
- [ ] **Dashboard** created for monitoring

---

## Security Checklist

### 1. Application Security 🔄

- [ ] **No secrets** in code or config
- [ ] **Input validation** implemented
- [ ] **XSS prevention** in place
- [ ] **CORS** configured appropriately
- [ ] **Content Security Policy** headers set

### 2. Infrastructure Security 🔄

- [ ] **HTTPS enforced** (HTTP redirects to HTTPS)
- [ ] **Security headers** configured in `staticwebapp.config.json`:
  - X-Content-Type-Options
  - X-Frame-Options
  - X-XSS-Protection
  - Referrer-Policy
- [ ] **Access controls** reviewed
- [ ] **Azure security** settings reviewed

---

## Performance Checklist

### 1. Optimization 🔄

- [ ] **Images optimized** (compressed)
- [ ] **CSS minified** (if external)
- [ ] **JavaScript minified** (if external)
- [ ] **Caching headers** configured
- [ ] **Lazy loading** implemented (if applicable)

### 2. Performance Testing 🔄

- [ ] **Google PageSpeed** score > 90
- [ ] **Lighthouse** audit passed
- [ ] **Load time** < 3 seconds
- [ ] **Time to Interactive** < 5 seconds
- [ ] **Mobile performance** verified

---

## Documentation Checklist

### 1. Technical Documentation 🔄

- [ ] **README.md** updated with:
  - [ ] Project overview
  - [ ] Installation instructions
  - [ ] Usage guide
  - [ ] Deployment instructions
  - [ ] Contact information
- [ ] **CHANGELOG.md** updated with release
- [ ] **API documentation** current (if applicable)
- [ ] **Architecture diagrams** updated

### 2. User Documentation 🔄

- [ ] **Quick Start Guide** accessible
- [ ] **Outlook Installation Guide** accurate
- [ ] **FAQ** updated
- [ ] **Troubleshooting guide** comprehensive
- [ ] **Video tutorial** created (optional)

---

## Team Communication Checklist

### 1. Pre-Deployment 🔄

- [ ] **Deployment scheduled** and communicated
- [ ] **Team notified** of deployment window
- [ ] **Stakeholders informed**
- [ ] **Maintenance window** announced (if needed)

### 2. Post-Deployment 🔄

- [ ] **Deployment success** announced
- [ ] **Production URL** shared
- [ ] **Known issues** communicated
- [ ] **Next steps** outlined
- [ ] **Training session** scheduled (if needed)

---

## Rollback Plan Checklist

### 1. Preparation 🔄

- [ ] **Rollback procedure** documented
- [ ] **Previous version** tagged in Git
- [ ] **Backup** of current production
- [ ] **Team aware** of rollback procedure

### 2. Rollback Triggers 🔄

- [ ] **Critical bugs** defined
- [ ] **Performance thresholds** established
- [ ] **Error rate limits** set
- [ ] **Decision makers** identified

---

## Final Sign-Off

### Development Team

- [ ] **Lead Developer** approval: _______________
- [ ] **QA Engineer** approval: _______________
- [ ] **DevOps Engineer** approval: _______________

### Stakeholders

- [ ] **Project Manager** approval: _______________
- [ ] **Product Owner** approval: _______________
- [ ] **IT Manager** approval: _______________

### Deployment Authorization

- [ ] **Deployment authorized** by: _______________
- [ ] **Date/Time:** _______________
- [ ] **Deployment Window:** _______________

---

## Post-Deployment Monitoring

### First 24 Hours

- [ ] **Hour 1:** Check error logs
- [ ] **Hour 4:** Review usage metrics
- [ ] **Hour 8:** Verify all functionality
- [ ] **Hour 24:** Full system review

### First Week

- [ ] **Day 1:** Monitor error rates
- [ ] **Day 3:** Review user feedback
- [ ] **Day 7:** Performance analysis
- [ ] **Day 7:** Team retrospective

### First Month

- [ ] **Week 2:** Usage analytics review
- [ ] **Week 4:** Full performance audit
- [ ] **Month 1:** Feature feedback gathering
- [ ] **Month 1:** Planning next iteration

---

## Issues and Notes

### Pre-Deployment Issues
```
[Record any issues found during preparation]
```

### Deployment Issues
```
[Record any issues encountered during deployment]
```

### Post-Deployment Issues
```
[Record any issues found after deployment]
```

### Action Items
```
[Record follow-up actions needed]
```

---

## Completion Summary

**Deployment Date:** _______________
**Deployed By:** _______________
**Deployment Duration:** _______________
**Issues Encountered:** _______________
**Overall Status:** [ ] Success [ ] Success with Issues [ ] Failed

**Notes:**
```
[Add any additional notes about the deployment]
```

---

## Quick Reference

### Important URLs
- **Production:** https://[your-app].azurestaticapps.net
- **Custom Domain:** https://signatures.alterspective.com.au
- **Azure Portal:** https://portal.azure.com
- **GitHub Repo:** https://github.com/alterspective/altsig
- **Documentation:** https://github.com/alterspective/altsig/tree/main/docs

### Important Commands
```bash
# Test locally
npm test

# Deploy to production
git push origin main

# Check deployment status
gh run list

# View logs
gh run view [run-id]

# Rollback
git revert HEAD
git push origin main
```

### Emergency Contacts
- **Azure Support:** [support link]
- **Team Lead:** [contact info]
- **IT Support:** [contact info]

---

**Checklist Version:** 1.0.0
**Last Updated:** 2025-11-04
**Next Review:** 2025-12-04
