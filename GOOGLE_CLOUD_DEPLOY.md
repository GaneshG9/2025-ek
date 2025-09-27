# Google Cloud Deployment Guide

## Prerequisites
1. Google Cloud account with billing enabled
2. Google Cloud SDK installed locally
3. Project created in Google Cloud Console

## Deployment Methods

### Method 1: Google App Engine (Recommended)
```bash
# 1. Install Google Cloud SDK
# https://cloud.google.com/sdk/docs/install

# 2. Authenticate
gcloud auth login

# 3. Set your project
gcloud config set project YOUR_PROJECT_ID

# 4. Enable App Engine API
gcloud services enable appengine.googleapis.com

# 5. Deploy
gcloud app deploy

# 6. Open your app
gcloud app browse
```

### Method 2: Cloud Run
```bash
# 1. Build and push Docker image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/property-website

# 2. Deploy to Cloud Run
gcloud run deploy property-website \
  --image gcr.io/YOUR_PROJECT_ID/property-website \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Method 3: Firebase App Hosting
```bash
# 1. Install Firebase CLI
npm install -g firebase-tools

# 2. Login to Firebase
firebase login

# 3. Initialize Firebase (if not done)
firebase init

# 4. Deploy
firebase deploy --only hosting
```

## Environment Variables
Set these in Google Cloud Console:
- NODE_ENV=production
- NEXT_PUBLIC_APP_URL=https://your-app-url.com

## Cost Optimization
- Use App Engine standard environment
- Set appropriate scaling settings
- Monitor usage in Google Cloud Console
- Consider using Cloud CDN for static assets