import { prisma } from '../../../../prisma/prisma';
import bcrypt from 'bcrypt';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { email, password: hashedPassword, role: 'user' },
  });

  res.status(201).json({ id: user.id, email: user.email, role: user.role });
}
