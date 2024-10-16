
import { NextApiRequest, NextApiResponse } from 'next';
import controllerUser from '../users';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return controllerUser.login(req, res);
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
