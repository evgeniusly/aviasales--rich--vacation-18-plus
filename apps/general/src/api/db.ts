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

  const adapter =
    globalForPrisma.adapter ||
    new PrismaPg({
      connectionString: process.env.DATABASE_URL,
      ...(process.env.NODE_ENV !== 'development'
        ? {
            ssl: {
              rejectUnauthorized: false,
            },
          }
        : {}),
    })
  const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.adapter = adapter
    globalForPrisma.prisma = prisma
  }

  return { adapter, prisma }
}
