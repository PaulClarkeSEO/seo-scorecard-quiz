-- SEO Scorecard Quiz Database Schema
-- Run this in your Supabase SQL editor to set up the database

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  website_url VARCHAR(500) NOT NULL,
  gdpr_consent BOOLEAN DEFAULT false,
  gdpr_consent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  total_score INTEGER,
  score_level VARCHAR(20),
  gmb_score INTEGER,
  keywords_score INTEGER,
  website_score INTEGER
);

-- Create responses table
CREATE TABLE IF NOT EXISTS responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  question_id INTEGER NOT NULL,
  answer VARCHAR(20) NOT NULL, -- 'yes', 'no', 'maybe'
  points INTEGER NOT NULL,
  category VARCHAR(50) NOT NULL, -- 'gmb', 'keywords', 'website'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(lead_id, question_id)
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_responses_lead_id ON responses(lead_id);
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
CREATE INDEX IF NOT EXISTS idx_leads_score_level ON leads(score_level);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses ENABLE ROW LEVEL SECURITY;

-- Create policies for service role access (for API routes)
-- These allow the service role (backend) to perform all operations
CREATE POLICY "Service role can do everything on leads" ON leads
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can do everything on responses" ON responses
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Optional: Create a view for lead statistics
CREATE OR REPLACE VIEW lead_statistics AS
SELECT
  COUNT(*) as total_leads,
  COUNT(CASE WHEN completed_at IS NOT NULL THEN 1 END) as completed_quizzes,
  AVG(total_score) as average_score,
  COUNT(CASE WHEN score_level = 'high' THEN 1 END) as high_scorers,
  COUNT(CASE WHEN score_level = 'medium' THEN 1 END) as medium_scorers,
  COUNT(CASE WHEN score_level = 'low' THEN 1 END) as low_scorers
FROM leads;

-- Optional: Create a function to get recent leads
CREATE OR REPLACE FUNCTION get_recent_leads(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  id UUID,
  first_name VARCHAR,
  last_name VARCHAR,
  email VARCHAR,
  website_url VARCHAR,
  total_score INTEGER,
  score_level VARCHAR,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    l.id,
    l.first_name,
    l.last_name,
    l.email,
    l.website_url,
    l.total_score,
    l.score_level,
    l.created_at
  FROM leads l
  ORDER BY l.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;
