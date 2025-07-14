import { executeQuery, executeSingleQuery, getSingleRow } from '../database';
import { encrypt, decrypt } from '../utils/crypto';

export interface Account {
  id: string;
  user_id: string;
  type: string;
  provider: string;
  provider_account_id: string;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateAccountInput {
  user_id: string;
  type: string;
  provider: string;
  provider_account_id: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

export interface UpdateAccountInput {
  type?: string;
  provider?: string;
  provider_account_id?: string;
  refresh_token?: string;
  access_token?: string;
  expires_at?: number;
  token_type?: string;
  scope?: string;
  id_token?: string;
  session_state?: string;
}

export class AccountService {
  // Get all accounts
  static async getAllAccounts(): Promise<Account[]> {
    const query = `
      SELECT id, user_id, type, provider, provider_account_id, refresh_token, 
             access_token, expires_at, token_type, scope, id_token, session_state,
             created_at, updated_at
      FROM accounts
      ORDER BY created_at DESC
    `;
    const accounts = await executeQuery<Account>(query);
    // Decrypt sensitive fields
    return accounts.map(account => ({
      ...account,
      refresh_token: account.refresh_token ? decrypt(account.refresh_token) : null,
      access_token: account.access_token ? decrypt(account.access_token) : null,
    }));
  }

  // Get account by ID
  static async getAccountById(id: string): Promise<Account | null> {
    const query = `
      SELECT id, user_id, type, provider, provider_account_id, refresh_token, 
             access_token, expires_at, token_type, scope, id_token, session_state,
             created_at, updated_at
      FROM accounts
      WHERE id = ?
    `;
    const account = await getSingleRow<Account>(query, [id]);
    if (!account) return null;
    return {
      ...account,
      refresh_token: account.refresh_token ? decrypt(account.refresh_token) : null,
      access_token: account.access_token ? decrypt(account.access_token) : null,
    };
  }

  // Get accounts by user ID
  static async getAccountsByUserId(userId: string): Promise<Account[]> {
    const query = `
      SELECT id, user_id, type, provider, provider_account_id, refresh_token, 
             access_token, expires_at, token_type, scope, id_token, session_state,
             created_at, updated_at
      FROM accounts
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;
    const accounts = await executeQuery<Account>(query, [userId]);
    // Decrypt sensitive fields
    return accounts.map(account => ({
      ...account,
      refresh_token: account.refresh_token ? decrypt(account.refresh_token) : null,
      access_token: account.access_token ? decrypt(account.access_token) : null,
    }));
  }

  // Create a new account
  static async createAccount(input: CreateAccountInput): Promise<Account> {
    // Generate a UUID for the account ID
    const accountId = crypto.randomUUID();
    
    const query = `
      INSERT INTO accounts (id, user_id, type, provider, provider_account_id, refresh_token, 
                          access_token, expires_at, token_type, scope, id_token, session_state)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await executeSingleQuery(query, [
      accountId,
      input.user_id,
      input.type,
      input.provider,
      input.provider_account_id,
      input.refresh_token ? encrypt(input.refresh_token) : null,
      input.access_token ? encrypt(input.access_token) : null,
      input.expires_at || null,
      input.token_type || null,
      input.scope || null,
      input.id_token || null,
      input.session_state || null,
    ]);

    // Get the created account
    const createdAccount = await this.getAccountById(accountId);
    
    if (!createdAccount) {
      throw new Error('Failed to create account');
    }

    return createdAccount;
  }

  // Update account
  static async updateAccount(id: string, input: UpdateAccountInput): Promise<Account | null> {
    const updateFields: string[] = [];
    const values: (string | number | null)[] = [];

    if (input.type !== undefined) {
      updateFields.push('type = ?');
      values.push(input.type);
    }
    if (input.provider !== undefined) {
      updateFields.push('provider = ?');
      values.push(input.provider);
    }
    if (input.provider_account_id !== undefined) {
      updateFields.push('provider_account_id = ?');
      values.push(input.provider_account_id);
    }
    if (input.refresh_token !== undefined) {
      updateFields.push('refresh_token = ?');
      values.push(input.refresh_token ? encrypt(input.refresh_token) : null);
    }
    if (input.access_token !== undefined) {
      updateFields.push('access_token = ?');
      values.push(input.access_token ? encrypt(input.access_token) : null);
    }
    if (input.expires_at !== undefined) {
      updateFields.push('expires_at = ?');
      values.push(input.expires_at);
    }
    if (input.token_type !== undefined) {
      updateFields.push('token_type = ?');
      values.push(input.token_type);
    }
    if (input.scope !== undefined) {
      updateFields.push('scope = ?');
      values.push(input.scope);
    }
    if (input.id_token !== undefined) {
      updateFields.push('id_token = ?');
      values.push(input.id_token);
    }
    if (input.session_state !== undefined) {
      updateFields.push('session_state = ?');
      values.push(input.session_state);
    }

    if (updateFields.length === 0) {
      return await this.getAccountById(id);
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP');
    values.push(id);

    const query = `
      UPDATE accounts
      SET ${updateFields.join(', ')}
      WHERE id = ?
    `;

    await executeSingleQuery(query, values);
    return await this.getAccountById(id);
  }

  // Delete account
  static async deleteAccount(id: string): Promise<boolean> {
    const query = 'DELETE FROM accounts WHERE id = ?';
    const result = await executeSingleQuery(query, [id]);
    return (result as { affectedRows: number }).affectedRows > 0;
  }
} 