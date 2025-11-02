"use client";

import { useEffect, useRef } from "react";
import FolderAnimation from "@/components/FolderAnimation";
import PortfolioProjects from "@/components/PortfolioProjects";

const PortfolioPage: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const descriptionRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const headingEl = headingRef.current;
    const descriptionEl = descriptionRef.current;
    if (!headingEl || !descriptionEl) return;

    const animateIn = (element: HTMLElement, delay: number) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      setTimeout(() => {
        element.style.transition =
          "opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }, delay);
    };

    animateIn(headingEl, 80);
    animateIn(descriptionEl, 220);

    return () => {
      headingEl.style.transition = "";
      headingEl.style.opacity = "";
      headingEl.style.transform = "";
      descriptionEl.style.transition = "";
      descriptionEl.style.opacity = "";
      descriptionEl.style.transform = "";
    };
  }, []);

  return (
    <div className="flex flex-col flex-grow bg-white min-h-0">
      <section className="w-full bg-neutral-100/60 py-16">
        <div className="mx-auto flex w-full max-w-5xl flex-col-reverse items-center gap-10 px-6 lg:flex-row">
          <div className="flex-1 text-center lg:text-left">
            <h1
              ref={headingRef}
              className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl"
            >
              Portfolio
            </h1>
            <p
              ref={descriptionRef}
              className="mt-4 text-base leading-relaxed text-neutral-700 sm:text-lg"
            >
              A curated selection of story-driven animation, boards, and motion
              work. Every project highlights timing, emotion, and the craft of
              bringing characters to life.
            </p>
          </div>

          <div className="flex w-full justify-center lg:w-auto lg:justify-end">
            <FolderAnimation className="lg:pl-6" />
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">
            Selected Work
          </h2>
          <p className="mt-2 text-sm text-neutral-600 sm:text-base">
            Explore highlights from recent projects. Links route to detailed
            case studies, animatics, or full sequences when available.
          </p>
        </div>

        <div className="mt-10">
          <PortfolioProjects />
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
