import { useEffect, useState } from "react";
import { getHistory } from "../services/chat";
import { toast } from "react-hot-toast";

export default function History() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();

      console.log("HISTORY:", res.data); 

      setData(res.data || []);
    } catch {
      toast.error("Failed to load history");
    }
  };

  return (
    <div className="p-10 space-y-2">
      <h2 className="text-xl font-semibold">Chat History</h2>

      {data.length === 0 ? (
        <p className="text-gray-500">No history yet</p>
      ) : (
        data.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded ${
              msg.role === "user"
                ? "bg-blue-100 text-right"
                : "bg-gray-200 text-left"
            }`}
          >
            {msg.content}
          </div>
        ))
      )}
    </div>
  );
}