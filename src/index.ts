import { Wechaty } from 'wechaty'
import { PuppetPadplus } from 'wechaty-puppet-padplus'
import Qrterminal from 'qrcode-terminal'

import config from '../config'
import schedule from './schedule'

process.env.WECHATY_PUPPET_PADPLUS_TOKEN =
  process.env.WECHATY_PUPPET_PADPLUS_TOKEN || config.WECHATY_PUPPET_PADPLUS_TOKEN

const bot = new Wechaty({
  puppet: new PuppetPadplus(),
  name: 'bot',
})

const onScan = (qrcode: string) => {
  Qrterminal.generate(qrcode, { small: true })
}

bot
  .on('scan', onScan)
  .on('login', user => console.log('登录成功：' + user))
  .on('message', message => console.log('收到消息：' + message))
  .on('friendship', friendship => console.log('收到好友请求：' + friendship))
  .on('room-invite', invitation => console.log('收到入群邀请：' + invitation))
  .start()
  .then(() => {
    schedule(bot)
  })
