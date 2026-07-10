import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative flex items-center justify-between px-4 py-3 border-b border-warm-black/20 text-xs tracking-widest font-bold uppercase shrink-0">
      {/* Desktop: full nav */}
      <a
        href="https://rachelliu.netlify.app"
        target="_blank"
        rel="noopener noreferrer"
        className="hidden sm:inline hover:opacity-50 transition-opacity"
      >
        RACHEL 静如 LIU
      </a>
      <span className="hidden sm:inline">&lt; FOOD DIARY &gt;</span>
      <span className="hidden sm:flex gap-6">
        <a
          href="https://rachelliu.netlify.app/#/projects"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-50 transition-opacity"
        >
          PROJECTS
        </a>
        <a
          href="https://rachelliu.netlify.app/#/resume"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-50 transition-opacity"
        >
          RESUMÉ
        </a>
      </span>

      {/* Mobile: title + hamburger */}
      <span className="sm:hidden">&lt; FOOD DIARY &gt;</span>
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="sm:hidden flex flex-col justify-center gap-1 p-1"
      >
        <span className="block h-0.5 w-5 bg-warm-black" />
        <span className="block h-0.5 w-5 bg-warm-black" />
        <span className="block h-0.5 w-5 bg-warm-black" />
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden absolute top-full right-0 z-50 mt-px flex flex-col items-end gap-4 border-b border-l border-warm-black/20 bg-white px-6 py-4">
          <a
            href="https://rachelliu.netlify.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-50 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            RACHEL 静如 LIU
          </a>
          <a
            href="https://rachelliu.netlify.app/#/projects"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-50 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            PROJECTS
          </a>
          <a
            href="https://rachelliu.netlify.app/#/resume"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-50 transition-opacity"
            onClick={() => setMenuOpen(false)}
          >
            RESUMÉ
          </a>
        </div>
      )}
    </nav>
  );
}
