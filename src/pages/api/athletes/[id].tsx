import { NextApiRequest, NextApiResponse } from 'next';
import controllerAthlete from '../athletes';
import { authMiddleware } from '@/middleware/authMiddleware';

const protectedHandler = authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return controllerAthlete.getAthleteById(req, res);
  } else if (req.method === 'DELETE') {
    return controllerAthlete.deleteAthlete(req, res);
  }
  
  res.setHeader('Allow', ['GET', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
});

export default protectedHandler;
