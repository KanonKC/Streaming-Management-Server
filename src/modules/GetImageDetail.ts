import axios from "axios";
import sharp from "sharp";
import fs from "fs";

export async function getImageDetail(url: string) {
    const imageResponse = await axios.get(url, { responseType: 'arraybuffer' });
    const image = sharp(imageResponse.data)

    // Set max width and height not exceed 500px but keep the aspect ratio
    image.resize({ width: 500, height: 500, fit: 'contain' });

    const imageBuffer = await image.toBuffer();
    await sharp(imageBuffer).toFile('dist/show-an-image.png');
    // Delete file
    setTimeout(() => {
        fs.unlink('dist/show-an-image.png', (err) => {})
    },5000)
    return { url };
}