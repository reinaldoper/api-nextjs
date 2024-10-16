import { NextApiRequest, NextApiResponse } from 'next';
import controllerAthlete from '../athletes';
import { authMiddleware } from '@/middleware/authMiddleware';

const protectedHandler = authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return controllerAthlete.createAthlete(req, res);
  } else if (req.method === 'PUT') {
    return controllerAthlete.updateAthlete(req, res);
  } else if (req.method === 'PATCH') {
    return controllerAthlete.getAllAthletes(req, res);
  }
  
  res.setHeader('Allow', ['POST', 'PUT', 'PATCH']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
});

export default protectedHandler;
