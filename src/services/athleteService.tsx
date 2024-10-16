import pool from "@/db/db";
import { IAthlete } from "@/types/athleteType";
import { ResultSetHeader } from "mysql2/promise";

class AthleteService {
  async getAthletes(limit: number, olympicId: number): Promise<IAthlete[]> {
    const query = "SELECT * FROM Athlete WHERE paralympic = ? LIMIT ?";
    const [rows] = await pool.query(query, [olympicId, limit]);
    return rows as IAthlete[];
  }

  async getAthleteById(id: string): Promise<IAthlete | null> {
    const [rows] = await pool.query("SELECT * FROM Athlete WHERE id = ?", [id]);
    const athletes = rows as IAthlete[];
    return athletes[0] || null;
  }

  async createAthlete(athlete: IAthlete): Promise<number> {
    const {
      name,
      sportId,
      paralympic,
      instagramUrl,
      instagramName,
      instagramImageUrl,
      instagramFollowersCount,
      instagramFollowingCount,
      instagramPostsCount,
      instagramBio,
    } = athlete;

    const [result] = await pool.query<ResultSetHeader>(
      "INSERT INTO Athlete (name, sportId, paralympic, instagramUrl, instagramName, instagramImageUrl, instagramFollowersCount, instagramFollowingCount, instagramPostsCount, instagramBio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [name, sportId, paralympic, instagramUrl, instagramName, instagramImageUrl, instagramFollowersCount, instagramFollowingCount, instagramPostsCount, instagramBio]
    );

    return result.insertId;
  }

  async updateAthlete(id: string, athlete: Partial<IAthlete>): Promise<boolean> {
    const existingAthlete = await this.getAthleteById(id);
    if (!existingAthlete) return false;

    const {
      name,
      sportId,
      paralympic,
      instagramUrl,
      instagramName,
      instagramImageUrl,
      instagramFollowersCount,
      instagramFollowingCount,
      instagramPostsCount,
      instagramBio,
    } = athlete;

    const [result] = await pool.query<ResultSetHeader>(
      "UPDATE Athlete SET name = ?, sportId = ?, paralympic = ?, instagramUrl = ?, instagramName = ?, instagramImageUrl = ?, instagramFollowersCount = ?, instagramFollowingCount = ?, instagramPostsCount = ?, instagramBio = ? WHERE id = ?",
      [name, sportId, paralympic, instagramUrl, instagramName, instagramImageUrl, instagramFollowersCount, instagramFollowingCount, instagramPostsCount, instagramBio, id]
    );

    return result.affectedRows > 0;
  }

  async deleteAthlete(id: string): Promise<boolean> {
    const existingAthlete = await this.getAthleteById(id);
    if (!existingAthlete) return false;

    const [result] = await pool.query<ResultSetHeader>("DELETE FROM Athlete WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }

  async getAthleteJoinSport(): Promise<IAthlete[]> {
    const [rows] = await pool.query(
      `SELECT a.id, a.name, a.paralympic, a.instagramUrl, a.instagramName, a.instagramImageUrl,
       a.instagramFollowersCount, a.instagramFollowingCount, a.instagramPostsCount, a.instagramBio,
       s.name AS sportName FROM Athlete a JOIN Sport s ON a.sportId = s.id`
    );
    return rows as IAthlete[];
  }

  async getAthleteJoinSportById(id: string): Promise<IAthlete | null> {
    const [rows] = await pool.query(
      `SELECT a.id, a.name, a.paralympic, a.instagramUrl, a.instagramName, a.instagramImageUrl,
       a.instagramFollowersCount, a.instagramFollowingCount, a.instagramPostsCount, a.instagramBio,
       s.name AS sportName FROM Athlete a JOIN Sport s ON a.sportId = s.id WHERE a.id = ?`,
      [id]
    );
    const athletes = rows as IAthlete[];
    return athletes[0] || null;
  }

  async getAthleteBySportId(sportId: string): Promise<IAthlete[]> {
    const [rows] = await pool.query("SELECT * FROM Athlete WHERE sportId = ?", [sportId]);
    return rows as IAthlete[];
  }
}

const athleteService = new AthleteService();
export default athleteService;
