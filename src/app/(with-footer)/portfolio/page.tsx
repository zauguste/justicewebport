"use client";

import React from "react";
import FolderAnimation from "@/components/FolderAnimation";
import PortfolioProjects from "@/components/PortfolioProjects";


const PortfolioPage: React.FC = () => {
  return (
    <div className="flex flex-col flex-grow bg-white min-h-0">

      {/* HERO — folder fills the viewport */}
      <section className="flex flex-col items-center justify-center w-full min-h-[80vh] bg-[#0F0F10]">
        <FolderAnimation hero />
      </section>

      {/* Selected work grid */}
      <section className="mx-auto w-full max-w-5xl px-6 py-20">
        <div className="max-w-2xl mb-10">
          <h1 className="text-4xl font-bold tracking-tight text-neutral-950 sm:text-5xl">
            Portfolio
          </h1>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            A curated selection of story-driven animation, boards, and motion
            work. Every project highlights timing, emotion, and the craft of
            bringing characters to life.
          </p>
        </div>

        <PortfolioProjects />
      </section>
    </div>
  );
};

export default PortfolioPage;
