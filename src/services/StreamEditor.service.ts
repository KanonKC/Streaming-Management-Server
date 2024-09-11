import axios from "axios";
import { configDotenv } from "dotenv";
import { DownloadAndUploadVideoResponse } from "../types/StreamEditor.type";

configDotenv();

const { STREAM_EDITOR_BASE_URL } = process.env;
const streamEditorAPI = axios.create({
    baseURL: STREAM_EDITOR_BASE_URL,
})

export async function downloadVideo(url: string) {
    return streamEditorAPI.post<DownloadAndUploadVideoResponse>('/download', { sources: [{ url }] })
}