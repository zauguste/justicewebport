"use client";

import { useEffect, useRef } from "react";

export default function AnimatedLogo() {
  const logoRef = useRef<SVGSVGElement | null>(null);
  const headRef = useRef<SVGGElement | null>(null);
  const eyesRef = useRef<SVGGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!logoRef.current || !headRef.current || !eyesRef.current || !containerRef.current) return;

    const logo = logoRef.current;
    const head = headRef.current;
    const eyes = eyesRef.current;

    logo.style.opacity = "1";
    logo.style.transition = "transform 1s ease-in-out";
    logo.style.transform = "rotate(360deg)";

    let headAngle = 0;
    const headBob = setInterval(() => {
      headAngle += 0.05;
      const rotation = Math.sin(headAngle) * 5;
      head.style.transform = `rotate(${rotation}deg)`;
      head.style.transformOrigin = "50% 65%";
    }, 50);

  let animationTimer: NodeJS.Timeout;

    const getEndX = () => {
      const cont = containerRef.current;
      const el = logoRef.current;
      if (!cont || !el) return 0;
      const contRect = cont.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      return contRect.width - elRect.width - 40;
    };

    const blink = () => {
      eyes.style.transition = "transform 0.08s ease-in-out";
      eyes.style.transform = "scaleY(0.12)";
      eyes.style.transformOrigin = "50% 50%";
      setTimeout(() => {
        eyes.style.transform = "scaleY(1)";
      }, 80);
    };

    const runAnimation = () => {
      const endX = getEndX();
      setTimeout(() => {
        logo.style.transition = "transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        logo.style.transform = `translateX(${endX}px) rotate(360deg)`;
        setTimeout(() => {
          blink();
          setTimeout(() => {
            logo.style.transition = "transform 1.2s ease-in-out";
            logo.style.transform = "translateX(0px) rotate(360deg)";
            setTimeout(() => {
              blink();
              setTimeout(() => {
                logo.style.transition = "transform 1s ease-in-out";
                logo.style.transform = `translateX(0px) rotate(720deg)`;
                animationTimer = setTimeout(runAnimation, 6000);
              }, 700);
            }, 700);
          }, 500);
        }, 1400);
      }, 1000);
    };

    runAnimation();

    return () => {
      clearInterval(headBob);
      clearTimeout(animationTimer);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[280px] sm:h-[320px] max-h-[36vh] pointer-events-none overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none will-change-transform">
        <svg
          ref={logoRef}
          width={320}
          height={320}
          viewBox="0 0 576 576"
          aria-hidden
          className="mx-auto max-w-xs sm:max-w-sm"
          style={{ opacity: 0 }}
        >
          <defs>
            <style>
              {`
                .cls-1 { stroke: #fff; stroke-miterlimit: 10; stroke-width: .25px; }
                .cls-2 { fill: #fff; }
              `}
            </style>
          </defs>
          <g id="Blk_Wht" data-name="Blk/Wht">
            <g ref={headRef} id="B_W" data-name="B+W">
              <polygon
                id="Head"
                className="cls-1"
                points="439.48 266.36 480.78 221.05 423.72 198.62 441.27 139.88 380.13 144.43 370.46 83.89 317.35 114.52 284.76 64.17 247.81 114.81 194.44 84.63 185.28 145.25 124.1 141.21 142.14 199.8 85.27 222.7 127.03 260.3 84.33 307.24 143.28 327.26 129.35 382.09 179.48 387.16 285.11 466.94 380.46 386.11 436.77 378.64 427.12 329.99 480.41 311.75 439.48 266.36"
              />
              <g id="Mouth">
                <path
                  className="cls-2"
                  d="M288,386.47v42.7c7.21-.91,14.23-3.64,20.36-8.19l47.6-35.42-67.96.91Z"
                />
                <path
                  className="cls-2"
                  d="M281.49,386.47l-67.93-.91,47.6,35.42c6.11,4.55,13.13,7.27,20.33,8.19v-42.7Z"
                />
              </g>
              <g ref={eyesRef} id="Eye-Kind">
                <path
                  id="R"
                  className="cls-2"
                  d="M351.78,336.32c12.17,0,22.59,7.47,26.93,18.07,1.69,4.13,5.73,6.81,10.19,6.81h0c7.37,0,12.69-7.08,10.6-14.15-6.1-20.59-25.16-35.62-47.73-35.62s-41.63,15.03-47.73,35.62c-2.09,7.06,3.24,14.15,10.6,14.15h0c4.46,0,8.5-2.68,10.19-6.81,4.35-10.6,14.77-18.07,26.93-18.07Z"
                />
                <path
                  id="L"
                  className="cls-2"
                  d="M216.97,336.32c-12.17,0-22.59,7.47-26.93,18.07-1.69,4.13-5.73,6.81-10.19,6.81h0c-7.37,0-12.69-7.08-10.6-14.15,6.1-20.59,25.16-35.62,47.73-35.62s41.63,15.03,47.73,35.62c2.09,7.06-3.24,14.15-10.6,14.15h0c-4.46,0-8.5-2.68-10.19-6.81-4.35-10.6-14.77-18.07-26.93-18.07Z"
                />
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}
