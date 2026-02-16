import classNames from 'classnames'
import React from 'react'

import aviasalesLogo from '~/assets/images/aviasalesLogo.svg?url'
import clientLogo from '~/assets/images/clientLogo.svg?url'
import { links } from '~/data'
import { useAppStore } from '~/store/appStore'

import classes from './Header.module.scss'

export const Header: React.FC = () => {
  const screenId = useAppStore((state) => state.screenId)
  const isScreenInvisible = useAppStore((state) => state.isScreenInvisible)

  return (
    <div
      className={classNames(
        classes.header,
        classes[`screen-${screenId}`],
        'screen',
        screenId === 'home' && isScreenInvisible && 'screenInvisible',
      )}
    >
      <div className={classes.content}>
        <div className={classes.logos}>
          <a className={classes.logoLink} href={links.aviasales} target="_blank">
            <img src={aviasalesLogo} className={classes.aviasalesLogoImg} alt="aviasales" />
          </a>

          <svg className={classes.cross} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.05273 1L9.05278 9.00005" stroke="black" strokeWidth="1.6" strokeLinecap="round" />
            <path d="M9.05078 1L1.05073 9.00005" stroke="black" strokeWidth="1.6" strokeLinecap="round" />
          </svg>

          <a className={classes.logoLink} href={links.client} target="_blank">
            <img src={clientLogo} className={classes.clientLogoImg} alt="" />
          </a>
        </div>

        <div className={classes.actions}>
          <a className={classes.rulesLink} href={links.rules} target="_blank">
            Правила
          </a>
        </div>
      </div>
    </div>
  )
}
