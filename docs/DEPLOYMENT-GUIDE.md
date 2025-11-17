# Azure Static Web Apps Deployment Guide

**Version:** 1.0.0
**Last Updated:** 2025-11-04
**Project:** AltSig - Alterspective Email Signature Generator

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Azure Setup](#azure-setup)
3. [GitHub Configuration](#github-configuration)
4. [Deployment Process](#deployment-process)
5. [Custom Domain Setup](#custom-domain-setup)
6. [SSL/TLS Configuration](#ssltls-configuration)
7. [Environment Variables](#environment-variables)
8. [Monitoring and Analytics](#monitoring-and-analytics)
9. [Troubleshooting](#troubleshooting)
10. [Rollback Procedures](#rollback-procedures)

---

## Prerequisites

### Required Accounts
- [ ] Azure account with active subscription
- [ ] GitHub account with repository access
- [ ] Domain registrar access (for custom domain)

### Required Tools
- [ ] Git installed locally
- [ ] Node.js 18+ installed
- [ ] Azure CLI (optional but recommended)
- [ ] GitHub CLI (optional)

### Required Knowledge
- Basic understanding of Git/GitHub
- Azure portal navigation
- DNS configuration basics

### Local Environment Setup
```bash
# Verify installations
git --version
node --version
npm --version

# Clone repository
git clone <repository-url>
cd AltSig

# Install dependencies
npm install

# Run tests locally
npm test

# Preview locally (if using a dev server)
npx serve .
```

---

## Azure Setup

### Step 1: Create Azure Static Web App

#### Using Azure Portal

1. **Navigate to Azure Portal**
   - Go to https://portal.azure.com
   - Sign in with your Azure account

2. **Create New Resource**
   - Click "Create a resource"
   - Search for "Static Web App"
   - Click "Create"

3. **Configure Basic Settings**
   ```
   Subscription: [Your Subscription]
   Resource Group: [Create new or select existing]
   Name: altsig-prod (or your preferred name)
   Plan type: Free (or Standard for production)
   Region: [Closest to your users - e.g., Australia East]
   ```

4. **Configure Deployment**
   ```
   Source: GitHub
   GitHub Account: [Your account]
   Organization: [Your organization]
   Repository: altsig
   Branch: main (or production)
   ```

5. **Configure Build Settings**
   ```
   Build Presets: Custom
   App location: /
   Api location: (leave empty)
   Output location: (leave empty)
   ```

6. **Review and Create**
   - Review all settings
   - Click "Create"
   - Wait for deployment to complete (2-3 minutes)

#### Using Azure CLI

```bash
# Login to Azure
az login

# Create resource group (if needed)
az group create \
  --name altsig-rg \
  --location australiaeast

# Create static web app
az staticwebapp create \
  --name altsig-prod \
  --resource-group altsig-rg \
  --source https://github.com/[your-org]/altsig \
  --branch main \
  --app-location "/" \
  --api-location "" \
  --output-location "" \
  --login-with-github
```

### Step 2: Retrieve Deployment Token

1. **From Azure Portal**
   - Navigate to your Static Web App
   - Go to "Settings" > "Configuration"
   - Copy the "Deployment token"
   - Save this securely (you'll need it for GitHub)

2. **From Azure CLI**
   ```bash
   az staticwebapp secrets list \
     --name altsig-prod \
     --resource-group altsig-rg \
     --query "properties.apiKey" \
     --output tsv
   ```

---

## GitHub Configuration

### Step 1: Add Azure Deployment Token

1. **Navigate to Repository Settings**
   - Go to your GitHub repository
   - Click "Settings" tab
   - Select "Secrets and variables" > "Actions"

2. **Add Secret**
   - Click "New repository secret"
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: [Paste deployment token from Azure]
   - Click "Add secret"

### Step 2: Verify Workflow File

The GitHub Actions workflow has already been created at:
`.github/workflows/azure-static-web-apps.yml`

**Verify the workflow contains:**
```yaml
- Correct branch names (main/production)
- Proper app_location: "/"
- Empty api_location and output_location
- Reference to the secret: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
```

### Step 3: Enable GitHub Actions

1. **Check Actions Tab**
   - Go to repository "Actions" tab
   - Ensure workflows are enabled
   - If disabled, click "Enable workflows"

2. **Verify Workflow Permissions**
   - Settings > Actions > General
   - Under "Workflow permissions"
   - Select "Read and write permissions"
   - Check "Allow GitHub Actions to create and approve pull requests"
   - Click "Save"

---

## Deployment Process

### Automatic Deployment (Recommended)

Deployments trigger automatically on:

1. **Push to main/production branch**
   ```bash
   git add .
   git commit -m "feat: deploy signature generator v1.0.0"
   git push origin main
   ```

2. **Pull Request Activity**
   - Opening a PR creates a preview environment
   - Updates to PR update the preview
   - Closing/merging PR removes preview

### Manual Deployment

#### Using Azure CLI
```bash
# Deploy from local directory
az staticwebapp deploy \
  --name altsig-prod \
  --resource-group altsig-rg \
  --source-path .
```

#### Using Static Web Apps CLI
```bash
# Install SWA CLI
npm install -g @azure/static-web-apps-cli

# Deploy
swa deploy \
  --deployment-token $AZURE_STATIC_WEB_APPS_API_TOKEN \
  --app-location .
```

### Deployment Verification

1. **Check GitHub Actions**
   - Go to Actions tab
   - Verify workflow completed successfully
   - Check logs for any errors

2. **Verify in Azure Portal**
   - Navigate to Static Web App
   - Click "Browse" to open site
   - Test signature generation
   - Verify all assets load correctly

3. **Test Checklist**
   - [ ] Homepage loads correctly
   - [ ] Logo displays properly
   - [ ] Form accepts input
   - [ ] Signature generates successfully
   - [ ] Copy to clipboard works
   - [ ] Download HTML works
   - [ ] Mobile responsive display
   - [ ] All images load
   - [ ] No console errors

---

## Custom Domain Setup

### Step 1: Add Custom Domain in Azure

1. **Navigate to Custom Domains**
   - Azure Portal > Your Static Web App
   - Settings > Custom domains
   - Click "Add"

2. **Configure Domain**
   - Domain name: `signatures.alterspective.com.au`
   - Click "Next"
   - Copy the provided CNAME/TXT record

### Step 2: Configure DNS Records

#### For Subdomain (CNAME)
```
Type: CNAME
Name: signatures
Value: [your-static-web-app].azurestaticapps.net
TTL: 3600
```

#### For Root Domain (ALIAS/ANAME)
```
Type: ALIAS or ANAME (depends on DNS provider)
Name: @
Value: [your-static-web-app].azurestaticapps.net
TTL: 3600
```

#### For Validation (TXT Record)
```
Type: TXT
Name: _dnsauth.signatures
Value: [validation-token-from-azure]
TTL: 3600
```

### Step 3: Verify Domain

1. **Wait for DNS Propagation**
   - Can take 5 minutes to 48 hours
   - Usually completes within 1-2 hours

2. **Check DNS**
   ```bash
   # Check CNAME record
   nslookup signatures.alterspective.com.au

   # Check TXT record
   nslookup -type=TXT _dnsauth.signatures.alterspective.com.au
   ```

3. **Validate in Azure**
   - Click "Validate" in Azure portal
   - Wait for confirmation

---

## SSL/TLS Configuration

### Automatic SSL (Recommended)

Azure Static Web Apps provides free SSL certificates automatically:

1. **Automatic Certificate**
   - Issued once domain is validated
   - Auto-renews before expiration
   - No configuration needed

2. **Verify SSL**
   - Visit https://[your-domain]
   - Check certificate in browser
   - Should show "Issued by: Microsoft Azure TLS Issuing CA"

### Custom SSL Certificate

If you need a custom certificate:

1. **Navigate to SSL Settings**
   - Azure Portal > Static Web App
   - Settings > Custom domains
   - Select your domain
   - Click "Add binding"

2. **Upload Certificate**
   - Select certificate file (.pfx)
   - Enter certificate password
   - Click "Upload"

---

## Environment Variables

### Configuration in Azure

1. **Navigate to Configuration**
   - Azure Portal > Static Web App
   - Settings > Configuration

2. **Add Application Settings**
   ```
   Name: VITE_PUBLIC_ENVIRONMENT
   Value: production
   ```

3. **Apply Changes**
   - Click "Save"
   - Restart may be required

### Environment-Specific Settings

#### Production
```bash
VITE_PUBLIC_ENVIRONMENT=production
VITE_PUBLIC_VERSION=1.0.0
VITE_PUBLIC_API_URL=https://api.alterspective.com.au
```

#### Staging
```bash
VITE_PUBLIC_ENVIRONMENT=staging
VITE_PUBLIC_VERSION=1.0.0-rc.1
VITE_PUBLIC_API_URL=https://api-staging.alterspective.com.au
```

---

## Monitoring and Analytics

### Azure Application Insights

1. **Enable Application Insights**
   - Azure Portal > Static Web App
   - Settings > Application Insights
   - Click "Enable"
   - Create new or select existing resource

2. **Configure Monitoring**
   ```javascript
   // Add to HTML <head>
   <script>
     var appInsights = window.appInsights || function(config) {
       // Application Insights initialization
     }({
       instrumentationKey: "YOUR_INSTRUMENTATION_KEY"
     });
   </script>
   ```

### Google Analytics (Optional)

```html
<!-- Add to <head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Monitoring Checklist
- [ ] Application Insights enabled
- [ ] Custom events tracking signature generation
- [ ] Error logging configured
- [ ] Performance monitoring active
- [ ] Uptime monitoring configured
- [ ] Alert rules created

---

## Troubleshooting

### Common Issues

#### 1. Deployment Fails

**Symptoms:** GitHub Action fails, deployment error

**Solutions:**
```bash
# Check workflow logs in GitHub Actions tab
# Verify API token is correct
# Ensure branch name matches workflow configuration
# Check for syntax errors in workflow file

# Re-add deployment token
# Azure Portal > Static Web App > Configuration > Copy token
# GitHub > Settings > Secrets > Update AZURE_STATIC_WEB_APPS_API_TOKEN
```

#### 2. Site Not Loading

**Symptoms:** 404 error, blank page

**Solutions:**
```bash
# Verify staticwebapp.config.json is correct
# Check app_location in workflow (should be "/")
# Ensure index.html or generate-signature.html exists
# Check browser console for errors
```

#### 3. Assets Not Loading (404 on images/CSS)

**Symptoms:** Broken images, no styling

**Solutions:**
```bash
# Check file paths in HTML (use relative paths)
# Verify files are committed to repository
# Check staticwebapp.config.json routes
# Ensure proper file permissions
```

#### 4. Custom Domain Not Working

**Symptoms:** Domain doesn't resolve, SSL error

**Solutions:**
```bash
# Verify DNS records are correct
# Wait for DNS propagation (up to 48 hours)
# Check TXT record for validation
# Try clearing DNS cache: ipconfig /flushdns (Windows) or sudo dscacheutil -flushcache (Mac)
```

#### 5. Form Not Submitting

**Symptoms:** Button click does nothing, no output

**Solutions:**
```bash
# Check browser console for JavaScript errors
# Verify generate-signature.html has correct script
# Test in different browsers
# Clear browser cache
```

### Debug Commands

```bash
# Check Azure Static Web App status
az staticwebapp show \
  --name altsig-prod \
  --resource-group altsig-rg

# View deployment logs
az staticwebapp show \
  --name altsig-prod \
  --resource-group altsig-rg \
  --query "defaultHostname"

# List all deployments
az staticwebapp environment list \
  --name altsig-prod \
  --resource-group altsig-rg
```

### Support Resources
- Azure Static Web Apps Docs: https://docs.microsoft.com/azure/static-web-apps/
- Azure Support: https://azure.microsoft.com/support/
- GitHub Actions Docs: https://docs.github.com/actions
- Project Issues: [Link to GitHub Issues]

---

## Rollback Procedures

### Rollback to Previous Version

#### Method 1: Git Revert
```bash
# Find commit to revert to
git log --oneline

# Revert to specific commit
git revert <commit-hash>
git push origin main

# Or reset to previous commit (use with caution)
git reset --hard <commit-hash>
git push origin main --force
```

#### Method 2: GitHub Releases
```bash
# Create release tags for each version
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# To rollback, checkout previous tag
git checkout v0.9.0
git push origin main --force
```

#### Method 3: Azure Portal
1. Azure Portal > Static Web App
2. Deployments
3. Select previous deployment
4. Click "Activate"

### Emergency Rollback

If site is completely broken:

1. **Disable Site Temporarily**
   ```bash
   # Add maintenance message to staticwebapp.config.json
   {
     "responseOverrides": {
       "404": {
         "rewrite": "/maintenance.html",
         "statusCode": 503
       }
     }
   }
   ```

2. **Quick Fix and Redeploy**
   ```bash
   # Fix the issue
   git add .
   git commit -m "hotfix: critical bug fix"
   git push origin main
   ```

3. **Verify Fix**
   - Wait for deployment
   - Test thoroughly
   - Remove maintenance page

---

## Pre-Deployment Checklist

Before each production deployment:

### Code Quality
- [ ] All tests passing (`npm test`)
- [ ] No console errors or warnings
- [ ] Code reviewed and approved
- [ ] Version number updated in package.json
- [ ] CHANGELOG.md updated

### Functionality
- [ ] Signature generation works correctly
- [ ] Copy to clipboard functions
- [ ] Download HTML works
- [ ] All form validations working
- [ ] Mobile responsive verified

### Assets
- [ ] All images optimized
- [ ] Logo files present and correct
- [ ] No broken links
- [ ] All file paths relative and correct

### Security
- [ ] No secrets in code
- [ ] Input validation in place
- [ ] HTTPS enforced
- [ ] Security headers configured

### Documentation
- [ ] README.md up to date
- [ ] Deployment guide current
- [ ] User guide accessible
- [ ] API documentation (if applicable)

### Monitoring
- [ ] Analytics configured
- [ ] Error logging active
- [ ] Alerts set up
- [ ] Performance monitoring enabled

---

## Post-Deployment Checklist

After deployment:

### Immediate Verification (0-5 minutes)
- [ ] Site loads without errors
- [ ] Homepage accessible
- [ ] All pages load correctly
- [ ] No 404 errors in browser console
- [ ] SSL certificate valid
- [ ] Custom domain resolves correctly

### Functional Testing (5-15 minutes)
- [ ] Generate signature with test data
- [ ] Copy to clipboard works
- [ ] Download HTML works
- [ ] Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- [ ] Test on mobile devices (iOS, Android)
- [ ] Verify email signature in Outlook

### Monitoring Setup (15-30 minutes)
- [ ] Check Application Insights for errors
- [ ] Verify analytics tracking
- [ ] Test alert notifications
- [ ] Review initial performance metrics

### Team Communication
- [ ] Notify team of successful deployment
- [ ] Share deployment URL
- [ ] Document any known issues
- [ ] Update project board/tracker

---

## Maintenance Schedule

### Regular Maintenance Tasks

#### Daily
- Check error logs
- Monitor uptime
- Review user feedback

#### Weekly
- Review analytics
- Check for security updates
- Test critical functionality

#### Monthly
- Update dependencies
- Review and optimize performance
- Check SSL certificate expiration
- Backup configurations

#### Quarterly
- Security audit
- Performance review
- Documentation review
- User feedback analysis

---

## Contact and Support

### Technical Support
- **Azure Issues:** Azure Support Portal
- **GitHub Issues:** Repository Issues tab
- **Internal Support:** [Your team contact]

### Escalation Path
1. Project maintainer
2. Team lead
3. Infrastructure team
4. Azure support

---

**Document Version:** 1.0.0
**Last Reviewed:** 2025-11-04
**Next Review Date:** 2026-02-04
**Owner:** Alterspective Development Team
