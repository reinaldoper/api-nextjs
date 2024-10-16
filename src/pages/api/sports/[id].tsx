import { NextApiRequest, NextApiResponse } from 'next';
import controllerSports from '../sports';
import { authMiddleware } from '@/middleware/authMiddleware';

const protectedHandler = authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return controllerSports.getSportById(req, res);
  } else if (req.method === 'DELETE') {
    return controllerSports.deleteSport(req, res);
  }

  res.setHeader('Allow', ['GET', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
});

export default protectedHandler;
