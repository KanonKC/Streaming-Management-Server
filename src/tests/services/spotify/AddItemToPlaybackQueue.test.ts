import { addItemToPlaybackQueue } from "../../../services/Spotify.service"

// 404 - Make sure you already active Spotify player (Just play some music in Spotify now!)

describe('AddItemToPlaybackQueue', () => {
    it('should add item to playback queue', async () => {
        const result = await addItemToPlaybackQueue({
            uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh'
        })

        expect(result.status).toBe(200)
    })
})