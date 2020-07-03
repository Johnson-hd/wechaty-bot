import { Wechaty } from 'wechaty'

import restaurant from './restaurant'

export default async (bot: Wechaty) => {
  await restaurant(bot)
}
