CREATE TABLE IF NOT EXISTS visitors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  visit_date TIMESTAMP DEFAULT NOW(),
  comments TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_visitors_visit_date ON visitors(visit_date DESC);
CREATE INDEX idx_visitors_email ON visitors(email);
