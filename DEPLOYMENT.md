# Deployment Guide for Vercel

## ✅ Fixed Issues
- Fixed all case-sensitivity issues (Components vs components)
- Removed hardcoded localhost URLs
- All API calls now use environment variables
- Created .env.example for documentation

## 🔧 Vercel Configuration

### Environment Variables
Add these in your Vercel project settings:

```
VITE_API_URL=https://your-backend-api.com
VITE_API_BASE_URL=https://your-backend-api.com/apif
```

### Build Settings
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

## ⚠️ Remaining Issues to Address

### 1. Unused/Commented Code
These files have hardcoded URLs but appear to be unused:
- `src/Components/Unused/AdminFormBuilder.jsx` (localhost:8000)
- `src/Components/admin_dashboard/AddUser.jsx` (localhost:8000)
- `src/Components/ZakatProvider.jsx` (commented code with localhost)

**Action:** Delete unused files or update them if needed.

### 2. Backend CORS Configuration
Make sure your Django backend allows requests from your Vercel domain:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-vercel-app.vercel.app",
    "https://your-custom-domain.com",
]

CORS_ALLOW_CREDENTIALS = True
```

### 3. Cookie/Session Configuration
Since you're using `credentials: "include"`, ensure:
- Backend sets `SameSite=None; Secure` for cookies
- Backend domain matches or allows cross-origin cookies
- Consider using token-based auth instead of cookies for production

### 4. Missing index.css Warning
The build shows: "index.css doesn't exist at build time"
- Check if `src/index.css` exists
- Verify it's imported in `main.jsx` or `App.jsx`

## 🚀 Deployment Steps

1. **Update Environment Variables**
   ```bash
   # In Vercel Dashboard:
   # Settings → Environment Variables
   # Add VITE_API_URL and VITE_API_BASE_URL
   ```

2. **Push to Git**
   ```bash
   git add .
   git commit -m "Fix production issues"
   git push
   ```

3. **Deploy**
   - Vercel will auto-deploy on push
   - Or manually trigger from Vercel dashboard

4. **Test**
   - Test all API endpoints
   - Check browser console for errors
   - Verify image loading
   - Test authentication flow

## 📝 Post-Deployment Checklist

- [ ] All pages load correctly
- [ ] API calls work with production backend
- [ ] Images load properly
- [ ] Authentication/login works
- [ ] Admin panel accessible
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Test on different browsers

## 🔍 Debugging

If build fails:
1. Check Vercel build logs
2. Verify all imports use correct case
3. Ensure all environment variables are set
4. Test build locally: `npm run build && npm run preview`

If runtime errors:
1. Check browser console
2. Verify API URLs in Network tab
3. Check CORS headers
4. Verify backend is accessible
