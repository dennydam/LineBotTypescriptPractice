// declare module 'linebot' {
//   type MessageEvent = {
//     type: string
//     message: {
//       id: string
//       type: string
//       text?: string
//       location?: {
//         title?: string
//         address?: string
//         latitude: number
//         longitude: number
//       }
//     }
//     replyToken: string
//     source: {
//       type: string
//       userId: string
//     }
//   }

//   type TextMessage = {
//     type: 'text'
//     text: string
//   }

//   type LocationMessage = {
//     type: 'location'
//     title?: string
//     address?: string
//     latitude: number
//     longitude: number
//   }

//   type Message = TextMessage | LocationMessage

//   type ReplyFunction = (message: Message | Message[]) => Promise<any>

//   type MiddlewareFunction = (event: MessageEvent, reply: ReplyFunction, next?: () => Promise<void>) => Promise<void>

//   interface ClientConfig {
//     channelId: string
//     channelSecret: string
//     channelAccessToken: string
//     verify?: boolean
//   }

//   type Linebot = {
//     listen(path: string, port: number, callback: () => void): void
//     on(type: 'message', middleware: MiddlewareFunction): void
//   }

//   const linebot: (config: ClientConfig) => Linebot

//   export = linebot
// }
