import type { RequestOption } from '@modern-js/bff-core'

import { getPrismaClient } from '~/api/db'
import { CardId } from '~/data/cards/enums'
import { AnswerInput } from '~core/defs/interfaces/answer.input'
import { AnswerResponse } from '~core/defs/interfaces/answer.response'

export async function post(request: RequestOption<unknown, AnswerInput>): Promise<AnswerResponse> {
  const cardId = request.data.cardId || 'empty'

  if (![...Object.values(CardId), 'empty'].includes(cardId)) return { error: 'wrong id' }

  const { prisma } = getPrismaClient()

  try {
    // await prisma.$connect()
    const result = await prisma.result.upsert({
      where: {
        answerId: cardId,
      },
      create: {
        answerId: cardId,
        counter: 1,
      },
      update: {
        counter: { increment: 1 },
      },
    })
    return { result }
  } catch (e) {
    console.log(e)
    return { error: `${e as string}` }
  } finally {
    void prisma.$disconnect()
  }
}
