# 🚀 Deployment Checklist

## Pre-Deployment
- [ ] Code is tested and working locally
- [ ] All environment variables are configured
- [ ] Build runs successfully (`npm run build`)
- [ ] No TypeScript errors (`npm run typecheck`)
- [ ] Linting passes (`npm run lint`)
- [ ] Images and assets are optimized
- [ ] Database is ready (or localStorage is acceptable for demo)

## Google Cloud Deployment
- [ ] Google Cloud project is created
- [ ] Billing is enabled
- [ ] App Engine API is enabled
- [ ] `gcloud` CLI is installed and authenticated
- [ ] `app.yaml` is configured correctly
- [ ] Domain is configured (optional)
- [ ] SSL certificate is set up
- [ ] Environment variables are set in Cloud Console

### Google Cloud Commands:
```bash
# Build and test locally
npm run build
npm run start:local

# Deploy to App Engine
gcloud app deploy

# View logs
gcloud app logs tail -s default

# Open app
gcloud app browse
```

## Hostinger Deployment
- [ ] Hosting account is active
- [ ] Domain is pointing to Hostinger
- [ ] File Manager or FTP access is available
- [ ] Node.js support is enabled (if using server-side)
- [ ] SSL certificate is configured

### Hostinger Steps:
1. **Static Export Method:**
   ```bash
   # Update next.config.ts for static export
   npm run build
   # Upload 'out' folder contents to public_html
   ```

2. **Node.js Method (if supported):**
   ```bash
   # Upload all files except node_modules
   # SSH into server or use terminal
   npm install --production
   npm run build
   npm start
   ```

## Post-Deployment
- [ ] Test all pages and functionality
- [ ] Verify forms are working
- [ ] Check image loading
- [ ] Test admin panel functionality
- [ ] Verify localStorage works on the domain
- [ ] Test responsive design on mobile
- [ ] Check loading speeds
- [ ] Verify SSL certificate
- [ ] Test contact forms (if any)
- [ ] Check analytics (if enabled)

## Environment Variables to Set:
```
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://yourdomain.com
PORT=8080  # For Google Cloud
```

## Performance Optimization:
- [ ] Enable compression
- [ ] Configure caching headers
- [ ] Optimize images
- [ ] Minify CSS/JS (handled by Next.js)
- [ ] Enable CDN (optional)

## Security:
- [ ] HTTPS is enabled
- [ ] No sensitive data in client-side code
- [ ] API endpoints are secured
- [ ] CORS is configured properly

## Monitoring:
- [ ] Error tracking is set up
- [ ] Performance monitoring is enabled
- [ ] Uptime monitoring is configured
- [ ] Backup strategy is in place

## Rollback Plan:
- [ ] Previous version is backed up
- [ ] Rollback procedure is documented
- [ ] Database migration plan (if applicable)