import { WebhookEvent, TextMessage, MessageAPIResponseBase } from '@line/bot-sdk'

import { client } from '../src/app'

export const flexEventHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.
  if (event.type !== 'message' || event.message.type !== 'text') {
    return
  }
  console.log('flexEventHandler🏐')

  // Process all message related variables here.
  const { replyToken } = event
  const { text } = event.message

  // Create a new message.
  const response: TextMessage = {
    type: 'text',
    text,
  }

  // Reply to the user.
  await client.replyMessage(replyToken, response)
}
