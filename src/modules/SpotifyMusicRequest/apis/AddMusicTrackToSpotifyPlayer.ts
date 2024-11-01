import { AxiosError } from "axios";
import { addItemToPlaybackQueue, getTrack, searchTracks } from "../../../services/Spotify.service";
import { SpotifyTrack } from "../../../types/Spotify.type"
import { getYoutubeVideoById, searchYoutubeVideos } from "../../../services/Youtube.service";

export async function addMusicTrackToSpotifyPlayer(query: string) {

    let track: SpotifyTrack | undefined;

    try {
        if (query.startsWith("https://open.spotify.com/track")) {
            const url = new URL(query)
            const trackId = url.pathname.split("/").pop()
            const response = await getTrack(trackId!)
            track = response.data
        } 
        else if (query.startsWith("https://youtu.be/") || query.startsWith("https://www.youtube.com/")) {
            const url = new URL(query)

            let videoId: string | undefined | null
            if (query.startsWith("https://www.youtube.com/")) {
                videoId = url.searchParams.get('v')
            }
            else {
                videoId = url.pathname.split("/").pop()
            }

            if (!videoId) {
                return { code: 'TRACK_NOT_FOUND' }
            }

            const youtubeVideoResponse = await getYoutubeVideoById(videoId!)
            const youtubeVideoName = youtubeVideoResponse.data.items[0].snippet.title
            const spotifyTrackResponse = await searchTracks(youtubeVideoName)
            track = spotifyTrackResponse.data.tracks.items[0]
        }
        else {
            const response = await searchTracks(query)
            track = response.data.tracks.items[0]
        }
    }
    catch (error: unknown) {
        switch((error as AxiosError).response?.status) {
            case 401:
                console.log('Spotify access token expired')
                return { code: 'TOKEN_EXPIRED' }
            case 403:
                return { code: 'FORBIDDEN' }
        }
    }

    if (!track) {
        return { code: 'TRACK_NOT_FOUND' }
    }
    
    try {
        await addItemToPlaybackQueue({ uri: track.uri })
    }
    catch(error) {
        switch((error as AxiosError).response?.status) {
            case 401:
                console.log('Spotify access token expired')
                return { code: 'TOKEN_EXPIRED' }
            case 403:
                return { code: 'FORBIDDEN' }
            case 404:
                return { code: 'PLAYER_NOT_FOUND' }
        }
    }
    
    const artistNames = track.artists.map((artist) => artist.name).join(', ')

    return { code: 'SUCCESS', ...track, artistNames }
}