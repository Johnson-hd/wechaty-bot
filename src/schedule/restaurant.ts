import { Wechaty } from 'wechaty'
import { CronJob } from 'cron'

interface Restaurant {
  name: string
  weight: number
}

const maxLen = 10

const restaurants: Restaurant[] = [
  {
    name: '剪花娘子',
    weight: 7,
  },
  {
    name: '胡椒厨房',
    weight: 7,
  },
  {
    name: '东北风',
    weight: 7,
  },
  {
    name: '外婆家',
    weight: 7,
  },
  {
    name: '小菜园',
    weight: 8,
  },
  {
    name: '棒约翰',
    weight: 5,
  },
  {
    name: '筋牛座',
    weight: 6,
  },
  {
    name: '小满手工粉',
    weight: 1,
  },
  {
    name: '家有好面',
    weight: 2,
  },
  {
    name: '秦三碗',
    weight: 2,
  },
  {
    name: '和府捞面',
    weight: 3,
  },
]

/**
 * 选择今日星选餐厅
 */
const selectRestaurant: () => Restaurant[] = () => {
  const pools: Restaurant[] = []

  restaurants.forEach((item: Restaurant) => {
    for (let i = 0; i < item.weight; i++) {
      pools.push(item)
    }
  })
  pools.sort(() => 0.5 - Math.random())

  const selected1 = Math.round(Math.random() * pools.length)
  const selected2 = Math.round(Math.random() * pools.length)

  return [pools[selected1], pools[selected2]]
}

/**
 * 组装信息
 */
const combineMessage: () => string = () => {
  const selected = selectRestaurant()
  let message = `\r\n\r\n${'餐厅列表'.padEnd(maxLen, '\u3000')}评分\r\n`

  restaurants.forEach((item: Restaurant) => {
    message += `${item.name.padEnd(maxLen, '\u3000')}   ${item.weight}\r\n`
  })

  message += `\r\n✧今日星选餐厅✧\r\n`
  selected.forEach((item: Restaurant) => {
    message += `${item.name}\r\n`
  })

  return message
}

export default async (bot: Wechaty) => {
  return new CronJob(
    '58 11 * * *',
    async () => {
      const room = await bot.Room.find({ topic: '骚年们' })
      if (room) {
        const members = await room.memberAll()
        const message = combineMessage()
        await room.say(message, ...members)
      }
    },
    null,
    true,
    'Asia/Shanghai',
  )
}
