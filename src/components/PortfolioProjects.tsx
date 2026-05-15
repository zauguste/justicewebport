"use client";

import { useEffect, useMemo, useState } from "react";
import type { UploadItem } from "@/components/AdminDashboard";

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
    title: "Silent Stories",
    medium: "2D Animated Short",
    summary:
      "An emotive exploration of character acting and subtle storytelling through movement.",
    year: "2024",
    link: "#silent-stories",
  },
  {
    title: "Greyline",
    medium: "Storyboard Sequence",
    summary:
      "Dynamic storyboard cuts created for a suspense-driven chase sequence.",
    year: "2023",
    link: "#greyline",
  },
  {
    title: "Chromatic Pulse",
    medium: "Motion Design Loop",
    summary:
      "Color-rich loop created for a music visualizer, focused on rhythm syncing.",
    year: "2024",
    link: "#chromatic-pulse",
  },
];

const PortfolioProjects: React.FC = () => {
  const [uploads, setUploads] = useState<UploadItem[]>([]);

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

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((project, index) => (
        <article
          key={`${project.title}-${project.year}-${index}`}
          className="rounded-xl border border-neutral-200 bg-white/90 p-6 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md"
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
