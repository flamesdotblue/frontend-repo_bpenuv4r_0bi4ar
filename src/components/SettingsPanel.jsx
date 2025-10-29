import { Settings } from "lucide-react";

export default function SettingsPanel({ settings, onChange }) {
  const handle = (key, value) => onChange?.({ ...settings, [key]: value });

  return (
    <aside className="rounded-2xl border bg-white p-4 lg:p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="h-8 w-8 rounded-lg bg-neutral-900 text-white flex items-center justify-center">
          <Settings size={16} />
        </div>
        <h3 className="text-sm font-semibold text-neutral-800">Assistant settings</h3>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-xs font-medium text-neutral-600">Model provider</label>
          <select
            value={settings.provider}
            onChange={(e) => handle("provider", e.target.value)}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-white"
          >
            <option value="ollama">Ollama (local)</option>
            <option value="openai">OpenAI-compatible</option>
            <option value="azure">Azure OpenAI</option>
            <option value="bedrock">AWS Bedrock</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-medium text-neutral-600">Response creativity (temperature)</label>
          <div className="flex items-center gap-3 mt-2">
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={settings.temperature}
              onChange={(e) => handle("temperature", Number(e.target.value))}
              className="w-full"
            />
            <span className="text-xs text-neutral-600 w-10 text-right">{settings.temperature.toFixed(2)}</span>
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-neutral-600">Max tokens</label>
          <input
            type="number"
            min={256}
            max={8192}
            step={128}
            value={settings.maxTokens}
            onChange={(e) => handle("maxTokens", Number(e.target.value))}
            className="mt-1 w-full rounded-lg border px-3 py-2 text-sm bg-white"
          />
        </div>
      </div>
    </aside>
  );
}
