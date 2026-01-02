# Vercel Deployment Guide

## Prerequisites
1. A Vercel account
2. A PostgreSQL database (e.g., Vercel Postgres, Neon, Supabase, etc.)

## Steps to Deploy

### 1. Set Up Database
If you haven't already, create a PostgreSQL database. You can use:
- **Vercel Postgres** (recommended for Vercel deployments)
- **Neon** (https://neon.tech)
- **Supabase** (https://supabase.com)
- **Railway** (https://railway.app)

### 2. Initialize Database Schema
Run the schema on your production database:
```bash
# Connect to your database and run the schema.sql file
psql <your-database-url> < schema.sql
```

Or use the init script:
```bash
DATABASE_URL=<your-production-database-url> npm run init-db
```

### 3. Configure Environment Variables in Vercel

Go to your Vercel project settings → Environment Variables and add:

**Required:**
- `DATABASE_URL`: Your PostgreSQL connection string
  - Example: `postgresql://user:password@host:port/database`

**Optional:**
- `NEXT_PUBLIC_BASE_URL`: Your production URL
  - Example: `https://your-app.vercel.app`
  - Note: Vercel automatically sets `VERCEL_URL`, so this is optional

### 4. Deploy to Vercel

#### Option A: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### Option B: Deploy via GitHub
1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically deploy on every push to main

### 5. Verify Deployment

After deployment:
1. Check the Vercel deployment logs for any errors
2. Visit your site and check if posts are loading
3. Check the Vercel Function Logs for API errors

## Troubleshooting

### Posts not showing (404 errors)

**Check 1: Database Connection**
- Verify `DATABASE_URL` is set correctly in Vercel
- Check Vercel Function Logs for database connection errors

**Check 2: Posts Exist in Database**
- Connect to your production database
- Run: `SELECT id, title, slug FROM posts;`
- Ensure posts have slugs

**Check 3: Build Logs**
- Check Vercel build logs for errors during `generateStaticParams`
- Look for API fetch errors during build

**Check 4: Environment Variables**
- Ensure environment variables are set for all environments (Production, Preview, Development)
- Redeploy after adding environment variables

### Database Connection Errors

If you see "Failed to fetch posts" errors:
1. Verify your `DATABASE_URL` is correct
2. Check if your database allows connections from Vercel's IP ranges
3. Ensure SSL is properly configured (most cloud databases require SSL)

### API Routes Returning 500 Errors

Check Vercel Function Logs:
1. Go to your Vercel project
2. Click on "Logs" tab
3. Look for errors in the API routes
4. Common issues:
   - Database connection timeout
   - Missing environment variables
   - Database schema mismatch

## Post-Deployment Checklist

- [ ] Database is accessible from Vercel
- [ ] Environment variables are set
- [ ] Database schema is initialized
- [ ] At least one post exists in the database
- [ ] Posts have valid slugs
- [ ] API routes are working (`/api/posts` and `/api/posts/[id]`)
- [ ] Post pages are accessible

## Adding New Posts

You can add posts via:
1. The admin interface (Ctrl+Shift+A, password: amish2026)
2. Directly in the database
3. Using the Python script from your other project

Make sure each post has:
- `id` (UUID)
- `title`
- `excerpt`
- `content`
- `category` ('Tech' or 'Politics')
- `slug` (URL-friendly version of title)
- `created_at` (timestamp)
