import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.API_PORT || 3000;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'museum-api' });
});

// Get all visitors
app.get('/api/visitors', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, visit_date, comments FROM visitors ORDER BY visit_date DESC');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching visitors:', error);
    res.status(500).json({ error: 'Failed to fetch visitors' });
  }
});

// Get visitor by ID
app.get('/api/visitors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT id, name, email, visit_date, comments FROM visitors WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Visitor not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching visitor:', error);
    res.status(500).json({ error: 'Failed to fetch visitor' });
  }
});

// Create new visitor
app.post('/api/visitors', async (req, res) => {
  try {
    const { name, email, comments } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }
    const result = await pool.query(
      'INSERT INTO visitors (name, email, visit_date, comments) VALUES ($1, $2, NOW(), $3) RETURNING id, name, email, visit_date, comments',
      [name, email, comments || null]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating visitor:', error);
    res.status(500).json({ error: 'Failed to create visitor' });
  }
});

// Update visitor
app.put('/api/visitors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, comments } = req.body;
    const result = await pool.query(
      'UPDATE visitors SET name = $1, email = $2, comments = $3 WHERE id = $4 RETURNING id, name, email, visit_date, comments',
      [name, email, comments || null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Visitor not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating visitor:', error);
    res.status(500).json({ error: 'Failed to update visitor' });
  }
});

// Delete visitor
app.delete('/api/visitors/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM visitors WHERE id = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Visitor not found' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting visitor:', error);
    res.status(500).json({ error: 'Failed to delete visitor' });
  }
});

app.listen(port, () => {
  console.log(`Museum API listening on port ${port}`);
});
