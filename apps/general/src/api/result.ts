import { Result } from 'generated/prisma/client'

import { CardId, ExtraCardId } from '~/data/cards/enums'
import { AnswerResponse } from '~core/defs'
import { AnswerInput } from '~core/defs/interfaces/answer.input'

enum ResultStorageKeys {
  IsAlreadySkiped = 'isAlreadySkiped',
  IsAnswered = 'isAnswered',
}

const tokenName = process.env.MODERN__SMART_CAPTCHA__HEADER_NAME || 'x-smart-captcha-token'

export const getAnswerStat = async (cardId: CardId | ExtraCardId = ExtraCardId.Skiped): Promise<number> => {
  const res = await fetch('/api/result/getAnswers')
  const data = (await res.json()) as Result[] | undefined

  if (!data) return 0

  let targetCount = 0
  let total = 0

  data.forEach(({ answerId, counter }) => {
    if (answerId === (cardId as string)) {
      targetCount = counter
    }
    if (
      // get full total if looking for 'empty'...
      cardId === ExtraCardId.Skiped ||
      // otherwise excleude 'empty' from total
      answerId !== (ExtraCardId.Skiped as string)
    ) {
      total += counter
    }
  })

  if (targetCount === 0) return 0
  if (total === 0) return 1
  return targetCount / total
}

export const answerIncrement = async (
  captchaToken?: string | null,
  cardId: CardId | ExtraCardId = ExtraCardId.Skiped,
): Promise<AnswerResponse | undefined> => {
  if (localStorage.getItem(ResultStorageKeys.IsAnswered)) return

  if (cardId === ExtraCardId.Skiped) {
    if (localStorage.getItem(ResultStorageKeys.IsAlreadySkiped)) return
    localStorage.setItem(ResultStorageKeys.IsAlreadySkiped, 'true')
  } else {
    localStorage.setItem(ResultStorageKeys.IsAnswered, 'true')
  }

  const body: AnswerInput = { cardId }
  const res = await fetch('/api/result/answerIncrement', {
    method: 'POST',
    headers: {
      [tokenName]: captchaToken || '',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  const data = (await res.json()) as AnswerResponse
  // console.log('data', data)
  return data
}
