import { addItemToPlaybackQueue, getTrack, searchTracks } from "../services/Spotify.service";
import { SpotifyTrack } from "../types/Spotify.type"

export async function addMusicTrackToSpotifyPlayer(query: string) {

    let track: SpotifyTrack;

    if (query.startsWith("https://open.spotify.com/track")) {
        try {
            const url = new URL(query)
            const trackId = url.pathname.split("/").pop()
            const response = await getTrack(trackId!)
            track = response.data
        }
        catch (error) {
            return { code: 'TRACK_NOT_FOUND' }
        }
    } else {
        try {
            const response = await searchTracks(query)
            track = response.data.tracks.items[0]
        }
        catch (error) {
            return { code: 'TRACK_NOT_FOUND' }
        }
    }

    await addItemToPlaybackQueue({ uri: track.uri })
    return { code: 'SUCCESS', ...track }
}