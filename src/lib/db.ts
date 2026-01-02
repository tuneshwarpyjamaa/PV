import { sql } from '@vercel/postgres'
import { v4 as uuidv4 } from 'uuid'

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

// User operations
export const userDb = {
  findMany: async () => {
    const { rows } = await sql`SELECT * FROM users ORDER BY created_at DESC`
    return rows.map(transformUser)
  },

  findUnique: async (where: { id?: string; email?: string }) => {
    if (where.id) {
      const { rows } = await sql`SELECT * FROM users WHERE id = ${where.id}`
      return transformUser(rows[0])
    }
    if (where.email) {
      const { rows } = await sql`SELECT * FROM users WHERE email = ${where.email}`
      return transformUser(rows[0])
    }
    return null
  },

  create: async (data: { email: string; name?: string }) => {
    const id = uuidv4()
    await sql`INSERT INTO users (id, email, name) VALUES (${id}, ${data.email}, ${data.name || null})`
    const { rows } = await sql`SELECT * FROM users WHERE id = ${id}`
    return transformUser(rows[0])
  },

  update: async (where: { id: string }, data: { email?: string; name?: string }) => {
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

    // For Postgres, use dynamic query
    let query = 'UPDATE users SET '
    const setParts: string[] = []
    const params: any[] = []

    if (data.email !== undefined) {
      setParts.push('email = ?')
      params.push(data.email)
    }
    if (data.name !== undefined) {
      setParts.push('name = ?')
      params.push(data.name)
    }
    setParts.push('updated_at = CURRENT_TIMESTAMP')

    query += setParts.join(', ') + ' WHERE id = ?'
    params.push(where.id)

    await sql.unsafe(query, params)
    const { rows } = await sql`SELECT * FROM users WHERE id = ${where.id}`
    return transformUser(rows[0])
  },

  delete: async (where: { id: string }) => {
    await sql`DELETE FROM users WHERE id = ${where.id}`
    return { id: where.id }
  }
}

// Post operations
export const postDb = {
  findMany: async (options?: { orderBy?: { createdAt?: 'asc' | 'desc' } }) => {
    const order = options?.orderBy?.createdAt === 'asc' ? 'ASC' : 'DESC'
    const { rows } = await sql`SELECT * FROM posts ORDER BY created_at ${order}`
    return rows.map(transformPost)
  },

  findUnique: async (where: { id: string }) => {
    const { rows } = await sql`SELECT * FROM posts WHERE id = ${where.id}`
    return transformPost(rows[0])
  },

  create: async (data: { title: string; excerpt: string; content: string; category?: string }) => {
    const id = uuidv4()
    const category = data.category || 'Politics'
    await sql`INSERT INTO posts (id, title, excerpt, content, category) VALUES (${id}, ${data.title}, ${data.excerpt}, ${data.content}, ${category})`
    const { rows } = await sql`SELECT * FROM posts WHERE id = ${id}`
    return transformPost(rows[0])
  },

  update: async (where: { id: string }, data: { title?: string; excerpt?: string; content?: string; category?: string }) => {
    const setParts: string[] = []
    const params: any[] = []

    if (data.title !== undefined) {
      setParts.push('title = ?')
      params.push(data.title)
    }
    if (data.excerpt !== undefined) {
      setParts.push('excerpt = ?')
      params.push(data.excerpt)
    }
    if (data.content !== undefined) {
      setParts.push('content = ?')
      params.push(data.content)
    }
    if (data.category !== undefined) {
      setParts.push('category = ?')
      params.push(data.category)
    }
    setParts.push('updated_at = CURRENT_TIMESTAMP')
    params.push(where.id)

    const query = `UPDATE posts SET ${setParts.join(', ')} WHERE id = ?`
    await sql.unsafe(query, params)
    const { rows } = await sql`SELECT * FROM posts WHERE id = ${where.id}`
    return transformPost(rows[0])
  },

  delete: async (where: { id: string }) => {
    await sql`DELETE FROM posts WHERE id = ${where.id}`
    return { id: where.id }
  }
}

// Export a db object that mimics Prisma's API
export const dbClient = {
  user: userDb,
  post: postDb
}

export { dbClient as db }