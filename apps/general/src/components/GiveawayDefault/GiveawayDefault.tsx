import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'

import { Registration, useGiveaway } from '@kosyanmedia/devcom-spec-uikit/dist/collections'
import { SmartCaptcha } from '@kosyanmedia/devcom-spec-uikit/dist/elements'
import { EmailFormProps } from '@kosyanmedia/devcom-spec-uikit/dist/modules'

import giveawayCatGray from '~/assets/images/giveawayCatGray.svg?url'
import giveawayCatRed from '~/assets/images/giveawayCatRed.svg?url'
import loaderStarBig from '~/assets/images/loaderStarBig.svg?url'
import { emailFormData, giveawayTexts, shareFormData, subscriptionFormData } from '~/data'
import { winnersLink, winnersList } from '~/defs'
import { useAppStore } from '~/store/appStore'

import classes from './GiveawayDefault.module.scss'

export const GiveawayDefault: React.FC = () => {
  const isDeadlined = useAppStore((state) => state.isDeadlined)
  const deviceType = useAppStore((state) => state.deviceType)

  const captchaRef = useRef<{ value: string | null }>(null)

  const [isCatsTurned, setIsCatsTurned] = useState(false)

  useEffect(() => {
    if (deviceType !== 'desktop') return

    const onMouseMove = (e: MouseEvent): void => {
      if (Math.abs(e.movementX) < 4) return
      setIsCatsTurned(e.movementX > 0)
      // setIsCatsTurned(e.clientX > document.body.clientWidth * 0.6)
    }
    document.addEventListener('mousemove', onMouseMove)
    return (): void => {
      document.removeEventListener('mousemove', onMouseMove)
    }
  }, [deviceType])

  const { state, networkError, handleRegister, handleShare } = useGiveaway({
    isDevelopment: process.env.NODE_ENV === 'development',
    captchaRef: captchaRef,
    subscriptionFormData: subscriptionFormData,
  })

  // useEffect(() => {
  //   const submitButton = document.getElementsByClassName(classes.giveawayEmailFormButton)[0]
  //   const shareButtons = document.getElementsByClassName(classes.giveawayShareFormLink)
  //   const checkboxes = document.getElementsByClassName(classes.giveawayEmailFormCheckbox)
  //   const onSubmitClick = (): void => analyticsEvent('clickSend')
  //   const onVkClick = (): void => analyticsEvent('clickVk')
  //   const onTgClick = (): void => analyticsEvent('clickTg')
  //   const onWaClick = (): void => analyticsEvent('clickWa')
  //   const onCpClick = (): void => analyticsEvent('clickCopy')
  //   const onChkBox1Click = (): void => analyticsEvent('buttonAgree1')
  //   const onChkBox2Click = (): void => analyticsEvent('buttonAgree2')

  //   if (submitButton) submitButton.addEventListener('click', onSubmitClick)
  //   if (shareButtons[0]) shareButtons[0].addEventListener('click', onVkClick)
  //   if (shareButtons[1]) shareButtons[1].addEventListener('click', onTgClick)
  //   if (shareButtons[2]) shareButtons[2].addEventListener('click', onWaClick)
  //   if (shareButtons[3]) shareButtons[3].addEventListener('click', onCpClick)
  //   if (checkboxes[0]) checkboxes[0].addEventListener('click', onChkBox1Click, { once: true })
  //   if (checkboxes[1]) checkboxes[1].addEventListener('click', onChkBox2Click, { once: true })
  //   return (): void => {
  //     if (submitButton) submitButton.removeEventListener('click', onSubmitClick)
  //     if (shareButtons[0]) shareButtons[0].removeEventListener('click', onVkClick)
  //     if (shareButtons[1]) shareButtons[1].removeEventListener('click', onTgClick)
  //     if (shareButtons[2]) shareButtons[2].removeEventListener('click', onWaClick)
  //     if (shareButtons[3]) shareButtons[3].removeEventListener('click', onCpClick)
  //     if (checkboxes[0]) checkboxes[0].removeEventListener('click', onChkBox1Click)
  //     if (checkboxes[1]) checkboxes[1].removeEventListener('click', onChkBox2Click)
  //   }
  // }, [])

  return !isDeadlined ? (
    // before deadline
    <>
      {process.env.NODE_ENV !== 'development' && (
        <SmartCaptcha ref={captchaRef} siteKey={process.env.MODERN__SMART_CAPTCHA__SITE_KEY || ''} />
      )}

      {state.currentStep < 2 ? (
        // not registered
        <>
          <div className={classes.partyRight}>
            <svg className={classes.partyRightBox} viewBox="0 0 349 157" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.5 84.4348C0.5 37.9085 38.217 0.191406 84.7433 0.191406H348.004V71.9896C348.004 118.516 310.287 156.233 263.76 156.233H0.5V84.4348Z"
                fill="#00AFA7"
              />
            </svg>
            <img className={classes.loaderStarBig} src={loaderStarBig} alt="" draggable="false" />
            <img
              className={classNames(classes.giveawayCatRed, isCatsTurned && classes.catTurned)}
              src={giveawayCatRed}
              alt=""
              draggable="false"
            />
          </div>
          <div className={classes.partyLeft}>
            <img
              className={classNames(classes.giveawayCatGray, isCatsTurned && classes.catTurned)}
              src={giveawayCatGray}
              alt=""
              draggable="false"
            />
          </div>

          <div id="giveaway" className={classes.register}>
            <div className={classes.registerBody}>
              <div className={classes.title}>{giveawayTexts.registration.title}</div>
              <div className={classes.text}>{giveawayTexts.registration.text}</div>
            </div>

            <div className={classes.wrap}>
              <Registration
                currentStep={state.currentStep}
                emailFormData={
                  {
                    ...emailFormData,
                    onSubmit: handleRegister,
                    disableCheckbox: true,
                    classes: {
                      className: classes.giveawayEmailForm,
                      stepClassName: classes.giveawayStep,
                      textClassName: classes.giveawayEmailFormText,
                      inputClassName: classes.giveawayEmailFormInput,
                      checkboxClassName: classes.giveawayEmailFormCheckbox,
                      buttonClassName: classes.giveawayEmailFormButton,
                    },
                  } as EmailFormProps
                }
                shareFormData={{
                  ...shareFormData,
                  onShare: handleShare,
                  classes: {
                    className: classes.giveawayShareForm,
                    stepClassName: classes.giveawayStep,
                    titleClassName: classes.giveawayShareFormTitle,
                    textClassName: classes.giveawayShareFormText,
                    linkClassName: classes.giveawayShareFormLink,
                    linksContainerClassName: classes.giveawayShareFormLinkContainer,
                  },
                }}
                // shouldSkipShareForm={shouldSkipShareForm}
                networkError={networkError}
              />
              {/* {SubmitButtonTwin} */}
            </div>
          </div>
        </>
      ) : (
        // registered
        <>
          <div className={classNames(classes.partyRight, classes.partyRightRegistered)}>
            <svg className={classes.partyRightBox} viewBox="0 0 349 157" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.5 84.4348C0.5 37.9085 38.217 0.191406 84.7433 0.191406H348.004V71.9896C348.004 118.516 310.287 156.233 263.76 156.233H0.5V84.4348Z"
                fill="#00AFA7"
              />
            </svg>
            <img className={classes.loaderStarBig} src={loaderStarBig} alt="" draggable="false" />
            <img
              className={classNames(classes.giveawayCatRed, isCatsTurned && classes.catTurned)}
              src={giveawayCatRed}
              alt=""
              draggable="false"
            />
          </div>
          <div className={classes.partyLeft}>
            <img
              className={classNames(classes.giveawayCatGray, isCatsTurned && classes.catTurned)}
              src={giveawayCatGray}
              alt=""
              draggable="false"
            />
          </div>

          <div id="giveaway" className={classes.registered}>
            <div className={classes.registeredBody}>
              <div className={classes.title}>{giveawayTexts.registered.subscribedTitle}</div>
              <div className={classes.text}>{giveawayTexts.registered.subscribedText}</div>
            </div>
          </div>
        </>
      )}
    </>
  ) : (
    // after deadline
    <>
      {!winnersList.length ? (
        // no winners yet
        <>
          <div className={classNames(classes.partyRight, classes.partyRightRegistered)}>
            <svg className={classes.partyRightBox} viewBox="0 0 349 157" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.5 84.4348C0.5 37.9085 38.217 0.191406 84.7433 0.191406H348.004V71.9896C348.004 118.516 310.287 156.233 263.76 156.233H0.5V84.4348Z"
                fill="#00AFA7"
              />
            </svg>
            <img className={classes.loaderStarBig} src={loaderStarBig} alt="" draggable="false" />
            <img
              className={classNames(classes.giveawayCatRed, isCatsTurned && classes.catTurned)}
              src={giveawayCatRed}
              alt=""
              draggable="false"
            />
          </div>
          <div className={classes.partyLeft}>
            <img
              className={classNames(classes.giveawayCatGray, isCatsTurned && classes.catTurned)}
              src={giveawayCatGray}
              alt=""
              draggable="false"
            />
          </div>

          <div id="giveaway" className={classes.over}>
            <div className={classes.registeredBody}>
              <div className={classes.title}>{giveawayTexts.over.giveawayOverTitle}</div>
              <div className={classes.text}>{giveawayTexts.over.giveawayOverText}</div>
            </div>
          </div>
        </>
      ) : (
        // there are winners
        <>
          <div className={classNames(classes.partyRight, classes.partyRightRegistered)}>
            <svg className={classes.partyRightBox} viewBox="0 0 349 157" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.5 84.4348C0.5 37.9085 38.217 0.191406 84.7433 0.191406H348.004V71.9896C348.004 118.516 310.287 156.233 263.76 156.233H0.5V84.4348Z"
                fill="#00AFA7"
              />
            </svg>
            <img className={classes.loaderStarBig} src={loaderStarBig} alt="" draggable="false" />
            <img
              className={classNames(classes.giveawayCatRed, isCatsTurned && classes.catTurned)}
              src={giveawayCatRed}
              alt=""
              draggable="false"
            />
          </div>
          <div className={classes.partyLeft}>
            <img
              className={classNames(classes.giveawayCatGray, isCatsTurned && classes.catTurned)}
              src={giveawayCatGray}
              alt=""
              draggable="false"
            />
          </div>

          <div id="giveaway" className={classes.winners}>
            <div className={classes.registeredBody}>
              <div className={classes.title}>{giveawayTexts.winners.title}</div>
              <div className={classes.winnersCard}>
                <div className={classes.winnersTitle}>
                  Призы{' '}
                  {winnersLink ? (
                    <a href={winnersLink} target="_blank">
                      достались
                    </a>
                  ) : (
                    'достались'
                  )}
                </div>
                <div className={classes.winnersList}>
                  {winnersList.map((winner: string) => (
                    <div key={winner} className={classes.winner}>
                      {winner}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
