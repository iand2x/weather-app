export interface SearchHistoryItem {
  id: string;
  city: string;
  country?: string;
  timestamp: number;
}

export interface SearchHistoryState {
  items: SearchHistoryItem[];
  maxLength: number;
}
