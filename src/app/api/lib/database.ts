/**
 * Database Connection and Query Utilities
 * 
 * This module provides a centralized database connection pool and utility functions
 * for executing database queries in the EmailCleaner application.
 * 
 * Features:
 * - Connection pooling for efficient database connections
 * - Type-safe query execution with TypeScript generics
 * - Comprehensive error handling and logging
 * - Environment-based configuration
 * - Connection testing utilities
 * 
 * @author Amin Momin
 * @version 1.0.0
 */

import mysql from 'mysql2/promise';

/**
 * Database configuration object
 * 
 * Configures the MySQL connection pool with environment variables
 * and sensible defaults for development and production environments.
 */
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

/**
 * MySQL connection pool
 * 
 * A connection pool that manages multiple database connections efficiently,
 * reducing the overhead of creating new connections for each query.
 */
const pool = mysql.createPool(dbConfig);

/**
 * Test database connection
 * 
 * Verifies that the database connection pool is working correctly
 * by attempting to acquire and release a connection.
 * 
 * @returns {Promise<boolean>} True if connection is successful, false otherwise
 */
export async function testConnection() {
  try {
    const connection = await pool.getConnection();
  
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
}

/**
 * Execute a query and return multiple rows
 * 
 * Executes a SQL query with optional parameters and returns an array of results.
 * This function is typically used for SELECT queries that return multiple rows.
 * 
 * @template T - TypeScript type for the expected result structure
 * @param {string} query - SQL query string
 * @param {unknown[]} params - Query parameters to prevent SQL injection
 * @returns {Promise<T[]>} Array of query results
 * @throws {Error} When the query execution fails
 */
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

/**
 * Execute a query and return a single result
 * 
 * Executes a SQL query with optional parameters and returns a single result.
 * This function is typically used for INSERT, UPDATE, DELETE operations
 * or SELECT queries that return a single row.
 * 
 * @template T - TypeScript type for the expected result structure
 * @param {string} query - SQL query string
 * @param {unknown[]} params - Query parameters to prevent SQL injection
 * @returns {Promise<T>} Single query result
 * @throws {Error} When the query execution fails
 */
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

/**
 * Get a single row from a query result
 * 
 * Executes a SQL query and returns the first row from the result set.
 * If no rows are found, returns null. This is useful for queries that
 * should return exactly one row (e.g., user lookup by ID).
 * 
 * @template T - TypeScript type for the expected result structure
 * @param {string} query - SQL query string
 * @param {unknown[]} params - Query parameters to prevent SQL injection
 * @returns {Promise<T | null>} Single row result or null if not found
 * @throws {Error} When the query execution fails
 */
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