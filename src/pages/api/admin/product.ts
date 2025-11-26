import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../../prisma/prisma';
import { authMiddleware } from '../auth/authMiddleware';

export default authMiddleware(async (req: NextApiRequest, res: NextApiResponse, userId: number) => {
  
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied' });
  }

  switch (req.method) {
    case 'GET':
      const products = await prisma.product.findMany();
      return res.status(200).json(products);

    case 'POST':
      const { name, price, stock = 0, category = 'general', description, imageUrl } = req.body;
      const newProduct = await prisma.product.create({
        data: { 
          name,
          price: Number(price),
          stock: Number(stock),
          category,
          description,
          imageUrl
        }
      });
      return res.status(201).json(newProduct);

    case 'PUT':
      const { id, ...updateData } = req.body;
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: { 
          ...updateData, 
          price: updateData.price ? Number(updateData.price) : undefined,
          stock: updateData.stock ? Number(updateData.stock) : undefined
        },
      });
      return res.status(200).json(updatedProduct);

    case 'DELETE':
      const { productId } = req.body;
      await prisma.product.delete({ where: { id: Number(productId) } });
      return res.status(204).end();

    default:
      res.status(405).end();
  }
});
