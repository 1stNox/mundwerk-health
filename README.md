# Mundwerk Health

A modern, mobile-first health application built with Next.js.

## Getting Started

First, install dependencies:

```bash
pnpm install
```

Copy the environment variables example file:

```bash
cp .env.local.example .env.local
```

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Feature Flags

Feature flags are controlled via environment variables. This allows you to enable/disable features without changing code.

### Quick Setup

1. Copy the example environment file:

   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` to enable/disable features:

   ```bash
   NEXT_PUBLIC_ENABLE_NAVBAR=true  # or false
   ```

3. Restart the dev server to apply changes

### Available Feature Flags

- **`NEXT_PUBLIC_ENABLE_NAVBAR`**: Enable/disable the navigation header
  - Default: `false` (shows "Under Construction" screen)
  - Set to `true` to show the full navbar

📖 **For detailed documentation:**

- [Feature Flags Guide](./docs/FEATURE_FLAGS.md) - Comprehensive feature flags documentation
- [Deployment Guide](./docs/DEPLOYMENT.md) - Deployment instructions and best practices
- [Configuration Summary](./CONFIGURATION_SUMMARY.md) - Quick reference for all environments
- [Quick Start](./QUICK_START.md) - Visual testing guide

## Project Structure

```
src/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout with navbar
│   ├── page.tsx      # Home page
│   └── globals.css   # Global styles
├── components/       # React components
│   └── MobileNavbar.tsx  # Mobile-first navigation component
└── config/           # Configuration files
    └── featureFlags.ts   # Feature flags configuration
```

## Tech Stack

- **Framework**: Next.js 15
- **React**: 19
- **Styling**: Tailwind CSS 4
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **TypeScript**: 5.8
- **Deployment**: Cloudflare Workers (via @opennextjs/cloudflare)

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Fix ESLint errors
- `pnpm format` - Format code with Prettier
- `pnpm preview` - Preview production build locally
- `pnpm deploy:staging` - Deploy to staging (navbar enabled)
- `pnpm deploy:production` - Deploy to production (navbar disabled)

## License

Private
