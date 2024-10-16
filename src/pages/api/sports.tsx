import { NextApiRequest, NextApiResponse } from 'next';
import { statusCode } from '@/statusCode';
import serviceSport from '@/services/sportService';

class ControllerSports {
  async createSport(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const sport = await serviceSport.createSport(req.body);
      return res.status(statusCode.UPDATE).json({ message: sport });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }

  async getAllSports(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Surrogate-Control', 'no-store');
      const sports = await serviceSport.getAllSports();
      return res.status(statusCode.OK).json({ message: sports });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }

  async getSportById(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const { id } = req.query;
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('Surrogate-Control', 'no-store');
      const sport = await serviceSport.getSportById(Number(id));
      if (!sport) {
        return res.status(statusCode.NOT_FOUND).json({ message: 'Sport not found' });
      }
      return res.status(statusCode.OK).json({ message: sport });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }

  async updateSport(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const { id } = req.query;
      const sport = await serviceSport.updateSport(Number(id), req.body);
      if (!sport) {
        return res.status(statusCode.NOT_FOUND).json({ message: 'Sport not found' });
      }
      return res.status(statusCode.OK).json({ message: sport });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }

  async deleteSport(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const { id } = req.query;
      const sport = await serviceSport.deleteSport(Number(id));
      if (!sport) {
        return res.status(statusCode.NOT_FOUND).json({ message: 'Sport not found' });
      }
      return res.status(statusCode.OK).json({ message: 'Sport deleted successfully' });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }

  async getSportAthletes(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
      const { id } = req.query;
      const athletes = await serviceSport.getSportAthletes(Number(id));
      if (!athletes) {
        return res.status(statusCode.NOT_FOUND).json({ message: 'Sport not found or no athletes available' });
      }
      return res.status(statusCode.OK).json({ message: athletes });
    } catch (error) {
      return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ error: (error as Error).message });
    }
  }
}

const controllerSports = new ControllerSports();
export default controllerSports;
