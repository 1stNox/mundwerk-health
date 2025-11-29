import type { ImageLoaderProps } from "next/image";

/**
 * Custom image loader for Cloudflare Workers
 *
 * This loader is designed to work with static images in the public folder
 * when deploying to Cloudflare Workers. It bypasses Next.js Image Optimization
 * and serves images directly from the public directory.
 *
 * @param {ImageLoaderProps} props - The image loader properties
 * @returns {string} The image URL
 */
export default function cloudflareLoader({
  src,
  width,
  quality,
}: ImageLoaderProps): string {
  // If the src is already an absolute URL (external image), return it as-is
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // For local images in the public folder, return the path as-is
  // Cloudflare Workers will serve these static assets directly
  return src;
}
