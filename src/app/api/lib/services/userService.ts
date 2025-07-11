import { executeQuery, executeSingleQuery, getSingleRow } from '../database';

export interface User {
  id: string;
  name: string | null;
  email: string;
  email_verified: string | null;
  image: string | null;
  created_at: string;
  updated_at: string;
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
        SELECT id, name, email, email_verified, image, created_at, updated_at
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
    } catch (error: any) {
      // Check for duplicate email error
      if (error.code === 'ER_DUP_ENTRY' && error.message.includes('users.email')) {
        throw new Error('A user with this email already exists.');
      }
      console.error('Error in createUser:', error);
      throw error;
    }
  }

  // Update user
  static async updateUser(id: string, input: UpdateUserInput): Promise<User | null> {
    const updateFields: string[] = [];
    const values: any[] = [];

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

  // Delete user
  static async deleteUser(id: string): Promise<boolean> {
    const query = 'DELETE FROM users WHERE id = ?';
    const result = await executeSingleQuery(query, [id]);
    return (result as any).affectedRows > 0;
  }
} 