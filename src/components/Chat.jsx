import { useEffect, useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 text-sm shadow-sm border
        ${isUser ? "bg-blue-600 text-white border-blue-600" : "bg-white text-neutral-800 border-neutral-200"}`}>
        <div className="flex items-center gap-2 mb-1 opacity-80">
          {isUser ? <User size={14} /> : <Bot size={14} />}
          <span className="text-xs font-medium">{isUser ? "You" : "Assistant"}</span>
        </div>
        <div className="whitespace-pre-wrap leading-relaxed">{content}</div>
      </div>
    </div>
  );
}

export default function Chat({ onSend, placeholder = "Ask about your knowledge base...", messages }) {
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const handleSend = async () => {
    const text = input.trim();
    if (!text || sending) return;
    setSending(true);
    setInput("");
    try {
      await onSend?.(text);
    } finally {
      setSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.length === 0 && (
          <div className="text-center text-neutral-500 text-sm py-10">
            Start a conversation by asking a question about Confluence pages, repos, or databases.
          </div>
        )}
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} />
        ))}
        <div ref={endRef} />
      </div>

      <div className="mt-4">
        <div className={`flex items-end gap-2 rounded-2xl border p-2 bg-white ${sending ? "opacity-95" : ""}`}>
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 resize-none outline-none bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 px-2 py-2 max-h-40"
          />
          <button
            onClick={handleSend}
            disabled={sending || input.trim().length === 0}
            className="inline-flex items-center gap-1 rounded-xl bg-blue-600 text-white px-3 py-2 text-sm font-medium shadow hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={16} />
            Send
          </button>
        </div>
        <p className="text-[11px] text-neutral-500 mt-2">
          Shift+Enter for new line. Responses are locally simulated until you connect your backend.
        </p>
      </div>
    </div>
  );
}
