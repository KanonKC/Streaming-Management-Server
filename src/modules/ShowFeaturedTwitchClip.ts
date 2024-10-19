import { PUBLIC_URL, SHOUTOUT_CLIP_FULL_PATH } from "../constants/LocalFilePath.constant";
import { getTwitchClips } from "../services/Twitch.service";
import { TwitchClip } from "../types/Twitch.type";
import { downloadTwitchClip } from "../utils/DownloadTwitchClip.util";

export interface ShowFeatureTwitchClipOptions {
    outputVideoFilePath?: string
}

export async function showFeaturedTwitchClip(broadcasterId: string, options?: ShowFeatureTwitchClipOptions) {
    
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
    const downloadVideoResponse = await downloadTwitchClip(randomClipUrl, options);
    const downloadedVideo = downloadVideoResponse;
    
    return {
        videoUrl: `${PUBLIC_URL}/shoutout-clips/${downloadedVideo.filename}`,
        filename: `${SHOUTOUT_CLIP_FULL_PATH}/${downloadedVideo.filename}`,
        videoFilename: downloadedVideo.filename,
        outputVideoFilePath: downloadedVideo.outputVideoFilePath,
        durationMilliseconds: Math.ceil(downloadedVideo.duration * 1000) - 1500
    };
    
}