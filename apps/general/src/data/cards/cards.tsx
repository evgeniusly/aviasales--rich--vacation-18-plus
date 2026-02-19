import card_00 from '~/assets/images/cards/card-00.png'
import card_01 from '~/assets/images/cards/card-01.png'
import card_02 from '~/assets/images/cards/card-02.png'
import card_03 from '~/assets/images/cards/card-03.png'
import card_04 from '~/assets/images/cards/card-04.png'
import card_05 from '~/assets/images/cards/card-05.png'
import card_06 from '~/assets/images/cards/card-06.png'
import card_07 from '~/assets/images/cards/card-07.png'
import card_08 from '~/assets/images/cards/card-08.png'
import card_09 from '~/assets/images/cards/card-09.png'
import card_10 from '~/assets/images/cards/card-10.png'
import card_11 from '~/assets/images/cards/card-11.png'
import card_12 from '~/assets/images/cards/card-12.png'
import card_13 from '~/assets/images/cards/card-13.png'

import { CardId } from './enums'
import { CardData } from './types'

export const cards: { [key in CardId]: CardData } = {
  [CardId.Party]: {
    img: card_00,
    title: <>Тусить в&nbsp;клубе всю ночь</>,
    statText: <>пользователей танцуют вместе с&nbsp;вами</>,
  },
  [CardId.Sleep]: {
    img: card_01,
    title: <>Спать весь день</>,
    statText: <>пользователей этот вариант тоже снится</>,
  },
  [CardId.Fishing]: {
    img: card_02,
    title: <>Рыбачить в&nbsp;5&nbsp;утра</>,
    statText: <>пользователей тоже клюнули на&nbsp;этот вариант</>,
  },
  [CardId.Checkup]: {
    img: card_03,
    title: <>Проходить чекап в&nbsp;санатории</>,
    statText: <>пользователей лежат в&nbsp;соседней грязевой ванне</>,
  },
  [CardId.Climbing]: {
    img: card_04,
    title: <>Лазить по&nbsp;горам</>,
    statText: <>пользователей зацепились карабином за&nbsp;этот вариант</>,
  },
  [CardId.Sea]: {
    img: card_05,
    title: <>Проводить время на&nbsp;море с&nbsp;семьёй</>,
    statText: <>пользователей разделяют любовь к&nbsp;семейному отпуску</>,
  },
  [CardId.Toys]: {
    img: card_06,
    title: <>Тратить деньги на&nbsp;игрушки</>,
    statText: <>пользователей тоже собирают коллекцию</>,
  },
  [CardId.Gaming]: {
    img: card_07,
    title: <>Играть в&nbsp;компьютер всю ночь</>,
    statText: (
      <>
        пользователей
        <br />
        готовы играть с&nbsp;вами
      </>
    ),
  },
  [CardId.Driving]: {
    img: card_08,
    title: <>Ехать на&nbsp;машине долго и&nbsp;молча</>,
    statText: <>пользователей молча кивают из&nbsp;соседнего авто</>,
  },
  [CardId.Marathon]: {
    img: card_09,
    title: <>Бежать марафон</>,
    statText: <>пользователей финишировали с&nbsp;таким&nbsp;же результатом</>,
  },
  [CardId.Eating]: {
    img: card_10,
    title: <>Есть торты и&nbsp;чипсы без повода</>,
    statText: <>пользователей стоят в&nbsp;очереди вместе с&nbsp;вами</>,
  },
  [CardId.Restaurants]: {
    img: card_11,
    title: <>Ходить по&nbsp;ресторанам с&nbsp;друзьями</>,
    statText: <>пользователей сидят за&nbsp;соседним столиком</>,
  },
  [CardId.Horrors]: {
    img: card_12,
    title: <>Смотреть хорроры с&nbsp;открытыми глазами</>,
    statText: <>пользователей не&nbsp;побоялись выбрать этот вариант</>,
  },
  [CardId.Cleanup]: {
    img: card_13,
    title: <>Драить квартиру до&nbsp;блеска</>,
    statText: <>пользователей со&nbsp;скрипом выбрали этот вариант</>,
  },
}
