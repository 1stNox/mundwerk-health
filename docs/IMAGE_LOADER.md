# Image Loader for Cloudflare Workers

## Overview

This project uses a custom image loader (`imageLoader.ts`) that is optimized for Cloudflare Workers deployment. The loader serves static images directly from the `public` folder without Next.js Image Optimization.

## Current Usage

The image loader is currently used in:

- **MobileNavbar component** (`src/components/MobileNavbar.tsx`) - Logo images with `priority` prop for optimal loading

## Configuration

The image loader is configured in `next.config.ts`:

```typescript
const nextConfig: NextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./imageLoader.ts",
  },
};
```

## How It Works

The custom loader:

- Serves images directly from the `public` folder
- Bypasses Next.js Image Optimization (which is not available on Cloudflare Workers)
- Supports external images (images with `http://` or `https://` URLs)
- Returns the image path as-is for Cloudflare Workers to serve

## Usage

### Basic Usage with Local Images

```tsx
import Image from "next/image";

export default function MyComponent() {
  return <Image src="/logo.png" alt="Logo" width={200} height={200} />;
}
```

### Using External Images

```tsx
import Image from "next/image";

export default function MyComponent() {
  return (
    <Image
      src="https://example.com/image.jpg"
      alt="External image"
      width={400}
      height={300}
    />
  );
}
```

### Responsive Images

```tsx
import Image from "next/image";

export default function MyComponent() {
  return (
    <div className="relative w-full h-64">
      <Image
        src="/hero-banner.jpg"
        alt="Hero banner"
        fill
        className="object-cover"
      />
    </div>
  );
}
```

### With Priority Loading

```tsx
import Image from "next/image";

export default function MyComponent() {
  return <Image src="/logo.png" alt="Logo" width={200} height={200} priority />;
}
```

## Important Notes

1. **No Image Optimization**: Since we're using a custom loader for Cloudflare Workers, Next.js Image Optimization is bypassed. Images are served as-is from the public folder.

2. **Image Sizing**: Make sure to provide appropriate `width` and `height` props or use the `fill` prop with a positioned parent container.

3. **File Location**: All local images should be placed in the `public` folder. Reference them with a leading slash (e.g., `/logo.png` for `public/logo.png`).

4. **Performance**: Consider optimizing your images before adding them to the `public` folder using tools like:
   - [TinyPNG](https://tinypng.com/)
   - [Squoosh](https://squoosh.app/)
   - [ImageOptim](https://imageoptim.com/)

5. **Modern Formats**: Use modern image formats like WebP or AVIF for better compression and quality.

## Example Component

Here's a complete example of a component using the image loader:

```tsx
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">Welcome</h1>
            <p className="text-lg text-gray-600">Your amazing content here</p>
          </div>
          <div className="flex-1">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={400}
              height={400}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
```

## Troubleshooting

### Image Not Loading

1. Verify the image exists in the `public` folder
2. Check that the path starts with `/` (e.g., `/logo.png` not `logo.png`)
3. Ensure the file extension is correct and matches the actual file

### Build Errors

If you see errors about image optimization, ensure:

- The `loader: 'custom'` is set in `next.config.ts`
- The `loaderFile: './imageLoader.ts'` path is correct
- The `imageLoader.ts` file exists in the project root

## Additional Resources

- [Next.js Image Component Documentation](https://nextjs.org/docs/app/api-reference/components/image)
- [OpenNext Cloudflare Documentation](https://opennext.js.org/cloudflare)
- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
