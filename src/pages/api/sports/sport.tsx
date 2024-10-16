import { NextApiRequest, NextApiResponse } from 'next';
import controllerSports from '../sports';
import { authMiddleware } from '@/middleware/authMiddleware';

const protectedHandler = authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return controllerSports.createSport(req, res);
  } else if (req.method === 'PUT') {
    return controllerSports.updateSport(req, res);
  } else if (req.method === 'GET') {
    return controllerSports.getAllSports(req, res);
  }

  res.setHeader('Allow', ['POST', 'PUT', 'GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
});

export default protectedHandler;
