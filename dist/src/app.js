"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
// import linebot from 'linebot'
const textEvent_1 = require("../eventHandler/textEvent");
// import { flexEventHandler } from '../eventHandler/flex'
const express_1 = __importDefault(require("express"));
const bot_sdk_1 = require("@line/bot-sdk");
// import { WebhookEvent, TextMessage, MessageAPIResponseBase } from '@line/bot-sdk'
dotenv_1.default.config();
// console.log(flexEventHandler)
const clientConfig = {
    // channelId: process.env.CHANNEL_ID || '',
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
    channelSecret: process.env.CHANNEL_SECRET,
};
const middlewareConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
    channelSecret: process.env.CHANNEL_SECRET || '',
    // channelId: process.env.CHANNEL_ID || '',
};
exports.client = new bot_sdk_1.Client(clientConfig);
const app = (0, express_1.default)();
app.post('/', (0, bot_sdk_1.middleware)(middlewareConfig), async (req, res) => {
    const events = req.body.events;
    // console.log(req)
    // Process all of the received events asynchronously.
    const results = await Promise.all(events.map(async (event) => {
        console.log('changeeeeeee');
        try {
            console.log('event', event.message);
            // if (event.message.type !== 'text') {
            // }
            // event.message.type !== 'text'
            // console.log('event', event.text)
            if (event.message.text.startsWith('找車位')) {
                await (0, textEvent_1.textEventHandler)(event);
            }
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(err);
            }
            // Return an error message.
            return res.status(500).json({
                status: 'error',
            });
        }
    }));
    // Return a successfull message.
    return res.status(200).json({
        status: 'success',
        results,
    });
});
app.listen(8080, () => {
    console.log('app succe7');
});
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
