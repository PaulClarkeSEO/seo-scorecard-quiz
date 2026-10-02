// TypeScript types for SEO Scorecard Quiz

export type Category = 'gbp' | 'visibility' | 'website' | 'ai';
export type ScoreLevel = 'low' | 'medium' | 'high';

export interface QuestionOption {
  label: string;
  value: string;
  points: number;
}

export interface Question {
  id: number;
  text: string;
  category: Category;
  categoryLabel?: string; // overrides the category chip, e.g. for the unscored qualifier
  options: QuestionOption[];
}

export interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  website_url: string;
  created_at: string;
  completed_at?: string;
  total_score?: number;
  score_level?: ScoreLevel;
  gbp_score?: number;
  visibility_score?: number;
  website_score?: number;
  ai_score?: number;
}

export interface Response {
  id: string;
  lead_id: string;
  question_id: number;
  answer: string;
  points: number;
  category: Category;
  created_at: string;
}

export interface CategoryScore {
  category: Category;
  score: number;
  maxScore: number;
  percentage: number;
  level: ScoreLevel;
}

export interface TotalScore {
  total: number;
  maxTotal: number;
  percentage: number;
  level: ScoreLevel;
  categories: CategoryScore[];
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  websiteUrl: string;
}

export interface QuizState {
  leadId: string | null;
  currentQuestionIndex: number;
  answers: Record<number, string>;
  isComplete: boolean;
}
