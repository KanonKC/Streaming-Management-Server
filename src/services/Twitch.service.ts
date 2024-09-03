import { configDotenv } from "dotenv";
import { TwitchChannelInfo, TwitchClip, TwitchListAPIResponse, TwitchPrediction } from "../types/Twitch.type";
import axios from "axios";
import { ListAPIResponse } from "../types/Controller.type";

configDotenv();
const { TWITCH_CLIENT_ID, TWITCH_OAUTH_TOKEN } = process.env;

const twitchAPI = axios.create({
    baseURL: 'https://api.twitch.tv/helix',
    headers: {
        'Client-Id': TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${TWITCH_OAUTH_TOKEN}`
    }
})

export async function getChannelInfo(broadcasterId: string) {
    return twitchAPI.get<TwitchChannelInfo>('/channels', {
        params: { broadcaster_id: broadcasterId }
    })
}

export async function createPrediction(payload: TwitchPrediction) {
    return twitchAPI.post<TwitchPrediction>('/predictions', payload)
}

export async function getTwitchClips(broadcasterId: string, isFeature: boolean) {
    return twitchAPI.get<ListAPIResponse<TwitchClip>>('/clips', {
        params: { broadcaster_id: broadcasterId, is_featured: isFeature }
    })
}