import { sql } from '@vercel/postgres'

async function initDb() {
    try {
        console.log('Initializing database...')

        // Create users table
        await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        name TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `

        // Create posts table
        await sql`
      CREATE TABLE IF NOT EXISTS posts (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        category TEXT CHECK (category IN ('Tech', 'Politics')) DEFAULT 'Politics',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `

        // Create indexes
        await sql`CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);`
        await sql`CREATE INDEX IF NOT EXISTS idx_posts_category ON posts(category);`

        // Insert the single user
        await sql`
      INSERT INTO users (id, email, name)
      VALUES ('amish-harsoor', 'amish@example.com', 'Amish B Harsoor')
      ON CONFLICT (id) DO NOTHING;
    `

        console.log('Database initialized successfully!')
    } catch (error) {
        console.error('Failed to initialize database:', error)
        process.exit(1)
    }
}

initDb()