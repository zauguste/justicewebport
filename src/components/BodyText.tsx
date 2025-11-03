"use client";

import React from "react";

const BodyText = React.forwardRef<HTMLParagraphElement, {}>((_, ref) => {
  return (
    <p
      ref={ref}
      className="max-w-3xl text-lg leading-relaxed sm:text-xl mx-auto relative z-[60] text-black font-medium"
    >
      
      I am Justice Auguste; I am from a small town in Georgia called Griffin. I've always had a love for animation
      and over the years that has developed into a career. Animation can change lives, and I believe the best
      stories are told through silence and raw emotion. When you pull back your camera and cut the effects, and
      you are alone with your characters, emotions paint the picture, and a picture is worth 1000 words. Currently
      I am honing my skills in 2D animation at the Savannah College of Art and Design while simultaneously working
      on personal projects and further developing my portfolio.
    </p>
  );
});

BodyText.displayName = "BodyText";

export default BodyText;
