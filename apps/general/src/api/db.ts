import { PrismaClient } from 'generated/prisma/client'
import { GlobalOmitConfig } from 'generated/prisma/internal/prismaNamespace'

import { PrismaPg } from '@prisma/adapter-pg'
import { DefaultArgs } from '@prisma/client/runtime/client'

export const getPrismaClient = (): {
  adapter: PrismaPg
  prisma: PrismaClient<never, GlobalOmitConfig | undefined, DefaultArgs>
} => {
  const globalForPrisma = globalThis as unknown as {
    adapter: PrismaPg
    prisma: PrismaClient<never, GlobalOmitConfig | undefined, DefaultArgs>
  }

  if (!globalForPrisma.adapter) {
    globalForPrisma.adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
      ...(process.env.NODE_ENV !== 'development' ? { ssl: { rejectUnauthorized: false } } : {}),
    })
  }

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({ adapter: globalForPrisma.adapter })
  }

  return { adapter: globalForPrisma.adapter, prisma: globalForPrisma.prisma }
}
