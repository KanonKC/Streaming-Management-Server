import { skipToNextItemInPlaybackQueue } from "../../services/Spotify.service";
import { showCurrentMusicQueue } from "./ShowCurrentMusicQueue";

export async function skipToNextMusic() {
    await skipToNextItemInPlaybackQueue();
    await new Promise(resolve => setTimeout(resolve, 1000))
    return showCurrentMusicQueue()
}