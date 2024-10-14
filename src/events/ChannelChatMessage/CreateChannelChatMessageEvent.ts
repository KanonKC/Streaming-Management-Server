import { createEventSubSubscription } from "../../services/Twitch.service";
import { CreateTwitchEventSubscriptionPayload } from "../../types/Twitch.type";

export async function createChannelChatMessageEvent(sessionId: string) {
    
    const payload: CreateTwitchEventSubscriptionPayload = {
        type: "channel.chat.message",
        version: "1",
        condition: {
            broadcaster_user_id: "135783794",
            user_id: "135783794"
        },
        transport: {
            method: "websocket",
            session_id: sessionId
        }
    }

    return createEventSubSubscription(payload)
}