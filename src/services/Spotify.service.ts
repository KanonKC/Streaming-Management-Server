import axios, { AxiosResponse } from "axios";
import { configDotenv } from "dotenv";
import { generateRandomString } from "../utils/RandomString.util";
import { post } from "request";
import { AddItemToPlaybackQueuePayload, SpotifyAuthorization, SpotifySearchResult, SpotifyTrack } from "../types/Spotify.type";
import { spotifyStore } from "../stores/Spotify.store";

configDotenv();
const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, PORT } = process.env;

const spotifyAPI = axios.create({
    baseURL: 'https://api.spotify.com/v1',
})

export function getSpotifyOAuthUrl() {
    const randomString = generateRandomString(16);
    return `https://accounts.spotify.com/authorize?response_type=code&client_id=${SPOTIFY_CLIENT_ID}&scope=user-modify-playback-state&redirect_uri=http://localhost:${PORT}/spotify/callback&state=${randomString}`
}

export async function getUserLoginAccessToken(code: string): Promise<AxiosResponse<SpotifyAuthorization>> {
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: `http://localhost:${PORT}/spotify/callback`,
          grant_type: 'authorization_code'
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: 'Basic ' +
            (Buffer.from(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString('base64'))
        },
        json: true
    };

    return axios.post(authOptions.url, authOptions.form, {
        headers: authOptions.headers
    })
} 

export async function addItemToPlaybackQueue(payload: AddItemToPlaybackQueuePayload) {
    const { accessToken } = await spotifyStore.loadToken()
    return spotifyAPI.post('/me/player/queue', null, {
        params: payload,
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export async function searchTracks(query: string): Promise<AxiosResponse<SpotifySearchResult>> {
    const { accessToken } = await spotifyStore.loadToken()
    return spotifyAPI.get('/search', {
        params: {
            q: query,
            type: 'track',
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export async function getTrack(trackId: string): Promise<AxiosResponse<SpotifyTrack>> {
    const { accessToken } = await spotifyStore.loadToken()
    return spotifyAPI.get(`/tracks/${trackId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}