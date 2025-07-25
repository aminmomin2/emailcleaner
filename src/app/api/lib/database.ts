import mysql from 'mysql2/promise';

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'your_ai_assistant_auth_db',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

// Execute a query with parameters
export async function executeQuery<T = unknown>(
  query: string,
  params: unknown[] = []
): Promise<T[]> {
  try {
    const [rows] = await pool.execute(query, params);
    return rows as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error(`Database query failed: ${error}`);
  }
}

// Execute a single query (for INSERT, UPDATE, DELETE)
export async function executeSingleQuery<T = unknown>(
  query: string,
  params: unknown[] = []
): Promise<T> {
  try {
    const [result] = await pool.execute(query, params);
    return result as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error(`Database query failed: ${error}`);
  }
}

// Get a single row
export async function getSingleRow<T = unknown>(
  query: string,
  params: unknown[] = []
): Promise<T | null> {
  try {
    const [rows] = await pool.execute(query, params);
    const results = rows as T[];
    return results.length > 0 ? results[0] : null;
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error(`Database query failed: ${error}`);
  }
}

export default pool; 