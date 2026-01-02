import { Pool } from 'pg'
import { v4 as uuidv4 } from 'uuid'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

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
    slug: row.slug,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

// User operations
export const userDb = {
  findMany: async () => {
    const { rows } = await pool.query('SELECT * FROM users ORDER BY created_at DESC')
    return rows.map(transformUser)
  },

  findUnique: async (where: { id?: string; email?: string }) => {
    if (where.id) {
      const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [where.id])
      return transformUser(rows[0])
    }
    if (where.email) {
      const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [where.email])
      return transformUser(rows[0])
    }
    return null
  },

  create: async (data: { email: string; name?: string }) => {
    const id = uuidv4()
    await pool.query('INSERT INTO users (id, email, name) VALUES ($1, $2, $3)', [id, data.email, data.name || null])
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return transformUser(rows[0])
  },

  update: async (where: { id: string }, data: { email?: string; name?: string }) => {
    const setParts: string[] = []
    const params: any[] = []
    let paramIndex = 1

    if (data.email !== undefined) {
      setParts.push(`email = $${paramIndex++}`)
      params.push(data.email)
    }
    if (data.name !== undefined) {
      setParts.push(`name = $${paramIndex++}`)
      params.push(data.name)
    }
    setParts.push(`updated_at = CURRENT_TIMESTAMP`)

    params.push(where.id)
    const query = `UPDATE users SET ${setParts.join(', ')} WHERE id = $${paramIndex}`
    await pool.query(query, params)
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [where.id])
    return transformUser(rows[0])
  },

  delete: async (where: { id: string }) => {
    await pool.query('DELETE FROM users WHERE id = $1', [where.id])
    return { id: where.id }
  }
}

// Post operations
export const postDb = {
  findMany: async (options?: { orderBy?: { createdAt?: 'asc' | 'desc' } }) => {
    const order = options?.orderBy?.createdAt === 'asc' ? 'ASC' : 'DESC'
    const { rows } = await pool.query(`SELECT * FROM posts ORDER BY created_at ${order}`)
    return rows.map(transformPost)
  },

  findUnique: async (where: { id?: string; slug?: string }) => {
    if (where.id) {
      const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [where.id])
      return transformPost(rows[0])
    }
    if (where.slug) {
      const { rows } = await pool.query('SELECT * FROM posts WHERE slug = $1', [where.slug])
      return transformPost(rows[0])
    }
    return null
  },

  create: async (data: { title: string; excerpt: string; content: string; category?: string; slug: string }) => {
    const id = uuidv4()
    const category = data.category || 'Politics'
    await pool.query('INSERT INTO posts (id, title, excerpt, content, category, slug) VALUES ($1, $2, $3, $4, $5, $6)', [id, data.title, data.excerpt, data.content, category, data.slug])
    const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [id])
    return transformPost(rows[0])
  },

  update: async (where: { id: string }, data: { title?: string; excerpt?: string; content?: string; category?: string }) => {
    const setParts: string[] = []
    const params: any[] = []
    let paramIndex = 1

    if (data.title !== undefined) {
      setParts.push(`title = $${paramIndex++}`)
      params.push(data.title)
    }
    if (data.excerpt !== undefined) {
      setParts.push(`excerpt = $${paramIndex++}`)
      params.push(data.excerpt)
    }
    if (data.content !== undefined) {
      setParts.push(`content = $${paramIndex++}`)
      params.push(data.content)
    }
    if (data.category !== undefined) {
      setParts.push(`category = $${paramIndex++}`)
      params.push(data.category)
    }
    setParts.push(`updated_at = CURRENT_TIMESTAMP`)

    params.push(where.id)
    const query = `UPDATE posts SET ${setParts.join(', ')} WHERE id = $${paramIndex}`
    await pool.query(query, params)
    const { rows } = await pool.query('SELECT * FROM posts WHERE id = $1', [where.id])
    return transformPost(rows[0])
  },

  delete: async (where: { id: string }) => {
    await pool.query('DELETE FROM posts WHERE id = $1', [where.id])
    return { id: where.id }
  }
}

// Export a db object that mimics Prisma's API
export const dbClient = {
  user: userDb,
  post: postDb
}

export { dbClient as db }