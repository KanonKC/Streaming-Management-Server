import { PUBLIC_URL } from "../../../constants/LocalFilePath.constant";
import {
	getTwitchClips,
	getTwitchGamesByIds,
} from "../../../services/Twitch.service";
import { TwitchClip } from "../../../types/Twitch.type";
import {
	downloadTwitchClip,
	DownloadTwitchClipOptions,
} from "../utils/DownloadTwitchClip.util";

export interface ShowFeatureTwitchClipOptions
	extends DownloadTwitchClipOptions {}

export async function showFeaturedTwitchClip(
	broadcasterId: string,
	options?: ShowFeatureTwitchClipOptions
) {
	let twitchClips: TwitchClip[] = [];

	const featureTwitchClipResponse = await getTwitchClips(broadcasterId, true);

	if (featureTwitchClipResponse.data.data.length > 0) {
		twitchClips = featureTwitchClipResponse.data.data;
	} else {
		const twitchClipsResponse = await getTwitchClips(broadcasterId, false);

		if (twitchClipsResponse.data.data.length === 0) {
			return { filename: "" };
		}

		twitchClips = twitchClipsResponse.data.data;
	}

	const randomIndex = Math.floor(Math.random() * twitchClips.length);
	const randomClipUrl = twitchClips[randomIndex].url;
	const randomClipGameId = twitchClips[randomIndex].game_id;

    let gameResponse;

    try {
        gameResponse = await getTwitchGamesByIds([randomClipGameId]);
    } catch (error) {
        console.log(error);
    }

    let retryCount = 0;
    let downloadedVideo

    while (retryCount < 10) {
        try {
            downloadedVideo = await downloadTwitchClip(
                randomClipUrl,
                options
            );
            break;
        }
        catch (error) {
            console.log(error, retryCount)
            if (retryCount === 10) {
                return { filename: "" };
            }
            retryCount++;
        }
    }

    if (!downloadedVideo) {
        return { filename: "" };
    }

    let gameData;
    if (gameResponse) {
        gameData = gameResponse.data.data[0];
    }

    return {
        videoUrl: `${PUBLIC_URL}/shoutout-clips/${downloadedVideo.filename}`,
        filename: `dumps/shoutout-clips/${downloadedVideo.filename}`,
        videoFilename: downloadedVideo.filename,
        outputVideoFilePath: downloadedVideo.outputVideoFilePath,
        durationMilliseconds:
            Math.ceil(downloadedVideo.duration * 1000) - 1500,
        gameName: gameData ? gameData.name : "Untagged",
        gameImageUrl: gameData ? gameData.box_art_url
            .replace("{width}", "100")
            .replace("{height}", "100") : "https://nodeflair.com/api/v2/companies/4512.png",
    };
}
