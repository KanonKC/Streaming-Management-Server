import { getYoutubeVideoById, searchYoutubeVideos } from "../../services/Youtube.service"

describe('Youtube API', () => {
    describe('searchVideos', () => {
        it('Search ภาษาไทย should get correct video ID', async () => {
            const result = await searchYoutubeVideos('แล้วแต่แม่คุณ')
            console.log(result.data)
            expect(result.status).toBe(200)
            expect(result.data.items.length).toBeGreaterThan(0)
            expect(result.data.items[0].id.videoId).toBe('-Plkae_yezo')
        }, 10 * 1000)
    })
    describe('getYoutubeVideoById', () => {
        it('should get video information', async () => {
            const result = await getYoutubeVideoById('-Plkae_yezo')
            console.log(result.data)
            expect(result.status).toBe(200)
            expect(result.data.items[0].id).toBe('-Plkae_yezo')
        })
    })
})