import { revealTarotCard } from "../../modules/RevealTarotCard"

describe('RevealTarotCard', () => {
    describe('Basic functionality', () => {
        it('Should return a random Tarot card', () => {
            const response = revealTarotCard()
            expect(response).toHaveProperty('majorCard')
            expect(response).toHaveProperty('minorCard')
        })
        it('Should return a specific Major Tarot card', () => {
            const response = revealTarotCard(0)
            expect(response.majorCard.id).toBe(0)
    
            const response2 = revealTarotCard(5)
            expect(response2.majorCard.id).toBe(5)
    
            const response3 = revealTarotCard(21)
            expect(response3.majorCard.id).toBe(21)
        })
        it('Should return a specific Minor Tarot card', () => {
            const response = revealTarotCard(0, 22)
            expect(response.majorCard.id).toBe(0)
            expect(response.minorCard.id).toBe(22)
    
            const response2 = revealTarotCard(5, 30)
            expect(response2.majorCard.id).toBe(5)
            expect(response2.minorCard.id).toBe(30)
    
            const response3 = revealTarotCard(21, 77)
            expect(response3.majorCard.id).toBe(21)
            expect(response3.minorCard.id).toBe(77)
        })
    })
    describe('Handle error', () => {
        it.skip('Should return a random Tarot card if majorCardId is out of bounds', () => {
            const response = revealTarotCard(-1)
            expect(response.majorCard.id).toBeGreaterThanOrEqual(0)
            expect(response.majorCard.id).toBeLessThan(22)
        })
        it.skip('Should return a random Tarot card if minorCardId is out of bounds', () => {
            const response = revealTarotCard(0, -1)
            expect(response.minorCard.id).toBeGreaterThanOrEqual(22)
            expect(response.minorCard.id).toBeLessThan(78)
        })
    })
    describe('Picure Page & Picture Index', () => {
        it('Case: First major card on each picture page', () => {
            const response = revealTarotCard(0)
            expect(response.majorCard.picturePage).toBe(1)
            expect(response.majorCard.pictureIndex).toBe(0)

            const response2 = revealTarotCard(8)
            expect(response2.majorCard.picturePage).toBe(2)
            expect(response2.majorCard.pictureIndex).toBe(0)

            const response3 = revealTarotCard(16)
            expect(response3.majorCard.picturePage).toBe(3)
            expect(response3.majorCard.pictureIndex).toBe(0)
        })
        it('Case: Last major card on each picture page', () => {
            const response = revealTarotCard(7)
            expect(response.majorCard.picturePage).toBe(1)
            expect(response.majorCard.pictureIndex).toBe(7)

            const response2 = revealTarotCard(15)
            expect(response2.majorCard.picturePage).toBe(2)
            expect(response2.majorCard.pictureIndex).toBe(7)
        })
        it('Case: Major card 19, 20, 21', () => {
            const response = revealTarotCard(19)
            expect(response.majorCard.picturePage).toBe(3)
            expect(response.majorCard.pictureIndex).toBe(4)

            const response2 = revealTarotCard(20)
            expect(response2.majorCard.picturePage).toBe(3)
            expect(response2.majorCard.pictureIndex).toBe(5)

            const response3 = revealTarotCard(21)
            expect(response3.majorCard.picturePage).toBe(3)
            expect(response3.majorCard.pictureIndex).toBe(6)
        })
        it('Case: First minor card on each picture page', () => {
            const response = revealTarotCard(0, 22)
            expect(response.minorCard.picturePage).toBe(4)
            expect(response.minorCard.pictureIndex).toBe(0)

            const response2 = revealTarotCard(0, 30)
            expect(response2.minorCard.picturePage).toBe(5)
            expect(response2.minorCard.pictureIndex).toBe(0)

            const response3 = revealTarotCard(0, 38)
            expect(response3.minorCard.picturePage).toBe(6)
            expect(response3.minorCard.pictureIndex).toBe(0)
        })
    })
})