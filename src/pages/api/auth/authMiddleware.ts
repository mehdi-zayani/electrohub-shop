import type { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export function authMiddleware(handler: (req: NextApiRequest, res: NextApiResponse, userId: number) => any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Invalid token' });

    try {
      const decoded = jwt.verify(token, 'SUPERSECRET') as { userId: number };
      return handler(req, res, decoded.userId);
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}
