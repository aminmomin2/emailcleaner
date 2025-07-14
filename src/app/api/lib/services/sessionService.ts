import { executeQuery, executeSingleQuery, getSingleRow } from '../database';

export interface Session {
  id: string;
  session_token: string;
  user_id: string;
  expires: string;
  created_at: string;
  updated_at: string;
}

export interface CreateSessionInput {
  session_token: string;
  user_id: string;
  expires: string;
}

export interface UpdateSessionInput {
  session_token?: string;
  expires?: string;
}

export class SessionService {
  // Get all sessions
  static async getAllSessions(): Promise<Session[]> {
    const query = `
      SELECT id, session_token, user_id, expires, created_at, updated_at
      FROM sessions
      ORDER BY created_at DESC
    `;
    return await executeQuery<Session>(query);
  }

  // Get session by ID
  static async getSessionById(id: string): Promise<Session | null> {
    const query = `
      SELECT id, session_token, user_id, expires, created_at, updated_at
      FROM sessions
      WHERE id = ?
    `;
    return await getSingleRow<Session>(query, [id]);
  }

  // Get sessions by user ID
  static async getSessionsByUserId(userId: string): Promise<Session[]> {
    const query = `
      SELECT id, session_token, user_id, expires, created_at, updated_at
      FROM sessions
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
    return await executeQuery<Session>(query, [userId]);
  }

  // Get session by session token
  static async getSessionByToken(sessionToken: string): Promise<Session | null> {
    const query = `
      SELECT id, session_token, user_id, expires, created_at, updated_at
      FROM sessions
      WHERE session_token = ?
    `;
    return await getSingleRow<Session>(query, [sessionToken]);
  }

  // Create a new session
  static async createSession(input: CreateSessionInput): Promise<Session> {
    console.log('🟡 [SESSION SERVICE] createSession called with:', input);
    
    // Generate a UUID for the session ID
    const sessionId = crypto.randomUUID();
    console.log('🟡 [SESSION SERVICE] Generated session ID:', sessionId);
    
    const query = `
      INSERT INTO sessions (id, session_token, user_id, expires)
      VALUES (?, ?, ?, ?)
    `;
    
    console.log('🟡 [SESSION SERVICE] Executing query with params:', [sessionId, input.session_token, input.user_id, input.expires]);
    
    try {
      await executeSingleQuery(query, [
        sessionId,
        input.session_token,
        input.user_id,
        input.expires,
      ]);
      console.log('✅ [SESSION SERVICE] Session insert successful');
    } catch (error) {
      console.error('❌ [SESSION SERVICE] Session insert failed:', error);
      throw error;
    }

    // Get the created session
    const createdSession = await this.getSessionById(sessionId);
    console.log('🟡 [SESSION SERVICE] Retrieved created session:', createdSession);
    
    if (!createdSession) {
      throw new Error('Failed to create session');
    }

    return createdSession;
  }

  // Update session
  static async updateSession(id: string, input: UpdateSessionInput): Promise<Session | null> {
    const updateFields: string[] = [];
    const values: (string | number | null)[] = [];

    if (input.session_token !== undefined) {
      updateFields.push('session_token = ?');
      values.push(input.session_token);
    }
    if (input.expires !== undefined) {
      updateFields.push('expires = ?');
      values.push(input.expires);
    }

    if (updateFields.length === 0) {
      return await this.getSessionById(id);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const query = `
      UPDATE sessions
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `;

    await executeSingleQuery(query, values);
    return await this.getSessionById(id);
  }

  // Delete session
  static async deleteSession(id: string): Promise<boolean> {
    const query = 'DELETE FROM sessions WHERE id = ?';
    const result = await executeSingleQuery(query, [id]);
    return (result as { affectedRows: number }).affectedRows > 0;
  }

  // Delete expired sessions
  static async deleteExpiredSessions(): Promise<number> {
    const query = 'DELETE FROM sessions WHERE expires < NOW()';
    const result = await executeSingleQuery(query);
    return (result as { affectedRows: number }).affectedRows;
  }
} 