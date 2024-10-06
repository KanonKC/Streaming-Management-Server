import { addItemToPlaybackQueue, getTrack, getUserQueue, searchTracks } from "../../services/Spotify.service"

// 404 - Make sure you already active Spotify player (Just play some music in Spotify now!)

describe('Spotify API', () => {
    describe('addItemToPlaybackQueue', () => {
        it('should add item to playback queue', async () => {
            const result = await addItemToPlaybackQueue({
                uri: 'spotify:track:4iV5W9uYEdYUVa79Axb7Rh'
            })
            
            expect(result.status).toBe(200)
        })
    })

    describe('searchTracks', () => {
        it('Search ภาษาไทย should get correct URI', async () => {
            const result = await searchTracks('แล้วแต่แม่คุณ')
            expect(result.status).toBe(200)
            expect(result.data.tracks.items.length).toBeGreaterThan(0)
            expect(result.data.tracks.items[0].uri).toBe('spotify:track:65ujIgxQTAxaIilzqW6hU3')
        }),
        it('Search English should get correct URI', async () => {
            const result = await searchTracks('SHEESH')
            expect(result.status).toBe(200)
            expect(result.data.tracks.items.length).toBeGreaterThan(0)
            expect(result.data.tracks.items[0].uri).toBe('spotify:track:1njlnn8ZKHI77Pe9szIONR')
        })
    })

    describe('getTrack', () => {
        it('should get track information', async () => {
            const result = await getTrack('65ujIgxQTAxaIilzqW6hU3?si=223c75c955834750')
            expect(result.status).toBe(200)
            expect(result.data.uri).toBe('spotify:track:65ujIgxQTAxaIilzqW6hU3')
        })
        it('should get track information', async () => {
            const result = await getTrack('1njlnn8ZKHI77Pe9szIONR?si=23d41a21fbc24892')
            expect(result.status).toBe(200)
            expect(result.data.uri).toBe('spotify:track:1njlnn8ZKHI77Pe9szIONR')
        })
    })

    describe('getUserQueue', () => {
        it('should get user queue', async () => {
            const result = await getUserQueue()
            console.log('User Queue', result.data)
            console.log('Artist', result.data.queue.map((track) => track.artists.map((artist) => artist.name)))
            expect(result.status).toBe(200)
        })
    })
})