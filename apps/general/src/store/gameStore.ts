import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { CardId } from '~/data/cards'

interface IGameStore {
  isTested: boolean
  resultId: CardId | undefined
  noIntro: boolean

  setAnswer: (resultId: CardId) => void
  setNoIntro: () => void
  resetAll: () => void
}

const initialState = {
  resultId: undefined,
  isTested: false,
}

export const useGameStore = create<IGameStore>()(
  immer((set) => ({
    ...initialState,
    noIntro: false,

    setAnswer: (resultId): void => {
      set((state) => {
        state.resultId = resultId
        state.isTested = true
      })
    },

    setNoIntro: (): void => {
      set((state) => {
        state.noIntro = true
      })
    },

    resetAll: (): void => {
      set(initialState)
    },
  })),
)
