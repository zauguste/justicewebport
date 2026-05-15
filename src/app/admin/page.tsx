"use client";

import { FormEvent, useEffect, useState } from "react";
import AdminDashboard from "@/components/AdminDashboard";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "justiceadmin";
const AUTH_KEY = "justicewebport.admin.auth";

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(AUTH_KEY) === "true") {
      setAuthenticated(true);
    }
  }, []);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem(AUTH_KEY, "true");
      setAuthenticated(true);
      setMessage("Welcome back, Justice. You can now manage uploads.");
      setPassword("");
      return;
    }

    setMessage("Invalid password. Please try again.");
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
    setPassword("");
    setMessage("Logged out.");
  };

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-24 sm:px-8">
      {authenticated ? (
        <>
          <div className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-neutral-200 bg-white/90 p-8 shadow-xl sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">Admin access</p>
              <h1 className="mt-2 text-4xl font-semibold text-neutral-950">Private site editor</h1>
              <p className="mt-2 max-w-2xl text-base leading-7 text-neutral-600">
                Use this dashboard to add new animations and drawings to your portfolio. These uploads are saved locally in the browser for preview purposes.
              </p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-12 items-center justify-center rounded-full bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Log out
            </button>
          </div>

          <AdminDashboard />
        </>
      ) : (
        <div className="mx-auto w-full max-w-xl rounded-[2rem] border border-neutral-200 bg-white/95 p-10 shadow-xl">
          <p className="text-sm uppercase tracking-[0.24em] text-neutral-500">Admin login</p>
          <h1 className="mt-2 text-4xl font-semibold text-neutral-950">Owner access</h1>
          <p className="mt-4 text-sm leading-7 text-neutral-600">
            Enter the admin password to access the private upload dashboard and manage the portfolio.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <label className="block text-sm font-medium text-neutral-700">
              Password
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="mt-3 w-full rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-900 outline-none transition focus:border-red-500"
                placeholder="Enter your admin password"
              />
            </label>
            <button
              type="submit"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-red-600 px-6 text-sm font-semibold text-white transition hover:bg-red-700"
            >
              Unlock dashboard
            </button>
          </form>

          {message && (
            <p className="mt-4 rounded-3xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700">
              {message}
            </p>
          )}

          <p className="mt-6 text-sm leading-6 text-neutral-500">
            Tip: The admin password is configurable using the environment variable <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs">NEXT_PUBLIC_ADMIN_PASSWORD</code>.
          </p>
        </div>
      )}
    </div>
  );
}
