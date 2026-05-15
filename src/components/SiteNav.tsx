"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Admin", href: "/admin" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const navRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    if (!navRef.current) return;
    const links = navRef.current.querySelectorAll("li");

    // fade + slide in animation
    gsap.fromTo(
      navRef.current,
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      links,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, delay: 0.3, ease: "power2.out" }
    );
  }, []);

  return (
    <header className="nav-container">
      <ul ref={navRef} className="nav-links">
        {navLinks.map(({ label, href }) => {
          const isActive =
            pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <li key={href}>
              <Link
                href={href}
                className={isActive ? "active" : ""}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
}

