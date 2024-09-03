import { configDotenv } from "dotenv"
import { DownloadVideo } from "../types/StreamEditor.type";
import axios from "axios";

configDotenv();

const { STREAM_EDITOR_BASE_URL } = process.env;
const streamEditorAPI = axios.create({
    baseURL: STREAM_EDITOR_BASE_URL,
})

export async function downloadVideo(url: string) {
    return streamEditorAPI.post<DownloadVideo>('/download', { url })
}