import aviasalesLogo from '~/assets/images/aviasalesLogo.svg'
import clientLogo from '~/assets/images/clientLogo.svg'
import dotsPattern from '~/assets/images/dotsPattern.png'
import glass from '~/assets/images/glass.svg?url'
import homeBall from '~/assets/images/homeBall.png'
import homeCats from '~/assets/images/homeCats.png'
import homeCircles from '~/assets/images/homeCircles.svg?url'
import homeMan from '~/assets/images/homeMan.png'
import homeMob from '~/assets/images/homeMob.png'
import homeStars from '~/assets/images/homeStars.png'
import partyBack from '~/assets/images/partyBack.svg?url'
import partyCircles from '~/assets/images/partyCircles.svg?url'

import { cards } from './cards'

export const preloads = {
  preApp: [aviasalesLogo, clientLogo, dotsPattern],
  preAppDesk: [],
  preAppMob: [],

  preHome: [glass],
  preHomeDesk: [homeCats, homeCircles, partyBack, partyCircles, homeBall, homeMan, homeStars],
  preHomeMob: [homeMob],

  preGame: [...Object.values(cards).map(({ img }) => img)],
  preGameDesk: [],
  preGameMob: [],

  inGame: [],
  inGameDesk: [],
  inGameMob: [],

  preResults: [],
  preResultsDesk: [],
  preResultsMob: [],
}
