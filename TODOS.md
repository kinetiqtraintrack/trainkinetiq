# Kinetiq TODOs

## Pending

- [ ] **Set up Resend for contact form email notifications**
  1. Sign up at resend.com → API Keys → Create API Key
  2. Add to Vercel env vars: `RESEND_API_KEY`, `CONTACT_EMAIL` (your email)
  3. Add both to `.env.local`
  4. Run `npm install resend`
  5. Tell Claude "done" — will update `/api/contact/route.ts` to send emails
