export interface IAiQueryLog {
  id: string;
  prompt: string;
  response: string;
  featureType: 'CROP_ASSISTANT' | 'RECOMMENDATION' | 'CONTENT_GENERATOR' | 'DATA_ANALYZER';
  createdAt: string;
  user?: {
    name: string;
    role: string;
  };
}

export interface IAiAnalyticsSummary {
  totalQueries: number;
  queriesThisWeek: number;
  featureUsage: {
    name: string;
    count: number;
  }[];
  recentLogs: IAiQueryLog[];
}
