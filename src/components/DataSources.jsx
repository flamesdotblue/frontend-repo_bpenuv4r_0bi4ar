import { useMemo } from "react";
import { Database, Github, BookOpen, FileText, Image as ImageIcon } from "lucide-react";

const SOURCES = [
  { key: "confluence", label: "Confluence", icon: BookOpen, color: "from-orange-500 to-amber-600" },
  { key: "github", label: "GitHub", icon: Github, color: "from-gray-700 to-gray-900" },
  { key: "database", label: "Databases", icon: Database, color: "from-blue-600 to-indigo-700" },
  { key: "docs", label: "Documents", icon: FileText, color: "from-emerald-500 to-teal-600" },
  { key: "images", label: "Images", icon: ImageIcon, color: "from-pink-500 to-rose-600" },
];

export default function DataSources({ selected = [], onToggle }) {
  const set = useMemo(() => new Set(selected), [selected]);

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-medium text-neutral-700">Data sources</h2>
        <span className="text-xs text-neutral-400">Pick where to search</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {SOURCES.map((s) => {
          const ActiveIcon = s.icon;
          const active = set.has(s.key);
          return (
            <button
              key={s.key}
              onClick={() => onToggle?.(s.key)}
              className={`group relative flex items-center gap-2 rounded-xl border transition-all px-3 py-2 text-sm
                ${active ? "border-transparent text-white shadow-sm" : "border-neutral-200 hover:border-neutral-300 text-neutral-700"}`}
              style={active ? { backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` } : undefined}
            >
              <div className={`h-7 w-7 rounded-lg flex items-center justify-center ${active ? "bg-white/15" : "bg-neutral-100"}`}
                   style={active ? { backgroundImage: "linear-gradient(to-br, rgba(255,255,255,.2), rgba(255,255,255,.06))" } : undefined}>
                <ActiveIcon size={16} className={active ? "text-white" : "text-neutral-700"} />
              </div>
              <span className={active ? "text-white" : "text-neutral-800"}>{s.label}</span>
              {active && (
                <span className={`absolute inset-0 -z-10 rounded-xl bg-gradient-to-br ${s.color}`} aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
