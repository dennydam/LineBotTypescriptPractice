import dotenv from 'dotenv'
// import linebot from 'linebot'
import { textEventHandler } from '../eventHandler/textEvent'
import { distance } from '../經緯度間距離'
// import { flexEventHandler } from '../eventHandler/flex'

import express, { Application, Request, Response } from 'express'
import { ClientConfig, Client, middleware, MiddlewareConfig, WebhookEvent, TextMessage } from '@line/bot-sdk'
// import { WebhookEvent, TextMessage, MessageAPIResponseBase } from '@line/bot-sdk'

dotenv.config()
// console.log(flexEventHandler)

const clientConfig: ClientConfig = {
  // channelId: process.env.CHANNEL_ID || '',
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET,
}

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET || '',
  // channelId: process.env.CHANNEL_ID || '',
}

export const client = new Client(clientConfig)

const app: Application = express()

export interface Location {
  latitude: number
  longitude: number
}

app.post('/', middleware(middlewareConfig), async (req: Request, res: Response): Promise<Response> => {
  const events: WebhookEvent[] = req.body.events
  // console.log(req)

  // Process all of the received events asynchronously.
  const results = await Promise.all(
    events.map(async (event: any) => {
      console.log('succceeesssssssss')

      try {
        console.log('event', event.message)
        // if (event.message.type !== 'text') {
        // }

        // event.message.type !== 'text'
        // console.log('event', event.text)
        // await distance(33, 2, 'K')

        if (event.message.text.startsWith('找車位')) {
          await textEventHandler(event)
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error(err)
        }

        // Return an error message.
        return res.status(500).json({
          status: 'error',
        })
      }
    })
  )

  // Return a successfull message.
  return res.status(200).json({
    status: 'success',
    results,
  })
})
app.listen(8080, () => {
  console.log('app succe7')
})

// const bot: any = new Client(config)
// bot.on('message', async (event: any) => {
//   if (event.message.type === 'text') {
//     const message = event.message.text

//     if (message === 'ping') {
//       await event.reply('pong')
//     } else {
//       await event.reply(`你說了：${message}`)
//     }
//   }
// })

// bot.listen('/', process.env.PORT || 3000, () => {
//   console.log('Line Bot 已啟動')
// })
// export const client = new Client(clientConfig)
