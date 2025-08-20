import { HiOutlineSearch, HiOutlineTrash, HiOutlineCog } from "react-icons/hi";
import { useState } from "react";
import type { SearchHistoryItem } from "@/types/history";
import "./HistoryList.css";

interface HistoryListProps {
  history: SearchHistoryItem[];
  onSearch: (item: SearchHistoryItem) => void;
  onDelete: (id: string) => void;
  onClear?: () => void;
  maxLength?: number;
  onSetMaxLength?: (length: number) => void;
  loading?: boolean;
}

export default function HistoryList({
  history,
  onSearch,
  onDelete,
  onClear,
  maxLength = 10,
  onSetMaxLength,
  loading = false,
}: HistoryListProps) {
  const [showSettings, setShowSettings] = useState(false);

  const handleMaxLengthChange = (newLength: number) => {
    //checks if onSetMaxLength is defined
    if (newLength >= 1 && newLength <= 50 && onSetMaxLength) {
      onSetMaxLength(newLength);
    }
  };
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
      <div className="history-header">
        <h3 className="history-title">Search History</h3>
        <div className="history-header-actions">
          {onSetMaxLength && (
            <button
              onClick={() => setShowSettings(!showSettings)}
              title="Settings"
              className="history-settings"
              disabled={loading}
              role="button"
              aria-label="Toggle history settings"
            >
              <HiOutlineCog size={18} />
            </button>
          )}
          {onClear && history.length > 0 && (
            <button
              onClick={onClear}
              title="Clear all history"
              className="history-clear"
              disabled={loading}
              role="button"
              aria-label="Clear all search history"
            >
              <HiOutlineTrash size={18} />
            </button>
          )}
        </div>
      </div>

      {showSettings && onSetMaxLength && (
        <div className="history-settings-panel">
          <div className="settings-item">
            <label htmlFor="max-length-input" className="settings-label">
              Maximum items to keep:
            </label>
            <input
              id="max-length-input"
              type="number"
              min="1"
              max="50"
              value={maxLength}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (value >= 1 && value <= 50) {
                  handleMaxLengthChange(value);
                }
              }}
              className="settings-input"
              disabled={loading}
            />
          </div>
          <p className="settings-help">
            Choose how many recent searches to remember (1-50)
          </p>
        </div>
      )}

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
