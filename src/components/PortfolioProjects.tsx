"use client";

import { useEffect, useMemo, useState, useRef } from "react";
import type { UploadItem } from "@/components/AdminDashboard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const STORAGE_KEY = "justicewebport.admin.uploads";

type Project = {
  title: string;
  medium: string;
  summary: string;
  year: string;
  link?: string;
  previewUrl?: string;
  fileType?: string;
};

const defaultProjects: Project[] = [
  {
    title: "Artwork 1",
    medium: "Digital Illustration",
    summary: "Detailed concept artwork from the recent collection.",
    year: "2025",
    previewUrl: "/FNP-7.png",
    link: "#artwork-1",
  },
  {
    title: "Artwork 2",
    medium: "Digital Illustration",
    summary: "Detailed concept artwork from the recent collection.",
    year: "2025",
    previewUrl: "/0.png",
    link: "#artwork-2",
  },
  {
    title: "Artwork 3",
    medium: "Digital Illustration",
    summary: "Detailed concept artwork from the recent collection.",
    year: "2025",
    previewUrl: "/FNP4.png",
    link: "#artwork-3",
  },
  {
    title: "Artwork 4",
    medium: "Digital Illustration",
    summary: "Detailed concept artwork from the recent collection.",
    year: "2025",
    previewUrl: "/FNP5.png",
    link: "#artwork-4",
  },
  {
    title: "Artwork 5",
    medium: "Digital Illustration",
    summary: "Detailed concept artwork from the recent collection.",
    year: "2025",
    previewUrl: "/FNP6.png",
    link: "#artwork-5",
  },
  {
    title: "Artwork 6",
    medium: "Digital Illustration",
    summary: "Detailed concept artwork from the recent collection.",
    year: "2025",
    previewUrl: "/0 (2).png",
    link: "#artwork-6",
  },
  {
    title: "Artwork 7",
    medium: "Digital Illustration",
    summary: "Detailed concept artwork from the recent collection.",
    year: "2025",
    previewUrl: "/0 (3).png",
    link: "#artwork-7",
  },
];

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const PortfolioProjects: React.FC = () => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as UploadItem[];
      if (Array.isArray(parsed)) {
        setUploads(parsed);
      }
    } catch {
      setUploads([]);
    }
  }, []);

  const projects = useMemo<Project[]>(() => {
    const uploadProjects = uploads.map((upload, index) => ({
      title: upload.title,
      medium: upload.type === "animation" ? "Uploaded Animation" : "Uploaded Drawing",
      summary: upload.description,
      year: new Date(upload.uploadedAt).getFullYear().toString(),
      previewUrl: upload.dataUrl,
      fileType: upload.fileType,
      link: `#uploaded-${index}`,
    }));

    return [...uploadProjects, ...defaultProjects];
  }, [uploads]);

  useGSAP(
    () => {
      const originFolder = document.getElementById("folder-origin");
      if (!originFolder) return;

      const folderOpenImg = document.getElementById("folder-open-img");
      if (!originFolder || !folderOpenImg) return;

      // Hide all cards until they fly out
      gsap.set(".portfolio-card", { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.3 });

      // 1. Folder bounces in (closed)
      tl.from(originFolder, {
        opacity: 0,
        scale: 0.5,
        y: 60,
        duration: 0.6,
        ease: "back.out(1.7)",
      });

      // 2. Folder opens
      tl.to(folderOpenImg, {
        opacity: 1,
        y: -14,
        duration: 0.5,
        ease: "power2.out",
      });

      // 3. Each card appears at folder, holds 2s, then flies to its grid spot
      const allCards = gsap.utils.toArray<HTMLElement>(".portfolio-card", container.current!);

      allCards.forEach((card) => {
        // Snap card to folder center
        tl.set(card, {
          x: () => {
            const fRect = originFolder.getBoundingClientRect();
            const cRect = card.getBoundingClientRect();
            return fRect.left + fRect.width / 2 - (cRect.left + cRect.width / 2);
          },
          y: () => {
            const fRect = originFolder.getBoundingClientRect();
            const cRect = card.getBoundingClientRect();
            return fRect.top + fRect.height / 2 - (cRect.top + cRect.height / 2);
          },
          scale: 0.5,
          rotation: () => gsap.utils.random(-10, 10),
          opacity: 0,
          zIndex: 50,
        });

        // Fade in at folder
        tl.to(card, {
          opacity: 1,
          scale: 0.55,
          duration: 0.35,
          ease: "power2.out",
        }, "+=0.2");

        // Hold for 2 seconds
        tl.to(card, { duration: 2 });

        // Fly to grid position
        tl.to(card, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.0,
          ease: "power3.out",
          clearProps: "all",
        });
      });

      // 4. Folder closes after last card lands
      tl.to(folderOpenImg, {
        opacity: 0,
        y: 0,
        duration: 0.4,
        ease: "power2.in",
      }, "+=0.3");
    },
    { scope: container, dependencies: [projects] }
  );








  return (
    <div className="grid gap-6 sm:grid-cols-2" ref={container}>
      {projects.map((project, index) => (
        <article
          key={`${project.title}-${project.year}-${index}`}
          className="portfolio-card rounded-xl border border-neutral-200 bg-white/90 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
          style={{ opacity: 0 }}
        >
          <header className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              {project.year} · {project.medium}
            </p>
            <h3 className="mt-1 text-xl font-semibold text-neutral-900">
              {project.title}
            </h3>
          </header>

          {project.previewUrl ? (
            <div className="mb-4 rounded-3xl border border-neutral-200 bg-neutral-50 p-3">
              {project.fileType?.startsWith("video/") ? (
                <video
                  controls
                  src={project.previewUrl}
                  className="h-56 w-full rounded-3xl object-cover"
                />
              ) : (
                <img
                  src={project.previewUrl}
                  alt={project.title}
                  className="h-56 w-full rounded-3xl object-cover"
                />
              )}
            </div>
          ) : null}

          <p className="text-sm leading-relaxed text-neutral-700">{project.summary}</p>
          {project.link && (
            <a
              className="mt-4 inline-flex text-sm font-medium text-[#0F0F10] underline underline-offset-4 hover:text-neutral-700"
              href={project.link}
            >
              View project
            </a>
          )}
        </article>
      ))}
    </div>
  );
};

export default PortfolioProjects;
