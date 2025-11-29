"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { getDarkModeClass } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Behandlungsgebiete", href: "/therapy" },
  { name: "Gut zu wissen", href: "/good-to-know" },
  { name: "Termin", href: "/appointment" },
  { name: "Kontakt", href: "/contact" },
];

export default function MobileNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`bg-white ${getDarkModeClass("dark:bg-gray-900")} shadow-sm`}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Mundwerk Health</span>
            <Image
              src="/logo.png"
              alt="Mundwerk Health Logo"
              width={80}
              height={80}
              priority
              className="h-20 w-20"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 ${getDarkModeClass("dark:text-gray-300")} hover:bg-gray-100 ${getDarkModeClass("dark:hover:bg-gray-800")} transition-colors`}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-lg font-semibold hover:opacity-80 transition-all"
              style={{ color: "#8B7A70" }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel
          className={`fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white ${getDarkModeClass("dark:bg-gray-900")} px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 ${getDarkModeClass("dark:sm:ring-white/10")}`}
        >
          <div className="flex items-center justify-between">
            {/* Logo in mobile menu */}
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Mundwerk Health</span>
              <Image
                src="/logo.png"
                alt="Mundwerk Health Logo"
                width={80}
                height={80}
                priority
                className="h-20 w-20"
              />
            </Link>

            {/* Close button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className={`-m-2.5 rounded-md p-2.5 text-gray-700 ${getDarkModeClass("dark:text-gray-300")} hover:bg-gray-100 ${getDarkModeClass("dark:hover:bg-gray-800")} transition-colors`}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile menu content */}
          <div className="mt-6 flow-root">
            <div
              className={`-my-6 divide-y divide-gray-500/10 ${getDarkModeClass("dark:divide-gray-700")}`}
            >
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`-mx-3 block rounded-lg px-3 py-3 text-lg font-semibold hover:bg-gray-50 ${getDarkModeClass("dark:hover:bg-gray-800")} hover:opacity-80 transition-all`}
                    style={{ color: "#8B7A70" }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
