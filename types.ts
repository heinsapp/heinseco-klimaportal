
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  groundingUrls?: Array<{title: string, uri: string}>;
}

export interface HealthMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}
