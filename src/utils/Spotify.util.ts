import { SpotifyTrack } from "../types/Spotify.type";

export function simplifyTrackText(track: SpotifyTrack) {
    return `"${track.name}" - ${track.artists.map((artist) => artist.name).join(', ')}`
}