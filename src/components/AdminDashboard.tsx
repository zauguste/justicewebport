"use client";

import { ChangeEvent, useEffect, useState } from "react";

export type UploadItem = {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileType: string;
  type: "animation" | "drawing";
  dataUrl: string;
  uploadedAt: string;
};

const STORAGE_KEY = "justicewebport.admin.uploads";
const MAX_UPLOAD_SIZE_MB = 15;

const getUploadType = (fileType: string, fileName: string) => {
  if (/video\//.test(fileType) || /\.(mp4|webm|mov)$/i.test(fileName)) {
    return "animation" as const;
  }
  return "drawing" as const;
};

const readFileAsDataUrl = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Failed to read file."));
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
};

const loadSavedUploads = (): UploadItem[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw) as UploadItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const persistUploads = (uploads: UploadItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads));
};

export default function AdminDashboard() {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setUploads(loadSavedUploads());
  }, []);

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setSelectedFile(file);
    setStatusMessage(null);
  };

  const handleUpload = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) {
      setStatusMessage("Please choose a drawing or animation file to upload.");
      return;
    }

    if (selectedFile.size > MAX_UPLOAD_SIZE_MB * 1024 * 1024) {
      setStatusMessage(`Files must be smaller than ${MAX_UPLOAD_SIZE_MB} MB.`);
      return;
    }

    if (!title.trim()) {
      setStatusMessage("Please add a title for this upload.");
      return;
    }

    try {
      const dataUrl = await readFileAsDataUrl(selectedFile);
      const upload: UploadItem = {
        id: `${Date.now()}-${selectedFile.name}`,
        title: title.trim(),
        description: description.trim() || "A new upload from the admin dashboard.",
        fileName: selectedFile.name,
        fileType: selectedFile.type,
        type: getUploadType(selectedFile.type, selectedFile.name),
        dataUrl,
        uploadedAt: new Date().toISOString(),
      };

      const nextUploads = [upload, ...uploads];
      setUploads(nextUploads);
      persistUploads(nextUploads);
      setTitle("");
      setDescription("");
      setSelectedFile(null);
      setStatusMessage("Upload saved locally and added to the portfolio.");
    } catch (error) {
      setStatusMessage("There was an issue uploading the file. Try again.");
      console.error(error);
    }
  };

  const handleDelete = (id: string) => {
    const nextUploads = uploads.filter((item) => item.id !== id);
    setUploads(nextUploads);
    persistUploads(nextUploads);
    setStatusMessage("Upload removed.");
  };

  return (
    <div className="space-y-12">
      <section className="rounded-[2rem] border border-neutral-200 bg-white/95 p-8 shadow-xl">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">Admin controls</p>
            <h2 className="mt-2 text-3xl font-semibold text-neutral-950">Upload new animations and drawings</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-neutral-600">
            Files are stored in the browser so the owner can preview them in the portfolio. For production file storage, connect this flow to Cloudflare R2 or a dedicated backend.
          </p>
        </div>

        <form className="grid gap-6" onSubmit={handleUpload}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-neutral-700">
              Title
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none transition focus:border-red-500"
                placeholder="Example: Morning Walk Loop"
              />
            </label>
            <label className="space-y-2 text-sm font-medium text-neutral-700">
              File
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none transition focus:border-red-500"
              />
            </label>
          </div>

          <label className="space-y-2 text-sm font-medium text-neutral-700">
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              className="w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none transition focus:border-red-500"
              placeholder="Short project summary or notes about the animation or drawing."
            />
          </label>

          {previewUrl && (
            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-4">
              <p className="text-sm text-neutral-500">Preview</p>
              {selectedFile?.type.startsWith("video/") ? (
                <video className="mt-3 max-h-96 w-full rounded-3xl object-cover" controls src={previewUrl} />
              ) : (
                <img
                  src={previewUrl}
                  alt="Upload preview"
                  className="mt-3 w-full rounded-3xl object-cover"
                />
              )}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="submit"
              className="inline-flex justify-center rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Save to portfolio
            </button>
            <p className="text-sm text-neutral-600">Max file size is {MAX_UPLOAD_SIZE_MB} MB.</p>
          </div>

          {statusMessage && (
            <p className="rounded-3xl border border-neutral-200 bg-green-50 px-4 py-3 text-sm text-neutral-800">
              {statusMessage}
            </p>
          )}
        </form>
      </section>

      <section className="rounded-[2rem] border border-neutral-200 bg-white/95 p-8 shadow-xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">Saved uploads</p>
            <h3 className="mt-2 text-2xl font-semibold text-neutral-950">Current admin gallery</h3>
          </div>
          <p className="text-sm text-neutral-600">
            Remove old files or edit the upload list as needed.
          </p>
        </div>

        {uploads.length === 0 ? (
          <p className="text-sm leading-6 text-neutral-600">
            No uploads yet. Use the form above to add drawings or animations to the portfolio.
          </p>
        ) : (
          <div className="grid gap-6">
            {uploads.map((upload) => (
              <article
                key={upload.id}
                className="overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-neutral-50"
              >
                <div className="grid gap-6 p-6 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-neutral-500">
                      {upload.type === "animation" ? "Animation" : "Drawing"}
                    </p>
                    <h4 className="text-xl font-semibold text-neutral-950">{upload.title}</h4>
                    <p className="text-sm leading-6 text-neutral-600">{upload.description}</p>
                    <p className="text-sm text-neutral-500">
                      {new Date(upload.uploadedAt).toLocaleDateString()} · {upload.fileName}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(upload.id)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-neutral-200 bg-white px-5 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-100"
                  >
                    Remove
                  </button>
                </div>
                <div className="border-t border-neutral-200 p-4">
                  {upload.fileType.startsWith("video/") ? (
                    <video
                      controls
                      src={upload.dataUrl}
                      className="w-full rounded-[1.5rem]"
                    />
                  ) : (
                    <img
                      src={upload.dataUrl}
                      alt={upload.title}
                      className="w-full rounded-[1.5rem] object-cover"
                    />
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
