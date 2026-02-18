import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { SmartCaptcha } from '@kosyanmedia/devcom-spec-uikit/dist/elements'

import { answerIncrement } from '~/api/result'
import loaderAnim from '~/assets/images/loaderAnim.webp'
import loaderStarBig from '~/assets/images/loaderStarBig.svg?url'
import loaderStarMid from '~/assets/images/loaderStarMid.svg?url'
import loaderStarSmall from '~/assets/images/loaderStarSmall.svg?url'
import { preloads } from '~/data'
import { CardData, CardId, cards } from '~/data/cards'
import { useDelay } from '~/hooks'
import { useAppStore } from '~/store/appStore'
import { useGameStore } from '~/store/gameStore'
import assetPreloader from '~/utils/assetPreloader'
import { shuffledArray } from '~/utils/helpers'

import { ProgressBar } from '../ProgressBar'

import classes from './ScreenGame.module.scss'

export const ScreenGame: React.FC = () => {
  const deviceType = useAppStore((state) => state.deviceType)
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)
  const gotoResults = useAppStore((state) => state.gotoResults)
  const deskMob = useAppStore((store) => store.deskMob)
  const setAnswer = useGameStore((state) => state.setAnswer)

  const [delay] = useDelay()

  const captchaRef = useRef<{ value: string | null }>(null)
  const cardList = useRef<[CardId, CardData][]>([])

  const [isEnding, setIsEnding] = useState(false)
  const [leftCard, setLeftCard] = useState<[CardId, CardData] | null>(null)
  const [rightCard, setRightCard] = useState<[CardId, CardData] | null>(null)
  const [isLeftSelected, setIsLeftSelected] = useState(false)
  const [isRightSelected, setIsRightSelected] = useState(false)
  const [curStep, setCurStep] = useState(1)

  const stepsTotal = useMemo(() => {
    return Object.keys(cards).length - 1
  }, [])

  const onCardSelect = useCallback(async (isLeft: boolean, cardId: CardId) => {
    ;(isLeft ? setIsLeftSelected : setIsRightSelected)(true)

    if (cardList.current.length < 1) {
      await answerIncrement(captchaRef?.current?.value, cardId)
      if (cardId) setAnswer(cardId)
      await delay(400)
      setIsEnding(true)
      await delay(3000)
      gotoResults()
      return
    }

    await delay(800)
    ;(isLeft ? setRightCard : setLeftCard)(cardList.current.shift() || null)
    setCurStep((prev) => prev + 1)
    setIsLeftSelected(false)
    setIsRightSelected(false)
  }, [])

  useEffect(() => {
    if (deviceType === 'unknown') return
    void assetPreloader([
      ...preloads.inGame,
      ...deskMob(preloads.inGameDesk, preloads.inGameMob),
      ...preloads.preResults,
      ...deskMob(preloads.preResultsDesk, preloads.preResultsMob),
    ])
  }, [deviceType])

  useEffect(() => {
    cardList.current = shuffledArray(Object.entries(cards)) as [CardId, CardData][]
    setLeftCard(cardList.current.shift() || null)
    setRightCard(cardList.current.shift() || null)
  }, [])

  return (
    <div className={classNames(classes.game, 'screen', isScreenInvisible && 'screenInvisible')}>
      {process.env.NODE_ENV !== 'development' && (
        <SmartCaptcha ref={captchaRef} siteKey={process.env.MODERN__SMART_CAPTCHA__SITE_KEY || ''} />
      )}

      <div className={classNames(classes.main, isEnding && classes.mainHidding)}>
        <div className={classes.mainBgLeft}></div>
        <div className={classes.mainBgRight}></div>

        <ProgressBar progress={curStep / stepsTotal} value={`${curStep} / ${stepsTotal}`} />

        <div className={classes.title}>Как выглядит отдых по-взрослому?</div>
        <div className={classes.subTitle}>Выберите один из&nbsp;двух вариантов</div>

        <div className={classes.selector}>
          {leftCard && (
            <div
              className={classNames(
                classes.cardWrap,
                classes.cardLeft,
                isLeftSelected && classes.cardSelected,
                isRightSelected && classes.cardHidden,
              )}
            >
              <div className={classes.cardBody} onClick={() => void onCardSelect(true, leftCard[0])}>
                <div className={classes.cardImgWrap}>
                  <img className={classes.cardImg} src={leftCard[1].img} alt="" draggable="false" />
                </div>
                <div className={classes.cardTitle}>{leftCard[1].title}</div>
              </div>
            </div>
          )}

          {rightCard && (
            <div
              className={classNames(
                classes.cardWrap,
                classes.cardRight,
                isRightSelected && classes.cardSelected,
                isLeftSelected && classes.cardHidden,
              )}
            >
              <div className={classes.cardBody} onClick={() => void onCardSelect(false, rightCard[0])}>
                <div className={classes.cardImgWrap}>
                  <img className={classes.cardImg} src={rightCard[1].img} alt="" draggable="false" />
                </div>
                <div className={classes.cardTitle}>{rightCard[1].title}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={classNames(classes.ending, !isEnding && classes.endingHidding)}>
        <div className={classes.endingTitle}>Прогружаем результаты</div>
        <div className={classes.emdingImageWrap}>
          <img className={classes.loaderStarSmall} src={loaderStarSmall} alt="" draggable="false" />
          <img className={classes.loaderStarMid} src={loaderStarMid} alt="" draggable="false" />
          <img className={classes.loaderStarBig} src={loaderStarBig} alt="" draggable="false" />
          <img className={classes.loaderAnim} src={loaderAnim} alt="" draggable="false" />
        </div>
      </div>
    </div>
  )
}
