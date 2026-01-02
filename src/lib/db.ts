import Database from 'better-sqlite3'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// Initialize SQLite database
const dbPath = path.join(process.cwd(), 'db', 'local.db')
const db = new Database(dbPath)

// Helper functions to transform database rows
const transformUser = (row: any) => {
  if (!row) return null
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

const transformPost = (row: any) => {
  if (!row) return null
  return {
    id: row.id,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

// Create tables if they don't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'Politics',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

// User operations
export const userDb = {
  findMany: () => {
    const rows = db.prepare('SELECT * FROM users ORDER BY created_at DESC').all()
    return rows.map(transformUser)
  },

  findUnique: (where: { id?: string; email?: string }) => {
    if (where.id) {
      const row = db.prepare('SELECT * FROM users WHERE id = ?').get(where.id)
      return transformUser(row)
    }
    if (where.email) {
      const row = db.prepare('SELECT * FROM users WHERE email = ?').get(where.email)
      return transformUser(row)
    }
    return null
  },

  create: (data: { email: string; name?: string }) => {
    const id = uuidv4()
    const stmt = db.prepare('INSERT INTO users (id, email, name) VALUES (?, ?, ?)')
    stmt.run(id, data.email, data.name || null)
    const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id)
    return transformUser(row)
  },

  update: (where: { id: string }, data: { email?: string; name?: string }) => {
    const updates: string[] = []
    const values: any[] = []

    if (data.email !== undefined) {
      updates.push('email = ?')
      values.push(data.email)
    }
    if (data.name !== undefined) {
      updates.push('name = ?')
      values.push(data.name)
    }

    updates.push('updated_at = CURRENT_TIMESTAMP')
    values.push(where.id)

    const stmt = db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`)
    stmt.run(...values)
    const row = db.prepare('SELECT * FROM users WHERE id = ?').get(where.id)
    return transformUser(row)
  },

  delete: (where: { id: string }) => {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?')
    stmt.run(where.id)
    return { id: where.id }
  }
}

// Post operations
export const postDb = {
  findMany: (options?: { orderBy?: { createdAt?: 'asc' | 'desc' } }) => {
    const order = options?.orderBy?.createdAt === 'asc' ? 'ASC' : 'DESC'
    const rows = db.prepare(`SELECT * FROM posts ORDER BY created_at ${order}`).all()
    return rows.map(transformPost)
  },

  findUnique: (where: { id: string }) => {
    const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(where.id)
    return transformPost(row)
  },

  create: (data: { title: string; excerpt: string; content: string; category?: string }) => {
    const id = uuidv4()
    const category = data.category || 'Politics'
    const stmt = db.prepare('INSERT INTO posts (id, title, excerpt, content, category) VALUES (?, ?, ?, ?, ?)')
    stmt.run(id, data.title, data.excerpt, data.content, category)
    const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(id)
    return transformPost(row)
  },

  update: (where: { id: string }, data: { title?: string; excerpt?: string; content?: string; category?: string }) => {
    const updates: string[] = []
    const values: any[] = []

    if (data.title !== undefined) {
      updates.push('title = ?')
      values.push(data.title)
    }
    if (data.excerpt !== undefined) {
      updates.push('excerpt = ?')
      values.push(data.excerpt)
    }
    if (data.content !== undefined) {
      updates.push('content = ?')
      values.push(data.content)
    }
    if (data.category !== undefined) {
      updates.push('category = ?')
      values.push(data.category)
    }

    updates.push('updated_at = CURRENT_TIMESTAMP')
    values.push(where.id)

    const stmt = db.prepare(`UPDATE posts SET ${updates.join(', ')} WHERE id = ?`)
    stmt.run(...values)
    const row = db.prepare('SELECT * FROM posts WHERE id = ?').get(where.id)
    return transformPost(row)
  },

  delete: (where: { id: string }) => {
    const stmt = db.prepare('DELETE FROM posts WHERE id = ?')
    stmt.run(where.id)
    return { id: where.id }
  }
}

// Export a db object that mimics Prisma's API
export const dbClient = {
  user: userDb,
  post: postDb
}

export { dbClient as db }