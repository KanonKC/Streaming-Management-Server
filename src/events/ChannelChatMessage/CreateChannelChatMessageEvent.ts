import { createEventSubSubscription } from "../../services/Twitch.service";
import { CreateTwitchEventSubscriptionPayload } from "../../types/Twitch.type";

export async function createChannelChatMessageEvent() {
    const payload: CreateTwitchEventSubscriptionPayload = {
        type: "channel.chat.message",
        version: "1",
        condition: {
            broadcaster_user_id: "135783794",
            user_id: "135783794"
        },
        transport: {
            method: "websocket",
            session_id: "AQoQexAWVYKSTIu4ec_2VAxyuhAB"
        }
    }
    const response = await createEventSubSubscription(payload)
    console.log(response)
}