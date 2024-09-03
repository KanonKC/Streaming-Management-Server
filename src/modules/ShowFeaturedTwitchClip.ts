import { configDotenv } from "dotenv";
import { downloadVideo } from "../services/StreamEditor.service";
import { getTwitchClips } from "../services/Twitch.service";
import { TwitchClip } from "../types/Twitch.type";

configDotenv();
const { STREAM_EDITOR_VIDEO_FULL_PATH } = process.env;

export async function showFeaturedTwitchClip(broadcasterId: string) {
    
    let twitchClips: TwitchClip[] = [];

    const featureTwitchClipResponse = await getTwitchClips(broadcasterId, true);

    if (featureTwitchClipResponse.data.data.length > 0) {
        twitchClips = featureTwitchClipResponse.data.data;
    }
    else {
        const twitchClipsResponse = await getTwitchClips(broadcasterId, false);

        if (twitchClipsResponse.data.data.length === 0) {
            return { filename: '' };
        }
        
        twitchClips = twitchClipsResponse.data.data;
    }

    const randomClipUrl = twitchClips[Math.floor(Math.random() * twitchClips.length)].url;
    const downloadVideoResponse = await downloadVideo(randomClipUrl);
    return { filename: `${STREAM_EDITOR_VIDEO_FULL_PATH}/${downloadVideoResponse.data.video.filename}` }
}