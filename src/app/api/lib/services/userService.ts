import { executeQuery, executeSingleQuery, getSingleRow } from '../database';

export interface User {
  id: string;
  name: string | null;
  email: string;
  email_verified: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
  has_synced?: boolean;
  last_synced_at?: string;
}

export interface CreateUserInput {
  name?: string;
  email: string;
  email_verified?: string;
  image?: string;
}

export interface UpdateUserInput {
  name?: string;
  email?: string;
  email_verified?: string;
  image?: string;
  has_synced?: boolean; // Add has_synced
}

export class UserService {
  // Get all users
  static async getAllUsers(): Promise<User[]> {
    const query = `
      SELECT id, name, email, email_verified, image, created_at, updated_at
      FROM users
      ORDER BY created_at DESC
    `;
    return await executeQuery<User>(query);
  }

  // Get user by ID
  static async getUserById(id: string): Promise<User | null> {
    try {
      console.log('getUserById called with id:', id);
      const query = `
        SELECT id, name, email, email_verified, image, created_at, updated_at, has_synced
        FROM users
        WHERE id = ?
      `;
      console.log('getUserById query:', query);
      console.log('getUserById params:', [id]);
      
      const result = await getSingleRow<User>(query, [id]);
      console.log('getUserById result:', result);
      
      return result;
    } catch (error) {
      console.error('Error in getUserById:', error);
      throw error;
    }
  }

  // Get user by email
  static async getUserByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT id, name, email, email_verified, image, created_at, updated_at
      FROM users
      WHERE email = ?
    `;
    return await getSingleRow<User>(query, [email]);
  }

  // Create a new user
  static async createUser(input: CreateUserInput): Promise<User> {
    try {
      // Generate a UUID for the user ID
      const userId = crypto.randomUUID();
      console.log('Generated userId:', userId);
      console.log('Input:', input);
      
      const query = `
        INSERT INTO users (id, name, email, email_verified, image)
        VALUES (?, ?, ?, ?, ?)
      `;
      
      console.log('Executing query with params:', [userId, input.name || null, input.email, input.email_verified || null, input.image || null]);
      
      const result = await executeSingleQuery(query, [
        userId,
        input.name || null,
        input.email,
        input.email_verified || null,
        input.image || null,
      ]);

      console.log('Query result:', result);

      // Get the created user
      const createdUser = await this.getUserById(userId);
      console.log('Created user:', createdUser);
      
      if (!createdUser) {
        throw new Error('Failed to create user - user not found after creation');
      }

      return createdUser;
    } catch (error: unknown) {
      // Check for duplicate email error
      if (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        'message' in error &&
        typeof (error as { code?: unknown }).code === 'string' &&
        typeof (error as { message?: unknown }).message === 'string' &&
        (error as { code: string }).code === 'ER_DUP_ENTRY' &&
        (error as { message: string }).message.includes('users.email')
      ) {
        throw new Error('A user with this email already exists.');
      }
      console.error('Error in createUser:', error);
      throw error;
    }
  }

  // Update user
  static async updateUser(id: string, input: UpdateUserInput): Promise<User | null> {
    const updateFields: string[] = [];
    const values: (string | boolean | null)[] = [];

    if (input.name !== undefined) {
      updateFields.push('name = ?');
      values.push(input.name);
    }
    if (input.email !== undefined) {
      updateFields.push('email = ?');
      values.push(input.email);
    }
    if (input.email_verified !== undefined) {
      updateFields.push('email_verified = ?');
      values.push(input.email_verified);
    }
    if (input.image !== undefined) {
      updateFields.push('image = ?');
      values.push(input.image);
    }
    if (input.has_synced !== undefined) {
      updateFields.push('has_synced = ?');
      values.push(input.has_synced);
    }

    if (updateFields.length === 0) {
      return await this.getUserById(id);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const query = `
      UPDATE users
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `;

    await executeSingleQuery(query, values);
    return await this.getUserById(id);
  }

  // Get user sync state
  static async getUserSyncState(id: string): Promise<boolean> {
    const query = `SELECT has_synced FROM users WHERE id = ?`;
    const result = await getSingleRow<{ has_synced: boolean }>(query, [id]);
    return !!result?.has_synced;
  }
  // Set user as synced
  static async setUserSynced(id: string): Promise<void> {
    const query = `UPDATE users SET has_synced = TRUE, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    await executeSingleQuery(query, [id]);
  }

  // Delete user
  static async deleteUser(id: string): Promise<boolean> {
    const query = 'DELETE FROM users WHERE id = ?';
    const result = await executeSingleQuery(query, [id]);
    // Use a type guard for affectedRows
    if (typeof result === 'object' && result !== null && 'affectedRows' in result && typeof (result as { affectedRows?: unknown }).affectedRows === 'number') {
      return (result as { affectedRows: number }).affectedRows > 0;
    }
    return false;
  }
}

// --- UserEmail Service ---
export interface UserEmail {
  id: string;
  user_id: string;
  provider_email_id: string;
  thread_id?: string | null;
  from_email?: string | null;
  to_emails?: string | null;
  cc_emails?: string | null;
  bcc_emails?: string | null;
  subject?: string | null;
  snippet?: string | null;
  internal_date?: string | null;
  received_at?: string | null;
  is_read?: boolean;
  label_ids?: string | null;
  status?: 'active' | 'archived' | 'trashed' | 'deleted';
  raw_body_hash?: string | null;
  created_at?: string;
  updated_at?: string;
}

