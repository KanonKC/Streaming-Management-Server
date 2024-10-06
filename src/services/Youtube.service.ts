import axios, { AxiosResponse } from "axios";
import { configDotenv } from "dotenv";
import { YoutubeSearch } from "../types/Youtube.type";

configDotenv()
const { YOUTUBE_API_KEY } = process.env

const youtubeAPI = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
})

export async function searchYoutubeVideos(query: string): Promise<AxiosResponse<YoutubeSearch>> {
    return youtubeAPI.get('/search', {
        params: {
            q: query,
            type: 'video',
            part: 'snippet',
            key: YOUTUBE_API_KEY
        }
    })
}