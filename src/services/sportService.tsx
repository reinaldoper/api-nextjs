import pool from "@/db/db";
import { SportData } from "@/types/sportType";
import { ResultSetHeader } from "mysql2/promise";

class ServiceSport {
  async getAllSports(): Promise<SportData[]> {
    const [rows] = await pool.query("SELECT * FROM Sport");
    return rows as SportData[];
  }

  async getSportById(id: number): Promise<SportData | null> {
    const [rows] = await pool.query("SELECT * FROM Sport WHERE id = ?", [id]);
    const sports = rows as SportData[];
    return sports[0] || null;
  }

  async createSport(body: SportData): Promise<number> {
    const { name, code, paralympic } = body;
    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO Sport (name, code, paralympic) VALUES (?, ?, ?)",
      [name, code, paralympic]
    );
    return result.insertId;
  }

  async updateSport(id: number, body: SportData): Promise<boolean> {
    const sport = await this.getSportById(id);
    if (!sport) return false;

    const { name, code, paralympic } = body;
    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE Sport SET name = ?, code = ?, paralympic = ? WHERE id = ?",
      [name, code, paralympic, id]
    );
    return result.affectedRows > 0;
  }

  async deleteSport(id: number): Promise<boolean> {
    const sport = await this.getSportById(id);
    if (!sport) return false;

    const [result] = await pool.query<ResultSetHeader>("DELETE FROM Sport WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  async getSportAthletes(id: number): Promise<SportData[] | boolean> {
    const sport = await this.getSportById(id);
    if (!sport) return false;

    const [rows] = await pool.query("SELECT * FROM Athlete WHERE sportId = ?", [id]);
    return rows as SportData[];
  }
}

const serviceSport = new ServiceSport();
export default serviceSport;
