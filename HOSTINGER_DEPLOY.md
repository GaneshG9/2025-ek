# Hostinger Deployment Instructions

## Prerequisites
1. Node.js 18 or higher
2. Access to Hostinger hosting panel
3. Domain configured in Hostinger

## Deployment Steps

### Method 1: Static Export (Recommended for Hostinger)
1. Update next.config.ts to enable static export:
   ```javascript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```

2. Build and export:
   ```bash
   npm run build
   npm run export
   ```

3. Upload the 'out' folder contents to your Hostinger public_html directory

### Method 2: Node.js App (If Hostinger supports Node.js)
1. Upload all files except node_modules
2. Install dependencies on server:
   ```bash
   npm install --production
   ```
3. Build the application:
   ```bash
   npm run build
   ```
4. Start the application:
   ```bash
   npm start
   ```

## Important Notes
- Update .env.production with your domain
- Ensure all API endpoints are configured for production
- Test localStorage functionality on your domain
- Configure proper HTTPS redirects