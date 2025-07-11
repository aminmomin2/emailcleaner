/**
 * Utility functions for handling MySQL datetime conversions
 */

/**
 * Converts a Date object or ISO string to MySQL datetime format
 * MySQL DATETIME format: 'YYYY-MM-DD HH:MM:SS'
 * @param date - Date object or ISO string
 * @returns MySQL datetime string
 */
export function toMySQLDateTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toISOString().slice(0, 19).replace('T', ' ');
}

/**
 * Converts a MySQL datetime string to a Date object
 * @param mysqlDateTime - MySQL datetime string ('YYYY-MM-DD HH:MM:SS')
 * @returns Date object
 */
export function fromMySQLDateTime(mysqlDateTime: string): Date {
  return new Date(mysqlDateTime.replace(' ', 'T') + 'Z');
} 