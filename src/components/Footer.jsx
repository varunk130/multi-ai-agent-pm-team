/**
 * Footer — Credits, byline, and links for external-facing demo.
 */
import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative border-t border-[#1A1F2E] bg-[#06080F]/80">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 sm:flex-row sm:items-center sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-[#7C3AED] to-[#6366F1] text-xs font-bold text-white shadow-lg shadow-[#7C3AED]/30">
            V
          </div>
          <div className="text-sm">
            <span className="text-[#D1D5DB]">Built by </span>
            <span className="font-semibold text-[#F4F4F5]">Varun Kulkarni</span>
            <span className="ml-2 text-[#3A4556]">·</span>
            <span className="ml-2 text-[#B4B4BB]">Multi-agent AI for product teams</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/varunk130/multi-ai-agent-pm-team"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[#1A1F2E] bg-[#0E1117] px-3 py-1.5 text-xs font-medium text-[#D1D5DB] transition-colors hover:border-[#2A3344] hover:text-[#F4F4F5]"
          >
            <Github className="h-3.5 w-3.5" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/varun-kulkarni/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-[#1A1F2E] bg-[#0E1117] px-3 py-1.5 text-xs font-medium text-[#D1D5DB] transition-colors hover:border-[#2A3344] hover:text-[#F4F4F5]"
          >
            <Linkedin className="h-3.5 w-3.5" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
