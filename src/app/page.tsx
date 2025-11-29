import { featureFlags } from "@/config/featureFlags";

export default function Home() {
  // When navbar is disabled, show centered construction message
  if (!featureFlags.enableNavbar) {
    return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            UNDER CONSTRUCTION
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            We&apos;re working hard to bring you something amazing. Check back
            soon!
          </p>
        </main>
      </div>
    );
  }

  // When navbar is enabled, show full page with navbar
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <main className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            UNDER CONSTRUCTION
          </h1>
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
            We&apos;re working hard to bring you something amazing. Check back
            soon!
          </p>
        </div>
      </main>
    </div>
  );
}
