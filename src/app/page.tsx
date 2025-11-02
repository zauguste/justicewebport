"use client";

import { useEffect, useRef } from "react";
import BodyText from "../components/BodyText";
import AnimatedLogo from "../components/AnimatedLogo";

const Page: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement | null>(null);
  const paragraphRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!headlineRef.current || !paragraphRef.current) return;

    // Animate heading words
    const headingWords = headlineRef.current.querySelectorAll(".hero-word");
    headingWords.forEach((word, i) => {
      const el = word as HTMLElement;
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
      setTimeout(() => {
        el.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, i * 80);
    });

    // Animate paragraph
    paragraphRef.current.style.opacity = "0";
    paragraphRef.current.style.transform = "translateY(20px)";
    setTimeout(() => {
      if (paragraphRef.current) {
        paragraphRef.current.style.transition = "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
        paragraphRef.current.style.opacity = "1";
        paragraphRef.current.style.transform = "translateY(0)";
      }
    }, 400);
  }, []);

  return (
    <div className="flex flex-col flex-grow bg-white min-h-0">
      <section className="flex flex-1 flex-col items-center justify-center">
        {/* Logo section */}
        <div className="relative w-full bg-[#0F0F10] overflow-hidden">
          <AnimatedLogo />
        </div>

        <div className="relative z-[60] text-center">
          <h1
            ref={headlineRef}
            className="text-black font-bold text-4xl tracking-tight mb-8"
            style={{ paddingLeft: "2%" }} // ✅ 2% padding added here
          >
            {["Justice ", "Auguste"].map((w, i) => (
              <span key={i} className="hero-word inline-block px-2">
                {w}
              </span>
            ))}
          </h1>

          <BodyText ref={paragraphRef} />
        </div>
      </section>
    </div>
  );
};

export default Page;
