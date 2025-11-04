
# Grace Learning Center — Next.js + Supabase (Blossoming tree theme)

This project is ready-to-deploy and connects to Supabase for remote editing. Admin editor at `/admin`.

## Quick start (local)

1. Copy `.env.local.example` to `.env.local` and confirm the Supabase values are correct.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run dev:
   ```bash
   npm run dev
   ```
4. Open http://localhost:3000 and visit /admin to create defaults or sign in.

## Deploy to Vercel
- Push to a Git repository and import into Vercel. Set environment variables in Vercel:
  - NEXT_PUBLIC_SUPABASE_URL
  - NEXT_PUBLIC_SUPABASE_ANON_KEY

## Notes
- Admin email added to SQL: tobiadesanwo0@gmail.com
- You own this project; it's licensed under MIT in LICENSE.txt.
