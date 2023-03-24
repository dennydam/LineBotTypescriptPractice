"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flexEventHandler = void 0;
const app_1 = require("../src/app");
const flexEventHandler = async (event) => {
    // Process all variables here.
    if (event.type !== 'message' || event.message.type !== 'text') {
        return;
    }
    console.log('flexEventHandler🏐');
    // Process all message related variables here.
    const { replyToken } = event;
    const { text } = event.message;
    // Create a new message.
    const response = {
        type: 'text',
        text,
    };
    // Reply to the user.
    await app_1.client.replyMessage(replyToken, response);
};
exports.flexEventHandler = flexEventHandler;
