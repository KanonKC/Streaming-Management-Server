import { SHOUTOUT_CLIP_FULL_PATH } from "../constants/LocalFilePath.constant";
import { getTwitchClips } from "../services/Twitch.service";
import { TwitchClip } from "../types/Twitch.type";
import { downloadTwitchClip } from "../utils/DownloadTwitchClip.util";

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
    const downloadVideoResponse = await downloadTwitchClip(randomClipUrl);
    const downloadedVideo = downloadVideoResponse;
    console.log(downloadedVideo);
    return {
        filename: `${SHOUTOUT_CLIP_FULL_PATH}/${downloadedVideo.filename}`,
        durationMilliseconds: Math.ceil(downloadedVideo.duration * 1000) - 1500
    };
    
}