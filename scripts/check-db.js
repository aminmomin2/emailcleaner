#!/usr/bin/env node

// Load environment variables from .env file
require('dotenv').config();

const mysql = require('mysql2/promise');

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'AI_Assistant_DB',
  port: parseInt(process.env.DB_PORT || '3306'),
};

async function checkDatabaseTables() {
  let connection;
  
  try {
    console.log('🔍 Checking database tables...\n');
    console.log(`📊 Database: ${dbConfig.database} on ${dbConfig.host}:${dbConfig.port}\n`);
    
    // Connect to database
    connection = await mysql.createConnection(dbConfig);
    console.log('✅ Connected to database successfully\n');

    // Check if tables exist
    const tables = ['users', 'accounts', 'sessions', 'user_passwords'];
    
    for (const table of tables) {
      console.log(`📋 Checking table: ${table}`);
      
      try {
        // Check if table exists
        const [rows] = await connection.execute(`
          SELECT COUNT(*) as count 
          FROM information_schema.tables 
          WHERE table_schema = ? AND table_name = ?
        `, [dbConfig.database, table]);
        
        if (rows[0].count > 0) {
          console.log(`  ✅ Table '${table}' exists`);
          
          // Get table structure
          const [columns] = await connection.execute(`
            SELECT 
              COLUMN_NAME,
              DATA_TYPE,
              IS_NULLABLE,
              COLUMN_KEY,
              COLUMN_DEFAULT,
              EXTRA
            FROM information_schema.columns 
            WHERE table_schema = ? AND table_name = ?
            ORDER BY ORDINAL_POSITION
          `, [dbConfig.database, table]);
          
          console.log(`  📊 Structure:`);
          columns.forEach(col => {
            const key = col.COLUMN_KEY ? ` (${col.COLUMN_KEY})` : '';
            const nullable = col.IS_NULLABLE === 'YES' ? 'NULL' : 'NOT NULL';
            const default_val = col.COLUMN_DEFAULT ? ` DEFAULT ${col.COLUMN_DEFAULT}` : '';
            console.log(`    - ${col.COLUMN_NAME}: ${col.DATA_TYPE} ${nullable}${default_val}${key}`);
          });
          
          // Get row count
          const [countResult] = await connection.execute(`SELECT COUNT(*) as count FROM ${table}`);
          console.log(`  📈 Row count: ${countResult[0].count}`);
          
        } else {
          console.log(`  ❌ Table '${table}' does not exist`);
        }
        
      } catch (error) {
        console.log(`  ❌ Error checking table '${table}': ${error.message}`);
      }
      
      console.log('');
    }

    // Check for any additional tables
    console.log('🔍 Checking for additional tables...');
    const [allTables] = await connection.execute(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [dbConfig.database]);
    
    const expectedTables = new Set(tables);
    const actualTables = allTables.map(row => row.table_name);
    
    console.log('📋 All tables in database:');
    actualTables.forEach(table => {
      if (expectedTables.has(table)) {
        console.log(`  ✅ ${table} (expected)`);
      } else {
        console.log(`  ⚠️  ${table} (unexpected)`);
      }
    });

    console.log('\n📊 Summary:');
    const missingTables = tables.filter(table => !actualTables.includes(table));
    const extraTables = actualTables.filter(table => !expectedTables.has(table));
    
    if (missingTables.length === 0) {
      console.log('✅ All expected tables exist');
    } else {
      console.log(`❌ Missing tables: ${missingTables.join(', ')}`);
    }
    
    if (extraTables.length === 0) {
      console.log('✅ No unexpected tables found');
    } else {
      console.log(`⚠️  Unexpected tables: ${extraTables.join(', ')}`);
    }

  } catch (error) {
    console.error('❌ Database check failed:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the check
checkDatabaseTables().then(() => {
  console.log('\n🎉 Database check completed!');
}).catch((error) => {
  console.error('❌ Error:', error);
  process.exit(1);
}); 