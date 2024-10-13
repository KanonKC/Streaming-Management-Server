// import { io } from "socket.io-client";

// const twitchSocket = io('wss://eventsub.wss.twitch.tv/ws');

// export default twitchSocket;
import WebSocket from 'ws';
import { createChannelChatMessageEvent } from './events/ChannelChatMessage/CreateChannelChatMessageEvent';
import { deleteEventSubSubscription, getEventSubSubscriptions } from './services/Twitch.service';
import { TwitchWebsocketSession } from './types/Twitch.type';

// Create WebSocket connection.
// const socket = new WebSocket("wss://eventsub.wss.twitch.tv/ws");

async function main() {
    const ws = new WebSocket("wss://eventsub.wss.twitch.tv/ws");

    ws.on('open', async () => {
        console.log('Connected to Twitch EventSub WebSocket');

        
        // Subscribe to an event
        
    });

    ws.on('message', async (data) => {
        const message: TwitchWebsocketSession = JSON.parse(data.toString());
        // console.log('Received message:', message);

        if (message.metadata.message_type === 'session_welcome') {
            // const response = await createChannelChatMessageEvent(message.payload.session.id)

            // console.log(response.data)

            const eventSubscriptionsResponse = await getEventSubSubscriptions()

            const disconnectedSubscriptionsPromise = eventSubscriptionsResponse.data.data
                .filter((sub) => sub.status === 'websocket_disconnected')
                .map((sub) => deleteEventSubSubscription(sub.id))
            
            await Promise.all(disconnectedSubscriptionsPromise)

            const channelChatMessageEvent = await createChannelChatMessageEvent(message.payload.session.id)
            console.log(channelChatMessageEvent.data)
        }

        // const subscribeMessage = {
        //     type: 'LISTEN',
        //     nonce: 'unique-nonce',
        //     data: {
        //         type: "channel.chat.message",
        //         version: "1",
        //         condition: {
        //             broadcaster_user_id: "135783794",
        //             user_id: "135783794"
        //         },
        //         transport: {
        //             method: "websocket",
        //             session_id: "AQoQexAWVYKSTIu4ec_2VAxyuhAB"
        //         }
        //     }
        // };

        // ws.send(JSON.stringify(subscribeMessage));
        
        // if (message.meta === '')
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
}

main().catch(console.error);