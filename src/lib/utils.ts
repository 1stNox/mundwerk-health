import { featureFlags } from "@/config/featureFlags";

/**
 * Conditionally returns dark mode class based on forceLightMode feature flag
 * @param darkClass - The dark mode Tailwind class (e.g., "dark:bg-gray-900")
 * @returns The dark mode class if light mode is not forced, empty string otherwise
 */
export function getDarkModeClass(darkClass: string): string {
  return featureFlags.forceLightMode ? "" : darkClass;
}

/**
 * Conditionally returns multiple dark mode classes based on forceLightMode feature flag
 * @param darkClasses - Array of dark mode Tailwind classes
 * @returns Joined dark mode classes if light mode is not forced, empty string otherwise
 */
export function getDarkModeClasses(...darkClasses: string[]): string {
  return featureFlags.forceLightMode ? "" : darkClasses.join(" ");
}
