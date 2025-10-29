import { Rocket, MessageSquare } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-sm">
            <Rocket size={22} />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-neutral-900">Enterprise Knowledge Chat</h1>
            <p className="text-xs sm:text-sm text-neutral-500">Ask questions in natural language across Confluence, repos, and internal docs</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-neutral-500">
          <MessageSquare size={18} />
          <span className="text-sm">Developer-friendly, cloud-ready</span>
        </div>
      </div>
    </header>
  );
}
