import pool from "@/db/db";
import { User } from "@/types/userTypes";
import { ResultSetHeader } from "mysql2/promise";

class ServiceUsers {
  async getAllUsers(): Promise<User[]> {
    const [rows] = await pool.query("SELECT * FROM Users");
    return rows as User[];
  }

  async getUserById(id: number): Promise<User | null> {
    const [rows] = await pool.query("SELECT * FROM Users WHERE id = ?", [id]);
    const users = rows as User[];
    return users[0] || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query("SELECT * FROM Users WHERE email = ?", [email]);
    const users = rows as User[];
    return users[0] || null;
  }

  async createUser({ email, password, name }: User): Promise<number> {
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO Users (name, email, password) VALUES (?, ?, ?)",
      [name, email, password]
    );
    return result.insertId;
  }

  async updateUser(id: number, user: Partial<User>): Promise<boolean> {
    const existingUser = await this.getUserById(id);
    if (!existingUser) return false;

    const { name } = user;
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE Users SET name = ? WHERE id = ?",
      [name, id]
    );
    return result.affectedRows > 0;
  }

  async deleteUser(id: number): Promise<boolean> {
    const existingUser = await this.getUserById(id);
    if (!existingUser) return false;

    const [result] = await pool.query<ResultSetHeader>("DELETE FROM Users WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

const serviceUsers = new ServiceUsers();
export default serviceUsers;
