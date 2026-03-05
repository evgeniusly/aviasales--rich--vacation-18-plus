import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'

import { useAppStore } from '~/store/appStore'

import classes from './ButtonToGiveaway.module.scss'

interface IButtonToGiveawayProps {
  children?: React.ReactNode
  giveawayRef?: React.RefObject<HTMLDivElement>
  className?: string
  target?: string | HTMLElement
  onDesktop?: boolean
  onMobile?: boolean
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export const ButtonToGiveaway: React.FC<IButtonToGiveawayProps> = ({
  children = <>&larr; к розыгрышу</>,
  giveawayRef,
  className,
  target = 'giveaway',
  onDesktop = true,
  onMobile = true,
  onClick,
}) => {
  const scale = useAppStore((state) => state.scale)
  const deviceType = useAppStore((state) => state.deviceType)

  const [isVisible, setIsVisible] = useState(true)

  const toGiveawayClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (typeof onClick === 'function') onClick(e)
      const _target = giveawayRef?.current ?? document.getElementById('giveaway')
      _target?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    },
    [onClick],
  )

  useEffect(() => {
    const targetElement = typeof target === 'string' ? document.getElementById(target) : target
    const targetBCR = targetElement?.getBoundingClientRect()
    const scrollTopDist = targetBCR ? targetBCR.top + window.scrollY - 0.6 * document.documentElement.clientHeight : 300

    const onScroll = (): void => setIsVisible(document.documentElement.scrollTop < scrollTopDist)

    window.addEventListener('scroll', onScroll)
    return (): void => window.removeEventListener('scroll', onScroll)
  }, [target, scale])

  if (deviceType !== 'mobile' && !onDesktop) return null
  if (deviceType === 'mobile' && !onMobile) return null
  return (
    <div
      className={classNames(classes.buttonToGiveaway, className, !isVisible && classes.buttonToGiveawayHidden)}
      onClick={toGiveawayClick}
    >
      {children}
    </div>
  )
}
