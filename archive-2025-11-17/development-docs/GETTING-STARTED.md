# Getting Started with AltSig Deployment

**Quick reference guide for deploying AltSig to Azure Static Web Apps**

---

## What Has Been Prepared

Your project is now **deployment-ready** with the following structure and documentation:

### ✅ Project Structure
- Organized according to industry best practices
- Production code in `public/` directory
- Documentation in `docs/` directory
- Tests in `tests/` directory
- Clean separation of concerns

### ✅ Configuration Files
- `staticwebapp.config.json` - Azure configuration
- `.github/workflows/azure-static-web-apps.yml` - CI/CD pipeline
- `.gitignore` - Git exclusion rules
- `package.json` - Updated with correct metadata

### ✅ Documentation
- `PROJECT-TAXONOMY.md` - Naming conventions and rules
- `CHANGELOG.md` - Version history
- `DEPLOYMENT-GUIDE.md` - Comprehensive deployment instructions
- `DEPLOYMENT-CHECKLIST.md` - Step-by-step checklist
- `PROJECT-STRUCTURE.md` - File organization reference
- `README.md` - Main project documentation

---

## Next Steps (in order)

### 1. Review Documentation (15 minutes)

Read these files in order:
1. **PROJECT-STRUCTURE.md** - Understand the file organization
2. **PROJECT-TAXONOMY.md** - Learn naming conventions
3. **DEPLOYMENT-GUIDE.md** - Review deployment process

### 2. Verify Local Setup (10 minutes)

```bash
# Navigate to project directory
cd /Users/igorsharedo/Documents/Prototype/AltSig

# Install dependencies (if not done)
npm install

# Run tests to verify everything works
npm test

# Serve locally to preview
npm run serve
# Open http://localhost:3000
```

### 3. Initialize Git Repository (5 minutes)

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# First commit
git commit -m "feat: initial commit - v1.0.0 ready for Azure deployment"

# Add remote (replace with your actual GitHub repo URL)
git remote add origin https://github.com/alterspective/altsig.git

# Push to GitHub
git push -u origin main
```

### 4. Create Azure Static Web App (15 minutes)

**Option A: Using Azure Portal**
1. Go to https://portal.azure.com
2. Click "Create a resource"
3. Search for "Static Web App"
4. Fill in:
   - Name: `altsig-prod`
   - Region: `Australia East`
   - Plan: Free
   - Source: GitHub
   - Repository: `altsig`
   - Branch: `main`
   - Build Presets: Custom
   - App location: `/`
   - API location: (empty)
   - Output location: (empty)
5. Click "Review + Create"
6. Copy the deployment token

**Option B: Using Azure CLI**
```bash
# Login to Azure
az login

# Create resource group
az group create --name altsig-rg --location australiaeast

# Create static web app
az staticwebapp create \
  --name altsig-prod \
  --resource-group altsig-rg \
  --source https://github.com/alterspective/altsig \
  --branch main \
  --app-location "/" \
  --login-with-github
```

### 5. Configure GitHub Secrets (5 minutes)

1. Go to your GitHub repository
2. Settings → Secrets and variables → Actions
3. Click "New repository secret"
4. Add:
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: [paste deployment token from Azure]
5. Click "Add secret"

### 6. Deploy (Automatic)

```bash
# Trigger deployment by pushing to main
git push origin main

# Or create a new release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

GitHub Actions will automatically:
1. Run tests
2. Build the application
3. Deploy to Azure
4. Provide a deployment URL

### 7. Verify Deployment (10 minutes)

Use the **DEPLOYMENT-CHECKLIST.md** to verify:
- [ ] Site loads at Azure URL
- [ ] Logo displays correctly
- [ ] Form works
- [ ] Signature generates
- [ ] Copy to clipboard works
- [ ] Download HTML works
- [ ] No console errors

---

## Quick Commands Reference

```bash
# Development
npm run serve          # Serve locally
npm test               # Run tests
npm run test:ui        # Run tests with UI

# Deployment
git push origin main   # Deploy to production

# Testing
npm test              # All tests
npm run test:chromium # Chrome only
npm run test:firefox  # Firefox only
npm run test:webkit   # Safari only

# Monitoring
gh run list           # View GitHub Actions runs
gh run view [id]      # View specific run details
```

---

## File Path Updates Made

The following paths have been updated in the code:

**In `public/index.html`:**
- Logo in header: `assets/images/alterspective-logo.png`
- Logo in JavaScript: `assets/images/alterspective-logo.png`

**Files moved:**
- `generate-signature.html` → `public/index.html`
- `alterspective-logo.png` → `public/assets/images/alterspective-logo.png`
- `alterspective-symbol.png` → `public/assets/images/alterspective-symbol.png`
- Test files → `tests/` directory
- Documentation → `docs/` directory

---

## Important URLs (After Deployment)

