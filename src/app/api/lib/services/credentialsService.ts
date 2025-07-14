import bcrypt from 'bcryptjs'
import { UserService } from './userService'
import { executeSingleQuery } from '../database'

export interface CredentialsUser {
  id: string
  email: string
  name?: string | null
  image?: string | null
  emailVerified?: Date | null
}

export class CredentialsService {
  // Register a new user with email/password
  static async registerUser(email: string, password: string, name?: string): Promise<CredentialsUser> {
    // Check if user already exists
    const existingUser = await UserService.getUserByEmail(email)
    if (existingUser) {
      throw new Error('A user with this email already exists')
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create the user (email will NOT be verified for credentials users)
    const user = await UserService.createUser({
      email,
      name,
      email_verified: undefined, // Credentials users are not automatically verified
    })

    // Store the hashed password in a separate table
    await this.storePassword(user.id, hashedPassword)

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      emailVerified: user.email_verified ? new Date(user.email_verified) : null,
    }
  }

  // Validate user credentials
  static async validateCredentials(email: string, password: string): Promise<CredentialsUser | null> {
    console.log("🟢 [CREDENTIALS] Validating credentials for email:", email)
    
    // Find user by email
    const user = await UserService.getUserByEmail(email)
    if (!user) {
      console.log("❌ [CREDENTIALS] User not found for email:", email)
      return null
    }

    console.log("✅ [CREDENTIALS] User found:", { id: user.id, email: user.email, name: user.name })

    // Get the stored password hash
    const storedPassword = await this.getPassword(user.id)
    if (!storedPassword) {
      console.log("❌ [CREDENTIALS] No password found for user:", user.id)
      return null
    }

    // Compare passwords
    const isValid = await bcrypt.compare(password, storedPassword)
    if (!isValid) {
      console.log("❌ [CREDENTIALS] Invalid password for user:", user.id)
      return null
    }

    console.log("✅ [CREDENTIALS] Credentials validated successfully for user:", user.id)

    // For credentials users, email should not be verified
    // But we return the actual database value in case it was set by other means
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      emailVerified: user.email_verified ? new Date(user.email_verified) : null,
    }
  }

  // Store password hash
  private static async storePassword(userId: string, hashedPassword: string): Promise<void> {
    const query = `
      INSERT INTO user_passwords (user_id, password_hash)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE password_hash = ?
    `
    await executeSingleQuery(query, [userId, hashedPassword, hashedPassword])
  }

  // Get password hash
  private static async getPassword(userId: string): Promise<string | null> {
    const query = `
      SELECT password_hash
      FROM user_passwords
      WHERE user_id = ?
    `
    const result = await executeSingleQuery(query, [userId]) as { password_hash?: string }[]
    return result?.[0]?.password_hash || null
  }

  // Update password
  static async updatePassword(userId: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 12)
    await this.storePassword(userId, hashedPassword)
  }

  // Delete password (when user is deleted)
  static async deletePassword(userId: string): Promise<void> {
    const query = 'DELETE FROM user_passwords WHERE user_id = ?'
    await executeSingleQuery(query, [userId])
  }
} 