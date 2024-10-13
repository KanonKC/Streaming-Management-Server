// import { io } from "socket.io-client";

// const twitchSocket = io('wss://eventsub.wss.twitch.tv/ws');

// export default twitchSocket;
import WebSocket from 'ws';

// Create WebSocket connection.
// const socket = new WebSocket("wss://eventsub.wss.twitch.tv/ws");

async function main() {
    const ws = new WebSocket("wss://eventsub.wss.twitch.tv/ws");

    ws.on('open', async () => {
        console.log('Connected to Twitch EventSub WebSocket');

        
        // Subscribe to an event
        // const subscribeMessage = {
        //     type: 'LISTEN',
        //     nonce: 'unique-nonce',
        //     data: {
        //         type: EVENT_TYPE,
        //         version: '1',
        //         condition: {
        //             broadcaster_user_id: 'your_broadcaster_user_id',
        //         },
        //         transport: {
        //             method: 'websocket',
        //             session_id: 'your_session_id',
        //         },
        //     },
        // };

        // ws.send(JSON.stringify(subscribeMessage));
    });

    ws.on('message', (data) => {
        const message = JSON.parse(data.toString());
        console.log('Received message:', message);

        // Handle events here
        if (message.type === 'EVENT') {
            // Process the event data
            console.log('Event data:', message.data);
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