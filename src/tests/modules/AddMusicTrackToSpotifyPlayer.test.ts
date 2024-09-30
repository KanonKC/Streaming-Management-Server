import { addMusicTrackToSpotifyPlayer } from "../../modules/AddMusicTrackToSpotifyPlayer"

describe('AddMusicTrackToSpotifyPlayer', () => {
    it('Search by normal keyword', async () => {
        const result = await addMusicTrackToSpotifyPlayer('Sheesh')
        expect(result.code).toBe('SUCCESS')
    })
    it('Search by Spotify URL', async () => {
        const result = await addMusicTrackToSpotifyPlayer('https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Rh')
        expect(result.code).toBe('SUCCESS')
    })
    it('Search by Spotify URL, should not found', async () => {
        const result = await addMusicTrackToSpotifyPlayer('https://open.spotify.com/track/4iV5W9uYEdYUVa79Axb7Ra')
        expect(result.code).toBe('TRACK_NOT_FOUND')
    }),
    it('Search by normal keyword, should found', async () => {
        const result = await addMusicTrackToSpotifyPlayer('asdwasdwasdwasd')
        expect(result.code).toBe('SUCCESS')
    })
})