Once deployed, bookmark these:

- **Production Site:** https://[your-app-name].azurestaticapps.net
- **Azure Portal:** https://portal.azure.com
- **GitHub Repository:** https://github.com/alterspective/altsig
- **GitHub Actions:** https://github.com/alterspective/altsig/actions

---

## Custom Domain Setup (Optional)

After initial deployment works:

1. **Decide on domain:** e.g., `signatures.alterspective.com.au`

2. **Add domain in Azure:**
   - Azure Portal → Your Static Web App
   - Settings → Custom domains
   - Click "Add"
   - Copy validation token

3. **Configure DNS:**
   ```
   Type: CNAME
   Name: signatures
   Value: [your-app].azurestaticapps.net
   TTL: 3600

   Type: TXT
   Name: _dnsauth.signatures
   Value: [validation-token]
   TTL: 3600
   ```

4. **Wait for DNS propagation** (5 min - 48 hours)

5. **Validate in Azure** - SSL certificate will be auto-issued

---

## Troubleshooting

### Issue: Tests fail locally
**Solution:**
```bash
# Update Playwright browsers
npx playwright install

# Run tests again
npm test
```

### Issue: Deployment fails
**Solution:**
1. Check GitHub Actions logs
2. Verify deployment token is correct
3. Ensure workflow file is in `.github/workflows/`
4. Check Azure portal for errors

### Issue: Site deployed but shows 404
**Solution:**
1. Verify `app_location: "/"` in workflow
2. Check `staticwebapp.config.json` routes
3. Ensure `public/index.html` exists
4. Clear browser cache

### Issue: Logo not showing
**Solution:**
1. Verify logo exists at `public/assets/images/alterspective-logo.png`
2. Check file permissions
3. Clear browser cache
4. Check browser console for 404 errors

---

## Support Resources

### Documentation
- **Deployment Guide:** [DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)
- **Deployment Checklist:** [DEPLOYMENT-CHECKLIST.md](DEPLOYMENT-CHECKLIST.md)
- **Project Structure:** [PROJECT-STRUCTURE.md](PROJECT-STRUCTURE.md)
- **Taxonomy Rules:** [PROJECT-TAXONOMY.md](PROJECT-TAXONOMY.md)

### External Resources
- **Azure Static Web Apps Docs:** https://docs.microsoft.com/azure/static-web-apps/
- **GitHub Actions Docs:** https://docs.github.com/actions
- **Playwright Docs:** https://playwright.dev

### Get Help
- **GitHub Issues:** Create an issue in the repository
- **Azure Support:** https://azure.microsoft.com/support/
- **Team Contact:** [your-team-contact]

---

## Pre-Flight Checklist

Before deploying, verify:

- [ ] All tests pass locally (`npm test`)
- [ ] Logo displays when serving locally (`npm run serve`)
- [ ] Git repository initialized
- [ ] GitHub repository created
- [ ] Azure account active
- [ ] Read deployment documentation

---

## Deployment Timeline Estimate

| Task | Time | Total |
|------|------|-------|
| Review documentation | 15 min | 15 min |
| Verify local setup | 10 min | 25 min |
| Initialize Git | 5 min | 30 min |
| Create Azure Static Web App | 15 min | 45 min |
| Configure GitHub secrets | 5 min | 50 min |
| Deploy (automatic) | 5 min | 55 min |
| Verify deployment | 10 min | 65 min |
| **Total** | **~1 hour** | |

*Custom domain setup adds ~30 minutes (plus DNS propagation time)*

---

## Success Criteria

Your deployment is successful when:

✅ Site loads at Azure URL without errors
✅ Logo displays correctly
✅ Form accepts input
✅ Signature generates and displays
✅ Copy to clipboard works
✅ Download HTML works
✅ No console errors
✅ Tests pass in GitHub Actions
✅ SSL certificate is valid (if custom domain)

---

## What's Next After Deployment?

1. **Share with team** - Send production URL
2. **Monitor usage** - Check Azure Application Insights
3. **Gather feedback** - From initial users
4. **Plan improvements** - Based on feedback
5. **Update documentation** - As needed

---

## Emergency Contacts

Keep these handy during deployment:

- **Azure Support:** [Azure support portal]
- **GitHub Support:** [GitHub support]
- **Team Lead:** [contact info]
- **IT Support:** [contact info]

---

## Final Notes

✅ **Your project is ready for deployment!**

All necessary files, configurations, and documentation are in place. Follow the steps above in order, and you'll have a production-ready signature generator deployed to Azure within an hour.

The taxonomy, naming conventions, and versioning strategy will help maintain the project as it grows. All documentation is in place for both developers and end-users.

**Good luck with your deployment!**

---

**Document Version:** 1.0.0
**Created:** 2025-11-04
**For:** Alterspective AltSig Project
**Next Step:** Review PROJECT-STRUCTURE.md
