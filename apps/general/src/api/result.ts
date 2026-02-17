import { Result } from 'generated/prisma/client'

import { CardId } from '~/data/cards/enums'
import { AnswerResponse } from '~core/defs'
import { AnswerInput } from '~core/defs/interfaces/answer.input'

const tokenName = process.env.MODERN__SMART_CAPTCHA__HEADER_NAME || 'x-smart-captcha-token'

export const getAnswerStat = async (cardId?: CardId): Promise<number> => {
  const res = await fetch('/api/result/getAnswers')
  const data = (await res.json()) as Result[] | undefined

  if (!data) return 0

  const targetId = cardId || 'empty'

  let targetCount = 0
  let total = 0

  data.forEach(({ answerId, counter }) => {
    if (answerId === (targetId as string)) {
      targetCount = counter
    }
    if (!(targetId !== 'empty' && answerId === 'empty')) {
      total += counter
    }
  })

  if (targetCount === 0) return 0
  if (total === 0) return 1
  return targetCount / total
}

export const answerIncrement = async (
  captchaToken?: string | null,
  cardId?: CardId,
): Promise<AnswerResponse | undefined> => {
  if (localStorage.getItem('isAnswered')) return
  localStorage.setItem('isAnswered', 'true')

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
