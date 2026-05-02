"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = { id: string; label: string };
type NavbarProps = {
  links: NavLink[];
  ctaLabel: string;
  lang: "ar" | "en";
  onToggleLang: () => void;
};

export default function Navbar({ links, ctaLabel, lang, onToggleLang }: NavbarProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-bg/80 backdrop-blur-xl">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="container-x flex h-16 items-center justify-between"
      >
        <a href="#home" className="text-sm font-bold md:text-base">
          <span className="heading-gradient">Felopater Studio</span>
        </a>

        <div className="flex items-center gap-2 md:hidden">
          <button
            className="rounded-lg border border-line px-3 py-1.5 text-xs"
            onClick={onToggleLang}
            aria-label="Toggle language"
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <button
            className="rounded-lg border border-line px-3 py-1.5 text-sm"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={lang === "ar" ? "فتح القائمة" : "Open menu"}
          >
            {lang === "ar" ? "القائمة" : "Menu"}
          </button>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="text-sm text-textSoft transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onToggleLang}
            className="rounded-xl border border-line px-3 py-2 text-sm font-semibold transition hover:border-accent"
          >
            {lang === "ar" ? "EN" : "AR"}
          </button>
          <a
            href="#contact"
            className="accent-gradient rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:brightness-110"
          >
            {ctaLabel}
          </a>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="container-x flex flex-col gap-3 overflow-hidden border-t border-line/60 py-4 md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setOpen(false)}
                className="text-sm text-textSoft transition hover:text-white"
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
