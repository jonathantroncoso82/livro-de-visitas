const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || 'museum_user',
  password: process.env.DB_PASSWORD || 'museum_pass',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'museum_db',
});

const jwtSecret = process.env.JWT_SECRET || 'dev-secret-key-change-in-production';

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.get('/api/visitors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM visitors ORDER BY created_at DESC LIMIT 100');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
});

app.post('/api/visitors', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO visitors (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating visitor:', error);
    res.status(500).json({ error: 'Failed to create visitor' });
  }
});

app.listen(port, () => {
  console.log(`Museum Visitor Backend running on port ${port}`);
});
