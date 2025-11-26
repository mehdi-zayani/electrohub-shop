import type { NextApiRequest, NextApiResponse } from 'next';
import { authMiddleware } from './authMiddleware';
import { prisma } from '../../../../prisma/prisma';

export default authMiddleware(async (req: NextApiRequest, res: NextApiResponse, userId: number) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, role: true }
  });

  if (!user) return res.status(404).json({ error: 'User not found' });

  res.status(200).json(user);
});
