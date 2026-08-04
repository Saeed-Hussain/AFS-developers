"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useApplyModal } from "@/lib/ApplyModalContext";

const links = [
  { href: "#courses", label: "courses/" },
  { href: "#process", label: "process/" },
  { href: "#why-us", label: "why-us/" },
  { href: "#faq", label: "faq/" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { open: openApply } = useApplyModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-ink/80 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 h-16">
        <Link href="/" className="font-mono text-lg tracking-tight text-mist flex items-center">
          AFS
          <span className="text-signal">_</span>
          <span className="inline-block w-2 h-4 bg-signal ml-0.5 animate-blink" />
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-mono text-sm text-mist-dim">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative py-2 hover:text-mist transition-colors group"
              >
                {l.label}
                <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-signal transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <button
            onClick={() => openApply()}
            className="inline-flex items-center gap-1.5 rounded-md bg-signal text-ink font-semibold text-sm px-4 py-2 hover:bg-signal-glow transition-colors"
          >
            Apply now
            <ArrowUpRight size={16} />
          </button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-mist p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-ink/95 backdrop-blur-md px-6 py-6">
          <ul className="flex flex-col gap-5 font-mono text-base">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="text-mist-dim">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={() => {
              setOpen(false);
              openApply();
            }}
            className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-signal text-ink font-semibold text-sm px-4 py-3"
          >
            Apply now
            <ArrowUpRight size={16} />
          </button>
        </div>
      )}
    </header>
  );
}
