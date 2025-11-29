# Feature Flags Guide

This document explains how to use feature flags in the Mundwerk Health application.

## Overview

Feature flags allow you to enable or disable features without changing code. They are controlled via environment variables and can be configured differently for development, staging, and production environments.

## Configuration

### Local Development

1. **Create your local environment file:**

   ```bash
   cp .env.local.example .env.local
   ```

2. **Edit `.env.local`** to enable/disable features:

   ```bash
   NEXT_PUBLIC_ENABLE_NAVBAR=true
   ```

3. **Restart your development server** to apply changes:
   ```bash
   pnpm dev
   ```

### Production Deployment

For Cloudflare Workers deployment, environment variables are configured in `wrangler.jsonc`:

**Current Configuration:**

- **Staging:** `NEXT_PUBLIC_ENABLE_NAVBAR=true` (navbar enabled)
- **Production:** `NEXT_PUBLIC_ENABLE_NAVBAR=false` (navbar disabled)

**To deploy:**

```bash
# Deploy to staging (navbar enabled)
pnpm run deploy:staging

# Deploy to production (navbar disabled)
pnpm run deploy:production
```

**To change the configuration:**

Edit `wrangler.jsonc` and modify the `vars` section for each environment:

```jsonc
"env": {
  "staging": {
    "vars": {
      "NEXT_PUBLIC_ENABLE_NAVBAR": "true"  // Change as needed
    }
  },
  "production": {
    "vars": {
      "NEXT_PUBLIC_ENABLE_NAVBAR": "false"  // Change as needed
    }
  }
}
```

**Alternative: Via Cloudflare Dashboard:**

- Go to Workers & Pages → Your Project
- Go to Settings → Environment Variables
- Add/modify `NEXT_PUBLIC_ENABLE_NAVBAR` per environment

## Available Feature Flags

### `NEXT_PUBLIC_ENABLE_NAVBAR`

**Purpose:** Controls whether the navigation header is displayed.

**Accepted Values:**

- `true`, `1`, `yes` (case-insensitive) → Enables the navbar
- `false`, `0`, `no` (case-insensitive) → Disables the navbar

**Default:** `false`

**Behavior:**

- **When enabled (`true`):**
  - Shows full navigation header with mobile menu
  - Desktop and mobile navigation available
  - Logo and menu items visible
  - Page layout includes navbar

- **When disabled (`false`):**
  - Shows centered "Under Construction" message
  - No navigation elements visible
  - Simple, minimal view

## Implementation Details

### Code Structure

```
src/
├── config/
│   └── featureFlags.ts       # Feature flag configuration and parsing
├── types/
│   └── env.d.ts              # TypeScript type definitions for env vars
├── app/
│   ├── layout.tsx            # Conditionally renders navbar
│   └── page.tsx              # Different layouts based on flags
└── components/
    └── MobileNavbar.tsx      # Navigation component
```

### Usage in Code

```typescript
import { featureFlags } from "@/config/featureFlags";

// Check if feature is enabled
if (featureFlags.enableNavbar) {
  // Feature is enabled
} else {
  // Feature is disabled
}
```

### Type Safety

Environment variables are typed in `src/types/env.d.ts`:

```typescript
interface ProcessEnv {
  NEXT_PUBLIC_ENABLE_NAVBAR?: string;
}
```

## Best Practices

1. **Always use `NEXT_PUBLIC_` prefix** for client-side environment variables
2. **Provide sensible defaults** in the parsing logic
3. **Document all feature flags** in this file
4. **Test both states** (enabled and disabled) before deploying
5. **Use environment-specific configs** for staging vs production

## Adding New Feature Flags

To add a new feature flag:

1. **Add to `.env.local.example`:**

   ```bash
   NEXT_PUBLIC_NEW_FEATURE=false
   ```

2. **Add to `src/types/env.d.ts`:**

   ```typescript
   NEXT_PUBLIC_NEW_FEATURE?: string;
   ```

3. **Add to `src/config/featureFlags.ts`:**

   ```typescript
   newFeature: parseEnvBoolean(process.env.NEXT_PUBLIC_NEW_FEATURE, false),
   ```

4. **Document it in this file** with purpose, values, and behavior

## Troubleshooting

### Changes not reflecting

**Problem:** Changed `.env.local` but feature flag still uses old value

**Solution:** Restart your development server:

```bash
# Stop the current server (Ctrl+C)
pnpm dev
```

### Build-time vs Runtime

**Important:** Environment variables prefixed with `NEXT_PUBLIC_` are embedded at **build time**. For runtime configuration, consider using a different approach.

### Verifying current values

Add this to any page to debug:

```typescript
console.log("Feature Flags:", {
  enableNavbar: process.env.NEXT_PUBLIC_ENABLE_NAVBAR,
});
```

## Environment Files Priority

Next.js loads environment files in this order (highest priority first):

1. `.env.local` (all environments, ignored by git)
2. `.env.production` or `.env.development` (environment-specific)
3. `.env` (all environments)

**Note:** `.env.local.example` is for documentation only and is not loaded.

## Security Considerations

- ✅ Feature flags are safe to expose (they're public by design with `NEXT_PUBLIC_` prefix)
- ❌ **Never** put secrets or API keys in `NEXT_PUBLIC_` variables
- ✅ The `.env.local` file is gitignored to prevent accidental commits
- ✅ Use Cloudflare secrets for sensitive production values

## Resources

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Cloudflare Workers Environment Variables](https://developers.cloudflare.com/workers/configuration/environment-variables/)
