import { Result } from 'generated/prisma/client'

import { getPrismaClient } from '~/api/db'

export async function get(): Promise<Result[] | undefined> {
  const { prisma } = getPrismaClient()

  try {
    // await prisma.$connect()
    const result = await prisma.result.findMany()
    return result
  } catch (e) {
    console.log(e)
  } finally {
    void prisma.$disconnect()
  }

  return []
}
