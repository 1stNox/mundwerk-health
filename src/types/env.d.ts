/**
 * Type definitions for environment variables
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      /**
       * Enable the navigation header
       * Values: 'true', 'false', '1', '0', 'yes', 'no' (case-insensitive)
       * Default: 'false'
       */
      NEXT_PUBLIC_ENABLE_NAVBAR?: string;

      /**
       * Force light mode across the entire application
       * When enabled, dark mode will be disabled regardless of system preferences
       * Values: 'true', 'false', '1', '0', 'yes', 'no' (case-insensitive)
       * Default: 'false'
       */
      NEXT_PUBLIC_FORCE_LIGHT_MODE?: string;
    }
  }
}

export {};
