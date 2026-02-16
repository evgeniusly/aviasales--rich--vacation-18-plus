import classNames from 'classnames'
import React, { useEffect } from 'react'

import glass from '~/assets/images/glass.svg?url'
import homeCircles from '~/assets/images/homeCircles.svg?url'
import partyBack from '~/assets/images/partyBack.svg?url'
import partyCircles from '~/assets/images/partyCircles.svg?url'
import { preloads } from '~/data'
import { useAppStore } from '~/store/appStore'
import assetPreloader from '~/utils/assetPreloader'

import { Button } from '../Button'

import classes from './ScreenHome.module.scss'

export const ScreenHome: React.FC = () => {
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)
  const deviceType = useAppStore((state) => state.deviceType)
  const deskMob = useAppStore((state) => state.deskMob)
  const gotoGame = useAppStore((state) => state.gotoGame)
  const gotoResults = useAppStore((state) => state.gotoResults)

  useEffect(() => {
    if (deviceType === 'unknown') return
    void assetPreloader([...preloads.preGame, ...deskMob(preloads.preGameDesk, preloads.preGameMob)])
  }, [deviceType])

  return (
    <div className={classNames(classes.home, 'screen', isScreenInvisible && 'screenInvisible')}>
      <div className={classes.content}>
        <div className={classes.bodyWrap}>
          <div className={classes.body}>
            <div className={classes.titleWrap}>
              <div className={classes.titleMain}>
                <div className={classes.titleMainContent}>Отпуск</div>
              </div>
              <div className={classes.titleGlass}>
                <img className={classes.glass} src={glass} alt="" draggable="false" />
              </div>
              <div className={classes.titleSec}>
                <div className={classes.titleSecContent}>18+</div>
              </div>
              <div className={classes.titleCircles}>
                <img className={classes.homeCircles} src={homeCircles} alt="" draggable="false" />
              </div>
            </div>

            <div className={classes.text}>
              Помогите определить, как выглядит отдых для взрослых, и&nbsp;выиграйте баллы на&nbsp;путешествие{' '}
            </div>

            <div className={classes.actions}>
              <Button glow onClick={gotoGame}>
                Пройти опрос
              </Button>
              <button className={classes.toResultBtn} onClick={gotoResults}>
                Сразу к розыгрышу
              </button>
            </div>
          </div>
        </div>

        <div className={classes.partyWrap}>
          <div className={classes.partyContent}>
            <img className={classes.partyBack} src={partyBack} alt="" draggable="false" />
            <div className={classes.partyDots}></div>
            <img className={classes.partyCircles} src={partyCircles} alt="" draggable="false" />
          </div>
        </div>
      </div>
    </div>
  )
}
