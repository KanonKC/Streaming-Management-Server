import { configDotenv } from "dotenv";
import { TwitchChannelInfo, TwitchPrediction } from "../types/Twitch.type";

configDotenv();
const { TWITCH_CLIENT_ID, TWITCH_OAUTH_TOKEN } = process.env;
const headers = new Headers()
headers.append('Content-Type', 'application/json')
headers.append('Client-Id', TWITCH_CLIENT_ID as string)
headers.append('Authorization', `Bearer ${TWITCH_OAUTH_TOKEN}`)


async function twitchAPI(endpoint: string) {
    const response = await fetch(`https://api.twitch.tv/helix/${endpoint}`, {
        method: 'GET', headers
    })
    return await response.json()
}

export async function getChannelInfo(broadcasterId: string): Promise<TwitchChannelInfo> {
    const response = await fetch(`https://api.twitch.tv/helix/channels?broadcaster_id=${broadcasterId}`, {
        method: 'GET', headers
    })
    return await response.json()
}

export async function createPrediction(payload: TwitchPrediction) {
    const response = await fetch('https://api.twitch.tv/helix/predictions', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    })
    return await response.json()
}