import { PrismaClient } from '@prisma/client';

declare global {
  // Augment globalThis to include prisma
  var prisma: PrismaClient | undefined;
}
