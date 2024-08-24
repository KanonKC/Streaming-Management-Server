import axios from "axios";
import sharp from "sharp";
import fs from "fs";
import { prisma } from "../database/prisma";

const IMAGE_PATH = 'dist/show-an-image.png'

export async function showImage(url: string, twitchId: string, username: string) {
    const imageResponse = await axios.get(url, { responseType: 'arraybuffer' });
    const image = sharp(imageResponse.data)
    const { width, height } = await image.metadata();

    if (!width || !height) return;

    if (width > height) {
        image.resize({ width: 500 });
    }
    else {
        image.resize({ height: 500 });
    }

    await prisma.showImage.create({
        data: {
            twitchId,
            username,
            imageUrl: url
        }
    })

    const imageBuffer = await image.toBuffer();
    await sharp(imageBuffer).toFile(IMAGE_PATH);
    setTimeout(() => {
        fs.unlink(IMAGE_PATH, (err) => {})
    },10000)
}