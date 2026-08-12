import Link from "next/link";
import { MessageCircle, Instagram, Facebook, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-ink-700/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="/" className="font-mono text-lg text-mist">
              AFS<span className="text-signal">_</span>
            </Link>
            <p className="text-mist-dim text-sm mt-3 leading-relaxed max-w-xs">
              A three-founder developer studio in Bhakkar, Pakistan, running hands-on cohorts in
              web and app development — with AI integrated into both.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs text-mist-faint mb-4">courses/</p>
            <ul className="space-y-2.5 text-sm text-mist-dim">
              <li><a href="#courses" className="hover:text-mist transition-colors">Full-Stack Web Development</a></li>
              <li><a href="#courses" className="hover:text-mist transition-colors">App Development (Flutter)</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs text-mist-faint mb-4">studio/</p>
            <ul className="space-y-2.5 text-sm text-mist-dim">
              <li><a href="#process" className="hover:text-mist transition-colors">How it works</a></li>
              <li><a href="#why-us" className="hover:text-mist transition-colors">Why AFS</a></li>
              <li><a href="#faq" className="hover:text-mist transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs text-mist-faint mb-4">contact/</p>
            <ul className="space-y-3 text-sm text-mist-dim">
              <li className="flex items-center gap-2">
                <MessageCircle size={15} className="text-signal shrink-0" />
                <a
                  href="https://wa.me/923167122831?text=Hi%20AFS%20Developers!%20I%20have%20a%20question%20about%20the%202026%20cohort."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-mist transition-colors"
                >
                  Message on WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={15} className="text-signal shrink-0" />
                Bhakkar, Punjab, Pakistan
              </li>
              <li className="flex items-center gap-4 pt-1">
                <a href="#" aria-label="Instagram" className="hover:text-mist transition-colors">
                  <Instagram size={17} />
                </a>
                <a href="#" aria-label="Facebook" className="hover:text-mist transition-colors">
                  <Facebook size={17} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-xs text-mist-faint">
            © {year} AFS Developers. Built in Bhakkar.
          </p>
          <p className="font-mono text-xs text-mist-faint">admissions open · apply by 20 Aug 2026</p>
        </div>
      </div>
    </footer>
  );
}
