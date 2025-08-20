import { HiOutlineSearch, HiOutlineTrash } from "react-icons/hi";
import type { SearchHistoryItem } from "@/types/history";
import "./HistoryList.css";

interface HistoryListProps {
  history: SearchHistoryItem[];
  onSearch: (item: SearchHistoryItem) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export default function HistoryList({
  history,
  onSearch,
  onDelete,
  loading = false,
}: HistoryListProps) {
  if (history.length === 0) {
    return (
      <div className="history-container empty">
        <h3 className="history-title">Search History</h3>
        <p className="empty-text">Your recent searches will appear here</p>
      </div>
    );
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleString();
  };

  return (
    <div className="history-container">
      <h3 className="history-title">Search History</h3>
      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-item">
            <div className="history-info">
              <span className="history-location">
                {item.city}
                {item.country ? `, ${item.country}` : ""}
              </span>
              <span className="history-timestamp">
                {formatTimestamp(item.timestamp)}
              </span>
            </div>
            <div className="history-actions">
              <button
                onClick={() => onSearch(item)}
                title="Search again"
                className="history-search"
                disabled={loading}
                role="button"
                aria-label={`Search again for ${item.city}${
                  item.country ? `, ${item.country}` : ""
                }`}
              >
                <HiOutlineSearch size={18} />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                title="Remove from history"
                className="history-delete"
                role="button"
                aria-label={`Remove ${item.city}${
                  item.country ? `, ${item.country}` : ""
                } from history`}
              >
                <HiOutlineTrash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
