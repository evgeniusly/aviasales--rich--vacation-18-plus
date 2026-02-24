import classNames from 'classnames'
import React, { useCallback, useEffect, useState } from 'react'

import classes from './ButtonToGiveaway.module.scss'

interface IButtonToGiveawayProps {
  children?: React.ReactNode
  giveawayRef?: React.RefObject<HTMLDivElement>
  className?: string
  onClick?: React.MouseEventHandler<HTMLDivElement> | undefined
}

export const ButtonToGiveaway: React.FC<IButtonToGiveawayProps> = ({
  children = <>&larr; к розыгрышу</>,
  giveawayRef,
  className,
  onClick,
}) => {
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
    const onScroll = (): void => setIsVisible(document.documentElement.scrollTop < 200)
    window.addEventListener('scroll', onScroll)
    return (): void => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={classNames(classes.buttonToGiveaway, className, !isVisible && classes.buttonToGiveawayHidden)}
      onClick={toGiveawayClick}
    >
      {children}
    </div>
  )
}
