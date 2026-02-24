import classNames from 'classnames'
import React from 'react'

import classes from './ProgressBar.module.scss'

interface IProgressBarProps {
  isInGame?: boolean
  progress?: number
  value?: React.JSX.Element | string
}

export const ProgressBar: React.FC<IProgressBarProps> = ({ isInGame, progress = 0, value }) => {
  return (
    <div className={classNames(classes.progressWrap, isInGame && classes.progressWrapInGame)}>
      <div className={classes.progressBar}>
        <div className={classes.progressBarBack}></div>
        <div className={classes.progressBarValue} style={{ width: `${100 * progress}%` }}>
          <svg className={classes.progressStar} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2067_2649)">
              <path
                d="M15 8.01465L22.1924 5.40039L24 10.3311L16.125 13.1934L22 19.9658L17.8682 23.4004L12 16.6357L6.13184 23.4004L2 19.9658L7.87402 13.1934L0 10.3311L1.80762 5.40039L9 8.01465V0.400391H15V8.01465Z"
                fill="#F77D68"
              />
            </g>
            <defs>
              <clipPath id="clip0_2067_2649">
                <rect width="24" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <div className={classes.progressCounter}>{value}</div>
    </div>
  )
}
