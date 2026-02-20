import classNames from 'classnames'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { getAnswerStat } from '~/api/result'
import giveawayCircles from '~/assets/images/giveawayCircles.svg?url'
import giveawayHalfCircles from '~/assets/images/giveawayHalfCircles.svg?url'
import giveawayLeftText from '~/assets/images/giveawayLeftText.svg?url'
import glass from '~/assets/images/glass.svg?url'
import promoBage from '~/assets/images/promoBage.svg?url'
import promoCircles from '~/assets/images/promoCircles.svg?url'
import promoImageDesk from '~/assets/images/promoImageDesk.png'
import promoRight from '~/assets/images/promoRight.svg?url'
import promoRope from '~/assets/images/promoRope.svg?url'
import resultRight from '~/assets/images/resultRight.svg?url'
import { preloads, resultEmpty } from '~/data'
import { cards } from '~/data/cards'
import { useAppStore } from '~/store/appStore'
import { useGameStore } from '~/store/gameStore'
import assetPreloader from '~/utils/assetPreloader'

import { Button } from '../Button'
import { GiveawayDefault } from '../GiveawayDefault'

import classes from './ScreenResults.module.scss'

export const ScreenResults: React.FC = () => {
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)
  const deviceType = useAppStore((state) => state.deviceType)
  const deskMob = useAppStore((state) => state.deskMob)
  const gotoGame = useAppStore((state) => state.gotoGame)
  const isTested = useGameStore((state) => state.isTested)
  const resultId = useGameStore((state) => state.resultId)
  const resetAll = useGameStore((state) => state.resetAll)

  const [resultPercValue, setResultPercValue] = useState('')

  const [resultData, restartBtnText, isTestedLocal] = useMemo(() => {
    return [
      isTested && resultId ? cards[resultId] : undefined, //
      isTested ? 'Передумать' : 'Передумать',
      isTested,
    ]
  }, []) // do not subscribe this !

  useEffect(() => {
    const updateBageResult = async (): Promise<void> => {
      const val = await getAnswerStat(resultId)
      setResultPercValue(`${Math.round(val * 100)}%`)
    }
    void updateBageResult()
  }, [])

  const onRestartClick = useCallback(() => {
    resetAll()
    gotoGame()
  }, [isTestedLocal, resetAll])

  useEffect(() => {
    if (deviceType === 'unknown') return
    void assetPreloader([...preloads.preGame, ...deskMob(preloads.preGameDesk, preloads.preGameMob)])
  }, [deviceType])

  return (
    <div className={classNames(classes.results, 'screen', isScreenInvisible && 'screenInvisible')}>
      <div className={classes.top}>
        <img className={classes.resultRightCircles} src={resultRight} alt="" draggable="false" />

        <div className={classNames(classes.result, classes.content)}>
          <div className={classes.resultLeft}>
            <div className={classes.resultLeftTop}>
              <img className={classes.resultGlass} src={glass} alt="" draggable="false" />
            </div>
            <div className={classes.resultLeftBottom}></div>
          </div>

          {isTestedLocal && resultData && (
            <>
              <div className={classes.resultBody}>
                <div className={classes.testedPref}>Настоящий отпуск по-взрослому выглядит так</div>
                <div className={classes.resultTitle}>{resultData.title}</div>
                <div className={classes.resulttStat}>
                  <div className={classes.resulttStatValue}>{resultPercValue}</div>
                  <div className={classes.resulttStatText}>{resultData.statText}</div>
                </div>
                <div className={classes.resultActions}>
                  <Button onClick={onRestartClick}>{restartBtnText}</Button>
                </div>
              </div>

              <div className={classes.resultImageWrap}>
                <img className={classes.resultImage} src={resultData.img} alt="" draggable="false" />
              </div>
            </>
          )}

          {!isTestedLocal && (
            <>
              <div className={classes.resultBody}>
                <div className={classes.resultTitle}>{resultEmpty.title}</div>
                <div className={classes.resultText}>{resultEmpty.text}</div>
                <div className={classes.resultActions}>
                  <Button onClick={onRestartClick}>{restartBtnText}</Button>
                </div>
              </div>

              <div className={classes.resultImageWrap}>
                <img
                  className={classNames(classes.resultImage, classes.resultImageCentered)}
                  src={resultEmpty.img}
                  alt=""
                  draggable="false"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className={classes.promo}>
        <div className={classNames(classes.promoContent, classes.content)}>
          <div className={classes.resultLeft}>
            <div className={classes.promoLeftTop}></div>
            <img className={classes.promoCircles} src={promoCircles} alt="" draggable="false" />
          </div>
          <div className={classes.resultRight}>
            <img className={classes.promoRightText} src={promoRight} alt="" draggable="false" />
            <div className={classes.promoRightBottom}></div>
          </div>

          <div className={classes.promoBody}>
            <div className={classes.promoTitle}>Затонируйте свой отдых</div>
            <div className={classes.promoText}>
              От&nbsp;лёгкой горчинки и&nbsp;искристого вкуса тоников Rich внутренний ребёнок будет в&nbsp;восторге.
              А&nbsp;скидка на&nbsp;напитки из&nbsp;специальной подборки порадует внешнего взрослого.
            </div>
            <div className={classes.promoActions}>
              <Button glow mod={'blue'}>
                Выбрать напитки
              </Button>
            </div>
          </div>

          <div className={classes.promoImageWrap}>
            <img className={classes.promoImage} src={promoImageDesk} alt="" draggable="false" />
            <img className={classes.promoBage} src={promoBage} alt="" draggable="false" />
            <img className={classes.promoRope} src={promoRope} alt="" draggable="false" />
          </div>
        </div>
      </div>

      <div className={classes.bottom}>
        <img className={classes.giveawayHalfCircles} src={giveawayHalfCircles} alt="" draggable="false" />

        <div className={classNames(classes.bottomContent, classes.content)}>
          <div className={classes.resultLeft}>
            <img className={classes.giveawayLeftText} src={giveawayLeftText} alt="" draggable="false" />{' '}
          </div>
          <div className={classes.resultRight}>
            <img className={classes.giveawayCircles} src={giveawayCircles} alt="" draggable="false" />
            <div className={classes.bottomRightTop}></div>
          </div>

          <GiveawayDefault />
        </div>
      </div>
    </div>
  )
}
