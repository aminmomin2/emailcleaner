#!/usr/bin/env node

const { initializeDatabase } = require('../src/app/api/lib/init-db.ts')

async function main() {
  try {
    console.log('🚀 Starting database initialization...')
    await initializeDatabase()
    console.log('✅ Database initialization completed successfully!')
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
    process.exit(1)
  }
}

main() 