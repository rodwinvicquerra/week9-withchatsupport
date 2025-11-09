# Digital portfolio website

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/rodwindizvicquerra-7746s-projects/v0-digital-portfolio-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/bkdKmcIlgCy)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/rodwindizvicquerra-7746s-projects/v0-digital-portfolio-website](https://vercel.com/rodwindizvicquerra-7746s-projects/v0-digital-portfolio-website)**

### Environment Variables

For the application to work correctly on Vercel, you need to set the following environment variables in your Vercel project settings:

1. **POSTGRES_URL** (Required)
   - This is your Vercel Postgres/Neon database connection string
   - To get this:
     - Go to your Vercel project dashboard
     - Navigate to Storage → Create Database → Postgres (or use existing)
     - Copy the connection string from the database settings
   - Format: `postgres://user:password@host:port/database?sslmode=require`

2. **JWT_SECRET** (Required)
   - A secret key for JWT token signing
   - Generate a secure random string (e.g., using `openssl rand -base64 32`)
   - This should be a long, random string for security

3. **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY** (If using Clerk)
   - Your Clerk publishable key from the Clerk dashboard

4. **CLERK_SECRET_KEY** (If using Clerk)
   - Your Clerk secret key from the Clerk dashboard

#### Setting Environment Variables in Vercel:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable with its value
4. Select the environments (Production, Preview, Development) where it should be available
5. Redeploy your application after adding variables

### Database Setup

After setting up your database connection string, you need to create the required tables:

1. Run the database setup script locally (if you have database access):
   ```bash
   node scripts/setup-db.js
   ```

2. Or manually create the `users` table in your Vercel Postgres database using the SQL from `lib/neon.ts`

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/bkdKmcIlgCy](https://v0.app/chat/projects/bkdKmcIlgCy)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
