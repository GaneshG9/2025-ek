#!/bin/bash

echo "🚀 Preparing for production deployment..."

# 1. Clean previous builds
echo "📦 Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf dist

# 2. Install production dependencies
echo "📥 Installing dependencies..."
npm ci --production=false

# 3. Run type checking
echo "🔍 Running type checks..."
npm run typecheck

# 4. Run linting
echo "🧹 Linting code..."
npm run lint

# 5. Build the application
echo "🏗️  Building application..."
npm run build

# 6. Test the build locally
echo "🧪 Starting local production server..."
echo "Visit http://localhost:3000 to test before deployment"
npm run start:local

echo "✅ Production build complete!"
echo ""
echo "📋 Next steps:"
echo "  • For Google Cloud: Run 'npm run deploy:gcp'"
echo "  • For Hostinger: Upload the .next and public folders"
echo "  • Update environment variables for your domain"