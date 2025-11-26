import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// Réutilise l’instance existante ou crée une nouvelle
export const prisma = global.prisma ?? new PrismaClient();

// En dev, stocke l’instance dans global pour éviter les doublons
if (process.env.NODE_ENV !== 'production') global.prisma = prisma;
