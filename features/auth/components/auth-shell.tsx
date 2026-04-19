import type { ReactNode } from "react";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
      <div className="hidden bg-[linear-gradient(140deg,_rgba(49,58,58,0.96),_rgba(136,108,83,0.88))] p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-white/70">
            Authentication shell
          </p>
          <h1 className="mt-6 max-w-md font-heading text-6xl leading-none tracking-tight">
            Ready for Auth.js sessions and local account storage.
          </h1>
        </div>
        <p className="max-w-md text-sm leading-7 text-white/72">
          The auth routes are split into their own group so they can evolve
          independently from the storefront shell.
        </p>
      </div>
      <div className="flex items-center justify-center bg-[linear-gradient(180deg,_rgba(250,247,242,0.95),_rgba(244,238,231,0.9))] px-6 py-16">
        {children}
      </div>
    </div>
  );
}
