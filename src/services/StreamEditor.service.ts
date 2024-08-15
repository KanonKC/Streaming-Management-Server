import { configDotenv } from "dotenv"
import { DownloadVideo } from "../types/StreamEditor.type";

configDotenv();

const { STREAM_EDITOR_BASE_URL } = process.env;

export async function downloadVideo(url: string) {
    const response = await fetch(`${STREAM_EDITOR_BASE_URL}/download`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    })
    return await response.json() as Promise<DownloadVideo>
}