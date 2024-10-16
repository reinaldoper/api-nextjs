import { NextApiRequest, NextApiResponse } from 'next';
import { statusCode } from '@/statusCode';
import athleteService from '@/services/athleteService';

class ControllerAthletes {
  async createAthlete(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const athlete = await athleteService.createAthlete(req.body);
      return res.status(statusCode.UPDATE).json({ message: athlete });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }

  async getAllAthletes(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string, 10) || 10;
      const { olympicId } = req.body;
      const athletes = await athleteService.getAthletes(limit, olympicId);
      return res.status(statusCode.OK).json({ message: athletes });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }

  async getAthleteById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const { id } = req.query;
      const athlete = await athleteService.getAthleteById(id as string);
      if (!athlete) {
        return res.status(statusCode.NOT_FOUND).json({ message: 'Athlete not found' });
      }
      return res.status(statusCode.OK).json({ message: athlete });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }

  async updateAthlete(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const { id } = req.query;
      const athlete = await athleteService.updateAthlete(id as string, req.body);
      if (!athlete) {
        return res.status(statusCode.NOT_FOUND).json({ message: 'Athlete not found' });
      }
      return res.status(statusCode.OK).json({ message: athlete });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }

  async deleteAthlete(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const { id } = req.query;
      const athlete = await athleteService.deleteAthlete(id as string);
      if (!athlete) {
        return res.status(statusCode.NOT_FOUND).json({ message: 'Athlete not found' });
      }
      return res.status(statusCode.OK).json({ message: athlete });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }

  async getAthleteJoinSports(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const athletes = await athleteService.getAthleteJoinSport();
      return res.status(statusCode.OK).json({ message: athletes });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }

  async getAthleteJoinSportsById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const { id } = req.query;
      const athlete = await athleteService.getAthleteJoinSportById(id as string);
      if (!athlete) {
        return res.status(statusCode.NOT_FOUND).json({ message: 'Athlete not found' });
      }
      return res.status(statusCode.OK).json({ message: athlete });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }

  async getAthleteBySportId(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const { id } = req.query;
      const athlete = await athleteService.getAthleteById(id as string);
      if (!athlete) {
        return res.status(statusCode.NOT_FOUND).json({ message: 'Athlete not found' });
      }
      const athletes = await athleteService.getAthleteBySportId(id as string);
      return res.status(statusCode.OK).json({ message: athletes });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }
}

const controllerAthlete = new ControllerAthletes();
export default controllerAthlete;
