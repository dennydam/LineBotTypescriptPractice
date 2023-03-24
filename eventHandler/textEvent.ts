import { WebhookEvent, TextMessage, MessageAPIResponseBase } from '@line/bot-sdk'

import { client } from '../src/app'
import template from '../template/flex'

import axios from 'axios'

export const textEventHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.
  if (event.type !== 'message' || event.message.type !== 'text') {
    return
  }
  // console.log('nameEventHandler')
  // console.log(event)

  // Process all message related variables here.
  const { replyToken } = event
  const { text } = event.message
  // console.log('textTest', text)
  const flexregion = event.message.text.replace('找車位', '')

  console.log('flen', flexregion)
  try {
    interface MyObject {
      type: string
      title: string
      address: string
      latitude: string
      longitude: object
    }
    let results: MyObject[] = []
    let results777: any = []
    const { data } = await axios.get('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json')
    // const data = await axios.get('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json')
    console.log('data', data)

    // console.log('車位Date', cc)

    for (const info of data.data.park) {
      if (info.area === flexregion) {
        console.log('找到area', info.area)
        const obj1: MyObject = {
          type: 'location',
          title: info.name,
          address: info.address,
          latitude: info.EntranceCoord.EntrancecoordInfo[0].Xcod,
          longitude: info.EntranceCoord.EntrancecoordInfo[0].Xcod,
        }
        // results.push({
        //   type: 'location',
        //   title: info.name,
        //   address: info.address,
        //   latitude: info.EntranceCoord.EntrancecoordInfo[0].Xcod,
        //   longitude: info.EntranceCoord.EntrancecoordInfo[0].Ycod,
        // })
        results.push(obj1)
        console.log('resultes', results)

        if (results.length >= 6) {
          console.log('大於零ㄟ')
          const flex = JSON.parse(JSON.stringify(template))
          console.log('flex', flex)

          flex.altText = '哈囉'
          for (let i = 0; i < 6; i++) {
            console.log('resuts[i].title', results[i].title)
            flex.contents.contents[i].body.contents[0].text = results[i].title
            flex.contents.contents[i].body.action.text = '!name' + results[i].title

            flex.contents.contents[i].body.contents[2].contents[0].contents[0].text = results[i].address
          }
          results777.push(flex)

          break
        }

        if (results.length > 0) {
          // const response: TextMessage = {
          //   type: 'text',
          //   results777
          // }
          // await client.replyMessage(replyToken, results777)
        }
      }
    }

    const test: any = 77
    console.log('results777', results777)

    await client.replyMessage(replyToken, results777)
  } catch (error) {
    console.log(error)
  }

  // Create a new message.
  // const response: TextMessage = {
  //   type: 'text',
  //   text,
  // }

  // Reply to the user.
  // await client.replyMessage(replyToken, response)
}
