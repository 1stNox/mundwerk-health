/**
 * Feature flags configuration
 *
 * Features are controlled via environment variables.
 * See .env.local.example for available flags.
 */

/**
 * Parse environment variable as boolean
 * Accepts: 'true', 'false', '1', '0', 'yes', 'no' (case-insensitive)
 */
function parseEnvBoolean(
  value: string | undefined,
  defaultValue: boolean,
): boolean {
  if (!value) return defaultValue;

  const normalized = value.toLowerCase().trim();

  if (normalized === "true" || normalized === "1" || normalized === "yes") {
    return true;
  }

  if (normalized === "false" || normalized === "0" || normalized === "no") {
    return false;
  }

  return defaultValue;
}

export const featureFlags = {
  /**
   * Enable the new navigation header
   * When disabled, only shows the under construction screen
   *
   * Environment variable: NEXT_PUBLIC_ENABLE_NAVBAR
   * Default: false
   */
  enableNavbar: parseEnvBoolean(process.env.NEXT_PUBLIC_ENABLE_NAVBAR, false),

  /**
   * Force light mode across the entire application
   * When enabled, dark mode will be disabled and light mode will be enforced
   *
   * Environment variable: NEXT_PUBLIC_FORCE_LIGHT_MODE
   * Default: false
   */
  forceLightMode: parseEnvBoolean(
    process.env.NEXT_PUBLIC_FORCE_LIGHT_MODE,
    false,
  ),
} as const;

export type FeatureFlags = typeof featureFlags;
