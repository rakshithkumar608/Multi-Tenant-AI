import { useEffect, useState } from "react";
import { getHistory } from "../services/chat";
import { toast } from "react-hot-toast";

export default function History() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const msgs = await getHistory();
      setMessages(msgs);
      toast.success("History loaded 📜");
    } catch (err) {
      toast.error("Failed to load history ❌", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Chat History</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-500">No history yet</p>
      ) : (
        messages.map((m, i) => (
          <div
            key={i}
            className={`p-3 rounded ${
              m.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-200 text-left"
            }`}
          >
            {m.content}
          </div>
        ))
      )}
    </div>
  );
}