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
    });

    ws.on('message', async (data) => {
        const message: TwitchWebsocketSession = JSON.parse(data.toString());

        if (message.metadata.message_type === 'session_welcome') {
    
            const eventSubscriptionsResponse = await getEventSubSubscriptions()

            const disconnectedSubscriptionsPromise = eventSubscriptionsResponse.data.data
                .filter((sub) => sub.status === 'websocket_disconnected')
                .map((sub) => deleteEventSubSubscription(sub.id))
            
            await Promise.all(disconnectedSubscriptionsPromise)

            await createChannelChatMessageEvent(message.payload.session.id)

        }
        
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
}

main().catch(console.error);