
import { NextApiRequest, NextApiResponse } from 'next';
import controllerUser from '../users';
import { authMiddleware } from '@/middleware/authMiddleware';

const protectedHandler = authMiddleware(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    return controllerUser.getUserById(req, res);
  } else if (req.method === 'DELETE') {
    return controllerUser.deleteUser(req, res);
  }
  res.setHeader('Allow', ['GET', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
});

export default protectedHandler;
