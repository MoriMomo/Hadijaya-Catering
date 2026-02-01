# 🔐 Security Guidelines

## Environment Variables

### Setup
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Add your actual values to `.env.local` (never commit this file)

3. Access variables in code:
   ```javascript
   // ✅ Correct - Vite environment variables
   const apiKey = import.meta.env.VITE_API_KEY;
   
   // ❌ Never do this
   const apiKey = "sk_live_abc123..."; // hardcoded!
   ```

### Naming Convention
- Prefix all frontend environment variables with `VITE_`
- Example: `VITE_STRIPE_PUBLIC_KEY`, `VITE_API_URL`
- Variables without `VITE_` prefix won't be exposed to the browser

## Security Checklist

### ✅ Before Committing
- [ ] No API keys in code
- [ ] No `.env.local` or `.env` files in git
- [ ] All secrets use environment variables
- [ ] Sensitive operations happen on backend (payment processing, auth)

### ✅ Git Safety
```bash
# Check for exposed secrets before committing
git diff --cached | grep -i "key\|secret\|token\|password"

# View what would be committed
git diff --cached

# Remove accidental commits with secrets
git reset HEAD <file>
```

### ✅ Current Status
- ✅ No hardcoded API keys found
- ✅ No secrets in git history
- ✅ `.gitignore` properly configured
- ✅ `.env.example` template created

## Sensitive Operations

### WhatsApp Integration
- ✅ Currently using direct WhatsApp Web links: `https://wa.me/...`
- Safe for frontend (no credentials needed)

### Future Payment Processing
If adding Stripe, PayPal, or similar:
1. **Publish key** on frontend (prefixed with `pk_`, `pk_test_`, etc.)
2. **Secret key** on backend only (prefixed with `sk_`, `sk_live_`, etc.)
3. Never expose secret keys to frontend

Example:
```javascript
// Frontend - SAFE
const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Backend only - KEEP SECRET
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
```

## Monitoring

### Error Tracking
- Already implemented: `src/utils/errorTracker.js`
- Development-only (no production overhead)
- Logs to console for debugging

### Third-party Services
When integrating external services:
1. Use official SDKs/libraries
2. Store credentials in environment variables
3. Follow service's security guidelines
4. Don't log sensitive data

## Quick Reference

```bash
# Install dependencies
npm install

# Development
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Check for linting issues
npm run lint
```

## Emergency: Secret Leaked?

If you accidentally commit a secret:

```bash
# 1. Remove from git history (permanent removal)
git log --all --oneline -S "exposed_secret"

# 2. Use git filter-branch or BFG Repo-Cleaner
# (Advanced - consult documentation)

# 3. Rotate the exposed credential immediately
# 4. Notify security team/service provider
```

---

**Last Updated:** February 1, 2026
**Status:** ✅ All security measures in place
