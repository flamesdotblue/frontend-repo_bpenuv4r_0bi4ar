import { useMemo, useState } from "react";
import Header from "./components/Header.jsx";
import DataSources from "./components/DataSources.jsx";
import Chat from "./components/Chat.jsx";
import SettingsPanel from "./components/SettingsPanel.jsx";

export default function App() {
  const [selectedSources, setSelectedSources] = useState(["confluence", "github", "database"]);
  const [settings, setSettings] = useState({ provider: "ollama", temperature: 0.2, maxTokens: 2048 });
  const [messages, setMessages] = useState([]);

  const toggleSource = (key) => {
    setSelectedSources((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const systemNote = useMemo(() => {
    const parts = [];
    if (selectedSources.includes("confluence")) parts.push("Confluence");
    if (selectedSources.includes("github")) parts.push("GitHub");
    if (selectedSources.includes("database")) parts.push("Databases");
    if (selectedSources.includes("docs")) parts.push("Documents");
    if (selectedSources.includes("images")) parts.push("Images");
    return parts.length ? `Searching: ${parts.join(", ")}` : "No data sources selected";
  }, [selectedSources]);

  const handleSend = async (text) => {
    const userMsg = { role: "user", content: text };
    setMessages((m) => [...m, userMsg]);

    // Simulate an assistant response locally for now.
    await new Promise((r) => setTimeout(r, 400));
    const assistantMsg = {
      role: "assistant",
      content:
        `"${text}"\n\n` +
        `I would check ${systemNote.toLowerCase()} using the ${settings.provider} provider with temperature ${settings.temperature}. ` +
        `Connect the backend to stream real results, including snippets and images from Confluence if available.`,
    };
    setMessages((m) => [...m, assistantMsg]);
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col">
      <Header />

      <main className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-5">
          <div className="rounded-2xl border bg-white p-4 lg:p-5">
            <DataSources selected={selectedSources} onToggle={toggleSource} />
          </div>

          <div className="rounded-2xl border bg-white p-4 lg:p-5 min-h-[480px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-neutral-700">Chat</h2>
              <span className="text-xs text-neutral-400">{systemNote}</span>
            </div>
            <Chat messages={messages} onSend={handleSend} />
          </div>
        </div>

        <div className="lg:col-span-4 space-y-5">
          <SettingsPanel settings={settings} onChange={setSettings} />

          <div className="rounded-2xl border bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white">
            <h3 className="text-sm font-semibold mb-2">How to wire the backend</h3>
            <ol className="text-xs space-y-1 opacity-90 list-decimal list-inside">
              <li>Create ingestion jobs to crawl Confluence, GitHub, databases, and documents.</li>
              <li>Embed and store content in your vector DB; keep raw HTML for image rendering.</li>
              <li>Expose chat and retrieval endpoints; stream responses to the UI.</li>
              <li>Deploy across AWS/Azure/GitHub Actions; keep configs in environment variables.</li>
            </ol>
          </div>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-neutral-500">
        Built for internal teams. This UI is ready—connect your FastAPI backend when you are.
      </footer>
    </div>
  );
}
