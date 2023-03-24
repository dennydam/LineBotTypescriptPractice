"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.textEventHandler = void 0;
const axios_1 = __importDefault(require("axios"));
const textEventHandler = async (event) => {
    // Process all variables here.
    if (event.type !== 'message' || event.message.type !== 'text') {
        return;
    }
    // console.log('nameEventHandler')
    // console.log(event)
    // Process all message related variables here.
    const { replyToken } = event;
    const { text } = event.message;
    // console.log('textTest', text)
    const flexregion = event.message.text.replace('找車位', '');
    try {
        console.log('777777777777');
        const results = [];
        const results777 = [];
        const { data } = await axios_1.default.get('https://tcgbusfs.blob.core.windows.net/blobtcmsv/TCMSV_alldesc.json');
        console.log(data);
        for (const info of data.data.park) {
            if (info.area === flexregion) {
                results.push({
                    type: 'location',
                    title: info.name,
                    address: info.address,
                    latitude: info.EntranceCoord.EntrancecoordInfo[0].Xcod,
                    longitude: info.EntranceCoord.EntrancecoordInfo[0].Ycod,
                });
                // if (results.length >= 6) {
                //   const flex = JSON.parse(JSON.stringify(template))
                //   flex.altText = '哈囉'
                //   for (let i = 0; i < 6; i++) {
                //     flex.contents.contents[i].body.contents[0].text = results[i].title
                //     flex.contents.contents[i].body.action.text = '!name' + results[i].title
                //     flex.contents.contents[i].body.contents[2].contents[0].contents[0].text = results[i].address
                //   }
                //   results777.push(flex)
                //   break
                // }
            }
        }
    }
    catch (_a) {
        console.log('error');
    }
    // Create a new message.
    // const response: TextMessage = {
    //   type: 'text',
    //   text,
    // }
    // Reply to the user.
    // await client.replyMessage(replyToken, response)
};
exports.textEventHandler = textEventHandler;
