import { prisma } from "../../database/prisma"
import { showImage } from "../../modules/ShowImage"

describe('ShowImage', () => {
    it('Should return correct data', async () => {
        const image = await showImage("https://cdn.discordapp.com/attachments/816220283224195085/1285602284511694969/20240917_132036.jpg?ex=66ef7b2d&is=66ee29ad&hm=9a6a6b5ec91d8d44db3c0c24c85437eb35ff4815c71a3cb3a975e0121621afed&width=300&height=300", "123456789", "testuser")

        
        const imagePath = image.imagePath

        const showImageData = await prisma.showImage.findUnique({
            where: {
                imageFilename: imagePath?.split('/').pop()
            }
        })
        
        expect(image).toBeTruthy()
        expect(image).toHaveProperty('imagePath')
        expect(imagePath).toContain('dumps/show-images')
        expect(imagePath).toContain('123456789')

        expect(showImageData).toBeTruthy()
        expect(showImageData?.twitchId).toBe('123456789')
        expect(showImageData?.username).toBe('testuser')
        expect(showImageData?.imageUrl).toBe("https://cdn.discordapp.com/attachments/816220283224195085/1285602284511694969/20240917_132036.jpg?ex=66ef7b2d&is=66ee29ad&hm=9a6a6b5ec91d8d44db3c0c24c85437eb35ff4815c71a3cb3a975e0121621afed&width=300&height=300")
        expect(showImageData?.imageFilename).toBe(imagePath?.split('/').pop())
    })
    it('Non-image HTTPS should return empty', async () => {
        const image = await showImage("https://google.com", "123456789", "testuser")
        
        if (!image) return
        const imagePath = image.imagePath
        
        expect(image).toBeTruthy()
        expect(image).toHaveProperty('imagePath')
        expect(imagePath).toBeNull()
    })
    it('Invalid HTTPS should return empty', async () => {
        const image = await showImage("asdw", "123456789", "testuser")
        
        if (!image) return
        const imagePath = image.imagePath
        
        expect(image).toBeTruthy()
        expect(image).toHaveProperty('imagePath')
        expect(imagePath).toBeNull()
    })
})