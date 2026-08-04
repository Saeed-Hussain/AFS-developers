import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ApplyModalProvider } from "@/lib/ApplyModalContext";
import ApplyModal from "@/components/ApplyModal";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  title: "AFS Developers — Full-Stack & App Dev Cohorts, AI Built In",
  description:
    "AFS Developers is a Bhakkar-based studio running hands-on cohorts in Full-Stack Web Development and Flutter App Development, with AI (prompt engineering & LLM/agent APIs) integrated into both. Admissions open for the 2026 cohort.",
  keywords: [
    "AFS Developers",
    "Bhakkar",
    "Pakistan coding bootcamp",
    "Flutter course",
    "full stack development course",
    "AI integrated development",
    "prompt engineering course",
  ],
  openGraph: {
    title: "AFS Developers — Learn to build. Ship real products.",
    description:
      "Hands-on cohorts in Full-Stack Web Dev and Flutter App Dev, with AI integrated into both. 100% online, beginner friendly.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-ink text-mist antialiased selection:bg-signal selection:text-ink">
        <ApplyModalProvider>
          {children}
          <ApplyModal />
        </ApplyModalProvider>
      </body>
    </html>
  );
}