export class UserEmailService {
  static async getAllUserEmails(): Promise<UserEmail[]> {
    const query = `SELECT * FROM user_emails ORDER BY received_at DESC`;
    return await executeQuery<UserEmail>(query);
  }
  static async getUserEmailById(id: string): Promise<UserEmail | null> {
    const query = `SELECT * FROM user_emails WHERE id = ?`;
    return await getSingleRow<UserEmail>(query, [id]);
  }
  static async getUserEmailsByUserId(userId: string): Promise<UserEmail[]> {
    const query = `SELECT * FROM user_emails WHERE user_id = ? ORDER BY received_at DESC`;
    return await executeQuery<UserEmail>(query, [userId]);
  }
  static async createUserEmail(input: Omit<UserEmail, 'id' | 'created_at' | 'updated_at' | 'received_at'>): Promise<UserEmail> {
    const id = crypto.randomUUID();
    const query = `INSERT INTO user_emails (id, user_id, provider_email_id, thread_id, from_email, to_emails, cc_emails, bcc_emails, subject, snippet, internal_date, is_read, label_ids, status, raw_body_hash) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await executeSingleQuery(query, [id, input.user_id, input.provider_email_id, input.thread_id || null, input.from_email || null, input.to_emails || null, input.cc_emails || null, input.bcc_emails || null, input.subject || null, input.snippet || null, input.internal_date || null, input.is_read || false, input.label_ids || null, input.status || 'active', input.raw_body_hash || null]);
    const created = await this.getUserEmailById(id);
    if (!created) throw new Error('Failed to create user email');
    return created;
  }
  static async updateUserEmail(id: string, input: Partial<Omit<UserEmail, 'id' | 'created_at' | 'updated_at' | 'received_at'>>): Promise<UserEmail | null> {
    const updateFields: string[] = [];
    const values: unknown[] = [];
    for (const key in input) {
      updateFields.push(`${key} = ?`);
      values.push((input as Record<string, unknown>)[key]);
    }
    if (updateFields.length === 0) return await this.getUserEmailById(id);
    values.push(id);
    const query = `UPDATE user_emails SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    await executeSingleQuery(query, values);
    return await this.getUserEmailById(id);
  }
  static async deleteUserEmail(id: string): Promise<boolean> {
    const query = `DELETE FROM user_emails WHERE id = ?`;
    await executeSingleQuery(query, [id]);
    return true;
  }
}

// --- UserCalendarEvent Service ---
export interface UserCalendarEvent {
  id: string;
  user_id: string;
  provider_event_id: string;
  calendar_id: string;
  summary?: string | null;
  description?: string | null;
  start_time: string;
  end_time: string;
  location?: string | null;
  attendees?: string | null;
  status: 'confirmed' | 'tentative' | 'cancelled';
  html_link?: string | null;
  ingested_at?: string;
  created_at?: string;
  updated_at?: string;
}

export class UserCalendarEventService {
  static async getAllUserCalendarEvents(): Promise<UserCalendarEvent[]> {
    const query = `SELECT * FROM user_calendar_events ORDER BY start_time DESC`;
    return await executeQuery<UserCalendarEvent>(query);
  }
  static async getUserCalendarEventById(id: string): Promise<UserCalendarEvent | null> {
    const query = `SELECT * FROM user_calendar_events WHERE id = ?`;
    return await getSingleRow<UserCalendarEvent>(query, [id]);
  }
  static async getUserCalendarEventsByUserId(userId: string): Promise<UserCalendarEvent[]> {
    const query = `SELECT * FROM user_calendar_events WHERE user_id = ? ORDER BY start_time DESC`;
    return await executeQuery<UserCalendarEvent>(query, [userId]);
  }
  static async createUserCalendarEvent(input: Omit<UserCalendarEvent, 'id' | 'created_at' | 'updated_at' | 'ingested_at'>): Promise<UserCalendarEvent> {
    const id = crypto.randomUUID();
    const query = `INSERT INTO user_calendar_events (id, user_id, provider_event_id, calendar_id, summary, description, start_time, end_time, location, attendees, status, html_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    await executeSingleQuery(query, [id, input.user_id, input.provider_event_id, input.calendar_id, input.summary || null, input.description || null, input.start_time, input.end_time, input.location || null, input.attendees || null, input.status, input.html_link || null]);
    const created = await this.getUserCalendarEventById(id);
    if (!created) throw new Error('Failed to create user calendar event');
    return created;
  }
  static async updateUserCalendarEvent(id: string, input: Partial<Omit<UserCalendarEvent, 'id' | 'created_at' | 'updated_at' | 'ingested_at'>>): Promise<UserCalendarEvent | null> {
    const updateFields: string[] = [];
    const values: unknown[] = [];
    for (const key in input) {
      updateFields.push(`${key} = ?`);
      values.push((input as Record<string, unknown>)[key]);
    }
    if (updateFields.length === 0) return await this.getUserCalendarEventById(id);
    values.push(id);
    const query = `UPDATE user_calendar_events SET ${updateFields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    await executeSingleQuery(query, values);
    return await this.getUserCalendarEventById(id);
  }
  static async deleteUserCalendarEvent(id: string): Promise<boolean> {
    const query = `DELETE FROM user_calendar_events WHERE id = ?`;
    await executeSingleQuery(query, [id]);
    return true;
  }
} 