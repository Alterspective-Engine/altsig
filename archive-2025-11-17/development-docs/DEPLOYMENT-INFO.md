# AltSig Deployment Information

## Production URL
https://brave-stone-0b7eb4800.3.azurestaticapps.net/

## Deployment Details

### Azure Resources
- Service: Azure Static Web Apps
- Name: altsig
- Resource Group: Alterspective
- Location: East Asia
- SKU: Free Tier
- Status: Active

### Features Live
- Email signature generator with embedded logo (base64)
- Vertical green divider line
- Copy to clipboard functionality
- Download HTML functionality
- Mobile responsive design
- Works offline after initial load

## Access Information

### Public URL
https://brave-stone-0b7eb4800.3.azurestaticapps.net/

Share this link with all employees to create their signatures.

## Management Commands

### Redeploy
npx @azure/static-web-apps-cli deploy ./public --deployment-token $(az staticwebapp secrets list --name altsig --resource-group Alterspective --query "properties.apiKey" -o tsv) --env production

### Get Deployment Token
az staticwebapp secrets list --name altsig --resource-group Alterspective --query "properties.apiKey" -o tsv

### View Resource Info
az staticwebapp show --name altsig --resource-group Alterspective -o table

## Costs
Free Tier - No costs
- 100 GB bandwidth/month
- 250 GB storage
- Custom domains included
- SSL certificates included

Deployed: November 4, 2025
