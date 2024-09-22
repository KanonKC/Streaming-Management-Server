import { addKillerRequest } from "../../modules/KillerQueueRequest"

describe('KillerQueueRequest', () => {
    describe('addKillerRequest', () => {
        it('should add a killer request to the queue', async () => {
            const response = await addKillerRequest('123', 'username', 'description')
            
            expect(response.description).toBe('description')
            expect(response.twitchUserId).toBe('123')
            expect(response.twitchUsername).toBe('username')
            expect(response.isActive).toBe(true)
            expect(response).toHaveProperty('totalQueue')
            expect(response.totalQueue).toBeGreaterThan(0)

        })
    })
})