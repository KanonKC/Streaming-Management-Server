import { prisma } from "../../database/prisma"
import { showImage } from "../../modules/ShowImage"

describe('ShowImage', () => {
    it('Should return correct data', async () => {
        const imageUrl = "https://cdn.discordapp.com/attachments/568814386907447297/831795793366876181/SPOILER_Screenshot_20210414-143900_Instagram.png?ex=6717ff73&is=6716adf3&hm=41d5c55b24acb4cde5e97eecdd9a9dac2797b9eef2efbc3748ca7556c84d9486&"
        const image = await showImage(imageUrl, "123456789", "testuser")

        
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
        expect(showImageData?.imageUrl).toBe(imageUrl)
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