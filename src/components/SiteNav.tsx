"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
];

const SiteNav: React.FC = () => {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 right-0 w-full z-50 bg-white/90 backdrop-blur border-b border-neutral-200">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Left-aligned title */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-neutral-900"
        >
          Justice Auguste
        </Link>

        {/* Right-aligned navigation links */}
        <ul className="flex space-x-8 ml-auto">
          {navLinks.map(({ label, href }) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? "text-neutral-900 border-b-2 border-neutral-900 pb-1"
                      : "text-neutral-500 hover:text-neutral-900"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default SiteNav;
