import React from 'react'

import preloaderSign from '~/assets/images/preloaderSign.svg?url'

import { ProgressBar } from '../ProgressBar'

import classes from './Preloader.module.scss'

interface IPreloaderProps {
  progress: number
}

export const Preloader: React.FC<IPreloaderProps> = ({ progress }) => {
  return (
    <div className={classes.preloader}>
      <img className={classes.preloaderSign} src={preloaderSign} alt="" draggable="false" />

      <div className={classes.title}>Вход только для взрослых</div>
      <div className={classes.text}>Уберите детей от&nbsp;экрана</div>

      <ProgressBar progress={progress} value={Math.round(progress * 100) + '%'} />
    </div>
  )
}
