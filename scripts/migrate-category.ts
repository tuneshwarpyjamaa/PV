import Database from 'better-sqlite3'
import path from 'path'

// Initialize SQLite database
const dbPath = path.join(process.cwd(), 'db', 'local.db')
const db = new Database(dbPath)

console.log('Running migration to add category column...')

try {
    // Check if category column exists
    const tableInfo = db.prepare("PRAGMA table_info(posts)").all()
    const hasCategory = tableInfo.some((col: any) => col.name === 'category')

    if (!hasCategory) {
        console.log('Adding category column to posts table...')
        db.exec("ALTER TABLE posts ADD COLUMN category TEXT DEFAULT 'Politics'")
        console.log('✓ Category column added successfully')
    } else {
        console.log('✓ Category column already exists')
    }

    // Update any NULL categories to 'Politics'
    const result = db.prepare("UPDATE posts SET category = 'Politics' WHERE category IS NULL").run()
    console.log(`✓ Updated ${result.changes} posts with default category`)

    console.log('\nMigration completed successfully!')
} catch (error) {
    console.error('Migration failed:', error)
    process.exit(1)
}

db.close()
