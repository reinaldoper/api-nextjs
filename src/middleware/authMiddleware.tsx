import { statusCode } from '@/statusCode';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

type NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => Promise<void> | void;

export const authMiddleware = (handler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(statusCode.UNAUTHORIZED).json({ message: 'Authorization token is required' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req.body.user = decoded; 
      return handler(req, res); 
    } catch (error) {
      return res.status(statusCode.UNAUTHORIZED).json({ message: `Invalid token: ${error}` });
    }
  };
};
