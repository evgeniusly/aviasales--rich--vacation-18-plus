import React from 'react'

import progressStar from '~/assets/images/progressStar.svg?url'

import classes from './ProgressBar.module.scss'

interface IProgressBarProps {
  progress?: number
  value?: React.JSX.Element | string
}

export const ProgressBar: React.FC<IProgressBarProps> = ({ progress = 0, value }) => {
  return (
    <div className={classes.progressWrap}>
      <div className={classes.progressBar}>
        <div className={classes.progressBarBack}></div>
        <div className={classes.progressBarValue} style={{ width: `${100 * progress}%` }}>
          <img className={classes.progressStar} src={progressStar} alt="" draggable="false" />
        </div>
      </div>
      <div className={classes.progressCounter}>{value}</div>
    </div>
  )
}
