import classNames from 'classnames'
import React, { useCallback, useMemo } from 'react'

import classes from './Button.module.scss'

type TMod = 'blue'

interface IButtonProps {
  children: React.ReactNode
  mod?: TMod | TMod[]
  glow?: boolean
  outline?: boolean
  arrow?: boolean
  disabled?: boolean
  className?: string
  href?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> | undefined
}

export const Button: React.FC<IButtonProps> = ({
  children,
  mod,
  glow,
  outline,
  arrow,
  disabled,
  className,
  href,
  onClick,
}) => {
  const collectedClass = useMemo(
    () =>
      classNames(
        classes.button,
        mod && typeof mod === 'string' && classes[mod],
        mod && Array.isArray(mod) && mod.map((item) => classes[item]),
        glow && classes.buttonGlow,
        className,
        disabled && classes.disabled,
      ),
    [mod, glow, className, disabled],
  )

  const content = useMemo(
    () => (
      <>
        {outline && <div className={classes.outline}></div>}
        <div className={classes.children}>
          {children}
          {arrow && (
            <svg className={classes.arrow} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 14H26M26 14L16.6087 4M26 14L16.6087 24"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>
        {glow && (
          <div className={classes.glowWrap}>
            <div className={classes.glow}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 123 60" fill="none">
                <path opacity="0.4" d="M.217 0H52.01l44.24 59.803H44.457L.217 0z" fill="#E8E8E8"></path>
                <path opacity="0.4" d="M65.272 0h12.014l44.779 59.803h-12.014L65.272 0z" fill="#E8E8E8"></path>
              </svg>
            </div>
          </div>
        )}
      </>
    ),
    [children, glow],
  )

  const onButtonClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = useCallback(
    (e) => {
      if (typeof onClick === 'function' && !disabled) onClick(e)
    },
    [onClick, disabled],
  )

  if (href) {
    return (
      <a className={collectedClass} href={href} target="_blank" onClick={onButtonClick}>
        {content}
      </a>
    )
  }

  return (
    <button className={collectedClass} type="button" disabled={disabled} onClick={onButtonClick}>
      {content}
    </button>
  )
}
