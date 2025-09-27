# Local Development Setup

## Firebase Issue Resolution

This project has been configured for **local development without Firebase** to resolve connection issues.

### ✅ **What's Fixed:**

1. **Firebase Connection Errors Resolved**
   - Disabled Firebase initialization for local development
   - Implemented localStorage-based services as replacement
   - No more "Could not reach Cloud Firestore backend" errors

2. **Local Storage Services**
   - All admin panel functionality works with mock data
   - Data persists in browser localStorage
   - Compatible with all existing components

3. **Auto-Login for Development**
   - Demo admin user automatically logged in
   - Full access to admin panel features
   - No authentication barriers during development

### 🚀 **Current Features Working:**

- ✅ Admin Dashboard with CRM features
- ✅ Dark/Light mode theme switching  
- ✅ Google Maps integration for properties
- ✅ Property management
- ✅ User management
- ✅ Contact forms
- ✅ Solar lead tracking
- ✅ Marketing lead management
- ✅ Page content management
- ✅ Role-based permissions

### 🗂️ **File Structure:**

```
src/lib/
├── firebase.ts          # Disabled for local development
├── local-services.ts    # localStorage-based data services
├── mock-data.ts         # Sample data for testing
└── permissions.ts       # Role-based access control
```

### 📊 **Demo Data:**

The application includes sample data for:
- **Properties**: 2 sample listings with Google Maps locations
- **Users**: Demo admin and agent users
- **Contacts**: Sample contact form submissions
- **Solar Leads**: Example solar energy inquiries
- **Marketing Leads**: Sample digital marketing prospects

### 🎯 **Development Commands:**

```bash
# Start development server
npm run dev

# Access admin panel (auto-login enabled)
http://localhost:9002/admin

# View main website
http://localhost:9002
```

### 🔑 **Demo Credentials:**

Auto-login is enabled with:
- **Name**: Demo Admin
- **Role**: Owner (full permissions)
- **Department**: Management

### 🌐 **Production Setup:**

For production deployment, you'll need to:

1. **Configure Real Firebase Project:**
   ```bash
   # Update .env.local with actual Firebase credentials
   NEXT_PUBLIC_FIREBASE_API_KEY="your-actual-api-key"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-actual-project-id"
   # ... other Firebase config
   ```

2. **Re-enable Firebase:**
   - Update `src/lib/firebase.ts` with proper Firebase initialization
   - Switch imports back to Firebase services in components

3. **Set Up Authentication:**
   - Configure Firebase Auth providers
   - Update auth context to use Firebase Auth
   - Set up user registration/login flows

### 🛠️ **Troubleshooting:**

If you encounter any issues:

1. **Clear browser localStorage**: 
   ```javascript
   // In browser console:
   localStorage.clear()
   ```

2. **Restart development server**:
   ```bash
   npm run dev
   ```

3. **Check console for errors**:
   - Open browser dev tools
   - Check for any remaining Firebase connection attempts

### 📝 **Notes:**

- All data is stored locally in browser localStorage
- Data will persist between browser sessions
- Clear localStorage to reset all data to defaults
- Google Maps integration works with demo API key
- Theme preferences are saved locally