import { Pool } from 'pg'
import { config } from 'dotenv'

config()

async function initDb() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL
  })

  try {
    console.log('Initializing database...')

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `)

    // Create posts table
    await pool.query(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT CHECK (category IN ('Tech', 'Politics')) DEFAULT 'Politics',
    slug TEXT UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );
`)

    // Add slug column if it doesn't exist (for existing databases)
    await pool.query(`
      ALTER TABLE posts ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
    `)

    // Create indexes
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);`)
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);`)

    // Insert the single user
    await pool.query(`
  INSERT INTO users (id, email, name)
  VALUES ('amish-harsoor', 'amish@example.com', 'Amish B Harsoor')
  ON CONFLICT (id) DO NOTHING;
`)

    console.log('Database initialized successfully!')
    await pool.end()
  } catch (error) {
    console.error('Failed to initialize database:', error)
    await pool.end()
    process.exit(1)
  }
}

initDb()