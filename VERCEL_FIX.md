# Fixing 404 Errors on Vercel Deployment

## Summary of Changes

I've made several improvements to fix the 404 errors you're experiencing on Vercel:

### 1. **Added `generateStaticParams` Function**
   - Pre-generates all post pages at build time
   - Ensures Vercel knows about all your post routes
   - Located in: `src/app/posts/[slug]/page.tsx`

### 2. **Improved URL Handling**
   - Better handling of `VERCEL_URL` environment variable
   - Fallback to `NEXT_PUBLIC_BASE_URL` for custom domains
   - Works in both local and production environments

### 3. **Enhanced Error Logging**
   - Added detailed console logs to all API routes
   - Easier to debug issues in Vercel Function Logs
   - Shows exactly where failures occur

### 4. **Automatic Slug Generation**
   - POST endpoint now auto-generates slugs if not provided
   - Prevents posts without slugs from causing 404s
   - Converts titles to URL-friendly slugs

### 5. **Force Dynamic Rendering**
   - Added `export const dynamic = 'force-dynamic'` to post pages
   - Ensures fresh data on every request
   - Prevents stale cached data

## What You Need to Do

### 1. **Check Environment Variables in Vercel**

Go to your Vercel project → Settings → Environment Variables and ensure:

- ✅ `DATABASE_URL` is set (your PostgreSQL connection string)
- ✅ `NEXT_PUBLIC_BASE_URL` is set (optional, e.g., `https://pv-murex.vercel.app`)

**Important:** After adding/changing environment variables, you MUST redeploy!

### 2. **Verify Database Connection**

Make sure your database:
- Is accessible from Vercel's servers
- Has the correct schema (run `schema.sql` if needed)
- Contains posts with valid slugs

### 3. **Redeploy to Vercel**

```bash
# Option 1: Push to GitHub (if connected)
git add .
git commit -m "Fix 404 errors on Vercel"
git push

# Option 2: Deploy via Vercel CLI
vercel --prod
```

### 4. **Check Vercel Logs**

After deployment:
1. Go to your Vercel project dashboard
2. Click on "Deployments" → Select latest deployment
3. Click on "Functions" tab
4. Look for any errors in the logs
5. You should see logs like:
   - `[API] Fetching all posts...`
   - `[API] Successfully fetched X posts`
   - `[API] Fetching post with id/slug: ...`

## Troubleshooting

### Still Getting 404 Errors?

**Step 1:** Check if the API is working
- Visit: `https://your-domain.vercel.app/api/posts`
- You should see a JSON array of posts
- If you see an error, check the database connection

**Step 2:** Check if a specific post works
- Visit: `https://your-domain.vercel.app/api/posts/your-slug`
- Replace `your-slug` with your actual post slug
- If this works but the page doesn't, it's a rendering issue

**Step 3:** Check Vercel Function Logs
- Look for database connection errors
- Look for "Post not found" errors
- Check if `generateStaticParams` ran during build

**Step 4:** Verify Post Slugs
- Connect to your production database
- Run: `SELECT id, title, slug FROM posts;`
- Ensure all posts have non-null slugs

### Database Connection Issues?

If you see "Failed to fetch posts" errors:
1. Verify `DATABASE_URL` format: `postgresql://user:password@host:port/database`
2. Check if your database allows external connections
3. Ensure SSL is configured (add `?sslmode=require` to connection string if needed)

## Files Changed

- ✅ `src/app/posts/[slug]/page.tsx` - Added generateStaticParams and better error handling
- ✅ `src/app/api/posts/route.ts` - Added logging and auto-slug generation
- ✅ `src/app/api/posts/[id]/route.ts` - Added detailed logging
- ✅ `.env.example` - Documented required environment variables
- ✅ `DEPLOYMENT.md` - Complete deployment guide

## Next Steps

1. Commit and push these changes
2. Verify environment variables in Vercel
3. Redeploy
4. Check Vercel logs for any errors
5. Test the post URL: `https://your-domain.vercel.app/posts/2025-indian-politics-a-year-of-electoral-shifts-coalition-politics-and-policy-challenges`

If you're still having issues after following these steps, check the Vercel Function Logs and let me know what errors you see!
