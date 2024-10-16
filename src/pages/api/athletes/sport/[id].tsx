import { NextApiRequest, NextApiResponse } from 'next';
import controllerAthlete from '../../athletes';
import { authMiddleware } from '@/middleware/authMiddleware';

const protectedHandler = authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return controllerAthlete.getAthleteBySportId(req, res);
  }
  
  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
});

export default protectedHandler;
